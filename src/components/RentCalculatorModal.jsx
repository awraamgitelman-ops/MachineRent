import React, { useState } from 'react';
import { X, Calculator, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function RentCalculatorModal({ 
  currency, 
  onClose, 
  onOpenQuickLead 
}) {
  const [cropType, setCropType] = useState('potato');
  const [fieldAreaHa, setFieldAreaHa] = useState(80);
  const [operation, setOperation] = useState('harvest');
  const [operatorNeeded, setOperatorNeeded] = useState(true);
  const [trallNeeded, setTrallNeeded] = useState(true);

  const operationRates = {
    tillage: { uahPerHa: 1400, name: 'Підготовка ґрунту / Фрезерування' },
    planting: { uahPerHa: 1650, name: 'Посадка / Посів овочевих' },
    haulm: { uahPerHa: 1100, name: 'Видалення бадилля (Struik GLUTTON)' },
    harvest: { uahPerHa: 3600, name: 'Збір врожаю комбайнами Grimme / Dewulf' },
  };

  const currentOp = operationRates[operation] || operationRates.harvest;
  const rawTotal = currentOp.uahPerHa * fieldAreaHa;

  let discountPercent = 0;
  if (fieldAreaHa >= 300) discountPercent = 15;
  else if (fieldAreaHa >= 150) discountPercent = 10;
  else if (fieldAreaHa >= 50) discountPercent = 5;

  const discountAmount = Math.round(rawTotal * (discountPercent / 100));
  const trallTotal = trallNeeded ? 18000 : 0;
  const operatorTotal = operatorNeeded ? fieldAreaHa * 200 : 0;
  const grandTotal = rawTotal - discountAmount + trallTotal + operatorTotal;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px', padding: '28px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase' }}>
              Онлайн сервіс
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', margin: 0 }}>
              Калькулятор Вартості Оренди Техніки
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Культура:</label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="wpf-select"
            >
              <option value="potato">🥔 Картопля (Повний комплекс)</option>
              <option value="carrot">🥕 Морква</option>
              <option value="onion">🧅 Цибуля</option>
              <option value="beet">🌱 Цукровий буряк</option>
              <option value="grain">🌾 Зернові та кукурудза</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Технологічна операція:</label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="wpf-select"
            >
              <option value="tillage">Підготовка ґрунту / Фрезерування</option>
              <option value="planting">Посадка / Посів</option>
              <option value="haulm">Видалення бадилля</option>
              <option value="harvest">Збір врожаю комбайнами</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
            <span style={{ fontWeight: 600 }}>Площа поля для обробітку:</span>
            <strong style={{ color: 'var(--wd-primary-color)' }}>{fieldAreaHa} га</strong>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={fieldAreaHa}
            onChange={(e) => setFieldAreaHa(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--wd-primary-color)' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px', fontSize: '13px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={operatorNeeded}
              onChange={(e) => setOperatorNeeded(e.target.checked)}
              style={{ accentColor: 'var(--wd-primary-color)' }}
            />
            <span>Робота оператора Adena Agro</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={trallNeeded}
              onChange={(e) => setTrallNeeded(e.target.checked)}
              style={{ accentColor: 'var(--wd-primary-color)' }}
            />
            <span>Подача тралом по області</span>
          </label>
        </div>

        {/* Calculation Result */}
        <div style={{ background: '#fafafa', border: '1px solid #eaeaea', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: '#666' }}>
            <span>Базова вартість ({fieldAreaHa} га):</span>
            <span style={{ color: '#111', fontWeight: 600 }}>{formatPrice(rawTotal, currency)}</span>
          </div>

          {discountPercent > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: 'var(--wd-primary-color)' }}>
              <span>Оптова знижка (-{discountPercent}%):</span>
              <span style={{ fontWeight: 600 }}>-{formatPrice(discountAmount, currency)}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid #e0e0e0', paddingTop: '10px', marginTop: '10px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Разом з ПДВ:</span>
              <strong style={{ fontSize: '24px', color: 'var(--wd-price-red)' }}>
                {formatPrice(grandTotal, currency)}
              </strong>
            </div>
            <div style={{ textAlign: 'right', fontSize: '13px', color: '#333' }}>
              <strong>{formatPrice(Math.round(grandTotal / fieldAreaHa), currency)}</strong> / га
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              onClose();
              onOpenQuickLead(`Прорахунок: ${currentOp.name} (${fieldAreaHa} га) на суму ${formatPrice(grandTotal, currency)}`);
            }}
            className="btn-adena-primary"
            style={{ flex: 1, padding: '12px', fontWeight: 600 }}
          >
            Замовити за цією вартістю
          </button>
          <button onClick={onClose} className="btn-adena-secondary" style={{ padding: '12px 20px' }}>
            Закрити
          </button>
        </div>

      </div>
    </div>
  );
}
