import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  Truck, 
  Wrench, 
  Layers, 
  Cpu, 
  ArrowRight,
  Sparkles,
  Send
} from 'lucide-react';
import { setPageSeo } from '../utils/seo';

export default function AboutUsPage({ onOpenQuickLead }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Про компанію AGRO RENTEX",
      "url": "https://agrorentex.com/about-us",
      "description": "AGRO RENTEX – провідний постачальник спеціалізованої європейської сільськогосподарської та складської техніки для овочівництва в Україні.",
      "publisher": {
        "@type": "Organization",
        "name": "AGRO RENTEX",
        "url": "https://agrorentex.com"
      }
    };

    setPageSeo({
      title: 'Про нас | AGRO RENTEX – Професійна с/г техніка для овочівництва',
      description: 'Дізнайтеся більше про AGRO RENTEX: наш досвід, місія, широкий вибір європейської польової і складської техніки, реставрація транспортерів та якісний сервіс.',
      canonicalUrl: 'https://agrorentex.com/about-us',
      ogImage: 'https://adenaagro.com/wp-content/uploads/2025/01/farmer-adena-768x511.webp',
      schemaData
    });
  }, []);

  const advantages = [
    {
      icon: <Layers size={28} color="var(--wd-primary-color)" />,
      title: 'Широкий асортимент',
      desc: 'Повний спектр техніки для обробки ґрунту, гребнеутворення, посадки, міжрядного обробітку, збирання врожаю та складського зберігання.'
    },
    {
      icon: <Cpu size={28} color="var(--wd-primary-color)" />,
      title: 'Якісні запчастини',
      desc: 'Постійна наявність на складі оригінальних та якісних аналогових комплектуючих для комбайнів Grimme, Struik, AVR, Dewulf, Anna, Karlik.'
    },
    {
      icon: <Truck size={28} color="var(--wd-primary-color)" />,
      title: 'Техніка з Європи (Б/В)',
      desc: 'Ретельно перевірені та підготовлені до роботи машини з Європи за доступними цінами з можливістю демонстрації та запуску в полі.'
    },
    {
      icon: <Users size={28} color="var(--wd-primary-color)" />,
      title: 'Професійна підтримка',
      desc: 'Кваліфіковані консультації інженерів з 30-річним практичним досвідом вирощування овочів для точного вибору під ваші ґрунти.'
    },
    {
      icon: <Wrench size={28} color="var(--wd-primary-color)" />,
      title: 'Власне виробництво та сервіс',
      desc: 'Складське обладнання, перекидачі контейнерів, фасувальні лінії, а також професійне виготовлення та реставрація транспортерів.'
    }
  ];

  const offers = [
    {
      title: 'Польова техніка для овочів',
      desc: 'Агрегати для обробки ґрунту, посадки та збирання картоплі, моркви, буряку та цибулі.',
      link: '/product-category/field',
      img: 'https://adenaagro.com/wp-content/uploads/2025/01/polyova_tehnika-300x300.webp'
    },
    {
      title: 'Складська та сортувальна техніка',
      desc: 'Приймальні бункери, сортувальні машини, щіткові столи, мийки, вагопакувальні станції.',
      link: '/product-category/skladska-tehnika',
      img: 'https://adenaagro.com/wp-content/uploads/2025/01/skladska_tehnika-1-300x300.webp'
    },
    {
      title: 'Техніка Б/В з Європи',
      desc: 'Надійні комбайни та агрегати в ідеальному технічному стані з гарантією працездатності.',
      link: '/product-category/tehnika-b-v',
      img: 'https://adenaagro.com/wp-content/uploads/2025/01/technika_bu-1-300x300.webp'
    },
    {
      title: 'Запасні частини та комплектуючі',
      desc: 'Ролики, зірочки, приводні паси, вали та ремені завжди в наявності на нашому складі.',
      link: '/product-category/zapchastyny',
      img: 'https://adenaagro.com/wp-content/uploads/2025/01/zapchastunu-1-300x300.webp'
    },
    {
      title: 'Ремонт транспортерів',
      desc: 'Швидка реставрація та заміна гумово-пруткових стрічок будь-якого кроку. Економія до 50%.',
      link: '/remont-transporteriv',
      img: 'https://adenaagro.com/wp-content/uploads/2025/01/remont-transporteriv-1-300x300.webp'
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', paddingBottom: '60px' }}>
      
      {/* 1. Breadcrumbs Header */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777', gap: '6px' }}>
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaa" />
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Про нас</span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '48px',
          alignItems: 'center',
          ...(window.innerWidth < 860 ? { gridTemplateColumns: '1fr', gap: '30px' } : {})
        }}>
          <div>
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
              marginBottom: '14px',
              borderLeft: '3px solid var(--wd-primary-color)'
            }}>
              <span>Про компанію AGRO RENTEX</span>
            </div>

            <h1 style={{
              fontSize: '34px',
              fontWeight: 700,
              lineHeight: 1.25,
              color: '#111111',
              marginBottom: '20px'
            }}>
              Ваш надійний партнер у сфері овочівництва та агротехніки
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#444', marginBottom: '16px' }}>
              Ласкаво просимо до <strong>AGRO RENTEX</strong>! Ми – злагоджена команда професіоналів, яка спеціалізується на забезпеченні сучасних аграріїв високоефективною європейською технікою, оригінальними запчастинами та сервісним обладнанням.
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#666', marginBottom: '24px' }}>
              Ми допомагаємо оптимізувати всі виробничі цикли: від первинної підготовки ґрунту та посадки до безтравматичного збирання, інспекції, калібрування, сортування, мийки та пакування овочевих культур.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenQuickLead('Консультація про компанію')}
                className="btn-adena-primary"
                style={{ height: '48px', padding: '0 24px', fontWeight: 600, fontSize: '14px' }}
              >
                <Send size={16} />
                <span>Отримати консультацію</span>
              </button>
              <a
                href="tel:+380966610100"
                className="btn-adena-secondary"
                style={{ height: '48px', padding: '0 20px', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Phone size={16} color="var(--wd-primary-color)" />
                <span>+38 (096) 66 10 100</span>
              </a>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f8f8f8'
            }}>
              <img
                src="https://adenaagro.com/wp-content/uploads/2025/01/farmer-adena-768x511.webp"
                alt="AGRO RENTEX Техніка в полі"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission Box */}
      <section style={{ backgroundColor: '#f9f9f9', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: '960px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
            Наша місія
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#444', margin: '0 auto' }}>
            Ми прагнемо допомогти кожному українському фермеру оптимізувати технологічні процеси, мінімізувати втрати врожаю, скоротити собівартість та отримати максимальний прибуток. Завдяки надійним інженерним рішенням, сучасному обладнанню та професійному сервісу ми підтримуємо вас на кожному етапі агровиробництва.
          </p>
        </div>
      </section>

      {/* 4. Why Choose Us (5 Grid Cards) */}
      <section className="container" style={{ paddingTop: '56px', paddingBottom: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111', marginBottom: '10px' }}>
            Чому обирають саме AGRO RENTEX?
          </h2>
          <p style={{ fontSize: '15px', color: '#666', maxWidth: '680px', margin: '0 auto' }}>
            Комплексний підхід, європейські стандарти надійності та щоденна турбота про ваш результат.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e8e8e8',
                padding: '28px 24px',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ marginBottom: '16px' }}>{adv.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
                {adv.title}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#555', margin: 0 }}>
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. What We Offer (Category Cards Grid) */}
      <section style={{ backgroundColor: '#fafafa', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111', marginBottom: '10px' }}>
              Що ми пропонуємо
            </h2>
            <p style={{ fontSize: '15px', color: '#666' }}>
              Повний спектр техніки, обладнання та послуг для успішного агробізнесу
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '20px'
          }}>
            {offers.map((off, idx) => (
              <div
                key={idx}
                onClick={() => navigate(off.link)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e2e2',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--wd-primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e2e2'}
              >
                <div>
                  <div style={{
                    width: '110px',
                    height: '110px',
                    margin: '0 auto 16px auto',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#f6f6f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={off.img}
                      alt={off.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '8px', lineHeight: 1.3 }}>
                    {off.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5, marginBottom: '16px' }}>
                    {off.desc}
                  </p>
                </div>

                <div style={{
                  color: 'var(--wd-primary-color)',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}>
                  <span>Переглянути</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Approach */}
      <section className="container" style={{ padding: '56px 15px' }}>
        <div style={{
          backgroundColor: '#1d1d1d',
          color: '#ffffff',
          padding: '44px 36px',
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '36px',
          alignItems: 'center',
          ...(window.innerWidth < 800 ? { gridTemplateColumns: '1fr' } : {})
        }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Наш підхід до кожного клієнта
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#ccc', marginBottom: '20px' }}>
              Ми цінуємо довіру кожного агровиробника і завжди прагнемо запропонувати найкращі та економічно обґрунтовані рішення для вашого господарства. Ваш успіх – це і наш успіх!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--wd-accent-yellow)" />
                <span>Індивідуальний розрахунок продуктивності під ваші площі</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--wd-accent-yellow)" />
                <span>Передпродажна діагностика та пусконалагодження в полі</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--wd-accent-yellow)" />
                <span>Офіційна гарантія та оперативна доставка запчастин</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#262626',
            border: '1px solid #383838',
            padding: '24px',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
              Потрібна допомога у підборі?
            </h3>
            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '18px' }}>
              Зв'яжіться з нашими експертами для отримання професійної консультації.
            </p>
            <a
              href="tel:+380966610100"
              style={{
                display: 'block',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--wd-accent-yellow)',
                marginBottom: '14px',
                textDecoration: 'none'
              }}
            >
              +38 (096) 66 10 100
            </a>
            <button
              onClick={() => onOpenQuickLead('Підбір техніки (сторінка Про нас)')}
              className="btn-adena-primary"
              style={{ width: '100%', height: '44px', fontWeight: 600, fontSize: '14px' }}
            >
              Замовити дзвінок
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
