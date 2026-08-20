import fs from 'fs';
import path from 'path';

const src = 'C:/Users/Maxim/.gemini/antigravity/brain/b64e2507-e603-4fc9-ab3a-e772c0683ebf/.user_uploaded/media_1787223880508.png';
const dest1 = './public/logo.png';
const dest2 = './public/favicon.png';

fs.copyFileSync(src, dest1);
fs.copyFileSync(src, dest2);

console.log('Logo copied successfully to public/logo.png and public/favicon.png!');
