import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import https from 'https';
import http from 'http';
import { MACHINERY_DATA } from '../src/data/machineryData.js';

const SECRET_KEY = 'AgroRentex-Media-Key-2026';

function decryptImageUrl(tokenWithExt) {
  if (!tokenWithExt || typeof tokenWithExt !== 'string') return '';
  try {
    const token = tokenWithExt.replace(/^\/api\/media\//, '').replace(/\.(jpg|jpeg|png|webp|gif|svg)$/i, '');
    const keyBytes = Buffer.from(SECRET_KEY, 'utf8');
    const outBytes = Buffer.from(token, 'base64url');
    const urlBytes = Buffer.alloc(outBytes.length);

    for (let i = 0; i < outBytes.length; i++) {
      urlBytes[i] = outBytes[i] ^ keyBytes[i % keyBytes.length];
    }

    return urlBytes.toString('utf8');
  } catch (err) {
    return '';
  }
}

const MEDIA_CACHE_DIR = path.resolve(process.cwd(), 'public', 'media-cache');
if (fs.existsSync(MEDIA_CACHE_DIR)) {
  fs.rmSync(MEDIA_CACHE_DIR, { recursive: true, force: true });
}
fs.mkdirSync(MEDIA_CACHE_DIR, { recursive: true });

// Gather all unique tokens from all products
const allTokens = new Set();
MACHINERY_DATA.forEach(p => {
  (p.images || []).forEach(img => {
    if (img && img.startsWith('/api/media/')) {
      allTokens.add(img.replace('/api/media/', ''));
    }
  });
});

console.log(`Gathering and caching ${allTokens.size} unique media tokens with MD5 filenames...`);

function getCacheFileName(token) {
  return crypto.createHash('md5').update(token).digest('hex') + '.jpg';
}

async function downloadToken(token) {
  const hashName = getCacheFileName(token);
  const cacheFilePath = path.join(MEDIA_CACHE_DIR, hashName);

  if (fs.existsSync(cacheFilePath) && fs.statSync(cacheFilePath).size > 1000) {
    return { status: 'cached' };
  }

  const rawUrl = decryptImageUrl(token);
  if (!rawUrl || !rawUrl.startsWith('http')) {
    return { status: 'invalid_url' };
  }

  return new Promise((resolve) => {
    try {
      const parsed = new URL(rawUrl);
      const client = parsed.protocol === 'https:' ? https : http;

      const requestOptions = {
        headers: {
          'User-Agent': 'Googlebot-Image/1.0',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Referer': parsed.origin
        }
      };

      const req = client.get(rawUrl, requestOptions, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectClient = res.headers.location.startsWith('https') ? https : http;
          redirectClient.get(res.headers.location, requestOptions, (redirectRes) => {
            if (redirectRes.statusCode === 200) {
              const fileStream = fs.createWriteStream(cacheFilePath);
              redirectRes.pipe(fileStream);
              fileStream.on('finish', () => resolve({ status: 'downloaded' }));
              fileStream.on('error', () => resolve({ status: 'write_error' }));
            } else {
              resolve({ status: 'redirect_error' });
            }
          }).on('error', () => resolve({ status: 'net_error' }));
          return;
        }

        if (res.statusCode === 200) {
          const fileStream = fs.createWriteStream(cacheFilePath);
          res.pipe(fileStream);
          fileStream.on('finish', () => resolve({ status: 'downloaded' }));
          fileStream.on('error', () => resolve({ status: 'write_error' }));
        } else {
          resolve({ status: 'error', code: res.statusCode });
        }
      });

      req.on('error', () => resolve({ status: 'net_error' }));
      req.setTimeout(8000, () => {
        req.destroy();
        resolve({ status: 'timeout' });
      });
    } catch {
      resolve({ status: 'exception' });
    }
  });
}

async function run() {
  const tokenList = Array.from(allTokens);
  let success = 0;
  let cached = 0;
  let errors = 0;

  const chunkSize = 8;
  for (let i = 0; i < tokenList.length; i += chunkSize) {
    const chunk = tokenList.slice(i, i + chunkSize);
    const results = await Promise.all(chunk.map(downloadToken));

    results.forEach(r => {
      if (r.status === 'downloaded') success++;
      else if (r.status === 'cached') cached++;
      else errors++;
    });

    const progress = Math.min(i + chunkSize, tokenList.length);
    if (progress % 60 === 0 || progress === tokenList.length) {
      console.log(`Progress: ${progress}/${tokenList.length} (Success: ${success}, Errors: ${errors})`);
    }

    await new Promise(r => setTimeout(r, 40));
  }

  console.log(`\nFinished MD5 caching! Total Downloaded: ${success}, Errors: ${errors}`);
}

run();
