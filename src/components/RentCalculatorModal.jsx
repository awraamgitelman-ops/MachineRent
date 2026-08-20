import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Sprout, 
  Sparkles, 
  Check, 
  ArrowRight,
  TrendingDown,
  Phone
} from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { MACHINERY_DATA } from '../data/machineryData';

export default function RentCalculatorModal({ 
  currency, 
  onClose, 
  onOpenQuickLead 
}) {
  const [cropType, setCropType] = useState('potato'); // potato, grain, corn, sunflower, vegetables
  const [fieldAreaHa, setFieldAreaHa] = useState(120);
  const [operation, setOperation] = useState('harvest'); // tillage, planting, spraying, harvest
  const [operatorNeeded, setOperatorNeeded] = useState(true);
  const [trallNeeded, setTrallNeeded] = useState(true);

  // Operations pricing matrix per hectare
  const operationRates = {
    tillage: { uahPerHa: 1400, name: 'Ґрунтообробка / Гребенеутворення', minDays: 2 },
    planting: { uahPerHa: 1650, name: 'Посів / Висадка розсади/бульб', minDays: 3 },
    spraying: { uahPerHa: 850, name: 'Внесення ЗЗР та КАС (обприскування)', minDays: 2 },
    harvest: { uahPerHa: 3600, name: 'Збирання врожаю комбайнами', minDays: 4 },
  };

  const currentOp = operationRates[operation];
  const rawTotal = currentOp.uahPerHa * fieldAreaHa;

  // Volume discount calculation
  let discountPercent = 0;
  if (fieldAreaHa >= 500) discountPercent = 18;
  else if (fieldAreaHa >= 250) discountPercent = 12;
  else if (fieldAreaHa >= 100) discountPercent = 7;
  else if (fieldAreaHa >= 50) discountPercent = 4;

  const discountAmount = Math.round(rawTotal * (discountPercent / 100));
  const trallTotal = trallNeeded ? 24000 : 0;
  const operatorTotal = operatorNeeded ? fieldAreaHa * 250 : 0;
  const grandTotal = rawTotal - discountAmount + trallTotal + operatorTotal;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', padding: '28px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calculator size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                Калькулятор Вартості Польових Робіт
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Миттєвий розрахунок оренди важкої техніки під площу вашого поля
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

        {/* Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          
          {/* Crop Type */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Сільськогосподарська культура:
            </label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="select-field"
              style={{ height: '44px', fontWeight: 600 }}
            >
              <option value="potato">🥔 Картопля (Повний цикл Grimme / Struik)</option>
              <option value="grain">🌾 Зернові (Пшениця, Ячмінь, Жито)</option>
              <option value="corn">🌽 Кукурудза на зерно / силос</option>
              <option value="sunflower">🌻 Соняшник</option>
              <option value="vegetables">🥕 Овочеві (Морква, Цибуля, Буряк)</option>
            </select>
          </div>

          {/* Operation Type */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Технологічна операція:
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="select-field"
              style={{ height: '44px', fontWeight: 600 }}
            >
              <option value="tillage">🚜 Глибока ґрунтообробка / Фрезерування</option>
              <option value="planting">🌱 Точний посів / Посадка</option>
              <option value="spraying">💧 Захист посівів / Внесення КАС</option>
              <option value="harvest">🌾 Збирання врожаю комбайнами</option>
            </select>
          </div>

        </div>

        {/* Hectares Slider */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
              Загальна площа поля для обробітку:
            </span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#34d399' }}>
              {fieldAreaHa} гектарів (га)
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={fieldAreaHa}
            onChange={(e) => setFieldAreaHa(Number(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>10 га</span>
            <span>250 га</span>
            <span>500 га</span>
            <span>1000 га</span>
          </div>
        </div>

        {/* Checkbox Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            cursor: 'pointer',
            fontSize: '13px'
          }}>
            <input
              type="checkbox"
              checked={operatorNeeded}
              onChange={(e) => setOperatorNeeded(e.target.checked)}
              style={{ accentColor: '#10b981', width: '16px', height: '16px' }}
            />
            <span>Робота сертифікованого оператора</span>
          </label>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            cursor: 'pointer',
            fontSize: '13px'
          }}>
            <input
              type="checkbox"
              checked={trallNeeded}
              onChange={(e) => setTrallNeeded(e.target.checked)}
              style={{ accentColor: '#10b981', width: '16px', height: '16px' }}
            />
            <span>Доставка важким тралом на поле</span>
          </label>
        </div>

        {/* Calculation Result Breakdown Card */}
        <div className="glass-panel" style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          background: 'rgba(16, 185, 129, 0.06)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>
            <span>Базова оренда ({fieldAreaHa} га × {formatPrice(currentOp.uahPerHa, currency)}):</span>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{formatPrice(rawTotal, currency)}</span>
          </div>

          {discountPercent > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#fbbf24' }}>
              <span>Знижка за обсяг площі (-{discountPercent}%):</span>
              <span style={{ fontWeight: 700 }}>-{formatPrice(discountAmount, currency)}</span>
            </div>
          )}

          {operatorNeeded && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <span>Послуги механізатора з паливною підтримкою:</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{formatPrice(operatorTotal, currency)}</span>
            </div>
          )}

          {trallNeeded && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <span>Подача та повернення негабаритного тралу:</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{formatPrice(trallTotal, currency)}</span>
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingTop: '12px',
            marginTop: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
                Орієнтовна вартість робіт з ПДВ:
              </span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#34d399' }}>
                {formatPrice(grandTotal, currency)}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
                Собівартість на 1 га:
              </span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                {formatPrice(Math.round(grandTotal / fieldAreaHa), currency)} / га
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            onClick={() => {
              onClose();
              onOpenQuickLead(`Прорахунок калькулятора: ${currentOp.name} (${fieldAreaHa} га) на суму ${formatPrice(grandTotal, currency)}`);
            }}
            className="btn btn-primary btn-lg"
            style={{ flex: 1, fontWeight: 700 }}
          >
            <span>Зафіксувати ціну та забронювати графік</span>
            <ArrowRight size={16} />
          </button>

          <button onClick={onClose} className="btn btn-outline btn-lg">
            Закрити
          </button>
        </div>

      </div>
    </div>
  );
}
