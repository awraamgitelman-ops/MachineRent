import fs from 'fs';

const html = fs.readFileSync('./scraped_domasz_we30.html', 'utf-8');

const descMatch = html.match(/<div class="woocommerce-Tabs-panel--description[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                  html.match(/<div id="tab-description"[^>]*>([\s\S]*?)<\/div>/i);

console.log('Full Description HTML:\n', descMatch ? descMatch[1] : 'No description found');
