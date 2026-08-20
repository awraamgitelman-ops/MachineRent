import { MACHINERY_DATA } from './src/data/machineryData.js';

const slugMap = new Map();
const idMap = new Map();
const duplicates = [];

for (const m of MACHINERY_DATA) {
  if (slugMap.has(m.slug)) {
    duplicates.push({ type: 'slug', val: m.slug, first: slugMap.get(m.slug).name, second: m.name });
  } else {
    slugMap.set(m.slug, m);
  }

  if (idMap.has(m.id)) {
    duplicates.push({ type: 'id', val: m.id, first: idMap.get(m.id).name, second: m.name });
  } else {
    idMap.set(m.id, m);
  }
}

console.log(`Total items in MACHINERY_DATA: ${MACHINERY_DATA.length}`);
console.log(`Unique slugs: ${slugMap.size}`);
console.log(`Unique IDs: ${idMap.size}`);
console.log('Duplicates found:', duplicates);
