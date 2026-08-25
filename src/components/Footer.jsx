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
              <span>35306, Україна, м. Рівне, с. Колоденка, вул. Свободи 26</span>
            </div>

            {/* Contacts list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <a href="tel:+380966610100" style={{ fontSize: '15px', fontWeight: 700, color: '#111111', textDecoration: 'none' }}>
                  +38 (096) 66 10 100
                </a>
                <span style={{ fontSize: '12px', color: '#777777' }}>Відділ продажу та оренди</span>
              </li>

              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="var(--wd-primary-color)" style={{ flexShrink: 0 }} />
                <a href="mailto:info@agrorentex.com" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--wd-primary-color)', textDecoration: 'none' }}>
                  info@agrorentex.com
                </a>
              </li>

              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#777777' }}>
                <Clock size={15} color="#888888" style={{ flexShrink: 0 }} />
                <span>Пн-Сб: 08:00 - 19:00, Неділя: за домовленістю</span>
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
            2026 | AGRORENTEX. Всі права захищені · ТОВ «КОМБАЙН АГРО» (код ЄДРПОУ 43584638)
          </div>
          <div style={{ fontSize: '13px', color: '#888888', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>Офіційний сервіс, оренда та продаж с/г техніки в Україні</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
