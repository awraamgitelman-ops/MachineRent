import { MACHINERY_DATA } from './src/data/machineryData.js';

console.log('--- Searching for Support Roller / Ролик опорний in MACHINERY_DATA ---');
const matching = [];

for (const item of MACHINERY_DATA) {
  const name = item.name.toLowerCase();
  const desc = (item.shortDescription || '').toLowerCase();
  const imgs = (item.images || []).join(' ');

  if (
    name.includes('ролик опорний') || 
    name.includes('support roller') || 
    name.includes('опорний ролик') ||
    imgs.includes('rolyky-91_17') ||
    (name.includes('d75') && name.includes('ролик'))
  ) {
    matching.push({ id: item.id, name: item.name, slug: item.slug, images: item.images });
  }
}

console.log(`Found ${matching.length} matching products:`);
for (const m of matching) {
  console.log(`- [${m.id}] "${m.name}" (slug: ${m.slug})`);
  console.log(`  images:`, m.images);
}
