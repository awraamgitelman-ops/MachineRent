import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import fs from 'fs';
import crypto from 'crypto';
import { initTelegramBot, broadcastLeadNotification, getBotStatus } from './telegram-bot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// In-Memory Leads Log
const leadsQueue = [];

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AGRORENTEX Backend & Telegram Bot',
    version: '1.0.0',
    totalLeadsProcessed: leadsQueue.length,
    telegram: getBotStatus()
  });
});

// Telegram Bot Status API
app.get('/api/telegram-status', (req, res) => {
  res.json(getBotStatus());
});

// Lead Pipeline Endpoint (/api/send-lead)
app.post('/api/send-lead', async (req, res) => {
  try {
    const raw = req.body || {};
    const leadId = raw.leadId || `AGRO-${Date.now().toString().slice(-6)}`;
    const fullName = (raw.fullName || raw.name || 'Клієнт').trim();
    const phone = (raw.phone || raw.tel || '').trim();
    const companyName = (raw.companyName || raw.company || raw.enterprise || raw.farm || '').trim();
    const topic = (raw.topic || raw.machineName || raw.subject || 'Консультація').trim();
    const notes = (raw.notes || raw.message || raw.comment || '').trim();
    const source = (raw.source || 'Форма на сайті AGRORENTEX').trim();
    const rentType = (raw.rentType || '').trim();
    const totalEstimateUah = raw.totalEstimateUah ? `${raw.totalEstimateUah.toLocaleString('uk-UA')} ₴` : '';

    if (!phone) {
      return res.status(400).json({ success: false, error: 'Номер телефону обов\'язковий' });
    }

    const newLead = {
      leadId,
      machineName: topic,
      fullName,
      phone,
      companyName,
      rentType,
      quantity: raw.quantity,
      withOperator: raw.withOperator ? 'Так (+екіпаж)' : 'Ні (холодна оренда)',
      withTrallDelivery: raw.withTrallDelivery ? 'Так (подача тралом)' : 'Самовивіз',
      selectedDate: raw.selectedDate || 'Найближчий час',
      timeSlot: raw.timeSlot || 'Денна зміна',
      totalEstimateUah,
      notes,
      topic,
      source,
      receivedAt: new Date().toISOString()
    };

    leadsQueue.push(newLead);

    // Formatted Console Lead log output
    console.log('\n========================================');
    console.log('🌾 [НОВА ЗАЯВКА НА ОРЕНДУ / КУПІВЛЮ АГРОТЕХНІКИ]');
    console.log(`🆔 Номер: #${newLead.leadId}`);
    console.log(`📌 Тема: ${newLead.topic}`);
    console.log(`👤 Клієнт: ${newLead.fullName} ${newLead.companyName ? `(${newLead.companyName})` : ''}`);
    console.log(`📞 Телефон: ${newLead.phone}`);
    if (newLead.notes) console.log(`💬 Повідомлення: ${newLead.notes}`);
    console.log('========================================\n');

    // Broadcast instant lead notification to Telegram Bot Admin Chats
    const telegramResult = await broadcastLeadNotification(newLead);

    return res.status(200).json({
      success: true,
      leadId: newLead.leadId,
      message: 'Заявку успішно прийнято та передано диспетчеру в Telegram',
      leadSummary: newLead,
      telegram: telegramResult
    });
  } catch (error) {
    console.error('Lead processing error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

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

const MEDIA_CACHE_DIR = path.join(__dirname, 'public', 'media-cache');
if (!fs.existsSync(MEDIA_CACHE_DIR)) {
  fs.mkdirSync(MEDIA_CACHE_DIR, { recursive: true });
}

const FALLBACK_IMAGE_PATH = path.join(__dirname, 'public', 'assets', 'products', 'zhatky-dlya-kombajniv.webp');

// Encrypted Media Streamer (/api/media/:encodedUrl) with disk cache & 429 protection
app.get('/api/media/:encodedUrl', (req, res) => {
  const safeFileName = crypto.createHash('md5').update(req.params.encodedUrl).digest('hex') + '.jpg';
  const cacheFilePath = path.join(MEDIA_CACHE_DIR, safeFileName);

  // 1. Return from disk cache if already downloaded
  if (fs.existsSync(cacheFilePath)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.sendFile(cacheFilePath);
  }

  try {
    let rawUrl = decryptImageUrl(req.params.encodedUrl);
    if (!rawUrl || !rawUrl.startsWith('http')) {
      rawUrl = decodeURIComponent(req.params.encodedUrl);
    }

    if (!rawUrl || !rawUrl.startsWith('http')) {
      if (fs.existsSync(FALLBACK_IMAGE_PATH)) return res.sendFile(FALLBACK_IMAGE_PATH);
      return res.status(200).end();
    }

    const parsedUrl = new URL(rawUrl);
    const client = parsedUrl.protocol === 'https:' ? https : http;

    const requestOptions = {
      headers: {
        'User-Agent': 'Googlebot-Image/1.0',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': parsedUrl.origin
      }
    };

    client.get(rawUrl, requestOptions, (externalRes) => {
      if (externalRes.statusCode >= 300 && externalRes.statusCode < 400 && externalRes.headers.location) {
        const redirectClient = externalRes.headers.location.startsWith('https') ? https : http;
        redirectClient.get(externalRes.headers.location, requestOptions, (redirectRes) => {
          const contentType = redirectRes.headers['content-type'] || 'image/jpeg';
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          const fileStream = fs.createWriteStream(cacheFilePath);
          redirectRes.pipe(fileStream);
          redirectRes.pipe(res);
        }).on('error', () => {
          if (fs.existsSync(FALLBACK_IMAGE_PATH)) res.sendFile(FALLBACK_IMAGE_PATH);
          else res.status(200).end();
        });
        return;
      }

      if (externalRes.statusCode !== 200) {
        // Upstream rate limit or error - serve fallback gracefully instead of breaking
        if (fs.existsSync(FALLBACK_IMAGE_PATH)) {
          return res.sendFile(FALLBACK_IMAGE_PATH);
        }
        return res.status(200).end();
      }

      const contentType = externalRes.headers['content-type'] || 'image/jpeg';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

      const fileStream = fs.createWriteStream(cacheFilePath);
      externalRes.pipe(fileStream);
      externalRes.pipe(res);
    }).on('error', (err) => {
      console.error('Media proxy fetch error:', err.message);
      if (fs.existsSync(FALLBACK_IMAGE_PATH)) {
        res.sendFile(FALLBACK_IMAGE_PATH);
      } else {
        res.status(200).end();
      }
    });
  } catch (err) {
    if (fs.existsSync(FALLBACK_IMAGE_PATH)) {
      res.sendFile(FALLBACK_IMAGE_PATH);
    } else {
      res.status(200).end();
    }
  }
});

// Explicit sitemap.xml and robots.txt endpoints
app.get('/sitemap.xml', (req, res) => {
  const p = fs.existsSync(path.join(distPath, 'sitemap.xml'))
    ? path.join(distPath, 'sitemap.xml')
    : path.join(__dirname, 'public', 'sitemap.xml');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(p);
});

app.get('/robots.txt', (req, res) => {
  const p = fs.existsSync(path.join(distPath, 'robots.txt'))
    ? path.join(distPath, 'robots.txt')
    : path.join(__dirname, 'public', 'robots.txt');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(p);
});

// Serve Static Frontend if build exists
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.send('AGRORENTEX API is running. Build front-end with `npm run build` to serve SPA.');
    }
  });
});

// Start Server and Telegram Bot
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚜 AGRORENTEX Server running on port ${PORT}`);
  console.log(`🤖 Initializing Telegram Bot integration...`);
  await initTelegramBot();
});
