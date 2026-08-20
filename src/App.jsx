import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CatalogPage from './pages/CatalogPage';
import RentCalculatorModal from './components/RentCalculatorModal';
import QuickLeadModal from './components/QuickLeadModal';
import { PhoneCall } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState('UAH');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('field');

  // Modals
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isQuickLeadModalOpen, setIsQuickLeadModalOpen] = useState(false);
  const [quickLeadTopic, setQuickLeadTopic] = useState('');

  const handleOpenQuickLead = (topic = 'Підбір техніки Adena Agro') => {
    setQuickLeadTopic(topic);
    setIsQuickLeadModalOpen(true);
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
        
        {/* 3-Level Header with React Router Navigation */}
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

        {/* Clean URL Routes (without #) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage
                  currency={currency}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            
            <Route 
              path="/product/:slug" 
              element={
                <ProductPage
                  currency={currency}
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />

            <Route 
              path="/product-category/:category" 
              element={
                <CatalogPage
                  currency={currency}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                />
              } 
            />

            <Route 
              path="*" 
              element={
                <HomePage
                  currency={currency}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer
          onOpenQuickLead={handleOpenQuickLead}
          onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        />

        {/* Floating Call Widget */}
        <div 
          className="floating-call-btn"
          onClick={() => handleOpenQuickLead('Терміновий дзвінок клієнту')}
          title="Замовити швидкий дзвінок"
        >
          <PhoneCall size={26} />
        </div>

        {/* Global Modals */}
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
    </BrowserRouter>
  );
}
