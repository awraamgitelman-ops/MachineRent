import { MACHINERY_DATA } from './src/data/machineryData.js';

const centerSlugs = [
  "grimme-gl32e-kartoplesadzhalka",
  "struik-flkb",
  "struik-glutton-podribnyuvach-badyllya",
  "row-fix-mizhryadnyj-rotornyj-kultyvator",
  "varix-3000-ot-rotornyj-kultyvator",
  "aplikator-mikrogranulyator-zibo-gandy-elektropryvid"
];

for (const s of centerSlugs) {
  const item = MACHINERY_DATA.find(m => m.slug === s);
  console.log(`Slug ${s}:`, item ? `✅ Found: ${item.name}` : '❌ Not Found');
}
