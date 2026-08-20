import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.user_uploaded\\media_1787224179789.png');

let offset = 8;
const idat = [];
let width = 0, height = 0;

while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(offset + 8);
    height = buf.readUInt32BE(offset + 12);
  }
  if (type === 'IDAT') {
    idat.push(buf.subarray(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idat));
console.log('width:', width, 'height:', height, 'decompressed len:', raw.length);

const stride = 1 + width * 4;
const pixels = [];

for (let y = 0; y < height; y++) {
  const line = y * stride;
  for (let x = 0; x < width; x++) {
    const idx = line + 1 + x * 4;
    pixels.push({
      r: raw[idx],
      g: raw[idx + 1],
      b: raw[idx + 2],
      a: raw[idx + 3]
    });
  }
}

// Print non-white, non-black pixels
const dominant = pixels.filter(p => p.r > 100 && p.g < 150 && p.b < 100);
console.log('Found dominant matching pixels:', dominant.slice(0, 10));
if (dominant.length > 0) {
  const avgR = Math.round(dominant.reduce((a, b) => a + b.r, 0) / dominant.length);
  const avgG = Math.round(dominant.reduce((a, b) => a + b.g, 0) / dominant.length);
  const avgB = Math.round(dominant.reduce((a, b) => a + b.b, 0) / dominant.length);
  console.log(`RGB: rgb(${avgR}, ${avgG}, ${avgB}) | HEX: #${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`);
}
