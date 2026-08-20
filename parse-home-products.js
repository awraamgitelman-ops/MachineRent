import fs from 'fs';

const html = fs.readFileSync('./home_page_raw.html', 'utf-8');

// Parse all products from the homepage
const products = [];
const pMatches = [...html.matchAll(/<div class="wd-product[^"]*"[\s\S]*?<a href="([^"]*)"[^>]*aria-label="([^"]*)"[\s\S]*?<img[^>]*src="([^"]*)"[\s\S]*?<h3 class="wd-entities-title"><a[^>]*>([\s\S]*?)<\/a><\/h3>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];

for (const m of pMatches) {
  const url = m[1];
  const aria = m[2];
  const img = m[3];
  const title = m[4].replace(/<[^>]+>/g, '').replace(/&#8211;/g, '–').trim();
  const rest = m[5];

  // Brand
  const brandMatch = rest.match(/<div class="wd-product-brands-links">([\s\S]*?)<\/div>/);
  const brand = brandMatch ? brandMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Price
  const priceMatch = rest.match(/<span class="price">([\s\S]*?)<\/span>/);
  const price = priceMatch ? priceMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim() : '';

  products.push({
    title,
    brand,
    price,
    img,
    url
  });
}

console.log(`Extracted ${products.length} products from homepage`);
fs.writeFileSync('./homepage_products.json', JSON.stringify(products, null, 2), 'utf-8');
console.log('Sample parsed:', products.slice(0, 5));
