import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Thermometer, Bus as BusIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (isWarm, status) => {
  const bgColor = status === 'closed' ? '#94a3b8' : isWarm ? '#f97316' : '#3b82f6';
  const size = isWarm ? 40 : 32;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: linear-gradient(135deg, ${bgColor}, ${isWarm ? '#ea580c' : '#2563eb'});
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        ${isWarm ? 'animation: pulse 2s infinite;' : ''}
      ">
        <svg width="${size * 0.4}" height="${size * 0.4}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${isWarm 
            ? '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>' 
            : '<rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 11v8"/><path d="m8 15 4 4 4-4"/>'
          }
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size/2, size],
  });
};

export default function TransportMap({ stops = [], center = [62.0339, 129.7354], zoom = 13 }) {
  return (
    <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-white/50">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stops.map((stop) => (
          <Marker 
            key={stop.id} 
            position={[stop.latitude, stop.longitude]}
            icon={createCustomIcon(stop.is_warm, stop.status)}
          >
            <Popup>
              <div className="p-1 min-w-[180px]">
                <h3 className="font-bold text-slate-800">{stop.name}</h3>
                {stop.name_sakha && (
                  <p className="text-sm text-slate-500 mb-2">{stop.name_sakha}</p>
                )}
                {stop.is_warm && (
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg mb-2">
                    <Thermometer className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">
                      {stop.temperature_inside}°C внутри
                    </span>
                  </div>
                )}
                {stop.routes?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {stop.routes.map(route => (
                      <span key={route} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        №{route}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}