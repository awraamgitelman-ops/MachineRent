import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CatalogPage from './pages/CatalogPage';
import RemontPage from './pages/RemontPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import PublicOfferPage from './pages/PublicOfferPage';
import QuickLeadModal from './components/QuickLeadModal';
import { PhoneCall } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState('UAH');
  const [searchTerm, setSearchTerm] = useState('');

  // Lead Modal
  const [isQuickLeadModalOpen, setIsQuickLeadModalOpen] = useState(false);
  const [quickLeadTopic, setQuickLeadTopic] = useState('');

  const handleOpenQuickLead = (topic = 'Підбір техніки AGRORENTEX') => {
    setQuickLeadTopic(topic);
    setIsQuickLeadModalOpen(true);
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
        
        {/* 3-Level Header with Active Category Routing */}
        <Navbar
          currency={currency}
          setCurrency={setCurrency}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenQuickLead={() => handleOpenQuickLead('Підбір техніки для овочівництва')}
          cartCount={0}
        />

        {/* Clean URL Routes (without #) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            {/* 1. Main Home Page */}
            <Route 
              path="/" 
              element={
                <HomePage
                  currency={currency}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            
            {/* 2. Standalone Dedicated Product Details Page */}
            <Route 
              path="/product/:slug" 
              element={
                <ProductPage
                  currency={currency}
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />

            {/* 3. Dedicated Conveyor Repair Page */}
            <Route 
              path="/remont-transporteriv" 
              element={
                <RemontPage
                  currency={currency}
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            <Route 
              path="/remont-transporteriv/" 
              element={
                <RemontPage
                  currency={currency}
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />

            {/* 4. Dedicated About Us Page */}
            <Route 
              path="/about-us" 
              element={
                <AboutUsPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            <Route 
              path="/about-us/" 
              element={
                <AboutUsPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />

            {/* 5. Dedicated Contact Us Page */}
            <Route 
              path="/contact-us" 
              element={
                <ContactPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            <Route 
              path="/contact-us/" 
              element={
                <ContactPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            <Route 
              path="/contacts" 
              element={
                <ContactPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />

            {/* 6. Dedicated Blog & Articles Pages */}
            <Route 
              path="/blog" 
              element={
                <BlogPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            <Route 
              path="/blog/" 
              element={
                <BlogPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            <Route 
              path="/statti" 
              element={
                <BlogPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
            <Route 
              path="/blog/:slug" 
              element={
                <BlogPostPage
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />

            {/* 7. Dedicated Category Archive Pages */}
            <Route 
              path="/product-category/:category" 
              element={
                <CatalogPage
                  currency={currency}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              } 
            />
            <Route 
              path="/product-category/:category/" 
              element={
                <CatalogPage
                  currency={currency}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              } 
            />

            {/* 8. Legal Pages: Privacy Policy & Public Offer */}
            <Route 
              path="/privacy-policy" 
              element={<PrivacyPolicyPage />} 
            />
            <Route 
              path="/privacy-policy/" 
              element={<PrivacyPolicyPage />} 
            />
            <Route 
              path="/politika-konfidenciynosti" 
              element={<PrivacyPolicyPage />} 
            />
            <Route 
              path="/public-offer" 
              element={<PublicOfferPage />} 
            />
            <Route 
              path="/public-offer/" 
              element={<PublicOfferPage />} 
            />
            <Route 
              path="/publichna-oferta" 
              element={<PublicOfferPage />} 
            />

            {/* 9. Fallback Route */}
            <Route 
              path="*" 
              element={
                <HomePage
                  currency={currency}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onOpenQuickLead={handleOpenQuickLead}
                />
              } 
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer
          onOpenQuickLead={handleOpenQuickLead}
        />

        {/* Floating Call Widget */}
        <div 
          className="floating-call-btn"
          onClick={() => handleOpenQuickLead('Консультація')}
          title="Замовити консультацію"
          style={{ borderRadius: '50%' }}
        >
          <PhoneCall size={26} />
        </div>

        {/* Global Lead & Order Modal */}
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
