import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1546\\content.md', 'utf-8');

console.log('Agrovektor HTML length:', html.length);

// Look for product items
// Agrovektor typically has product items with class or links
const itemTitles = [...html.matchAll(/<a[^>]+href="([^"]*product\/[^"]*|[^"]*item\/[^"]*|[^"]*physical_product_view\/[^"]*|[^"]*\.html)"[^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Links found:', itemTitles.length);

// Let's find all images matching /uploads/photo/
const photos = [...html.matchAll(/(?:src|data-src|data-original)="([^"]*(?:uploads\/photo|photo\/)[^"]*)"/gi)].map(m => m[1]);
console.log('Photos found count:', photos.length);
console.log('Sample photos:', [...new Set(photos)].slice(0, 10));

// Let's inspect snippet of a product card
const cards = [...html.matchAll(/<div[^>]+class="[^"]*(?:product|item|catalog-item|offer)[^"]*"([\s\S]*?)<\/div>\s*<\/div>/gi)];
console.log('Cards count:', cards.length);
