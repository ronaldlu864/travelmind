import { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Sparkles, Key } from 'lucide-react';
import { callKimiAPI, KIMI_CONFIG } from '../config/api';

interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

const quickPrompts = [
  { emoji: '🗺️', text: 'Plan Madrid itinerary' },
  { emoji: '🪪', text: 'Schengen visa guide' },
  { emoji: '🎒', text: 'Packing tips for Spain' },
  { emoji: '🏨', text: 'Family hotel picks' },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm TravelMind, your family's AI travel assistant 🌍\n\nI can help you plan trips, find flights & hotels, build packing lists, explain visa requirements, and more. What's your next adventure?",
    timestamp: '',
  },
];

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [, setShowError] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(!KIMI_CONFIG.API_KEY);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowError(false);

    // Demo mode: simulate responses when API key is not set
    if (apiKeyMissing) {
      setTimeout(() => {
        setIsTyping(false);
        const demoResponses = [
          "I'd love to help you plan that! Let me search for the best options for your family.",
          "Great choice! Madrid is perfect for families. Here are some recommendations...",
          "Let me find the most family-friendly options for you. This might take a moment.",
          "I've found some wonderful options! Here's what I recommend for your trip.",
        ];
        const assistantMsg: Message = {
          id: Date.now() + 1,
          role: 'assistant',
          content: demoResponses[Math.floor(Math.random() * demoResponses.length)] +
            '\n\n_This is a demo response. Add your KIMI API Key to get real AI responses._',
          timestamp: getTimestamp(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }, 1500);
      return;
    }

    // Real API call
    try {
      const history = [...messages, userMsg]
        .filter((m) => m.role !== 'system' && m.content)
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));

      const reply = await callKimiAPI(history);

      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: reply,
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const error = err as Error;
      setShowError(true);

      if (error.message?.includes('KIMI_API_KEY_NOT_SET')) {
        setApiKeyMissing(true);
        const errorMsg: Message = {
          id: Date.now() + 1,
          role: 'system',
          content: 'KIMI API Key is not configured. Please add your API Key in src/config/api.ts to enable the AI assistant.',
          timestamp: getTimestamp(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } else {
        const errorMsg: Message = {
          id: Date.now() + 1,
          role: 'system',
          content: error.message || 'Connection error. Please check your network and try again.',
          timestamp: getTimestamp(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (text: string) => {
    handleSend(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-display text-4xl" style={{ color: '#2D1F14' }}>AI Travel Advisor</h1>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: apiKeyMissing ? '#D4A853' : '#6E8B65' }}></span>
          <span className="text-sm font-medium" style={{ color: apiKeyMissing ? '#D4A853' : '#6B5B4E' }}>
            {apiKeyMissing ? 'Demo Mode' : 'Online'}
          </span>
        </div>
      </div>

      {/* API Key Setup Banner */}
      {apiKeyMissing && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            backgroundColor: 'rgba(212,168,83,0.08)',
            border: '1px solid rgba(212,168,83,0.3)',
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(212,168,83,0.15)' }}>
              <Key size={18} style={{ color: '#D4A853' }} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-1" style={{ color: '#2D1F14' }}>
                KIMI API Key Required
              </h3>
              <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#6B5B4E' }}>
                To enable the AI assistant, you need to add your KIMI API Key. The app is currently running in demo mode with simulated responses.
              </p>
              <div className="space-y-1.5 text-[12px]" style={{ color: '#6B5B4E' }}>
                <p><strong style={{ color: '#2D1F14' }}>1.</strong> Visit <a href="https://platform.moonshot.cn/" target="_blank" rel="noopener noreferrer" style={{ color: '#C67B5C', textDecoration: 'underline' }}>platform.moonshot.cn</a> and sign in</p>
                <p><strong style={{ color: '#2D1F14' }}>2.</strong> Go to &quot;API Keys&quot; in your account settings</p>
                <p><strong style={{ color: '#2D1F14' }}>3.</strong> Click &quot;Create API Key&quot; and copy the key</p>
                <p><strong style={{ color: '#2D1F14' }}>4.</strong> Open <code style={{ backgroundColor: 'rgba(212,168,83,0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>src/config/api.ts</code> and paste the key into <code style={{ backgroundColor: 'rgba(212,168,83,0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>API_KEY</code></p>
                <p><strong style={{ color: '#2D1F14' }}>5.</strong> Rebuild and redeploy: <code style={{ backgroundColor: 'rgba(212,168,83,0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>npm run build</code></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="space-y-6 mb-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className="flex-shrink-0">
              {msg.role === 'assistant' && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C67B5C' }}>
                  <Sparkles size={18} style={{ color: '#F5F0EB' }} />
                </div>
              )}
              {msg.role === 'user' && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: '#3D2E23', color: '#F5F0EB' }}>
                  M
                </div>
              )}
              {msg.role === 'system' && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4A853' }}>
                  <AlertTriangle size={18} style={{ color: '#2D1F14' }} />
                </div>
              )}
            </div>

            {/* Message Bubble */}
            <div
              className="max-w-[80%] rounded-2xl px-5 py-4 animate-in slide-in-from-bottom-2 duration-300"
              style={{
                backgroundColor: msg.role === 'user' ? '#2D1F14' : msg.role === 'system' ? '#FAF8F5' : '#FAF8F5',
                color: msg.role === 'user' ? '#F5F0EB' : '#2D1F14',
                border: msg.role === 'system' ? '1px solid #D4A853' : 'none',
              }}
            >
              {msg.role === 'system' && (
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={14} style={{ color: '#D4A853' }} />
                  <span className="text-sm font-medium" style={{ color: '#D4A853' }}>Warning</span>
                </div>
              )}
              <p className="text-[15px] leading-relaxed whitespace-pre-line">{msg.content}</p>
              {msg.timestamp && (
                <p className="text-[11px] mt-2" style={{ color: msg.role === 'user' ? 'rgba(245,240,235,0.5)' : '#9C8E84' }}>
                  {msg.timestamp}
                </p>
              )}

              {/* Quick Prompts */}
              {msg.role === 'assistant' && msg.id === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt.text}
                      onClick={() => handlePromptClick(`${prompt.emoji} ${prompt.text}`)}
                      className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        backgroundColor: '#EBE7E0',
                        color: '#2D1F14',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E0DCD4';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#EBE7E0';
                      }}
                    >
                      {prompt.emoji} {prompt.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C67B5C' }}>
              <Sparkles size={18} style={{ color: '#F5F0EB' }} />
            </div>
            <div className="rounded-2xl px-5 py-4" style={{ backgroundColor: '#FAF8F5' }}>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#9C8E84', animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#9C8E84', animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#9C8E84', animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 pt-4 pb-2" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(input);
              }}
              placeholder={apiKeyMissing ? "Demo mode - type anything to try..." : "Ask anything about your trip..."}
              className="w-full px-5 py-3.5 rounded-xl text-[15px] outline-none transition-all duration-200"
              style={{
                backgroundColor: '#FAF8F5',
                border: '1px solid #D9D4CF',
                color: '#2D1F14',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#C67B5C';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198,123,92,0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#D9D4CF';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#C67B5C' }}
            onMouseEnter={(e) => {
              if (input.trim()) e.currentTarget.style.backgroundColor = '#A65D3F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C67B5C';
            }}
          >
            <Send size={18} style={{ color: '#F5F0EB' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
