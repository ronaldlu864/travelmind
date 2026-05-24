import { useState, useEffect } from 'react';
import { ExternalLink, Plus, Trash2, Hotel, MapPin, Calendar } from 'lucide-react';

interface MyHotel {
  id: number;
  name: string;
  address: string;
  city: string;
  checkIn: string;
  checkOut: string;
  confirmation: string;
  price: string;
  source: string;
  notes: string;
}

const STORAGE_KEY = 'travelmind_hotels';

function loadHotels(): MyHotel[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}
function saveHotels(hotels: MyHotel[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels)); }

function buildBookingLink(city: string, checkIn: string, checkOut: string) {
  const c = encodeURIComponent(city.trim());
  return `https://www.booking.com/searchresults.html?ss=${c}&checkin=${checkIn}&checkout=${checkOut}&group_adults=2&no_rooms=1`;
}

export default function Hotels() {
  const [hotels, setHotels] = useState<MyHotel[]>(loadHotels);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState({ city: 'Madrid', checkIn: '2026-05-19', checkOut: '2026-05-24' });
  const [form, setForm] = useState({ name: '', address: '', city: '', checkIn: '', checkOut: '', confirmation: '', price: '', source: '', notes: '' });

  useEffect(() => { saveHotels(hotels); }, [hotels]);

  const addHotel = () => {
    if (!form.name || !form.city) return;
    setHotels((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ name: '', address: '', city: '', checkIn: '', checkOut: '', confirmation: '', price: '', source: '', notes: '' });
    setShowAdd(false);
  };
  const deleteHotel = (id: number) => setHotels((prev) => prev.filter((h) => h.id !== id));

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>My Hotel Bookings</h1>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>SEARCH &middot; BOOK &middot; MANAGE</p>
      </div>

      {/* Search */}
      <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 8px 24px rgba(45,31,20,0.08)' }}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>CITY</label>
            <input type="text" value={search.city} onChange={(e) => setSearch({ ...search, city: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>CHECK-IN</label>
            <input type="date" value={search.checkIn} onChange={(e) => setSearch({ ...search, checkIn: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>CHECK-OUT</label>
            <input type="date" value={search.checkOut} onChange={(e) => setSearch({ ...search, checkOut: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href={buildBookingLink(search.city, search.checkIn, search.checkOut)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200" style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}>
            <ExternalLink size={16} /> Search on Booking.com
          </a>
          <a href={`https://www.trip.com/hotels/list?city=${encodeURIComponent(search.city)}&checkin=${search.checkIn}&checkout=${search.checkOut}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200" style={{ backgroundColor: 'transparent', border: '1px solid #3D2E23', color: '#3D2E23' }}>
            <ExternalLink size={14} /> Trip.com
          </a>
        </div>
      </div>

      {/* My Bookings */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>{hotels.length} BOOKING{hotels.length !== 1 ? 'S' : ''} SAVED</p>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200" style={{ backgroundColor: showAdd ? '#A65D3F' : '#C67B5C', color: '#F5F0EB' }}>
          <Plus size={16} /> {showAdd ? 'Cancel' : 'Add Booking'}
        </button>
      </div>

      {showAdd && (
        <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E0D8' }}>
          <h3 className="text-base font-semibold mb-4" style={{ color: '#2D1F14' }}>Add Hotel Booking</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input placeholder="Hotel Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="City *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Source (e.g. Booking.com)" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Confirmation #" value={form.confirmation} onChange={(e) => setForm({ ...form, confirmation: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Price (total)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
          <button onClick={addHotel} className="px-6 py-2.5 rounded-lg text-sm font-medium" style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}>Save Booking</button>
        </div>
      )}

      {hotels.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 4px 12px rgba(45,31,20,0.05)' }}>
          <Hotel size={40} style={{ color: '#D9D4CF', margin: '0 auto 12px' }} />
          <p className="text-sm" style={{ color: '#9C8E84' }}>No hotel bookings yet. Click &quot;Add Booking&quot; to add your hotels.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="rounded-2xl p-5 transition-all duration-300" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 4px 12px rgba(45,31,20,0.05)' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold" style={{ color: '#2D1F14' }}>{hotel.name}</h3>
                  {hotel.source && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EBE7E0', color: '#6B5B4E' }}>Booked on {hotel.source}</span>}
                </div>
                <button onClick={() => deleteHotel(hotel.id)} className="p-1.5 rounded transition-colors duration-200" style={{ color: '#9C8E84' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#B85C50'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#9C8E84'; }}>
                  <Trash2 size={14} />
                </button>
              </div>
              {hotel.address && <p className="flex items-center gap-1 text-[12px] mb-2" style={{ color: '#6B5B4E' }}><MapPin size={12} /> {hotel.address}, {hotel.city}</p>}
              <div className="flex flex-wrap gap-3 text-[12px] mb-2" style={{ color: '#6B5B4E' }}>
                <span className="flex items-center gap-1"><Calendar size={12} /> {hotel.checkIn || '—'} → {hotel.checkOut || '—'}</span>
                {hotel.confirmation && <span style={{ color: '#C67B5C' }}>Conf: {hotel.confirmation}</span>}
              </div>
              {hotel.price && <p className="text-base font-semibold" style={{ color: '#C67B5C' }}>{hotel.price}</p>}
              {hotel.notes && <p className="text-[12px] mt-2" style={{ color: '#9C8E84' }}>{hotel.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
