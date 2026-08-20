import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const filtered = MACHINERY_DATA.filter((item) => {
  if (item.slug === 'gasyteli-padinnya-zibo' || item.id === 'field-gasyteli-padinnya-zibo') {
    console.log(`Removing product: ${item.name} (${item.slug})`);
    return false;
  }
  return true;
});

const output = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${filtered.length}

export const MACHINERY_DATA = ${JSON.stringify(filtered, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', output, 'utf-8');
console.log(`Successfully removed gasyteli-padinnya-zibo! Total products: ${filtered.length}`);
