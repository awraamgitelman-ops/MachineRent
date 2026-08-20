import { MACHINERY_DATA } from './src/data/machineryData.js';

const types = {};
for (const m of MACHINERY_DATA) {
  types[m.machineryType] = (types[m.machineryType] || 0) + 1;
}
console.log('Machinery types in catalog:', types);
