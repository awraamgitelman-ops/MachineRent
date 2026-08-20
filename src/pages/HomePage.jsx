import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Phone, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Award, 
  Users 
} from 'lucide-react';
import FilterBar from '../components/FilterBar';
import MachineryCard from '../components/MachineryCard';
import { MACHINERY_DATA } from '../data/machineryData';
import { 
  HOME_TOP_SEASON, 
  HOME_GRID_CENTER, 
  HOME_GRID_RIGHT, 
  HOME_CATEGORY_BOXES, 
  HOME_DISCOUNTS_PRODUCTS 
} from '../data/homeData';
import { formatPrice } from '../utils/currency';

export default function HomePage({ 
  currency, 
  searchTerm, 
  setSearchTerm,
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

  // Season slider active slide
  const [seasonIndex, setSeasonIndex] = useState(0);

  // Filtering Logic for Main Catalog
  const filteredMachinery = useMemo(() => {
    return MACHINERY_DATA.filter((machine) => {
      if (activityType !== 'all' && machine.activityType !== activityType) return false;
      if (machineryType !== 'all' && machine.machineryType !== machineryType) return false;
      if (selectedBrand !== 'all' && machine.brand !== selectedBrand) return false;
      if (selectedModel !== 'all' && machine.model !== selectedModel) return false;
      if (selectedServiceType === 'operator' && !machine.specs?.operatorIncluded) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = machine.name.toLowerCase().includes(q);
        const matchBrand = machine.brand.toLowerCase().includes(q);
        const matchModel = (machine.model || '').toLowerCase().includes(q);
        const matchDesc = (machine.shortDescription || '').toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchModel && !matchDesc) return false;
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

  const currentSeasonItem = HOME_TOP_SEASON[seasonIndex % HOME_TOP_SEASON.length];

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      
      {/* 1. TOP 3-COLUMN SHOWCASE CONTAINER (Exact match to elementor-element-0c15865) */}
      <section className="container" style={{ padding: '24px 15px 16px 15px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '340px 1fr 1fr',
          gap: '16px',
          ...(window.innerWidth < 1100 ? { gridTemplateColumns: '1fr 1fr' } : {}),
          ...(window.innerWidth < 768 ? { gridTemplateColumns: '1fr' } : {})
        }}>
          
          {/* Column 1: «Сезон» Featured Product Card with Slider Controls */}
          <div style={{
            border: '1px solid #e2e2e2',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {/* Header Title */}
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0, textTransform: 'uppercase', color: '#111' }}>
                Сезон
              </h2>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => setSeasonIndex((prev) => (prev > 0 ? prev - 1 : HOME_TOP_SEASON.length - 1))}
                  style={{ background: '#f5f5f5', border: '1px solid #ddd', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setSeasonIndex((prev) => (prev + 1) % HOME_TOP_SEASON.length)}
                  style={{ background: '#f5f5f5', border: '1px solid #ddd', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Featured Product Box */}
            <div 
              style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => navigate(`/product/${currentSeasonItem.slug}`)}
            >
              <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <img
                  src={currentSeasonItem.image}
                  alt={currentSeasonItem.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ marginTop: 'auto' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.3, marginBottom: '6px', color: '#111' }}>
                  <Link to={`/product/${currentSeasonItem.slug}`} onClick={(e) => e.stopPropagation()}>
                    {currentSeasonItem.name}
                  </Link>
                </h3>
                <div style={{ fontSize: '12px', color: '#777', marginBottom: '10px' }}>
                  {currentSeasonItem.brand}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--wd-price-red)', marginBottom: '12px' }}>
                  {formatPrice(currentSeasonItem.priceUah, currency)}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${currentSeasonItem.slug}`);
                  }}
                  className="btn-adena-primary"
                  style={{ width: '100%', height: '40px', fontSize: '13px', fontWeight: 600 }}
                >
                  <span>Додати в кошик / Замовити</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Spare Parts Grid (3x2 items) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            border: '1px solid #e2e2e2',
            padding: '8px',
            backgroundColor: '#ffffff',
            ...(window.innerWidth < 640 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {})
          }}>
            {HOME_GRID_CENTER.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.slug}`)}
                style={{
                  border: '1px solid #f0f0f0',
                  padding: '10px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--wd-primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f0f0f0'}
              >
                <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.25, height: '32px', overflow: 'hidden', margin: '0 0 4px 0' }}>
                    <Link to={`/product/${item.slug}`} onClick={(e) => e.stopPropagation()} style={{ color: '#111' }}>
                      {item.name}
                    </Link>
                  </h4>
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>
                    {item.brand}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--wd-price-red)' }}>
                    {formatPrice(item.priceUah, currency)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Machinery & Units Grid (3x2 items) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            border: '1px solid #e2e2e2',
            padding: '8px',
            backgroundColor: '#ffffff',
            ...(window.innerWidth < 640 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {})
          }}>
            {HOME_GRID_RIGHT.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.slug}`)}
                style={{
                  border: '1px solid #f0f0f0',
                  padding: '10px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--wd-primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f0f0f0'}
              >
                <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.25, height: '32px', overflow: 'hidden', margin: '0 0 4px 0' }}>
                    <Link to={`/product/${item.slug}`} onClick={(e) => e.stopPropagation()} style={{ color: '#111' }}>
                      {item.name}
                    </Link>
                  </h4>
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>
                    {item.brand}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--wd-price-red)' }}>
                    {formatPrice(item.priceUah, currency)}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. 5-COLUMN CATEGORY ICON BOXES (Exact match to elementor-element-f8c873e) */}
      <section className="container" style={{ padding: '24px 15px 32px 15px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          ...(window.innerWidth < 960 ? { gridTemplateColumns: 'repeat(3, 1fr)' } : {}),
          ...(window.innerWidth < 560 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {})
        }}>
          {HOME_CATEGORY_BOXES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                const el = document.getElementById('main-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                padding: '12px 8px',
                border: '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div style={{
                width: '130px',
                height: '130px',
                margin: '0 auto 12px auto',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111', margin: 0 }}>
                {cat.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DISCOUNTS SECTION («Знижки») */}
      <section className="container" style={{ padding: '10px 15px 32px 15px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #1d1d1d',
          paddingBottom: '8px',
          marginBottom: '18px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0, textTransform: 'uppercase', color: '#1d1d1d' }}>
            Знижки та спецпропозиції
          </h2>
          <a
            href="#main-catalog"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('main-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ fontSize: '13px', fontWeight: 600, color: 'var(--wd-primary-color)', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Всі товари</span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          ...(window.innerWidth < 960 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {}),
          ...(window.innerWidth < 560 ? { gridTemplateColumns: '1fr' } : {})
        }}>
          {HOME_DISCOUNTS_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => navigate(`/product/${prod.slug}`)}
              style={{
                border: '1px solid #e8e8e8',
                backgroundColor: '#ffffff',
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.3, marginBottom: '6px', color: '#111' }}>
                  <Link to={`/product/${prod.slug}`} onClick={(e) => e.stopPropagation()}>
                    {prod.name}
                  </Link>
                </h3>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
                  {prod.brand}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--wd-price-red)', marginBottom: '12px' }}>
                  {formatPrice(prod.priceUah, currency)}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${prod.slug}`);
                  }}
                  className="btn-adena-primary"
                  style={{ width: '100%', height: '36px', fontSize: '12px', fontWeight: 600 }}
                >
                  <span>Детальніше</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAIN INTERACTIVE FILTER & 4-COLUMN PRODUCT CATALOG (wpf-filters) */}
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

        <main className="container" style={{ paddingBottom: '40px' }}>
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

      {/* 5. ABOUT & SEO SECTION (Exact match to Adena Agro text content) */}
      <section style={{ backgroundColor: '#fafafa', borderTop: '1px solid #eaeaea', padding: '50px 0 60px 0' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          
          <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#111', marginBottom: '16px', textAlign: 'center' }}>
            Продаж та оренда сільськогосподарської техніки для вирощування овочів
          </h2>
          
          <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.7, textAlign: 'center', maxWidth: '900px', margin: '0 auto 36px auto' }}>
            <strong>AGRO RENTEX</strong> – ваш надійний партнер у світі сільськогосподарської техніки для картоплі, моркви, цукрового буряку та цибулі. Обробка ґрунту, збирання, транспортування, зберігання та підготовка врожаю перед реалізацією – ми пропонуємо рішення для досягнення найкращих результатів. Обирайте перевірену європейську техніку!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            marginBottom: '40px',
            ...(window.innerWidth < 768 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Box 1: Ми пропонуємо */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '16px', borderBottom: '2px solid var(--wd-primary-color)', paddingBottom: '6px' }}>
                Ми пропонуємо:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <strong style={{ color: '#111' }}>🌾 Польова техніка:</strong> Техніка для обробки ґрунту, посадки та збирання овочевих культур: картоплі, моркви, цукрового буряку та цибулі.
                </li>
                <li>
                  <strong style={{ color: '#111' }}>🏢 Складська техніка:</strong> Устаткування для транспортування, складання, сортування та підготовки овочів до продажу.
                </li>
                <li>
                  <strong style={{ color: '#111' }}>⚙️ Запчастини:</strong> Широкий асортимент запчастин для ремонту та обслуговування (Grimme, Struik, AVR, Dewulf).
                </li>
                <li>
                  <strong style={{ color: '#111' }}>🔧 Ремонт транспортерів:</strong> Заміна зубчастих стрічок та деталей транспортерів будь-якого кроку. Економія 50% від вартості нового.
                </li>
              </ul>
            </div>

            {/* Box 2: Чому ми? */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '16px', borderBottom: '2px solid var(--wd-accent-yellow)', paddingBottom: '6px' }}>
                Чому ми?
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <strong style={{ color: '#111' }}>🚚 Сервіс:</strong> Ролики та запчастини завжди в наявності. Ремонт та реставрація транспортерів. Швидка доставка по Україні.
                </li>
                <li>
                  <strong style={{ color: '#111' }}>🛡️ Якість:</strong> Продукція провідних європейських виробників. Лише перевірені часом інженерні рішення.
                </li>
                <li>
                  <strong style={{ color: '#111' }}>🌾 Досвід:</strong> Більше 30-ти років у сфері вирощування овочів на власних фермерських угіддях.
                </li>
                <li>
                  <strong style={{ color: '#111' }}>🤝 Підхід:</strong> Кваліфікований підбір агрегатів відповідно до потреб вашого господарства.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CONSULTATION BANNER («Потрібна допомога у підборі?») */}
      <section style={{
        backgroundColor: '#1d1d1d',
        color: '#ffffff',
        padding: '44px 0',
        borderTop: '3px solid var(--wd-accent-yellow)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', margin: '0 0 6px 0' }}>
              Потрібна допомога у підборі?
            </h3>
            <p style={{ fontSize: '14px', color: '#bbb', margin: 0 }}>
              Наші спеціалісти готові надати Вам професійну консультацію. Звертайтеся!
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <a
              href="tel:+380966610100"
              style={{
                color: 'var(--wd-accent-yellow)',
                fontSize: '18px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Phone size={20} />
              <span>+38 (096) 66 10 100</span>
            </a>

            <button
              onClick={() => onOpenQuickLead('Консультація спеціаліста')}
              className="btn-adena-primary"
              style={{ height: '44px', padding: '0 24px', fontWeight: 700 }}
            >
              Замовити консультацію
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
