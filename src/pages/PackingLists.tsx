import { useState } from 'react';
import { Check, Plus, Shirt, Baby, Briefcase, Pill, Plug, FileCheck } from 'lucide-react';

interface PackingItem {
  id: number;
  name: string;
  checked: boolean;
}

interface PackingCategory {
  id: number;
  title: string;
  icon: React.ReactNode;
  items: PackingItem[];
}

const initialCategories: PackingCategory[] = [
  {
    id: 1,
    title: 'Clothing',
    icon: <Shirt size={16} />,
    items: [
      { id: 1, name: 'T-shirts (5)', checked: false },
      { id: 2, name: 'Jeans / Pants (2)', checked: false },
      { id: 3, name: 'Underwear (7)', checked: false },
      { id: 4, name: 'Socks (7)', checked: false },
      { id: 5, name: 'Light jacket', checked: false },
      { id: 6, name: 'Comfortable walking shoes', checked: false },
      { id: 7, name: 'Pajamas', checked: false },
    ],
  },
  {
    id: 2,
    title: 'Kids',
    icon: <Baby size={16} />,
    items: [
      { id: 8, name: 'Kids clothes (5 sets)', checked: false },
      { id: 9, name: 'Favorite toy / comfort item', checked: false },
      { id: 10, name: 'Coloring books & crayons', checked: false },
      { id: 11, name: 'Snacks for travel', checked: false },
      { id: 12, name: 'Kids sunscreen', checked: false },
    ],
  },
  {
    id: 3,
    title: 'Toiletries',
    icon: <Pill size={16} />,
    items: [
      { id: 13, name: 'Toothbrush & toothpaste', checked: false },
      { id: 14, name: 'Shampoo & conditioner', checked: false },
      { id: 15, name: 'Skincare essentials', checked: false },
      { id: 16, name: 'Sunscreen SPF 50', checked: false },
      { id: 17, name: 'Basic first aid kit', checked: false },
    ],
  },
  {
    id: 4,
    title: 'Electronics',
    icon: <Plug size={16} />,
    items: [
      { id: 18, name: 'Phone charger', checked: false },
      { id: 19, name: 'Power adapter (Type C)', checked: false },
      { id: 20, name: 'Portable battery pack', checked: false },
      { id: 21, name: 'Headphones', checked: false },
      { id: 22, name: 'Camera & memory card', checked: false },
    ],
  },
  {
    id: 5,
    title: 'Documents',
    icon: <FileCheck size={16} />,
    items: [
      { id: 23, name: 'Passports (all family)', checked: false },
      { id: 24, name: 'Flight tickets / boarding passes', checked: false },
      { id: 25, name: 'Hotel booking confirmation', checked: false },
      { id: 26, name: 'Travel insurance documents', checked: false },
      { id: 27, name: 'Emergency contact list', checked: false },
    ],
  },
  {
    id: 6,
    title: 'Work',
    icon: <Briefcase size={16} />,
    items: [
      { id: 28, name: 'Laptop & charger', checked: false },
      { id: 29, name: 'Business cards', checked: false },
      { id: 30, name: 'Notebook & pen', checked: false },
    ],
  },
];

export default function PackingLists() {
  const [categories, setCategories] = useState<PackingCategory[]>(initialCategories);
  const [newItems, setNewItems] = useState<Record<number, string>>({});

  const toggleItem = (categoryId: number, itemId: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    );
  };

  const addItem = (categoryId: number) => {
    const name = newItems[categoryId]?.trim();
    if (!name) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: [...cat.items, { id: Date.now(), name, checked: false }],
            }
          : cat
      )
    );
    setNewItems((prev) => ({ ...prev, [categoryId]: '' }));
  };

  const deleteItem = (categoryId: number, itemId: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
          : cat
      )
    );
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.checked).length,
    0
  );
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-3" style={{ color: '#2D1F14' }}>Packing Lists</h1>

        {/* Progress */}
        <div className="flex items-center gap-4 max-w-md">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8E0D8' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: '#6E8B65' }}
            />
          </div>
          <span className="text-sm font-medium" style={{ color: '#6B5B4E' }}>
            {checkedItems}/{totalItems} ({progress}%)
          </span>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-5">
        {categories.map((category) => {
          const catChecked = category.items.filter((i) => i.checked).length;
          const catTotal = category.items.length;
          return (
            <div
              key={category.id}
              className="rounded-2xl p-5"
              style={{
                backgroundColor: '#FAF8F5',
                boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: '#C67B5C' }}>{category.icon}</span>
                <h3 className="text-sm font-semibold" style={{ color: '#2D1F14' }}>
                  {category.title}
                </h3>
                <span className="text-[11px] ml-auto" style={{ color: '#9C8E84' }}>
                  {catChecked}/{catTotal}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-1">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-3 py-2 px-1 rounded-lg transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(198,123,92,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <button
                      onClick={() => toggleItem(category.id, item.id)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          borderColor: item.checked ? '#6E8B65' : '#D9D4CF',
                          backgroundColor: item.checked ? '#6E8B65' : 'transparent',
                        }}
                      >
                        {item.checked && <Check size={12} style={{ color: '#F5F0EB' }} />}
                      </div>
                      <span
                        className="text-[14px] transition-all duration-200"
                        style={{
                          color: item.checked ? '#9C8E84' : '#2D1F14',
                          textDecoration: item.checked ? 'line-through' : 'none',
                        }}
                      >
                        {item.name}
                      </span>
                    </button>
                    {/* Delete button - visible on hover */}
                    <button
                      onClick={() => deleteItem(category.id, item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200"
                      style={{ color: '#9C8E84' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#B85C50'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#9C8E84'; }}
                      title="Delete item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Add new item */}
                <div className="flex items-center gap-2 pt-2 mt-2" style={{ borderTop: '1px dashed #D9D4CF' }}>
                  <input
                    type="text"
                    placeholder="Add new item..."
                    value={newItems[category.id] || ''}
                    onChange={(e) =>
                      setNewItems((prev) => ({ ...prev, [category.id]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addItem(category.id);
                    }}
                    className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#C67B5C';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#D9D4CF';
                    }}
                  />
                  <button
                    onClick={() => addItem(category.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{ backgroundColor: '#C67B5C' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#A65D3F'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C67B5C'; }}
                  >
                    <Plus size={16} style={{ color: '#F5F0EB' }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
