import fs from 'fs';

const html = fs.readFileSync('./home_page_raw.html', 'utf-8');

// Parse the entire main content area <div class="wd-page-content main-page-wrapper">
const mainMatch = html.match(/<div class="wd-page-content main-page-wrapper">([\s\S]*?)<\/main>/i);
if (mainMatch) {
  fs.writeFileSync('./home_main_content.html', mainMatch[1], 'utf-8');
}

// Find all top-level Elementor parent containers
const parentContainers = [...html.matchAll(/<div[^>]*class="[^"]*e-parent[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];
console.log('Parent containers count:', parentContainers.length);

// Extract all image box widgets
const imageBoxes = [...html.matchAll(/<div class="elementor-image-box-wrapper">[\s\S]*?<img[^>]*src="([^"]*)"[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
console.log('Image boxes:', imageBoxes.map(m => ({
  img: m[1],
  title: m[2].replace(/<[^>]+>/g, '').trim()
})));

// Extract all sections titles
const sectionTitles = [...html.matchAll(/<h[1-4][^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/h[1-4]>/gi)];
console.log('Section titles:', sectionTitles.map(m => m[1].replace(/<[^>]+>/g, '').trim()));
