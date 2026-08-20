import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// In-Memory Leads Log (Ready to connect with Telegram Bot API when configured)
const leadsQueue = [];

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Agro Machinery Rental Backend',
    version: '1.0.0',
    totalLeadsProcessed: leadsQueue.length
  });
});

// Blueprint Requirement В: Lead Pipeline Endpoint (/api/send-lead)
app.post('/api/send-lead', (req, res) => {
  try {
    const {
      leadId = `AGRO-${Date.now().toString().slice(-6)}`,
      machineName,
      fullName,
      phone,
      companyName,
      rentType,
      quantity,
      withOperator,
      withTrallDelivery,
      selectedDate,
      timeSlot,
      totalEstimateUah,
      notes,
      topic
    } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, error: 'Phone number is required' });
    }

    const newLead = {
      leadId,
      machineName: machineName || topic || 'Загальний підбір техніки',
      fullName: fullName || 'Агро-клієнт',
      phone,
      companyName: companyName || 'Не вказано',
      rentType,
      quantity,
      withOperator: withOperator ? 'Так (+екіпаж)' : 'Ні (холодна оренда)',
      withTrallDelivery: withTrallDelivery ? 'Так (подача тралом)' : 'Самовивіз',
      selectedDate: selectedDate || 'Найближчий час',
      timeSlot: timeSlot || 'Денна зміна',
      totalEstimateUah: totalEstimateUah ? `${totalEstimateUah.toLocaleString('uk-UA')} ₴` : 'За домовленістю',
      notes: notes || '',
      receivedAt: new Date().toISOString()
    };

    leadsQueue.push(newLead);

    // Formatted Telegram Lead log output
    console.log('\n========================================');
    console.log('🌾 [НОВА ЗАЯВКА НА ОРЕНДУ АГРОТЕХНІКИ]');
    console.log(`🆔 Номер: #${newLead.leadId}`);
    console.log(`🚜 Техніка: ${newLead.machineName}`);
    console.log(`👤 Клієнт: ${newLead.fullName} (${newLead.companyName})`);
    console.log(`📞 Телефон: ${newLead.phone}`);
    console.log(`📅 Дата/Зміна: ${newLead.selectedDate} | ${newLead.timeSlot}`);
    console.log(`💰 Сума: ${newLead.totalEstimateUah}`);
    console.log(`🚚 Трал / Екіпаж: ${newLead.withTrallDelivery} | ${newLead.withOperator}`);
    console.log('========================================\n');

    // Future Telegram Bot Forwarder:
    // If TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID exist in env, send HTTP POST to Telegram Bot API.
    // For now, return instant successful JSON response.

    return res.status(200).json({
      success: true,
      leadId: newLead.leadId,
      message: 'Заявку успішно прийнято в чергу диспетчера',
      leadSummary: newLead
    });
  } catch (error) {
    console.error('Lead processing error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Blueprint Requirement Б: Anti-CORS Media Streamer (/api/media/:encodedUrl)
app.get('/api/media/:encodedUrl', (req, res) => {
  try {
    const rawUrl = decodeURIComponent(req.params.encodedUrl);
    const parsedUrl = new URL(rawUrl);

    const client = parsedUrl.protocol === 'https:' ? https : http;

    const requestOptions = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': parsedUrl.origin
      }
    };

    client.get(rawUrl, requestOptions, (externalRes) => {
      if (externalRes.statusCode !== 200) {
        return res.status(externalRes.statusCode).send('Failed to fetch image');
      }

      // Pass content type and cache headers
      const contentType = externalRes.headers['content-type'] || 'image/jpeg';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24h

      externalRes.pipe(res);
    }).on('error', (err) => {
      console.error('Media proxy error:', err.message);
      res.status(500).send('Media stream error');
    });
  } catch (err) {
    res.status(400).send('Invalid URL format');
  }
});

// Serve Static Frontend if build exists
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.send('Agro Machinery Rental API is running. Build front-end with `npm run build` to serve SPA.');
    }
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚜 Agro Machinery Rental Server running on port ${PORT}`);
});
