import https from 'https';
import fs from 'fs';
import path from 'path';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHYR_PRcyqVUbIY9Rv-6W3d4Xp-xs73KrXPiMDpqzliBk0ZKdFu64M8IA&s=10';
const destFile = './public/assets/products/zhatka-zhu-6.jpg';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode === 200) {
    const fileStream = fs.createWriteStream(destFile);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      console.log('Successfully saved new photo for ЖУ-6 to:', destFile, 'Size:', fs.statSync(destFile).size, 'bytes');

      const localPath = '/assets/products/zhatka-zhu-6.jpg';
      let updated = 0;
      for (const m of MACHINERY_DATA) {
        if (m.name.includes('ЖУ 6') || m.name.includes('ЖУ-6') || m.id.includes('zhu-6')) {
          m.images = [localPath];
          updated++;
          console.log(`Updated [${m.name}] to ${localPath}`);
        }
      }

      fs.writeFileSync(
        './src/data/machineryData.js',
        `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(MACHINERY_DATA, null, 2)};\n`,
        'utf-8'
      );
      console.log(`Updated ${updated} products in machineryData.js!`);
    });
  } else {
    console.error('Failed to download image:', res.statusCode);
  }
}).on('error', (err) => {
  console.error('Error downloading:', err);
});
