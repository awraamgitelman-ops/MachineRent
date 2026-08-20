import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowLeft, 
  Phone, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Send
} from 'lucide-react';
import { MACHINERY_DATA } from '../data/machineryData';
import { formatPrice } from '../utils/currency';
import MachineryCard from '../components/MachineryCard';

// Comprehensive translation map for any possible technical parameter keys
const SPEC_TRANSLATIONS = {
  powerHp: 'Необхідна потужність трактора',
  workingWidth: 'Робоча ширина / Кількість рядів',
  performanceHaPerHour: 'Продуктивність',
  requiredTractorHp: 'Вимоги до трактора',
  engineHours: 'Напрацювання',
  year: 'Рік випуску',
  weightKg: 'Маса агрегату',
  suitableFor: 'Призначення'
};

const EXCLUDED_SPEC_KEYS = new Set([
  'operatorIncluded',
  'fuelIncluded',
  'minRentDays',
  'depositUah',
  'pricePerShiftUah',
  'pricePerHaUah',
  'pricePerDayUah'
]);

export default function ProductPage({ currency, onOpenQuickLead }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Find product by slug or id
  const machine = useMemo(() => {
    if (!slug) return MACHINERY_DATA[0];
    return MACHINERY_DATA.find((m) => m.slug === slug || m.id === slug) ||
           MACHINERY_DATA.find((m) => m.slug.includes(slug) || slug.includes(m.slug)) ||
           MACHINERY_DATA[0];
  }, [slug]);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specs' | 'delivery'

  // Related Products
  const relatedProducts = useMemo(() => {
    if (!machine) return [];
    return MACHINERY_DATA
      .filter((m) => m.id !== machine.id && (m.brand === machine.brand || m.machineryType === machine.machineryType))
      .slice(0, 4);
  }, [machine]);

  if (!machine) {
    return (
      <div className="container" style={{ padding: '60px 15px', textAlign: 'center' }}>
        <h2>Товар не знайдено</h2>
        <Link to="/" className="btn-adena-primary" style={{ display: 'inline-block', marginTop: '16px' }}>
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  // Prepared specifications rows
  const specRows = useMemo(() => {
    const rows = [
      { label: 'Виробник / Бренд', val: machine.brand || 'Adena Agro' },
      { label: 'Модель техніки', val: machine.model || machine.name },
      { label: 'Категорія', val: machine.categoryName || 'Сільгосптехніка' }
    ];

    if (machine.specs && typeof machine.specs === 'object') {
      for (const [rawKey, rawVal] of Object.entries(machine.specs)) {
        if (EXCLUDED_SPEC_KEYS.has(rawKey)) continue;
        const translatedLabel = SPEC_TRANSLATIONS[rawKey] || rawKey;
        
        // Avoid duplicate brand/model if already added
        if (translatedLabel.toLowerCase() === 'виробник' && machine.brand) continue;

        let displayVal = rawVal;
        if (typeof rawVal === 'boolean') {
          displayVal = rawVal ? 'Так' : 'Ні';
        } else if (Array.isArray(rawVal)) {
          displayVal = rawVal.join(', ');
        } else {
          displayVal = String(rawVal);
        }

        if (displayVal.trim()) {
          rows.push({ label: translatedLabel, val: displayVal });
        }
      }
    }

    return rows;
  }, [machine]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', paddingBottom: '60px' }}>
      
      {/* 1. Breadcrumbs Bar */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777', flexWrap: 'wrap', gap: '6px' }}>
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaa" />
          <Link to={machine.machineryType === 'warehouse' ? '/product-category/skladska-tehnika' : machine.machineryType === 'parts' ? '/product-category/zapchastyny' : machine.machineryType === 'used' ? '/product-category/tehnika-b-v' : '/product-category/field'} style={{ color: '#333', fontWeight: 500 }}>
            {machine.categoryName || 'Каталог техніки'}
          </Link>
          <ChevronRight size={14} color="#aaa" />
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>{machine.brand}</span>
          <ChevronRight size={14} color="#aaa" />
          <span style={{ color: '#888' }}>{machine.name}</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '32px' }}>
        
        {/* Back Button for Quick Navigation */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} />
            <span>Назад до каталогу</span>
          </button>
        </div>

        {/* 2. Main Product Layout (Gallery Left, Details Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.2fr)',
          gap: '48px',
          alignItems: 'start',
          marginBottom: '56px',
          ...(window.innerWidth < 860 ? { gridTemplateColumns: '1fr', gap: '28px' } : {})
        }}>
          
          {/* LEFT: Image Gallery */}
          <div>
            {/* Main Stage Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              border: '1px solid #eaeaea',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              overflow: 'hidden',
              marginBottom: '14px'
            }}>
              {machine.badge && (
                <div className="product-label-badge product-label-sale">
                  {machine.badge}
                </div>
              )}

              <img
                src={machine.images[activePhotoIdx] || machine.images[0]}
                alt={machine.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>

            {/* Thumbnail Row */}
            {machine.images && machine.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '20px' }}>
                {machine.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    style={{
                      width: '76px',
                      height: '76px',
                      border: activePhotoIdx === idx ? '2px solid var(--wd-primary-color)' : '1px solid #e0e0e0',
                      backgroundColor: '#ffffff',
                      padding: '4px',
                      cursor: 'pointer',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div style={{
              background: '#fcfcfc',
              border: '1px solid #eaeaea',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '13px',
              color: '#444'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={18} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <span><strong>Доставка перевізниками та тралом</strong> по всій Україні</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Wrench size={18} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <span><strong>Сервісна підтримка та гарантія</strong> від виробника</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <span><strong>Оригінальні європейські комплектуючі</strong>, робота з ПДВ</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Product Summary */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Brand */}
            <div style={{ fontSize: '13px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
              Бренд: <strong style={{ color: '#111' }}>{machine.brand}</strong>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: '28px',
              fontWeight: 600,
              lineHeight: 1.25,
              color: '#111111',
              marginBottom: '16px'
            }}>
              {machine.name}
            </h1>

            {/* Price Box */}
            <div style={{
              borderTop: '1px solid #f0f0f0',
              borderBottom: '1px solid #f0f0f0',
              padding: '16px 0',
              marginBottom: '20px'
            }}>
              {machine.pricing?.purchasePriceUah ? (
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--wd-price-red)', lineHeight: 1.1 }}>
                    {formatPrice(machine.pricing.purchasePriceUah, currency)}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--wd-price-red)', lineHeight: 1.1 }}>
                    Ціна за запитом
                  </div>
                  <div style={{ fontSize: '13px', color: '#777', marginTop: '4px' }}>
                    Зв'яжіться з нами для отримання індивідуальної комерційної пропозиції
                  </div>
                </div>
              )}
            </div>

            {/* Short Description */}
            <div style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, marginBottom: '22px' }}>
              {machine.shortDescription}
            </div>

            {/* Key Specs Pills Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '26px',
              fontSize: '13px'
            }}>
              <div style={{ background: '#f6f6f6', padding: '10px 12px', borderLeft: '3px solid var(--wd-accent-yellow)' }}>
                ⚡ <strong>Потужність:</strong> {machine.specs?.['Необхідна потужність трактора'] || machine.specs?.['Потужність'] || 'від 90 к.с.'}
              </div>
              <div style={{ background: '#f6f6f6', padding: '10px 12px', borderLeft: '3px solid var(--wd-accent-yellow)' }}>
                📐 <strong>Ширина / Ряди:</strong> {machine.specs?.['Робоча ширина / Кількість рядів'] || machine.specs?.['Робоча ширина'] || '2-4 ряди'}
              </div>
              <div style={{ background: '#f6f6f6', padding: '10px 12px', borderLeft: '3px solid var(--wd-accent-yellow)' }}>
                🚀 <strong>Виробник:</strong> {machine.brand || 'Adena Agro'}
              </div>
              <div style={{ background: '#f6f6f6', padding: '10px 12px', borderLeft: '3px solid var(--wd-accent-yellow)' }}>
                📦 <strong>Стан:</strong> {machine.badge || 'В наявності'}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenQuickLead(`Замовлення товару: ${machine.name}`)}
                className="btn-adena-primary"
                style={{ height: '50px', fontSize: '15px', fontWeight: 600, padding: '0 28px', flex: '1 1 240px' }}
              >
                <Send size={18} />
                <span>Замовити / Отримати КП</span>
              </button>

              <a
                href="tel:+380966610100"
                className="btn-adena-secondary"
                style={{
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '0 20px',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <Phone size={16} color="var(--wd-primary-color)" />
                <span>+38 (096) 66 10 100</span>
              </a>
            </div>

          </div>

        </div>

        {/* 3. WooCommerce Full Product Tabs */}
        <div id="product-tabs-section" style={{ borderTop: '2px solid #111111', paddingTop: '24px', marginBottom: '48px' }}>
          
          {/* Tab Navigation Buttons */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #eaeaea', paddingBottom: '14px', marginBottom: '24px', overflowX: 'auto' }}>
            {[
              { id: 'description', label: 'Опис товару' },
              { id: 'specs', label: 'Технічні характеристики' },
              { id: 'delivery', label: 'Доставка та оплата' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#111111' : '#f4f4f4',
                  color: activeTab === tab.id ? '#ffffff' : '#333333',
                  border: 'none',
                  padding: '12px 22px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, maxWidth: '960px' }}>
              <p style={{ marginBottom: '16px' }}>
                {machine.fullDescription || machine.shortDescription}
              </p>
              
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', margin: '24px 0 12px 0' }}>
                Технологічні особливості та переваги моделі:
              </h3>
              <ul style={{ paddingLeft: '24px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Висока точність роботи:</strong> якісна підготовка та збирання без втрат і травмування продукції.</li>
                <li><strong>Оригінальні робочі органи:</strong> застосування зносостійких матеріалів для максимального ресурсу.</li>
                <li><strong>Мінімальне навантаження на техніку:</strong> збалансовані вузли та оптимізована геометрія зменшують витрати пального.</li>
                <li><strong>Передпродажна підготовка:</strong> кожен агрегат проходить перевірку та налаштування інженерами Adena Agro.</li>
              </ul>
            </div>
          )}

          {/* Tab 2: Specs Table */}
          {activeTab === 'specs' && (
            <div style={{ maxWidth: '960px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <tbody>
                  {specRows.map((row, idx) => (
                    <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f9f9f9', borderBottom: '1px solid #eaeaea' }}>
                      <th style={{ textAlign: 'left', padding: '12px 16px', width: '35%', color: '#666', fontWeight: 500 }}>{row.label}</th>
                      <td style={{ padding: '12px 16px', color: '#111', fontWeight: 600 }}>{row.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Delivery */}
          {activeTab === 'delivery' && (
            <div style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, maxWidth: '960px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '12px' }}>
                Логістика та розрахунки:
              </h3>
              <p style={{ marginBottom: '12px' }}>
                Adena Agro здійснює оперативну доставку техніки та запчастин по всій Україні зручними транспортними компаніями (Нова Пошта, Делівері, САТ) та спеціалізованими тралами.
              </p>
              <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Терміни:</strong> відправка запасних частин у день замовлення, великогабаритної техніки — за узгодженим графіком.</li>
                <li><strong>Оплата:</strong> безготівковий розрахунок із реєстрацією податкової накладної (ПДВ), готівка, лізинг.</li>
                <li><strong>Супровід:</strong> кваліфіковані інженери проводять запуск агрегатів у полі та гарантійне обслуговування.</li>
              </ul>
            </div>
          )}

        </div>

        {/* 4. Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '56px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111', marginBottom: '20px' }}>
              Схожа техніка
            </h2>

            <div className="products-bordered-grid" style={{ marginBottom: 0 }}>
              {relatedProducts.map((rel) => (
                <MachineryCard
                  key={rel.id}
                  machine={rel}
                  currency={currency}
                  onSelectMachine={(m) => navigate(`/product/${m.slug}`)}
                  onQuickBook={(m) => navigate(`/product/${m.slug}`)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
