import https from 'https';
import fs from 'fs';
import path from 'path';

const url = 'https://agro-ukraine.com/imgs/board/29/1230229-1.jpg';
const destDir = './public/assets/products';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const destFile = path.join(destDir, 'flex-ettaro.jpg');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://agro-ukraine.com/'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode === 200) {
    const fileStream = fs.createWriteStream(destFile);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      console.log('Successfully saved to:', destFile, 'Size:', fs.statSync(destFile).size, 'bytes');
    });
  } else {
    console.error('Failed with status:', res.statusCode);
  }
}).on('error', (err) => {
  console.error('Error downloading:', err);
});
