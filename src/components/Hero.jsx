import React from 'react';
import { 
  CheckCircle2, 
  Truck, 
  Users, 
  Fuel, 
  Search, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { MACHINERY_CATEGORIES } from '../data/machineryData';
import { AGRO_HUBS } from '../data/hubsData';

export default function Hero({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedHub, 
  setSelectedHub,
  onOpenQuickLead,
  totalAvailableUnits 
}) {
  const handleHeroSearch = (e) => {
    e.preventDefault();
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      position: 'relative',
      padding: '48px 0 64px 0',
      background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16, 185, 129, 0.18), transparent), linear-gradient(180deg, #080d0b 0%, #0c1612 100%)',
      borderBottom: '1px solid var(--border-light)',
      overflow: 'hidden'
    }}>
      {/* Decorative Grid Lines Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Top Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '0px',
            padding: '6px 16px',
            marginBottom: '20px',
            color: '#34d399',
            fontSize: '13px',
            fontWeight: 700
          }}>
            <Sparkles size={16} />
            <span>ПАРК СУЧАСНОЇ ЄВРОПЕЙСЬКОЇ ТА АМЕРИКАНСЬКОЇ ТЕХНІКИ 2023-2024</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: '#ffffff'
          }}>
            Оренда Важкої Аграрної Техніки
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #10b981 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Для Посівної, Овочівництва та Жнив
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '36px',
            maxWidth: '780px',
            margin: '0 auto 36px auto'
          }}>
            Спеціалізовані картопляні та овочеві агрегати <strong>Grimme, Struik, Baselier, Dewulf</strong>, 
            надпотужні трактори <strong>John Deere, Fendt, Claas</strong> (до 650 к.с.), самохідні обприскувачі та сівалки. 
            Подача власним тралом по всій Україні за 24 години.
          </p>

          {/* Embedded Quick Selector / Filter Widget */}
          <form 
            onSubmit={handleHeroSearch}
            className="glass-panel"
            style={{
              padding: '20px',
              borderRadius: '0px',
              boxShadow: 'var(--shadow-lg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
              gap: '14px',
              alignItems: 'end',
              textAlign: 'left',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              marginBottom: '36px'
            }}
          >
            {/* Category Select */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                Категорія машин
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select-field"
                style={{ height: '46px', fontWeight: 600 }}
              >
                {MACHINERY_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Hub / Region Select */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                База дислокації / Регіон
              </label>
              <select
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
                className="select-field"
                style={{ height: '46px', fontWeight: 600 }}
              >
                <option value="all">Усі агро-хаби (Вся Україна)</option>
                {AGRO_HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.city} ({hub.availableUnits} од.)
                  </option>
                ))}
              </select>
            </div>

            {/* Operator Preference */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                Формат оренди
              </label>
              <select
                className="select-field"
                style={{ height: '46px', fontWeight: 600 }}
                defaultValue="with_operator"
              >
                <option value="with_operator">З професійним екіпажем (рекомендовано)</option>
                <option value="cold_rent">Холодна оренда (без оператора)</option>
                <option value="turnkey">Комплексний підряд «під ключ»</option>
              </select>
            </div>

            {/* Search CTA */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                height: '46px',
                padding: '0 28px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Search size={18} />
              <span>Знайти техніку</span>
            </button>
          </form>

          {/* 4 Value Pillars */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            textAlign: 'left'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-light)',
              borderRadius: '0px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ color: '#10b981' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>100% Готовність</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Пройдено повне ТО та калібрування</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-light)',
              borderRadius: '0px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ color: '#f59e0b' }}>
                <Truck size={24} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Доставка тралом</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Власний автопарк низькорамників 24г</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-light)',
              borderRadius: '0px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ color: '#34d399' }}>
                <Users size={24} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Екіпажі механізаторів</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Сертифіковані оператори 24/7</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-light)',
              borderRadius: '0px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ color: '#60a5fa' }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Оплата з ПДВ</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Офіційний договір та акти робіт</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
