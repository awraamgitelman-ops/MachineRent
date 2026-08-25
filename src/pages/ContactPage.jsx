import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Send
} from 'lucide-react';
import { setPageSeo } from '../utils/seo';

export default function ContactPage({ onOpenQuickLead }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": "https://agrorentex.com/contact-us/#webpage",
          "url": "https://agrorentex.com/contact-us",
          "name": "Контакти компанії AGRORENTEX",
          "description": "Наші спеціалісти готові надати Вам професійну консультацію ᐉ Звертайтеся – і ми допоможемо знайти оптимальне рішення для вашого агробізнесу!",
          "isPartOf": {
            "@id": "https://agrorentex.com/#website"
          },
          "breadcrumb": {
            "@id": "https://agrorentex.com/contact-us/#breadcrumb"
          },
          "inLanguage": "uk"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://agrorentex.com/contact-us/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Головна",
              "item": "https://agrorentex.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Контакти"
            }
          ]
        },
        {
          "@type": "Organization",
          "@id": "https://agrorentex.com/#organization",
          "name": "AGRORENTEX",
          "url": "https://agrorentex.com/",
          "telephone": "+380970079746",
          "email": "agrorentex@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "вул. Курсантська, 3",
            "addressLocality": "м. Дніпро",
            "postalCode": "49051",
            "addressCountry": "UA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.499408,
            "longitude": 35.117782
          }
        }
      ]
    };

    setPageSeo({
      title: 'Контакти компанії AGRORENTEX',
      description: 'Наші спеціалісти готові надати Вам професійну консультацію ᐉ Звертайтеся – і ми допоможемо знайти оптимальне рішення для вашого агробізнесу!',
      canonicalUrl: 'https://agrorentex.com/contact-us',
      ogImage: '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dMAgIBHUYuCwsAJAQxAAAQQyQOBURSHXsdSh0CHkVTIxc.webp',
      schemaData
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Вкажіть ваше ім'я";
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || digitsOnly.length < 9) {
      newErrors.phone = "Це поле є обов'язковим";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});
    setLoading(true);

    try {
      await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          topic: 'Потрібна допомога у підборі (передфутер)',
          source: 'Сторінка контактів'
        })
      });
    } catch (err) {
      console.error('Failed to submit contact lead:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', company: '' });
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      
      {/* 1. Breadcrumbs Header */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777777', gap: '6px' }}>
          <Link to="/" style={{ color: '#333333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaaaaa" />
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Контакти</span>
        </div>
      </div>

      {/* 2. Main 2-Column Section (Exact structure matching Elementor f23fa09) */}
      <section className="container" style={{ paddingTop: '40px', paddingBottom: '48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          ...(window.innerWidth < 860 ? { gridTemplateColumns: '1fr', gap: '32px' } : {})
        }}>
          
          {/* Left Column: Контактна інформація (f33df43) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            <div>
              <h2 style={{
                fontSize: '26px',
                fontWeight: 700,
                color: '#111111',
                marginBottom: '20px',
                borderBottom: '2px solid var(--wd-primary-color)',
                paddingBottom: '8px',
                display: 'inline-block'
              }}>
                Контактна інформація
              </h2>
            </div>

            {/* Block 1: Головний офіс (1983187 / f0a2c02) */}
            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e5e5e5',
              padding: '24px',
              borderRadius: '0px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '10px' }}>
                Головний офіс
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#444444', marginBottom: '16px' }}>
                49051, Україна, м. Дніпро<br />вул. Курсантська, 3
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#fff4eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0px'
                  }}>
                    <Phone size={16} color="var(--wd-primary-color)" />
                  </div>
                  <a href="tel:+380970079746" style={{ fontSize: '15px', fontWeight: 700, color: '#111111', textDecoration: 'none' }}>
                    +38 (097) 007-97-46
                  </a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#fff4eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0px'
                  }}>
                    <Mail size={16} color="var(--wd-primary-color)" />
                  </div>
                  <a href="mailto:agrorentex@gmail.com" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--wd-primary-color)', textDecoration: 'none' }}>
                    agrorentex@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Block 2: Відділ продажів (f3bb01c / e269137) */}
            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e5e5e5',
              padding: '24px',
              borderRadius: '0px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '12px' }}>
                Відділ продажів та оренди:
              </h3>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#fff4eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0px'
                  }}>
                    <Phone size={16} color="var(--wd-primary-color)" />
                  </div>
                  <div>
                    <a href="tel:+380970079746" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--wd-primary-color)', textDecoration: 'none' }}>
                      +38 (097) 007-97-46
                    </a>
                    <div style={{ fontSize: '12px', color: '#666666' }}>
                      Підбір техніки, прорахунок оренди та запчастини
                    </div>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0px'
                  }}>
                    <Clock size={16} color="#666666" />
                  </div>
                  <div style={{ fontSize: '13px', color: '#555555' }}>
                    <strong>Графік роботи:</strong> Пн-Сб: 08:00 - 19:00, Неділя: за домовленістю
                  </div>
                </li>
              </ul>

              <div style={{ marginTop: '18px' }}>
                <button
                  onClick={() => onOpenQuickLead('Консультація зі сторінки контактів')}
                  className="btn-adena-primary"
                  style={{ width: '100%', height: '42px', fontSize: '14px', fontWeight: 700, borderRadius: '0px' }}
                >
                  Замовити швидку консультацію
                </button>
              </div>
            </div>

            {/* Block 3: Юридична інформація */}
            <div style={{
              backgroundColor: '#fafafa',
              border: '1px solid #e5e5e5',
              padding: '20px 24px',
              borderRadius: '0px',
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#555555'
            }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '8px' }}>
                Юридична інформація:
              </h3>
              <div style={{ marginBottom: '4px' }}>
                <strong style={{ color: '#222' }}>Оператор платформи:</strong> ТОВ «КОМБАЙН АГРО»
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong style={{ color: '#222' }}>Код ЄДРПОУ:</strong> 43584638
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong style={{ color: '#222' }}>Платник ПДВ:</strong> ІПН 435846304627
              </div>
              <div>
                <strong style={{ color: '#222' }}>Основний КВЕД:</strong> 77.31 (Оренда с/г машин та устатковання)
              </div>
            </div>

          </div>

          {/* Right Column: Як до нас проїхати? (84d384d / 0887dfe) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{
              fontSize: '26px',
              fontWeight: 700,
              color: '#111111',
              marginBottom: '20px',
              borderBottom: '2px solid var(--wd-primary-color)',
              paddingBottom: '8px',
              display: 'inline-block'
            }}>
              Як до нас проїхати?
            </h2>

            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '0px',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              flex: 1,
              minHeight: '400px',
              backgroundColor: '#f9f9f9'
            }}>
              <iframe
                title="49051, Україна, м. Дніпро, вул. Курсантська, 3"
                aria-label="49051, Україна, м. Дніпро, вул. Курсантська, 3"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px', display: 'block' }}
                loading="lazy"
                src="https://maps.google.com/maps?q=48.499408050344606%2C35.117782300424665+(AGRORENTEX)&t=m&z=16&output=embed&iwloc=near"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Pre-footer Consultation Banner (100% Full-Bleed 50/50 Split) */}
      <section style={{
        backgroundColor: '#262626',
        color: '#ffffff',
        width: '100%',
        marginTop: '56px',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '440px',
          alignItems: 'stretch',
          width: '100%',
          margin: 0,
          padding: 0,
          ...(window.innerWidth < 900 ? { gridTemplateColumns: '1fr' } : {})
        }}>
          
          {/* Left 50%: Full-bleed photo from screen edge to center */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '320px',
            overflow: 'hidden',
            backgroundColor: '#1d1d1d'
          }}>
            <img
              src="https://m-mts.ru/images/en655ujtat1i0j08fkqvhgj923e96479.jpg"
              alt="AGRORENTEX сільськогосподарська техніка"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
              onError={(e) => {
                e.target.src = '/assets/products/zhatky-dlya-kombajniv.webp';
              }}
            />
          </div>

          {/* Right 50%: Form with centered content box */}
          <div style={{
            padding: '56px 48px',
            backgroundColor: '#262626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            ...(window.innerWidth < 640 ? { padding: '36px 20px' } : {})
          }}>
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <div style={{ marginBottom: '22px' }}>
                <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.25 }}>
                  Потрібна допомога у підборі?
                </h3>
                <p style={{ fontSize: '14px', color: '#cccccc', margin: 0, lineHeight: 1.5 }}>
                  Наші спеціалісти готові надати Вам професійну консультацію. Звертайтеся!
                </p>
              </div>

              {submitted ? (
                <div style={{
                  backgroundColor: '#1f2937',
                  border: '1px solid var(--wd-primary-color)',
                  padding: '24px',
                  borderRadius: '0px',
                  textAlign: 'center'
                }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                    Дякуємо! Ваша заявка прийнята
                  </h4>
                  <p style={{ fontSize: '14px', color: '#d1d5db', margin: '0 0 16px 0' }}>
                    Менеджер зв'яжеться з Вами найближчим часом для надання повної консультації.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-adena-primary"
                    style={{ fontSize: '13px', padding: '8px 20px', borderRadius: '0px' }}
                  >
                    Надіслати ще раз
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Ваше ім'я"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      style={{
                        width: '100%',
                        height: '46px',
                        padding: '0 16px',
                        backgroundColor: '#ffffff',
                        border: formErrors.name ? '2px solid #ef4444' : '1px solid #ffffff',
                        color: '#111111',
                        fontSize: '14px',
                        borderRadius: '0px',
                        outline: 'none'
                      }}
                    />
                    {formErrors.name && (
                      <div style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>
                        {formErrors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="+38 (097) 007-97-46"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      style={{
                        width: '100%',
                        height: '46px',
                        padding: '0 16px',
                        backgroundColor: '#ffffff',
                        border: formErrors.phone ? '2px solid #ef4444' : '1px solid #ffffff',
                        color: '#111111',
                        fontSize: '14px',
                        borderRadius: '0px',
                        outline: 'none'
                      }}
                    />
                    {formErrors.phone && (
                      <div style={{ color: '#fca5a5', fontSize: '12px', marginTop: '4px' }}>
                        {formErrors.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Господарство / Підприємство (необов'язково)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        height: '46px',
                        padding: '0 16px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ffffff',
                        color: '#111111',
                        fontSize: '14px',
                        borderRadius: '0px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-adena-primary"
                    style={{
                      height: '48px',
                      fontSize: '15px',
                      fontWeight: 700,
                      width: '100%',
                      justifyContent: 'center',
                      borderRadius: '0px',
                      backgroundColor: 'var(--wd-primary-color)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      marginTop: '4px'
                    }}
                  >
                    <span>{loading ? 'Надсилання...' : 'Отримати консультацію'}</span>
                  </button>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
