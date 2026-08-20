import React, { useState } from 'react';
import { 
  Tractor, 
  MapPin, 
  Gauge, 
  Layers, 
  Users, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { AGRO_HUBS } from '../data/hubsData';

export default function MachineryCard({ 
  machine, 
  currency, 
  onSelectMachine,
  onQuickBook,
  onLocateOnMap
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const hub = AGRO_HUBS.find((h) => h.id === machine.hubId) || {
    city: 'Київ',
    region: 'Центральний хаб'
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % machine.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + machine.images.length) % machine.images.length);
  };

  return (
    <div 
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        border: '1px solid var(--border-light)',
        cursor: 'pointer',
        height: '100%'
      }}
      onClick={() => onSelectMachine(machine)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-light)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Blueprint Requirement Г: Status System Overlay for Rented Units */}
      {machine.isRented && (
        <div className="card-rented-overlay">
          <div className="badge-rented-diagonal">
            В ОРЕНДІ
          </div>
          {machine.rentedUntil && (
            <div className="rented-release-date">
              Звільнення: {new Date(machine.rentedUntil).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })}
            </div>
          )}
          <div style={{ marginTop: '6px', fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>
            Можливе попереднє бронювання
          </div>
        </div>
      )}

      {/* Image Preview & Gallery Slider */}
      <div style={{
        position: 'relative',
        height: '240px',
        backgroundColor: '#0a100d',
        overflow: 'hidden'
      }}>
        <img
          src={machine.images[activeImageIndex] || machine.images[0]}
          alt={machine.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Brand & Badge Overlays */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(8, 13, 11, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 800,
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            {machine.brand}
          </div>

          {machine.badge && (
            <div className="badge badge-gold" style={{ fontSize: '11px', fontWeight: 700 }}>
              <Sparkles size={11} />
              {machine.badge}
            </div>
          )}
        </div>

        {/* Gallery Slider Controls (if multiple images) */}
        {machine.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                opacity: 0.8
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                opacity: 0.8
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Dots */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              zIndex: 2
            }}>
              {machine.images.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: activeImageIndex === idx ? '16px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: activeImageIndex === idx ? '#10b981' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content Area */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Category & Rating */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <span style={{
              fontSize: '12px',
              color: 'var(--color-accent-primary)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              {machine.categoryName}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>
              <Star size={13} fill="#fbbf24" color="#fbbf24" />
              <span>{machine.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({machine.reviewsCount})</span>
            </div>
          </div>

          {/* Machine Name */}
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: '10px',
            color: '#ffffff'
          }}>
            {machine.name}
          </h3>

          {/* Short description */}
          <p style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            lineHeight: 1.45,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {machine.shortDescription}
          </p>

          {/* Specifications Chips Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '18px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '12px'
            }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px' }}>Потужність</span>
              <strong style={{ color: '#f3f4f6' }}>{machine.specs.powerHp}</strong>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '12px'
            }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px' }}>Ширина / Ряди</span>
              <strong style={{ color: '#f3f4f6' }}>{machine.specs.workingWidth}</strong>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '12px'
            }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px' }}>Продуктивність</span>
              <strong style={{ color: '#f3f4f6' }}>{machine.specs.performanceHaPerHour}</strong>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '12px'
            }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px' }}>Екіпаж</span>
              <strong style={{ color: machine.specs.operatorIncluded ? '#34d399' : '#f59e0b' }}>
                {machine.specs.operatorIncluded ? 'З оператором' : 'Без оператора'}
              </strong>
            </div>
          </div>

          {/* Location Hub */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-muted)',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#10b981" />
              <span>База: <strong>{hub.city}</strong></span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onLocateOnMap(hub.id);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-accent-primary)',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              На карті
            </button>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Вартість оренди:</span>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                {formatPrice(machine.pricing.pricePerShiftUah, currency)}
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '4px' }}>
                  / зміна (10 год)
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>або за гектар:</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#fbbf24' }}>
                {formatPrice(machine.pricing.pricePerHaUah, currency)} / га
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectMachine(machine);
              }}
              className="btn btn-primary"
              style={{ padding: '10px 16px', fontSize: '13px', fontWeight: 700 }}
            >
              <span>Деталі & Калькулятор</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickBook(machine);
              }}
              className="btn btn-gold"
              style={{ padding: '10px 14px', fontSize: '13px', fontWeight: 700 }}
              title="Швидка бронь"
            >
              Замовити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
