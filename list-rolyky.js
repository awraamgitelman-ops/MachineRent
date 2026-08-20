import { MACHINERY_DATA } from './src/data/machineryData.js';

const rolyky = MACHINERY_DATA.filter(m => m.name.toLowerCase().includes('ролик'));
console.log(`Total rolyky: ${rolyky.length}`);
for (const r of rolyky) {
  console.log(`- [${r.id}] ${r.name}`);
  console.log(`  slug: ${r.slug}`);
  console.log(`  image: ${r.images[0]}`);
}
