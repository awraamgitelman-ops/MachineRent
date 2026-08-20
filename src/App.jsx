import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import MachineryCard from './components/MachineryCard';
import MachineryModal from './components/MachineryModal';
import InteractiveMap from './components/InteractiveMap';
import AgroServices from './components/AgroServices';
import RentCalculatorModal from './components/RentCalculatorModal';
import QuickLeadModal from './components/QuickLeadModal';
import Footer from './components/Footer';
import { MACHINERY_DATA } from './data/machineryData';
import { AGRO_HUBS } from './data/hubsData';

export default function App() {
  // App State
  const [currency, setCurrency] = useState('UAH');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedHub, setSelectedHub] = useState('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [sortBy, setSortBy] = useState('popular');

  // Modals State
  const [activeMachineModal, setActiveMachineModal] = useState(null);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isQuickLeadModalOpen, setIsQuickLeadModalOpen] = useState(false);
  const [quickLeadTopic, setQuickLeadTopic] = useState('');

  // Total Available Units Calculation
  const totalAvailableCount = useMemo(() => {
    return MACHINERY_DATA.filter((m) => !m.isRented).length;
  }, []);

  // Blueprint Requirement А: Client-Side In-Memory Data Layer (0 ms filtering)
  const filteredMachinery = useMemo(() => {
    return MACHINERY_DATA.filter((machine) => {
      // Category filter
      if (selectedCategory !== 'all' && machine.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && machine.brand !== selectedBrand) {
        return false;
      }

      // Hub filter
      if (selectedHub !== 'all' && machine.hubId !== selectedHub) {
        return false;
      }

      // Available only filter
      if (onlyAvailable && machine.isRented) {
        return false;
      }

      // Max price filter (checks price per shift)
      if (machine.pricing.pricePerShiftUah > maxPrice) {
        return false;
      }

      // Search term filter (multi-field search)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = machine.name.toLowerCase().includes(query);
        const matchBrand = machine.brand.toLowerCase().includes(query);
        const matchDesc = machine.shortDescription.toLowerCase().includes(query);
        const matchCategory = machine.categoryName.toLowerCase().includes(query);
        const matchSpecs = Object.values(machine.specs).some((v) => 
          String(v).toLowerCase().includes(query)
        );
        const matchCrops = machine.suitableFor.some((c) => c.toLowerCase().includes(query));

        if (!matchName && !matchBrand && !matchDesc && !matchCategory && !matchSpecs && !matchCrops) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'price_asc') {
        return a.pricing.pricePerShiftUah - b.pricing.pricePerShiftUah;
      }
      if (sortBy === 'price_desc') {
        return b.pricing.pricePerShiftUah - a.pricing.pricePerShiftUah;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'power') {
        const powerA = parseInt(a.specs.powerHp.replace(/\D/g, '')) || 0;
        const powerB = parseInt(b.specs.powerHp.replace(/\D/g, '')) || 0;
        return powerB - powerA;
      }
      return 0; // Default popular order in array
    });
  }, [selectedCategory, selectedBrand, selectedHub, onlyAvailable, maxPrice, searchTerm, sortBy]);

  // Handlers
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedHub('all');
    setOnlyAvailable(false);
    setMaxPrice(80000);
    setSearchTerm('');
    setSortBy('popular');
  };

  const handleOpenQuickLead = (topic = 'Підбір техніки під площу поля') => {
    setQuickLeadTopic(topic);
    setIsQuickLeadModalOpen(true);
  };

  const handleLocateOnMap = (hubId) => {
    setSelectedHub(hubId);
    const mapElement = document.getElementById('map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterByHub = (hubId) => {
    setSelectedHub(hubId);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenQuickLead={() => handleOpenQuickLead('Загальний підбір техніки')}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        onOpenServices={() => {
          const el = document.getElementById('map-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        totalAvailableCount={totalAvailableCount}
      />

      {/* Hero Section */}
      <Hero
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedHub={selectedHub}
        setSelectedHub={setSelectedHub}
        onOpenQuickLead={handleOpenQuickLead}
        totalAvailableUnits={totalAvailableCount}
      />

      {/* Catalog Section */}
      <main id="catalog" style={{ padding: '48px 0 64px 0', flex: 1 }}>
        <div className="container">
          
          {/* Section Heading */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-accent-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                ПОВНИЙ ПАРК ТЕХНІКИ
              </span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>
                Каталог Сільськогосподарських Машин
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsCalculatorModalOpen(true)}
                className="btn btn-outline btn-sm"
                style={{ borderColor: '#f59e0b', color: '#fbbf24' }}
              >
                🧮 Відкрити калькулятор поля
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedHub={selectedHub}
            setSelectedHub={setSelectedHub}
            onlyAvailable={onlyAvailable}
            setOnlyAvailable={setOnlyAvailable}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            currency={currency}
            totalFilteredCount={filteredMachinery.length}
            onResetFilters={handleResetFilters}
          />

          {/* Machinery Grid */}
          {filteredMachinery.length === 0 ? (
            <div className="glass-panel" style={{
              padding: '48px 24px',
              textAlign: 'center',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚜</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>
                За вашими критеріями техніки не знайдено
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                Спробуйте послабити фільтри або зв'яжіться з диспетчером для індивідуального підбору з резервного парку.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button onClick={handleResetFilters} className="btn btn-outline">
                  Скинути всі фільтри
                </button>
                <button onClick={() => handleOpenQuickLead('Підбір техніки під замовлення')} className="btn btn-primary">
                  Залишити запит диспетчеру
                </button>
              </div>
            </div>
          ) : (
            <div className="grid-catalog">
              {filteredMachinery.map((machine) => (
                <MachineryCard
                  key={machine.id}
                  machine={machine}
                  currency={currency}
                  onSelectMachine={(m) => setActiveMachineModal(m)}
                  onQuickBook={(m) => setActiveMachineModal(m)}
                  onLocateOnMap={handleLocateOnMap}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Interactive Map Section */}
      <InteractiveMap
        selectedHub={selectedHub}
        onSelectHub={setSelectedHub}
        onFilterByHub={handleFilterByHub}
      />

      {/* Agro Services & Logistics Section */}
      <AgroServices
        onOpenQuickLead={handleOpenQuickLead}
      />

      {/* Footer */}
      <Footer
        onOpenQuickLead={handleOpenQuickLead}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
      />

      {/* Modals */}
      {activeMachineModal && (
        <MachineryModal
          machine={activeMachineModal}
          currency={currency}
          onClose={() => setActiveMachineModal(null)}
        />
      )}

      {isCalculatorModalOpen && (
        <RentCalculatorModal
          currency={currency}
          onClose={() => setIsCalculatorModalOpen(false)}
          onOpenQuickLead={handleOpenQuickLead}
        />
      )}

      {isQuickLeadModalOpen && (
        <QuickLeadModal
          initialTopic={quickLeadTopic}
          onClose={() => setIsQuickLeadModalOpen(false)}
        />
      )}

    </div>
  );
}
