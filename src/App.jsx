import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import MachineryCard from './components/MachineryCard';
import MachineryModal from './components/MachineryModal';
import RentCalculatorModal from './components/RentCalculatorModal';
import QuickLeadModal from './components/QuickLeadModal';
import Footer from './components/Footer';
import { MACHINERY_DATA } from './data/machineryData';
import { PhoneCall } from 'lucide-react';

export default function App() {
  // Global State
  const [currency, setCurrency] = useState('UAH');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('field');

  // Adena Agro Filters State
  const [activityType, setActivityType] = useState('all');
  const [machineryType, setMachineryType] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedServiceType, setSelectedServiceType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Modals
  const [activeMachineModal, setActiveMachineModal] = useState(null);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isQuickLeadModalOpen, setIsQuickLeadModalOpen] = useState(false);
  const [quickLeadTopic, setQuickLeadTopic] = useState('');

  // Filtering Logic (In-Memory 0 ms delay)
  const filteredMachinery = useMemo(() => {
    return MACHINERY_DATA.filter((machine) => {
      // Activity Filter
      if (activityType !== 'all' && machine.activityType !== activityType) {
        return false;
      }

      // Machinery Type Filter
      if (machineryType !== 'all' && machine.machineryType !== machineryType) {
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
      if (selectedServiceType === 'operator' && !machine.specs.operatorIncluded) {
        return false;
      }

      // Search Query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = machine.name.toLowerCase().includes(q);
        const matchBrand = machine.brand.toLowerCase().includes(q);
        const matchModel = (machine.model || '').toLowerCase().includes(q);
        const matchDesc = machine.shortDescription.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchModel && !matchDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        const priceA = a.pricing.purchasePriceUah || a.pricing.pricePerShiftUah;
        const priceB = b.pricing.purchasePriceUah || b.pricing.pricePerShiftUah;
        return priceA - priceB;
      }
      if (sortBy === 'price_desc') {
        const priceA = a.pricing.purchasePriceUah || a.pricing.pricePerShiftUah;
        const priceB = b.pricing.purchasePriceUah || b.pricing.pricePerShiftUah;
        return priceB - priceA;
      }
      if (sortBy === 'power') {
        const powerA = parseInt(a.specs.powerHp.replace(/\D/g, '')) || 0;
        const powerB = parseInt(b.specs.powerHp.replace(/\D/g, '')) || 0;
        return powerB - powerA;
      }
      return 0;
    });
  }, [activityType, machineryType, selectedBrand, selectedModel, selectedServiceType, searchTerm, sortBy]);

  const handleResetFilters = () => {
    setActivityType('all');
    setMachineryType('all');
    setSelectedBrand('all');
    setSelectedModel('all');
    setSelectedServiceType('all');
    setSearchTerm('');
    setSortBy('popular');
  };

  const handleOpenQuickLead = (topic = 'Підбір техніки Adena Agro') => {
    setQuickLeadTopic(topic);
    setIsQuickLeadModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      
      {/* 3-Level Adena Agro Header */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenQuickLead={() => handleOpenQuickLead('Консультація спеціаліста')}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={0}
      />

      {/* Main Filter Section */}
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

      {/* Main Products Catalog (Bordered 4-Column Grid) */}
      <main className="container" style={{ flex: 1 }}>
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
                onSelectMachine={(m) => setActiveMachineModal(m)}
                onQuickBook={(m) => setActiveMachineModal(m)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Corporate Footer */}
      <Footer
        onOpenQuickLead={handleOpenQuickLead}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
      />

      {/* Floating Callback Widget (Binotel Style - Bottom Left) */}
      <div 
        className="floating-call-btn"
        onClick={() => handleOpenQuickLead('Терміновий дзвінок клієнту')}
        title="Замовити швидкий дзвінок"
      >
        <PhoneCall size={26} />
      </div>

      {/* Modals */}
      {activeMachineModal && (
        <MachineryModal
          machine={activeMachineModal}
          currency={currency}
          onClose={() => setActiveMachineModal(null)}
          onSelectMachine={(m) => setActiveMachineModal(m)}
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
