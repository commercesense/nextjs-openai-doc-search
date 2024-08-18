const axios = require('axios');
const pdf = require('pdf-parse');
const TurndownService = require('turndown');
const fs = require('fs');
import * as path from 'path';

async function convertPdfToMarkdown(url:String, outputFilePath:String) {
    try {
        // Fetch PDF from the URL
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const data = response.data;

        // Parse the PDF to extract text
        const pdfData = await pdf(data);
        const text = pdfData.text;

        // Initialize Turndown service
        const turndownService = new TurndownService();

        // Convert text to Markdown
        const markdown = turndownService.turndown(text);

        // Write the markdown to a file
        fs.writeFileSync(outputFilePath, markdown);

        console.log(`Markdown saved to ${outputFilePath}`);
    } catch (error) { 
        console.error('Error: ${error.message}');
    }
}

 

// Example usage: Pass the URL and output file path as arguments
const url = 'https://www.fideliscare.org/Portals/0/Members/SummaryofBenefits/SBC_EP%201_2024.pdf';
const outputDir: string = './pages/docs/';
const outputFilePath = outputDir + path.basename(url)+'.mdx';

convertPdfToMarkdown(url, outputFilePath);
