import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Lock, FileText, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { setPageSeo } from '../utils/seo';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Політика конфіденційності | AGRORENTEX",
      "url": "https://agrorentex.com/privacy-policy",
      "description": "Політика конфіденційності та захисту персональних даних компанії AGRORENTEX.",
      "publisher": {
        "@type": "Organization",
        "name": "AGRORENTEX",
        "url": "https://agrorentex.com"
      }
    };

    setPageSeo({
      title: 'Політика конфіденційності | AGRORENTEX',
      description: 'Ознайомтеся з Політикою конфіденційності та захисту персональних даних AGRORENTEX відповідно до законодавства України.',
      canonicalUrl: 'https://agrorentex.com/privacy-policy',
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
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Політика конфіденційності</span>
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
          <ShieldCheck size={18} />
          <span>Захист персональних даних</span>
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#111111',
          lineHeight: 1.25,
          marginBottom: '12px'
        }}>
          Політика конфіденційності та захисту інформації
        </h1>
        
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px' }}>
          Дата набрання чинності: 20 серпня 2026 року | Версія 1.4
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
              1. Загальні положення
            </h2>
            <p>
              Ця Політика конфіденційності (надалі: «Політика») розроблена відповідно до Закону України «Про захист персональних даних» № 2297-VI та встановлює порядок отримання, збору, накопичення, зберігання, обробки, використання та захисту персональних даних користувачів веб-сайту <strong>https://agrorentex.com/</strong> (надалі: «Сайт»), володільцем якого є <strong>Товариство з обмеженою відповідальністю «КОМБАЙН АГРО»</strong> (код ЄДРПОУ: <strong>43584638</strong>, що здійснює діяльність під сервісним брендом <strong>AGRORENTEX</strong>).
            </p>
            <p>
              Використовуючи Сайт, замовляючи консультацію, оренду чи купівлю техніки або залишаючи контактні дані у формах зворотного зв'язку, Користувач підтверджує свою повну та беззастережну згоду з умовами цієї Політики.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              2. Склад та категорії персональних даних
            </h2>
            <p>
              AGRORENTEX може збирати та обробляти такі категорії персональних даних Користувачів:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Прізвище, ім'я, по батькові контактної особи чи представника підприємства;</li>
              <li>Номер контактного мобільного телефону;</li>
              <li>Адреса електронної пошти (E-mail);</li>
              <li>Назва фермерського господарства або юридичної особи;</li>
              <li>Географічний регіон доставки чи виконання польових робіт (область, населений пункт);</li>
              <li>Технічні дані запиту (модель техніки, бажаний період оренди, площа обробітку, потреба в операторі чи тралі).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              3. Мета та цілі обробки персональних даних
            </h2>
            <p>
              Персональні дані Користувачів збираються виключно для таких цілей:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Надання вичерпних консультацій щодо технічних характеристик польової, збиральної та складської техніки;</li>
              <li>Розрахунок вартості купівлі, доставки або тарифів сезонної/подобової оренди с/г агрегатів;</li>
              <li>Оформлення договорів купівлі-продажу, надання послуг або оренди техніки;</li>
              <li>Координація виїзду інженерно-сервісної служби AGRORENTEX у господарство замовника;</li>
              <li>Інформування про надходження нових партій запчастин, комплектуючих та сезонні спеціальні пропозиції.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              4. Захист та безпека персональних даних
            </h2>
            <p>
              AGRORENTEX застосовує комплекс сучасних правових, організаційних та технічних заходів безпеки для захисту персональних даних від несанкціонованого або випадкового доступу, знищення, перекручення, блокування чи копіювання.
            </p>
            <p>
              Ми гарантуємо, що персональні дані не передаються, не продаються та не розголошуються третім особам, окрім випадків, прямо передбачених чинним законодавством України або за явною згодою самого суб'єкта даних (наприклад, службам доставки вантажів або перевізникам тралом).
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              5. Права суб'єкта персональних даних
            </h2>
            <p>
              Відповідно до статті 8 Закону України «Про захист персональних даних», Користувач має право:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Знати про джерела збору, місцезнаходження своїх даних та мету їх обробки;</li>
              <li>Отримувати інформацію про умови надання доступу до персональних даних;</li>
              <li>Пред'являти вмотивовану вимогу щодо зміни або знищення своїх персональних даних;</li>
              <li>Відкликати згоду на обробку персональних даних у будь-який момент шляхом письмового звернення.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              6. Використання файлів Cookie
            </h2>
            <p>
              Сайт використовує файли Cookie (кукі) для забезпечення коректної роботи фільтрів каталогу, збереження вибраних параметрів валюти та збору знеособленої статистики відвідувань (наприклад, Google Analytics) з метою покращення зручності користування інтерфейсом.
            </p>
          </section>

          {/* Section 7 */}
          <section style={{ backgroundColor: '#fafafa', border: '1px solid #e5e5e5', padding: '24px', borderRadius: '0px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '12px' }}>
              7. Контактна інформація володільця даних
            </h2>
            <p style={{ marginBottom: '12px' }}>
              Володільцем бази персональних даних користувачів Сайту є <strong>ТОВ «КОМБАЙН АГРО»</strong> (код ЄДРПОУ: <strong>43584638</strong>, торговельний знак <strong>AGRORENTEX</strong>). З усіх питань щодо зміни чи видалення персональних даних:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--wd-primary-color)" />
                <span>Юридична адреса та майданчик: 49051, Україна, Дніпропетровська обл., м. Дніпро, вул. Курсантська, 3</span>
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
