import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const targetSlugs = new Set([
  'ustanovka-dlya-protruyuvannya-bulb-kartopli-pid-prestyzh',
  'ustanovka-dlya-protruyuvannya-bulb-kartopli-pid-prestyzh-vyrobnyk-grimme',
  'transporter-dlya-zbyrannya-kapusty-ta-inshyh-ovochiv',
  'rolyk-pryvodnyj-frykczijnyj-gumovyj-drive-roller-vulcanized-dm194-dlya-kartoplezbyralnyh-kombajniv-grimme-076-05115-r'
]);

const updatedMachinery = MACHINERY_DATA.filter((m) => {
  if (targetSlugs.has(m.slug) || (m.aliases && m.aliases.some(a => targetSlugs.has(a)))) {
    console.log(`Removing from MACHINERY_DATA: [${m.id}] ${m.name} (${m.slug})`);
    return false;
  }
  return true;
});

const machineryOut = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${updatedMachinery.length}

export const MACHINERY_DATA = ${JSON.stringify(updatedMachinery, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', machineryOut, 'utf-8');
console.log(`Successfully updated! Remaining items: ${updatedMachinery.length}`);
