import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const slugsToRemove = [
  'zhnyvarka-zernobobova-john-deere-625f-7-6-m-hydraflex-z-ssha-z-vizkom-min-napraczyuvannya',
  'zhatka-zernobobovaya-zhbv-4-2',
  'zhatky-dzhon-dyr-600f',
  'zhatka-zhn-5-dlya-kombajna-nyva',
  'zhatka-john-deere-600c',
  'zhatka-navisna-zernobobova-zhbv'
];

const initialCount = MACHINERY_DATA.length;
const filtered = MACHINERY_DATA.filter(item => !slugsToRemove.includes(item.slug));
const removedCount = initialCount - filtered.length;

console.log(`Removing ${removedCount} items out of ${initialCount}. New count: ${filtered.length}`);

const newFileContent = `// Comprehensive Catalog Dataset for AGRORENTEX (${filtered.length} products)

export const MACHINERY_DATA = ${JSON.stringify(filtered, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', newFileContent, 'utf-8');
console.log('✅ Updated src/data/machineryData.js successfully!');
