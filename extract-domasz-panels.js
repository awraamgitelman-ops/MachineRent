import fs from 'fs';

const html = fs.readFileSync('./scraped_domasz_we30.html', 'utf-8');

const panels = [...html.matchAll(/<div class="[^"]*woocommerce-Tabs-panel[^"]*" id="([^"]*)"[^>]*>([\s\S]*?)<\/div>/gi)];
console.log(`Found ${panels.length} tab panels.`);
for (const p of panels) {
  console.log(`\n=== PANEL ID: ${p[1]} ===\n`, p[2].trim());
}

// Check if there are other panels
const descPanel = html.match(/id="tab-description"[\s\S]*?<\/div>\s*<\/div>/i);
if (descPanel) {
  console.log('\n=== DESC PANEL RAW ===\n', descPanel[0]);
}
