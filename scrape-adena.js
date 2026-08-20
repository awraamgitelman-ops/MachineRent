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

async function scrapeAll() {
  console.log('Fetching product sitemap...');
  const sitemapXml = await fetchHtml('https://adenaagro.com/product-sitemap.xml');
  if (!sitemapXml) {
    console.error('Failed to load sitemap');
    return;
  }

  const urlMatches = [...sitemapXml.matchAll(/<loc>(https:\/\/adenaagro\.com\/product\/[^<]+)<\/loc>/g)];
  const urls = [...new Set(urlMatches.map(m => m[1]))];
  console.log(`Found ${urls.length} product URLs in sitemap`);

  const products = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Scraping: ${url}`);
    const html = await fetchHtml(url);
    if (!html) continue;

    // Extract title
    const titleMatch = html.match(/<h1 class="product_title entry-title[^"]*">([^<]+)<\/h1>/) ||
                       html.match(/<meta property="og:title" content="([^"]+)"/);
    let title = titleMatch ? titleMatch[1].trim() : 'Товар Adena Agro';
    title = title.replace(/&#8211;/g, '–').replace(/&amp;/g, '&').replace(/&#038;/g, '&').replace(/&#8217;/g, '’').replace(/ ➤ Adena Agro/g, '');

    // Extract Brand
    let brand = 'Adena Agro';
    if (title.toLowerCase().startsWith('struik')) brand = 'Struik';
    else if (title.toLowerCase().startsWith('grimme')) brand = 'Grimme';
    else if (title.toLowerCase().startsWith('baselier')) brand = 'Baselier';
    else if (title.toLowerCase().startsWith('dewulf')) brand = 'DeWulf';
    else if (title.toLowerCase().startsWith('zibo') || title.toLowerCase().includes('gandy')) brand = 'ZIBO';
    else if (title.toLowerCase().startsWith('john deere')) brand = 'John Deere';
    else if (title.toLowerCase().startsWith('claas')) brand = 'Claas';
    else if (title.toLowerCase().startsWith('horsch')) brand = 'Horsch';
    else if (title.toLowerCase().startsWith('lemken')) brand = 'Lemken';
    else if (title.toLowerCase().startsWith('fendt')) brand = 'Fendt';
    else brand = 'Інше';

    // Extract Model
    let model = 'Інше';
    const knownModels = ['GL 32E', 'FLKB', 'GLUTTON', 'ROW-FIX', 'LKB-Shift 1500', 'BIOROTIX', 'VariX', 'Weed-Master', 'WR', 'ZF', 'SE-260', '8RX 410', '1050 Vario', 'Lexion 8800', 'Maestro 16 SV', 'Leeb PT'];
    for (const m of knownModels) {
      if (title.toLowerCase().includes(m.toLowerCase())) {
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
        pricePerShiftUah = Math.max(8000, Math.round(parsed * 0.04));
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
    if (title.toLowerCase().includes('подрібнювач') || title.toLowerCase().includes('бадилля') || title.toLowerCase().includes('flkb') || title.toLowerCase().includes('glutton')) machineryType = 'haulm';
    else if (title.toLowerCase().includes('комбайн') || title.toLowerCase().includes('збир') || title.toLowerCase().includes('копач')) machineryType = 'harvest';
    else if (title.toLowerCase().includes('саджалк') || title.toLowerCase().includes('сівалк') || title.toLowerCase().includes('посів') || title.toLowerCase().includes('посадк') || title.toLowerCase().includes('аплікатор')) machineryType = 'planting';
    else if (title.toLowerCase().includes('обприскувач')) machineryType = 'spraying';
    else if (title.toLowerCase().includes('трактор')) machineryType = 'tractors';

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

scrapeAll();
