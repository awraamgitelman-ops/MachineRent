import React from 'react';
import { 
  Tractor, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText,
  Send,
  MessageSquare
} from 'lucide-react';
import { AGRO_HUBS } from '../data/hubsData';

export default function Footer({ onOpenQuickLead, onOpenCalculator }) {
  return (
    <footer style={{
      backgroundColor: '#050907',
      borderTop: '1px solid var(--border-light)',
      color: 'var(--text-muted)',
      paddingTop: '64px',
      paddingBottom: '32px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '36px',
          marginBottom: '48px'
        }}>
          
          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Tractor size={22} />
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                AGRORENT <span style={{ color: '#fbbf24', fontSize: '13px' }}>PRO</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
              Національний оператор оренди важкої сільськогосподарської техніки та овочевих комплексів. 
              Офіційний парк техніки Grimme, Struik, John Deere, Claas, Dewulf.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#34d399',
                  textDecoration: 'none'
                }}
                title="Telegram канал"
              >
                <Send size={16} />
              </a>

              <a
                href="viber://chat"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a78bfa',
                  textDecoration: 'none'
                }}
                title="Viber підтримка"
              >
                <MessageSquare size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              Каталог техніки
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#catalog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🥔 Картопляна та овочева техніка Grimme</a></li>
              <li><a href="#catalog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🚜 Важкі гусеничні та колісні трактори</a></li>
              <li><a href="#catalog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🌾 Зернозбиральні комбайни Claas Lexion</a></li>
              <li><a href="#catalog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🌱 Сівалки точного висіву Horsch Maestro</a></li>
              <li><a href="#catalog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>💧 Самохідні обприскувачі Horsch Leeb</a></li>
              <li><a href="#catalog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>⚙️ Фрези та гребенеутворювачі Struik FLKB</a></li>
            </ul>
          </div>

          {/* Col 3: Regional Hubs */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              Логістичні хаби
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              {AGRO_HUBS.map((hub) => (
                <li key={hub.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color="#10b981" />
                  <span>{hub.city} — <strong>{hub.availableUnits} од.</strong></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts & Hotlines */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              Цілодобова диспетчерська
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Phone size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '16px' }}>0 800 339 420</div>
                  <div style={{ fontSize: '11px', color: '#34d399' }}>Безкоштовно по всій Україні (24/7)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--text-muted)" />
                <span>+380 (44) 390-44-10 (Офіс Київ)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--text-muted)" />
                <span>rent@agrorent.ua</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} color="var(--text-muted)" />
                <span>Виїзд сервісу та подача тралів — 24/7</span>
              </div>

              <button
                onClick={() => onOpenQuickLead('Дзвінок диспетчера')}
                className="btn btn-outline btn-sm"
                style={{ marginTop: '8px', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }}
              >
                Замовити зворотний дзвінок
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px'
        }}>
          <div>
            © 2026 AGRORENT PRO (ТОВ «АГРО-МАШИН-РЕНТ»). ЄДРПОУ 44928103. Платник ПДВ на загальних підставах.
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Політика конфіденційності</span>
            <span>Типовий договір оренди техніки</span>
            <span>Страховий поліс КАСКО</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
