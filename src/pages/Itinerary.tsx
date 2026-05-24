import { useState } from 'react';
import { Plus, Trash2, Plane, Hotel, Utensils, Landmark, Trees } from 'lucide-react';

interface Activity {
  id: number;
  time: string;
  icon: string;
  description: string;
}

interface DayPlan {
  id: number;
  day: number;
  date: string;
  activities: Activity[];
}

const iconMap: Record<string, React.ReactNode> = {
  plane: <Plane size={16} />,
  hotel: <Hotel size={16} />,
  food: <Utensils size={16} />,
  museum: <Landmark size={16} />,
  park: <Trees size={16} />,
};

const iconKeys = Object.keys(iconMap);

// Start with a single blank Day 1 — no demo data
const initialDays: DayPlan[] = [
  {
    id: 1,
    day: 1,
    date: 'DAY 1',
    activities: [],
  },
];

export default function Itinerary() {
  const [days, setDays] = useState<DayPlan[]>(initialDays);
  const [newActivity, setNewActivity] = useState<Record<number, { time: string; text: string; iconIdx: number }>>({});

  const addDay = () => {
    const newDay: DayPlan = {
      id: Date.now(),
      day: days.length + 1,
      date: `DAY ${days.length + 1}`,
      activities: [],
    };
    setDays([...days, newDay]);
  };

  const deleteDay = (dayId: number) => {
    const filtered = days.filter((d) => d.id !== dayId);
    // Re-number remaining days
    const renumbered = filtered.map((d, i) => ({ ...d, day: i + 1, date: `DAY ${i + 1}` }));
    setDays(renumbered);
  };

  const addActivity = (dayId: number) => {
    const input = newActivity[dayId];
    if (!input || !input.text.trim()) return;

    const iconKey = iconKeys[input.iconIdx] || 'park';
    setDays((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              activities: [
                ...day.activities,
                { id: Date.now(), time: input.time || '10:00', icon: iconKey, description: input.text },
              ],
            }
          : day
      )
    );
    setNewActivity((prev) => ({ ...prev, [dayId]: { time: '', text: '', iconIdx: 0 } }));
  };

  const deleteActivity = (dayId: number, activityId: number) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? { ...day, activities: day.activities.filter((a) => a.id !== activityId) }
          : day
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>Trip Itinerary</h1>
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
            EDITABLE &middot; SYNCED &middot; REAL-TIME
          </p>
        </div>
        <button
          onClick={addDay}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
          style={{ backgroundColor: '#C67B5C', color: '#F5F0EB' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#A65D3F'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C67B5C'; }}
        >
          <Plus size={16} />
          Add Day
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {days.map((day) => (
          <div key={day.id} className="relative pl-8">
            {/* Timeline connector */}
            <div className="absolute left-3 top-0 bottom-0 w-px" style={{ backgroundColor: '#D9D4CF' }} />

            {/* Day Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C67B5C', zIndex: 1 }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F5F0EB' }}></span>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.12em]" style={{ color: '#C67B5C' }}>
                {day.date}
              </span>
              {days.length > 1 && (
                <button
                  onClick={() => deleteDay(day.id)}
                  className="ml-auto flex items-center gap-1 text-[11px] transition-colors duration-200"
                  style={{ color: '#9C8E84' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#B85C50'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9C8E84'; }}
                >
                  <Trash2 size={12} />
                  Delete Day
                </button>
              )}
            </div>

            {/* Activities */}
            <div className="rounded-xl p-5 ml-3" style={{ backgroundColor: '#FAF8F5', boxShadow: '0 2px 8px rgba(45,31,20,0.04)' }}>
              {day.activities.length === 0 ? (
                <p className="text-[13px] italic py-2" style={{ color: '#9C8E84' }}>No activities yet. Add your first activity below.</p>
              ) : (
                <div className="space-y-2">
                  {day.activities.map((activity) => (
                    <div key={activity.id} className="group flex items-start gap-3 py-2 px-1 rounded-lg transition-all duration-200" onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(198,123,92,0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                      <span className="text-sm font-medium mt-0.5 w-12 flex-shrink-0" style={{ color: '#6B5B4E' }}>{activity.time}</span>
                      <span style={{ color: '#C67B5C' }}>{iconMap[activity.icon] || iconMap.park}</span>
                      <span className="text-[15px] flex-1" style={{ color: '#2D1F14' }}>{activity.description}</span>
                      <button
                        onClick={() => deleteActivity(day.id, activity.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200"
                        style={{ color: '#9C8E84' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#B85C50'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#9C8E84'; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Activity */}
              <div className="flex items-center gap-2 mt-4 pt-3" style={{ borderTop: '1px dashed #D9D4CF' }}>
                <input
                  type="text"
                  placeholder="10:00"
                  value={newActivity[day.id]?.time || ''}
                  onChange={(e) => setNewActivity((prev) => ({ ...prev, [day.id]: { ...(prev[day.id] || { iconIdx: 0 }), time: e.target.value } }))}
                  className="w-16 px-2 py-1.5 rounded text-sm outline-none text-center"
                  style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
                />
                {/* Icon selector */}
                <div className="flex items-center gap-1">
                  {iconKeys.map((key, i) => (
                    <button
                      key={key}
                      onClick={() => setNewActivity((prev) => ({ ...prev, [day.id]: { ...(prev[day.id] || { time: '', text: '' }), iconIdx: i } }))}
                      className="w-7 h-7 rounded flex items-center justify-center transition-all duration-200"
                      style={{
                        backgroundColor: (newActivity[day.id]?.iconIdx === i) ? '#C67B5C' : '#EBE7E0',
                        color: (newActivity[day.id]?.iconIdx === i) ? '#F5F0EB' : '#9C8E84',
                      }}
                      title={key}
                    >
                      <span style={{ fontSize: '11px' }}>{iconMap[key]}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add activity..."
                  value={newActivity[day.id]?.text || ''}
                  onChange={(e) => setNewActivity((prev) => ({ ...prev, [day.id]: { ...(prev[day.id] || { time: '', iconIdx: 0 }), text: e.target.value } }))}
                  onKeyDown={(e) => { if (e.key === 'Enter') addActivity(day.id); }}
                  className="flex-1 px-3 py-1.5 rounded text-sm outline-none"
                  style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
                />
                <button
                  onClick={() => addActivity(day.id)}
                  className="w-8 h-8 rounded flex items-center justify-center transition-all duration-200"
                  style={{ backgroundColor: '#C67B5C' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#A65D3F'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C67B5C'; }}
                >
                  <Plus size={16} style={{ color: '#F5F0EB' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
