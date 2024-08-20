const axios = require('axios');
const pdf = require('pdf-parse');
const TurndownService = require('turndown');
const fs = require('fs');
import * as path from 'path';

//import MarkdownIt from 'markdown-it';
const MarkdownIt = require('markdown-it');

async function convertPdfToMarkdown(url:String, outputFilePath:String) {

    const md = new MarkdownIt();

    try {
        // Fetch PDF from the URL
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const data = response.data;

        // Parse the PDF to extract text
        const pdfData = await pdf(data);
        const numPages = pdfData.numpages;
        console.log('Number of pages: ' + numPages);
        const pages = pdfData.text.split(/\n\n+/g);
        
        let text = '';

        pages.forEach((pageText: string, index: number) => {
            text += `## Page ${index + 1}\n\n`;
            text += md.render(pageText.trim());
            text += '\n\n';
          });

        // Initialize Turndown service
       // const turndownService = new TurndownService();

        // Convert text to Markdown
       // const markdown = turndownService.turndown(text);

        // Write the markdown to a file
        fs.writeFileSync(outputFilePath, text);

        console.log(`Markdown saved to ${outputFilePath}`);
    } catch (error) { 
        console.error('Error: ' + error);
    }
}

 

// Example usage: Pass the URL and output file path as arguments
const url = 'https://content.sunfirematrix.com/2024/Anthem-1053091MUSENMUB-0292-H4161-011-000-012-000-CA-HMO-SB-2024-SF20231107.pdf';
const outputDir: string = './pages/docs/';
const outputFilePath = outputDir + path.basename(url)+'.mdx';

convertPdfToMarkdown(url, outputFilePath);
