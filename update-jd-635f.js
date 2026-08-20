import fs from 'fs';
import path from 'path';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const sourceImg = 'C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.user_uploaded\\media_1787238380690.png';
const destDir = './public/assets/products';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const destImg = path.join(destDir, 'john-deere-635f.png');
fs.copyFileSync(sourceImg, destImg);
console.log('Successfully copied image to:', destImg, 'Size:', fs.statSync(destImg).size, 'bytes');

const localPath = '/assets/products/john-deere-635f.png';
let updatedCount = 0;

for (const m of MACHINERY_DATA) {
  if (m.name.includes('635F') || m.id.includes('635f') || (m.name.includes('John Deere') && m.name.includes('10.7'))) {
    m.images = [localPath];
    updatedCount++;
    console.log(`Updated [${m.name}] to ${localPath}`);
  }
}

fs.writeFileSync(
  './src/data/machineryData.js',
  `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(MACHINERY_DATA, null, 2)};\n`,
  'utf-8'
);

console.log(`Updated ${updatedCount} products in machineryData.js!`);
