import { MACHINERY_DATA } from './src/data/machineryData.js';

console.log('Total items in MACHINERY_DATA:', MACHINERY_DATA.length);

for (let i = 0; i < 5; i++) {
  console.log(`\nItem ${i + 1}: ${MACHINERY_DATA[i].name}`);
  console.log('ShortDesc:', MACHINERY_DATA[i].shortDescription);
  console.log('FullDesc:', (MACHINERY_DATA[i].fullDescription || '').slice(0, 150));
}
