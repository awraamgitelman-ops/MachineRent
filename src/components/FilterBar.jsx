import React, { useMemo } from 'react';
import { MACHINERY_DATA } from '../data/machineryData';

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
  onResetFilters,
  searchTerm,
  setSearchTerm
}) {
  // Pre-calculate real available counts from catalog
  const counts = useMemo(() => {
    const res = {
      types: {},
      activities: {},
      brands: {}
    };

    MACHINERY_DATA.forEach((p) => {
      // Types
      if (p.machineryType) {
        res.types[p.machineryType] = (res.types[p.machineryType] || 0) + 1;
      }
      // Activities
      const act = (p.activityType === 'soil_preparation' ? 'soil_prep' : p.activityType);
      if (act) {
        res.activities[act] = (res.activities[act] || 0) + 1;
      }
      // Brands
      const b = p.brand || '';
      if (b.includes('Grimme')) res.brands['Grimme'] = (res.brands['Grimme'] || 0) + 1;
      if (b.includes('Struik')) res.brands['Struik'] = (res.brands['Struik'] || 0) + 1;
      if (b.includes('Domasz')) res.brands['Domasz'] = (res.brands['Domasz'] || 0) + 1;
      if (b.includes('Рівненські') || b.includes('Бердянські')) res.brands['Рівненські жатки'] = (res.brands['Рівненські жатки'] || 0) + 1;
      if (b.includes('ZIBO')) res.brands['ZIBO'] = (res.brands['ZIBO'] || 0) + 1;
      if (b.includes('AgroVektor')) res.brands['AgroVektor'] = (res.brands['AgroVektor'] || 0) + 1;
      if (b.includes('AVR')) res.brands['AVR'] = (res.brands['AVR'] || 0) + 1;
      if (b.includes('DeWulf') || b.includes('Dewulf')) res.brands['DeWulf'] = (res.brands['DeWulf'] || 0) + 1;
    });

    return res;
  }, []);

  const activities = [
    { id: 'all', name: 'Вид операції (Всі)' },
    { id: 'soil_prep', name: `Підготовка ґрунту (${counts.activities['soil_prep'] || 17})` },
    { id: 'planting', name: `Посадка та посів (${counts.activities['planting'] || 8})` },
    { id: 'haulm_topping', name: `Видалення бадилля (${counts.activities['haulm_topping'] || 3})` },
    { id: 'harvesting', name: `Збирання врожаю (${counts.activities['harvesting'] || 7})` },
    { id: 'sorting', name: `Сортування та зберігання (${counts.activities['sorting'] || 49})` },
    { id: 'grain', name: `Зернові та жнива (${counts.activities['grain'] || 4})` },
    { id: 'maintenance', name: `Запчастини та сервіс (${counts.activities['maintenance'] || 18})` },
  ];

  const types = [
    { id: 'all', name: 'Категорія техніки (Всі)' },
    { id: 'field', name: `Польова техніка (${counts.types['field'] || 20})` },
    { id: 'zhatky', name: `Жатки зернові (${counts.types['zhatky'] || 4})` },
    { id: 'warehouse', name: `Складська техніка (${counts.types['warehouse'] || 47})` },
    { id: 'parts', name: `Запасні частини (${counts.types['parts'] || 17})` },
    { id: 'used', name: `Техніка Б/В (${counts.types['used'] || 18})` },
  ];

  const brands = [
    { id: 'all', name: 'Виробник (Всі)' },
    { id: 'Grimme', name: `Grimme (${counts.brands['Grimme'] || 24})` },
    { id: 'Struik', name: `Struik (${counts.brands['Struik'] || 17})` },
    { id: 'Domasz', name: `Domasz (${counts.brands['Domasz'] || 40})` },
    { id: 'Рівненські жатки', name: `Рівненські жатки (${counts.brands['Рівненські жатки'] || 4})` },
    { id: 'ZIBO', name: `ZIBO (${counts.brands['ZIBO'] || 3})` },
    { id: 'AgroVektor', name: `AgroVektor (${counts.brands['AgroVektor'] || 1})` },
    { id: 'AVR', name: `AVR (${counts.brands['AVR'] || 2})` },
    { id: 'DeWulf', name: `DeWulf (${counts.brands['DeWulf'] || 2})` },
    { id: 'Інше', name: 'Інші виробники' },
  ];

  const serviceTypes = [
    { id: 'all', name: 'Умови та послуги' },
    { id: 'operator', name: 'Оренда з оператором' },
    { id: 'delivery', name: 'Доставка тралом по Україні' },
    { id: 'warranty', name: 'Гарантія та сервісний супровід' },
  ];

  const isFiltered = (activityType && activityType !== 'all') || 
                     (machineryType && machineryType !== 'all') || 
                     (selectedBrand && selectedBrand !== 'all') || 
                     (selectedModel && selectedModel !== 'all') || 
                     (selectedServiceType && selectedServiceType !== 'all') ||
                     Boolean(searchTerm && searchTerm.trim());

  return (
    <div id="main-catalog" className="wpf-filters">
      <div className="container">
        <h2>Оберіть значення у фільтрі товарів</h2>
        <p>Знайдіть потрібну сільгосптехніку або запчастини за параметрами:</p>

        {/* 4-Column Filter Grid */}
        <div className="wpfMainWrapper" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          
          {/* 1. Machinery Category */}
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

          {/* 2. Activity Operation */}
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

          {/* 4. Service / Terms */}
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
            {searchTerm ? (
              <span>За запитом «<strong>{searchTerm}</strong>» знайдено: <strong>{totalFilteredCount} товарів</strong></span>
            ) : (
              <span>Відображаються <strong>{totalFilteredCount} товарів</strong></span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {isFiltered && (
              <button
                onClick={onResetFilters}
                style={{
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  padding: '6px 12px',
                  color: 'var(--wd-primary-color)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ✕ Скинути всі фільтри
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
              <option value="popular">Сортування: За замовчуванням</option>
              <option value="price_asc">Ціна: від дешевших до дорожчих</option>
              <option value="price_desc">Ціна: від дорожчих до дешевших</option>
              <option value="name_asc">За алфавітом (А-Я)</option>
              <option value="power">За потужністю</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
