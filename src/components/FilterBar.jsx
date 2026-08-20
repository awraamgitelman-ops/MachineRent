import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Layers, 
  SlidersHorizontal, 
  Check, 
  ChevronDown,
  Sprout,
  Tractor,
  Combine,
  Droplets,
  Disc,
  LayoutGrid
} from 'lucide-react';
import { MACHINERY_CATEGORIES } from '../data/machineryData';
import { AGRO_HUBS } from '../data/hubsData';
import { formatPrice } from '../utils/currency';

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedHub,
  setSelectedHub,
  onlyAvailable,
  setOnlyAvailable,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  currency,
  totalFilteredCount,
  onResetFilters
}) {
  const brands = [
    { id: 'all', name: 'Усі бренди' },
    { id: 'Grimme', name: 'Grimme' },
    { id: 'Struik', name: 'Struik' },
    { id: 'Baselier', name: 'Baselier' },
    { id: 'Dewulf', name: 'Dewulf' },
    { id: 'John Deere', name: 'John Deere' },
    { id: 'Fendt', name: 'Fendt' },
    { id: 'Claas', name: 'Claas' },
    { id: 'Horsch', name: 'Horsch' },
    { id: 'Lemken', name: 'Lemken' },
  ];

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Sprout': return <Sprout size={16} />;
      case 'Tractor': return <Tractor size={16} />;
      case 'Combine': return <Combine size={16} />;
      case 'Layers': return <Layers size={16} />;
      case 'Droplets': return <Droplets size={16} />;
      case 'Disc': return <Disc size={16} />;
      default: return <LayoutGrid size={16} />;
    }
  };

  const isFiltered = selectedCategory !== 'all' || 
                     selectedBrand !== 'all' || 
                     selectedHub !== 'all' || 
                     onlyAvailable || 
                     maxPrice < 80000 || 
                     sortBy !== 'popular';

  return (
    <div style={{
      marginBottom: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Category Pills Bar (Horizontal Scrollable) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '6px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {MACHINERY_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
                border: isActive 
                  ? '1px solid var(--color-accent-primary)' 
                  : '1px solid var(--border-light)',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.25) 100%)' 
                  : 'rgba(20, 35, 30, 0.6)',
                color: isActive ? '#34d399' : 'var(--text-main)',
                boxShadow: isActive ? '0 0 16px rgba(16, 185, 129, 0.2)' : 'none'
              }}
            >
              <span style={{ color: isActive ? 'var(--color-accent-primary)' : 'var(--text-muted)' }}>
                {getCategoryIcon(category.icon)}
              </span>
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Advanced Filter Box */}
      <div className="glass-panel" style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          alignItems: 'center'
        }}>
          {/* Brand Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Бренд виробника
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="select-field"
              style={{ height: '40px', fontSize: '13px' }}
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Hub / Base Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Регіональний хаб
            </label>
            <select
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="select-field"
              style={{ height: '40px', fontSize: '13px' }}
            >
              <option value="all">Усі локації України</option>
              {AGRO_HUBS.map((hub) => (
                <option key={hub.id} value={hub.id}>{hub.city}</option>
              ))}
            </select>
          </div>

          {/* Max Price Filter */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Макс. ціна / зміна:
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399' }}>
                {formatPrice(maxPrice, currency)}
              </span>
            </div>
            <input
              type="range"
              min="15000"
              max="80000"
              step="2500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          {/* Sort By Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Сортування
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select-field"
              style={{ height: '40px', fontSize: '13px' }}
            >
              <option value="popular">За популярністю</option>
              <option value="price_asc">Ціна: від найнижчої</option>
              <option value="price_desc">Ціна: від найвищої</option>
              <option value="rating">За рейтингом відгуків</option>
              <option value="power">За потужністю (к.с.)</option>
            </select>
          </div>
        </div>

        {/* Bottom Filter Controls & Results Count */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {/* Availability Toggle */}
          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-main)'
          }}>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              style={{
                width: '18px',
                height: '18px',
                accentColor: 'var(--color-accent-primary)',
                cursor: 'pointer'
              }}
            />
            <span>Тільки готові до виїзду (виключити ті, що в оренді)</span>
          </label>

          {/* Summary and Reset Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Знайдено: <strong style={{ color: '#ffffff' }}>{totalFilteredCount} одиниць</strong>
            </span>

            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="btn btn-outline btn-sm"
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RotateCcw size={12} />
                <span>Скинути</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
