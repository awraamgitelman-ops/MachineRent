import fs from 'fs';

async function scrapeFieldCategory() {
  let page = 1;
  const productUrls = new Set();

  while (true) {
    const url = page === 1 
      ? 'https://adenaagro.com/product-category/field/'
      : `https://adenaagro.com/product-category/field/page/${page}/`;
    
    console.log(`Fetching category page: ${url}...`);
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(8000) });
      if (!res.ok) {
        console.log(`Page ${page} returned status ${res.status}. Finished category pagination.`);
        break;
      }
      const html = await res.text();
      
      // Find all product links
      const matches = [...html.matchAll(/href="(https:\/\/adenaagro\.com\/product\/[^"]+)"/gi)].map(m => m[1]);
      console.log(`Found ${matches.length} product links on page ${page}`);
      
      if (matches.length === 0) break;
      for (const m of matches) {
        // Clean URL
        const clean = m.split('#')[0].replace(/\/$/, '') + '/';
        productUrls.add(clean);
      }

      // Check if there is next page
      if (!html.includes(`/product-category/field/page/${page + 1}/`)) {
        console.log(`No next page link for page ${page + 1}.`);
        break;
      }
      page++;
    } catch (err) {
      console.error(`Error on page ${page}:`, err.message);
      break;
    }
  }

  console.log(`\nTotal unique field product URLs found: ${productUrls.size}`);
  console.log([...productUrls]);
  fs.writeFileSync('./field-product-urls.json', JSON.stringify([...productUrls], null, 2), 'utf-8');
}

scrapeFieldCategory();
