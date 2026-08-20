import { MACHINERY_DATA } from './src/data/machineryData.js';
import { HOME_BESTSELLERS, HOME_NEW_PRODUCTS } from './src/data/homeData.js';

const slugsToRemove = [
  'rolyk-napryamnyj-z-bortykom-idler-roller-with-hoop-90-mm-dlya-kartoplezbyralnyh-kombajniv-grimme-088-00361-r',
  'rolyk-veduchogo-mehanizmu-bunkera-dlya-kombajna-karlik-z642-564451096',
  'rolyk-pryvodnyj-076-02400-r-grimme'
];

console.log('--- Checking in MACHINERY_DATA ---');
for (const item of MACHINERY_DATA) {
  for (const s of slugsToRemove) {
    if (item.slug === s || (item.aliases && item.aliases.includes(s)) || item.id.includes(s)) {
      console.log('Found in MACHINERY_DATA:', item.id, item.name, item.slug);
    }
  }
}

console.log('--- Checking in HOME_BESTSELLERS ---');
for (const item of HOME_BESTSELLERS) {
  for (const s of slugsToRemove) {
    if (item.slug === s || item.id.includes(s)) {
      console.log('Found in HOME_BESTSELLERS:', item.id, item.name, item.slug);
    }
  }
}

console.log('--- Checking in HOME_NEW_PRODUCTS ---');
for (const item of HOME_NEW_PRODUCTS) {
  for (const s of slugsToRemove) {
    if (item.slug === s || item.id.includes(s)) {
      console.log('Found in HOME_NEW_PRODUCTS:', item.id, item.name, item.slug);
    }
  }
}
