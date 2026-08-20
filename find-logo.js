import fs from 'fs';
import path from 'path';

function findFile(dir, name) {
  try {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          const found = findFile(full, name);
          if (found) return found;
        } else if (f.includes('1787223880508') || f.includes('media_')) {
          console.log('Found file:', full);
          if (f === name || f.includes('1787223880508')) return full;
        }
      } catch (e) {}
    }
  } catch (e) {}
  return null;
}

const res = findFile('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf', 'media_1787223880508.png');
console.log('Final Result:', res);
if (res) {
  fs.copyFileSync(res, './public/logo.png');
  fs.copyFileSync(res, './public/favicon.png');
  console.log('Copied to ./public/logo.png!');
}
