import React, { useState } from 'react';
import { 
  Truck, 
  Wrench, 
  Satellite, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

export default function AgroServices({ onOpenQuickLead }) {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'logistics',
      title: 'Негабаритні перевезення важким тралом',
      badge: 'Власний автопарк',
      icon: <Truck size={32} color="#10b981" />,
      description: 'Доставка важких гусеничних комбайнів, широкозахватних сівалок та тракторів вагою до 60 тонн у будь-яку точку України. Оформлення спецдозволів та супровід пілот-авто.',
      features: [
        'Низькорамні платформи Faymonville та Goldhofer',
        'Подача тралу на поле протягом 12-24 годин',
        'Повне страхування вантажу під час транспортування',
        'Гідравлічні трапи для швидкого заїзду техніки'
      ],
      priceText: 'від 75 ₴/км з ПДВ'
    },
    {
      id: 'service24',
      title: 'Мобільний сервіс та ремонт у полі 24/7',
      badge: 'Реакція до 2 годин',
      icon: <Wrench size={32} color="#f59e0b" />,
      description: '12 виїзних сервісних екіпажів, укомплектованих оригінальним діагностичним обладнанням John Deere Service ADVISOR, Grimme Visual Protect та складом швидкозношуваних деталей.',
      features: [
        'Діагностика гідравліки, електроніки та двигунів у полі',
        'Оригінальні масла та фільтри з допуском виробника',
        'Підмінний фонд агрегатів на випадок складного ремонту',
        'Калібрування та налаштування норми висіву'
      ],
      priceText: 'Безкоштовно при оренді техніки'
    },
    {
      id: 'precision_rtk',
      title: 'RTK навігація & Точне землеробство',
      badge: 'Точність +/- 2 см',
      icon: <Satellite size={32} color="#60a5fa" />,
      description: 'Підключення вашого господарства до високоточної мережі базових станцій RTK. Картування врожайності, диференційоване внесення добрив та автопілоти для зменшення перекриттів.',
      features: [
        'Повна сумісність з John Deere GS4, Trimble, Topcon',
        'Створення карт завдань під конкретне насіння та КАС',
        'Економія посівного матеріалу та ЗЗР до 12-15%',
        'Хмарна телеметрія та звіти для агронома в режимі онлайн'
      ],
      priceText: 'від 35 ₴/га'
    },
    {
      id: 'turnkey_harvest',
      title: 'Збирання врожаю «Під ключ» (Аутсорсинг)',
      badge: 'Повний цикл',
      icon: <Sparkles size={32} color="#ec4899" />,
      description: 'Комплексне проведення збиральної кампанії зернових, соняшнику, кукурудзи та картоплі власними комбайнами Claas Lexion та Grimme SE з логістикою зерновозами на елеватор.',
      features: [
        'До 12 одиниць комбайнів на одне поле одночасно',
        'Втрати зерна менше 0.5% завдяки системі CEMOS',
        'Цілодобова робота у 2 зміни (до 500 га/доба)',
        'Бункери-перевантажувачі для роботи без зупинок'
      ],
      priceText: 'від 2 400 ₴/га'
    }
  ];

  return (
    <section style={{
      padding: '72px 0',
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0c1612 100%)',
      borderTop: '1px solid var(--border-light)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px auto' }}>
          <div className="badge badge-gold" style={{ marginBottom: '12px', fontSize: '13px' }}>
            <Zap size={14} />
            <span>КОМПЛЕКСНІ АГРОНОМІЧНІ РІШЕННЯ</span>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', color: '#ffffff' }}>
            Супутні Послуги та Інженерний Супровід
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>
            Ми надаємо не просто техніку в оренду, а забезпечуємо повний технологічний ланцюг: 
            від перевезення тралом до налаштування систем точного землеробства та цілодобового сервісу.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border-light)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-light)'
                  }}>
                    {service.icon}
                  </div>
                  <span className="badge badge-dark" style={{ fontSize: '11px', fontWeight: 700 }}>
                    {service.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px', color: '#ffffff', lineHeight: 1.3 }}>
                  {service.title}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '18px' }}>
                  {service.description}
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#34d399', marginBottom: '8px' }}>
                    Переваги сервісу:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {service.features.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Вартість:</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#fbbf24' }}>
                    {service.priceText}
                  </span>
                </div>

                <button
                  onClick={() => onOpenQuickLead(service.title)}
                  className="btn btn-outline"
                  style={{ width: '100%', fontSize: '13px', fontWeight: 700, padding: '10px' }}
                >
                  <span>Замовити послугу</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Agro Hotline Callout */}
        <div className="glass-panel" style={{
          padding: '24px 32px',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              Потрібен індивідуальний розрахунок на посівний сезон або жнива?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Наші головні агрономи та логісти підберуть оптимальну зчіпку машин під тип вашого ґрунту та рельєф.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onOpenQuickLead('Комплексна консультація агронома')}
              className="btn btn-primary btn-lg"
              style={{ fontWeight: 700 }}
            >
              Замовити аудит поля
            </button>
            <a
              href="tel:+380966610100"
              className="btn btn-outline btn-lg"
              style={{ borderColor: '#34d399', color: '#34d399', fontWeight: 700 }}
            >
              <PhoneCall size={16} />
              <span>+38 (096) 66 10 100</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
