import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Phone, 
  DollarSign, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  Layers,
  Settings,
  HelpCircle,
  Truck
} from 'lucide-react';
import { MACHINERY_DATA } from '../data/machineryData';
import MachineryCard from '../components/MachineryCard';

export default function RemontPage({ currency, onOpenQuickLead }) {
  // Calculator state for custom conveyor repair
  const [pitchMm, setPitchMm] = useState('28');
  const [lengthM, setLengthM] = useState('5.5');
  const [widthMm, setWidthMm] = useState('750');
  const [needsRods, setNeedsRods] = useState(true);
  const [calcResult, setCalcResult] = useState(null);

  const calculateRepairCost = (e) => {
    e.preventDefault();
    const l = parseFloat(lengthM) || 5;
    const w = parseFloat(widthMm) || 750;
    const baseBelt = l * 2800;
    const rodsCost = needsRods ? (l * 1000 / (parseInt(pitchMm) || 30)) * 95 : 0;
    const workCost = 4500 + (l * 600);
    const totalUah = Math.round(baseBelt + rodsCost + workCost);
    const newEquivalentUah = Math.round(totalUah * 2.1);
    const savingsUah = newEquivalentUah - totalUah;

    setCalcResult({
      totalUah,
      newEquivalentUah,
      savingsUah
    });
  };

  // Relevant spare parts & conveyors from catalog
  const repairParts = MACHINERY_DATA.filter(m => 
    m.machineryType === 'parts' || 
    m.name.toLowerCase().includes('транспортер') ||
    m.name.toLowerCase().includes('пас') ||
    m.name.toLowerCase().includes('ролик')
  ).slice(0, 4);

  const supportedBrands = [
    { name: 'Grimme', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-2.png' },
    { name: 'AVR', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-3.png' },
    { name: 'Asa-Lift', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-5.png' },
    { name: 'Dewulf', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-14.png' },
    { name: 'Simon', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-9.png' },
    { name: 'Hassia', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-11.png' },
    { name: 'Wuhlmaus', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-13.png' },
    { name: 'Ropa', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-12-1.png' },
    { name: 'Holmer', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-21.png' },
    { name: 'Guaresi', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-18.png' },
    { name: 'Amac', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-12.png' },
    { name: 'Pomac', logo: 'https://adenaagro.com/wp-content/uploads/2024/02/brend-15-1.png' },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      
      {/* 1. Breadcrumbs */}
      <div style={{ backgroundColor: '#f7f7f7', borderBottom: '1px solid #e5e5e5', padding: '14px 0' }}>
        <div className="container">
          <nav style={{ fontSize: '13px', color: '#777', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/" style={{ color: '#555', fontWeight: 500 }}>Головна</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#111', fontWeight: 600 }}>Ремонт транспортерів</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section style={{
        backgroundColor: '#161616',
        color: '#ffffff',
        padding: '60px 0 70px 0',
        backgroundImage: 'linear-gradient(rgba(20, 20, 20, 0.88), rgba(20, 20, 20, 0.92)), url(https://adenaagro.com/wp-content/uploads/2024/02/remont-1500-x-754-pyks.-1000-x-800-pyks.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '4px solid var(--wd-primary-color)'
      }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(247, 206, 52, 0.15)',
            border: '1px solid var(--wd-accent-yellow)',
            color: 'var(--wd-accent-yellow)',
            padding: '6px 16px',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            <Sparkles size={16} />
            <span>Унікальна послуга в Україні – Економія до 50%</span>
          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: 1.25,
            color: '#ffffff',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            Ремонт та реставрація гумово-пруткових транспортерів
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#e0e0e0',
            maxWidth: '820px',
            margin: '0 auto 32px auto',
            lineHeight: 1.6
          }}>
            Професійне відновлення просіваючих, гичковидаляючих та завантажувальних транспортерів для картопле- та бурякозбиральних комбайнів <strong>Grimme, AVR, Dewulf, Asa-Lift, Holmer, Ropa, Simon</strong>.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#remont-calc"
              className="btn-adena-primary"
              style={{ height: '50px', padding: '0 30px', fontSize: '15px', fontWeight: 700 }}
              onClick={(e) => {
                const el = document.getElementById('remont-calc');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Розрахувати вартість ремонту
            </a>

            <button
              onClick={() => onOpenQuickLead('Заявка на ремонт транспортера')}
              className="btn-adena-secondary"
              style={{ height: '50px', padding: '0 26px', fontSize: '15px', fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              Замовити консультацію інженера
            </button>
          </div>

        </div>
      </section>

      {/* 3. Value Pillars («Чому є сенс замовити ремонт транспортерів?») */}
      <section style={{ padding: '60px 0', backgroundColor: '#fcfcfc', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '13px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Переваги реставрації
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111', marginTop: '4px' }}>
              Чому є сенс замовити ремонт транспортера у нас?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            ...(window.innerWidth < 960 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Card 1 */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', padding: '30px 24px' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#fff6f0', color: 'var(--wd-primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <DollarSign size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
                Економія 50% бюджету
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Новий оригінальний європейський транспортер коштує від 120 000 до 350 000 грн. Якісна заміна стрічок та прутків коштує вдвічі дешевше при збереженні повного ресурсу.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', padding: '30px 24px' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#eefcf1', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Clock size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
                Швидкість (3-5 днів)
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Доставка нового транспортера з Європи в розпал сезону займає 3-6 тижнів простою техніки. Ми відновлюємо транспортер за 3-5 робочих днів на власній виробничій базі в Рівному.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', padding: '30px 24px' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#fffdf0', color: '#b28600', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '10px' }}>
                Гарантія якості та геометрії
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Використовуємо лише високоміцні армовані німецькі та голландські стрічки, оригінальні заклепки та сталеві прутки зі збереженням точного заводського кроку.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Supported Brands Row */}
      <section style={{ padding: '44px 0', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Бренди техніки, транспортери яких ми відновлюємо
            </h3>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            {supportedBrands.map((b) => (
              <div
                key={b.name}
                style={{
                  padding: '12px 18px',
                  backgroundColor: '#f8f8f8',
                  border: '1px solid #e8e8e8',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#333'
                }}
              >
                {b.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Before / After Comparison */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Результат роботи
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111', marginTop: '4px' }}>
              До ремонту / Після ремонту
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            ...(window.innerWidth < 768 ? { gridTemplateColumns: '1fr' } : {})
          }}>
            
            {/* Box Before */}
            <div style={{ border: '2px solid #ef4444', padding: '20px', backgroundColor: '#fffbfb' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#ef4444', color: '#fff', padding: '4px 12px', fontSize: '13px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase' }}>
                ❌ До ремонту
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#444' }}>
                <li>• Розриви та стирання зубчастих гумових стрічок</li>
                <li>• Погнуті, тріснуті або зношені сталеві прутки</li>
                <li>• Люфт і зрив з'єднувальних замків</li>
                <li>• Перекіс транспортера і пошкодження роликів комбайна</li>
              </ul>
            </div>

            {/* Box After */}
            <div style={{ border: '2px solid #10b981', padding: '20px', backgroundColor: '#f6fdf9' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#fff', padding: '4px 12px', fontSize: '13px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase' }}>
                ✅ Після реставрації
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#444' }}>
                <li>• Нові армовані стрічки з точним заводським кроком (28/32/35/40/45 мм)</li>
                <li>• Рівні загартовані прутки з надійним клепанням</li>
                <li>• Нові замки та захисні вулканізовані накладки</li>
                <li>• 100% готовність до сезону з гарантією виробника</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Online Repair Cost Calculator */}
      <section id="remont-calc" style={{ padding: '60px 0', backgroundColor: '#fafafa', borderBottom: '1px solid #eaeaea' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#111', margin: 0 }}>
              Калькулятор прорахунку реставрації транспортера
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '6px' }}>
              Вкажіть параметри вашого транспортера для попереднього розрахунку вартості
            </p>
          </div>

          <form 
            onSubmit={calculateRepairCost}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              padding: '28px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>
                  Крок прутків (мм):
                </label>
                <select
                  value={pitchMm}
                  onChange={(e) => setPitchMm(e.target.value)}
                  style={{ width: '100%', height: '42px', border: '1px solid #ccc', padding: '0 12px', fontSize: '14px' }}
                >
                  <option value="28">28 мм</option>
                  <option value="32">32 мм</option>
                  <option value="35">35 мм</option>
                  <option value="40">40 мм</option>
                  <option value="45">45 мм</option>
                  <option value="50">50 мм</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>
                  Ширина транспортера (мм):
                </label>
                <select
                  value={widthMm}
                  onChange={(e) => setWidthMm(e.target.value)}
                  style={{ width: '100%', height: '42px', border: '1px solid #ccc', padding: '0 12px', fontSize: '14px' }}
                >
                  <option value="600">600 мм</option>
                  <option value="650">650 мм</option>
                  <option value="750">750 мм</option>
                  <option value="800">800 мм</option>
                  <option value="900">900 мм</option>
                  <option value="1500">1500 мм</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>
                Довжина транспортера по колу (метрів):
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="25"
                value={lengthM}
                onChange={(e) => setLengthM(e.target.value)}
                style={{ width: '100%', height: '42px', border: '1px solid #ccc', padding: '0 12px', fontSize: '14px' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={needsRods}
                  onChange={(e) => setNeedsRods(e.target.checked)}
                />
                <span>Потрібна повна заміна сталевих прутків</span>
              </label>
            </div>

            <button type="submit" className="btn-adena-primary" style={{ width: '100%', height: '46px', fontWeight: 700, fontSize: '15px' }}>
              Розрахувати орієнтовну вартість
            </button>

            {calcResult && (
              <div style={{ marginTop: '24px', padding: '18px', backgroundColor: '#f6fdf9', border: '1px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#444' }}>Вартість реставрації транспортера:</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#10b981' }}>{calcResult.totalUah.toLocaleString()} грн</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#777' }}>Вартість нового аналога з Європи:</span>
                  <span style={{ fontSize: '14px', color: '#888', textDecoration: 'line-through' }}>{calcResult.newEquivalentUah.toLocaleString()} грн</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #d1fae5', paddingTop: '8px' }}>
                  <strong style={{ fontSize: '14px', color: '#111' }}>Ваша економія:</strong>
                  <strong style={{ fontSize: '16px', color: 'var(--wd-price-red)' }}>~ {calcResult.savingsUah.toLocaleString()} грн (50%)</strong>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenQuickLead(`Замовлення ремонту транспортера (${lengthM}м, крок ${pitchMm}мм)`)}
                  className="btn-adena-secondary"
                  style={{ width: '100%', marginTop: '14px', height: '42px', fontWeight: 600 }}
                >
                  Оформити заявку на ремонт за цією ціною
                </button>
              </div>
            )}
          </form>

        </div>
      </section>

      {/* 7. Ready-made Components & Spare Parts */}
      <section style={{ padding: '50px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111', margin: 0 }}>
              Комплектуючі та готові транспортери в наявності
            </h2>
            <Link to="/product-category/zapchastyny" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--wd-primary-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Всі запчастини</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="products-bordered-grid">
            {repairParts.map((machine) => (
              <MachineryCard
                key={machine.id}
                machine={machine}
                currency={currency}
                onSelectMachine={() => {}}
                onQuickBook={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Callout Banner */}
      <section style={{
        backgroundColor: '#1d1d1d',
        color: '#ffffff',
        padding: '44px 0',
        borderTop: '3px solid var(--wd-accent-yellow)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#ffffff', margin: '0 0 6px 0' }}>
              Бажаєте відправити транспортер на дефектовку?
            </h3>
            <p style={{ fontSize: '14px', color: '#bbb', margin: 0 }}>
              Приймаємо транспортери перевізниками (Нова Пошта, Делівері, САТ) з усіх областей України.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <a
              href="tel:+380966610100"
              style={{
                color: 'var(--wd-accent-yellow)',
                fontSize: '18px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Phone size={20} />
              <span>+38 (096) 66 10 100</span>
            </a>

            <button
              onClick={() => onOpenQuickLead('Дефектовка транспортера')}
              className="btn-adena-primary"
              style={{ height: '44px', padding: '0 24px', fontWeight: 700 }}
            >
              Замовити дефектовку
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
