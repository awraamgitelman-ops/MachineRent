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
  'rolyk-pryvodu-transportera-006-00066-r',
  'transporter-zavantazhuvalnyj-300-34940-grimme-se-75-30',
  'pidtrymuyuchyj-rolyk-602-00052-r-grimme'
]);

const targetIds = new Set([
  'part-rolyk-pryvodu-transportera-006-00066-r',
  'rolik-privod-006',
  'part-transporter-zavantazhuvalnyj-300-34940-grimme-se-75-30',
  'grimme-300-34940',
  'part-pidtrymuyuchyj-rolyk-602-00052-r-grimme',
  'pidtrym-602-00052'
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
    console.log(`Removing from homeData: ${item.name} (${item.slug})`);
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
