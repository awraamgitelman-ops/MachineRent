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

async function runSuperfastScraper() {
  console.log('--- Starting Superfast Scraper (50 concurrent workers) ---');

  const categoryUrls = [
    { cat: 'field', name: 'Польова техніка', url: 'https://adenaagro.com/product-category/field/' },
    { cat: 'warehouse', name: 'Складська техніка', url: 'https://adenaagro.com/product-category/skladska-tehnika/' },
    { cat: 'used', name: 'Техніка Б/В', url: 'https://adenaagro.com/product-category/tehnika-b-v/' },
    { cat: 'parts', name: 'Запасні частини', url: 'https://adenaagro.com/product-category/zapchastyny/' }
  ];

  // 1. Fetch category pages in parallel
  const pagePromises = [];
  for (const c of categoryUrls) {
    for (let p = 1; p <= 30; p++) {
      const pageUrl = p === 1 ? c.url : `${c.url}page/${p}/`;
      pagePromises.push((async () => {
        try {
          const res = await fetch(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
          if (!res.ok) return [];
          const html = await res.text();
          const productBlocks = [...html.matchAll(/<div class="[^"]*product-grid-item[^"]*"[\s\S]*?<a href="([^"]*)"[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"[\s\S]*?<h3 class="wd-entities-title"><a[^>]*>([\s\S]*?)<\/a><\/h3>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];
          return productBlocks.map(pb => {
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
            return {
              slug,
              url: productUrl,
              name: title,
              brand: brand || 'Adena Agro',
              category: c.cat,
              categoryName: c.name,
              priceUah: numPrice,
              images: [imgUrl]
            };
          });
        } catch {
          return [];
        }
      })());
    }
  }

  const allPageResults = await Promise.all(pagePromises);
  const allMap = new Map();
  for (const list of allPageResults) {
    for (const item of list) {
      if (item.slug && !allMap.has(item.slug)) {
        allMap.set(item.slug, item);
      }
    }
  }

  const productsList = Array.from(allMap.values());
  console.log(`Discovered ${productsList.length} unique products from category archives.`);

  // 2. Fetch rich specs and images with concurrency 50
  const detailedProducts = [];
  const CONCURRENCY = 50;

  for (let i = 0; i < productsList.length; i += CONCURRENCY) {
    const batch = productsList.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(async (p) => {
      try {
        const res = await fetch(p.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok) return p;
        const html = await res.text();

        const imgMatches = [...html.matchAll(/data-large_image="([^"]*)"/gi)].map(m => m[1]);
        const fallbackImgMatches = [...html.matchAll(/<div class="woocommerce-product-gallery__image[^"]*"[\s\S]*?<a href="([^"]*)"/gi)].map(m => m[1]);
        const allImgs = [...new Set([...imgMatches, ...fallbackImgMatches, ...p.images])].filter(Boolean);

        const shortDescMatch = html.match(/<div class="woocommerce-product-details__short-description">([\s\S]*?)<\/div>/i);
        const shortDescription = shortDescMatch ? cleanText(shortDescMatch[1]) : `${p.name} від виробника ${p.brand}. Надійна техніка для польових та складських робіт.`;

        const descTabMatch = html.match(/<div class="woocommerce-Tabs-panel--description[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                             html.match(/<div id="tab-description"[^>]*>([\s\S]*?)<\/div>/i);
        const fullDescription = descTabMatch ? descTabMatch[1].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim() : '';

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
          fullDescription: fullDescription || shortDescription,
          specs
        };
      } catch {
        return p;
      }
    }));

    detailedProducts.push(...results);
    console.log(`Processed ${detailedProducts.length} / ${productsList.length} products...`);
  }

  // 3. Format final MACHINERY_DATA
  const formattedData = detailedProducts.map((p, index) => {
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
  console.log(`\nALL DONE! Successfully saved ${formattedData.length} products to src/data/machineryData.js`);
}

runSuperfastScraper();
