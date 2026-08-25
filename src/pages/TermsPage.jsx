import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, CheckCircle2, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { setPageSeo } from '../utils/seo';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Правила та умови користування сайтом | AGRORENTEX",
      "url": "https://agrorentex.com/terms",
      "description": "Правила та умови використання онлайн-сервісу AGRORENTEX. Оператор платформи: ТОВ «КОМБАЙН АГРО».",
      "publisher": {
        "@type": "Organization",
        "name": "AGRORENTEX",
        "url": "https://agrorentex.com"
      }
    };

    setPageSeo({
      title: 'Правила та умови | AGRORENTEX',
      description: 'Ознайомтеся з правилами та умовами користування онлайн-платформою AGRORENTEX. Оператор платформи: ТОВ «КОМБАЙН АГРО» (код ЄДРПОУ 43584638).',
      canonicalUrl: 'https://agrorentex.com/terms',
      schemaData
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', paddingBottom: '60px' }}>
      
      {/* 1. Breadcrumbs */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777', gap: '6px' }}>
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaa" />
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Правила та умови</span>
        </div>
      </div>

      {/* 2. Content Container */}
      <div className="container" style={{ maxWidth: '900px', paddingTop: '40px' }}>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#fff4eb',
          color: 'var(--wd-primary-color)',
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: 700,
          marginBottom: '16px',
          borderLeft: '3px solid var(--wd-primary-color)'
        }}>
          <FileText size={18} />
          <span>Умови використання сервісу</span>
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#111111',
          lineHeight: 1.25,
          marginBottom: '12px'
        }}>
          Правила та умови користування сервісом
        </h1>
        
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px' }}>
          Дата набрання чинності: 20 серпня 2026 року | Чинна редакція
        </p>

        <div style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: '#333333',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px'
        }}>

          {/* Section 1 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              1. Загальні положення та оператор сервісу
            </h2>
            <p>
              Ці Правила та умови (надалі — «Умови») регулюють порядок використання веб-сайту <strong>https://agrorentex.com/</strong> (надалі — «Сайт») та онлайн-сервісів під брендом <strong>AGRORENTEX</strong>.
            </p>
            <p style={{ backgroundColor: '#f9f9f9', padding: '16px 20px', borderLeft: '4px solid var(--wd-primary-color)', marginTop: '12px' }}>
              Оператором онлайн-платформи та каталогу техніки <strong>AGRORENTEX</strong> є <strong>ТОВ «КОМБАЙН АГРО»</strong> (код ЄДРПОУ: <strong>43584638</strong>).
            </p>
            <p style={{ marginTop: '12px' }}>
              Відвідуючи Сайт, переглядаючи каталог сільськогосподарської техніки, оформлюючи онлайн-заявки або звертаючись за консультацією, Користувач погоджується дотримуватися цих Умов у повному обсязі.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              2. Інформаційний статус та зміст сайту
            </h2>
            <p>
              2.1. Вся інформація, розміщена на Сайті (включаючи описи сільгоспмашин, технічні специфікації, наявність на складі та орієнтовні тарифи), носить інформаційно-ознайомчий характер.
            </p>
            <p>
              2.2. Остаточні умови придбання, оренди чи сервісного обслуговування техніки визначаються в індивідуальних договорах, рахунках-фактурах та відповідно до чинного <strong><Link to="/public-offer" style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Договору публічної оферти</Link></strong>.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              3. Оформлення заявок та користування каталогом
            </h2>
            <p>
              3.1. Користувач має право ознайомлюватися з каталогом техніки, використовувати пошукові фільтри, формувати запити на консультацію та розрахунок вартості оренди або доставки.
            </p>
            <p>
              3.2. При заповненні контактних форм Користувач зобов'язується надавати достовірну інформацію для оперативного зв'язку менеджера та підбору техніки.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              4. Інтелектуальна власність
            </h2>
            <p>
              Всі текстові матеріали, фотографії техніки, графічні елементи, логотипи та програмний код Сайту є власністю сервісу AGRORENTEX або використовуються на законних підставах. Будь-яке копіювання чи розповсюдження матеріалів без письмової згоди правовласника заборонено.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              5. Конфіденційність та захист даних
            </h2>
            <p>
              Обробка персональних даних Користувачів здійснюється відповідно до Закону України «Про захист персональних даних» та умов нашої <strong><Link to="/privacy-policy" style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Політики конфіденційності</Link></strong>.
            </p>
          </section>

          {/* Section 6 */}
          <section style={{ backgroundColor: '#fafafa', border: '1px solid #e5e5e5', padding: '24px', borderRadius: '0px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '12px' }}>
              6. Зворотний зв'язок
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <div><strong>Оператор платформи:</strong> ТОВ «КОМБАЙН АГРО» (код ЄДРПОУ 43584638)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--wd-primary-color)" />
                <span>Юр. адреса: 49000, м. Дніпро, вул. Калинова, 49, кв. 189 | Відділ продажу: 49051, м. Дніпро, вул. Курсантська, 3</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--wd-primary-color)" />
                <a href="tel:+380970079746" style={{ color: '#111', fontWeight: 600 }}>+38 (097) 007-97-46</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--wd-primary-color)" />
                <a href="mailto:agrorentex@gmail.com" style={{ color: 'var(--wd-primary-color)' }}>agrorentex@gmail.com</a>
              </div>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
