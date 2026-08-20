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
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Calculator State
  const [rentType, setRentType] = useState('shifts'); // 'shifts' | 'ha' | 'days'
  const [quantity, setQuantity] = useState(3);
  const [withOperator, setWithOperator] = useState(machine.specs.operatorIncluded);
  const [withTrallDelivery, setWithTrallDelivery] = useState(true);
  const [deliveryRegion, setDeliveryRegion] = useState('hub-kyiv');

  // Booking Form State
  const [datePreset, setDatePreset] = useState('tomorrow');
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('day_shift');
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
      ? machine.pricing.pricePerShiftUah 
      : rentType === 'ha' 
      ? machine.pricing.pricePerHaUah 
      : machine.pricing.pricePerDayUah;

    const rawTotal = baseRate * quantity;

    let discountPercent = 0;
    if (quantity >= 20) discountPercent = 15;
    else if (quantity >= 10) discountPercent = 10;
    else if (quantity >= 5) discountPercent = 5;

    const discountAmount = Math.round(rawTotal * (discountPercent / 100));
    const discountedTotal = rawTotal - discountAmount;
    const operatorTotal = withOperator && !machine.specs.operatorIncluded ? 2500 * quantity : 0;
    const deliveryTotal = withTrallDelivery ? (deliveryRegion === machine.hubId ? 12000 : 22000) : 0;
    const grandTotalUah = discountedTotal + operatorTotal + deliveryTotal;

    return {
      rawTotal,
      discountPercent,
      discountAmount,
      operatorTotal,
      deliveryTotal,
      grandTotalUah,
      depositUah: machine.pricing.depositUah
    };
  }, [machine, rentType, quantity, withOperator, withTrallDelivery, deliveryRegion]);

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
      leadId: `ADENA-${Date.now().toString().slice(-6)}`,
      machineId: machine.id,
      machineName: machine.name,
      brand: machine.brand,
      rentType,
      quantity,
      withOperator,
      withTrallDelivery,
      selectedDate: datePreset === 'today' ? 'Сьогодні' : datePreset === 'tomorrow' ? 'Завтра' : customDate || 'За домовленістю',
      timeSlot,
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
        style={{ maxWidth: '980px', padding: 0 }}
      >
        {/* Modal Top Bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #eaeaea',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fafafa'
        }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase' }}>
              {machine.brand}
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111111', margin: 0 }}>
              {machine.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#ffffff',
              border: '1px solid #ddd',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#333'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
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
              Заявку успішно зареєстровано!
            </h3>

            <p style={{ fontSize: '15px', color: '#666', maxWidth: '560px', margin: '0 auto 24px auto' }}>
              Номер броні: <strong style={{ color: 'var(--wd-primary-color)' }}>#{bookingResult?.leadId || 'ADENA-2026'}</strong>.<br/>
              Менеджер зателефонує вам за номером <strong>{phone}</strong> протягом 10 хвилин.
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '28px',
            padding: '24px',
            ...(window.innerWidth < 800 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Left Column: Image & Specs */}
            <div>
              <div style={{
                position: 'relative',
                height: '280px',
                border: '1px solid #eaeaea',
                backgroundColor: '#ffffff',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src={machine.images[activePhotoIdx] || machine.images[0]}
                  alt={machine.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Specs Table */}
              <div style={{ border: '1px solid #eaeaea', marginBottom: '16px' }}>
                <div style={{ background: '#f5f5f5', padding: '8px 12px', fontWeight: 600, fontSize: '13px', color: '#111' }}>
                  Технічні характеристики
                </div>
                {[
                  { label: 'Потужність / Привід', value: machine.specs.powerHp },
                  { label: 'Робоча ширина / Ряди', value: machine.specs.workingWidth },
                  { label: 'Продуктивність', value: machine.specs.performanceHaPerHour },
                  { label: 'Рік випуску', value: `${machine.specs.year} р.` },
                  { label: 'Напрацювання', value: machine.specs.engineHours },
                  { label: 'Вимоги до тягача', value: machine.specs.requiredTractorHp },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      fontSize: '13px',
                      background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                      borderTop: '1px solid #f0f0f0'
                    }}
                  >
                    <span style={{ color: '#666' }}>{row.label}</span>
                    <strong style={{ color: '#111' }}>{row.value}</strong>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>
                {machine.fullDescription || machine.shortDescription}
              </div>
            </div>

            {/* Right Column: Calculator & Booking */}
            <div>
              {/* Pricing Calculator */}
              <div style={{ background: '#fafafa', border: '1px solid #eaeaea', padding: '18px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Calculator size={18} color="var(--wd-primary-color)" />
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111', margin: 0 }}>
                    Калькулятор вартості оренди
                  </h3>
                </div>

                {/* Rent Type Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '14px' }}>
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
                        border: rentType === mode.id ? '2px solid var(--wd-primary-color)' : '1px solid #d2d2d2',
                        background: rentType === mode.id ? '#fff6f0' : '#ffffff',
                        color: rentType === mode.id ? 'var(--wd-primary-color)' : '#333',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div>{mode.label}</div>
                      <div style={{ color: 'var(--wd-price-red)', fontWeight: 700, marginTop: '2px' }}>
                        {formatPrice(mode.price, currency)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quantity */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600 }}>Кількість {rentType === 'shifts' ? 'змін' : rentType === 'ha' ? 'гектарів' : 'діб'}:</span>
                    <strong style={{ color: 'var(--wd-primary-color)' }}>{quantity}</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={rentType === 'ha' ? 300 : 30}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--wd-primary-color)' }}
                  />
                </div>

                {/* Options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px', fontSize: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={withOperator}
                      onChange={(e) => setWithOperator(e.target.checked)}
                      style={{ accentColor: 'var(--wd-primary-color)' }}
                    />
                    <span>Послуги оператора</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={withTrallDelivery}
                      onChange={(e) => setWithTrallDelivery(e.target.checked)}
                      style={{ accentColor: 'var(--wd-primary-color)' }}
                    />
                    <span>Доставка тралом</span>
                  </label>
                </div>

                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eaeaea', paddingTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Орієнтовна сума:</span>
                    <strong style={{ fontSize: '22px', color: 'var(--wd-price-red)' }}>
                      {formatPrice(priceCalculations.grandTotalUah, currency)}
                    </strong>
                  </div>
                  <div style={{ fontSize: '12px', color: '#888' }}>
                    Застава: {formatPrice(priceCalculations.depositUah, currency)}
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#111', margin: 0 }}>
                  Замовити оренду техніки
                </h4>

                {formError && (
                  <div style={{ padding: '8px 12px', background: '#ffebee', color: '#c62828', fontSize: '12px' }}>
                    {formError}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#666', marginBottom: '2px' }}>Господарство</label>
                    <input
                      type="text"
                      className="wpf-select"
                      placeholder="СФГ / ТОВ"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#666', marginBottom: '2px' }}>Локація поля</label>
                    <input
                      type="text"
                      className="wpf-select"
                      placeholder="Область / район"
                      value={fieldAddress}
                      onChange={(e) => setFieldAddress(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-adena-primary"
                  style={{ height: '46px', fontSize: '14px', fontWeight: 600, marginTop: '8px' }}
                >
                  {isSubmitting ? 'Оформлення...' : 'Оформити заявку на оренду'}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
