import React, { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle2, Phone, ChevronDown, Edit3 } from 'lucide-react';
import { formatPhoneNumber, isValidUkrainianPhone } from '../utils/phoneFormatter';
import { submitLead } from '../utils/leadSender';

const TOPIC_PRESETS = [
  'Консультація',
  'Підбір техніки для овочівництва',
  'Оренда польової техніки (позмінно / на сезон)',
  'Купівля нової с/г техніки',
  'Підбір та купівля техніки Б/В з Європи',
  'Жатки зернові та соєві (купівля / оренда)',
  'Складське обладнання, сортування та фасування',
  'Замовлення запчастин, роликів та пасів',
  'Ремонт та реставрація транспортерів',
  'Виїзна консультація інженера-сервісанта',
  'Своя пропозиція / Інше'
];

export default function QuickLeadModal({ 
  initialTopic = '', 
  onClose 
}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [company, setCompany] = useState('');
  
  // Build dynamic topic options: if button passes a specific product/service, put it at the very top
  const topicOptions = useMemo(() => {
    if (!initialTopic) return TOPIC_PRESETS;
    if (TOPIC_PRESETS.includes(initialTopic)) return TOPIC_PRESETS;
    return [initialTopic, ...TOPIC_PRESETS.filter(t => t !== 'Своя пропозиція / Інше'), 'Своя пропозиція / Інше'];
  }, [initialTopic]);

  const [selectedTopic, setSelectedTopic] = useState(
    initialTopic || 'Підбір техніки для овочівництва'
  );
  const [customTopic, setCustomTopic] = useState('');

  // Automatically update selected topic whenever a user clicks a button that opens the modal
  useEffect(() => {
    if (initialTopic) {
      setSelectedTopic(initialTopic);
      if (!TOPIC_PRESETS.includes(initialTopic) && initialTopic !== 'Своя пропозиція / Інше') {
        // It's in topicOptions at the top as an exact matched choice
      }
    }
  }, [initialTopic]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const isCustom = selectedTopic === 'Своя пропозиція / Інше';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Вкажіть ваше ім'я";
    }

    if (!isValidUkrainianPhone(phone)) {
      newErrors.phone = 'Введіть коректний номер телефону (+380 XX XXX XX XX)';
    }

    if (isCustom && !customTopic.trim()) {
      newErrors.customTopic = 'Опишіть вашу пропозицію або тему';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const finalTopic = isCustom ? customTopic.trim() : selectedTopic;

    try {
      await submitLead({
        fullName: fullName.trim(),
        phone: phone.trim(),
        company: company.trim(),
        topic: finalTopic,
        source: 'Модальне вікно консультації'
      });
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
        style={{ maxWidth: '520px', padding: '28px', borderRadius: '0px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Зворотний зв'язок
            </span>
            <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#111', margin: '2px 0 0 0' }}>
              Замовити консультацію
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f5f5f5',
              border: '1px solid #ddd',
              width: '32px',
              height: '32px',
              borderRadius: '0px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0 10px 0' }}>
            <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
              Дякуємо за звернення!
            </h4>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px', lineHeight: 1.6 }}>
              Менеджер AGRORENTEX зателефонує вам за номером <strong>{phone}</strong> протягом 10 хвилин.
            </p>
            <button onClick={onClose} className="btn-adena-primary" style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700 }}>
              Зрозуміло
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Topic Select */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                Тема звернення:
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 32px 0 12px',
                    border: '1px solid #d2d2d2',
                    borderRadius: '0px',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    color: '#222',
                    appearance: 'none',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {topicOptions.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  size={16} 
                  color="#666" 
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                />
              </div>
            </div>

            {/* Custom Topic Input (Revealed when "Своя пропозиція / Інше" is chosen) */}
            {isCustom && (
              <div style={{
                backgroundColor: '#fffdf9',
                border: errors.customTopic ? '1px solid #ef4444' : '1px solid #f6d8a7',
                padding: '10px 12px',
                borderRadius: '0px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: 'var(--wd-primary-color)', marginBottom: '4px' }}>
                  <Edit3 size={13} />
                  <span>Вкажіть вашу пропозицію або тему *:</span>
                </label>
                <input
                  type="text"
                  placeholder="Наприклад: пропозиція щодо співпраці, індивідуальна комплектація..."
                  value={customTopic}
                  onChange={(e) => {
                    setCustomTopic(e.target.value);
                    if (errors.customTopic) setErrors({ ...errors, customTopic: '' });
                  }}
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 10px',
                    border: errors.customTopic ? '1px solid #ef4444' : '1px solid #d2d2d2',
                    borderRadius: '0px',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                />
                {errors.customTopic && (
                  <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                    {errors.customTopic}
                  </div>
                )}
              </div>
            )}

            {/* Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                Ваше ім'я *
              </label>
              <input
                type="text"
                placeholder="Іван"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  border: errors.fullName ? '1px solid #ef4444' : '1px solid #d2d2d2',
                  borderRadius: '0px',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              {errors.fullName && (
                <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                  {errors.fullName}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                Номер телефону *
              </label>
              <input
                type="tel"
                placeholder="+380 (97) 000-00-00"
                value={phone}
                onChange={(e) => {
                  setPhone(formatPhoneNumber(e.target.value));
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  border: errors.phone ? '1px solid #ef4444' : '1px solid #d2d2d2',
                  borderRadius: '0px',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              {errors.phone && (
                <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Company / Farm */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                Господарство / Підприємство (необов'язково)
              </label>
              <input
                type="text"
                placeholder="СФГ / ФГ / ТОВ"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  border: '1px solid #d2d2d2',
                  borderRadius: '0px',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-adena-primary"
              style={{ height: '46px', fontWeight: 600, marginTop: '6px', fontSize: '14px' }}
            >
              {isSubmitting ? 'Відправка...' : 'Отримати консультацію'}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0 0 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
              <span style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>або</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>

            {/* WhatsApp Option Button */}
            <a
              href={`https://wa.me/380970079746?text=${encodeURIComponent('Доброго дня! Цікавить консультація щодо техніки AGRORENTEX' + (selectedTopic && selectedTopic !== 'Консультація' ? ` (${isCustom ? customTopic : selectedTopic})` : ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '44px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '0px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Зв'язатися у WhatsApp</span>
            </a>
          </form>
        )}

      </div>
    </div>
  );
}
