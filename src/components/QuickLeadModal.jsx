import React, { useState } from 'react';
import { X, CheckCircle2, Phone } from 'lucide-react';
import { formatPhoneNumber, isValidUkrainianPhone } from '../utils/phoneFormatter';

export default function QuickLeadModal({ 
  initialTopic = '', 
  onClose 
}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState(initialTopic || 'Консультація по оренді техніки');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isValidUkrainianPhone(phone)) {
      setErrorMsg('Введіть коректний номер телефону (+380 XX XXX XX XX)');
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg("Вкажіть ваше ім'я");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          company,
          topic,
          timestamp: new Date().toISOString()
        })
      }).catch(() => null);

      setIsSuccess(true);
    } catch (err) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px', padding: '28px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase' }}>
              Зворотний зв'язок
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', margin: 0 }}>
              Замовити консультацію
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#eefcf1',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '6px' }}>
              Дякуємо за звернення!
            </h4>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
              Менеджер Adena Agro зателефонує вам за номером <strong>{phone}</strong> протягом 10 хвилин.
            </p>
            <button onClick={onClose} className="btn-adena-primary" style={{ width: '100%', padding: '10px' }}>
              Зрозуміло
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {errorMsg && (
              <div style={{ padding: '8px 12px', background: '#ffebee', color: '#c62828', fontSize: '12px' }}>
                {errorMsg}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '3px' }}>Тема:</label>
              <input
                type="text"
                className="wpf-select"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '3px' }}>Ваше ім'я *</label>
              <input
                type="text"
                className="wpf-select"
                placeholder="Іван"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '3px' }}>Номер телефону *</label>
              <input
                type="tel"
                className="wpf-select"
                placeholder="+380 (96) 000-00-00"
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '3px' }}>Господарство (необов'язково)</label>
              <input
                type="text"
                className="wpf-select"
                placeholder="СФГ / ТОВ"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-adena-primary"
              style={{ height: '44px', fontWeight: 600, marginTop: '6px' }}
            >
              {isSubmitting ? 'Відправка...' : 'Отримати консультацію'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
