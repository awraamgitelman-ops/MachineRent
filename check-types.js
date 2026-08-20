import { MACHINERY_DATA } from './src/data/machineryData.js';

const typeCounts = {};
const categoryNames = {};

for (const item of MACHINERY_DATA) {
  typeCounts[item.machineryType] = (typeCounts[item.machineryType] || 0) + 1;
  categoryNames[item.categoryName] = (categoryNames[item.categoryName] || 0) + 1;
}

console.log('MachineryType counts:', typeCounts);
console.log('CategoryName counts:', categoryNames);
