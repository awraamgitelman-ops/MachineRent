import fs from 'fs';

async function parsePages() {
  const pages = [
    { name: 'remont', url: 'https://adenaagro.com/remont-transporteriv/' },
    { name: 'field', url: 'https://adenaagro.com/product-category/field/' },
    { name: 'warehouse', url: 'https://adenaagro.com/product-category/skladska-tehnika/' },
    { name: 'parts', url: 'https://adenaagro.com/product-category/zapchastyny/' },
    { name: 'used', url: 'https://adenaagro.com/product-category/tehnika-b-v/' }
  ];

  for (const p of pages) {
    try {
      console.log(`Fetching ${p.name} from ${p.url}...`);
      const res = await fetch(p.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      fs.writeFileSync(`./scraped_${p.name}.html`, html, 'utf-8');
      
      const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      console.log(`[${p.name}] Title:`, titleMatch ? titleMatch[1].trim() : 'No title');
      console.log(`[${p.name}] H1:`, h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'No H1');
    } catch (err) {
      console.error(`Error on ${p.name}:`, err.message);
    }
  }
}

parsePages();
