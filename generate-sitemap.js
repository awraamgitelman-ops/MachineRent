import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { BLOG_POSTS } from './src/data/blogData.js';

const DOMAIN = 'https://agrorentex.com';

// 1. Generate robots.txt
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${DOMAIN}/sitemap.xml
`;

fs.writeFileSync('./public/robots.txt', robotsTxt, 'utf-8');
console.log('Created public/robots.txt');

// 2. Generate sitemap.xml
const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/product-category/field', changefreq: 'daily', priority: '0.9' },
  { url: '/product-category/zhatky-zernovi', changefreq: 'daily', priority: '0.9' },
  { url: '/product-category/skladska-tehnika', changefreq: 'daily', priority: '0.9' },
  { url: '/product-category/zapchastyny', changefreq: 'daily', priority: '0.9' },
  { url: '/product-category/tehnika-b-v', changefreq: 'weekly', priority: '0.8' },
  { url: '/remont-transporteriv', changefreq: 'weekly', priority: '0.8' },
  { url: '/about-us', changefreq: 'monthly', priority: '0.8' },
  { url: '/contact-us', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'daily', priority: '0.8' },
  { url: '/privacy-policy', changefreq: 'monthly', priority: '0.5' },
  { url: '/public-offer', changefreq: 'monthly', priority: '0.5' }
];

const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

for (const page of staticPages) {
  sitemapXml += `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
}

// Blog Posts
for (const post of BLOG_POSTS) {
  sitemapXml += `  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${post.image.replace(/&/g, '&amp;')}</image:loc>
      <image:title>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
    </image:image>
  </url>\n`;
}

// Products
for (const prod of MACHINERY_DATA) {
  sitemapXml += `  <url>
    <loc>${DOMAIN}/product/${prod.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
  
  if (prod.images && prod.images.length > 0) {
    for (const img of prod.images.slice(0, 3)) {
      if (img && !img.includes('placeholder')) {
        sitemapXml += `\n    <image:image>
      <image:loc>${img.replace(/&/g, '&amp;')}</image:loc>
      <image:title>${prod.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
    </image:image>`;
      }
    }
  }
  
  sitemapXml += `\n  </url>\n`;
}

sitemapXml += `</urlset>\n`;

fs.writeFileSync('./public/sitemap.xml', sitemapXml, 'utf-8');
console.log(`Created public/sitemap.xml with ${staticPages.length + BLOG_POSTS.length + MACHINERY_DATA.length} URLs!`);
