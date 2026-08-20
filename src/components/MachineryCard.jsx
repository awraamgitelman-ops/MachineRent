import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

export default function MachineryCard({ 
  machine, 
  currency, 
  onSelectMachine,
  onQuickBook
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${machine.slug}`);
  };

  return (
    <div 
      className="product-grid-item"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Top Image Container */}
      <div className="product-element-top">
        {machine.badge && (
          <div className="product-label-badge product-label-sale">
            {machine.badge}
          </div>
        )}

        <img
          src={machine.images[0]}
          alt={machine.name}
          loading="lazy"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
          onError={(e) => {
            e.target.src = 'https://adenaagro.com/wp-content/uploads/2025/01/87d1cc46a58d545cfcacce8ac5ba77de_big-300x300.jpg';
          }}
        />
      </div>

      {/* Bottom Information */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Title */}
          <h3 className="wd-entities-title">
            <Link 
              to={`/product/${machine.slug}`}
              onClick={(e) => e.stopPropagation()}
            >
              {machine.name}
            </Link>
          </h3>

          {/* Brand Link */}
          <div className="wd-product-brands-links">
            <span>{machine.brand}</span>
          </div>

          {/* Key Specs Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', background: '#f5f5f5', padding: '2px 6px', color: '#555' }}>
              {machine.specs?.powerHp || 'від 90 к.с.'}
            </span>
            <span style={{ fontSize: '11px', background: '#f5f5f5', padding: '2px 6px', color: '#555' }}>
              {machine.specs?.workingWidth || '2-4 ряди'}
            </span>
            {machine.specs?.operatorIncluded && (
              <span style={{ fontSize: '11px', background: '#eefcf1', color: '#10b981', padding: '2px 6px', fontWeight: 600 }}>
                З оператором
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="price-container">
          {machine.pricing?.purchasePriceUah ? (
            <div>
              <div className="product-price-main">
                {formatPrice(machine.pricing.purchasePriceUah, currency)}
              </div>
              <div className="product-price-sub">
                Оренда: <strong>{formatPrice(machine.pricing.pricePerShiftUah, currency)} / зміна</strong>
              </div>
            </div>
          ) : (
            <div>
              <div className="product-price-main">
                {formatPrice(machine.pricing?.pricePerShiftUah || 18000, currency)}
                <span style={{ fontSize: '12px', fontWeight: 400, color: '#666', marginLeft: '4px' }}>
                  / зміна
                </span>
              </div>
              <div className="product-price-sub">
                або {formatPrice(machine.pricing?.pricePerHaUah || 1400, currency)} / га
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="product-actions-bar">
            <Link
              to={`/product/${machine.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="btn-adena-primary"
            >
              <span>Читати далі</span>
            </Link>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${machine.slug}`);
              }}
              className="btn-adena-secondary"
              title="Швидкий прорахунок"
            >
              Бронь
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
