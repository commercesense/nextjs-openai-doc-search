import axios from 'axios'; 
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
