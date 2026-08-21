import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  ChevronRight, 
  Search, 
  HelpCircle, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { setPageSeo } from '../utils/seo';

export default function RemontPage({ currency, onOpenQuickLead }) {
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Ремонт та реставрація транспортерів сільськогосподарської техніки",
      "provider": {
        "@type": "Organization",
        "name": "AGRORENTEX",
        "url": "https://agrorentex.com"
      },
      "areaServed": "UA",
      "description": "Професійний ремонт та виготовлення транспортерів для картоплезбиральних та бурякозбиральних комбайнів Grimme, Anna, Bolko, Karlik. Економія до 50% від вартості нового."
    };

    setPageSeo({
      title: 'Ремонт та реставрація транспортерів сільгосптехніки | AGRORENTEX',
      description: 'Якісний ремонт, заміна стрічок та відновлення гумово-пруткових транспортерів Grimme, Anna, Bolko, AVR, Dewulf. Гарантія 1 рік. Доставка по Україні.',
      canonicalUrl: 'https://agrorentex.com/remont-transporteriv',
      ogImage: '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dMAgIBHUQkCh0BJkgaBgQWXj0KFh0EXyITVB4CAEoFcVdcGDcHHg.webp',
      schemaData
    });
  }, []);

  // Before / After Slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  // Form submission state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleSliderMove(e.clientX);
  };

  const handleSubmitConsultation = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setSubmitted(false);
    }, 4000);
  };

  const brandLogos = [
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVJ0BBMOMQFeQQNMTH4GVg8AHihdQBwFBQsHcFZHW2pSMQYAC1ghEUoDEUo.jpg',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1dABAsf.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1ZABAsf.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1BABAsf.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1RaWhUWSg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1xABAsf.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1RfWhUWSg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQkHV8BMx8YFQsBVCw6FgwSWCcRVBwcWkJR.jpg',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHV4gFAEGM0hfWg8ISg.jpg',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1RdWhUWSg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHQBzUEVdNFwLElAbGXtSBw1QHnxTHRkHAQFSIAVBDmVUMQYAC1ghEUoDEUo.jpg',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1RcWVRWXSMC.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1dfWhUWSg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1RWWhUWSg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVcyBh4GNBExBgALWCERSVhPRzsC.jpg',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHUUoCh0BfwkBEwonXygWEQUVAHpWSR1KBgoHbw0CCA.jpg',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1RcWhUWSg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHV8sBhFCIgoaFREXACILDQYPACMEC1tXQ0ZTM0pKX2IdXUdcVRwSFwEaFEE_SEgDWEBV.jpg',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1RbWVRWXSMC.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQzAhwLf1dfWVRWXSMC.png'
  ];

  const specializationImages = [
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVEzCAcff1RcQUhKH3QdV1lRAzsLHg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVEzCAcff1RcQkhKGXgdV1lRAzsLHg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVEzCAcff1RcQ0hKG34dV1lRAzsLHg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVEzCAcff1RcTEhKG34dV1lRAzsLHg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVEzCAcff1RcTUhKG34dV1lRAzsLHg.png',
    '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVEzCAcff1RdREhKG34dV1lRAzsLHg.png'
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Ubuntu, Arial, sans-serif' }}>
      
      {/* 1. Breadcrumbs */}
      <div style={{ backgroundColor: '#f7f7f7', borderBottom: '1px solid #e5e5e5', padding: '14px 0' }}>
        <div className="container">
          <nav style={{ fontSize: '13px', color: '#777', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/" style={{ color: '#555', fontWeight: 500 }}>Головна</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#111', fontWeight: 600 }}>Ремонт транспортерів</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section 1 (#xs_cta_style_2) */}
      <section style={{
        position: 'relative',
        backgroundColor: '#161616',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHUwgChgBM0hABAsfBA.png',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0 90px 0',
        color: '#ffffff',
        borderBottom: '4px solid var(--wd-primary-color)'
      }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ maxWidth: '700px' }}>
            
            <h1 style={{
              fontSize: '44px',
              lineHeight: '1.2',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px',
              textTransform: 'none'
            }}>
              Ремонт та реставрація <br />
              гумово-пруткових <br />
              транспортерів
            </h1>

            <div style={{ fontSize: '20px', fontWeight: 500, color: 'var(--wd-accent-yellow)', marginBottom: '8px' }}>
              Для овочезбиральної та картоплезбиральної техніки
            </div>

            <div style={{ fontSize: '16px', color: '#e5e5e5', marginBottom: '32px' }}>
              Нова послуга на ринку України — Реальна економія 50% від вартості нового
            </div>

            <button
              onClick={() => onOpenQuickLead('Замовлення ремонту транспортера (Hero)')}
              style={{
                backgroundColor: 'var(--wd-accent-yellow)',
                color: '#111111',
                border: 'none',
                padding: '14px 44px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'background-color 0.2s',
                letterSpacing: '0.04em'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--wd-primary-color)'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wd-accent-yellow)'; e.currentTarget.style.color = '#111111'; }}
            >
              ЗАМОВИТИ
            </button>

          </div>
        </div>
      </section>

      {/* 3. Section «Чому є сенс замовити ремонт транспортерів?» */}
      <section style={{ padding: '60px 0', backgroundColor: '#fcfcfc', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#151515', margin: 0 }}>
              Чому є сенс замовити ремонт транспортерів?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '40px',
            alignItems: 'center',
            ...(window.innerWidth < 960 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Left Image */}
            <div>
              <img
                src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHUQkCh0BJkseGgI.png"
                alt="Ремонт транспортерів AGRORENTEX"
                style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              />
            </div>

            {/* Right List of Advantages */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              padding: '36px 30px',
              borderRadius: '2px'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 28px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                fontSize: '15px',
                color: '#222222',
                lineHeight: 1.5
              }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Прибирання у призначені технологією терміни</strong> без тривалого очікування запчастин</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Зменшення травматизації продукту</strong>, що означає покращення його якості та товарної ціни</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Немає причин викидати старі «негідні» транспортери – ми даємо їм нове життя</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--wd-price-red)', fontWeight: 700 }}>Реальна економія 50% від вартості нового транспортера</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Отримання відреставрованого транспортера, зібраного з <strong>європейських армованих стрічок</strong> та комплектуючих</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Швидке вирішення проблеми заміни деталей транспортера у полі (ремкомплект, замки)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Створення замінного фонду із відреставрованих старих транспортерів</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#059669', fontWeight: 600 }}>Знижка 10% на опорні та приводні ролики при замовленні ремонту</span>
                </li>
              </ul>

              <button
                onClick={() => onOpenQuickLead('Замовлення ремонту транспортера (Чому є сенс)')}
                style={{
                  backgroundColor: 'var(--wd-accent-yellow)',
                  color: '#111111',
                  border: 'none',
                  padding: '12px 36px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--wd-primary-color)'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wd-accent-yellow)'; e.currentTarget.style.color = '#111111'; }}
              >
                ЗАМОВИТИ
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. 3 Product Application Cards (Цибуля / Картопля / Морква) */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            ...(window.innerWidth < 768 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Card 1: Цибуля */}
            <div style={{ textAlign: 'center', border: '1px solid #e8e8e8', padding: '24px 18px', backgroundColor: '#fafafa' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>
                Техніка для збирання цибулі
              </h3>
              <img
                src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVo0DFwfPAI.png"
                alt="Техніка для збирання цибулі"
                style={{ width: '100%', height: 'auto', maxHeight: '240px', objectFit: 'contain' }}
              />
            </div>

            {/* Card 2: Картопля */}
            <div style={{ textAlign: 'center', border: '1px solid #e8e8e8', padding: '24px 18px', backgroundColor: '#fafafa' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>
                Техніка для збирання картоплі
              </h3>
              <img
                src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHV0gFQYAOgRABAsf.png"
                alt="Техніка для збирання картоплі"
                style={{ width: '100%', height: 'auto', maxHeight: '240px', objectFit: 'contain' }}
              />
            </div>

            {/* Card 3: Морква */}
            <div style={{ textAlign: 'center', border: '1px solid #e8e8e8', padding: '24px 18px', backgroundColor: '#fafafa' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>
                Техніка для збирання Моркви
              </h3>
              <img
                src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHUQkCh0BJkhfQVVIADVIU1xVADscEl4cHQMGcVdfF39dXkRICFQmFkoZD0o.png"
                alt="Техніка для збирання Моркви"
                style={{ width: '100%', height: 'auto', maxHeight: '240px', objectFit: 'contain' }}
              />
            </div>

          </div>

        </div>
      </section>

      {/* 5. Brand Logos Grid */}
      <section style={{ padding: '60px 0', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Бренди техніки, для яких ми ремонтуємо транспортери
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            alignItems: 'center',
            justifyItems: 'center',
            ...(window.innerWidth < 960 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {})
          }}>
            {brandLogos.map((logoUrl, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e5e5',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '110px'
                }}
              >
                <img
                  src={logoUrl}
                  alt={`Виробник ${idx + 1}`}
                  style={{ maxWidth: '85%', maxHeight: '70px', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Section «З якими труднощами Ви стикаєтесь при прийнятті рішення – купити транспортер» */}
      <section style={{ padding: '70px 0', backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 600, color: '#111', maxWidth: '800px', margin: '0 auto' }}>
              З якими труднощами Ви стикаєтесь при прийнятті рішення – купити транспортер
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            ...(window.innerWidth < 960 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {}),
            ...(window.innerWidth < 640 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Box 1 */}
            <div style={{
              backgroundColor: '#fcfcfc',
              border: '1px solid #e5e5e5',
              padding: '30px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#fff3ec', color: 'var(--wd-primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Search size={28} />
              </div>
              <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, margin: 0 }}>
                Тривалий пошук надійного, гарного постачальника техніки та постійна проблема «Де придбати?»
              </p>
            </div>

            {/* Box 2 */}
            <div style={{
              backgroundColor: '#fcfcfc',
              border: '1px solid #e5e5e5',
              padding: '30px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#fffbe6', color: '#b28600', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <HelpCircle size={28} />
              </div>
              <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, margin: 0 }}>
                Не все зрозуміло з узгодженням необхідних параметрів транспортера при замовленні в Європі
              </p>
            </div>

            {/* Box 3 */}
            <div style={{
              backgroundColor: '#fcfcfc',
              border: '1px solid #e5e5e5',
              padding: '30px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <DollarSign size={28} />
              </div>
              <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, margin: 0 }}>
                Дорога, та не завжди обгрунтована вартість техніки. Невідповідність за критерієм ціна - якість
              </p>
            </div>

            {/* Box 4 */}
            <div style={{
              backgroundColor: '#fcfcfc',
              border: '1px solid #e5e5e5',
              padding: '30px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#e0f2fe', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Clock size={28} />
              </div>
              <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, margin: 0 }}>
                Тривалий термін постачання. Невпевненість у тому, що приїде та сама техніка, що ви обрали
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Section «Транспортери — наша спеціалізація» */}
      <section style={{ padding: '70px 0', backgroundColor: '#fafafa', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#111', margin: 0 }}>
              Транспортери — наша спеціалізація
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            ...(window.innerWidth < 960 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : {}),
            ...(window.innerWidth < 640 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            {specializationImages.map((imgUrl, idx) => (
              <div key={idx} style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', padding: '16px', textAlign: 'center' }}>
                <img
                  src={imgUrl}
                  alt={`Спеціалізація транспортерів ${idx + 1}`}
                  style={{ width: '100%', height: 'auto', maxHeight: '280px', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Section «Як подовжити ресурс транспортера ?» */}
      <section style={{ padding: '70px 0', backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#111', margin: 0 }}>
              Як подовжити ресурс транспортера ?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '40px',
            ...(window.innerWidth < 960 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            <div>
              <img
                src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHV8sBhUKf1BcWhUWSg.png"
                alt="Транспортери та ролики"
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
            </div>

            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>
                Транспортери та ролики – одна функціональна одиниця
              </h3>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.7, margin: 0 }}>
                Своєчасна заміна роликів значно збільшує ресурс транспортера, так як не працюючий ролик (заклинили, або нерівномірно стертий або перекошений) не забезпечує точне ведення транспортерів і призводить як до бічних стирання країв транспортера, так і до стирання самої стрічки за рахунок тертя по ролику, що не обертається.
              </p>
            </div>
          </div>

          {/* Full-width Blueprint Graphic */}
          <div style={{ textAlign: 'center' }}>
            <img
              src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHUQkBAYOPAICEUhBFGMVCg4.png"
              alt="Схема взаємодії роликів та транспортера"
              style={{ width: '100%', height: 'auto', borderRadius: '4px', border: '1px solid #eee' }}
            />
          </div>

        </div>
      </section>

      {/* 9. Interactive Before / After Image Comparison Slider («До ремонту / Після ремонту») */}
      <section style={{ padding: '70px 0', backgroundColor: '#fcfcfc', borderBottom: '1px solid #eaeaea' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#111', margin: 0 }}>
              До ремонту / Після ремонту
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '6px' }}>
              Перетягніть повзунок, щоб порівняти стан зношеного транспортера та повністю відновленого
            </p>
          </div>

          {/* Interactive Split View */}
          <div
            ref={sliderRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '950 / 634',
              overflow: 'hidden',
              cursor: 'ew-resize',
              userSelect: 'none',
              borderRadius: '4px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
            }}
          >
            {/* After Image (Background) */}
            <img
              src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVIyBC1fYlxaWVdWXSMC.png"
              alt="Після ремонту"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '2px',
              textTransform: 'uppercase'
            }}>
              Після ремонту
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPosition}%`,
              height: '100%',
              overflow: 'hidden'
            }}>
              <img
                src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVQ4Cx1ef1RABAsf.png"
                alt="До ремонту"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: sliderRef.current ? `${sliderRef.current.clientWidth}px` : '100%',
                  height: '100%',
                  maxWidth: 'none',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 700,
                borderRadius: '2px',
                textTransform: 'uppercase'
              }}>
                До ремонту
              </div>
            </div>

            {/* Divider Handle Line */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: '4px',
              backgroundColor: '#ffffff',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111',
                fontSize: '14px',
                fontWeight: 700
              }}>
                ↔
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. Callout Box Banner */}
      <section style={{
        backgroundColor: '#1d1d1d',
        color: '#ffffff',
        padding: '50px 0',
        borderTop: '3px solid var(--wd-accent-yellow)'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '850px' }}>
          <h2 style={{
            fontSize: '24px',
            lineHeight: 1.4,
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: '24px'
          }}>
            Замовите ремонт одного транспортера і ви знайдете для себе вирішення проблем, пов'язані із покупкою нових траспортерів
          </h2>

          <button
            onClick={() => onOpenQuickLead('Замовлення ремонту транспортера (CTA блок)')}
            style={{
              backgroundColor: 'var(--wd-accent-yellow)',
              color: '#111111',
              border: 'none',
              padding: '14px 44px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--wd-primary-color)'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wd-accent-yellow)'; e.currentTarget.style.color = '#111111'; }}
          >
            ЗАМОВИТИ
          </button>
        </div>
      </section>

      {/* 11. Large Infographic Banner & Contacts */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <img
              src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dNAgICHVEzCAcff11XWhUWSg.png"
              alt="Ремонт та реставрація транспортерів схема"
              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </div>

          {/* Contact Box */}
          <div style={{
            maxWidth: '650px',
            margin: '0 auto',
            textAlign: 'center',
            backgroundColor: '#fafafa',
            border: '1px solid #e0e0e0',
            padding: '30px 24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '14px' }}>
              35306, Україна, м.Рівне, с.Колоденка, вул. Свободи, буд. 26
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <a href="tel:+380966610100" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--wd-primary-color)', textDecoration: 'none' }}>+38 (096) 66 10 100</a>
              <span style={{ fontSize: '13px', color: '#666' }}>Відділ продажу та оренди</span>
            </div>
          </div>

        </div>
      </section>

      {/* 12. Prefooter Fluent Form («Потрібна допомога у підборі?») */}
      <section style={{
        backgroundColor: '#111111',
        color: '#ffffff',
        borderTop: '4px solid var(--wd-primary-color)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          ...(window.innerWidth < 860 ? { gridTemplateColumns: '1fr' } : {})
        }}>
          
          {/* Tractor Image */}
          <div style={{
            backgroundImage: 'url(/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dLAgMCHUIzBhkbPRdDQ1NAVXlWVkcWSCkVUA.webp',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '380px'
          }}></div>

          {/* Form Content */}
          <div style={{ padding: '50px 40px', maxWidth: '550px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
              Потрібна допомога у підборі?
            </h3>
            <p style={{ fontSize: '15px', color: '#cccccc', marginBottom: '24px' }}>
              Наші спеціалісти готові надати Вам професійну консультацію. Звертайтеся!
            </p>

            {submitted ? (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10b981',
                color: '#6ee7b7',
                padding: '16px',
                borderRadius: '4px',
                fontSize: '15px'
              }}>
                Дякуємо! Ваша заявка прийнята. Інженер зателефонує вам протягом 10 хвилин.
              </div>
            ) : (
              <form onSubmit={handleSubmitConsultation} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <input
                    type="text"
                    placeholder="Ваше ім'я"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      height: '46px',
                      padding: '0 16px',
                      backgroundColor: '#ffffff',
                      border: 'none',
                      fontSize: '14px',
                      color: '#000'
                    }}
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="+38 099 999 99 99"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      height: '46px',
                      padding: '0 16px',
                      backgroundColor: '#ffffff',
                      border: 'none',
                      fontSize: '14px',
                      color: '#000'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    height: '48px',
                    backgroundColor: 'var(--wd-primary-color)',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginTop: '6px'
                  }}
                >
                  Отримати консультацію
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
