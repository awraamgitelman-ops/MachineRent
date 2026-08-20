import { MACHINERY_DATA } from './src/data/machineryData.js';

const CATEGORY_MAP = {
  'field': 'field',
  'skladska-tehnika': 'warehouse',
  'zapchastyny': 'parts',
  'tehnika-b-v': 'used'
};

for (const [cat, expectedType] of Object.entries(CATEGORY_MAP)) {
  const matching = MACHINERY_DATA.filter(m => m.machineryType === expectedType);
  console.log(`Category [${cat}] -> Found ${matching.length} products (expected type: ${expectedType})`);
}
