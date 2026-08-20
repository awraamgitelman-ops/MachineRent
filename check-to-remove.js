import { MACHINERY_DATA } from './src/data/machineryData.js';
import { HOME_GRID_TOP, HOME_GRID_CENTER, HOME_GRID_BOTTOM } from './src/data/homeData.js';

const toRemove = [
  'rolyk-1131002797-r-holmer',
  'holmer-401051155-prividnyj-val',
  'val-dlya-pryjmalnogo-bunkera-50x700-grimme-rh-tc-076-05615-r',
  'zirochka-564230024-bolko-karlik'
];

console.log('--- Checking in MACHINERY_DATA ---');
for (const slug of toRemove) {
  const found = MACHINERY_DATA.find(p => p.slug === slug || p.id === slug || (p.aliases && p.aliases.includes(slug)));
  if (found) {
    console.log(`Found in MACHINERY_DATA: id=${found.id}, slug=${found.slug}, name=${found.name}`);
  } else {
    console.log(`NOT found: ${slug}`);
  }
}

console.log('--- Checking in homeData grids ---');
const allHome = [...HOME_GRID_TOP, ...HOME_GRID_CENTER, ...HOME_GRID_BOTTOM];
for (const slug of toRemove) {
  const foundHome = allHome.find(p => p.slug === slug || p.id === slug || (p.aliases && p.aliases.includes(slug)));
  if (foundHome) {
    console.log(`Found in homeData: ${slug} (${foundHome.name})`);
  }
}
