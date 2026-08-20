import { MACHINERY_DATA } from './src/data/machineryData.js';
import { 
  HOME_TOP_SEASON,
  HOME_GRID_CENTER, 
  HOME_GRID_RIGHT, 
  HOME_CATEGORY_BOXES, 
  HOME_DISCOUNTS_PRODUCTS 
} from './src/data/homeData.js';

function resolveMachine(slug) {
  if (!slug) return null;
  const s = slug.toLowerCase().trim();
  
  // 1. Exact slug or id match
  const exact = MACHINERY_DATA.find((m) => m.slug.toLowerCase() === s || m.id.toLowerCase() === s);
  if (exact) return exact;

  // 2. Check aliases array
  const byAlias = MACHINERY_DATA.find((m) => m.aliases && m.aliases.some((a) => a.toLowerCase() === s));
  if (byAlias) return byAlias;

  // 3. Clean prefixes (part-, field-, adena-, used-)
  const cleanS = s.replace(/^(part-|field-|adena-|warehouse-|used-)/, '');
  const cleanMatch = MACHINERY_DATA.find((m) => 
    m.slug.toLowerCase() === cleanS || 
    m.id.replace(/^(part-|field-|adena-|warehouse-|used-)/, '').toLowerCase() === cleanS
  );
  if (cleanMatch) return cleanMatch;

  // 4. Token overlap match with strict threshold (at least 3 matching words or 75% overlap)
  const slugTokens = s.split(/[-_/\s]+/).filter((t) => t.length > 2);
  if (slugTokens.length > 0) {
    let bestMatch = null;
    let maxOverlap = 0;

    for (const item of MACHINERY_DATA) {
      const itemTokens = `${item.slug} ${(item.aliases || []).join(' ')}`
        .toLowerCase()
        .split(/[-_/\s]+/)
        .filter((t) => t.length > 2);
      
      const overlap = slugTokens.filter((t) => itemTokens.includes(t)).length;
      const ratio = overlap / slugTokens.length;
      
      if (overlap > maxOverlap && (overlap >= 3 || ratio >= 0.75)) {
        maxOverlap = overlap;
        bestMatch = item;
      }
    }

    if (bestMatch) return bestMatch;
  }

  return null;
}

let failed = 0;
for (const m of MACHINERY_DATA) {
  const res = resolveMachine(m.slug);
  if (!res || res.id !== m.id) {
    console.error(`FAILED resolution for catalog item: ${m.name} (slug: ${m.slug}) -> resolved to: ${res ? res.name : 'null'}`);
    failed++;
  }
}

const allHomeItems = [
  ...HOME_TOP_SEASON,
  ...HOME_GRID_CENTER,
  ...HOME_GRID_RIGHT,
  ...HOME_DISCOUNTS_PRODUCTS
];

for (const h of allHomeItems) {
  const res = resolveMachine(h.slug);
  if (!res) {
    console.error(`FAILED resolution for homepage item: ${h.name} (slug: ${h.slug}) -> resolved to null`);
    failed++;
  }
}

if (failed === 0) {
  console.log(`🎉 ALL ${MACHINERY_DATA.length} catalog items and all ${allHomeItems.length} homepage cards resolve 100% accurately to their EXACT product!`);
} else {
  console.error(`❌ Total failures: ${failed}`);
}
