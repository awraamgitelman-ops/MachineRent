import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { 
  HOME_TOP_SEASON, 
  HOME_GRID_CENTER, 
  HOME_GRID_RIGHT, 
  HOME_CATEGORY_BOXES, 
  HOME_DISCOUNTS_PRODUCTS 
} from './src/data/homeData.js';

function isPlaceholderOnly(images) {
  if (!images || images.length === 0) return true;
  // If all images contain woocommerce-placeholder or placeholder
  const nonPlaceholders = images.filter(img => 
    img && 
    !img.includes('woocommerce-placeholder') && 
    !img.includes('placeholder-700x700') &&
    !img.includes('placeholder')
  );
  return nonPlaceholders.length === 0;
}

function shouldRemoveProduct(item) {
  const name = (item.name || '').toLowerCase();
  
  // 1. Specific removals requested by user
  if (name.includes('транспортер tc 9') || name.includes('транспортер тс 9') || (name.includes('tc 9') && name.includes('65'))) {
    console.log('Removing requested item:', item.name);
    return true;
  }
  if (name.includes('стрічковий конвеєр tc 6') || name.includes('конвеєр tc 6') || name.includes('стрічковий конвеєр тс 6')) {
    console.log('Removing requested item:', item.name);
    return true;
  }

  // 2. Remove items whose only image is placeholder
  if (isPlaceholderOnly(item.images)) {
    console.log('Removing placeholder-only item:', item.name, item.images);
    return true;
  }

  return false;
}

console.log(`Original total products: ${MACHINERY_DATA.length}`);
const filteredMachinery = MACHINERY_DATA.filter(item => !shouldRemoveProduct(item));
console.log(`Filtered total products: ${filteredMachinery.length}`);

// Clean up images array in remaining products: remove any placeholder images if they have real images
const finalMachinery = filteredMachinery.map(item => {
  const realImages = item.images.filter(img => 
    img && 
    !img.includes('woocommerce-placeholder') && 
    !img.includes('placeholder-700x700')
  );
  return {
    ...item,
    images: realImages.length > 0 ? realImages : item.images
  };
});

const machineryOutput = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${finalMachinery.length}

export const MACHINERY_DATA = ${JSON.stringify(finalMachinery, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', machineryOutput, 'utf-8');

// Also filter homeData if needed
const cleanHomeSeason = HOME_TOP_SEASON.filter(item => !shouldRemoveProduct({ name: item.name, images: [item.image] }));
const cleanHomeGridCenter = HOME_GRID_CENTER.filter(item => !shouldRemoveProduct({ name: item.name, images: [item.image] }));
const cleanHomeGridRight = HOME_GRID_RIGHT.filter(item => !shouldRemoveProduct({ name: item.name, images: [item.image] }));
const cleanHomeDiscounts = HOME_DISCOUNTS_PRODUCTS.filter(item => !shouldRemoveProduct({ name: item.name, images: [item.image] }));

const homeDataOutput = `// Exact data replicated from adenaagro.com homepage sections

export const HOME_TOP_SEASON = ${JSON.stringify(cleanHomeSeason, null, 2)};

export const HOME_GRID_CENTER = ${JSON.stringify(cleanHomeGridCenter, null, 2)};

export const HOME_GRID_RIGHT = ${JSON.stringify(cleanHomeGridRight, null, 2)};

export const HOME_CATEGORY_BOXES = ${JSON.stringify(HOME_CATEGORY_BOXES, null, 2)};

export const HOME_DISCOUNTS_PRODUCTS = ${JSON.stringify(cleanHomeDiscounts, null, 2)};
`;

fs.writeFileSync('./src/data/homeData.js', homeDataOutput, 'utf-8');

console.log('Successfully filtered and updated machineryData.js and homeData.js!');
