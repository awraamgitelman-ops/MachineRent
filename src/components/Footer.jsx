import React from 'react';
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '24px' }}>⚙️</span>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#111' }}>
                ADENA<span style={{ color: 'var(--wd-primary-color)' }}>AGRO</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#666', marginBottom: '14px' }}>
              Adena Agro – ваш надійний партнер у світі сільськогосподарської техніки та комплектуючих для картоплі, моркви, цукрового буряку та цибулі.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4>Каталог техніки</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="/product-category/field" style={{ color: '#555' }}>Польова техніка для овочів</a></li>
              <li><a href="/product-category/skladska-tehnika" style={{ color: '#555' }}>Складська та сортувальна техніка</a></li>
              <li><a href="/product-category/zapchastyny" style={{ color: '#555' }}>Запасні частини та ролики</a></li>
              <li><a href="/remont-transporteriv" style={{ color: '#555' }}>Ремонт транспортерів</a></li>
              <li><a href="/product-category/tehnika-b-v" style={{ color: '#555' }}>Техніка Б/В з Європи</a></li>
            </ul>
          </div>

          {/* Col 3: Services & Navigation */}
          <div>
            <h4>Послуги та сервіс</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenQuickLead('Підбір техніки'); }} style={{ color: '#555' }}>Індивідуальний підбір техніки</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenQuickLead('Доставка тралом'); }} style={{ color: '#555' }}>Доставка по всій Україні</a></li>
              <li><a href="/remont-transporteriv" style={{ color: '#555' }}>Реставрація гумово-пруткових стрічок</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenQuickLead('Сервісне ТО'); }} style={{ color: '#555' }}>Виїзний сервіс та консультації</a></li>
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--wd-primary-color)" />
                <a href="tel:+380966610100" style={{ fontWeight: 600, color: '#111' }}>+38 (096) 66 10 100</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--wd-primary-color)" />
                <a href="tel:+380950706877" style={{ fontWeight: 600, color: '#111' }}>+38 (095) 07 06 877</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={15} color="#888" />
                <span>Пн-Сб: 08:00 — 19:00 (у сезон 24/7)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="adena-footer-bottom">
          <div>
            © 2026 Adena Agro. Всі права захищено. Сільськогосподарська техніка для овочівництва.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#888' }}>Політика конфіденційності</a>
            <a href="#" style={{ color: '#888' }}>Публічна оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
