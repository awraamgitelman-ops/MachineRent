import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1546\\content.md', 'utf-8');

const blocks = html.split('<div class="category_index_rep');
console.log('Total blocks:', blocks.length - 1);

const paired = [];

for (let i = 1; i < blocks.length; i += 2) {
  const b1 = blocks[i];
  const b2 = blocks[i + 1] || '';

  // Photo is in b1
  const imgMatch = b1.match(/src="(https:\/\/agrovektor\.com(?:\/\/|\/)uploads\/photo\/[^"]+)"/i);
  if (!imgMatch) continue;
  const image = imgMatch[1].replace('agrovektor.com//uploads', 'agrovektor.com/uploads');

  // Title in b2 or b1
  const titleMatch = b2.match(/<strong>([\s\S]*?)<\/strong>/i) || b1.match(/<strong>([\s\S]*?)<\/strong>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Жатка зернова';

  // Price in b2 or b1
  const priceBlock = b2.includes('catalog_item_price') ? b2 : b1;
  const priceNumMatch = priceBlock.match(/<span class="item_price">([\s\S]*?)<\/span>/i);
  const priceValMatch = priceBlock.match(/<span class="item_val">([\s\S]*?)<\/span>/i);

  let priceUah = 350000; // default realistic fallback
  let priceFormatted = 'Договірна';

  if (priceNumMatch) {
    const rawVal = priceNumMatch[1].replace(/\s+/g, '').trim();
    const num = parseInt(rawVal) || 0;
    const cur = priceValMatch ? priceValMatch[1].trim() : 'грн';
    
    if (cur.includes('$') || cur.toLowerCase().includes('usd')) {
      priceUah = num * 41.5;
    } else if (cur.includes('€') || cur.toLowerCase().includes('eur')) {
      priceUah = num * 45.0;
    } else {
      priceUah = num;
    }
    priceFormatted = `${num.toLocaleString()} ${cur}`;
  }

  // City in b2
  const cityMatch = b2.match(/<div class="catalog_city_more">([\s\S]*?)<\/div>/i);
  const city = cityMatch ? cityMatch[1].replace(/<[^>]+>/g, '').trim() : 'Україна';

  // Brand extraction
  let brand = 'AgroVektor';
  if (/John Deere/i.test(title)) brand = 'John Deere';
  else if (/Case/i.test(title)) brand = 'Case IH';
  else if (/Claas/i.test(title)) brand = 'Claas';
  else if (/New Holland/i.test(title)) brand = 'New Holland';
  else if (/Geringhoff/i.test(title)) brand = 'Geringhoff';
  else if (/Capello/i.test(title)) brand = 'Capello';
  else if (/Oros/i.test(title)) brand = 'Oros';
  else if (/ЖУ|ЖЗБ|ЖБВ|ЖН|Бердянськ/i.test(title)) brand = 'Бердянські жатки';

  paired.push({
    title,
    brand,
    priceUah,
    priceFormatted,
    image,
    city
  });
}

console.log('Total paired products:', paired.length);
for (let i = 0; i < paired.length; i++) {
  console.log(`[${i + 1}] ${paired[i].brand} | ${paired[i].title} | ${paired[i].priceUah} UAH | ${paired[i].image}`);
}
