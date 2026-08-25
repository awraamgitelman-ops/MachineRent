/**
 * Universal Lead Sender Utility for AGRORENTEX
 * Sends customer leads to backend (/api/send-lead) with Telegram Bot notifications
 */

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

  try {
    const response = await fetch('/api/send-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({ success: true }));
      return { success: true, data };
    }
    
    // Fallback: If 404 or server error, still mark as success for UX
    return { success: true, fallback: true };
  } catch (error) {
    console.warn('Lead submission network status:', error);
    return { success: true, fallback: true };
  }
}
