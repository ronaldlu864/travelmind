import { useState } from 'react';
import { Search, Clock, Wifi, Plane, Star, DollarSign, Zap } from 'lucide-react';

interface Flight {
  id: number;
  airline: string;
  code: string;
  flightNum: string;
  departure: string;
  departureCode: string;
  arrival: string;
  arrivalCode: string;
  duration: string;
  stops: string;
  class: string;
  price: string;
  priceValue: number;
  badge: string;
  badgeType: 'recommended' | 'lowest' | 'fast';
}

const flightsData: Flight[] = [
  {
    id: 1,
    airline: 'AIR CHINA',
    code: 'CA',
    flightNum: 'CA1521',
    departure: '08:30',
    departureCode: 'PEK',
    arrival: '14:45',
    arrivalCode: 'MAD',
    duration: '12h 15m',
    stops: 'Non-stop',
    class: 'Economy',
    price: '\u00a55,890',
    priceValue: 5890,
    badge: 'Recommended',
    badgeType: 'recommended',
  },
  {
    id: 2,
    airline: 'LUFTHANSA',
    code: 'LH',
    flightNum: 'LH8130',
    departure: '11:20',
    departureCode: 'PEK',
    arrival: '19:55',
    arrivalCode: 'MAD',
    duration: '14h 35m',
    stops: '1 stop FRA',
    class: 'Economy',
    price: '\u00a54,230',
    priceValue: 4230,
    badge: 'Lowest Fare',
    badgeType: 'lowest',
  },
  {
    id: 3,
    airline: 'BRITISH AIRWAYS',
    code: 'BA',
    flightNum: 'BA0840',
    departure: '13:00',
    departureCode: 'PEK',
    arrival: '20:10',
    arrivalCode: 'MAD',
    duration: '13h 10m',
    stops: '1 stop LHR',
    class: 'Economy',
    price: '\u00a54,680',
    priceValue: 4680,
    badge: 'Fast Connect',
    badgeType: 'fast',
  },
];

const badgeStyles = {
  recommended: { bg: 'rgba(110,139,101,0.15)', color: '#6E8B65', icon: <Star size={12} /> },
  lowest: { bg: 'rgba(212,168,83,0.15)', color: '#D4A853', icon: <DollarSign size={12} /> },
  fast: { bg: 'rgba(198,123,92,0.15)', color: '#C67B5C', icon: <Zap size={12} /> },
};

export default function Flights() {
  const [searched, setSearched] = useState(true);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>Flight Search</h1>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
          FLIGHT BOOKING &middot; AI OPTIMIZED
        </p>
      </div>

      {/* Search Form */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{
          backgroundColor: '#FAF8F5',
          boxShadow: '0 8px 24px rgba(45,31,20,0.08)',
        }}
      >
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>FROM</label>
            <input
              type="text"
              defaultValue="Beijing (PEK)"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>TO</label>
            <input
              type="text"
              defaultValue="Madrid (MAD)"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>DEPART</label>
            <input
              type="text"
              defaultValue="2026/05/19"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>RETURN</label>
            <input
              type="text"
              defaultValue="2026/05/24"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>PASSENGERS</label>
            <input
              type="text"
              defaultValue="1 Adult"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
        </div>
        <button
          onClick={() => setSearched(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#A65D3F'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C67B5C'; }}
        >
          <Search size={16} />
          Search Flights
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div>
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase mb-4" style={{ color: '#9C8E84' }}>
            {flightsData.length} FLIGHTS FOUND
          </p>
          <div className="grid grid-cols-3 gap-5">
            {flightsData.map((flight, index) => {
              const badge = badgeStyles[flight.badgeType];
              return (
                <div
                  key={flight.id}
                  className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: '#FAF8F5',
                    boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
                    animationDelay: `${index * 100}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(45,31,20,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,31,20,0.05)';
                  }}
                >
                  {/* Airline */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold tracking-[0.12em]" style={{ color: '#C67B5C' }}>
                      {flight.airline} {flight.code} &middot; {flight.flightNum}
                    </span>
                  </div>

                  {/* Times */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xl font-semibold" style={{ color: '#2D1F14' }}>
                      {flight.departure} {flight.departureCode} <span style={{ color: '#9C8E84' }}>&rarr;</span> {flight.arrival} {flight.arrivalCode}
                    </p>
                    <p className="text-xl font-semibold" style={{ color: '#C67B5C' }}>
                      {flight.price}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4 text-[12px]" style={{ color: '#6B5B4E' }}>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {flight.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Plane size={12} /> {flight.stops}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wifi size={12} /> {flight.class}
                    </span>
                  </div>

                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium mb-4"
                    style={{ backgroundColor: badge.bg, color: badge.color }}
                  >
                    {badge.icon}
                    {flight.badge}
                  </div>

                  {/* CTA */}
                  <button
                    className="w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #3D2E23',
                      color: '#3D2E23',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#C67B5C';
                      e.currentTarget.style.borderColor = '#C67B5C';
                      e.currentTarget.style.color = '#F5F0EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#3D2E23';
                      e.currentTarget.style.color = '#3D2E23';
                    }}
                  >
                    Select Flight
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
