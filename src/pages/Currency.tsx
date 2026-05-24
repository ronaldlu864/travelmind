import { useState } from 'react';
import { ArrowLeftRight, TrendingUp } from 'lucide-react';

const currencies = [
  { code: 'CNY', name: 'Chinese Yuan', symbol: '\u00a5', flag: '\ud83c\udde8\ud83c\uddf3' },
  { code: 'EUR', name: 'Euro', symbol: '\u20ac', flag: '\ud83c\uddea\ud83c\uddfa' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '\ud83c\uddfa\ud83c\uddf8' },
  { code: 'GBP', name: 'British Pound', symbol: '\u00a3', flag: '\ud83c\uddec\ud83c\udde7' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '\u00a5', flag: '\ud83c\uddef\ud83c\uddf5' },
  { code: 'KRW', name: 'Korean Won', symbol: '\u20a9', flag: '\ud83c\uddf0\ud83c\uddf7' },
];

const exchangeRates: Record<string, Record<string, number>> = {
  CNY: { EUR: 0.128, USD: 0.138, GBP: 0.109, JPY: 20.85, KRW: 185.5 },
  EUR: { CNY: 7.81, USD: 1.08, GBP: 0.85, JPY: 162.5, KRW: 1445 },
  USD: { CNY: 7.24, EUR: 0.926, GBP: 0.788, JPY: 150.3, KRW: 1337 },
  GBP: { CNY: 9.18, EUR: 1.176, USD: 1.269, JPY: 190.8, KRW: 1698 },
  JPY: { CNY: 0.048, EUR: 0.0062, USD: 0.0067, GBP: 0.0052, KRW: 8.9 },
  KRW: { CNY: 0.0054, EUR: 0.00069, USD: 0.00075, GBP: 0.00059, JPY: 0.112 },
};

export default function Currency() {
  const [fromCurrency, setFromCurrency] = useState('CNY');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1000');

  const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
  const convertedAmount = (parseFloat(amount || '0') * rate).toFixed(2);
  const fromSymbol = currencies.find((c) => c.code === fromCurrency)?.symbol || '';
  const toSymbol = currencies.find((c) => c.code === toCurrency)?.symbol || '';

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>Currency Converter</h1>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
          LIVE EXCHANGE RATES
        </p>
      </div>

      {/* Converter Card */}
      <div className="max-w-xl mx-auto">
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: '#FAF8F5',
            boxShadow: '0 8px 24px rgba(45,31,20,0.08)',
          }}
        >
          {/* From */}
          <div className="mb-4">
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-2" style={{ color: '#9C8E84' }}>
              FROM
            </label>
            <div className="flex gap-3">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="px-4 py-3 rounded-lg text-sm outline-none cursor-pointer"
                style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14', minWidth: '140px' }}
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
                style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
              />
            </div>
          </div>

          {/* Swap */}
          <div className="flex justify-center my-4">
            <button
              onClick={swapCurrencies}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: '#EBE7E0' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E0DCD4'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#EBE7E0'; }}
            >
              <ArrowLeftRight size={18} style={{ color: '#6B5B4E' }} />
            </button>
          </div>

          {/* To */}
          <div className="mb-6">
            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase mb-2" style={{ color: '#9C8E84' }}>
              TO
            </label>
            <div className="flex gap-3">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="px-4 py-3 rounded-lg text-sm outline-none cursor-pointer"
                style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14', minWidth: '140px' }}
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
              <div
                className="flex-1 px-4 py-3 rounded-lg text-sm font-semibold flex items-center"
                style={{ backgroundColor: '#F5F0EB', border: '1px solid #D9D4CF', color: '#2D1F14' }}
              >
                {toSymbol}{convertedAmount}
              </div>
            </div>
          </div>

          {/* Rate Info */}
          <div
            className="flex items-center justify-center gap-2 py-3 rounded-xl"
            style={{ backgroundColor: '#F5F0EB' }}
          >
            <TrendingUp size={14} style={{ color: '#6E8B65' }} />
            <span className="text-[12px]" style={{ color: '#6B5B4E' }}>
              1 {fromCurrency} = {rate} {toCurrency}
            </span>
          </div>
        </div>

        {/* Quick Conversions */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {['100', '500', '1000', '5000', '10000', '50000'].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className="py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: amount === val ? '#C67B5C' : '#FAF8F5',
                color: amount === val ? '#F5F0EB' : '#6B5B4E',
                border: amount === val ? 'none' : '1px solid #D9D4CF',
              }}
            >
              {fromSymbol}{val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
