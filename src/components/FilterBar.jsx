import React from 'react';

export default function FilterBar({
  activityType,
  setActivityType,
  machineryType,
  setMachineryType,
  selectedBrand,
  setSelectedBrand,
  selectedModel,
  setSelectedModel,
  selectedServiceType,
  setSelectedServiceType,
  sortBy,
  setSortBy,
  totalFilteredCount,
  onResetFilters
}) {
  const activities = [
    { id: 'all', name: 'Вид с/г діяльності' },
    { id: 'potato', name: 'Вирощування картоплі (23)' },
    { id: 'carrot', name: 'Вирощування моркви (15)' },
    { id: 'onion', name: 'Вирощування цибулі (15)' },
    { id: 'beet', name: 'Вирощування цукрового буряку (14)' },
    { id: 'grain', name: 'Зернові та кукурудза (12)' },
  ];

  const types = [
    { id: 'all', name: 'Тип техніки' },
    { id: 'haulm', name: 'Видалення бадилля (4)' },
    { id: 'harvest', name: 'Збір врожаю (4)' },
    { id: 'tillage', name: 'Підготовка грунту (13)' },
    { id: 'planting', name: 'Посадка/Посів (5)' },
    { id: 'spraying', name: 'Обприскування та внесення КАС (3)' },
    { id: 'tractors', name: 'Важкі тягові трактори (4)' },
  ];

  const brands = [
    { id: 'all', name: 'Марка' },
    { id: 'Grimme', name: 'Grimme (2)' },
    { id: 'Struik', name: 'Struik (15)' },
    { id: 'Baselier', name: 'Baselier (2)' },
    { id: 'Dewulf', name: 'DeWulf (2)' },
    { id: 'John Deere', name: 'John Deere (3)' },
    { id: 'Fendt', name: 'Fendt (2)' },
    { id: 'Claas', name: 'Claas (2)' },
    { id: 'Horsch', name: 'Horsch (3)' },
    { id: 'Lemken', name: 'Lemken (2)' },
    { id: 'ZIBO', name: 'ZIBO (1)' },
    { id: 'Інше', name: 'Інше (6)' },
  ];

  const models = [
    { id: 'all', name: 'Модель' },
    { id: 'GL 32E', name: 'GL 32E (1)' },
    { id: 'FLKB', name: 'FLKB (1)' },
    { id: 'GLUTTON', name: 'GLUTTON (1)' },
    { id: 'ROW-FIX', name: 'ROW-FIX (2)' },
    { id: 'LKB-Shift 1500', name: 'LKB-Shift 1500 (1)' },
    { id: 'BIOROTIX', name: 'BIOROTIX (1)' },
    { id: 'VariX', name: 'VariX (5)' },
    { id: 'Weed-Master', name: 'Weed-Master (1)' },
    { id: 'WR', name: 'WR (1)' },
    { id: 'ZF', name: 'ZF (1)' },
    { id: 'SE-260', name: 'SE-260 (1)' },
    { id: '8RX 410', name: '8RX 410 (1)' },
    { id: '1050 Vario', name: '1050 Vario (1)' },
    { id: 'Lexion 8800', name: 'Lexion 8800 (1)' },
    { id: 'Maestro 16 SV', name: 'Maestro 16 SV (1)' },
    { id: 'Leeb PT', name: 'Leeb 8.300 PT (1)' },
  ];

  const serviceTypes = [
    { id: 'all', name: 'Тип запчастини / Послуги' },
    { id: 'operator', name: 'З екіпажем операторів' },
    { id: 'trall', name: 'З доставкою тралом' },
    { id: 'parts', name: 'Робочі органи & комплектуючі' },
  ];

  const isFiltered = activityType !== 'all' || 
                     machineryType !== 'all' || 
                     selectedBrand !== 'all' || 
                     selectedModel !== 'all' || 
                     (selectedServiceType && selectedServiceType !== 'all');

  return (
    <div id="main-catalog" className="wpf-filters">
      <div className="container">
        <h2>Оберіть значення у фільтрі товарів</h2>
        <p>Знайдіть ваш товар за даними критеріями:</p>

        {/* 5-Column Filter Grid */}
        <div className="wpfMainWrapper">
          
          {/* 1. Activity Type */}
          <div>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="wpf-select"
            >
              {activities.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          {/* 2. Machinery Type */}
          <div>
            <select
              value={machineryType}
              onChange={(e) => setMachineryType(e.target.value)}
              className="wpf-select"
            >
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* 3. Brand */}
          <div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="wpf-select"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* 4. Model */}
          <div>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="wpf-select"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* 5. Service / Parts */}
          <div>
            <select
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
              className="wpf-select"
            >
              {serviceTypes.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Shop Loop Head Bar */}
        <div className="shop-loop-head" style={{ marginTop: '24px' }}>
          <div className="woocommerce-result-count">
            Відображаються усі з <strong>{totalFilteredCount} результатів</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {isFiltered && (
              <button
                onClick={onResetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--wd-primary-color)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Скинути фільтри
              </button>
            )}

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '6px 12px',
                border: '1px solid #d2d2d2',
                background: '#ffffff',
                fontFamily: 'inherit',
                fontSize: '13px',
                color: '#333333'
              }}
            >
              <option value="popular">За замовчуванням (Нові)</option>
              <option value="price_asc">Ціна: від низької до високої</option>
              <option value="price_desc">Ціна: від високої до низької</option>
              <option value="power">За потужністю</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
