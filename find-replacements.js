import { MACHINERY_DATA } from './src/data/machineryData.js';

console.log('Sample products from machineryData:');
const sample = MACHINERY_DATA.filter(p => p.images && p.images[0] && !p.images[0].includes('placeholder')).slice(0, 15);
for (const s of sample) {
  console.log(`id: "${s.id}", name: "${s.name}", slug: "${s.slug}", brand: "${s.brand}", priceUah: ${s.pricing?.purchasePriceUah || s.pricing?.pricePerShiftUah}, image: "${s.images[0]}"`);
}
