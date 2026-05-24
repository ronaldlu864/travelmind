import { Routes, Route } from 'react-router';
import Sidebar from './components/Sidebar';
import AIAdvisor from './pages/AIAdvisor';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import GroundTransport from './pages/GroundTransport';
import Itinerary from './pages/Itinerary';
import PackingLists from './pages/PackingLists';
import Documents from './pages/Documents';
import Currency from './pages/Currency';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F5F0EB' }}>
      <Sidebar />
      <main className="flex-1 ml-[260px] min-h-screen">
        {/* Topbar */}
        <header className="h-14 flex items-center justify-end px-8 sticky top-0 z-40" style={{ backgroundColor: 'rgba(245,240,235,0.92)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6E8B65' }}></span>
              <span className="text-[13px] font-medium" style={{ color: '#6B5B4E' }}>Synced</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#3D2E23' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}>
                M
              </div>
              <span className="text-[13px] font-medium" style={{ color: '#F5F0EB' }}>Melvin Lu</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Routes>
            <Route path="/" element={<AIAdvisor />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/transport" element={<GroundTransport />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/packing" element={<PackingLists />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/currency" element={<Currency />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
