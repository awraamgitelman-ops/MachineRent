import fs from 'fs';
import { HOME_CATEGORY_BOXES } from './src/data/homeData.js';
import { encryptImageUrl } from './src/utils/imageProxy.js';

for (const box of HOME_CATEGORY_BOXES) {
  if (box.id === 'zhatky') {
    box.image = encryptImageUrl('https://vintehpostach.com/storage/category/2589/gallery/fef9654a-aefb-4d2e-ac4e-41ad5cd11134.webp');
  }
}

let content = fs.readFileSync('./src/data/homeData.js', 'utf-8');
content = content.replace(
  /export const HOME_CATEGORY_BOXES = [\s\S]*?;\n\nexport const HOME_DISCOUNTS_PRODUCTS/,
  `export const HOME_CATEGORY_BOXES = ${JSON.stringify(HOME_CATEGORY_BOXES, null, 2)};\n\nexport const HOME_DISCOUNTS_PRODUCTS`
);
fs.writeFileSync('./src/data/homeData.js', content, 'utf-8');
console.log('Updated HOME_CATEGORY_BOXES for zhatky!');
