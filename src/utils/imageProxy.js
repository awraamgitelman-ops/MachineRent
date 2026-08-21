const SECRET_KEY = 'AgroRentex-Media-Key-2026';

/**
 * Encrypts an external image URL into a disguised AGRORENTEX media token
 * e.g. https://adenaagro.com/uploads/... -> /api/media/KRMGHyFfQVs...jpg
 */
export function encryptImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('/api/media/')) return url;
  if (url.startsWith('/assets/')) return url;
  if (url.startsWith('data:')) return url;

  let ext = '.jpg';
  if (url.includes('.png')) ext = '.png';
  else if (url.includes('.webp')) ext = '.webp';
  else if (url.includes('.jpeg')) ext = '.jpeg';

  if (typeof Buffer !== 'undefined') {
    const keyBytes = Buffer.from(SECRET_KEY, 'utf8');
    const urlBytes = Buffer.from(url, 'utf8');
    const outBytes = Buffer.alloc(urlBytes.length);

    for (let i = 0; i < urlBytes.length; i++) {
      outBytes[i] = urlBytes[i] ^ keyBytes[i % keyBytes.length];
    }

    const token = outBytes.toString('base64url');
    return `/api/media/${token}${ext}`;
  } else {
    // Browser fallback
    let encrypted = '';
    for (let i = 0; i < url.length; i++) {
      encrypted += String.fromCharCode(url.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
    }
    const token = btoa(encrypted).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `/api/media/${token}${ext}`;
  }
}

/**
 * Decrypts disguised media token back to original target URL
 */
export function decryptImageUrl(tokenWithExt) {
  if (!tokenWithExt || typeof tokenWithExt !== 'string') return '';
  try {
    const token = tokenWithExt.replace(/^\/api\/media\//, '').replace(/\.(jpg|jpeg|png|webp|gif|svg)$/i, '');
    
    if (typeof Buffer !== 'undefined') {
      const keyBytes = Buffer.from(SECRET_KEY, 'utf8');
      const outBytes = Buffer.from(token, 'base64url');
      const urlBytes = Buffer.alloc(outBytes.length);

      for (let i = 0; i < outBytes.length; i++) {
        urlBytes[i] = outBytes[i] ^ keyBytes[i % keyBytes.length];
      }

      return urlBytes.toString('utf8');
    } else {
      let b64 = token.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      const raw = atob(b64);
      let decrypted = '';
      for (let i = 0; i < raw.length; i++) {
        decrypted += String.fromCharCode(raw.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
      }
      return decrypted;
    }
  } catch (err) {
    return '';
  }
}
