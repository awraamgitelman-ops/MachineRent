import React, { useState } from 'react';
import { 
  Phone, 
  Search, 
  User, 
  ShoppingCart, 
  MapPin, 
  Menu, 
  X,
  Calculator,
  Wrench,
  ChevronDown
} from 'lucide-react';
import { CURRENCY_SYMBOLS } from '../utils/currency';

export default function Navbar({ 
  currency, 
  setCurrency, 
  searchTerm, 
  setSearchTerm,
  onOpenQuickLead,
  onOpenCalculator,
  activeCategory,
  onSelectCategory,
  cartCount = 0
}) {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories = [
    { id: 'field', label: 'Польова техніка' },
    { id: 'warehouse', label: 'Складська техніка' },
    { id: 'parts', label: 'Запасні частини' },
    { id: 'repairs', label: 'Ремонт транспортерів' },
    { id: 'used', label: 'Техніка Б/В' },
    { id: 'rent_calc', label: 'Оренда & Калькулятор' },
  ];

  return (
    <header style={{ width: '100%', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      {/* 1. Top Bar */}
      <div className="whb-top-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Phone Numbers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a href="tel:+380950706877" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <Phone size={14} color="var(--wd-primary-color)" />
              <span>+38 (095) 07 06 877</span>
            </a>
            <a href="tel:+380966610100" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <span>+38 (096) 66 10 100</span>
            </a>
          </div>

          {/* Top Info Links (Desktop) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', ...(window.innerWidth < 960 ? { display: 'none' } : {}) }}>
            <a href="#" style={{ fontSize: '13px' }}>Головна</a>
            <a href="#" style={{ fontSize: '13px' }}>Публікації</a>
            <a href="#" style={{ fontSize: '13px' }}>Про нас</a>
            <a href="#" style={{ fontSize: '13px' }}>Контакти</a>
          </div>

          {/* Location Address */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#666', ...(window.innerWidth < 768 ? { display: 'none' } : {}) }}>
            <MapPin size={13} color="var(--wd-primary-color)" />
            <span>35306, Україна, м.Рівне, с.Колоденка, вул.Свободи 26</span>
          </div>

        </div>
      </div>

      {/* 2. General Header Row */}
      <div className="whb-general-header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          
          {/* Adena Agro Logo */}
          <a href="#" className="adena-logo-text">
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f7ce34',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              <span style={{ fontSize: '22px' }}>⚙️</span>
            </div>
            <div>
              <div className="adena-logo-brand">
                ADENA<span>AGRO</span>
              </div>
              <div style={{ fontSize: '10px', color: '#888888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Польова техніка для овочів
              </div>
            </div>
          </a>

          {/* Center Search Bar */}
          <div className="adena-search-wrap" style={{ ...(window.innerWidth < 768 ? { display: 'none' } : {}) }}>
            <input
              type="text"
              className="adena-search-input"
              placeholder="Для пошуку введіть назву чи код товару"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={{ background: 'none', border: 'none', padding: '0 8px', cursor: 'pointer', color: '#999' }}
              >
                <X size={16} />
              </button>
            )}
            <button className="adena-search-btn" onClick={() => {
              const el = document.getElementById('main-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Search size={16} />
              <span>Пошук</span>
            </button>
          </div>

          {/* Right Header Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            
            {/* Currency Selector */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#f8f8f8',
                  border: '1px solid #d2d2d2',
                  padding: '6px 10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <span>{currency}</span>
                <span style={{ color: 'var(--wd-primary-color)' }}>({CURRENCY_SYMBOLS[currency]})</span>
                <ChevronDown size={14} />
              </button>

              {currencyDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 200,
                  minWidth: '110px'
                }}>
                  {['UAH', 'USD', 'EUR'].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: currency === curr ? '#fff6f0' : 'transparent',
                        border: 'none',
                        color: currency === curr ? 'var(--wd-primary-color)' : '#111',
                        fontSize: '13px',
                        fontWeight: 600,
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{curr}</span>
                      <span>{CURRENCY_SYMBOLS[curr]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Tool */}
            <button 
              onClick={() => onOpenQuickLead('Кабінет клієнта / Реєстрація')} 
              className="header-tool-btn" 
              title="Вхід / Реєстрація"
            >
              <User size={18} />
            </button>

            {/* Cart / Orders Tool */}
            <button 
              onClick={onOpenCalculator} 
              className="header-tool-btn" 
              title="Кошик / Калькулятор оренди"
            >
              <ShoppingCart size={18} />
              <span className="header-tool-badge">{cartCount}</span>
            </button>

            {/* Language Switch */}
            <div style={{
              fontWeight: 700,
              fontSize: '14px',
              padding: '6px 8px',
              borderLeft: '1px solid #e0e0e0',
              marginLeft: '4px'
            }}>
              UA
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'none',
                ...(window.innerWidth < 960 ? { display: 'block' } : {})
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>
      </div>

      {/* 3. Dark Bottom Navigation Bar */}
      <div className="whb-header-bottom">
        <div className="container">
          <ul className="adena-main-nav">
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <li key={cat.id} className={isActive ? 'active' : ''}>
                  <a
                    href="#main-catalog"
                    onClick={(e) => {
                      if (cat.id === 'rent_calc') {
                        e.preventDefault();
                        onOpenCalculator();
                      } else {
                        onSelectCategory(cat.id);
                      }
                    }}
                  >
                    {cat.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile Search & Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '2px solid var(--wd-primary-color)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div className="adena-search-wrap" style={{ maxWidth: '100%' }}>
            <input
              type="text"
              className="adena-search-input"
              placeholder="Пошук техніки..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="adena-search-btn">
              <Search size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px' }}>
            {navCategories.map((cat) => (
              <a
                key={cat.id}
                href="#main-catalog"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (cat.id === 'rent_calc') onOpenCalculator();
                  else onSelectCategory(cat.id);
                }}
                style={{
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#111111',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
