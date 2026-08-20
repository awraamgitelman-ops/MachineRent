import fs from 'fs';

async function checkSitemap() {
  const sitemapUrls = [
    'https://adenaagro.com/product-sitemap.xml',
    'https://adenaagro.com/product-sitemap1.xml',
    'https://adenaagro.com/sitemap_index.xml',
    'https://adenaagro.com/wp-sitemap-posts-product-1.xml'
  ];

  for (const url of sitemapUrls) {
    try {
      console.log(`Checking ${url}...`);
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const xml = await res.text();
        console.log(`Found sitemap at ${url}, length: ${xml.length}`);
        
        // Extract all <loc>
        const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(m => m[1].trim());
        console.log(`Total URLs in sitemap: ${locs.length}`);
        const productUrls = locs.filter(u => u.includes('/product/'));
        console.log(`Product URLs in sitemap: ${productUrls.length}`);
        
        if (productUrls.length > 0) {
          fs.writeFileSync('./all_product_urls.json', JSON.stringify(productUrls, null, 2), 'utf-8');
          return productUrls;
        }

        // If it's sitemap index, check child sitemaps
        const subSitemaps = locs.filter(u => u.includes('product'));
        console.log('Sub product sitemaps:', subSitemaps);
        for (const sub of subSitemaps) {
          const subRes = await fetch(sub, { headers: { 'User-Agent': 'Mozilla/5.0' } });
          const subXml = await subRes.text();
          const subLocs = [...subXml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(m => m[1].trim());
          const subProductUrls = subLocs.filter(u => u.includes('/product/'));
          console.log(`Sub sitemap ${sub} has ${subProductUrls.length} products`);
        }
      }
    } catch (err) {
      console.error(`Error checking ${url}:`, err.message);
    }
  }
}

checkSitemap();
