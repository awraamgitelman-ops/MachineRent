import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Wrench,
  MessageSquare
} from 'lucide-react';
import { setPageSeo } from '../utils/seo';

export default function ContactPage({ onOpenQuickLead }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: 'Підбір техніки',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Контакти компанії AGRO RENTEX",
      "url": "https://agrorentex.com/contact-us",
      "description": "Контактна інформація AGRO RENTEX: телефони, адреса бази в Рівному, графік роботи, електронна пошта та форма зворотного зв'язку.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "AGRO RENTEX",
        "telephone": "+380966610100",
        "email": "info@agrorentex.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "вул. Свободи 26",
          "addressLocality": "с. Колоденка, м. Рівне",
          "postalCode": "35306",
          "addressCountry": "UA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 50.5843,
          "longitude": 26.3142
        }
      }
    };

    setPageSeo({
      title: 'Контакти | AGRO RENTEX – Телефони, адреса та схема проїзду',
      description: 'Зв\'яжіться з AGRO RENTEX: +38 (096) 66 10 100, +38 (095) 07 06 877. Адреса: м. Рівне, с. Колоденка, вул. Свободи 26. Консультації та продаж агротехніки.',
      canonicalUrl: 'https://agrorentex.com/contact-us',
      schemaData
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', topic: 'Підбір техніки', message: '' });
    }, 600);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', paddingBottom: '60px' }}>
      
      {/* 1. Breadcrumbs Header */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777', gap: '6px' }}>
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaa" />
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Контакти</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px' }}>
        
        {/* Header Title */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fff4eb',
            color: 'var(--wd-primary-color)',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px',
            borderLeft: '3px solid var(--wd-primary-color)'
          }}>
            <span>Зв'яжіться з нами</span>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#111111', margin: '0 0 10px 0' }}>
            Контактна інформація AGRO RENTEX
          </h1>
          <p style={{ fontSize: '15px', color: '#666', margin: 0, maxWidth: '750px' }}>
            Наші фахівці готові надати кваліфіковану консультацію, допомогти з підбором техніки або оформленням замовлення на запчастини та ремонт.
          </p>
        </div>

        {/* 2. Main Contact Grid (Cards & Form) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '40px',
          marginBottom: '56px',
          ...(window.innerWidth < 860 ? { gridTemplateColumns: '1fr' } : {})
        }}>
          
          {/* Left Column: Department & Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Card 1: Main Office & Address */}
            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e5e5e5',
              padding: '24px',
              borderRadius: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <MapPin size={22} color="var(--wd-primary-color)" />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', margin: 0 }}>
                  Головний офіс та виставковий майданчик
                </h3>
              </div>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.6, marginBottom: '12px' }}>
                <strong>Адреса:</strong> 35306, Україна, Рівненська обл., м. Рівне, с. Колоденка, вул. Свободи 26
              </p>
              <div style={{ fontSize: '13px', color: '#777', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#888" />
                <span><strong>Графік роботи:</strong> Пн-Сб: 08:00 – 19:00 (у сезон 24/7), Неділя: за домовленістю</span>
              </div>
            </div>

            {/* Card 2: Phone Numbers by Department */}
            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e5e5e5',
              padding: '24px',
              borderRadius: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Phone size={22} color="var(--wd-primary-color)" />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', margin: 0 }}>
                  Відділи та телефонні лінії
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                
                {/* Sales */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #eaeaea', padding: '14px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                    Відділ продажу техніки
                  </div>
                  <a href="tel:+380966610100" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--wd-primary-color)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                    +38 (096) 66 10 100
                  </a>
                  <div style={{ fontSize: '12px', color: '#555' }}>Підбір комбайнів, фрез та ліній</div>
                </div>

                {/* Parts & Service */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #eaeaea', padding: '14px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                    Запчастини та ремонт
                  </div>
                  <a href="tel:+380950706877" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--wd-primary-color)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                    +38 (095) 07 06 877
                  </a>
                  <div style={{ fontSize: '12px', color: '#555' }}>Стрічки, ролики, реставрація</div>
                </div>

                {/* Hot line */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #eaeaea', padding: '14px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                    Гаряча лінія
                  </div>
                  <a href="tel:+380678882222" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--wd-primary-color)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                    +38 (067) 888 22 22
                  </a>
                  <div style={{ fontSize: '12px', color: '#555' }}>Швидкі консультації</div>
                </div>

                {/* Stationary Office */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #eaeaea', padding: '14px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                    Стаціонарний зв'язок
                  </div>
                  <a href="tel:+380362460571" style={{ fontSize: '16px', fontWeight: 700, color: '#333', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                    +380 (362) 46 05 71
                  </a>
                  <div style={{ fontSize: '12px', color: '#555' }}>Бухгалтерія та документообіг</div>
                </div>

              </div>
            </div>

            {/* Card 3: Emails */}
            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e5e5e5',
              padding: '20px 24px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={20} color="var(--wd-primary-color)" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>Електронна пошта:</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="mailto:info@agrorentex.com" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--wd-primary-color)' }}>
                  info@agrorentex.com
                </a>
                <a href="mailto:agrorentex@ukr.net" style={{ fontSize: '14px', color: '#666' }}>
                  agrorentex@ukr.net
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            padding: '32px 28px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            height: 'fit-content'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>
                Надіслати повідомлення
              </h3>
              <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                Заповніть форму, і наш спеціаліст зв'яжеться з Вами протягом 15 хвилин.
              </p>
            </div>

            {submitted ? (
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                padding: '24px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={40} color="#16a34a" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                  Дякуємо! Ваше повідомлення надіслано
                </h4>
                <p style={{ fontSize: '14px', color: '#166534', margin: '0 0 16px 0' }}>
                  Менеджер AGRO RENTEX уже обробляє запит і зателефонує вам найближчим часом.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-adena-secondary"
                  style={{ fontSize: '13px', padding: '8px 16px' }}
                >
                  Надіслати ще одне повідомлення
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>
                    Ваше ім'я *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Наприклад: Олександр"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      border: '1px solid #d2d2d2',
                      fontSize: '14px',
                      borderRadius: '4px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>
                    Номер телефону *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+38 (0__) ___ __ __"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      border: '1px solid #d2d2d2',
                      fontSize: '14px',
                      borderRadius: '4px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>
                    Тема звернення
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      border: '1px solid #d2d2d2',
                      fontSize: '14px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="Підбір техніки">Купівля / підбір техніки</option>
                    <option value="Замовлення запчастин">Замовлення запчастин та роликів</option>
                    <option value="Ремонт транспортерів">Ремонт та реставрація транспортерів</option>
                    <option value="Сервісне обслуговування">Виїзний сервіс та ТО</option>
                    <option value="Інше питання">Інше запитання</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>
                    Коментар або запитання
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Вкажіть модель техніки, необхідні параметри або площу..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #d2d2d2',
                      fontSize: '14px',
                      borderRadius: '4px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-adena-primary"
                  style={{
                    height: '48px',
                    fontSize: '15px',
                    fontWeight: 600,
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '4px'
                  }}
                >
                  <Send size={16} />
                  <span>{loading ? 'Надсилання...' : 'Отримати консультацію'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

        {/* 3. Interactive Map & Driving Directions */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>
              Як до нас проїхати?
            </h2>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Наша база розташована на трасі Київ-Чоп біля Рівного (с. Колоденка, вул. Свободи 26). Зручний заїзд для вантажного транспорту та тралів.
            </p>
          </div>

          <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            height: '400px',
            position: 'relative'
          }}>
            <iframe
              title="AGRO RENTEX Карта проїзду"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.1068832049257!2d26.31162531573357!3d50.58430097949399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f137e0e7a83d7%3A0xb5e73e9e1c258d4a!2z0YPQuy4g0KHQstC-0LHQvtC00YssIDI2LCDQmtC-0LvQvtC00LXQvdC60LAsINCg0L7QstC10L3RgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgMzUzMDY!5e0!3m2!1suk!2sua!4v1679000000000!5m2!1suk!2sua"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
