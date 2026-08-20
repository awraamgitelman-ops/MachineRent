import { MACHINERY_DATA } from './src/data/machineryData.js';
import { decryptImageUrl } from './src/utils/imageProxy.js';

const zhatky = MACHINERY_DATA.filter(m => m.machineryType === 'zhatky');
console.log('Total zhatky count:', zhatky.length);

for (let i = 0; i < zhatky.length; i++) {
  const z = zhatky[i];
  console.log(`\n[${i + 1}] ID: ${z.id}`);
  console.log('Name:', z.name);
  console.log('Brand:', z.brand);
  console.log('Image token:', z.images[0]);
  console.log('Decrypted URL:', decryptImageUrl(z.images[0]));
}
