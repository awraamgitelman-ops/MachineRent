import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { encryptImageUrl } from './src/utils/imageProxy.js';

const SPECIFIC_UPDATES = [
  {
    matcher: (m) => m.name.includes('ЖУ 6') || m.name.includes('ЖУ-6') || m.id.includes('zhu-6'),
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVCCiwz8y9E6blu7xNwdPxDYJ98doRsdZmw6en8E5LpZrcwhR6vAbL6L8&s=10'
  },
  {
    matcher: (m) => m.name.includes('ЖЗБ-4,2') || m.name.includes('ЖЗБ-4.2'),
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcvQZNSNTQiPEpKYjnfdhnumTrRx-YS2TK2D7bczzcfw&s'
  },
  {
    matcher: (m) => m.name.toLowerCase() === 'жатки для комбайнів' || m.id === 'zhatka-zhatky-dlya-kombajniv',
    url: 'https://vintehpostach.com/storage/category/2589/gallery/fef9654a-aefb-4d2e-ac4e-41ad5cd11134.webp'
  },
  {
    matcher: (m) => m.name.includes('Flex Ettaro') || m.id.includes('flex-ettaro') || m.name.includes('сої та гороху'),
    url: 'https://agro-ukraine.com/imgs/board/29/1230229-1.jpg'
  }
];

let updatedCount = 0;

for (const update of SPECIFIC_UPDATES) {
  const encUrl = encryptImageUrl(update.url);
  for (const m of MACHINERY_DATA) {
    if (update.matcher(m)) {
      m.images = [encUrl];
      updatedCount++;
      console.log(`Updated [${m.name}] (ID: ${m.id}) with: ${update.url}`);
    }
  }
}

fs.writeFileSync(
  './src/data/machineryData.js',
  `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(MACHINERY_DATA, null, 2)};\n`,
  'utf-8'
);

console.log(`\nUpdated ${updatedCount} products in machineryData.js!`);
