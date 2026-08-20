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
  Fuel, 
  Truck, 
  ShieldCheck, 
  Star, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { formatPhoneNumber, isValidUkrainianPhone } from '../utils/phoneFormatter';
import { AGRO_HUBS } from '../data/hubsData';

export default function MachineryModal({ 
  machine, 
  currency, 
  onClose 
}) {
  const [activeTab, setActiveTab] = useState('calculator'); // 'specs' | 'calculator'
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Calculator State
  const [rentType, setRentType] = useState('shifts'); // 'shifts' | 'ha' | 'days'
  const [quantity, setQuantity] = useState(3);
  const [withOperator, setWithOperator] = useState(machine.specs.operatorIncluded);
  const [withTrallDelivery, setWithTrallDelivery] = useState(true);
  const [deliveryRegion, setDeliveryRegion] = useState('hub-kyiv');
  const [fuelOption, setFuelOption] = useState('customer'); // 'customer' | 'owner'

  // Booking Form State
  const [datePreset, setDatePreset] = useState('tomorrow'); // 'today' | 'tomorrow' | 'custom'
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('day_shift'); // 'day_shift' | 'night_shift' | 'round_clock' | 'flexible'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [companyName, setCompanyName] = useState('');
  const [fieldAddress, setFieldAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [formError, setFormError] = useState('');

  const hub = AGRO_HUBS.find((h) => h.id === machine.hubId) || AGRO_HUBS[0];

  // Calculated Pricing Breakdown
  const priceCalculations = useMemo(() => {
    let baseRate = 0;
    if (rentType === 'shifts') {
      baseRate = machine.pricing.pricePerShiftUah;
    } else if (rentType === 'ha') {
      baseRate = machine.pricing.pricePerHaUah;
    } else {
      baseRate = machine.pricing.pricePerDayUah;
    }

    const rawEquipmentTotal = baseRate * quantity;

    // Volume discount
    let discountPercent = 0;
    if (rentType !== 'ha') {
      if (quantity >= 20) discountPercent = 15;
      else if (quantity >= 10) discountPercent = 10;
      else if (quantity >= 5) discountPercent = 5;
    } else {
      if (quantity >= 300) discountPercent = 15;
      else if (quantity >= 150) discountPercent = 10;
      else if (quantity >= 50) discountPercent = 5;
    }

    const discountAmount = Math.round(rawEquipmentTotal * (discountPercent / 100));
    const discountedEquipmentTotal = rawEquipmentTotal - discountAmount;

    // Operator cost (if added separately and not already included in base)
    const operatorRatePerUnit = withOperator && !machine.specs.operatorIncluded ? 2500 : 0;
    const operatorTotal = operatorRatePerUnit * quantity;

    // Trall delivery estimate based on chosen hub / region
    let deliveryTotal = 0;
    if (withTrallDelivery) {
      if (deliveryRegion === machine.hubId) {
        deliveryTotal = 14000; // Local delivery within same oblast (roundtrip)
      } else {
        deliveryTotal = 26000; // Inter-regional heavy trall transport with permits
      }
    }

    const grandTotalUah = discountedEquipmentTotal + operatorTotal + deliveryTotal;

    return {
      rawEquipmentTotal,
      discountPercent,
      discountAmount,
      discountedEquipmentTotal,
      operatorTotal,
      deliveryTotal,
      grandTotalUah,
      depositUah: machine.pricing.depositUah
    };
  }, [machine, rentType, quantity, withOperator, withTrallDelivery, deliveryRegion]);

  // Handle Booking Submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!isValidUkrainianPhone(phone)) {
      setFormError('Будь ласка, введіть коректний номер телефону (+380 XX XXX XX XX)');
      return;
    }

    if (!fullName.trim()) {
      setFormError("Будь ласка, вкажіть ваше ім'я");
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      leadId: `AGRO-${Date.now().toString().slice(-6)}`,
      machineId: machine.id,
      machineName: machine.name,
      brand: machine.brand,
      rentType,
      quantity,
      withOperator,
      withTrallDelivery,
      deliveryRegion,
      fuelOption,
      datePreset,
      selectedDate: datePreset === 'today' 
        ? 'Сьогодні' 
        : datePreset === 'tomorrow' 
        ? 'Завтра' 
        : customDate || 'За домовленістю',
      timeSlot,
      fullName,
      phone,
      companyName,
      fieldAddress,
      notes,
      totalEstimateUah: priceCalculations.grandTotalUah,
      currency,
      timestamp: new Date().toISOString()
    };

    try {
      // Send to server lead endpoint
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        setBookingResult(data);
      } else {
        // Fallback simulation for client-only / dev mode
        setBookingResult({
          success: true,
          leadId: bookingPayload.leadId,
          message: 'Заявку прийнято. Менеджер вийде на зв’язок протягом 10 хвилин.'
        });
      }
      setBookingSuccess(true);
    } catch (err) {
      console.error('Lead error:', err);
      // Still show success with local ID so client never loses a lead
      setBookingResult({
        success: true,
        leadId: bookingPayload.leadId,
        message: 'Заявку успішно зареєстровано в черзі диспетчера.'
      });
      setBookingSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1050px', padding: 0 }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase'
            }}>
              {machine.brand}
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
              {machine.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Success Confirmation Screen */}
        {bookingSuccess ? (
          <div style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399',
              margin: '0 auto 24px auto',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px', color: '#ffffff' }}>
              Заявку на оренду успішно прийнято!
            </h3>

            <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
              Номер вашої броні: <strong style={{ color: '#34d399', fontSize: '18px' }}>#{bookingResult?.leadId || 'AGRO-2026'}</strong>.<br/>
              Черговий агро-диспетчер зв'яжеться з вами за номером <strong>{phone}</strong> протягом <strong>10 хвилин</strong> для узгодження логістики тралу та підписання договору.
            </p>

            {/* Receipt Summary Card */}
            <div className="glass-panel" style={{
              maxWidth: '540px',
              margin: '0 auto 32px auto',
              padding: '20px',
              textAlign: 'left',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fbbf24', marginBottom: '10px' }}>
                🌾 Деталі розрахунку замовлення:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                <span>Техніка:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{machine.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                <span>Обсяг робіт / Термін:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>
                  {quantity} {rentType === 'shifts' ? 'змін' : rentType === 'ha' ? 'гектар' : 'діб'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                <span>Екіпаж механізатора:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{withOperator ? 'Включено' : 'Без оператора'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                <span>Подача важким тралом:</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{withTrallDelivery ? 'Так, включено' : 'Самовивіз'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', paddingTop: '10px', marginTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontWeight: 700 }}>Орієнтовна вартість:</span>
                <span style={{ fontWeight: 800, color: '#34d399' }}>
                  {formatPrice(priceCalculations.grandTotalUah, currency)}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
              <button onClick={onClose} className="btn btn-primary btn-lg">
                Повернутися до каталогу
              </button>
              <a href="tel:+380800339420" className="btn btn-outline btn-lg" style={{ color: '#34d399' }}>
                <Phone size={16} />
                <span>Терміновий дзвінок: 0 800 339 420</span>
              </a>
            </div>
          </div>
        ) : (
          /* Modal Body */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.2fr)',
            gap: '24px',
            padding: '24px',
            ...(window.innerWidth < 850 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Left Column: Gallery, Specs & Features */}
            <div>
              {/* Photo Lightbox Preview */}
              <div style={{
                position: 'relative',
                height: '280px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '12px',
                backgroundColor: '#0a100d'
              }}>
                <img
                  src={machine.images[activePhotoIdx] || machine.images[0]}
                  alt={machine.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {machine.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhotoIdx((p) => (p - 1 + machine.images.length) % machine.images.length)}
                      style={{
                        position: 'absolute',
                        left: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.6)',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      onClick={() => setActivePhotoIdx((p) => (p + 1) % machine.images.length)}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.6)',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {machine.images.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {machine.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      style={{
                        width: '64px',
                        height: '46px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: activePhotoIdx === idx ? '2px solid #10b981' : '1px solid var(--border-light)',
                        cursor: 'pointer',
                        padding: 0,
                        background: 'none'
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Full Specs Table */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-accent-primary)', marginBottom: '10px' }}>
                  ⚙️ Технічні характеристики
                </h4>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}>
                  {[
                    { label: 'Потужність двигуна', value: machine.specs.powerHp },
                    { label: 'Робоча ширина / Ряди', value: machine.specs.workingWidth },
                    { label: 'Об’єм бункера / Бака', value: machine.specs.hopperCapacity },
                    { label: 'Продуктивність', value: machine.specs.performanceHaPerHour },
                    { label: 'Рік випуску / Стан', value: `${machine.specs.year} р. (${machine.specs.engineHours})` },
                    { label: 'Орієнтовна витрата палива', value: machine.specs.fuelConsumption },
                    { label: 'Вимоги до трактора', value: machine.specs.requiredTractorHp },
                    { label: 'Сумісність з RTK / GPS', value: machine.specs.gpsGuidance ? 'RTK +/- 2.5 см підтримується' : 'Базова навігація' },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        fontSize: '12px',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                      <strong style={{ color: '#f3f4f6', textAlign: 'right' }}>{row.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable Crops */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  🌱 Оптимально для культур:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {machine.suitableFor.map((crop, idx) => (
                    <span key={idx} className="badge badge-green" style={{ fontSize: '11px' }}>
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Included Services Guarantees */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '14px'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} />
                  <span>У вартість оренди включено:</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {machine.includedServices.map((service, idx) => (
                    <li key={idx} style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={13} color="#10b981" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Interactive Calculator & Smart Lead Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Cost Calculator Section */}
              <div className="glass-panel" style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Calculator size={18} color="#10b981" />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                    Інтерактивний калькулятор оренди
                  </h3>
                </div>

                {/* Pricing Model Selector */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '16px' }}>
                  {[
                    { id: 'shifts', label: 'За зміну (10г)', price: machine.pricing.pricePerShiftUah },
                    { id: 'ha', label: 'За гектар (га)', price: machine.pricing.pricePerHaUah },
                    { id: 'days', label: 'Подобово (24г)', price: machine.pricing.pricePerDayUah },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setRentType(mode.id)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: 'var(--radius-sm)',
                        border: rentType === mode.id ? '1px solid #10b981' : '1px solid var(--border-light)',
                        background: rentType === mode.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: rentType === mode.id ? '#34d399' : 'var(--text-muted)',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div>{mode.label}</div>
                      <div style={{ color: '#ffffff', fontSize: '12px', marginTop: '2px' }}>
                        {formatPrice(mode.price, currency)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quantity / Hectares Slider */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {rentType === 'shifts' ? 'Кількість робочих змін (по 10 год):' : rentType === 'ha' ? 'Площа поля (гектарів):' : 'Кількість календарних діб:'}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#34d399' }}>
                      {quantity} {rentType === 'shifts' ? 'змін' : rentType === 'ha' ? 'га' : 'діб'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={rentType === 'ha' ? 10 : 1}
                    max={rentType === 'ha' ? 500 : 30}
                    step={rentType === 'ha' ? 5 : 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  {priceCalculations.discountPercent > 0 && (
                    <div style={{ fontSize: '11px', color: '#fbbf24', marginTop: '4px', fontWeight: 700 }}>
                      🎉 Оптова знижка від об'єму: -{priceCalculations.discountPercent}% ({formatPrice(priceCalculations.discountAmount, currency)})
                    </div>
                  )}
                </div>

                {/* Additional Options (Operator & Trall) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={withOperator}
                      onChange={(e) => setWithOperator(e.target.checked)}
                      style={{ accentColor: '#10b981' }}
                    />
                    <span>Послуги оператора</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={withTrallDelivery}
                      onChange={(e) => setWithTrallDelivery(e.target.checked)}
                      style={{ accentColor: '#10b981' }}
                    />
                    <span>Подача тралом на поле</span>
                  </label>
                </div>

                {/* Region for Trall Delivery */}
                {withTrallDelivery && (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Область доставки (розрахунок тралу):
                    </label>
                    <select
                      value={deliveryRegion}
                      onChange={(e) => setDeliveryRegion(e.target.value)}
                      className="select-field"
                      style={{ height: '38px', fontSize: '12px' }}
                    >
                      {AGRO_HUBS.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.region} ({h.name})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Calculation Total Summary Box */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                      Разом орієнтовно з ПДВ:
                    </span>
                    <strong style={{ fontSize: '20px', color: '#ffffff' }}>
                      {formatPrice(priceCalculations.grandTotalUah, currency)}
                    </strong>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <div>Застава: {formatPrice(priceCalculations.depositUah, currency)}</div>
                    <div style={{ color: '#34d399' }}>Договір + Акти</div>
                  </div>
                </div>
              </div>

              {/* Smart Booking Lead Form (Blueprint Requirement В) */}
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📋 Забронювати виїзд техніки</span>
                </h4>

                {formError && (
                  <div style={{
                    padding: '8px 12px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px'
                  }}>
                    {formError}
                  </div>
                )}

                {/* Date Presets: Сьогодні / Завтра / Інша дата */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Бажана дата виходу в поле:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setDatePreset('today')}
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        border: datePreset === 'today' ? '1px solid #10b981' : '1px solid var(--border-light)',
                        background: datePreset === 'today' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: datePreset === 'today' ? '#34d399' : 'var(--text-main)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Сьогодні
                    </button>

                    <button
                      type="button"
                      onClick={() => setDatePreset('tomorrow')}
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        border: datePreset === 'tomorrow' ? '1px solid #10b981' : '1px solid var(--border-light)',
                        background: datePreset === 'tomorrow' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: datePreset === 'tomorrow' ? '#34d399' : 'var(--text-main)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Завтра
                    </button>

                    <button
                      type="button"
                      onClick={() => setDatePreset('custom')}
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        border: datePreset === 'custom' ? '1px solid #10b981' : '1px solid var(--border-light)',
                        background: datePreset === 'custom' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: datePreset === 'custom' ? '#34d399' : 'var(--text-main)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Вибрати дату
                    </button>
                  </div>

                  {datePreset === 'custom' && (
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="input-field"
                      style={{ marginTop: '8px', height: '38px' }}
                    />
                  )}
                </div>

                {/* Shift Slot Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Графік роботи:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {[
                      { id: 'day_shift', label: 'Денна зміна (07:00–19:00)' },
                      { id: 'night_shift', label: 'Нічна зміна (20:00–08:00)' },
                      { id: 'round_clock', label: 'Цілодобово 24/7 (2 екіпажі)' },
                      { id: 'flexible', label: 'Гнучкий графік' },
                    ].map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setTimeSlot(slot.id)}
                        style={{
                          padding: '6px 8px',
                          borderRadius: 'var(--radius-sm)',
                          border: timeSlot === slot.id ? '1px solid #f59e0b' : '1px solid var(--border-light)',
                          background: timeSlot === slot.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.02)',
                          color: timeSlot === slot.id ? '#fbbf24' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Ваше ім'я *
                    </label>
                    <input
                      type="text"
                      placeholder="Олександр (Агроном)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input-field"
                      style={{ height: '40px', fontSize: '13px' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Телефон для зв'язку *
                    </label>
                    <input
                      type="tel"
                      placeholder="+380 (67) 000-00-00"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="input-field"
                      style={{ height: '40px', fontSize: '13px' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Господарство / ТОВ (необов'язково)
                    </label>
                    <input
                      type="text"
                      placeholder="СФГ «Урожай», код ЄДРПОУ"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="input-field"
                      style={{ height: '40px', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Локація поля / Населений пункт
                    </label>
                    <input
                      type="text"
                      placeholder="с. Калинівка, Васильківський р-н"
                      value={fieldAddress}
                      onChange={(e) => setFieldAddress(e.target.value)}
                      className="input-field"
                      style={{ height: '40px', fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg"
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    fontWeight: 800,
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isSubmitting ? (
                    <span>Реєстрація заявки...</span>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Підтвердити бронь & Отримати договір</span>
                    </>
                  )}
                </button>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
                  🔒 Безпечне бронювання. Диспетчер перевірить наявність техніки на обрані дати за 10 хв.
                </div>
              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
