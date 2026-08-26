import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { BLOG_POSTS } from './src/data/blogData.js';

const DOMAIN = 'https://agrorentex.com';

// 1. Generate clean robots.txt
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Allow: /api/media/
Disallow: /api/send-lead
Disallow: /api/telegram-status

Sitemap: ${DOMAIN}/sitemap.xml
`;

fs.writeFileSync('./public/robots.txt', robotsTxt, 'utf-8');
console.log('Created public/robots.txt');

// 2. Generate standard, 100% valid sitemap.xml
const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/product-category/field', changefreq: 'daily', priority: '0.9' },
  { url: '/product-category/zhatky-zernovi', changefreq: 'daily', priority: '0.9' },
  { url: '/product-category/skladska-tehnika', changefreq: 'daily', priority: '0.9' },
  { url: '/product-category/zapchastyny', changefreq: 'daily', priority: '0.9' },
  { url: '/product-category/tehnika-b-v', changefreq: 'weekly', priority: '0.8' },
  { url: '/remont-transporteriv', changefreq: 'weekly', priority: '0.8' },
  { url: '/about-us', changefreq: 'monthly', priority: '0.8' },
  { url: '/contact', changefreq: 'monthly', priority: '0.9' },
  { url: '/contact-us', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'daily', priority: '0.8' },
  { url: '/privacy-policy', changefreq: 'monthly', priority: '0.5' },
  { url: '/terms', changefreq: 'monthly', priority: '0.5' },
  { url: '/public-offer', changefreq: 'monthly', priority: '0.5' }
];

const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Static Pages
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
  </url>\n`;
}

// Products (clean, standard, fully compliant schema)
for (const prod of MACHINERY_DATA) {
  sitemapXml += `  <url>
    <loc>${DOMAIN}/product/${prod.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}

sitemapXml += `</urlset>\n`;

fs.writeFileSync('./public/sitemap.xml', sitemapXml, 'utf-8');
console.log(`Created public/sitemap.xml with ${staticPages.length + BLOG_POSTS.length + MACHINERY_DATA.length} valid URLs!`);
