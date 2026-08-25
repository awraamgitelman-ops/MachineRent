import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer({ onOpenQuickLead }) {
  return (
    <footer className="adena-footer">
      <div className="container">
        
        {/* Main 3-Column Footer Grid (Exact structure from template) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '40px',
          ...(window.innerWidth < 880 ? { gridTemplateColumns: '1fr', gap: '32px' } : {})
        }}>
          
          {/* Column 1: Brand Info, Description & Contacts */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#111111', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                  AGRO<span style={{ color: 'var(--wd-primary-color)' }}>RENTEX</span>
                </span>
              </Link>
            </div>

            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#555555', marginBottom: '12px' }}>
              <strong>AGRORENTEX</strong>: ваш надійний партнер у світі сільськогосподарської техніки для картоплі, моркви, цукрового буряку та цибулі.
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#666666', marginBottom: '18px' }}>
              <MapPin size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>49051, Україна, м. Дніпро, вул. Курсантська, 3</span>
            </div>

            {/* Contacts list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <a href="tel:+380970079746" style={{ fontSize: '15px', fontWeight: 700, color: '#111111', textDecoration: 'none' }}>
                  +38 (097) 007-97-46
                </a>
                <span style={{ fontSize: '12px', color: '#777777' }}>Відділ продажу та оренди</span>
              </li>

              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <a href="mailto:agrorentex@gmail.com" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--wd-primary-color)', textDecoration: 'none' }}>
                  agrorentex@gmail.com
                </a>
              </li>

              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#777777' }}>
                <Clock size={15} color="#888888" style={{ flexShrink: 0 }} />
                <span>Пн-Сб: 08:00 - 19:00, Неділя: за домовленістю</span>
              </li>

              {/* Gray WhatsApp Button */}
              <li style={{ marginTop: '4px' }}>
                <a 
                  href="https://wa.me/380970079746"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#f3f4f6',
                    color: '#4b5563',
                    border: '1px solid #d1d5db',
                    padding: '7px 14px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    borderRadius: '0px',
                    transition: 'all 0.2s ease',
                    width: 'fit-content'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                    e.currentTarget.style.color = '#111827';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.color = '#4b5563';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Написати у WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Navigation / "Про нас" */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '18px' }}>
              Про нас
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <Link to="/" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/blog" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Публікації
                </Link>
              </li>
              <li>
                <Link to="/about-us" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Про нас
                </Link>
              </li>
              <li>
                <Link to="/contact-us" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Контакти
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Політика конфіденційності
                </Link>
              </li>
              <li>
                <Link to="/terms" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Правила та умови
                </Link>
              </li>
              <li>
                <Link to="/public-offer" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Публічна оферта
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Catalog Categories / "Наші товари" */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '18px' }}>
              Наші товари
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <Link to="/product-category/field" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Польова техніка
                </Link>
              </li>
              <li>
                <Link to="/product-category/zhatky-zernovi" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Жатки зернові
                </Link>
              </li>
              <li>
                <Link to="/product-category/skladska-tehnika" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Складська техніка
                </Link>
              </li>
              <li>
                <Link to="/product-category/zapchastyny" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Запасні частини
                </Link>
              </li>
              <li>
                <Link to="/remont-transporteriv" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Ремонт транспортерів
                </Link>
              </li>
              <li>
                <Link to="/product-category/tehnika-b-v" style={{ color: '#555555', transition: 'color 0.2s ease' }}>
                  Техніка Б/В
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer Bar */}
        <div className="adena-footer-bottom">
          <div style={{ fontSize: '13px', color: '#777777' }}>
            2026 | AGRORENTEX. Всі права захищені
          </div>
          <div style={{ fontSize: '13px', color: '#888888', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>Офіційний сервіс, оренда та продаж с/г техніки в Україні</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
