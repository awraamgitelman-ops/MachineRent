import { MACHINERY_DATA } from './src/data/machineryData.js';

const catCounts = {};
for (const m of MACHINERY_DATA) {
  catCounts[m.category] = (catCounts[m.category] || 0) + 1;
}
console.log('Categories in catalog:', catCounts);
