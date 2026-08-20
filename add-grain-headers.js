import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1546\\content.md', 'utf-8');
const blocks = html.split('<div class="category_index_rep');

function slugify(text) {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh',
    'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'h', 'ц': 'cz', 'ч': 'ch', 'ш': 'sh', 'щ': 'shh', 'ъ': '', 'ы': 'y', 'ь': '',
    'э': 'e', 'ю': 'yu', 'я': 'ya', 'ґ': 'g'
  };
  return text.toLowerCase()
    .split('')
    .map(char => map[char] !== undefined ? map[char] : char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const headersList = [];
const seenSlugs = new Set();

for (let i = 1; i < blocks.length; i += 2) {
  const b1 = blocks[i];
  const b2 = blocks[i + 1] || '';

  const imgMatch = b1.match(/src="(https:\/\/agrovektor\.com(?:\/\/|\/)uploads\/photo\/[^"]+)"/i);
  if (!imgMatch) continue;
  const image = imgMatch[1].replace('agrovektor.com//uploads', 'agrovektor.com/uploads');

  const titleMatch = b2.match(/<strong>([\s\S]*?)<\/strong>/i) || b1.match(/<strong>([\s\S]*?)<\/strong>/i);
  let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Жатка зернова';

  // Normalize title
  title = title.replace(/\s+/g, ' ');

  const priceBlock = b2.includes('catalog_item_price') ? b2 : b1;
  const priceNumMatch = priceBlock.match(/<span class="item_price">([\s\S]*?)<\/span>/i);
  const priceValMatch = priceBlock.match(/<span class="item_val">([\s\S]*?)<\/span>/i);

  let priceUah = 350000;
  if (priceNumMatch) {
    const rawVal = priceNumMatch[1].replace(/\s+/g, '').trim();
    const num = parseInt(rawVal) || 0;
    const cur = priceValMatch ? priceValMatch[1].trim() : 'грн';
    if (cur.includes('$') || cur.toLowerCase().includes('usd')) {
      priceUah = num * 41.5;
    } else if (cur.includes('€') || cur.toLowerCase().includes('eur')) {
      priceUah = num * 45.0;
    } else if (num > 0) {
      priceUah = num;
    }
  }

  let brand = 'AgroVektor';
  if (/John Deere/i.test(title)) brand = 'John Deere';
  else if (/Case/i.test(title)) brand = 'Case IH';
  else if (/Claas/i.test(title)) brand = 'Claas';
  else if (/New Holland/i.test(title)) brand = 'New Holland';
  else if (/Geringhoff/i.test(title)) brand = 'Geringhoff';
  else if (/Capello/i.test(title)) brand = 'Capello';
  else if (/Ettaro/i.test(title)) brand = 'Ettaro';
  else if (/ЖУ|ЖЗБ|ЖБВ|ЖН|Бердянськ/i.test(title)) brand = 'Бердянські жатки';

  let width = '6.0 м';
  const widthMatch = title.match(/(\d+[.,]?\d*)\s*(?:м|метрів|метра)/i);
  if (widthMatch) {
    width = `${widthMatch[1]} м`;
  }

  let slug = slugify(title);
  if (seenSlugs.has(slug)) {
    slug = `${slug}-${headersList.length + 1}`;
  }
  seenSlugs.add(slug);

  const pricePerShift = Math.round(priceUah * 0.035 > 8000 ? (priceUah * 0.035 > 28000 ? 24000 : priceUah * 0.035) : 12500);
  const pricePerHa = Math.round(pricePerShift / 18 > 450 ? (pricePerShift / 18 > 1200 ? 1100 : pricePerShift / 18) : 650);

  headersList.push({
    id: `zhatka-${slug}`,
    name: title,
    slug: slug,
    brand: brand,
    model: title.slice(0, 30),
    machineryType: "zhatky",
    activityType: "grain",
    pricing: {
      purchasePriceUah: priceUah,
      pricePerShiftUah: pricePerShift,
      pricePerHaUah: pricePerHa
    },
    images: [image],
    shortDescription: `Професійна зернова жатка ${title} з шириною захвату ${width}. Висока продуктивність скошування, мінімальні втрати зерна та надійний привід Schumacher.`,
    fullDescription: `Зернова жатка ${title} розроблена для прямого комбайнування зернових колосових, зернобобових та сої. Оснащена високошвидкісним ріжучим апаратом типу Schumacher, гідравлічним приводом мотовила з регулюванням обертів з кабіни комбайна, а також надійною системою копіювання рельєфу поля. Доступна для купівлі з гарантією та в сезонну оренду.`,
    specs: {
      "Робоча ширина захвату": width,
      "Призначення": "Збирання зернових, сої, гороху та бобових культур",
      "Ріжучий апарат": "Система Schumacher / планетарний привід",
      "Частота зрізів": "до 1 200 зріз/хв",
      "Сумісність": "John Deere, Case IH, Claas, New Holland, Massey Ferguson",
      "Стан": "В наявності (повна передпродажна діагностика)"
    }
  });
}

console.log('Total generated grain headers:', headersList.length);

// Merge with existing catalog
const existingSlugs = new Set(MACHINERY_DATA.map(m => m.slug));
const toAdd = headersList.filter(h => !existingSlugs.has(h.slug));

const newCatalog = [...MACHINERY_DATA, ...toAdd];
console.log('Total catalog count with grain headers:', newCatalog.length);

const fileContent = `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(newCatalog, null, 2)};\n`;
fs.writeFileSync('./src/data/machineryData.js', fileContent, 'utf-8');
console.log('Successfully updated src/data/machineryData.js with Agrovektor grain headers!');
