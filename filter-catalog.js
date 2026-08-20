import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const toRemoveSlugs = [
  'rolyk-1131002797-r-holmer',
  'holmer-401051155-prividnyj-val',
  'val-dlya-pryjmalnogo-bunkera-50x700-grimme-rh-tc-076-05615-r',
  'zirochka-564230024-bolko-karlik'
];

console.log('Original MACHINERY_DATA count:', MACHINERY_DATA.length);

const filtered = MACHINERY_DATA.filter(p => !toRemoveSlugs.includes(p.slug) && !toRemoveSlugs.includes(p.id));

console.log('Filtered MACHINERY_DATA count:', filtered.length);

const fileContent = `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(filtered, null, 2)};\n`;

fs.writeFileSync('./src/data/machineryData.js', fileContent, 'utf-8');
console.log('Successfully updated src/data/machineryData.js!');
