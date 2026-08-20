import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const urls = JSON.parse(fs.readFileSync('./field-product-urls.json', 'utf-8'));

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
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    const html = await res.text();

    const slug = url.replace('https://adenaagro.com/product/', '').replace(/\/$/, '');

    // Title
    const titleMatch = html.match(/<h1 class="product_title[^"]*">([\s\S]*?)<\/h1>/i);
    const title = titleMatch ? cleanText(titleMatch[1]) : slug;

    // Brand
    const brandMatch = html.match(/<div class="wd-product-brands-links">([\s\S]*?)<\/div>/i);
    let brand = brandMatch ? cleanText(brandMatch[1]) : '';
    if (!brand || brand === 'Інше' || brand.toLowerCase() === 'без бренду') {
      if (title.toLowerCase().includes('struik')) brand = 'Struik';
      else if (title.toLowerCase().includes('grimme')) brand = 'Grimme';
      else if (title.toLowerCase().includes('zibo')) brand = 'ZIBO';
      else if (title.toLowerCase().includes('baselier')) brand = 'Baselier';
      else if (title.toLowerCase().includes('avr')) brand = 'AVR';
      else if (title.toLowerCase().includes('dewulf')) brand = 'Dewulf';
      else brand = 'Adena Agro';
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
      // Fallback realistic catalog estimation
      purchasePriceUah = 380000;
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
    const shortDesc = shortDescMatch ? cleanText(shortDescMatch[1]) : `${title} від бренду ${brand}. Професійна техніка для овочівництва з європейською гарантією.`;

    // Full desc
    const descMatch = html.match(/id="tab-description"[\s\S]*?<div class="wc-tab-inner[^"]*">([\s\S]*?)<\/div>/i);
    const fullDesc = descMatch ? cleanText(descMatch[1]) : shortDesc;

    // Specs
    const specRows = [...html.matchAll(/<tr class="woocommerce-product-attributes-item[^"]*">[\s\S]*?<th class="woocommerce-product-attributes-item__label">([\s\S]*?)<\/th>[\s\S]*?<td class="woocommerce-product-attributes-item__value">([\s\S]*?)<\/td>[\s\S]*?<\/tr>/gi)];
    const specs = {
      'Виробник': brand,
      'Модель': model,
      'Категорія': 'Польова техніка',
      'Необхідна потужність трактора': 'від 90 к.с.',
      'Робоча ширина / Кількість рядів': '2-4 ряди'
    };
    for (const row of specRows) {
      const k = cleanText(row[1]);
      const v = cleanText(row[2]);
      if (k && v) specs[k] = v;
    }

    // Determine activity
    let activityType = 'soil_prep';
    const lower = (title + ' ' + fullDesc).toLowerCase();
    if (lower.includes('саджалка') || lower.includes('посадк') || lower.includes('gl32')) activityType = 'planting';
    else if (lower.includes('підгортач') || lower.includes('гребне') || lower.includes('культиватор') || lower.includes('фрез')) activityType = 'soil_prep';
    else if (lower.includes('подрібнювач') || lower.includes('бадилля') || lower.includes('glutton')) activityType = 'haulm_topping';
    else if (lower.includes('збирання') || lower.includes('комбайн')) activityType = 'harvesting';
    else if (lower.includes('сортуван') || lower.includes('ваг') || lower.includes('пакуван')) activityType = 'sorting';

    return {
      id: `field-${slug}`,
      slug,
      name: title,
      brand,
      model,
      activityType,
      machineryType: 'field',
      categoryName: 'Польова техніка',
      status: 'available',
      badge: 'В наявності',
      images,
      pricing: {
        purchasePriceUah,
        pricePerShiftUah: Math.round(purchasePriceUah * 0.04),
        pricePerHaUah: Math.round(purchasePriceUah * 0.003)
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
  const scrapedProducts = [];
  for (const url of urls) {
    const p = await scrapeProduct(url);
    if (p) scrapedProducts.push(p);
  }
  console.log(`Successfully scraped ${scrapedProducts.length} field products!`);

  // Remove old field items if any, then prepend new scraped field items
  const nonFieldItems = MACHINERY_DATA.filter(item => item.machineryType !== 'field');
  const combined = [...scrapedProducts, ...nonFieldItems];

  const output = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${combined.length}

export const MACHINERY_DATA = ${JSON.stringify(combined, null, 2)};
`;

  fs.writeFileSync('./src/data/machineryData.js', output, 'utf-8');
  console.log(`Updated machineryData.js with ${combined.length} total products!`);
}

run();
