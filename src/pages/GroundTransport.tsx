import { Train, BusFront, TrainFront, Car, Clock } from 'lucide-react';

interface Transport {
  id: number;
  category: string;
  icon: React.ReactNode;
  route: string;
  description: string;
  duration: string;
  price: string;
}

const transportData: Transport[] = [
  {
    id: 1,
    category: 'AVE HIGH-SPEED RAIL',
    icon: <Train size={18} />,
    route: 'Madrid \u2192 Barcelona',
    description: "Spain's AVE network, ~2.5h journey. Operated by Renfe. Book ahead for best fares.",
    duration: '2h 30m',
    price: '\u20ac35+',
  },
  {
    id: 2,
    category: 'AIRPORT EXPRESS BUS',
    icon: <BusFront size={18} />,
    route: 'MAD Airport \u2194 City Centre',
    description: 'Expr\u00e9s Aeropuerto runs 24/7 to Atocha & Neptuno. Fixed fare, simple and reliable.',
    duration: '40 min',
    price: '\u20ac5',
  },
  {
    id: 3,
    category: 'METRO LINE 8',
    icon: <TrainFront size={18} />,
    route: 'Airport \u2194 Nuevos Ministerios',
    description: 'Direct metro to city. Airport supplement of \u20ac3 applies. Total ~\u20ac4.50.',
    duration: '25 min',
    price: '\u20ac4.50',
  },
  {
    id: 4,
    category: 'TAXI / CABIFY',
    icon: <Car size={18} />,
    route: 'Airport Transfer',
    description: 'Official taxis have a flat \u20ac30 airport rate. Cabify & Uber also available with upfront pricing.',
    duration: '30 min',
    price: '\u20ac25\u201335',
  },
];

export default function GroundTransport() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>Ground Transport</h1>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
          TRAINS &middot; BUSES &middot; TAXIS &middot; MADRID
        </p>
      </div>

      {/* Transport Cards */}
      <div className="grid grid-cols-4 gap-5">
        {transportData.map((item, index) => (
          <div
            key={item.id}
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
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: '#C67B5C' }}>{item.icon}</span>
              <span className="text-[10px] font-semibold tracking-[0.12em]" style={{ color: '#C67B5C' }}>
                {item.category}
              </span>
            </div>

            {/* Route */}
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#2D1F14' }}>
              {item.route}
            </h3>

            {/* Description */}
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: '#6B5B4E' }}>
              {item.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid #E8E0D8' }}>
              <span className="flex items-center gap-1 text-[12px]" style={{ color: '#6B5B4E' }}>
                <Clock size={12} /> {item.duration}
              </span>
              <span className="text-[12px] font-semibold" style={{ color: '#C67B5C' }}>
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
