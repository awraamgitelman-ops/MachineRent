import fs from 'fs';
import { encryptImageUrl } from './src/utils/imageProxy.js';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { 
  HOME_TOP_SEASON, 
  HOME_GRID_CENTER, 
  HOME_GRID_RIGHT, 
  HOME_CATEGORY_BOXES, 
  HOME_DISCOUNTS_PRODUCTS 
} from './src/data/homeData.js';
import { BLOG_POSTS } from './src/data/blogData.js';

console.log('1. Encrypting images in machineryData.js...');
let machCount = 0;
for (const m of MACHINERY_DATA) {
  if (Array.isArray(m.images)) {
    m.images = m.images.map(img => encryptImageUrl(img));
    machCount += m.images.length;
  }
}
fs.writeFileSync(
  './src/data/machineryData.js',
  `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(MACHINERY_DATA, null, 2)};\n`,
  'utf-8'
);
console.log(`Encrypted ${machCount} images in machineryData.js!`);

console.log('2. Encrypting images in homeData.js...');
for (const item of HOME_TOP_SEASON) {
  if (item.image) item.image = encryptImageUrl(item.image);
}
for (const item of HOME_GRID_CENTER) {
  if (item.image) item.image = encryptImageUrl(item.image);
}
for (const item of HOME_GRID_RIGHT) {
  if (item.image) item.image = encryptImageUrl(item.image);
}
for (const item of HOME_CATEGORY_BOXES) {
  if (item.image) item.image = encryptImageUrl(item.image);
}
for (const item of HOME_DISCOUNTS_PRODUCTS) {
  if (item.image) item.image = encryptImageUrl(item.image);
}

const homeContent = `// Static dataset for AGRO RENTEX Home Page
export const HOME_TOP_SEASON = ${JSON.stringify(HOME_TOP_SEASON, null, 2)};

export const HOME_GRID_CENTER = ${JSON.stringify(HOME_GRID_CENTER, null, 2)};

export const HOME_GRID_RIGHT = ${JSON.stringify(HOME_GRID_RIGHT, null, 2)};

export const HOME_CATEGORY_BOXES = ${JSON.stringify(HOME_CATEGORY_BOXES, null, 2)};

export const HOME_DISCOUNTS_PRODUCTS = ${JSON.stringify(HOME_DISCOUNTS_PRODUCTS, null, 2)};
`;
fs.writeFileSync('./src/data/homeData.js', homeContent, 'utf-8');
console.log('Encrypted all images in homeData.js!');

console.log('3. Encrypting images in blogData.js...');
for (const post of BLOG_POSTS) {
  if (post.image) post.image = encryptImageUrl(post.image);
}
const blogContent = `// Blog and Agri-Publications Data for AGRO RENTEX (Ukraine - 2026)

export const BLOG_POSTS = ${JSON.stringify(BLOG_POSTS, null, 2)};
`;
fs.writeFileSync('./src/data/blogData.js', blogContent, 'utf-8');
console.log('Encrypted all images in blogData.js!');

console.log('4. Checking pages for direct image URLs...');
const pageFiles = [
  './src/pages/AboutUsPage.jsx',
  './src/pages/RemontPage.jsx',
  './src/pages/HomePage.jsx',
  './src/pages/ContactPage.jsx',
  './src/pages/CatalogPage.jsx',
  './src/pages/ProductPage.jsx'
];

for (const p of pageFiles) {
  let content = fs.readFileSync(p, 'utf-8');
  let replaced = 0;
  
  content = content.replace(/(https:\/\/(?:adenaagro\.com|agrovektor\.com|img\.linemedia\.com)[^"'\s`<>]+)/g, (match) => {
    replaced++;
    return encryptImageUrl(match);
  });

  if (replaced > 0) {
    fs.writeFileSync(p, content, 'utf-8');
    console.log(`Replaced ${replaced} image URLs in ${p}`);
  }
}

console.log('\nAll image URLs across the whole codebase have been encrypted into AGRO RENTEX /api/media tokens!');
