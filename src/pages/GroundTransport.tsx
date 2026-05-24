import { useState, useEffect } from 'react';
import { Plus, Trash2, Train, BusFront, TrainFront, Car, Clock, Calendar } from 'lucide-react';

interface TransportGuide {
  id: number;
  category: string;
  icon: React.ReactNode;
  route: string;
  description: string;
  duration: string;
  price: string;
  link: string;
}

interface MyTransport {
  id: number;
  type: string;
  route: string;
  date: string;
  time: string;
  confirmation: string;
  price: string;
  source: string;
  notes: string;
}

const STORAGE_KEY = 'travelmind_transport';

function loadTransport(): MyTransport[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}
function saveTransport(items: MyTransport[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

const transportGuides: TransportGuide[] = [
  { id: 1, category: 'AVE HIGH-SPEED RAIL', icon: <Train size={18} />, route: 'Madrid \u2192 Barcelona', description: 'Spain AVE network, ~2.5h. Book ahead for best fares.', duration: '2h 30m', price: '\u20ac35+', link: 'https://www.renfe.com' },
  { id: 2, category: 'AIRPORT EXPRESS BUS', icon: <BusFront size={18} />, route: 'MAD Airport \u2194 City', description: 'Expr\u00e9s Aeropuerto runs 24/7. Fixed fare, reliable.', duration: '40 min', price: '\u20ac5', link: 'https://www.aeropuertomadrid.barajas.org' },
  { id: 3, category: 'METRO LINE 8', icon: <TrainFront size={18} />, route: 'Airport \u2194 City', description: 'Direct metro. Airport supplement \u20ac3 applies.', duration: '25 min', price: '\u20ac4.50', link: 'https://www.metromadrid.es' },
  { id: 4, category: 'TAXI / CABIFY', icon: <Car size={18} />, route: 'Airport Transfer', description: 'Flat \u20ac30 airport rate. Cabify & Uber available.', duration: '30 min', price: '\u20ac25\u201335', link: 'https://cabify.com' },
];

export default function GroundTransport() {
  const [items, setItems] = useState<MyTransport[]>(loadTransport);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: '', route: '', date: '', time: '', confirmation: '', price: '', source: '', notes: '' });

  useEffect(() => { saveTransport(items); }, [items]);

  const addItem = () => {
    if (!form.type || !form.route) return;
    setItems((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ type: '', route: '', date: '', time: '', confirmation: '', price: '', source: '', notes: '' });
    setShowAdd(false);
  };
  const deleteItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>Ground Transport</h1>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>TRAINS &middot; BUSES &middot; TAXIS &middot; MANAGE BOOKINGS</p>
      </div>

      {/* Quick Reference Guides */}
      <p className="text-[11px] font-medium tracking-[0.1em] uppercase mb-3" style={{ color: '#9C8E84' }}>QUICK REFERENCE &mdash; MADRID</p>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {transportGuides.map((item) => (
          <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="rounded-xl p-4 transition-all duration-200 hover:-translate-y-1" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 4px 12px rgba(45,31,20,0.05)', textDecoration: 'none' }}>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: '#C67B5C' }}>{item.icon}</span>
              <span className="text-[9px] font-semibold tracking-[0.1em]" style={{ color: '#C67B5C' }}>{item.category}</span>
            </div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: '#2D1F14' }}>{item.route}</h3>
            <p className="text-[11px] mb-2" style={{ color: '#6B5B4E' }}>{item.description}</p>
            <div className="flex items-center gap-3 text-[11px]" style={{ color: '#6B5B4E' }}>
              <span className="flex items-center gap-1"><Clock size={10} /> {item.duration}</span>
              <span style={{ color: '#C67B5C' }}>{item.price}</span>
            </div>
          </a>
        ))}
      </div>

      {/* My Transport Bookings */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>{items.length} BOOKING{items.length !== 1 ? 'S' : ''} SAVED</p>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200" style={{ backgroundColor: showAdd ? '#A65D3F' : '#C67B5C', color: '#F5F0EB' }}>
          <Plus size={16} /> {showAdd ? 'Cancel' : 'Add Booking'}
        </button>
      </div>

      {showAdd && (
        <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E0D8' }}>
          <h3 className="text-base font-semibold mb-4" style={{ color: '#2D1F14' }}>Add Transport Booking</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <input placeholder="Type (e.g. Train) *" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Route (e.g. Madrid → Barcelona) *" value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Source (e.g. Renfe)" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Confirmation #" value={form.confirmation} onChange={(e) => setForm({ ...form, confirmation: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
          <button onClick={addItem} className="px-6 py-2.5 rounded-lg text-sm font-medium" style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}>Save Booking</button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 4px 12px rgba(45,31,20,0.05)' }}>
          <Train size={40} style={{ color: '#D9D4CF', margin: '0 auto 12px' }} />
          <p className="text-sm" style={{ color: '#9C8E84' }}>No transport bookings yet. Click &quot;Add Booking&quot; to add your bookings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl p-5 transition-all duration-300" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 4px 12px rgba(45,31,20,0.05)' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.12em]" style={{ color: '#C67B5C' }}>{item.type.toUpperCase()}</span>
                  {item.source && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EBE7E0', color: '#6B5B4E' }}>Booked on {item.source}</span>}
                </div>
                <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded transition-colors duration-200" style={{ color: '#9C8E84' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#B85C50'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#9C8E84'; }}>
                  <Trash2 size={14} />
                </button>
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: '#2D1F14' }}>{item.route}</h3>
              <div className="flex flex-wrap gap-3 text-[12px]" style={{ color: '#6B5B4E' }}>
                {item.date && <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>}
                {item.time && <span className="flex items-center gap-1"><Clock size={12} /> {item.time}</span>}
                {item.confirmation && <span style={{ color: '#C67B5C' }}>Conf: {item.confirmation}</span>}
              </div>
              {item.price && <p className="text-base font-semibold mt-2" style={{ color: '#C67B5C' }}>{item.price}</p>}
              {item.notes && <p className="text-[12px] mt-1" style={{ color: '#9C8E84' }}>{item.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
