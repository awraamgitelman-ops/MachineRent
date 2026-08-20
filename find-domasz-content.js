import fs from 'fs';

const html = fs.readFileSync('./scraped_domasz_we30.html', 'utf-8');

// Find all tabs or content in wc-tabs
const tabsMatch = html.match(/<div class="woocommerce-tabs[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
console.log('Tabs HTML snippet:', tabsMatch ? tabsMatch[0].slice(0, 1500) : 'No wc-tabs found');

const shortDesc = html.match(/<div class="woocommerce-product-details__short-description">([\s\S]*?)<\/div>/i);
console.log('Short description raw:\n', shortDesc ? shortDesc[1] : 'No short desc');

// Find all text blocks in summary
const summary = html.match(/<div class="summary entry-summary[^"]*">([\s\S]*?)<\/div>\s*<\/div>/i);
console.log('Summary raw:\n', summary ? summary[1] : 'No summary');
