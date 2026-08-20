import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import MachineryCard from '../components/MachineryCard';
import { MACHINERY_DATA } from '../data/machineryData';

const CATEGORY_MAP = {
  'field': {
    id: 'field',
    title: 'Польова техніка',
    subtitle: 'Техніка для обробки ґрунту, посадки та збирання овочевих культур: картоплі, моркви, цукрового буряку та цибулі.',
    machineryType: 'field'
  },
  'skladska-tehnika': {
    id: 'skladska-tehnika',
    title: 'Складська техніка',
    subtitle: 'Устаткування для транспортування, сортування, очищення, пакування та зберігання овочів.',
    machineryType: 'warehouse'
  },
  'zapchastyny': {
    id: 'zapchastyny',
    title: 'Запасні частини',
    subtitle: 'Широкий асортимент оригінальних запчастин, роликів, стрічок та транспортерів для Grimme, Struik, AVR, Dewulf.',
    machineryType: 'parts'
  },
  'tehnika-b-v': {
    id: 'tehnika-b-v',
    title: 'Техніка Б/В',
    subtitle: 'Перевірена вживана сільськогосподарська техніка з Європи за вигідними цінами з повною передпродажною підготовкою.',
    machineryType: 'used'
  }
};

export default function CatalogPage({ 
  currency, 
  searchTerm, 
  setSearchTerm
}) {
  const navigate = useNavigate();
  const { category } = useParams();

  const currentCategoryInfo = category ? CATEGORY_MAP[category] : null;

  // Filters State
  const [activityType, setActivityType] = useState('all');
  const [machineryType, setMachineryType] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedServiceType, setSelectedServiceType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Sync category route with filter state
  useEffect(() => {
    if (currentCategoryInfo) {
      setMachineryType(currentCategoryInfo.machineryType);
    } else {
      setMachineryType('all');
    }
  }, [category]);

  // Filtering Logic
  const filteredMachinery = useMemo(() => {
    return MACHINERY_DATA.filter((machine) => {
      // Category routing filter
      if (currentCategoryInfo) {
        if (machine.machineryType !== currentCategoryInfo.machineryType) {
          return false;
        }
      } else if (machineryType !== 'all' && machine.machineryType !== machineryType) {
        return false;
      }

      // Activity Filter
      if (activityType !== 'all' && machine.activityType !== activityType) {
        return false;
      }

      // Brand Filter
      if (selectedBrand !== 'all' && machine.brand !== selectedBrand) {
        return false;
      }

      // Model Filter
      if (selectedModel !== 'all' && machine.model !== selectedModel) {
        return false;
      }

      // Service Type Filter
      if (selectedServiceType === 'operator' && !machine.specs?.operatorIncluded) {
        return false;
      }

      // Search Query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = machine.name.toLowerCase().includes(q);
        const matchBrand = machine.brand.toLowerCase().includes(q);
        const matchModel = (machine.model || '').toLowerCase().includes(q);
        const matchDesc = (machine.shortDescription || '').toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchModel && !matchDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        const priceA = a.pricing?.purchasePriceUah || a.pricing?.pricePerShiftUah || 0;
        const priceB = b.pricing?.purchasePriceUah || b.pricing?.pricePerShiftUah || 0;
        return priceA - priceB;
      }
      if (sortBy === 'price_desc') {
        const priceA = a.pricing?.purchasePriceUah || a.pricing?.pricePerShiftUah || 0;
        const priceB = b.pricing?.purchasePriceUah || b.pricing?.pricePerShiftUah || 0;
        return priceB - priceA;
      }
      if (sortBy === 'power') {
        const powerA = parseInt((a.specs?.powerHp || '').replace(/\D/g, '')) || 0;
        const powerB = parseInt((b.specs?.powerHp || '').replace(/\D/g, '')) || 0;
        return powerB - powerA;
      }
      return 0;
    });
  }, [activityType, machineryType, selectedBrand, selectedModel, selectedServiceType, searchTerm, sortBy, currentCategoryInfo]);

  const handleResetFilters = () => {
    setActivityType('all');
    if (currentCategoryInfo) {
      setMachineryType(currentCategoryInfo.machineryType);
    } else {
      setMachineryType('all');
    }
    setSelectedBrand('all');
    setSelectedModel('all');
    setSelectedServiceType('all');
    setSearchTerm('');
    setSortBy('popular');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      
      {/* Category Breadcrumbs & Header */}
      {currentCategoryInfo ? (
        <div style={{ backgroundColor: '#f7f7f7', borderBottom: '1px solid #e5e5e5', padding: '24px 0' }}>
          <div className="container">
            <nav style={{ fontSize: '13px', color: '#777', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Link to="/" style={{ color: '#555', fontWeight: 500 }}>Головна</Link>
              <ChevronRight size={14} />
              <span style={{ color: '#111', fontWeight: 600 }}>{currentCategoryInfo.title}</span>
            </nav>
            <h1 style={{ fontSize: '30px', fontWeight: 600, color: '#111', margin: '0 0 6px 0' }}>
              {currentCategoryInfo.title}
            </h1>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, maxWidth: '850px' }}>
              {currentCategoryInfo.subtitle}
            </p>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: '#f7f7f7', borderBottom: '1px solid #e5e5e5', padding: '18px 0' }}>
          <div className="container">
            <nav style={{ fontSize: '13px', color: '#777', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/" style={{ color: '#555', fontWeight: 500 }}>Головна</Link>
              <ChevronRight size={14} />
              <span style={{ color: '#111', fontWeight: 600 }}>Каталог техніки</span>
            </nav>
          </div>
        </div>
      )}

      {/* 5-Column Filter Bar (wpf-filters) */}
      <FilterBar
        activityType={activityType}
        setActivityType={setActivityType}
        machineryType={machineryType}
        setMachineryType={setMachineryType}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        selectedServiceType={selectedServiceType}
        setSelectedServiceType={setSelectedServiceType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalFilteredCount={filteredMachinery.length}
        onResetFilters={handleResetFilters}
      />

      {/* Main Products Grid */}
      <main className="container" style={{ flex: 1, paddingBottom: '40px' }}>
        {filteredMachinery.length === 0 ? (
          <div style={{
            padding: '64px 20px',
            textAlign: 'center',
            background: '#fafafa',
            border: '1px solid #eaeaea',
            margin: '20px 0 40px 0'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>
              Товарів за обраними критеріями не знайдено
            </h3>
            <p style={{ color: '#777', fontSize: '14px', marginBottom: '18px' }}>
              Спробуйте скинути значення фільтрів для перегляду всього каталогу.
            </p>
            <button onClick={handleResetFilters} className="btn-adena-primary">
              Скинути фільтри
            </button>
          </div>
        ) : (
          <div className="products-bordered-grid">
            {filteredMachinery.map((machine) => (
              <MachineryCard
                key={machine.id}
                machine={machine}
                currency={currency}
                onSelectMachine={(m) => navigate(`/product/${m.slug}`)}
                onQuickBook={(m) => navigate(`/product/${m.slug}`)}
              />
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
