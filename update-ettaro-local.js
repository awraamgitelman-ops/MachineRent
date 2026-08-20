import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

let updated = false;
for (const m of MACHINERY_DATA) {
  if (m.name.includes('Flex Ettaro') || m.id.includes('flex-ettaro') || m.name.includes('сої та гороху')) {
    m.images = ['/assets/products/flex-ettaro.jpg'];
    updated = true;
    console.log(`Updated [${m.name}] image to /assets/products/flex-ettaro.jpg`);
  }
}

if (updated) {
  fs.writeFileSync(
    './src/data/machineryData.js',
    `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(MACHINERY_DATA, null, 2)};\n`,
    'utf-8'
  );
  console.log('Saved machineryData.js!');
}
