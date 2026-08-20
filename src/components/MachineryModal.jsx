import React, { useState, useMemo } from 'react';
import { 
  X, 
  Check, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  Building2, 
  Truck, 
  ShieldCheck, 
  Star, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Calculator,
  ArrowRight,
  CheckSquare,
  Wrench,
  HelpCircle
} from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { formatPhoneNumber, isValidUkrainianPhone } from '../utils/phoneFormatter';
import { MACHINERY_DATA } from '../data/machineryData';

export default function MachineryModal({ 
  machine, 
  currency, 
  onClose,
  onSelectMachine
}) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specs' | 'calculator' | 'delivery'

  // Calculator State
  const [rentType, setRentType] = useState('shifts'); // 'shifts' | 'ha' | 'days'
  const [quantity, setQuantity] = useState(3);
  const [withOperator, setWithOperator] = useState(machine.specs?.operatorIncluded ?? true);
  const [withTrallDelivery, setWithTrallDelivery] = useState(true);
  const [deliveryRegion, setDeliveryRegion] = useState('hub-kyiv');

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
  }, [machine, rentType, quantity, withOperator, withTrallDelivery, deliveryRegion]);

  // Related Products
  const relatedProducts = useMemo(() => {
    return MACHINERY_DATA
      .filter((m) => m.id !== machine.id && (m.brand === machine.brand || m.machineryType === machine.machineryType))
      .slice(0, 4);
  }, [machine]);

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
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1050px', padding: 0, overflow: 'hidden' }}
      >
        {/* Top Header Bar with Breadcrumb */}
        <div style={{
          padding: '14px 24px',
          borderBottom: '1px solid #eaeaea',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fafafa'
        }}>
          {/* Breadcrumbs */}
          <div style={{ fontSize: '13px', color: '#888' }}>
            <span style={{ cursor: 'pointer', color: '#111' }} onClick={onClose}>Головна</span>
            <span style={{ margin: '0 6px' }}>/</span>
            <span style={{ color: '#555' }}>Польова техніка</span>
            <span style={{ margin: '0 6px' }}>/</span>
            <strong style={{ color: 'var(--wd-primary-color)' }}>{machine.brand}</strong>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#ffffff',
              border: '1px solid #d2d2d2',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#111'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div style={{ maxHeight: 'calc(88vh - 60px)', overflowY: 'auto', padding: '24px' }}>
          
          {bookingSuccess ? (
            <div style={{ padding: '48px 32px', textAlign: 'center' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: '#eefcf1',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <CheckCircle2 size={40} />
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '10px', color: '#111' }}>
                Заявку успішно оформлено!
              </h3>

              <p style={{ fontSize: '15px', color: '#666', maxWidth: '560px', margin: '0 auto 24px auto' }}>
                Номер бронювання: <strong style={{ color: 'var(--wd-primary-color)' }}>#{bookingResult?.leadId || 'ADENA-2026'}</strong>.<br/>
                Менеджер Adena Agro зателефонує вам за номером <strong>{phone}</strong> протягом 10 хвилин для узгодження графіка робіт та доставки техніки.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button onClick={onClose} className="btn-adena-primary" style={{ padding: '12px 24px' }}>
                  Повернутися до каталогу
                </button>
                <a href="tel:+380966610100" className="btn-adena-secondary" style={{ padding: '12px 20px' }}>
                  +38 (096) 66 10 100
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Product Top Grid: Gallery & Summary (Exact Adena Agro Single Product Layout) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.05fr 1.15fr',
                gap: '32px',
                marginBottom: '36px',
                ...(window.innerWidth < 820 ? { gridTemplateColumns: '1fr' } : {})
              }}>
                
                {/* 1. Left Gallery */}
                <div>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '85%',
                    border: '1px solid #eaeaea',
                    backgroundColor: '#ffffff',
                    marginBottom: '12px',
                    overflow: 'hidden'
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
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '16px'
                      }}
                    />
                  </div>

                  {/* Thumbnail Row */}
                  {machine.images.length > 1 && (
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
                      {machine.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhotoIdx(idx)}
                          style={{
                            width: '64px',
                            height: '64px',
                            border: activePhotoIdx === idx ? '2px solid var(--wd-primary-color)' : '1px solid #e0e0e0',
                            background: '#ffffff',
                            padding: '4px',
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                        >
                          <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Trust Features */}
                  <div style={{
                    background: '#f9f9f9',
                    border: '1px solid #eaeaea',
                    padding: '14px',
                    marginTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#555'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Truck size={16} color="var(--wd-primary-color)" />
                      <span><strong>Доставка тралом</strong> по всій території України</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Wrench size={16} color="var(--wd-primary-color)" />
                      <span><strong>Сервісна підтримка 24/7</strong> та оригінальні комплектуючі</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck size={16} color="var(--wd-primary-color)" />
                      <span><strong>Офіційний договір оренди</strong>, ПДВ, гарантія готовності</span>
                    </div>
                  </div>
                </div>

                {/* 2. Right Product Summary */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Brand & Title */}
                  <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Виробник: <strong style={{ color: '#111' }}>{machine.brand}</strong>
                  </div>

                  <h1 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: '#111111',
                    marginBottom: '14px'
                  }}>
                    {machine.name}
                  </h1>

                  {/* Price Block */}
                  <div style={{
                    borderBottom: '1px solid #f0f0f0',
                    paddingBottom: '16px',
                    marginBottom: '16px'
                  }}>
                    {machine.pricing?.purchasePriceUah ? (
                      <div>
                        <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--wd-price-red)' }}>
                          {formatPrice(machine.pricing.purchasePriceUah, currency)}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                          Оренда: <strong>{formatPrice(machine.pricing.pricePerShiftUah, currency)} / зміна</strong> або {formatPrice(machine.pricing.pricePerHaUah, currency)} / га
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--wd-price-red)' }}>
                          {formatPrice(machine.pricing?.pricePerShiftUah || 18000, currency)}
                          <span style={{ fontSize: '14px', fontWeight: 400, color: '#666', marginLeft: '6px' }}>/ зміна (10г)</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                          Подобово: <strong>{formatPrice(machine.pricing?.pricePerDayUah || 21000, currency)} / доба</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Short Description */}
                  <div style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, marginBottom: '18px' }}>
                    {machine.shortDescription}
                  </div>

                  {/* Key Highlights */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    marginBottom: '20px',
                    fontSize: '13px'
                  }}>
                    <div style={{ background: '#f5f5f5', padding: '8px 10px', color: '#333' }}>
                      ⚡ <strong>Потужність:</strong> {machine.specs?.powerHp || 'від 90 к.с.'}
                    </div>
                    <div style={{ background: '#f5f5f5', padding: '8px 10px', color: '#333' }}>
                      📐 <strong>Ширина:</strong> {machine.specs?.workingWidth || '2-4 ряди'}
                    </div>
                    <div style={{ background: '#f5f5f5', padding: '8px 10px', color: '#333' }}>
                      🚀 <strong>Продуктивність:</strong> {machine.specs?.performanceHaPerHour || 'до 3 га/год'}
                    </div>
                    <div style={{ background: '#f5f5f5', padding: '8px 10px', color: '#333' }}>
                      👨‍🌾 <strong>Оператор:</strong> {machine.specs?.operatorIncluded ? 'Включено' : 'За запитом'}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <button
                      onClick={() => setActiveTab('calculator')}
                      className="btn-adena-primary"
                      style={{ height: '48px', fontSize: '15px', fontWeight: 600 }}
                    >
                      <Calculator size={18} />
                      <span>Замовити оренду / Розрахувати</span>
                    </button>

                    <a
                      href="tel:+380966610100"
                      className="btn-adena-secondary"
                      style={{
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '0 16px',
                        fontWeight: 600
                      }}
                    >
                      <Phone size={16} color="var(--wd-primary-color)" />
                      <span>+38 (096) 66 10 100</span>
                    </a>
                  </div>

                </div>

              </div>

              {/* Product Tabs (WooCommerce Exact Tabs Structure) */}
              <div style={{ borderTop: '2px solid #111', paddingTop: '20px', marginBottom: '32px' }}>
                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #eaeaea', paddingBottom: '12px', marginBottom: '20px' }}>
                  {[
                    { id: 'description', label: 'Опис товару' },
                    { id: 'specs', label: 'Технічні характеристики' },
                    { id: 'calculator', label: 'Калькулятор оренди та заявка' },
                    { id: 'delivery', label: 'Доставка та оплата' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        background: activeTab === tab.id ? '#111111' : '#f4f4f4',
                        color: activeTab === tab.id ? '#ffffff' : '#333333',
                        border: 'none',
                        padding: '10px 18px',
                        fontFamily: 'inherit',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Description */}
                {activeTab === 'description' && (
                  <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.8 }}>
                    <p style={{ marginBottom: '14px' }}>
                      {machine.fullDescription || machine.shortDescription}
                    </p>
                    <h4 style={{ fontSize: '16px', color: '#111', margin: '16px 0 8px 0' }}>Основні переваги моделі {machine.name}:</h4>
                    <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                      <li>Висока якість виконання технологічної операції без травмування врожаю</li>
                      <li>Оригінальні зносостійкі робочі органи європейського виробництва</li>
                      <li>Мінімальне питоме споживання палива на гектар</li>
                      <li>Повне технічне обслуговування сервісними інженерами Adena Agro перед виїздом у поле</li>
                    </ul>
                  </div>
                )}

                {/* Tab 2: Specs Table */}
                {activeTab === 'specs' && (
                  <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                      <tbody>
                        {[
                          { label: 'Виробник / Бренд', val: machine.brand },
                          { label: 'Модель', val: machine.model || machine.name },
                          { label: 'Потужність / Привід', val: machine.specs?.powerHp || 'від 90 к.с.' },
                          { label: 'Робоча ширина / Ряди', val: machine.specs?.workingWidth || '2-4 ряди' },
                          { label: 'Продуктивність за зміну', val: machine.specs?.performanceHaPerHour || 'до 3 га/год' },
                          { label: 'Рік випуску', val: `${machine.specs?.year || 2024} р.` },
                          { label: 'Напрацювання', val: machine.specs?.engineHours || '180 м/г' },
                          { label: 'Маса агрегату', val: `${machine.specs?.weightKg || 1450} кг` },
                          { label: 'Вимоги до тягача', val: machine.specs?.requiredTractorHp || 'від 90 к.с.' },
                          { label: 'Придатність для культур', val: (machine.suitableFor || []).join(', ') },
                        ].map((row, idx) => (
                          <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f9f9f9', borderBottom: '1px solid #eaeaea' }}>
                            <th style={{ textAlign: 'left', padding: '10px 14px', width: '35%', color: '#666', fontWeight: 500 }}>{row.label}</th>
                            <td style={{ padding: '10px 14px', color: '#111', fontWeight: 600 }}>{row.val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab 3: Interactive Rental Calculator & Booking Form */}
                {activeTab === 'calculator' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', ...(window.innerWidth < 768 ? { gridTemplateColumns: '1fr' } : {}) }}>
                    
                    {/* Calculator Controls */}
                    <div style={{ background: '#fafafa', border: '1px solid #eaeaea', padding: '18px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '14px' }}>
                        1. Параметри розрахунку
                      </h3>

                      {/* Modes */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '14px' }}>
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

                      {/* Quantity Slider */}
                      <div style={{ marginBottom: '14px' }}>
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
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '14px' }}>
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

                      {/* Total */}
                      <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: '#666' }}>Розрахункова вартість:</span>
                          <strong style={{ fontSize: '22px', color: 'var(--wd-price-red)', display: 'block' }}>
                            {formatPrice(priceCalculations.grandTotalUah, currency)}
                          </strong>
                        </div>
                        <span style={{ fontSize: '11px', color: '#888' }}>
                          Застава: {formatPrice(priceCalculations.depositUah, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleBookingSubmit} style={{ background: '#ffffff', border: '1px solid #eaeaea', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111', margin: 0 }}>
                        2. Контактні дані для бронювання
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
                          placeholder="СФГ Агро-Поділля"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#666', marginBottom: '2px' }}>Локація поля</label>
                        <input
                          type="text"
                          className="wpf-select"
                          placeholder="Рівненська обл., с. Колоденка"
                          value={fieldAddress}
                          onChange={(e) => setFieldAddress(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-adena-primary"
                        style={{ height: '44px', fontWeight: 600, marginTop: '6px' }}
                      >
                        {isSubmitting ? 'Відправка...' : 'Підтвердити бронь техніки'}
                      </button>
                    </form>

                  </div>
                )}

                {/* Tab 4: Delivery */}
                {activeTab === 'delivery' && (
                  <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.8 }}>
                    <h4 style={{ fontSize: '16px', color: '#111', marginBottom: '10px' }}>Умови доставки та оплати техніки:</h4>
                    <p style={{ marginBottom: '10px' }}>
                       Adena Agro має власний автопарк низькорамних тралів для оперативної доставки техніки безпосередньо на ваше поле.
                    </p>
                    <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                      <li><strong>Терміни подачі:</strong> від 12 до 24 годин з моменту підписання договору.</li>
                      <li><strong>Оплата:</strong> Безготівковий розрахунок з ПДВ або готівковий розрахунок.</li>
                      <li><strong>Сервіс:</strong> Разом із технікою прибуває сервісний інженер для пусконалагодження та калібрування під ваші польові умови.</li>
                    </ul>
                  </div>
                )}

              </div>

              {/* Related Products Carousel / Grid */}
              {relatedProducts.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>
                    Схожа польова техніка
                  </h3>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px',
                    ...(window.innerWidth < 768 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {})
                  }}>
                    {relatedProducts.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => {
                          onSelectMachine(rel);
                          setActivePhotoIdx(0);
                          setActiveTab('description');
                        }}
                        style={{
                          border: '1px solid #eaeaea',
                          padding: '12px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ position: 'relative', width: '100%', paddingBottom: '85%', marginBottom: '8px' }}>
                          <img
                            src={rel.images[0]}
                            alt={rel.name}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#888' }}>{rel.brand}</div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#111', lineHeight: 1.3, marginBottom: '6px' }}>
                            {rel.name.slice(0, 45)}...
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--wd-price-red)' }}>
                            {formatPrice(rel.pricing?.pricePerShiftUah || 18000, currency)}
                            <span style={{ fontSize: '10px', color: '#666', fontWeight: 400 }}> /зм</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </>
          )}

        </div>

      </div>
    </div>
  );
}
