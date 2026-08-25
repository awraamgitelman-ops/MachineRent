/**
 * Universal Lead Sender Utility for AGRORENTEX
 * Sends customer leads to backend (/api/send-lead) AND directly to Telegram Bot (@alertWEB404_bot)
 */

const BOT_TOKEN = '8850886240:AAHmUg8-3b2V3E4o3Aa_SBzz18qHKXvScw4';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatLeadMessage(lead) {
  const timeString = new Date().toLocaleString('uk-UA', { 
    timeZone: 'Europe/Kyiv', 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  let msg = `🚜 <b>НОВА ЗАЯВКА З САЙТУ AGRORENTEX</b>\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🆔 <b>Номер:</b> <code>#${lead.leadId}</code>\n`;
  msg += `📌 <b>Тема:</b> <b>${escapeHtml(lead.topic)}</b>\n`;
  msg += `👤 <b>Клієнт:</b> <b>${escapeHtml(lead.fullName)}</b>\n`;
  msg += `📞 <b>Телефон:</b> <code>${escapeHtml(lead.phone)}</code>\n`;

  if (lead.company) {
    msg += `🏢 <b>Підприємство / СФГ:</b> ${escapeHtml(lead.company)}\n`;
  }
  if (lead.rentType) {
    msg += `⏱ <b>Формат:</b> ${escapeHtml(lead.rentType)}\n`;
  }
  if (lead.notes) {
    msg += `💬 <b>Коментар / Запитання:</b>\n<i>${escapeHtml(lead.notes)}</i>\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📍 <b>Джерело:</b> ${escapeHtml(lead.source)}\n`;
  msg += `⏱ <b>Час надходження:</b> ${timeString} (Київ)\n`;
  msg += `🌐 <b>Сайт:</b> <a href="https://agrorentex.com">agrorentex.com</a>`;

  return msg;
}

export async function submitLead(leadData) {
  const payload = {
    leadId: `AGRO-${Date.now().toString().slice(-6)}`,
    fullName: (leadData.fullName || leadData.name || 'Клієнт').trim(),
    phone: (leadData.phone || '').trim(),
    company: (leadData.company || leadData.companyName || '').trim(),
    topic: (leadData.topic || leadData.machineName || 'Консультація').trim(),
    notes: (leadData.notes || leadData.message || '').trim(),
    source: (leadData.source || 'Сайт AGRORENTEX').trim(),
    rentType: leadData.rentType || '',
    totalEstimateUah: leadData.totalEstimateUah || '',
    timestamp: new Date().toISOString()
  };

  const messageText = formatLeadMessage(payload);

  // 1. Send via local API endpoint (Vite dev server or backend server)
  try {
    const apiPromise = fetch('/api/send-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(() => null);

    // 2. Direct fallback/client dispatch to Telegram Bot
    const directTelegramPromise = (async () => {
      try {
        // Fetch active chats from Telegram updates
        const updatesRes = await fetch(`${TELEGRAM_API}/getUpdates?limit=50`).catch(() => null);
        if (updatesRes && updatesRes.ok) {
          const data = await updatesRes.json().catch(() => null);
          if (data && data.ok && Array.isArray(data.result)) {
            const chatIds = new Set();
            data.result.forEach(u => {
              const cid = u.message?.chat?.id || u.my_chat_member?.chat?.id || u.channel_post?.chat?.id;
              if (cid) chatIds.add(cid);
            });

            for (const cid of chatIds) {
              await fetch(`${TELEGRAM_API}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: cid,
                  text: messageText,
                  parse_mode: 'HTML',
                  disable_web_page_preview: true
                })
              }).catch(() => null);
            }
          }
        }
      } catch (err) {
        console.warn('Direct telegram broadcast error:', err);
      }
    })();

    await Promise.allSettled([apiPromise, directTelegramPromise]);
    return { success: true, payload };
  } catch (error) {
    console.warn('Lead submission handled:', error);
    return { success: true, payload };
  }
}
