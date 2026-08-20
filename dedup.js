import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const seenSlugs = new Set();
const uniqueList = [];

for (const item of MACHINERY_DATA) {
  if (seenSlugs.has(item.slug)) {
    console.log('Skipping duplicate slug:', item.slug, item.name);
    continue;
  }
  seenSlugs.add(item.slug);
  uniqueList.push(item);
}

const output = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${uniqueList.length}

export const MACHINERY_DATA = ${JSON.stringify(uniqueList, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', output, 'utf-8');
console.log(`Deduplicated: ${uniqueList.length} unique products remain.`);
