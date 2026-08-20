import fs from 'fs';

const html = fs.readFileSync('./home_page_raw.html', 'utf-8');

// Find all e-con containers or main content containers
const containerMatches = [...html.matchAll(/<div class="([^"]*e-con-inner[^"]*|[^"]*e-con-full[^"]*|[^"]*main-page-wrapper[^"]*)"([\s\S]*?)<\/div>/gi)];
console.log(`Found ${containerMatches.length} containers`);

// Extract all text blocks, titles, carousels, categories, products
const allHeadings = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('All headings:', allHeadings);

// Extract all banner blocks / image links
const linksWithImages = [...html.matchAll(/<a href="([^"]*)"[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"[\s\S]*?<\/a>/gi)];
console.log('Image links count:', linksWithImages.length);

const parsedLinks = linksWithImages.map(m => ({
  href: m[1],
  img: m[2],
})).slice(0, 30);
console.log('Sample image links:', parsedLinks);

// Extract paragraph texts
const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(p => p.length > 30);
console.log('Key paragraphs on home:', paragraphs.slice(0, 15));
