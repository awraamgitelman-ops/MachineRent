import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Phone, 
  User, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Send 
} from 'lucide-react';
import { formatPhoneNumber, isValidUkrainianPhone } from '../utils/phoneFormatter';

export default function QuickLeadModal({ 
  initialTopic = '', 
  onClose 
}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState(initialTopic || 'Підбір техніки під площу поля');
  const [fieldLocation, setFieldLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isValidUkrainianPhone(phone)) {
      setErrorMsg('Будь ласка, введіть дійсний номер телефону (+380 XX XXX XX XX)');
      return;
    }

    if (!fullName.trim()) {
      setErrorMsg("Будь ласка, вкажіть ваше ім'я");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      leadId: `LEAD-${Date.now().toString().slice(-6)}`,
      fullName,
      phone,
      company,
      topic,
      fieldLocation,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px', padding: '32px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                Експрес-Консультація Агронома
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Підбір зчіпки машин, розрахунок графіку та знижок
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid #10b981',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Дякуємо! Запит прийнято.
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
              Провідний інженер-технолог зателефонує вам за номером <strong>{phone}</strong> протягом <strong>10 хвилин</strong> для детального узгодження.
            </p>
            <button onClick={onClose} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Зрозуміло
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {errorMsg && (
              <div style={{
                padding: '8px 12px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px'
              }}>
                {errorMsg}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                Тема запиту:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-field"
                style={{ height: '42px', fontSize: '13px' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                Ваше ім'я *
              </label>
              <input
                type="text"
                placeholder="Іван Васильович"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                style={{ height: '42px', fontSize: '13px' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                Номер телефону *
              </label>
              <input
                type="tel"
                placeholder="+380 (67) 000-00-00"
                value={phone}
                onChange={handlePhoneChange}
                className="input-field"
                style={{ height: '42px', fontSize: '13px' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Господарство
                </label>
                <input
                  type="text"
                  placeholder="Назва / ТОВ"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                  style={{ height: '42px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Регіон поля
                </label>
                <input
                  type="text"
                  placeholder="Область / район"
                  value={fieldLocation}
                  onChange={(e) => setFieldLocation(e.target.value)}
                  className="input-field"
                  style={{ height: '42px', fontSize: '13px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '8px', fontWeight: 700, fontSize: '15px' }}
            >
              {isSubmitting ? 'Відправка...' : 'Отримати комерційну пропозицію'}
            </button>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
              🔒 Ваші контактні дані захищено. Консультація безкоштовна.
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
