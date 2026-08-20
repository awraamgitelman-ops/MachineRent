import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const missingUrls = [
  'https://adenaagro.com/product/gychkovydalyayuchyj-transprter-200-40946-grimme-dr-1500/',
  'https://adenaagro.com/product/transporter-gychkovidkydnyj-anna-2-h-ryadna/',
  'https://adenaagro.com/product/rolyk-pryvodu-transportera-006-00066-r/',
  'https://adenaagro.com/product/transporter-zavantazhuvalnyj-300-34940-grimme-se-75-30/',
  'https://adenaagro.com/product/pidtrymuyuchyj-rolyk-602-00052-r-grimme/',
  'https://adenaagro.com/product/rolyk-1131002797-r-holmer/',
  'https://adenaagro.com/product/zirochka-564230024-bolko-karlik/',
  'https://adenaagro.com/product/val-dlya-pryjmalnogo-bunkera-50x700-grimme-rh-tc-076-05615-r/',
  'https://adenaagro.com/product/holmer-401051155-prividnyj-val/',
  'https://adenaagro.com/product/adena-agro-perekydach-kontejneriv-z-ovochamy/'
];

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8230;/g, '...')
    .replace(/&nbsp;/g, ' ');
}

function cleanText(html) {
  if (!html) return '';
  return decodeHtml(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

async function scrapeProduct(url) {
  console.log(`Scraping ${url}...`);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      console.log(`Failed ${url}: ${res.status}`);
      return null;
    }
    const html = await res.text();

    const slug = url.replace('https://adenaagro.com/product/', '').replace(/\/$/, '');

    // Title
    const titleMatch = html.match(/<h1 class="product_title[^"]*">([\s\S]*?)<\/h1>/i);
    const title = titleMatch ? cleanText(titleMatch[1]) : slug;

    // Brand
    const brandMatch = html.match(/<div class="wd-product-brands-links">([\s\S]*?)<\/div>/i);
    let brand = brandMatch ? cleanText(brandMatch[1]) : '';
    if (!brand || brand === 'Інше' || brand.toLowerCase() === 'без бренду') {
      if (title.toLowerCase().includes('grimme')) brand = 'Grimme';
      else if (title.toLowerCase().includes('struik')) brand = 'Struik';
      else if (title.toLowerCase().includes('anna')) brand = 'Anna';
      else if (title.toLowerCase().includes('holmer')) brand = 'Holmer';
      else if (title.toLowerCase().includes('bolko')) brand = 'Bolko';
      else if (title.toLowerCase().includes('karlik')) brand = 'Karlik';
      else if (title.toLowerCase().includes('domasz')) brand = 'Domasz';
      else brand = 'AGRO RENTEX';
    }

    // Model
    const model = title.split('–')[0].split('-')[0].trim();

    // Price
    const priceMatch = html.match(/<span class="woocommerce-Price-amount amount">[\s\S]*?<bdi>([\s\S]*?)<\/bdi>/i);
    let purchasePriceUah = 0;
    if (priceMatch) {
      const numStr = priceMatch[1].replace(/<[^>]+>/g, '').replace(/\D/g, '');
      if (numStr) purchasePriceUah = parseInt(numStr, 10);
    }
    if (!purchasePriceUah) {
      purchasePriceUah = 5000;
    }

    // Images
    const imgMatches = [...html.matchAll(/data-large_image="([^"]*)"/gi)].map(m => m[1]);
    const fallbackImgs = [...html.matchAll(/<div class="woocommerce-product-gallery__image[^"]*"[\s\S]*?<a href="([^"]*)"/gi)].map(m => m[1]);
    let images = [...new Set([...imgMatches, ...fallbackImgs])].filter(img => 
      img && 
      !img.includes('woocommerce-placeholder') && 
      !img.includes('placeholder-700x700')
    );

    if (images.length === 0) {
      const anyImgs = [...html.matchAll(/<img[^>]+src="([^">]+\.(?:jpg|jpeg|png|webp))"/gi)].map(m => m[1])
        .filter(img => img.includes('uploads') && !img.includes('placeholder'));
      images = [...new Set(anyImgs)];
    }

    if (images.length === 0) {
      images = ['https://adenaagro.com/wp-content/uploads/2022/12/traktor-768x432.webp'];
    }

    // Short desc
    const shortDescMatch = html.match(/<div class="woocommerce-product-details__short-description">([\s\S]*?)<\/div>/i);
    const shortDesc = shortDescMatch ? cleanText(shortDescMatch[1]) : `${title}. Оригінальна якість та гарантія AGRO RENTEX.`;

    // Full desc
    const descMatch = html.match(/id="tab-description"[\s\S]*?<div class="wc-tab-inner[^"]*">([\s\S]*?)<\/div>/i);
    const fullDesc = descMatch ? cleanText(descMatch[1]) : shortDesc;

    // Specs
    const specRows = [...html.matchAll(/<tr class="woocommerce-product-attributes-item[^"]*">[\s\S]*?<th class="woocommerce-product-attributes-item__label">([\s\S]*?)<\/th>[\s\S]*?<td class="woocommerce-product-attributes-item__value">([\s\S]*?)<\/td>[\s\S]*?<\/tr>/gi)];
    const specs = {
      'Виробник': brand,
      'Модель': model,
      'Категорія': 'Запасні частини'
    };
    for (const row of specRows) {
      const k = cleanText(row[1]);
      const v = cleanText(row[2]);
      if (k && v) specs[k] = v;
    }

    // Determine machineryType and categoryName
    let machineryType = 'parts';
    let categoryName = 'Запасні частини';
    const lower = (title + ' ' + fullDesc).toLowerCase();
    if (lower.includes('комбайн') || lower.includes('бункер')) {
      machineryType = 'used';
      categoryName = 'Техніка Б/В';
    } else if (lower.includes('перекидач')) {
      machineryType = 'warehouse';
      categoryName = 'Складська техніка';
    }

    return {
      id: `part-${slug}`,
      slug,
      name: title,
      brand,
      model,
      activityType: 'harvesting',
      machineryType,
      categoryName,
      status: 'available',
      badge: 'В наявності',
      images,
      pricing: {
        purchasePriceUah,
        pricePerShiftUah: Math.round(purchasePriceUah * 0.05),
        pricePerHaUah: Math.round(purchasePriceUah * 0.005)
      },
      specs,
      shortDescription: shortDesc,
      fullDescription: fullDesc,
      aliases: [slug]
    };
  } catch (err) {
    console.error(`Error scraping ${url}:`, err.message);
    return null;
  }
}

async function run() {
  const newItems = [];
  for (const u of missingUrls) {
    const item = await scrapeProduct(u);
    if (item) newItems.push(item);
  }

  console.log(`Scraped ${newItems.length} missing items!`);

  // Merge into MACHINERY_DATA without duplicates
  const existingSlugs = new Set(MACHINERY_DATA.map(m => m.slug));
  const toAdd = newItems.filter(item => !existingSlugs.has(item.slug));

  const merged = [...MACHINERY_DATA, ...toAdd];

  const out = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${merged.length}

export const MACHINERY_DATA = ${JSON.stringify(merged, null, 2)};
`;

  fs.writeFileSync('./src/data/machineryData.js', out, 'utf-8');
  console.log(`Successfully added ${toAdd.length} items to MACHINERY_DATA! Total now: ${merged.length}`);
}

run();
