import { useState, useEffect } from 'react';
import { ExternalLink, Plus, Trash2, Plane, Clock, Calendar } from 'lucide-react';

interface MyFlight {
  id: number;
  airline: string;
  flightNum: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departDate: string;
  departTime: string;
  arriveTime: string;
  pnr: string;
  price: string;
  source: string;
}

const STORAGE_KEY = 'travelmind_flights';

function loadFlights(): MyFlight[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFlights(flights: MyFlight[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
}

function buildTripLink(from: string, to: string, date: string, ret: string) {
  const f = encodeURIComponent(from.trim());
  const t = encodeURIComponent(to.trim());
  const d = date.replace(/\//g, '-');
  const r = ret.replace(/\//g, '-');
  return `https://us.trip.com/flights/${f}-to-${t}/tickets-sheap-?dcity=${f}&acity=${t}&ddate=${d}&rdate=${r}&flighttype=rt&class=y&lowpricesource=searchform&quantity=1&searchboxarg=t`;
}

export default function Flights() {
  const [flights, setFlights] = useState<MyFlight[]>(loadFlights);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState({ from: 'Beijing', to: 'Madrid', depart: '2026-05-19', return: '2026-05-24' });
  const [form, setForm] = useState({
    airline: '', flightNum: '', from: '', fromCode: '', to: '', toCode: '',
    departDate: '', departTime: '', arriveTime: '', pnr: '', price: '', source: '',
  });

  useEffect(() => { saveFlights(flights); }, [flights]);

  const addFlight = () => {
    if (!form.airline || !form.from || !form.to || !form.departDate) return;
    const newFlight: MyFlight = {
      id: Date.now(),
      airline: form.airline,
      flightNum: form.flightNum,
      from: form.from,
      fromCode: form.fromCode || form.from.slice(0, 3).toUpperCase(),
      to: form.to,
      toCode: form.toCode || form.to.slice(0, 3).toUpperCase(),
      departDate: form.departDate,
      departTime: form.departTime,
      arriveTime: form.arriveTime,
      pnr: form.pnr,
      price: form.price,
      source: form.source || 'Other',
    };
    setFlights((prev) => [...prev, newFlight]);
    setForm({ airline: '', flightNum: '', from: '', fromCode: '', to: '', toCode: '', departDate: '', departTime: '', arriveTime: '', pnr: '', price: '', source: '' });
    setShowAdd(false);
  };

  const deleteFlight = (id: number) => setFlights((prev) => prev.filter((f) => f.id !== id));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>My Flight Bookings</h1>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
          SEARCH &middot; BOOK &middot; MANAGE
        </p>
      </div>

      {/* Search & Book Section */}
      <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 8px 24px rgba(45,31,20,0.08)' }}>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>FROM</label>
            <input type="text" value={search.from} onChange={(e) => setSearch({ ...search, from: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>TO</label>
            <input type="text" value={search.to} onChange={(e) => setSearch({ ...search, to: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>DEPART</label>
            <input type="date" value={search.depart} onChange={(e) => setSearch({ ...search, depart: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
          <div>
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5" style={{ color: '#9C8E84' }}>RETURN</label>
            <input type="date" value={search.return} onChange={(e) => setSearch({ ...search, return: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={buildTripLink(search.from, search.to, search.depart, search.return)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}
          >
            <ExternalLink size={16} />
            Search on Trip.com
          </a>
          <a
            href={`https://www.skyscanner.com/transport/flights/${search.from.toLowerCase().slice(0,3)}/${search.to.toLowerCase().slice(0,3)}/?adults=1&adultsv2=1&cabinclass=economy&children=0&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&oym=${search.depart.slice(0,7)}&iym=${search.return.slice(0,7)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ backgroundColor: 'transparent', border: '1px solid #3D2E23', color: '#3D2E23' }}
          >
            <ExternalLink size={14} />
            Skyscanner
          </a>
        </div>
      </div>

      {/* My Bookings Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
          {flights.length} BOOKING{flights.length !== 1 ? 'S' : ''} SAVED
        </p>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{ backgroundColor: showAdd ? '#A65D3F' : '#C67B5C', color: '#F5F0EB' }}
        >
          <Plus size={16} />
          {showAdd ? 'Cancel' : 'Add Booking'}
        </button>
      </div>

      {/* Add Flight Form */}
      {showAdd && (
        <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: '#FAF8F5', border: '1px solid #E8E0D8' }}>
          <h3 className="text-base font-semibold mb-4" style={{ color: '#2D1F14' }}>Add Flight Booking</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input placeholder="Airline (e.g. Air China)" value={form.airline} onChange={(e) => setForm({ ...form, airline: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Flight Number (e.g. CA1521)" value={form.flightNum} onChange={(e) => setForm({ ...form, flightNum: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Source App (e.g. Trip.com)" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="From City" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="From Code (e.g. PEK)" value={form.fromCode} onChange={(e) => setForm({ ...form, fromCode: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="To City" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="To Code (e.g. MAD)" value={form.toCode} onChange={(e) => setForm({ ...form, toCode: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input type="date" placeholder="Depart Date" value={form.departDate} onChange={(e) => setForm({ ...form, departDate: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Depart Time" value={form.departTime} onChange={(e) => setForm({ ...form, departTime: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Arrive Time" value={form.arriveTime} onChange={(e) => setForm({ ...form, arriveTime: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="PNR / Confirmation" value={form.pnr} onChange={(e) => setForm({ ...form, pnr: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
            <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="px-4 py-2.5 rounded-lg text-sm outline-none" style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }} />
          </div>
          <button onClick={addFlight} className="px-6 py-2.5 rounded-lg text-sm font-medium" style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}>
            Save Booking
          </button>
        </div>
      )}

      {/* Flight Cards */}
      {flights.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 4px 12px rgba(45,31,20,0.05)' }}>
          <Plane size={40} style={{ color: '#D9D4CF', margin: '0 auto 12px' }} />
          <p className="text-sm" style={{ color: '#9C8E84' }}>No flight bookings yet. Click &quot;Add Booking&quot; to add your flights.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight) => (
            <div key={flight.id} className="rounded-2xl p-5 transition-all duration-300" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 4px 12px rgba(45,31,20,0.05)' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.12em]" style={{ color: '#C67B5C' }}>
                    {flight.airline.toUpperCase()} {flight.flightNum && `· ${flight.flightNum}`}
                  </span>
                  {flight.source && <span className="ml-3 text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EBE7E0', color: '#6B5B4E' }}>Booked on {flight.source}</span>}
                </div>
                <button onClick={() => deleteFlight(flight.id)} className="p-1.5 rounded transition-colors duration-200" style={{ color: '#9C8E84' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#B85C50'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#9C8E84'; }}>
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex items-center gap-6 mb-3">
                <div className="flex-1">
                  <p className="text-xl font-semibold" style={{ color: '#2D1F14' }}>
                    {flight.fromCode} <Plane size={14} className="inline mx-1" style={{ color: '#9C8E84' }} /> {flight.toCode}
                  </p>
                  <p className="text-[12px]" style={{ color: '#6B5B4E' }}>{flight.from} → {flight.to}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold" style={{ color: '#C67B5C' }}>{flight.price || '—'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-[12px]" style={{ color: '#6B5B4E' }}>
                <span className="flex items-center gap-1"><Calendar size={12} /> {flight.departDate}</span>
                {flight.departTime && <span className="flex items-center gap-1"><Clock size={12} /> {flight.departTime} - {flight.arriveTime}</span>}
                {flight.pnr && <span style={{ color: '#C67B5C' }}>PNR: {flight.pnr}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
