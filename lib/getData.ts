
const axios = require('axios');
const TurndownService = require('turndown');
const cheerio = require('cheerio');
const fs = require('fs');
import * as path from 'path';

async function convertHtmlToMarkdown(url:String, outputFilePath:String) {
    try {
        // Fetch HTML from the URL
        const response = await axios.get(url);
        var html = response.data;

         // Load the HTML into cheerio for manipulation
         const $ = cheerio.load(html);

         // Remove all <style> and <script> tags and their contents
         $('style, script').remove();

         // Convert the cleaned HTML back to a string
        html = $.html();

        // Initialize Turndown service
        const turndownService = new TurndownService();

        // Convert HTML to Markdown
        const markdown = turndownService.turndown(html);

        // Write the markdown to a file
        fs.writeFileSync(outputFilePath, markdown);

        console.log(`Markdown saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error: ${error.message}');
    }
}

// Example usage: Pass the URL and output file path as arguments
const url = 'https://en.wikipedia.org/wiki/National_Association_of_Black_Accountants';
const outputDir: string = './pages/docs/';
const outputFilePath = outputDir + path.basename(url)+'.mdx';

convertHtmlToMarkdown(url, outputFilePath);



/* 
import TurndownService from 'turndown';
import * as fs from 'fs';
import * as path from 'path';

const urls: string[] = [
    'https://en.wikipedia.org/wiki/National_Association_of_Black_Accountants',
    'https://en.wikipedia.org/wiki/Association_football',
    'https://support.apple.com/guide/iphone/iphone-15-iph01b3c591a/ios'
    // Add more URLs as needed
];

const outputDir: string = './pages/docs'; // Specify your directory here

 
const turndownService = new TurndownService();

const scrapeAndConvertToMarkdown = async (url: string): Promise<void> => {
    try {
        const { data: html } = await axios.get<string>(url);
      //  console.log(html); 
       // const $ = cheerio.load(html);

        // Use Turndown to convert HTML to Markdown
        const markdown: string = turndownService.turndown(html);

        // Create a filename based on the URL or any other logic
        const filename: string = `${path.basename(url)}.mdx`;

        // Save the markdown file
        fs.writeFileSync(path.join(outputDir, filename), markdown);

        console.log(`Saved: ${filename}`);
    } catch (error) {
        console.error(`Error scraping ${url}:`, error);
    }
};

urls.forEach((url) => {
    scrapeAndConvertToMarkdown(url);
});
*/