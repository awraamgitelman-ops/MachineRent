import fs from 'fs';

async function fetchProduct() {
  const url = 'https://adenaagro.com/product/zvazhuvalno-pakuvalna-mashyna-elektronna/';
  console.log(`Fetching ${url}...`);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  fs.writeFileSync('./scraped_domasz_we30.html', html, 'utf-8');

  // Title
  const titleMatch = html.match(/<h1 class="product_title[^"]*">([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Brand
  const brandMatch = html.match(/<div class="wd-product-brands-links">([\s\S]*?)<\/div>/i);
  const brand = brandMatch ? brandMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Images
  const imgMatches = [...html.matchAll(/data-large_image="([^"]*)"/gi)].map(m => m[1]);
  const fallbackImgMatches = [...html.matchAll(/<div class="woocommerce-product-gallery__image[^"]*"[\s\S]*?<a href="([^"]*)"/gi)].map(m => m[1]);
  const images = [...new Set([...imgMatches, ...fallbackImgMatches])].filter(Boolean);

  // Short desc
  const shortDescMatch = html.match(/<div class="woocommerce-product-details__short-description">([\s\S]*?)<\/div>/i);
  const shortDesc = shortDescMatch ? shortDescMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  // Full desc
  const fullDescMatch = html.match(/<div id="tab-description"[^>]*>([\s\S]*?)<\/div>/i) ||
                        html.match(/<div class="woocommerce-Tabs-panel--description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const fullDesc = fullDescMatch ? fullDescMatch[1].trim() : '';

  // Specs
  const specRows = [...html.matchAll(/<tr class="woocommerce-product-attributes-item[^"]*">[\s\S]*?<th class="woocommerce-product-attributes-item__label">([\s\S]*?)<\/th>[\s\S]*?<td class="woocommerce-product-attributes-item__value">([\s\S]*?)<\/td>[\s\S]*?<\/tr>/gi)];
  const specs = {};
  for (const row of specRows) {
    const key = row[1].replace(/<[^>]+>/g, '').trim();
    const val = row[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (key && val) specs[key] = val;
  }

  // Price
  const priceMatch = html.match(/<span class="price">([\s\S]*?)<\/span>/i);
  const priceStr = priceMatch ? priceMatch[1].replace(/<[^>]+>/g, ' ').trim() : '';

  console.log('Title:', title);
  console.log('Brand:', brand);
  console.log('Images:', images);
  console.log('Short Desc:', shortDesc);
  console.log('Specs:', specs);
  console.log('Price:', priceStr);
}

fetchProduct();
