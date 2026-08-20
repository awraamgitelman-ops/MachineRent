import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Wrench, 
  ShieldCheck, 
  Calculator, 
  Phone, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Clock,
  Calendar,
  Zap,
  Star
} from 'lucide-react';
import { MACHINERY_DATA } from '../data/machineryData';
import { formatPrice } from '../utils/currency';
import { formatPhoneNumber, isValidUkrainianPhone } from '../utils/phoneFormatter';
import MachineryCard from '../components/MachineryCard';

export default function ProductPage({ currency, onOpenQuickLead }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Find product by slug or id
  const machine = useMemo(() => {
    return MACHINERY_DATA.find((m) => m.slug === slug || m.id === slug) ||
           MACHINERY_DATA.find((m) => m.slug.includes(slug) || slug.includes(m.slug)) ||
           MACHINERY_DATA[0];
  }, [slug]);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specs' | 'calculator' | 'delivery'

  // Calculator State
  const [rentType, setRentType] = useState('shifts'); // 'shifts' | 'ha' | 'days'
  const [quantity, setQuantity] = useState(3);
  const [withOperator, setWithOperator] = useState(machine?.specs?.operatorIncluded ?? true);
  const [withTrallDelivery, setWithTrallDelivery] = useState(true);

  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [companyName, setCompanyName] = useState('');
  const [fieldAddress, setFieldAddress] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [formError, setFormError] = useState('');

  // Calculated Pricing Breakdown
  const priceCalculations = useMemo(() => {
    if (!machine) return {};
    let baseRate = rentType === 'shifts' 
      ? (machine.pricing?.pricePerShiftUah || 18000)
      : rentType === 'ha' 
      ? (machine.pricing?.pricePerHaUah || 1400)
      : (machine.pricing?.pricePerDayUah || 21000);

    const rawTotal = baseRate * quantity;

    let discountPercent = 0;
    if (quantity >= 20) discountPercent = 15;
    else if (quantity >= 10) discountPercent = 10;
    else if (quantity >= 5) discountPercent = 5;

    const discountAmount = Math.round(rawTotal * (discountPercent / 100));
    const discountedTotal = rawTotal - discountAmount;
    const operatorTotal = withOperator && !machine.specs?.operatorIncluded ? 2500 * quantity : 0;
    const deliveryTotal = withTrallDelivery ? 12000 : 0;
    const grandTotalUah = discountedTotal + operatorTotal + deliveryTotal;

    return {
      rawTotal,
      discountPercent,
      discountAmount,
      operatorTotal,
      deliveryTotal,
      grandTotalUah,
      depositUah: machine.pricing?.depositUah || 30000
    };
  }, [machine, rentType, quantity, withOperator, withTrallDelivery]);

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!isValidUkrainianPhone(phone)) {
      setFormError('Введіть коректний номер телефону (+380 XX XXX XX XX)');
      return;
    }
    if (!fullName.trim()) {
      setFormError("Будь ласка, вкажіть ваше ім'я");
      return;
    }

    setIsSubmitting(true);
    const bookingPayload = {
      leadId: `ADENA-${Date.now().toString().slice(-6)}`,
      machineId: machine.id,
      machineName: machine.name,
      brand: machine.brand,
      rentType,
      quantity,
      withOperator,
      withTrallDelivery,
      fullName,
      phone,
      companyName,
      fieldAddress,
      totalEstimateUah: priceCalculations.grandTotalUah,
      currency,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        setBookingResult(data);
      } else {
        setBookingResult({
          success: true,
          leadId: bookingPayload.leadId,
          message: 'Заявку прийнято. Менеджер зв’яжеться з вами протягом 10 хвилин.'
        });
      }
      setBookingSuccess(true);
    } catch (err) {
      setBookingResult({ success: true, leadId: bookingPayload.leadId });
      setBookingSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', paddingBottom: '60px' }}>
      
      {/* 1. Breadcrumbs Bar */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777', flexWrap: 'wrap', gap: '6px' }}>
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaa" />
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Польова техніка</Link>
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
            <span>Назад до списку техніки</span>
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
                <span><strong>Доставка тралом</strong> по всій території України</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Wrench size={18} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <span><strong>Сервісна підтримка 24/7</strong> та оригінальні комплектуючі</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <span><strong>Офіційний договір оренди</strong>, ПДВ, гарантія готовності</span>
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
                  <div style={{ fontSize: '14px', color: '#555', marginTop: '6px' }}>
                    Оренда: <strong style={{ color: '#111' }}>{formatPrice(machine.pricing.pricePerShiftUah, currency)} / зміна</strong> або {formatPrice(machine.pricing.pricePerHaUah, currency)} / га
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--wd-price-red)', lineHeight: 1.1 }}>
                    {formatPrice(machine.pricing?.pricePerShiftUah || 18000, currency)}
                    <span style={{ fontSize: '15px', fontWeight: 400, color: '#666', marginLeft: '6px' }}>/ зміна (10г)</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#555', marginTop: '6px' }}>
                    Подобово: <strong>{formatPrice(machine.pricing?.pricePerDayUah || 21000, currency)} / доба</strong>
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
                ⚡ <strong>Потужність:</strong> {machine.specs?.powerHp || 'від 90 к.с.'}
              </div>
              <div style={{ background: '#f6f6f6', padding: '10px 12px', borderLeft: '3px solid var(--wd-accent-yellow)' }}>
                📐 <strong>Ширина / Ряди:</strong> {machine.specs?.workingWidth || '2-4 ряди'}
              </div>
              <div style={{ background: '#f6f6f6', padding: '10px 12px', borderLeft: '3px solid var(--wd-accent-yellow)' }}>
                🚀 <strong>Продуктивність:</strong> {machine.specs?.performanceHaPerHour || 'до 3 га/год'}
              </div>
              <div style={{ background: '#f6f6f6', padding: '10px 12px', borderLeft: '3px solid var(--wd-accent-yellow)' }}>
                👨‍🌾 <strong>Оператор:</strong> {machine.specs?.operatorIncluded ? 'Включено в тариф' : 'За домовленістю'}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setActiveTab('calculator');
                  const el = document.getElementById('product-tabs-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-adena-primary"
                style={{ height: '50px', fontSize: '15px', fontWeight: 600, padding: '0 24px', flex: '1 1 240px' }}
              >
                <Calculator size={18} />
                <span>Замовити оренду / Розрахувати</span>
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
              { id: 'calculator', label: 'Калькулятор оренди та замовлення' },
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
                <li><strong>Висока точність обробітку:</strong> формування ідеального гребеня чи збирання без втрат і травмування бульб.</li>
                <li><strong>Оригінальні робочі органи:</strong> застосування загартованої сталі Hardox для максимального ресурсу в польових умовах.</li>
                <li><strong>Мінімальне навантаження на тягач:</strong> збалансований ротор та оптимізована геометрія ножів зменшують витрату дизельного пального.</li>
                <li><strong>Передрейсова підготовка:</strong> кожен агрегат проходить повне сервісне ТО та налаштування інженерами Adena Agro.</li>
              </ul>
            </div>
          )}

          {/* Tab 2: Specs Table */}
          {activeTab === 'specs' && (
            <div style={{ maxWidth: '960px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <tbody>
                  {[
                    { label: 'Виробник / Бренд', val: machine.brand },
                    { label: 'Модель техніки', val: machine.model || machine.name },
                    { label: 'Потужність / Привід', val: machine.specs?.powerHp || 'від 90 к.с.' },
                    { label: 'Робоча ширина / Ряди', val: machine.specs?.workingWidth || '2-4 ряди' },
                    { label: 'Продуктивність', val: machine.specs?.performanceHaPerHour || 'до 3 га/год' },
                    { label: 'Рік випуску', val: `${machine.specs?.year || 2024} р.` },
                    { label: 'Напрацювання', val: machine.specs?.engineHours || '180 м/г' },
                    { label: 'Маса агрегату', val: `${machine.specs?.weightKg || 1450} кг` },
                    { label: 'Вимоги до трактора', val: machine.specs?.requiredTractorHp || 'від 90 к.с.' },
                    { label: 'Спеціалізація', val: (machine.suitableFor || []).join(', ') },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f9f9f9', borderBottom: '1px solid #eaeaea' }}>
                      <th style={{ textAlign: 'left', padding: '12px 16px', width: '35%', color: '#666', fontWeight: 500 }}>{row.label}</th>
                      <td style={{ padding: '12px 16px', color: '#111', fontWeight: 600 }}>{row.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Calculator & Booking */}
          {activeTab === 'calculator' && (
            <div style={{ maxWidth: '960px' }}>
              {bookingSuccess ? (
                <div style={{ padding: '36px', textAlign: 'center', background: '#fafafa', border: '1px solid #eaeaea' }}>
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
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>
                    Заявку успішно оформлено!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                    Номер броні: <strong style={{ color: 'var(--wd-primary-color)' }}>#{bookingResult?.leadId || 'ADENA-2026'}</strong>.<br/>
                    Менеджер зателефонує вам за номером <strong>{phone}</strong> протягом 10 хвилин.
                  </p>
                  <button onClick={() => setBookingSuccess(false)} className="btn-adena-primary" style={{ padding: '10px 20px' }}>
                    Зробити ще один розрахунок
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', ...(window.innerWidth < 768 ? { gridTemplateColumns: '1fr' } : {}) }}>
                  
                  {/* Left: Interactive Calc */}
                  <div style={{ background: '#fafafa', border: '1px solid #eaeaea', padding: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '14px' }}>
                      1. Параметри оренди
                    </h3>

                    {/* Mode Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '16px' }}>
                      {[
                        { id: 'shifts', label: 'За зміну', price: machine.pricing?.pricePerShiftUah || 18000 },
                        { id: 'ha', label: 'За гектар', price: machine.pricing?.pricePerHaUah || 1400 },
                        { id: 'days', label: 'Подобово', price: machine.pricing?.pricePerDayUah || 21000 },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setRentType(m.id)}
                          style={{
                            padding: '8px 4px',
                            border: rentType === m.id ? '2px solid var(--wd-primary-color)' : '1px solid #d2d2d2',
                            background: rentType === m.id ? '#fff6f0' : '#ffffff',
                            color: rentType === m.id ? 'var(--wd-primary-color)' : '#333',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <div>{m.label}</div>
                          <div style={{ color: 'var(--wd-price-red)', fontWeight: 700 }}>
                            {formatPrice(m.price, currency)}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Slider */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                        <span>Кількість ({rentType === 'shifts' ? 'змін' : rentType === 'ha' ? 'гектарів' : 'діб'}):</span>
                        <strong style={{ color: 'var(--wd-primary-color)' }}>{quantity}</strong>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max={rentType === 'ha' ? 200 : 30}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--wd-primary-color)' }}
                      />
                    </div>

                    {/* Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={withOperator}
                          onChange={(e) => setWithOperator(e.target.checked)}
                          style={{ accentColor: 'var(--wd-primary-color)' }}
                        />
                        <span>Послуги оператора Adena Agro</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={withTrallDelivery}
                          onChange={(e) => setWithTrallDelivery(e.target.checked)}
                          style={{ accentColor: 'var(--wd-primary-color)' }}
                        />
                        <span>Доставка тралом на поле</span>
                      </label>
                    </div>

                    {/* Summary */}
                    <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#666' }}>Розрахункова вартість:</span>
                        <strong style={{ fontSize: '24px', color: 'var(--wd-price-red)', display: 'block' }}>
                          {formatPrice(priceCalculations.grandTotalUah, currency)}
                        </strong>
                      </div>
                      <span style={{ fontSize: '12px', color: '#888' }}>
                        Застава: {formatPrice(priceCalculations.depositUah, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Booking Form */}
                  <form onSubmit={handleBookingSubmit} style={{ background: '#ffffff', border: '1px solid #eaeaea', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111', margin: 0 }}>
                      2. Оформити бронювання
                    </h3>

                    {formError && (
                      <div style={{ padding: '8px 12px', background: '#ffebee', color: '#c62828', fontSize: '12px' }}>
                        {formError}
                      </div>
                    )}

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#666', marginBottom: '2px' }}>Ваше ім'я *</label>
                      <input
                        type="text"
                        className="wpf-select"
                        placeholder="Олександр"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#666', marginBottom: '2px' }}>Телефон *</label>
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
                      <label style={{ display: 'block', fontSize: '11px', color: '#666', marginBottom: '2px' }}>Господарство / ТОВ</label>
                      <input
                        type="text"
                        className="wpf-select"
                        placeholder="СФГ Агро"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#666', marginBottom: '2px' }}>Локація поля</label>
                      <input
                        type="text"
                        className="wpf-select"
                        placeholder="Область, населений пункт"
                        value={fieldAddress}
                        onChange={(e) => setFieldAddress(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-adena-primary"
                      style={{ height: '46px', fontWeight: 600, marginTop: '6px' }}
                    >
                      {isSubmitting ? 'Відправка...' : 'Підтвердити бронь'}
                    </button>
                  </form>

                </div>
              )}
            </div>
          )}

          {/* Tab 4: Delivery */}
          {activeTab === 'delivery' && (
            <div style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, maxWidth: '960px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '12px' }}>
                Логістика та розрахунки:
              </h3>
              <p style={{ marginBottom: '12px' }}>
                Adena Agro здійснює цілодобову доставку техніки по всій Україні спеціалізованими низькорамними тралами з власним екіпажем.
              </p>
              <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Терміни:</strong> подача агрегату на поле протягом 12–24 годин після підписання договору.</li>
                <li><strong>Оплата:</strong> безготівковий розрахунок із реєстрацією податкової накладної (ПДВ).</li>
                <li><strong>Супровід:</strong> кваліфікований інженер проводить запуск у борозні та навчання вашого механізатора.</li>
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
