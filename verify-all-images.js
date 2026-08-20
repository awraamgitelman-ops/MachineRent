import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { 
  HOME_TOP_SEASON, 
  HOME_GRID_CENTER, 
  HOME_GRID_RIGHT, 
  HOME_CATEGORY_BOXES, 
  HOME_DISCOUNTS_PRODUCTS 
} from './src/data/homeData.js';

async function checkAllImages() {
  const allUrls = new Set();

  for (const item of MACHINERY_DATA) {
    if (item.images) {
      for (const img of item.images) {
        if (img) allUrls.add(img);
      }
    }
  }

  for (const section of [HOME_TOP_SEASON, HOME_GRID_CENTER, HOME_GRID_RIGHT, HOME_CATEGORY_BOXES, HOME_DISCOUNTS_PRODUCTS]) {
    for (const item of section) {
      if (item.image) allUrls.add(item.image);
    }
  }

  console.log(`Checking ${allUrls.size} unique image URLs...`);
  const brokenUrls = new Set();

  for (const url of allUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(4000) });
      if (res.status >= 400) {
        console.log(`BROKEN (${res.status}): ${url}`);
        brokenUrls.add(url);
      }
    } catch (err) {
      console.log(`FETCH ERROR: ${url}`);
      brokenUrls.add(url);
    }
  }

  console.log(`\nTotal broken URLs: ${brokenUrls.size}`);
}

checkAllImages();
