import { MACHINERY_DATA } from './src/data/machineryData.js';

console.log('--- Checking all products with bez-bort88_3 or similar images ---');
for (const item of MACHINERY_DATA) {
  const imgs = (item.images || []).join(' ');
  if (imgs.includes('bez-bort88_3') || imgs.includes('bez-bort88')) {
    console.log(`- [${item.id}] "${item.name}" (slug: ${item.slug})`);
  }
}
