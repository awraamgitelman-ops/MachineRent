import fs from 'fs';

function cleanText(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchWithTimeout(url, timeoutMs = 4000) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(timeoutMs)
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function runScraper() {
  console.log('=== SCRAPING ALL PRODUCTS FROM ADENAAGRO.COM ===');

  const categories = [
    { cat: 'field', name: 'Польова техніка', url: 'https://adenaagro.com/product-category/field/' },
    { cat: 'warehouse', name: 'Складська техніка', url: 'https://adenaagro.com/product-category/skladska-tehnika/' },
    { cat: 'used', name: 'Техніка Б/В', url: 'https://adenaagro.com/product-category/tehnika-b-v/' },
    { cat: 'parts', name: 'Запасні частини', url: 'https://adenaagro.com/product-category/zapchastyny/' }
  ];

  const productsMap = new Map();

  for (const c of categories) {
    console.log(`Scanning category ${c.name}...`);
    for (let p = 1; p <= 15; p++) {
      const pageUrl = p === 1 ? c.url : `${c.url}page/${p}/`;
      const html = await fetchWithTimeout(pageUrl, 4000);
      if (!html) break;

      const productBlocks = [...html.matchAll(/<div class="[^"]*product-grid-item[^"]*"[\s\S]*?<a href="([^"]*)"[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"[\s\S]*?<h3 class="wd-entities-title"><a[^>]*>([\s\S]*?)<\/a><\/h3>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];
      if (productBlocks.length === 0) break;

      for (const pb of productBlocks) {
        const productUrl = pb[1];
        const imgUrl = pb[2];
        const title = cleanText(pb[3]);
        const rest = pb[4];
        const brandMatch = rest.match(/<div class="wd-product-brands-links">([\s\S]*?)<\/div>/);
        const brand = brandMatch ? cleanText(brandMatch[1]) : 'Adena Agro';
        const priceMatch = rest.match(/<span class="price">([\s\S]*?)<\/span>/);
        const priceStr = priceMatch ? cleanText(priceMatch[1]) : '';
        const numPrice = parseInt(priceStr.replace(/\D/g, '')) || 0;
        const slug = productUrl.replace(/https?:\/\/[^\/]+\/product\//, '').replace(/\/$/, '');

        if (slug && !productsMap.has(slug)) {
          productsMap.set(slug, {
            slug,
            url: productUrl,
            name: title,
            brand: brand || 'Adena Agro',
            category: c.cat,
            categoryName: c.name,
            priceUah: numPrice,
            images: [imgUrl]
          });
        }
      }
    }
  }

  console.log(`Discovered ${productsMap.size} unique products.`);
  const productsList = Array.from(productsMap.values());

  // Concurrently enrich product details in batches of 20
  const BATCH_SIZE = 20;
  const enriched = [];

  for (let i = 0; i < productsList.length; i += BATCH_SIZE) {
    const batch = productsList.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(async (p) => {
      const html = await fetchWithTimeout(p.url, 4000);
      if (!html) {
        return {
          ...p,
          shortDescription: `${p.name} від ${p.brand}. Надійна техніка для овочівництва з європейською гарантією.`,
          fullDescription: `${p.name} від виробника ${p.brand}. Надійне рішення для вашого агрогосподарства.`,
          specs: { 'Виробник': p.brand }
        };
      }

      const imgMatches = [...html.matchAll(/data-large_image="([^"]*)"/gi)].map(m => m[1]);
      const fallbackImgMatches = [...html.matchAll(/<div class="woocommerce-product-gallery__image[^"]*"[\s\S]*?<a href="([^"]*)"/gi)].map(m => m[1]);
      const allImgs = [...new Set([...imgMatches, ...fallbackImgMatches, ...p.images])].filter(Boolean);

      const shortDescMatch = html.match(/<div class="woocommerce-product-details__short-description">([\s\S]*?)<\/div>/i);
      const shortDescription = shortDescMatch ? cleanText(shortDescMatch[1]) : `${p.name} від ${p.brand}. Надійна європейська техніка для картоплі та овочів.`;

      const descTabMatch = html.match(/<div class="woocommerce-Tabs-panel--description[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                           html.match(/<div id="tab-description"[^>]*>([\s\S]*?)<\/div>/i);
      const fullDescription = descTabMatch ? descTabMatch[1].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim() : shortDescription;

      const specs = {};
      const specRows = [...html.matchAll(/<tr class="woocommerce-product-attributes-item[^"]*">[\s\S]*?<th class="woocommerce-product-attributes-item__label">([\s\S]*?)<\/th>[\s\S]*?<td class="woocommerce-product-attributes-item__value">([\s\S]*?)<\/td>[\s\S]*?<\/tr>/gi)];
      for (const row of specRows) {
        const key = cleanText(row[1]);
        const val = cleanText(row[2]);
        if (key && val) specs[key] = val;
      }

      return {
        ...p,
        images: allImgs.length > 0 ? allImgs : p.images,
        shortDescription,
        fullDescription,
        specs
      };
    }));

    enriched.push(...batchResults);
    console.log(`Enriched ${enriched.length} / ${productsList.length} products...`);
  }

  // Format into MACHINERY_DATA
  const formattedData = enriched.map((p, index) => {
    let activityType = 'soil_preparation';
    const nameLower = p.name.toLowerCase();
    const catLower = p.category.toLowerCase();

    if (nameLower.includes('комбайн') || nameLower.includes('копач') || nameLower.includes('збиральн')) {
      activityType = 'harvesting';
    } else if (nameLower.includes('саджалк') || nameLower.includes('посадк') || nameLower.includes('сівалк')) {
      activityType = 'planting';
    } else if (nameLower.includes('обприскувач') || nameLower.includes('внесення') || nameLower.includes('мікрогранулятор') || nameLower.includes('підживлення')) {
      activityType = 'fertilizing';
    } else if (catLower === 'warehouse' || nameLower.includes('сортувальн') || nameLower.includes('ваги') || nameLower.includes('пакувальн') || nameLower.includes('бункер') || nameLower.includes('очищення')) {
      activityType = 'sorting';
    } else if (catLower === 'parts' || nameLower.includes('ролик') || nameLower.includes('пас') || nameLower.includes('зірочка') || nameLower.includes('вал') || nameLower.includes('транспортер')) {
      activityType = 'maintenance';
    }

    const shiftPrice = p.priceUah > 0 && p.priceUah < 500000 
      ? Math.round(p.priceUah * 0.08) 
      : (p.priceUah >= 500000 ? Math.round(p.priceUah * 0.015) : 18000);

    return {
      id: `adena-${index + 1}`,
      slug: p.slug,
      name: p.name,
      brand: p.brand || 'Adena Agro',
      model: p.name.split('–')[0].trim(),
      activityType,
      machineryType: p.category,
      categoryName: p.categoryName,
      status: 'available',
      badge: p.priceUah > 1000000 ? 'Преміум' : (p.priceUah > 0 ? 'В наявності' : 'Під замовлення'),
      images: p.images,
      pricing: {
        purchasePriceUah: p.priceUah > 0 ? p.priceUah : null,
        pricePerShiftUah: Math.max(1200, shiftPrice),
        pricePerHaUah: Math.round(shiftPrice / 12)
      },
      specs: {
        powerHp: p.specs['Необхідна потужність трактора'] || p.specs['Потужність'] || 'від 90 к.с.',
        workingWidth: p.specs['Робоча ширина'] || p.specs['Кількість рядів'] || '2-4 ряди',
        operatorIncluded: true,
        fuelIncluded: false,
        minRentDays: 1,
        ...p.specs
      },
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription
    };
  });

  const fileOutput = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${formattedData.length}

export const MACHINERY_DATA = ${JSON.stringify(formattedData, null, 2)};
`;

  fs.writeFileSync('./src/data/machineryData.js', fileOutput, 'utf-8');
  console.log(`\nCOMPLETED! Saved ${formattedData.length} products to src/data/machineryData.js`);
}

runScraper();
