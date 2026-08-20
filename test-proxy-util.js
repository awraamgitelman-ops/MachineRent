import { encryptImageUrl, decryptImageUrl } from './src/utils/imageProxy.js';

const testUrls = [
  'https://adenaagro.com/wp-content/uploads/2025/01/polyova_tehnika-300x300.webp',
  'https://agrovektor.com/uploads/photo/2/132e282a16880d452ae5600c023d4b40.jpg',
  'https://img.linemedia.com/img/s/wheel-tractor-John-Deere-7820---1744096127521677963_big--25040810025240521100.jpg'
];

for (const u of testUrls) {
  const enc = encryptImageUrl(u);
  const dec = decryptImageUrl(enc);
  console.log('Encrypted:', enc);
  console.log('Decrypted:', dec);
  console.log('Valid match:', dec === u);
}
