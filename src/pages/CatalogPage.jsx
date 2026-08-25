import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, Link, useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import MachineryCard from '../components/MachineryCard';
import { MACHINERY_DATA } from '../data/machineryData';
import { setPageSeo } from '../utils/seo';
import { filterMachinery } from '../utils/searchHelper';

const CATEGORY_MAP = {
  'field': {
    id: 'field',
    title: 'Польова техніка для овочівництва',
    subtitle: 'Техніка для обробки ґрунту, посадки та збирання овочевих культур: картоплі, моркви, цукрового буряку та цибулі.',
    machineryType: 'field'
  },
  'skladska-tehnika': {
    id: 'skladska-tehnika',
    title: 'Складська та сортувальна техніка',
    subtitle: 'Устаткування для транспортування, сортування, очищення, пакування та зберігання овочів.',
    machineryType: 'warehouse'
  },
  'zapchastyny': {
    id: 'zapchastyny',
    title: 'Запасні частини та комплектуючі',
    subtitle: 'Широкий асортимент оригінальних запчастин, роликів, стрічок та транспортерів для Grimme, Struik, AVR, Dewulf.',
    machineryType: 'parts'
  },
  'tehnika-b-v': {
    id: 'tehnika-b-v',
    title: 'Сільськогосподарська техніка Б/В з Європи',
    subtitle: 'Перевірена вживана сільськогосподарська техніка з Європи за вигідними цінами з повною передпродажною підготовкою.',
    machineryType: 'used'
  },
  'zhatky-zernovi': {
    id: 'zhatky-zernovi',
    title: 'Жатки зернові та зернобобові (Оренда та продаж)',
    subtitle: 'Широкий вибір зернових, соєвих та флекс-жаток John Deere, Case IH, CLAAS, New Holland, ЖУ-6, ЖЗБ для збирання зернових культур.',
    machineryType: 'zhatky'
  },
  'zhatky': {
    id: 'zhatky',
    title: 'Жатки зернові та зернобобові (Оренда та продаж)',
    subtitle: 'Широкий вибір зернових, соєвих та флекс-жаток John Deere, Case IH, CLAAS, New Holland, ЖУ-6, ЖЗБ для збирання зернових культур.',
    machineryType: 'zhatky'
  }
};

export default function CatalogPage({ 
  currency, 
  searchTerm, 
  setSearchTerm
}) {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategoryInfo = category ? CATEGORY_MAP[category] : null;

  // Filters State
  const [activityType, setActivityType] = useState('all');
  const [machineryType, setMachineryType] = useState(currentCategoryInfo ? currentCategoryInfo.machineryType : 'all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedServiceType, setSelectedServiceType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Sync URL search query param
  useEffect(() => {
    const query = searchParams.get('s') || searchParams.get('search');
    if (query !== null && query !== undefined && query !== searchTerm) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // Sync category route with filter state & SEO
  useEffect(() => {
    if (currentCategoryInfo) {
      setMachineryType(currentCategoryInfo.machineryType);
      
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
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
            "name": currentCategoryInfo.title,
            "item": `https://agrorentex.com/product-category/${category}`
          }
        ]
      };

      setPageSeo({
        title: `${currentCategoryInfo.title}: Купити або орендувати в Україні | AGRORENTEX`,
        description: currentCategoryInfo.subtitle,
        canonicalUrl: `https://agrorentex.com/product-category/${category}`,
        schemaData
      });
    } else {
      setMachineryType('all');
      setPageSeo({
        title: 'Каталог сільськогосподарської техніки | AGRORENTEX',
        description: 'Повний каталог польової, складської техніки, обладнання для збирання та сортування овочів і запчастин AGRORENTEX.',
        canonicalUrl: 'https://agrorentex.com/product-category/field'
      });
    }
  }, [category]);

  // Filtering Logic
  const filteredMachinery = useMemo(() => {
    return filterMachinery(MACHINERY_DATA, {
      activityType,
      machineryType,
      selectedBrand,
      selectedModel,
      selectedServiceType,
      searchTerm,
      sortBy,
      currentCategoryType: currentCategoryInfo ? currentCategoryInfo.machineryType : null
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
    if (searchParams.get('s') || searchParams.get('search')) {
      setSearchParams({});
    }
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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
