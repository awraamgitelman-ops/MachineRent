import { MACHINERY_DATA } from './src/data/machineryData.js';

console.log('Product 1:', {
  id: MACHINERY_DATA[0].id,
  name: MACHINERY_DATA[0].name,
  category: MACHINERY_DATA[0].category,
  type: MACHINERY_DATA[0].type,
  pricing: MACHINERY_DATA[0].pricing
});

const sampleParts = MACHINERY_DATA.filter(p => p.name.toLowerCase().includes('ролик') || p.name.toLowerCase().includes('пас') || p.name.toLowerCase().includes('вал') || p.name.toLowerCase().includes('зірочка') || p.pricing?.purchasePriceUah < 50000);
console.log('Sample parts count:', sampleParts.length);
if (sampleParts[0]) {
  console.log('Sample part:', {
    id: sampleParts[0].id,
    name: sampleParts[0].name,
    pricing: sampleParts[0].pricing
  });
}
