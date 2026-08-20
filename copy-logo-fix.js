import fs from 'fs';
import path from 'path';

fs.mkdirSync('./public', { recursive: true });
fs.mkdirSync('./src/assets', { recursive: true });

const src = 'C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.user_uploaded\\media_1787223880508.png';

fs.copyFileSync(src, './public/logo.png');
fs.copyFileSync(src, './public/favicon.png');
fs.copyFileSync(src, './src/assets/logo.png');

console.log('Successfully copied logo to public/logo.png and src/assets/logo.png!');
