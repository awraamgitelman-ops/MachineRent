const SECRET_KEY = 'AgroRentex-Media-Key-2026';

export function encryptImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('/')) return url; // local asset
  if (url.startsWith('data:')) return url;

  const keyBytes = Buffer.from(SECRET_KEY, 'utf8');
  const urlBytes = Buffer.from(url, 'utf8');
  const outBytes = Buffer.alloc(urlBytes.length);

  for (let i = 0; i < urlBytes.length; i++) {
    outBytes[i] = urlBytes[i] ^ keyBytes[i % keyBytes.length];
  }

  // Base64url
  return outBytes.toString('base64url');
}

export function decryptImageUrl(token) {
  if (!token) return '';
  try {
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

// Test sample URLs
const sampleUrls = [
  'https://adenaagro.com/wp-content/uploads/2024/02/varix_whbob5vilz4a_glutton.jpg',
  'https://agrovektor.com/uploads/photo/2/132e282a16880d452ae5600c023d4b40.jpg',
  'https://img.linemedia.com/img/s/wheel-tractor-John-Deere-7820---1744096127521677963_big--25040810025240521100.jpg'
];

for (const u of sampleUrls) {
  const enc = encryptImageUrl(u);
  const dec = decryptImageUrl(enc);
  console.log('Original:', u);
  console.log('Encrypted token:', enc);
  console.log('Proxy URL:', `/api/media/${enc}.jpg`);
  console.log('Decrypted matches original:', dec === u);
  console.log('---');
}
