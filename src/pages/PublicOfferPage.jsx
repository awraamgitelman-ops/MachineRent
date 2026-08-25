import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileCheck, Scale, ShieldCheck, Truck, Wrench, Phone, Mail, MapPin } from 'lucide-react';
import { setPageSeo } from '../utils/seo';

export default function PublicOfferPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Публічна оферта | AGRORENTEX",
      "url": "https://agrorentex.com/public-offer",
      "description": "Договір публічної оферти купівлі-продажу та оренди сільськогосподарської техніки AGRORENTEX.",
      "publisher": {
        "@type": "Organization",
        "name": "AGRORENTEX",
        "url": "https://agrorentex.com"
      }
    };

    setPageSeo({
      title: 'Публічна оферта | AGRORENTEX: Оренда та продаж с/г техніки',
      description: 'Офіційний договір публічної оферти компанії AGRORENTEX: умови придбання, оренди, доставки, гарантії та сервісного обслуговування с/г техніки.',
      canonicalUrl: 'https://agrorentex.com/public-offer',
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
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Публічна оферта</span>
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
          <Scale size={18} />
          <span>Юридична інформація</span>
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#111111',
          lineHeight: 1.25,
          marginBottom: '12px'
        }}>
          Договір публічної оферти
        </h1>
        
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px' }}>
          Дата публікації: 20 серпня 2026 року | Чинна редакція
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
              1. Загальні положення та правовий статус
            </h2>
            <p>
              Цей документ є офіційною публічною пропозицією (публічною офертою) <strong>Товариства з обмеженою відповідальністю «КОМБАЙН АГРО»</strong> (код ЄДРПОУ: <strong>43584638</strong>), що здійснює господарську та комерційну діяльність під торговельним знаком та онлайн-сервісом <strong>AGRORENTEX</strong> (надалі: «Виконавець» або «Продавець»), укласти договір купівлі-продажу сільськогосподарської техніки, обладнання, комплектуючих та/або договір про надання послуг оренди с/г та складської техніки на умовах, викладених нижче, відповідно до статей 633, 641 та 642 Цивільного кодексу України та Закону України «Про електронну комерцію».
            </p>
            <p>
              Оформлення заявки на Сайті <strong>https://agrorentex.com/</strong>, телефонне замовлення або оплата рахунку є повним та безумовним прийняттям (акцептом) умов цієї Оферти з боку фізичної чи юридичної особи (надалі: «Замовник» або «Покупець»).
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              2. Предмет договору
            </h2>
            <p>
              В порядку та на умовах, визначених цією Офертою, AGRORENTEX зобов'язується:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Продаж техніки та запчастин:</strong> передати у власність Замовника нову або перевірену Б/В польову, складську чи збиральну техніку, жатки, транспортери, ролики та оригінальні комплектуючі;</li>
              <li><strong>Оренда с/г техніки:</strong> надати Замовнику в тимчасове платне користування сільськогосподарську техніку (позмінно з екіпажем або без, погектарно або на визначений сезонний строк);</li>
              <li><strong>Послуги сервісу та відновлення:</strong> виконати роботи з реставрації транспортерних стрічок, дефектовки та польового обслуговування.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              3. Порядок оформлення замовлення та акцепт
            </h2>
            <p>
              3.1. Замовлення формується Замовником шляхом вибору необхідного товару чи послуги в каталозі на Сайті, заповнення онлайн-форми заявки або через узгодження специфікації з менеджером AGRORENTEX за контактними номерами телефонів.
            </p>
            <p>
              3.2. Факт надсилання заявки або підписання рахунку-фактури свідчить про ознайомлення Замовника з усіма технічними параметрами, умовами експлуатації та тарифами на обрану одиницю техніки.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              4. Вартість, порядок розрахунків та оплата
            </h2>
            <p>
              4.1. Ціни на товари та орендні тарифи зазначаються на Сайті або фіксуються в індивідуальній комерційній пропозиції/рахунку з урахуванням ПДВ.
            </p>
            <p>
              4.2. Оплата здійснюється у безготівковій формі на банківські реквізити AGRORENTEX згідно з виставленим рахунком або за іншою письмовою домовленістю сторін.
            </p>
            <p>
              4.3. При оренді техніки сторони можуть передбачати внесення гарантійного платежу або авансового платежу за узгоджену кількість робочих змін/гектарів.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              5. Доставка, прийом-передача та умови оренди
            </h2>
            <p>
              5.1. Доставка великогабаритної польової та збиральної техніки здійснюється спеціалізованими низькорамними тралами безпосередньо у господарство Замовника по всій території України або шляхом самовивозу з нашого майданчика (м. Дніпро, вул. Курсантська, 3).
            </p>
            <p>
              5.2. Приймання-передача техніки в оренду або у власність оформлюється відповідним Актом приймання-передачі із фіксацією технічного стану, комплектації та показників мотогодинника.
            </p>
            <p>
              5.3. Замовник зобов'язується забезпечити безпечні умови праці, якісне паливо відповідного класу (у разі «холодної оренди» без оператора) та дотримання регламенту експлуатації згідно з технічним паспортом машини.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
              6. Гарантійні зобов'язання та відповідальність
            </h2>
            <p>
              6.1. На всю нову техніку, обладнання складського зберігання та відреставровані транспортери AGRORENTEX надає офіційну гарантію відповідно до заводських нормативів.
            </p>
            <p>
              6.2. У разі виникнення технічної несправності в процесі оренди, сервісна служба AGRORENTEX забезпечує виїзд інженера для оперативної діагностики та усунення поломки або заміни агрегату.
            </p>
          </section>

          {/* Section 7 */}
          <section style={{ backgroundColor: '#fafafa', border: '1px solid #e5e5e5', padding: '24px', borderRadius: '0px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>
              7. Реквізити та контакти Виконавця
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '14px', lineHeight: 1.6 }}>
              <div>
                <div style={{ color: '#777', fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Юридична особа (Оператор платформи):</div>
                <strong style={{ color: '#111', fontSize: '15px' }}>ТОВ «КОМБАЙН АГРО»</strong>
                <div style={{ color: '#555', marginTop: '2px' }}>Торговельне найменування: <strong>AGRORENTEX</strong></div>
              </div>

              <div>
                <div style={{ color: '#777', fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Податковий статус та коди:</div>
                <div>Код ЄДРПОУ: <strong>43584638</strong></div>
                <div>ІПН / Платник ПДВ: <strong>435846304627</strong></div>
                <div>Основний КВЕД: <strong>77.31</strong> (Оренда с/г машин і устатковання)</div>
              </div>

              <div>
                <div style={{ color: '#777', fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Юридична адреса:</div>
                <div style={{ color: '#444' }}>49000, Україна, Дніпропетровська обл., місто Дніпро</div>
              </div>

              <div>
                <div style={{ color: '#777', fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Фактичний майданчик та сервіс:</div>
                <div style={{ color: '#444' }}>49051, Україна, Дніпропетровська обл., м. Дніпро, вул. Курсантська, 3</div>
              </div>

              <div>
                <div style={{ color: '#777', fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Контактні дані:</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="var(--wd-primary-color)" />
                  <a href="tel:+380970079746" style={{ color: '#111', fontWeight: 600 }}>+38 (097) 007-97-46</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <Mail size={14} color="var(--wd-primary-color)" />
                  <a href="mailto:agrorentex@gmail.com" style={{ color: 'var(--wd-primary-color)' }}>agrorentex@gmail.com</a>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
