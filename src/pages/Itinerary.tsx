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

const initialDays: DayPlan[] = [
  {
    id: 1,
    day: 1,
    date: 'MAY 19',
    activities: [
      { id: 1, time: '14:00', icon: 'plane', description: 'Arrive Madrid Barajas T4' },
      { id: 2, time: '15:30', icon: 'hotel', description: 'Hotel check-in \u2014 near Sol or Retiro area' },
      { id: 3, time: '18:00', icon: 'park', description: 'Puerta del Sol stroll \u2014 city centre orientation' },
      { id: 4, time: '20:30', icon: 'food', description: 'Dinner: Jam\u00f3n Ib\u00e9rico & local wine at a taberna' },
    ],
  },
  {
    id: 2,
    day: 2,
    date: 'MAY 20',
    activities: [
      { id: 5, time: '09:00', icon: 'museum', description: 'Museo del Prado \u2014 pre-book tickets (~3 hours)' },
      { id: 6, time: '13:00', icon: 'food', description: 'Lunch near El Retiro park' },
      { id: 7, time: '15:00', icon: 'park', description: 'El Retiro Park \u2014 Palacio de Cristal & rowing lake' },
      { id: 8, time: '19:00', icon: 'museum', description: "Reina Sof\u00eda Museum \u2014 Picasso's Guernica" },
    ],
  },
  {
    id: 3,
    day: 3,
    date: 'MAY 21',
    activities: [
      { id: 9, time: '09:00', icon: 'hotel', description: 'SCM Railway Supply-Demand Meet-up (full day)' },
      { id: 10, time: '13:00', icon: 'food', description: 'Business lunch with suppliers & buyers' },
    ],
  },
];

export default function Itinerary() {
  const [days, setDays] = useState<DayPlan[]>(initialDays);
  const [newActivity, setNewActivity] = useState<Record<number, { time: string; text: string }>>({});

  const addDay = () => {
    const newDay: DayPlan = {
      id: Date.now(),
      day: days.length + 1,
      date: `MAY ${19 + days.length}`,
      activities: [],
    };
    setDays([...days, newDay]);
  };

  const deleteDay = (dayId: number) => {
    setDays(days.filter((d) => d.id !== dayId));
  };

  const addActivity = (dayId: number) => {
    const input = newActivity[dayId];
    if (!input || !input.text.trim()) return;

    setDays((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              activities: [
                ...day.activities,
                {
                  id: Date.now(),
                  time: input.time || '10:00',
                  icon: 'park',
                  description: input.text,
                },
              ],
            }
          : day
      )
    );
    setNewActivity((prev) => ({ ...prev, [dayId]: { time: '', text: '' } }));
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
            <div
              className="absolute left-3 top-0 bottom-0 w-px"
              style={{ backgroundColor: '#D9D4CF' }}
            />

            {/* Day Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#C67B5C', zIndex: 1 }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F5F0EB' }}></span>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.12em]" style={{ color: '#C67B5C' }}>
                DAY {day.day}
              </span>
              <span className="text-[11px] font-medium" style={{ color: '#9C8E84' }}>
                &middot; {day.date}
              </span>
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
            </div>

            {/* Activities */}
            <div
              className="rounded-xl p-5 ml-3"
              style={{
                backgroundColor: '#FAF8F5',
                boxShadow: '0 2px 8px rgba(45,31,20,0.04)',
              }}
            >
              <div className="space-y-3">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <span className="text-sm font-medium mt-0.5 w-12 flex-shrink-0" style={{ color: '#6B5B4E' }}>
                      {activity.time}
                    </span>
                    <span style={{ color: '#C67B5C' }}>{iconMap[activity.icon] || iconMap.park}</span>
                    <span className="text-[15px]" style={{ color: '#2D1F14' }}>
                      {activity.description}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add Activity */}
              <div className="flex items-center gap-2 mt-4 pt-3" style={{ borderTop: '1px dashed #D9D4CF' }}>
                <input
                  type="text"
                  placeholder="10:00"
                  value={newActivity[day.id]?.time || ''}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      [day.id]: { ...prev[day.id], time: e.target.value },
                    }))
                  }
                  className="w-16 px-2 py-1.5 rounded text-sm outline-none text-center"
                  style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
                />
                <input
                  type="text"
                  placeholder="Add activity..."
                  value={newActivity[day.id]?.text || ''}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      [day.id]: { ...prev[day.id], text: e.target.value },
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addActivity(day.id);
                  }}
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
