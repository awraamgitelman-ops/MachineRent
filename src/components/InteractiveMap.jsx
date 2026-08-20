import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Truck, 
  Tractor, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Navigation
} from 'lucide-react';
import { AGRO_HUBS } from '../data/hubsData';

// Component to handle smooth flyTo animation when hub changes
function MapFlyTo({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveMap({ 
  selectedHub, 
  onSelectHub, 
  onFilterByHub 
}) {
  const [activeHubId, setActiveHubId] = useState(selectedHub === 'all' ? 'hub-kyiv' : selectedHub);

  const currentHub = AGRO_HUBS.find((h) => h.id === activeHubId) || AGRO_HUBS[0];
  const mapCenter = [currentHub.lat, currentHub.lng];

  // Custom SVG Leaflet Marker
  const createCustomIcon = (hubId) => {
    const isSelected = activeHubId === hubId;
    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="
          width: 38px;
          height: 38px;
          border-radius: 50% 50% 50% 0;
          background: ${isSelected ? '#f59e0b' : '#10b981'};
          transform: rotate(-45deg);
          border: 2px solid #ffffff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <span style="
            transform: rotate(45deg);
            font-size: 15px;
            font-weight: 800;
            color: #ffffff;
          ">R</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -36]
    });
  };

  const handleMarkerClick = (hub) => {
    setActiveHubId(hub.id);
    onSelectHub(hub.id);
  };

  return (
    <section id="map-section" style={{
      padding: '64px 0',
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div className="badge badge-green" style={{ marginBottom: '12px', fontSize: '13px' }}>
            <Navigation size={14} />
            <span>ЛОГІСТИЧНА МЕРЕЖА ТА БАЗИ ДИСЛОКАЦІЇ</span>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '14px', color: '#ffffff' }}>
            Географія Агро-Хабів по Україні
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>
            7 стратегічних регіональних терміналів зі спецтехнікою, черговими тралами та мобільними сервісними бригадами. 
            Гарантуємо подачу на будь-яке поле за <strong>12–24 години</strong>.
          </p>
        </div>

        {/* Map & Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(400px, 2fr)',
          gap: '24px',
          alignItems: 'stretch',
          ...(window.innerWidth < 960 ? { gridTemplateColumns: '1fr' } : {})
        }}>
          
          {/* Left: Hubs List & Quick Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Оберіть базу дислокації:
            </div>

            {AGRO_HUBS.map((hub) => {
              const isSelected = activeHubId === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => handleMarkerClick(hub)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1px solid #10b981' : '1px solid var(--border-light)',
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)' 
                      : 'rgba(20, 35, 30, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? '0 0 16px rgba(16, 185, 129, 0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: isSelected ? '#34d399' : '#ffffff' }}>
                      {hub.name}
                    </h4>
                    {hub.isHeadquarter && (
                      <span className="badge badge-gold" style={{ fontSize: '10px' }}>Головний</span>
                    )}
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {hub.address}
                  </div>

                  <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
                    <span style={{ color: '#34d399', fontWeight: 600 }}>
                      В наявності: <strong>{hub.availableUnits} од.</strong>
                    </span>
                    <span style={{ color: '#fbbf24', fontWeight: 600 }}>
                      Тралів: <strong>{hub.trallCount}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Interactive Leaflet Map */}
          <div className="glass-panel" style={{
            minHeight: '480px',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            position: 'relative'
          }}>
            <MapContainer
              center={mapCenter}
              zoom={7}
              scrollWheelZoom={false}
              style={{ width: '100%', height: '100%', minHeight: '480px' }}
            >
              {/* Modern Dark Agro Tile Layer */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />

              <MapFlyTo center={mapCenter} zoom={7} />

              {AGRO_HUBS.map((hub) => (
                <Marker
                  key={hub.id}
                  position={[hub.lat, hub.lng]}
                  icon={createCustomIcon(hub.id)}
                  eventHandlers={{
                    click: () => handleMarkerClick(hub)
                  }}
                >
                  <Popup>
                    <div style={{ padding: '6px', minWidth: '220px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#10b981', marginBottom: '4px' }}>
                        {hub.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#d1d5db', marginBottom: '8px' }}>
                        {hub.address}
                      </div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>
                        Зона оперативного покриття: <strong>{hub.coverage}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
                        <span style={{ color: '#34d399' }}>Техніки: {hub.availableUnits} од.</span>
                        <span style={{ color: '#fbbf24' }}>Трали: {hub.trallCount}</span>
                      </div>
                      <button
                        onClick={() => onFilterByHub(hub.id)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          background: '#10b981',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Показати техніку цього хабу ➔
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Overlay Badge */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              zIndex: 1000,
              background: 'rgba(8, 13, 11, 0.9)',
              backdropFilter: 'blur(8px)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              fontSize: '12px',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              <span>Активний хаб: <strong>{currentHub.name}</strong></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
