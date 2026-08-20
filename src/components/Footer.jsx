import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer({ onOpenQuickLead, onOpenCalculator }) {
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
              Adena Agro – ваш надійний партнер у світі оренди та обслуговування сільськогосподарської техніки для картоплі, моркви, цукрового буряку та цибулі.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4>Каталог техніки</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="#main-catalog" style={{ color: '#555' }}>Польова техніка для овочів</a></li>
              <li><a href="#main-catalog" style={{ color: '#555' }}>Підготовка ґрунту (фрези Struik)</a></li>
              <li><a href="#main-catalog" style={{ color: '#555' }}>Картоплесаджалки Grimme</a></li>
              <li><a href="#main-catalog" style={{ color: '#555' }}>Подрібнювачі бадилля GLUTTON</a></li>
              <li><a href="#main-catalog" style={{ color: '#555' }}>Збиральні комбайни Grimme & Dewulf</a></li>
            </ul>
          </div>

          {/* Col 3: Services & Navigation */}
          <div>
            <h4>Послуги & Оренда</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onOpenCalculator(); }} style={{ color: '#555' }}>
                  Калькулятор вартості робіт
                </a>
              </li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenQuickLead('Оренда з оператором'); }} style={{ color: '#555' }}>Оренда з екіпажем механізаторів</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenQuickLead('Доставка тралом'); }} style={{ color: '#555' }}>Доставка низькорамним тралом</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenQuickLead('Ремонт транспортерів'); }} style={{ color: '#555' }}>Ремонт транспортерів</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenQuickLead('Сервісне ТО'); }} style={{ color: '#555' }}>Виїзний сервіс 24/7</a></li>
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
            <a href="#" style={{ color: '#888' }}>Договір оренди</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
