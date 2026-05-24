import { useLocation, useNavigate } from 'react-router';
import {
  Sparkles,
  Plane,
  Hotel,
  Bus,
  CalendarDays,
  CheckSquare,
  FileText,
  DollarSign,
  Settings,
  Globe,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'ASSISTANT',
    items: [
      { label: 'AI Travel Advisor', path: '/', icon: <Sparkles size={18} /> },
    ],
  },
  {
    title: 'BOOKINGS',
    items: [
      { label: 'Flights', path: '/flights', icon: <Plane size={18} /> },
      { label: 'Hotels', path: '/hotels', icon: <Hotel size={18} /> },
      { label: 'Ground Transport', path: '/transport', icon: <Bus size={18} /> },
    ],
  },
  {
    title: 'PLANNING',
    items: [
      { label: 'Itinerary', path: '/itinerary', icon: <CalendarDays size={18} />, badge: '5d' },
      { label: 'Packing Lists', path: '/packing', icon: <CheckSquare size={18} /> },
    ],
  },
  {
    title: 'TOOLS',
    items: [
      { label: 'Documents', path: '/documents', icon: <FileText size={18} /> },
      { label: 'Currency', path: '/currency', icon: <DollarSign size={18} /> },
      { label: 'Settings', path: '/settings', icon: <Settings size={18} /> },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col sidebar-responsive"
      style={{ backgroundColor: '#2D1F14', zIndex: 50, width: '260px' }}
    >
      {/* Logo - full on desktop, icon only on mobile */}
      <div className="px-6 pt-6 pb-8 logo-full">
        <div className="flex items-center gap-2">
          <Globe size={22} style={{ color: '#C67B5C' }} />
          <div>
            <h1 className="font-display text-xl tracking-wide" style={{ color: '#F5F0EB' }}>
              TravelMind
            </h1>
            <p className="text-[10px] font-medium tracking-[0.15em] uppercase" style={{ color: 'rgba(245,240,235,0.5)' }}>
              Family Travel Assistant
            </p>
          </div>
        </div>
      </div>
      {/* Mobile: icon-only logo */}
      <div className="logo-icon-only pt-6 pb-4 flex justify-center">
        <Globe size={22} style={{ color: '#C67B5C' }} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-6 nav-mobile">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-6">
            {/* Group title - hidden on mobile */}
            <p
              className="px-3 mb-2 text-[10px] font-medium tracking-[0.12em] uppercase group-title"
              style={{ color: 'rgba(156,142,132,0.7)' }}
            >
              {group.title}
            </p>
            {group.items.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 relative nav-item"
                  style={{
                    color: active ? '#F5F0EB' : '#9C8E84',
                    backgroundColor: active ? 'rgba(198,123,92,0.15)' : 'transparent',
                    borderLeft: active ? '3px solid #C67B5C' : '3px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#F5F0EB';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#9C8E84';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  title={item.label}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {/* Label - hidden on mobile */}
                  <span className="flex-1 text-left nav-label">{item.label}</span>
                  {/* Badge - hidden on mobile */}
                  {item.badge && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full nav-badge"
                      style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
