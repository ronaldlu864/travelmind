import { useState } from 'react';
import { Search, MapPin, Star } from 'lucide-react';

interface Hotel {
  id: number;
  name: string;
  location: string;
  locationTag: string;
  price: string;
  rating: number;
  description: string;
  amenities: string[];
  image: string;
}

const hotelsData: Hotel[] = [
  {
    id: 1,
    name: 'Hotel Palacio del Retiro',
    location: 'EL RETIRO',
    locationTag: 'EL RETIRO',
    price: '\u20ac185/night',
    rating: 5,
    description: 'Luxury boutique in a historic building. 10-min walk to Prado Museum.',
    amenities: ['Free WiFi', 'Gym', 'Spa', 'Breakfast incl.'],
    image: '/hotel1.jpg',
  },
  {
    id: 2,
    name: 'Room Mate Oscar',
    location: 'GRAN V\u00cdA',
    locationTag: 'GRAN V\u00cdA',
    price: '\u20ac120/night',
    rating: 4,
    description: 'Design hotel at the heart of Gran V\u00eda. Modern, stylish and well-connected.',
    amenities: ['Free WiFi', 'Rooftop Pool', 'Bar'],
    image: '/hotel2.jpg',
  },
  {
    id: 3,
    name: 'Hospes Puerta de Alcal\u00e1',
    location: 'SALAMANCA',
    locationTag: 'SALAMANCA',
    price: '\u20ac210/night',
    rating: 5,
    description: 'Upscale Salamanca district. Michelin-starred restaurant, ideal for business guests.',
    amenities: ['Free WiFi', 'Spa', 'Michelin Restaurant', 'Concierge'],
    image: '/hotel3.jpg',
  },
];

export default function Hotels() {
  const [searched, setSearched] = useState(true);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>Hotel Search</h1>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
          CURATED STAYS
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
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>DESTINATION</label>
            <input
              type="text"
              defaultValue="Madrid, Spain"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>CHECK-IN</label>
            <input
              type="text"
              defaultValue="2026/05/19"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>CHECK-OUT</label>
            <input
              type="text"
              defaultValue="2026/05/24"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>ROOMS / GUESTS</label>
            <input
              type="text"
              defaultValue="1 room \u00b7 2 guests"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>BUDGET / NIGHT</label>
            <input
              type="text"
              defaultValue="\u20ac80\u2013\u20ac200"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
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
          Search Hotels
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div>
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase mb-4" style={{ color: '#9C8E84' }}>
            {hotelsData.length} HOTELS FOUND
          </p>
          <div className="grid grid-cols-3 gap-5">
            {hotelsData.map((hotel) => (
              <div
                key={hotel.id}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: '#FAF8F5',
                  boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(45,31,20,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,31,20,0.05)';
                }}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Location */}
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin size={12} style={{ color: '#C67B5C' }} />
                    <span className="text-[10px] font-semibold tracking-[0.12em]" style={{ color: '#C67B5C' }}>
                      {hotel.locationTag}
                    </span>
                  </div>

                  {/* Name & Price */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold" style={{ color: '#2D1F14' }}>{hotel.name}</h3>
                    <span className="text-base font-semibold whitespace-nowrap" style={{ color: '#C67B5C' }}>{hotel.price}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < hotel.rating ? '#D4A853' : 'none'}
                        style={{ color: i < hotel.rating ? '#D4A853' : '#D9D4CF' }}
                      />
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[13px] mb-3 line-clamp-2" style={{ color: '#6B5B4E' }}>
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 rounded text-[11px] font-medium"
                        style={{ backgroundColor: '#EBE7E0', color: '#6B5B4E' }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#A65D3F'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C67B5C'; }}
                    >
                      Book Now
                    </button>
                    <button
                      className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{ backgroundColor: 'transparent', border: '1px solid #3D2E23', color: '#3D2E23' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EBE7E0'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
