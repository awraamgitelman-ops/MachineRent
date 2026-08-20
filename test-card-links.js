import { MACHINERY_DATA } from './src/data/machineryData.js';
import { 
  HOME_TOP_SEASON,
  HOME_GRID_CENTER, 
  HOME_GRID_RIGHT, 
  HOME_CATEGORY_BOXES, 
  HOME_DISCOUNTS_PRODUCTS 
} from './src/data/homeData.js';

console.log('Total in MACHINERY_DATA:', MACHINERY_DATA.length);

const allHomeItems = [
  ...HOME_TOP_SEASON,
  ...HOME_GRID_CENTER,
  ...HOME_GRID_RIGHT,
  ...HOME_DISCOUNTS_PRODUCTS
];

console.log(`\nTesting ${allHomeItems.length} homepage product cards:`);

const missingFromCatalog = [];

for (const item of allHomeItems) {
  const found = MACHINERY_DATA.find(m => m.slug === item.slug || m.id === item.id || (m.aliases && m.aliases.includes(item.slug)));
  if (!found) {
    console.log(`❌ NOT FOUND in MACHINERY_DATA: [${item.id}] "${item.name}" -> slug: "${item.slug}"`);
    missingFromCatalog.push(item);
  } else {
    console.log(`✅ MATCH: "${item.name}" -> "${found.name}" (slug: ${found.slug})`);
  }
}

console.log(`\nTotal missing homepage items: ${missingFromCatalog.length}`);
