import fs from 'fs';

async function parseHomePage() {
  const res = await fetch('https://adenaagro.com/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });
  const html = await res.text();
  fs.writeFileSync('./home_page_raw.html', html, 'utf-8');

  // Extract all sections, banners, images, categories, texts
  const sections = [];

  // Hero / Slider / Main Banners
  const sliderMatches = [...html.matchAll(/<div class="[^"]*slider[^"]*"[\s\S]*?<\/div>/gi)];
  
  // Category boxes on homepage
  const catMatches = [...html.matchAll(/<div class="category-grid-item[^"]*"[\s\S]*?<a href="([^"]*)"[\s\S]*?<img[^>]*src="([^"]*)"[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/gi)];
  
  console.log('Categories found on home:', catMatches.map(m => ({
    url: m[1],
    img: m[2],
    title: m[3].replace(/<[^>]+>/g, '').trim()
  })));

  // Banners / Promo cards
  const bannerMatches = [...html.matchAll(/<div class="promo-banner[^"]*"[\s\S]*?<img[^>]*src="([^"]*)"[\s\S]*?<h[234][^>]*>([\s\S]*?)<\/h[234]>([\s\S]*?)<\/div>/gi)];
  console.log('Banners found on home:', bannerMatches.map(m => ({
    img: m[1],
    title: m[2].replace(/<[^>]+>/g, '').trim()
  })));

  // Information & About Section
  const titles = [...html.matchAll(/<h[1234][^>]*>([\s\S]*?)<\/h[1234]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  console.log('Headings on home:', titles.slice(0, 25));
}

parseHomePage();
