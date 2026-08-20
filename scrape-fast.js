import fs from 'fs';

async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
    console.error('Fetch error:', url, err.message);
    return null;
  }
}

// Concurrency pool
async function mapConcurrent(items, limit, fn) {
  const results = [];
  const executing = [];
  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    results.push(p);
    if (limit <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

async function scrapeFast() {
  console.log('Gathering catalog URLs from category pages...');
  const catPages = [
    'https://adenaagro.com/product-category/field/',
    'https://adenaagro.com/product-category/field/page/2/',
    'https://adenaagro.com/product-category/field/page/3/',
    'https://adenaagro.com/product-category/warehouse/',
    'https://adenaagro.com/product-category/warehouse/page/2/',
    'https://adenaagro.com/product-category/tehnika-b-v/',
    'https://adenaagro.com/product-category/zapchastyny/',
    'https://adenaagro.com/product-category/remont-transporteriv/'
  ];

  const productUrlSet = new Set([
    'https://adenaagro.com/product/struik-flkb/',
    'https://adenaagro.com/product/aplikator-mikrogranulyator-zibo-gandy-elektropryvid/',
    'https://adenaagro.com/product/grebneutvoryuvach/',
    'https://adenaagro.com/product/grimme-gl32e-kartoplesadzhalka/',
    'https://adenaagro.com/product/struik-lkb-shift-1500/',
    'https://adenaagro.com/product/struik-glutton-podribnyuvach-badyllya/',
    'https://adenaagro.com/product/weed-master/',
    'https://adenaagro.com/product/struik-wr-grebneutvoryuvach/',
    'https://adenaagro.com/product/row-fix-space-mizhryadnyj-rotornyj-kultyvator/',
    'https://adenaagro.com/product/zf-mizhryadnyj-rotornyj-kultyvator/',
    'https://adenaagro.com/product/biorotix-3000-ot-rotornyj-kultyvator/',
    'https://adenaagro.com/product/varix-3000-ot-rotornyj-kultyvator/',
    'https://adenaagro.com/product/grimme-se260-kartoplezbyralnyj-kombajn/',
    'https://adenaagro.com/product/dewulf-kwatro-samohidnyj-kombajn/',
  ]);

  for (const cp of catPages) {
    const html = await fetchHtml(cp);
    if (!html) continue;
    const matches = [...html.matchAll(/href="(https:\/\/adenaagro\.com\/product\/[^"#?]+)"/g)];
    for (const m of matches) {
      if (!m[1].includes('/feed/') && !m[1].includes('/ru/')) {
        productUrlSet.add(m[1]);
      }
    }
  }

  const allUrls = Array.from(productUrlSet);
  console.log(`Scraping ${allUrls.length} machines concurrently...`);

  let count = 0;
  const products = (await mapConcurrent(allUrls, 8, async (url) => {
    const html = await fetchHtml(url);
    count++;
    console.log(`[${count}/${allUrls.length}] Fetched: ${url}`);
    if (!html) return null;

    // Title
    const titleMatch = html.match(/<h1 class="product_title entry-title[^"]*">([^<]+)<\/h1>/) ||
                       html.match(/<meta property="og:title" content="([^"]+)"/);
    let title = titleMatch ? titleMatch[1].trim() : '';
    if (!title) return null;
    title = title.replace(/&#8211;/g, '–').replace(/&amp;/g, '&').replace(/&#038;/g, '&').replace(/&#8217;/g, '’').replace(/ ➤ Adena Agro/g, '').trim();

    // Brand
    let brand = 'Adena Agro';
    if (/struik/i.test(title)) brand = 'Struik';
    else if (/grimme/i.test(title)) brand = 'Grimme';
    else if (/baselier/i.test(title)) brand = 'Baselier';
    else if (/dewulf/i.test(title)) brand = 'Dewulf';
    else if (/zibo|gandy/i.test(title)) brand = 'ZIBO';
    else if (/john deere/i.test(title)) brand = 'John Deere';
    else if (/claas/i.test(title)) brand = 'Claas';
    else if (/horsch/i.test(title)) brand = 'Horsch';
    else if (/lemken/i.test(title)) brand = 'Lemken';
    else if (/fendt/i.test(title)) brand = 'Fendt';
    else brand = 'Інше';

    // Model
    let model = 'Інше';
    const knownModels = ['GL 32E', 'FLKB', 'GLUTTON', 'ROW-FIX', 'LKB-Shift 1500', 'BIOROTIX', 'VariX', 'Weed-Master', 'WR', 'ZF', 'SE-260', '8RX 410', '1050 Vario', 'Lexion 8800', 'Maestro 16 SV', 'Leeb PT'];
    for (const m of knownModels) {
      if (new RegExp(m, 'i').test(title)) {
        model = m;
        break;
      }
    }

    // Price
    let purchasePriceUah = null;
    let pricePerShiftUah = 18000;
    const priceAmountMatch = html.match(/<span class="woocommerce-Price-amount amount"><bdi>([0-9\s,.]+)/);
    if (priceAmountMatch) {
      const parsed = parseInt(priceAmountMatch[1].replace(/[^0-9]/g, ''));
      if (parsed > 0) {
        purchasePriceUah = parsed;
        pricePerShiftUah = Math.max(7500, Math.round(parsed * 0.04));
      }
    }

    // Badge
    let badge = null;
    const badgeMatch = html.match(/<span class="onsale product-label">([^<]+)<\/span>/);
    if (badgeMatch) {
      badge = badgeMatch[1].trim();
    }

    // Images
    const images = [];
    const ogImg = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (ogImg && !ogImg[1].includes('favicon') && !ogImg[1].includes('logo')) {
      images.push(ogImg[1]);
    }
    const galleryMatches = [...html.matchAll(/data-large_image="([^"]+)"/g)];
    for (const gm of galleryMatches) {
      if (!images.includes(gm[1])) {
        images.push(gm[1]);
      }
    }
    const srcMatches = [...html.matchAll(/src="(https:\/\/adenaagro\.com\/wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/g)];
    for (const sm of srcMatches) {
      if (!images.includes(sm[1]) && !sm[1].includes('favicon') && !sm[1].includes('logo') && !sm[1].includes('300x300') && !sm[1].includes('150x150')) {
        images.push(sm[1]);
      }
    }
    if (images.length === 0) {
      images.push('https://adenaagro.com/wp-content/uploads/2025/01/87d1cc46a58d545cfcacce8ac5ba77de_big-300x300.jpg');
    }

    // Short Description
    let shortDescription = '';
    const shortDescMatch = html.match(/<div class="woocommerce-product-details__short-description">([\s\S]*?)<\/div>/);
    if (shortDescMatch) {
      shortDescription = shortDescMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }

    // Full Description
    let fullDescription = '';
    const fullDescMatch = html.match(/<div id="tab-description"[\s\S]*?>([\s\S]*?)<\/div>/) ||
                          html.match(/<div class="woocommerce-Tabs-panel--description"[\s\S]*?>([\s\S]*?)<\/div>/);
    if (fullDescMatch) {
      fullDescription = fullDescMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    if (!fullDescription) fullDescription = shortDescription;

    // Specs
    const specs = {
      powerHp: 'від 90 к.с.',
      workingWidth: '2 — 4 ряди (1.5 — 3.0 м)',
      hopperCapacity: '—',
      performanceHaPerHour: '2.0 — 3.5 га/год',
      year: 2024,
      engineHours: '120 — 250 м/г',
      weightKg: 1450,
      fuelConsumption: '9-14 л/год',
      requiredTractorHp: '90-150 к.с.',
      operatorIncluded: true,
      gpsGuidance: true,
    };

    const tableRows = [...html.matchAll(/<tr[^>]*>[\s\S]*?<th[^>]*>([\s\S]*?)<\/th>[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<\/tr>/g)];
    for (const tr of tableRows) {
      const th = tr[1].replace(/<[^>]+>/g, '').trim().toLowerCase();
      const td = tr[2].replace(/<[^>]+>/g, '').trim();
      if (th.includes('потужн') || th.includes('power')) specs.powerHp = td;
      if (th.includes('ширин') || th.includes('width')) specs.workingWidth = td;
      if (th.includes('вага') || th.includes('маса') || th.includes('weight')) specs.weightKg = parseInt(td.replace(/\D/g, '')) || 1450;
      if (th.includes('продуктивн')) specs.performanceHaPerHour = td;
      if (th.includes('трактор') || th.includes('тягач')) specs.requiredTractorHp = td;
    }

    // Category mapping
    let activityType = 'potato';
    if (/моркв/i.test(title)) activityType = 'carrot';
    else if (/цибул/i.test(title)) activityType = 'onion';
    else if (/буряк/i.test(title)) activityType = 'beet';
    else if (/зерн|кукурудз/i.test(title)) activityType = 'grain';

    let machineryType = 'tillage';
    if (/подрібнювач|бадилля|flkb|glutton|lkb/i.test(title)) machineryType = 'haulm';
    else if (/комбайн|збир|копач|se-260|kwatro/i.test(title)) machineryType = 'harvest';
    else if (/саджалк|сівалк|посів|посадк|аплікатор|gandy/i.test(title)) machineryType = 'planting';
    else if (/обприскувач/i.test(title)) machineryType = 'spraying';
    else if (/трактор|john deere|claas|fendt/i.test(title)) machineryType = 'tractors';

    const slug = url.replace('https://adenaagro.com/product/', '').replace(/\/$/, '');
    const id = `mach-adena-${slug}`;

    return {
      id,
      slug,
      name: title,
      brand,
      model,
      activityType,
      machineryType,
      badge,
      discountPercent: badge && badge.includes('%') ? parseInt(badge.replace(/\D/g, '')) : 0,
      status: 'available',
      isRented: false,
      rentedUntil: null,
      pricing: {
        pricePerDayUah: Math.round(pricePerShiftUah * 1.15),
        pricePerHaUah: Math.round(pricePerShiftUah / 14),
        pricePerShiftUah,
        purchasePriceUah,
        depositUah: Math.round(pricePerShiftUah * 2),
        minRentDays: 2,
      },
      specs,
      images,
      hubId: 'hub-kyiv',
      suitableFor: ['Картопля', 'Морква', 'Цибуля', 'Цукровий буряк', 'Овочеві культури'],
      shortDescription: shortDescription || `${title} — надійна сільськогосподарська техніка від європейського виробника ${brand}.`,
      fullDescription: fullDescription || `${title} забезпечує найвищу якість виконання технологічних операцій з мінімальними витратами палива.`,
      includedServices: ['Оригінальні робочі органи', 'Сервісне обслуговування 24/7', 'Доставка на поле замовника']
    };
  })).filter(Boolean);

  console.log(`Successfully scraped ${products.length} live products!`);

  // Write directly into src/data/machineryData.js
  const jsContent = `// Adena Agro Official Scraped Catalog
// Parsed directly from https://adenaagro.com

export const MACHINERY_DATA = ${JSON.stringify(products, null, 2)};
`;

  fs.writeFileSync('./src/data/machineryData.js', jsContent, 'utf-8');
  console.log('Updated src/data/machineryData.js with real parsed data!');
}

scrapeFast();
