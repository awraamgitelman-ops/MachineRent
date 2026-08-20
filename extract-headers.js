import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1546\\content.md', 'utf-8');

const blocks = html.split('<div class="category_index_rep');
console.log('Total category_index_rep blocks:', blocks.length - 1);

const parsedProducts = [];

for (let i = 1; i < blocks.length; i++) {
  const b = blocks[i];

  // Title
  const titleMatch = b.match(/<div class="category_index_title"[\s\S]*?<a[^>]*>[\s\S]*?<strong>([\s\S]*?)<\/strong>/i) ||
                     b.match(/alt="([^"]+)"/i);
  if (!titleMatch) continue;
  const title = titleMatch[1].replace(/<[^>]+>/g, '').trim();

  // Image
  const imgMatch = b.match(/<img[^>]+src="(https:\/\/agrovektor\.com(?:\/\/|\/)uploads\/photo\/[^"]+)"/i) ||
                   b.match(/src="(https:\/\/[^"]+photo\/[^"]+)"/i);
  let image = imgMatch ? imgMatch[1].replace('agrovektor.com//uploads', 'agrovektor.com/uploads') : '';

  // Price
  const priceNumMatch = b.match(/<span class="item_price">([\s\S]*?)<\/span>/i);
  const priceValMatch = b.match(/<span class="item_val">([\s\S]*?)<\/span>/i);
  let priceStr = 'Договірна';
  let priceNum = 0;

  if (priceNumMatch) {
    const rawVal = priceNumMatch[1].replace(/\s+/g, '').trim();
    priceNum = parseInt(rawVal) || 0;
    const cur = priceValMatch ? priceValMatch[1].trim() : 'грн';
    priceStr = `${priceNumMatch[1].trim()} ${cur}`;
  }

  // Location / City
  const cityMatch = b.match(/<div class="catalog_city_more">([\s\S]*?)<\/div>/i);
  const city = cityMatch ? cityMatch[1].replace(/<[^>]+>/g, '').trim() : 'Україна';

  // Description / snippet
  const descMatch = b.match(/<div class="catalog_item_desc[^"]*">([\s\S]*?)<\/div>/i) ||
                    b.match(/<div class="category_index_rep_t">([\s\S]*?)<\/div>/i);
  const desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  parsedProducts.push({
    title,
    price: priceStr,
    priceNum,
    image,
    city,
    desc
  });
}

console.log('Parsed products count:', parsedProducts.length);
for (let i = 0; i < parsedProducts.length; i++) {
  const p = parsedProducts[i];
  console.log(`\n[${i + 1}] ${p.title}`);
  console.log('Price:', p.price, `(${p.priceNum} UAH)`);
  console.log('Image:', p.image);
  console.log('City:', p.city);
}
