import fs from 'fs';

const html = fs.readFileSync('./home_page_raw.html', 'utf-8');

// Find all Elementor / Woodmart sections on homepage
const sections = [];
const secMatches = [...html.matchAll(/<section class="([^"]*elementor-section[^"]*)"([\s\S]*?)<\/section>/gi)];
console.log(`Found ${secMatches.length} sections in home_page_raw.html`);

for (let i = 0; i < secMatches.length; i++) {
  const s = secMatches[i];
  const text = s[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
  const imgs = [...s[2].matchAll(/src="([^"]*\.(?:jpg|jpeg|png|webp))"/gi)].map(m => m[1]);
  console.log(`\n--- Section ${i + 1} ---`);
  console.log('Text snippet:', text);
  console.log('Images in section:', imgs.slice(0, 3));
}
