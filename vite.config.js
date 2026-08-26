import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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

function encryptedMediaPlugin() {
  return {
    name: 'encrypted-media-proxy',
    async configureServer(server) {
      // Initialize Telegram Bot in Dev mode
      try {
        const { initTelegramBot, broadcastLeadNotification, getBotStatus } = await import('./telegram-bot.js');
        initTelegramBot().catch(() => null);

        // Handle /api/send-lead
        server.middlewares.use('/api/send-lead', async (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const leadData = JSON.parse(body || '{}');
                console.log('\n🚜 [НОВА ЗАЯВКА НА ОРЕНДУ / КУПІВЛЮ АГРОТЕХНІКИ]');
                console.log(`👤 Клієнт: ${leadData.fullName} | 📞 Телефон: ${leadData.phone}`);
                console.log(`📌 Тема: ${leadData.topic} | 🏢 Підприємство: ${leadData.company || '—'}`);
                
                const telegramResult = await broadcastLeadNotification(leadData);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, telegram: telegramResult }));
              } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
        });

        // Handle /api/telegram-status
        server.middlewares.use('/api/telegram-status', (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(getBotStatus()));
        });
      } catch (e) {
        console.warn('Telegram bot dev integration note:', e.message);
      }

      // Handle /api/media with local disk caching and 429 protection
      const MEDIA_CACHE_DIR = path.resolve(process.cwd(), 'public', 'media-cache');
      if (!fs.existsSync(MEDIA_CACHE_DIR)) {
        fs.mkdirSync(MEDIA_CACHE_DIR, { recursive: true });
      }
      const FALLBACK_IMAGE_PATH = path.resolve(process.cwd(), 'public', 'assets', 'products', 'zhatky-dlya-kombajniv.webp');

      server.middlewares.use('/api/media', (req, res, next) => {
        const token = req.url.slice(1);
        const safeFileName = crypto.createHash('md5').update(token).digest('hex') + '.jpg';
        const cacheFilePath = path.join(MEDIA_CACHE_DIR, safeFileName);

        if (fs.existsSync(cacheFilePath)) {
          res.setHeader('Content-Type', 'image/jpeg');
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          return fs.createReadStream(cacheFilePath).pipe(res);
        }

        const rawUrl = decryptImageUrl(token);

        if (!rawUrl || !rawUrl.startsWith('http')) {
          if (fs.existsSync(FALLBACK_IMAGE_PATH)) {
            return fs.createReadStream(FALLBACK_IMAGE_PATH).pipe(res);
          }
          return next();
        }

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

          client.get(rawUrl, requestOptions, (externalRes) => {
            if (externalRes.statusCode >= 300 && externalRes.statusCode < 400 && externalRes.headers.location) {
              const redirectClient = externalRes.headers.location.startsWith('https') ? https : http;
              redirectClient.get(externalRes.headers.location, requestOptions, (redirectRes) => {
                res.setHeader('Content-Type', redirectRes.headers['content-type'] || 'image/jpeg');
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                const fileStream = fs.createWriteStream(cacheFilePath);
                redirectRes.pipe(fileStream);
                redirectRes.pipe(res);
              }).on('error', () => {
                if (fs.existsSync(FALLBACK_IMAGE_PATH)) fs.createReadStream(FALLBACK_IMAGE_PATH).pipe(res);
                else next();
              });
              return;
            }

            if (externalRes.statusCode !== 200) {
              if (fs.existsSync(FALLBACK_IMAGE_PATH)) {
                return fs.createReadStream(FALLBACK_IMAGE_PATH).pipe(res);
              }
              return next();
            }

            res.setHeader('Content-Type', externalRes.headers['content-type'] || 'image/jpeg');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            const fileStream = fs.createWriteStream(cacheFilePath);
            externalRes.pipe(fileStream);
            externalRes.pipe(res);
          }).on('error', () => {
            if (fs.existsSync(FALLBACK_IMAGE_PATH)) {
              fs.createReadStream(FALLBACK_IMAGE_PATH).pipe(res);
            } else {
              next();
            }
          });
        } catch {
          if (fs.existsSync(FALLBACK_IMAGE_PATH)) {
            fs.createReadStream(FALLBACK_IMAGE_PATH).pipe(res);
          } else {
            next();
          }
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), encryptedMediaPlugin()],
  server: {
    port: 5173
  }
});
