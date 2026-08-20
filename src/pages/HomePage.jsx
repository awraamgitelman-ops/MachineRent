import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Tractor, 
  Warehouse, 
  Wrench, 
  Layers, 
  CheckCircle2, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  TrendingUp,
  Award,
  Users,
  Search,
  Truck
} from 'lucide-react';
import FilterBar from '../components/FilterBar';
import MachineryCard from '../components/MachineryCard';
import { MACHINERY_DATA } from '../data/machineryData';

export default function HomePage({ 
  currency, 
  searchTerm, 
  setSearchTerm,
  onOpenCalculator,
  onOpenQuickLead
}) {
  const navigate = useNavigate();

  // Filters State for the Catalog Section on Homepage
  const [activityType, setActivityType] = useState('all');
  const [machineryType, setMachineryType] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedServiceType, setSelectedServiceType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Featured Season Hits (First 8 top machinery)
  const featuredHits = useMemo(() => {
    return MACHINERY_DATA.slice(0, 8);
  }, []);

  // Filtering Logic
  const filteredMachinery = useMemo(() => {
    return MACHINERY_DATA.filter((machine) => {
      // Activity Filter
      if (activityType !== 'all' && machine.activityType !== activityType) {
        return false;
      }

      // Machinery Type Filter
      if (machineryType !== 'all' && machine.machineryType !== machineryType) {
        return false;
      }

      // Brand Filter
      if (selectedBrand !== 'all' && machine.brand !== selectedBrand) {
        return false;
      }

      // Model Filter
      if (selectedModel !== 'all' && machine.model !== selectedModel) {
        return false;
      }

      // Service Type Filter
      if (selectedServiceType === 'operator' && !machine.specs?.operatorIncluded) {
        return false;
      }

      // Search Query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = machine.name.toLowerCase().includes(q);
        const matchBrand = machine.brand.toLowerCase().includes(q);
        const matchModel = (machine.model || '').toLowerCase().includes(q);
        const matchDesc = (machine.shortDescription || '').toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchModel && !matchDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        const priceA = a.pricing?.purchasePriceUah || a.pricing?.pricePerShiftUah || 0;
        const priceB = b.pricing?.purchasePriceUah || b.pricing?.pricePerShiftUah || 0;
        return priceA - priceB;
      }
      if (sortBy === 'price_desc') {
        const priceA = a.pricing?.purchasePriceUah || a.pricing?.pricePerShiftUah || 0;
        const priceB = b.pricing?.purchasePriceUah || b.pricing?.pricePerShiftUah || 0;
        return priceB - priceA;
      }
      if (sortBy === 'power') {
        const powerA = parseInt((a.specs?.powerHp || '').replace(/\D/g, '')) || 0;
        const powerB = parseInt((b.specs?.powerHp || '').replace(/\D/g, '')) || 0;
        return powerB - powerA;
      }
      return 0;
    });
  }, [activityType, machineryType, selectedBrand, selectedModel, selectedServiceType, searchTerm, sortBy]);

  const handleResetFilters = () => {
    setActivityType('all');
    setMachineryType('all');
    setSelectedBrand('all');
    setSelectedModel('all');
    setSelectedServiceType('all');
    setSearchTerm('');
    setSortBy('popular');
  };

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      
      {/* 1. HERO BANNER (Adena Agro Exact Styling) */}
      <section style={{
        position: 'relative',
        backgroundColor: '#161616',
        color: '#ffffff',
        padding: '72px 0 80px 0',
        backgroundImage: 'linear-gradient(rgba(18, 18, 18, 0.82), rgba(18, 18, 18, 0.88)), url(https://adenaagro.com/wp-content/uploads/2022/12/traktor-768x432.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '4px solid var(--wd-primary-color)'
      }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(247, 206, 52, 0.15)',
            border: '1px solid var(--wd-accent-yellow)',
            color: 'var(--wd-accent-yellow)',
            padding: '6px 16px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            <Sparkles size={16} />
            <span>Оренда та продаж техніки для овочівництва</span>
          </div>

          <h1 style={{
            fontSize: '38px',
            fontWeight: 700,
            lineHeight: 1.25,
            color: '#ffffff',
            marginBottom: '20px',
            textTransform: 'uppercase'
          }}>
            Adena Agro – Ваш надійний партнер для успішного врожаю!
          </h1>

          <p style={{
            fontSize: '17px',
            lineHeight: 1.6,
            color: '#e0e0e0',
            maxWidth: '820px',
            margin: '0 auto 36px auto'
          }}>
            Обробка ґрунту, посадка, збирання, транспортування, зберігання та підготовка врожаю перед реалізацією – ми пропонуємо комплексні рішення для досягнення найвищих результатів.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="#main-catalog"
              className="btn-adena-primary"
              style={{
                height: '52px',
                padding: '0 32px',
                fontSize: '15px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
              onClick={(e) => {
                const el = document.getElementById('main-catalog');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Переглянути каталог техніки
            </a>

            <button
              onClick={onOpenCalculator}
              className="btn-adena-secondary"
              style={{
                height: '52px',
                padding: '0 26px',
                fontSize: '15px',
                fontWeight: 600,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              Калькулятор вартості
            </button>

            <button
              onClick={() => onOpenQuickLead('Підбір техніки')}
              className="btn-adena-secondary"
              style={{
                height: '52px',
                padding: '0 26px',
                fontSize: '15px',
                fontWeight: 600,
                backgroundColor: 'var(--wd-primary-color)',
                color: '#ffffff',
                border: 'none'
              }}
            >
              Замовити консультацію
            </button>
          </div>

        </div>
      </section>

      {/* 2. CATEGORY PILLARS («Ми пропонуємо:») */}
      <section style={{ padding: '60px 0', backgroundColor: '#fcfcfc', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Напрямки діяльності
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#111111', marginTop: '4px' }}>
              Ми пропонуємо:
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            ...(window.innerWidth < 1024 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {}),
            ...(window.innerWidth < 640 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Card 1: Польова техніка */}
            <div 
              onClick={() => {
                const el = document.getElementById('main-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                padding: '30px 24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--wd-primary-color)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
            >
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#fff6f0',
                color: 'var(--wd-primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Tractor size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
                Польова техніка
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                Техніка для обробки ґрунту, посадки та збирання картоплі, моркви, буряку та цибулі.
              </p>
              <span style={{ marginTop: 'auto', fontSize: '13px', fontWeight: 600, color: 'var(--wd-primary-color)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Дивитися техніку <ArrowRight size={14} />
              </span>
            </div>

            {/* Card 2: Складська техніка */}
            <div 
              onClick={() => {
                const el = document.getElementById('main-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                padding: '30px 24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--wd-primary-color)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
            >
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#fffdf0',
                color: '#b28600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Warehouse size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
                Складська техніка
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                Устаткування для транспортування, складання, сортування та підготовки овочів до продажу.
              </p>
              <span style={{ marginTop: 'auto', fontSize: '13px', fontWeight: 600, color: 'var(--wd-primary-color)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Складські комплекси <ArrowRight size={14} />
              </span>
            </div>

            {/* Card 3: Запчастини */}
            <div 
              onClick={() => onOpenQuickLead('Підбір запасних частин')}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                padding: '30px 24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--wd-primary-color)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
            >
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Layers size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
                Запасні частини
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                Широкий асортимент оригінальних запчастин Grimme, Struik, AVR, Asa-Lift, Dewulf.
              </p>
              <span style={{ marginTop: 'auto', fontSize: '13px', fontWeight: 600, color: 'var(--wd-primary-color)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Замовити запчастини <ArrowRight size={14} />
              </span>
            </div>

            {/* Card 4: Ремонт транспортерів */}
            <div 
              onClick={() => onOpenQuickLead('Ремонт транспортерів')}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                padding: '30px 24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--wd-primary-color)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
            >
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#eefcf1',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Wrench size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
                Ремонт транспортерів
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                Заміна зубчастих стрічок. Економія 50% від вартості нового транспортера з гарантією.
              </p>
              <span style={{ marginTop: 'auto', fontSize: '13px', fontWeight: 600, color: 'var(--wd-primary-color)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Сервіс реставрації <ArrowRight size={14} />
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SEASON HITS (Хіти сезону) */}
      <section style={{ padding: '60px 0 20px 0' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Сезонні пропозиції
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#111111', margin: '4px 0 0 0' }}>
                Хіти техніки в наявності
              </h2>
            </div>

            <a
              href="#main-catalog"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--wd-primary-color)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onClick={(e) => {
                const el = document.getElementById('main-catalog');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Дивитися всі 64 товари</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* 4-Column Grid for Season Hits */}
          <div className="products-bordered-grid" style={{ marginBottom: '40px' }}>
            {featuredHits.map((machine) => (
              <MachineryCard
                key={machine.id}
                machine={machine}
                currency={currency}
                onSelectMachine={(m) => navigate(`/product/${m.slug}`)}
                onQuickBook={(m) => navigate(`/product/${m.slug}`)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. MAIN CATALOG FILTER & PRODUCTS SECTION */}
      <div id="main-catalog">
        <FilterBar
          activityType={activityType}
          setActivityType={setActivityType}
          machineryType={machineryType}
          setMachineryType={setMachineryType}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedServiceType={selectedServiceType}
          setSelectedServiceType={setSelectedServiceType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalFilteredCount={filteredMachinery.length}
          onResetFilters={handleResetFilters}
        />

        <main className="container">
          {filteredMachinery.length === 0 ? (
            <div style={{
              padding: '64px 20px',
              textAlign: 'center',
              background: '#fafafa',
              border: '1px solid #eaeaea',
              margin: '20px 0 40px 0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>
                Товарів за обраними критеріями не знайдено
              </h3>
              <p style={{ color: '#777', fontSize: '14px', marginBottom: '18px' }}>
                Спробуйте скинути значення фільтрів для перегляду всього каталогу.
              </p>
              <button onClick={handleResetFilters} className="btn-adena-primary">
                Скинути фільтри
              </button>
            </div>
          ) : (
            <div className="products-bordered-grid">
              {filteredMachinery.map((machine) => (
                <MachineryCard
                  key={machine.id}
                  machine={machine}
                  currency={currency}
                  onSelectMachine={(m) => navigate(`/product/${m.slug}`)}
                  onQuickBook={(m) => navigate(`/product/${m.slug}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 5. WHY US SECTION («Чому ми?») */}
      <section style={{ padding: '64px 0', backgroundColor: '#fcfcfc', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '13px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Наші переваги
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#111111', marginTop: '4px' }}>
              Чому аграрії обирають Adena Agro?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            ...(window.innerWidth < 960 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {}),
            ...(window.innerWidth < 560 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e8e8e8', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#fff6f0', color: 'var(--wd-primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Truck size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>Сервіс та Логістика</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                Ролики та запчастини завжди в наявності. Ремонт і реставрація транспортерів. Швидка доставка тралом по всій Україні.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e8e8e8', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#fff6f0', color: 'var(--wd-primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>Європейська якість</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                Продукція провідних європейських виробників (Struik, Grimme, Dewulf, ZIBO). Лише перевірені часом рішення.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e8e8e8', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#fff6f0', color: 'var(--wd-primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>30+ років досвіду</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                Більше 30-ти років у сфері вирощування овочів, практичний досвід на власних фермерських угіддях.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e8e8e8', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#fff6f0', color: 'var(--wd-primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>Індивідуальний підхід</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                Кваліфікований підбір агрегатів, налаштування в борозні, навчання персоналу та вигідні умови оренди з ПДВ.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CONSULTATION BANNER («Потрібна допомога у підборі?») */}
      <section style={{
        backgroundColor: '#1d1d1d',
        color: '#ffffff',
        padding: '50px 0',
        borderTop: '3px solid var(--wd-accent-yellow)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          
          <div style={{ maxWidth: '650px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
              Потрібна допомога у підборі техніки чи розрахунку робіт?
            </h3>
            <p style={{ fontSize: '14px', color: '#cccccc', margin: 0 }}>
              Наші інженери готові надати вам фахову консультацію та розрахувати вартість під площу вашого поля.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="tel:+380966610100"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--wd-accent-yellow)',
                fontSize: '18px',
                fontWeight: 700
              }}
            >
              <Phone size={20} />
              <span>+38 (096) 66 10 100</span>
            </a>

            <button
              onClick={() => onOpenQuickLead('Підбір техніки на головній')}
              className="btn-adena-primary"
              style={{ height: '48px', padding: '0 24px', fontWeight: 700 }}
            >
              Замовити дзвінок
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
