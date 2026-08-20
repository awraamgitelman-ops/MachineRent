import fs from 'fs';

const html = fs.readFileSync('./scraped_remont.html', 'utf-8');

// Find headings, images, paragraphs and forms on remont page
const headings = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('Remont Headings:', headings);

const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(p => p.length > 20);
console.log('Remont Paragraphs:', paragraphs);

const images = [...html.matchAll(/src="([^"]*\.(?:jpg|jpeg|png|webp))"/gi)].map(m => m[1]);
console.log('Remont Images:', [...new Set(images)]);
