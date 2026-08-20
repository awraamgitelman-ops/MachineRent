import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { 
  HOME_TOP_SEASON,
  HOME_GRID_CENTER, 
  HOME_GRID_RIGHT, 
  HOME_CATEGORY_BOXES, 
  HOME_DISCOUNTS_PRODUCTS 
} from './src/data/homeData.js';

const removeIds = new Set(['adena-107', 'adena-108', 'adena-109', 'adena-110', 'adena-111']);
const removeSlugs = new Set([
  'rolyk-opornyj-support-roller-malyj-d75-dlya-kartoplezbyralnyh-kombajniv-grimme-200-26632-r',
  'rolyk-opornyj-support-roller-malyj-d75-dlya-kartoplezbyralnyh-kombajniv-grimme-088-00334-r',
  'rolyk-opornyj-support-roller-malyj-d75-dlya-kartoplezbyralnyh-kombajniv-grimme-200-39239-r',
  'rolyk-opornyj-support-roller-malyj-d75-dlya-kartoplezbyralnyh-kombajniv-grimme-200-54884-r',
  'rolyk-opornyj-support-roller-d75-dlya-kartoplezbyralnyh-kombajniv-grimme-200-09664-r'
]);

const updatedMachinery = MACHINERY_DATA.filter(m => {
  if (removeIds.has(m.id) || removeSlugs.has(m.slug)) {
    console.log(`Removing from MACHINERY_DATA: [${m.id}] ${m.name}`);
    return false;
  }
  return true;
});

// Update machineryData.js
const machineryOut = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${updatedMachinery.length}

export const MACHINERY_DATA = ${JSON.stringify(updatedMachinery, null, 2)};
`;
fs.writeFileSync('./src/data/machineryData.js', machineryOut, 'utf-8');

console.log(`Successfully removed 5 yellow support rollers! Remaining items in MACHINERY_DATA: ${updatedMachinery.length}`);
