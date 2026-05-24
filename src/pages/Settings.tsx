import { useState } from 'react';
import { Save, User, Bell, Globe, Shield } from 'lucide-react';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Melvin Lu',
    email: 'melvin.lu@example.com',
    familyName: 'Lu Family',
    defaultCurrency: 'CNY',
    language: 'en',
    notifications: true,
    darkMode: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>Settings</h1>
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
            PROFILE &middot; PREFERENCES &middot; ACCOUNT
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
          style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#A65D3F'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C67B5C'; }}
        >
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: '#FAF8F5',
            boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <User size={18} style={{ color: '#C67B5C' }} />
            <h2 className="text-base font-semibold" style={{ color: '#2D1F14' }}>Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#6B5B4E' }}>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#6B5B4E' }}>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#6B5B4E' }}>Family Group Name</label>
              <input
                type="text"
                value={profile.familyName}
                onChange={(e) => setProfile({ ...profile, familyName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: '#FAF8F5',
            boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Globe size={18} style={{ color: '#C67B5C' }} />
            <h2 className="text-base font-semibold" style={{ color: '#2D1F14' }}>Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#6B5B4E' }}>Default Currency</label>
                <select
                  value={profile.defaultCurrency}
                  onChange={(e) => setProfile({ ...profile, defaultCurrency: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
                >
                  <option value="CNY">CNY — Chinese Yuan</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="GBP">GBP — British Pound</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#6B5B4E' }}>Language</label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
                >
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: '#FAF8F5',
            boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Bell size={18} style={{ color: '#C67B5C' }} />
            <h2 className="text-base font-semibold" style={{ color: '#2D1F14' }}>Notifications</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: '#2D1F14' }}>Trip reminders</p>
              <p className="text-[12px]" style={{ color: '#9C8E84' }}>Get notified about upcoming trips and check-ins</p>
            </div>
            <button
              onClick={() => setProfile({ ...profile, notifications: !profile.notifications })}
              className="w-12 h-6 rounded-full relative transition-colors duration-200"
              style={{ backgroundColor: profile.notifications ? '#C67B5C' : '#D9D4CF' }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: '#F5F0EB',
                  left: profile.notifications ? '26px' : '2px',
                }}
              />
            </button>
          </div>
        </div>

        {/* Account */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: '#FAF8F5',
            boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Shield size={18} style={{ color: '#C67B5C' }} />
            <h2 className="text-base font-semibold" style={{ color: '#2D1F14' }}>Account</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium" style={{ color: '#2D1F14' }}>Sync Status</p>
                <p className="text-[12px]" style={{ color: '#9C8E84' }}>All your data is synced across devices</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6E8B65' }}></span>
                <span className="text-[12px] font-medium" style={{ color: '#6E8B65' }}>Active</span>
              </div>
            </div>

            <div className="pt-3" style={{ borderTop: '1px solid #E8E0D8' }}>
              <button
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: '#B85C50' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#943D30'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#B85C50'; }}
              >
                Export All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
