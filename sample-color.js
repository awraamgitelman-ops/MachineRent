import fs from 'fs';
import zlib from 'zlib';

function getPngColor(filePath) {
  const buf = fs.readFileSync(filePath);
  // Simple PNG header check
  if (buf.readUInt32BE(0) !== 0x89504E47) {
    console.log('Not a standard PNG signature');
    return null;
  }

  let offset = 8;
  let ihdr = null;
  const idatChunks = [];

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);

    if (type === 'IHDR') {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
      };
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }

    offset += 12 + length;
  }

  console.log('IHDR:', ihdr);
  const compressed = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressed);
  
  // Calculate average non-white, non-transparent color
  const { width, height, colorType } = ihdr;
  let bytesPerPixel = 4;
  if (colorType === 2) bytesPerPixel = 3;
  else if (colorType === 6) bytesPerPixel = 4;

  const rowSize = 1 + width * bytesPerPixel;
  const colors = [];

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize + 1;
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + x * bytesPerPixel;
      const r = decompressed[pxOffset];
      const g = decompressed[pxOffset + 1];
      const b = decompressed[pxOffset + 2];
      const a = bytesPerPixel === 4 ? decompressed[pxOffset + 3] : 255;

      // Filter out pure white or transparent pixels
      if (a > 50 && (r < 240 || g < 240 || b < 240)) {
        colors.push({ r, g, b });
      }
    }
  }

  if (colors.length === 0) return null;
  
  // Median or center color
  const mid = colors[Math.floor(colors.length / 2)];
  const avg = colors.reduce((acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }), { r: 0, g: 0, b: 0 });
  avg.r = Math.round(avg.r / colors.length);
  avg.g = Math.round(avg.g / colors.length);
  avg.b = Math.round(avg.b / colors.length);

  const hex = (c) => '#' + [c.r, c.g, c.b].map(x => x.toString(16).padStart(2, '0')).join('');
  return { midHex: hex(mid), avgHex: hex(avg), mid, avg, totalPixels: colors.length };
}

const colorInfo = getPngColor('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.user_uploaded\\media_1787224179789.png');
console.log('Sampled Color Info:', colorInfo);
