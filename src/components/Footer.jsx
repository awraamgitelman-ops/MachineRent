import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer({ onOpenQuickLead }) {
  return (
    <footer className="adena-footer">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px'
        }}>
          
          {/* Col 1: About & Logo */}
          <div>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>
                AGRO<span style={{ color: 'var(--wd-primary-color)' }}>RENTEX</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#666', marginBottom: '14px' }}>
              AGRORENTEX: ваш надійний партнер у світі спеціалізованої сільськогосподарської техніки та комплектуючих для картоплі, моркви, цукрового буряку та цибулі.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4>Каталог техніки</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><Link to="/product-category/field" style={{ color: '#555' }}>Польова техніка для овочів</Link></li>
              <li><Link to="/product-category/zhatky-zernovi" style={{ color: '#555' }}>Жатки зернові та соєві</Link></li>
              <li><Link to="/product-category/skladska-tehnika" style={{ color: '#555' }}>Складська та сортувальна техніка</Link></li>
              <li><Link to="/product-category/zapchastyny" style={{ color: '#555' }}>Запасні частини та ролики</Link></li>
              <li><Link to="/remont-transporteriv" style={{ color: '#555' }}>Ремонт транспортерів</Link></li>
              <li><Link to="/product-category/tehnika-b-v" style={{ color: '#555' }}>Техніка Б/В з Європи</Link></li>
            </ul>
          </div>

          {/* Col 3: Services & Navigation */}
          <div>
            <h4>Послуги та компанія</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><Link to="/about-us" style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Про компанію AGRORENTEX</Link></li>
              <li><Link to="/contact-us" style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Контакти та схема проїзду</Link></li>
              <li><Link to="/blog" style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Публікації та блог</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenQuickLead('Підбір техніки'); }} style={{ color: '#555' }}>Індивідуальний підбір техніки</a></li>
              <li><Link to="/remont-transporteriv" style={{ color: '#555' }}>Реставрація гумово-пруткових стрічок</Link></li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <h4>Контакти</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>35306, Україна, м.Рівне, с.Колоденка, вул.Свободи 26</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Phone size={15} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href="tel:+380966610100" style={{ fontWeight: 600, color: '#111', textDecoration: 'none' }}>+38 (096) 66 10 100</a>
                  <div style={{ fontSize: '11px', color: '#777' }}>Відділ продажу та оренди</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={15} color="#888" />
                <span>Пн-Сб: 08:00 - 19:00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="adena-footer-bottom">
          <div>
            © 2026 AGRORENTEX. Всі права захищено. Сільськогосподарська техніка для овочівництва.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/privacy-policy" style={{ color: '#888', textDecoration: 'none' }}>Політика конфіденційності</Link>
            <Link to="/public-offer" style={{ color: '#888', textDecoration: 'none' }}>Публічна оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
