import https from 'https';
import fs from 'fs';
import path from 'path';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { HOME_CATEGORY_BOXES } from './src/data/homeData.js';

const ASSETS_TO_DOWNLOAD = [
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVCCiwz8y9E6blu7xNwdPxDYJ98doRsdZmw6en8E5LpZrcwhR6vAbL6L8&s=10',
    filename: 'zhatka-zhu-6.jpg',
    matchers: [(m) => m.name.includes('ЖУ 6') || m.name.includes('ЖУ-6') || m.id.includes('zhu-6')]
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcvQZNSNTQiPEpKYjnfdhnumTrRx-YS2TK2D7bczzcfw&s',
    filename: 'zhatka-zhzb-42.jpg',
    matchers: [(m) => m.name.includes('ЖЗБ-4,2') || m.name.includes('ЖЗБ-4.2')]
  },
  {
    url: 'https://vintehpostach.com/storage/category/2589/gallery/fef9654a-aefb-4d2e-ac4e-41ad5cd11134.webp',
    filename: 'zhatky-dlya-kombajniv.webp',
    matchers: [(m) => m.name.toLowerCase() === 'жатки для комбайнів' || m.id === 'zhatka-zhatky-dlya-kombajniv']
  }
];

const destDir = './public/assets/products';
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function downloadFile(url, destFile) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(destFile);
        res.pipe(fileStream);
        fileStream.on('finish', () => resolve(true));
      } else {
        reject(new Error(`Failed with ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const item of ASSETS_TO_DOWNLOAD) {
    const destFile = path.join(destDir, item.filename);
    try {
      await downloadFile(item.url, destFile);
      console.log(`Saved ${item.filename} (${fs.statSync(destFile).size} bytes)`);

      const localPath = `/assets/products/${item.filename}`;
      for (const matcher of item.matchers) {
        for (const m of MACHINERY_DATA) {
          if (matcher(m)) {
            m.images = [localPath];
            console.log(`Assigned ${localPath} to ${m.name}`);
          }
        }
      }

      if (item.filename === 'zhatky-dlya-kombajniv.webp') {
        for (const b of HOME_CATEGORY_BOXES) {
          if (b.id === 'zhatky') {
            b.image = localPath;
            console.log(`Assigned ${localPath} to HOME_CATEGORY_BOXES zhatky`);
          }
        }
      }
    } catch (err) {
      console.error(`Error downloading ${item.filename}:`, err);
    }
  }

  fs.writeFileSync(
    './src/data/machineryData.js',
    `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(MACHINERY_DATA, null, 2)};\n`,
    'utf-8'
  );

  let homeContent = fs.readFileSync('./src/data/homeData.js', 'utf-8');
  homeContent = homeContent.replace(
    /export const HOME_CATEGORY_BOXES = [\s\S]*?;\n\nexport const HOME_DISCOUNTS_PRODUCTS/,
    `export const HOME_CATEGORY_BOXES = ${JSON.stringify(HOME_CATEGORY_BOXES, null, 2)};\n\nexport const HOME_DISCOUNTS_PRODUCTS`
  );
  fs.writeFileSync('./src/data/homeData.js', homeContent, 'utf-8');

  console.log('\nAll 4 custom images are now hosted directly as local static assets on AGRO RENTEX!');
}

run();
