import { MACHINERY_DATA } from './src/data/machineryData.js';

console.log('Sample top products in MACHINERY_DATA:');
const sample = MACHINERY_DATA.slice(0, 15).map(m => ({
  id: m.id,
  name: m.name,
  slug: m.slug,
  brand: m.brand,
  priceUah: m.pricing?.purchasePriceUah || 120000,
  image: m.images && m.images[0] ? m.images[0] : 'https://adenaagro.com/wp-content/uploads/2022/12/traktor-768x432.webp'
}));

console.log(JSON.stringify(sample, null, 2));
