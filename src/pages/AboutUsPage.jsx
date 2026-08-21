import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { setPageSeo } from '../utils/seo';

export default function AboutUsPage({ onOpenQuickLead }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Про компанію AGRORENTEX",
      "url": "https://agrorentex.com/about-us",
      "description": "AGRORENTEX: спеціалізована компанія з оренди, продажу та сервісу техніки для овочівництва, зернових жаток, складських ліній та ремонту транспортерів в Україні.",
      "publisher": {
        "@type": "Organization",
        "name": "AGRORENTEX",
        "url": "https://agrorentex.com"
      }
    };

    setPageSeo({
      title: 'Про компанію AGRORENTEX | Спеціалізація, оренда та продаж с/г техніки',
      description: 'AGRORENTEX: оренда та продаж техніки для овочівництва, картоплярства, зернових жаток, ліній фасування Domasz, склад запчастин та реставрація транспортерів.',
      canonicalUrl: 'https://agrorentex.com/about-us',
      ogImage: '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dMAgIBHVAgFR8KIEgPEAAWTGBSUlEZGHpUV1pXUkI.webp',
      schemaData
    });
  }, []);

  // 5 Main Core Specializations
  const specializations = [
    {
      id: 'field',
      badge: 'Повний цикл',
      title: 'Техніка для овочівництва та картоплярства',
      desc: 'Повний комплекс машин від підготовки ґрунту до збирання врожаю без пошкоджень.',
      bullets: [
        'Посадка та фрезерування: саджалки, гребнеутворювачі Grimme, Struik, Cramer, Hassia',
        'Збирання: комбайни картопляні та бурякові Grimme, Ropa, Holmer, Bolko, Wuhlmaus',
        'Бадилляподрібнювачі 2-х та 4-рядні для підготовки поля до копання'
      ],
      link: '/product-category/field',
      linkText: 'Переглянути польову техніку'
    },
    {
      id: 'zhatky',
      badge: 'Оренда та продаж',
      title: 'Жатки для зернових та зернобобових культур',
      desc: 'Оригінальні широкозахватні та флекс-жатки для збирання зернових, сої, ріпаку та гороху.',
      bullets: [
        'Флекс-жатки: John Deere HydraFlex (635F, 630F, 625F), Case IH Flex (1020, 2020)',
        'Стрічкові полотняні жатки (Draper) та стрічкові системи CLAAS MAXFLO',
        'Спеціальні приставки для збирання сої та гороху Flex Ettaro та жатки ЖУ-6, ЖЗБ'
      ],
      link: '/product-category/zhatky-zernovi',
      linkText: 'Каталог зернових жаток'
    },
    {
      id: 'warehouse',
      badge: 'Для овочесховищ',
      title: 'Складське та пакувальне обладнання',
      desc: 'Автоматизовані лінії післязбиральної доробки, інспекції, очищення та фасування овочів.',
      bullets: [
        'Приймальні бункери та розвантажувачі контейнерів (Grimme RH, Domasz)',
        'Системи сухої чистки, калібрувальні радіальні та роликові столи, щітки, мийки',
        'Вагопакувальні машини та станції зашивання в сітку та мішки (Domasz, Sormac)'
      ],
      link: '/product-category/skladska-tehnika',
      linkText: 'Складське обладнання'
    },
    {
      id: 'parts',
      badge: 'Власний склад',
      title: 'Оригінальні запчастини та комплектуючі',
      desc: 'Постійна наявність швидкозношуваних деталей для європейських машин на складі у Рівному.',
      bullets: [
        'Пруткові транспортери для всіх типів комбайнів Grimme, Bolko, Anna, Karlik',
        'Опорні та підтримуючі ролики, приводні зірочки, замки стрічок, шківи та вали',
        'Швидка відправка в день замовлення по всій Україні'
      ],
      link: '/product-category/zapchastyny',
      linkText: 'Каталог запчастин'
    },
    {
      id: 'remont',
      badge: 'Сертифікований сервіс',
      title: 'Реставрація транспортерів та польовий сервіс',
      desc: 'Власний виробничий цех з відновлення гумово-пруткових транспортерних стрічок.',
      bullets: [
        'Ремонт та реставрація транспортерів будь-якого кроку (економія до 50%)',
        'Виїзні мобільні сервісні бригади для діагностики та налаштування техніки в полі',
        'Доставка великогабаритних машин власними низькорамними тралами'
      ],
      link: '/remont-transporteriv',
      linkText: 'Послуги ремонту транспортерів'
    }
  ];

  // Specific facts & stats
  const companyStats = [
    { value: '150+', label: 'Одиниць техніки та обладнання в каталозі' },
    { value: 'Власний цех', label: 'Реставрація та ремонт транспортерних стрічок' },
    { value: 'Трал-доставка', label: 'Оперативне транспортування по всій Україні' },
    { value: '100%', label: 'Передпродажна дефектовка та тест у полі' }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', paddingBottom: '60px' }}>
      
      {/* 1. Breadcrumbs Header */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777', gap: '6px' }}>
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaa" />
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Про компанію</span>
        </div>
      </div>

      {/* 2. Hero Section: Exact What We Do */}
      <section className="container" style={{ paddingTop: '44px', paddingBottom: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: '44px',
          alignItems: 'center',
          ...(window.innerWidth < 880 ? { gridTemplateColumns: '1fr', gap: '30px' } : {})
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 800,
              lineHeight: 1.25,
              color: '#111111',
              marginBottom: '18px'
            }}>
              Чим займається компанія AGRORENTEX
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#333', marginBottom: '14px', fontWeight: 500 }}>
              <strong>AGRORENTEX</strong>: це спеціалізована українська платформа з <strong>оренди, продажу та сервісного обслуговування</strong> професійної сільськогосподарської та складської техніки.
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#555', marginBottom: '24px' }}>
              Ми забезпечуємо агропідприємства та фермерські господарства України надійними машинами для повного циклу вирощування овочів і зернових: від посадки та збирання комбайнами до післязбиральної доробки, фасування у сховищах та відновлення зношених вузлів.
            </p>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenQuickLead('Підбір техніки для овочівництва')}
                className="btn-adena-primary"
                style={{ height: '48px', padding: '0 24px', fontWeight: 700, fontSize: '14px' }}
              >
                <span>Замовити консультацію</span>
              </button>
              <a
                href="tel:+380966610100"
                className="btn-adena-secondary"
                style={{ height: '48px', padding: '0 20px', fontWeight: 700, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <Phone size={16} color="var(--wd-primary-color)" />
                <span>+38 (096) 66 10 100</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '0px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f8f8f8'
            }}>
              <img
                src="/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dMAgIBHVAgFR8KIEgPEAAWTGBSUlEZGHpUV1pXUkI.webp"
                alt="AGRORENTEX Сільськогосподарська техніка"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Numbers & Facts Bar */}
      <section style={{ backgroundColor: '#1d1d1d', color: '#ffffff', padding: '36px 0', borderTop: '4px solid var(--wd-primary-color)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            textAlign: 'center'
          }}>
            {companyStats.map((st, idx) => (
              <div key={idx} style={{ padding: '8px 12px' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--wd-accent-yellow)', marginBottom: '4px' }}>
                  {st.value}
                </div>
                <div style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.4 }}>
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core 5 Specializations (Concrete Breakdown) */}
      <section className="container" style={{ paddingTop: '56px', paddingBottom: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--wd-primary-color)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            Напрямки діяльності
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>
            5 ключових спеціалізацій AGRORENTEX
          </h2>
          <p style={{ fontSize: '15px', color: '#666', maxWidth: '720px', margin: '0 auto' }}>
            Конкретний перелік категорій техніки, брендів та інженерних послуг, які ми надаємо аграріям України:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {specializations.map((spec, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '0px',
                padding: '28px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                display: 'grid',
                gridTemplateColumns: '1.8fr 1fr',
                gap: '28px',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                ...(window.innerWidth < 900 ? { gridTemplateColumns: '1fr', gap: '16px' } : {})
              }}
            >
              {/* Description & Title */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--wd-primary-color)',
                    backgroundColor: '#fff4eb',
                    padding: '3px 10px',
                    borderRadius: '0px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    #{idx + 1} • {spec.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
                  {spec.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '14px' }}>
                  {spec.desc}
                </p>

                {/* Specific Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {spec.bullets.map((b, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#444' }}>
                      <span style={{ color: 'var(--wd-primary-color)', fontWeight: 700, fontSize: '14px', lineHeight: '18px' }}>•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Column */}
              <div style={{
                borderLeft: '1px solid #f0f0f0',
                paddingLeft: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '12px',
                ...(window.innerWidth < 900 ? { borderLeft: 'none', paddingLeft: 0, borderTop: '1px solid #f0f0f0', paddingTop: '16px' } : {})
              }}>
                <button
                  onClick={() => onOpenQuickLead(`Консультація: ${spec.title}`)}
                  className="btn-adena-primary"
                  style={{ width: '100%', height: '42px', fontSize: '13px', fontWeight: 700 }}
                >
                  Замовити прорахунок
                </button>
                <Link
                  to={spec.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--wd-primary-color)',
                    textDecoration: 'none',
                    padding: '6px 0'
                  }}
                >
                  <span>{spec.linkText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Base & Logistics */}
      <section style={{ backgroundColor: '#fafafa', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', padding: '48px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '36px',
            alignItems: 'center',
            ...(window.innerWidth < 800 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111', marginBottom: '14px' }}>
                Майданчик, склад та логістика
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#555', marginBottom: '16px' }}>
                Виставковий майданчик, склад запасних частин та сервісний цех реставрації транспортерів AGRORENTEX розташовані за адресою:
              </p>
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                padding: '16px 20px',
                borderRadius: '0px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <MapPin size={22} color="var(--wd-primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '15px', color: '#111', display: 'block', marginBottom: '2px' }}>
                    35306, Україна, Рівненська обл., м. Рівне, с. Колоденка, вул. Свободи 26
                  </strong>
                  <span style={{ fontSize: '13px', color: '#666' }}>
                    Графік роботи: Пн-Сб 08:00 - 19:00
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#444' }}>
                <Truck size={18} color="var(--wd-primary-color)" />
                <span>Доставка великогабаритної техніки низькорамними тралами у господарство по всій Україні</span>
              </div>
            </div>

            {/* Direct Contact Box */}
            <div style={{
              backgroundColor: '#1d1d1d',
              color: '#ffffff',
              padding: '30px',
              borderRadius: '0px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--wd-accent-yellow)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Прямий зв'язок з відділом продажу та оренди
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
                Потрібен точний підбір під ваше поле?
              </h3>
              <a
                href="tel:+380966610100"
                style={{
                  display: 'block',
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'var(--wd-accent-yellow)',
                  marginBottom: '16px',
                  textDecoration: 'none'
                }}
              >
                +38 (096) 66 10 100
              </a>
              <button
                onClick={() => onOpenQuickLead('Підбір техніки для овочівництва')}
                className="btn-adena-primary"
                style={{ width: '100%', height: '46px', fontWeight: 700, fontSize: '14px' }}
              >
                Замовити консультацію
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
