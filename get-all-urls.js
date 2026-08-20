import fs from 'fs';

async function getAllSitemaps() {
  const res = await fetch('https://adenaagro.com/sitemap_index.xml', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const xml = await res.text();
  const sitemaps = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(m => m[1].trim());
  console.log('All sitemaps in index:', sitemaps);

  const allProductUrls = new Set();

  for (const sm of sitemaps) {
    if (sm.includes('product')) {
      console.log(`Fetching ${sm}...`);
      const smRes = await fetch(sm, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const smXml = await smRes.text();
      const locs = [...smXml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(m => m[1].trim());
      for (const loc of locs) {
        if (loc.includes('/product/')) {
          allProductUrls.add(loc);
        }
      }
    }
  }

  const list = Array.from(allProductUrls);
  console.log(`TOTAL UNIQUE PRODUCTS ACROSS ALL SITEMAPS: ${list.length}`);
  fs.writeFileSync('./all_product_urls.json', JSON.stringify(list, null, 2), 'utf-8');
}

getAllSitemaps();
