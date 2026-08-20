import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { 
  HOME_TOP_SEASON,
  HOME_GRID_CENTER, 
  HOME_GRID_RIGHT, 
  HOME_CATEGORY_BOXES, 
  HOME_DISCOUNTS_PRODUCTS 
} from './src/data/homeData.js';

const targetSlugs = new Set([
  'rolyk-napryamnyj-z-bortykom-idler-roller-with-hoop-90-mm-dlya-kartoplezbyralnyh-kombajniv-grimme-088-00361-r',
  'rolyk-veduchogo-mehanizmu-bunkera-dlya-kombajna-karlik-z642-564451096',
  'rolyk-pryvodnyj-076-02400-r-grimme'
]);

const targetIds = new Set([
  'grimme-088-00361',
  'karlik-z642',
  'grimme-076-02400'
]);

// 1. Filter machineryData.js
const filteredMachinery = MACHINERY_DATA.filter((m) => {
  if (targetSlugs.has(m.slug) || targetIds.has(m.id) || (m.aliases && m.aliases.some(a => targetSlugs.has(a)))) {
    console.log(`Removing from MACHINERY_DATA: ${m.name} (${m.slug})`);
    return false;
  }
  return true;
});

const machineryOut = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${filteredMachinery.length}

export const MACHINERY_DATA = ${JSON.stringify(filteredMachinery, null, 2)};
`;
fs.writeFileSync('./src/data/machineryData.js', machineryOut, 'utf-8');

// 2. Filter homeData.js
const filterHomeList = (list) => list.filter(item => {
  if (targetSlugs.has(item.slug) || targetIds.has(item.id)) {
    console.log(`Removing from home grid: ${item.name} (${item.slug})`);
    return false;
  }
  return true;
});

const newTopSeason = filterHomeList(HOME_TOP_SEASON);
const newGridCenter = filterHomeList(HOME_GRID_CENTER);
const newGridRight = filterHomeList(HOME_GRID_RIGHT);
const newDiscounts = filterHomeList(HOME_DISCOUNTS_PRODUCTS);

const homeDataOut = `// Exact data replicated from adenaagro.com homepage sections

export const HOME_TOP_SEASON = ${JSON.stringify(newTopSeason, null, 2)};

export const HOME_GRID_CENTER = ${JSON.stringify(newGridCenter, null, 2)};

export const HOME_GRID_RIGHT = ${JSON.stringify(newGridRight, null, 2)};

export const HOME_CATEGORY_BOXES = ${JSON.stringify(HOME_CATEGORY_BOXES, null, 2)};

export const HOME_DISCOUNTS_PRODUCTS = ${JSON.stringify(newDiscounts, null, 2)};
`;

fs.writeFileSync('./src/data/homeData.js', homeDataOut, 'utf-8');
console.log(`Successfully updated! MACHINERY_DATA total: ${filteredMachinery.length}`);
