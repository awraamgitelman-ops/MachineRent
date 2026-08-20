import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1144\\content.md', 'utf-8');

function clean(t) {
  return t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Extract headings & paragraphs
const headings = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)].map(m => clean(m[1]));
console.log('Headings in about-us:', headings);

// Extract Elementor text blocks or main content
const elements = [...html.matchAll(/<div class="elementor-widget-container">([\s\S]*?)<\/div>/gi)].map(m => clean(m[1])).filter(t => t.length > 30);
console.log('Text sections count:', elements.length);
for (let i = 0; i < Math.min(elements.length, 12); i++) {
  console.log(`--- Section ${i + 1} ---`);
  console.log(elements[i]);
}

// Extract images
const imgs = [...html.matchAll(/<img[^>]+src="([^">]+)"/gi)].map(m => m[1]).filter(u => u.includes('uploads') && !u.includes('logo') && !u.includes('flag'));
console.log('Images in about-us:', [...new Set(imgs)]);
