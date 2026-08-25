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
                placeholder="+380 (96) 000-00-00"
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
          </form>
        )}

      </div>
    </div>
  );
}
