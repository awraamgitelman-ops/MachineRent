import React, { useState } from 'react';
import { 
  Tractor, 
  PhoneCall, 
  MapPin, 
  Calculator, 
  Wrench, 
  Menu, 
  X, 
  Search,
  Sparkles,
  ShieldCheck,
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
  onOpenServices,
  totalAvailableCount
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = ['UAH', 'USD', 'EUR'];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(8, 13, 11, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-light)',
      transition: 'all 0.3s'
    }}>
      {/* Top Banner Notice */}
      <div style={{
        background: 'linear-gradient(90deg, #064e3b 0%, #047857 50%, #064e3b 100%)',
        padding: '6px 0',
        fontSize: '12px',
        fontWeight: 600,
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: '#34d399',
              boxShadow: '0 0 8px #34d399'
            }}></span>
            <span>Посівна & Збиральна кампанія 2026: готові до виїзду в поле <strong>{totalAvailableCount} одиниць</strong> техніки</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
              <ShieldCheck size={14} /> Власна сервісна служба 24/7
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
              <MapPin size={14} /> 7 хабів по Україні
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12px',
        paddingBottom: '12px',
        gap: '20px'
      }}>
        {/* Brand Logo */}
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: 'var(--text-main)'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
            color: '#ffffff'
          }}>
            <Tractor size={26} />
          </div>
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>AGRORENT</span>
              <span style={{
                fontSize: '11px',
                padding: '2px 6px',
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '4px',
                fontWeight: 700
              }}>PRO</span>
            </div>
            <div style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600
            }}>
              Важка агротехніка & Польові машини
            </div>
          </div>
        </a>

        {/* Quick Live Search Bar (Desktop) */}
        <div style={{
          flex: '1',
          maxWidth: '380px',
          position: 'relative',
          display: 'none',
          ...(window.innerWidth > 960 ? { display: 'block' } : {})
        }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Пошук: Grimme, комбайн, трактор 400 к.с..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
            style={{
              paddingLeft: '40px',
              paddingRight: '32px',
              height: '42px',
              fontSize: '13px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(16, 28, 24, 0.8)'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          ...(window.innerWidth <= 1080 ? { display: 'none' } : {})
        }}>
          <a href="#catalog" style={{
            color: 'var(--text-main)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'color 0.2s'
          }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-primary)'}
             onMouseLeave={(e) => e.target.style.color = 'var(--text-main)'}>
            Каталог техніки
          </a>

          <a href="#map-section" style={{
            color: 'var(--text-main)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <MapPin size={15} color="#10b981" />
            Карта баз
          </a>

          <button 
            onClick={onOpenCalculator}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
            <Calculator size={15} color="#f59e0b" />
            Калькулятор робіт
          </button>

          <button 
            onClick={onOpenServices}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
            <Wrench size={15} color="#34d399" />
            Сервіс & Трали
          </button>
        </nav>

        {/* Actions & Currency Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Currency Toggle */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                color: 'var(--text-main)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>{currency}</span>
              <span style={{ color: 'var(--color-accent-primary)' }}>({CURRENCY_SYMBOLS[currency]})</span>
              <ChevronDown size={14} />
            </button>

            {currencyDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                zIndex: 200,
                minWidth: '100px'
              }}>
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 14px',
                      background: currency === curr ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                      border: 'none',
                      color: currency === curr ? 'var(--color-accent-primary)' : 'var(--text-main)',
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

          {/* Quick Call Button */}
          <a
            href="tel:+380800339420"
            className="btn btn-outline btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              color: '#34d399'
            }}
          >
            <PhoneCall size={14} />
            <span style={{ fontWeight: 700 }}>0 800 339 420</span>
          </a>

          {/* Lead Consultation Button */}
          <button
            onClick={onOpenQuickLead}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={14} />
            <span>Підібрати під поле</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...(window.innerWidth > 1080 ? { display: 'none' } : {})
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-light)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Пошук техніки..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '38px', height: '40px' }}
            />
          </div>

          <a 
            href="#catalog" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, padding: '8px 0' }}
          >
            🚜 Каталог техніки
          </a>

          <a 
            href="#map-section" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, padding: '8px 0' }}
          >
            📍 Карта агро-баз та хабів
          </a>

          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', textAlign: 'left', fontWeight: 600, padding: '8px 0', cursor: 'pointer' }}
          >
            🧮 Калькулятор вартості робіт
          </button>

          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenServices(); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', textAlign: 'left', fontWeight: 600, padding: '8px 0', cursor: 'pointer' }}
          >
            🛠️ Сервіс, екіпажі та трали
          </button>
        </div>
      )}
    </header>
  );
}
