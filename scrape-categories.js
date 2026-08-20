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

async function scrapeCategories() {
  const categoryUrls = [
    'https://adenaagro.com/product-category/field/',
    'https://adenaagro.com/product-category/field/page/2/',
    'https://adenaagro.com/product-category/field/page/3/',
    'https://adenaagro.com/product-category/warehouse/',
    'https://adenaagro.com/product-category/warehouse/page/2/',
    'https://adenaagro.com/product-category/zapchastyny/',
    'https://adenaagro.com/product-category/remont-transporteriv/'
  ];

  const productUrlSet = new Set();

  for (const catUrl of categoryUrls) {
    console.log('Scanning category:', catUrl);
    const html = await fetchHtml(catUrl);
    if (!html) continue;

    const matches = [...html.matchAll(/href="(https:\/\/adenaagro\.com\/product\/[^"#?]+)"/g)];
    for (const m of matches) {
      if (!m[1].includes('/feed/') && !m[1].includes('/ru/')) {
        productUrlSet.add(m[1]);
      }
    }
  }

  // Also check sitemaps for Ukrainian product URLs
  const sitemaps = [
    'https://adenaagro.com/product-sitemap.xml',
    'https://adenaagro.com/product-sitemap2.xml',
    'https://adenaagro.com/product-sitemap3.xml',
    'https://adenaagro.com/product-sitemap4.xml',
    'https://adenaagro.com/product-sitemap5.xml',
    'https://adenaagro.com/product-sitemap6.xml',
    'https://adenaagro.com/product-sitemap7.xml'
  ];

  for (const smUrl of sitemaps) {
    console.log('Checking sitemap:', smUrl);
    const sitemapText = await fetchHtml(smUrl);
    if (!sitemapText) continue;

    const matches = [...sitemapText.matchAll(/<loc>(https:\/\/adenaagro\.com\/product\/[^<]+)<\/loc>/g)];
    for (const m of matches) {
      if (!m[1].includes('/ru/')) {
        productUrlSet.add(m[1]);
      }
    }
  }

  const allUrls = Array.from(productUrlSet);
  console.log(`Found total ${allUrls.length} unique Ukrainian product URLs`);

  const products = [];

  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];
    console.log(`[${i + 1}/${allUrls.length}] Parsing: ${url}`);
    const html = await fetchHtml(url);
    if (!html) continue;

    // Extract title
    const titleMatch = html.match(/<h1 class="product_title entry-title[^"]*">([^<]+)<\/h1>/) ||
                       html.match(/<meta property="og:title" content="([^"]+)"/);
    let title = titleMatch ? titleMatch[1].trim() : 'Товар Adena Agro';
    title = title.replace(/&#8211;/g, '–').replace(/&amp;/g, '&').replace(/&#038;/g, '&').replace(/&#8217;/g, '’').replace(/ ➤ Adena Agro/g, '');

    // Extract Brand
    let brand = 'Інше';
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

    // Extract Model
    let model = 'Інше';
    const knownModels = ['GL 32E', 'FLKB', 'GLUTTON', 'ROW-FIX', 'LKB-Shift 1500', 'BIOROTIX', 'VariX', 'Weed-Master', 'WR', 'ZF', 'SE-260', '8RX 410', '1050 Vario', 'Lexion 8800', 'Maestro 16 SV', 'Leeb PT'];
    for (const m of knownModels) {
      if (new RegExp(m, 'i').test(title)) {
        model = m;
        break;
      }
    }

    // Extract Price
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

    // Extract Discount Badge
    let badge = null;
    const badgeMatch = html.match(/<span class="onsale product-label">([^<]+)<\/span>/);
    if (badgeMatch) {
      badge = badgeMatch[1].trim();
    }

    // Extract Images
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

    // Extract Short Description
    let shortDescription = '';
    const shortDescMatch = html.match(/<div class="woocommerce-product-details__short-description">([\s\S]*?)<\/div>/);
    if (shortDescMatch) {
      shortDescription = shortDescMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }

    // Extract Full Description
    let fullDescription = '';
    const fullDescMatch = html.match(/<div id="tab-description"[\s\S]*?>([\s\S]*?)<\/div>/) ||
                          html.match(/<div class="woocommerce-Tabs-panel--description"[\s\S]*?>([\s\S]*?)<\/div>/);
    if (fullDescMatch) {
      fullDescription = fullDescMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    if (!fullDescription) fullDescription = shortDescription;

    // Extract Specs Table / Attributes
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
    if (title.toLowerCase().includes('моркв')) activityType = 'carrot';
    else if (title.toLowerCase().includes('цибул')) activityType = 'onion';
    else if (title.toLowerCase().includes('буряк')) activityType = 'beet';
    else if (title.toLowerCase().includes('зерн') || title.toLowerCase().includes('кукурудз')) activityType = 'grain';

    let machineryType = 'tillage';
    if (/подрібнювач|бадилля|flkb|glutton|lkb/i.test(title)) machineryType = 'haulm';
    else if (/комбайн|збир|копач|se-260|kwatro/i.test(title)) machineryType = 'harvest';
    else if (/саджалк|сівалк|посів|посадк|аплікатор|gandy/i.test(title)) machineryType = 'planting';
    else if (/обприскувач/i.test(title)) machineryType = 'spraying';
    else if (/трактор|john deere|claas|fendt/i.test(title)) machineryType = 'tractors';

    const slug = url.replace('https://adenaagro.com/product/', '').replace(/\/$/, '');
    const id = `mach-adena-${slug}`;

    products.push({
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
    });
  }

  console.log(`Successfully scraped ${products.length} products!`);
  fs.writeFileSync('./scraped_products.json', JSON.stringify(products, null, 2), 'utf-8');
  console.log('Saved to ./scraped_products.json');
}

scrapeCategories();
