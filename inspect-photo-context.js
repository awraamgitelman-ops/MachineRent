import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1546\\content.md', 'utf-8');

const firstPhotoIdx = html.indexOf('132e282a16880d452ae5600c023d4b40.jpg');
console.log('firstPhotoIdx:', firstPhotoIdx);

if (firstPhotoIdx !== -1) {
  console.log('Snippet around first photo:');
  console.log(html.slice(firstPhotoIdx - 500, firstPhotoIdx + 1500));
}
