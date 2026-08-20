import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1546\\content.md', 'utf-8');

// Agrovektor typically formats items with class="product-item" or similar catalog-list
// Let's find all items by searching for photo images or product titles
const photoMatches = [...html.matchAll(/(https:\/\/agrovektor\.com\/\/uploads\/photo\/[^\s"'>]+|https:\/\/agrovektor\.com\/uploads\/photo\/[^\s"'>]+)/gi)];
console.log('Total photo matches:', photoMatches.length);

// Let's find the blocks around each photo
const products = [];
const seenImages = new Set();

for (const match of photoMatches) {
  let imgUrl = match[1];
  // normalize double slashes https://agrovektor.com//uploads -> https://agrovektor.com/uploads
  imgUrl = imgUrl.replace('agrovektor.com//uploads', 'agrovektor.com/uploads');
  if (seenImages.has(imgUrl)) continue;
  seenImages.add(imgUrl);

  const idx = match.index;
  const start = Math.max(0, idx - 1000);
  const end = Math.min(html.length, idx + 2500);
  const block = html.slice(start, end);

  // Extract title
  const titleMatch = block.match(/<a[^>]+class="[^"]*(?:title|name|product_name|offer_name)[^"]*"[^>]*>([\s\S]*?)<\/a>/i) ||
                     block.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/i) ||
                     block.match(/title="([^"]*(?:Жатка|жатка|John Deere|Claas|Capello|Oros|Geringhoff|Dominoni|Fantini|Case|New Holland|Moresil|Запорізька|Бердянська|САНФЛОРО)[^"]*)"/i);

  // Extract price
  const priceMatch = block.match(/class="[^"]*price[^"]*"[^>]*>([\s\S]*?)<\/(?:div|span|p)>/i) ||
                     block.match(/([0-9\s.,]{3,15}\s*(?:грн|USD|EUR|\$|€))/i);

  // Extract description snippet
  const descMatch = block.match(/class="[^"]*(?:desc|short_desc|text)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|p)>/i);

  const rawTitle = titleMatch ? (titleMatch[1].replace(/<[^>]+>/g, '').trim()) : null;
  const rawPrice = priceMatch ? (priceMatch[1].replace(/<[^>]+>/g, '').trim()) : 'Договірна';
  const rawDesc = descMatch ? (descMatch[1].replace(/<[^>]+>/g, '').trim()) : '';

  if (rawTitle && rawTitle.length > 5) {
    products.push({
      title: rawTitle,
      price: rawPrice,
      image: imgUrl,
      desc: rawDesc
    });
  }
}

console.log('Total extracted products:', products.length);
for (let i = 0; i < Math.min(products.length, 15); i++) {
  console.log(`\n--- Product ${i + 1} ---`);
  console.log('Title:', products[i].title);
  console.log('Price:', products[i].price);
  console.log('Image:', products[i].image);
  console.log('Desc:', products[i].desc.slice(0, 100));
}
