import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, HelpCircle, Loader2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 Hello! I am **Ashshuruk-Bot**, your farm-fresh AI advisor. I can answer any questions about our poultry, egg crates, live catfish, vegetable stock, delivery times, and how local suppliers can partner with us! What's on your table today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How much is live broiler?",
    "Do you support Cash on Delivery?",
    "How do I register as a supplier?",
    "Tell me about egg grades"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: data.text || "I apologize, I am experiencing a temporary connection issue with our grain stores.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: "I am having trouble reaching our chicken coop server. Please make sure our backend is running and your Gemini API key is configured in the secrets menu!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const parseMarkdown = (text: string) => {
    // Simple bold markdown translation for safety and weight
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-emerald-950 dark:text-emerald-100">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Window */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[360px] flex-col rounded-2xl border border-gray-100 bg-white shadow-2xl transition duration-300 dark:border-slate-800 dark:bg-slate-900 sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-brand-green-700 px-4 py-3.5 text-white">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-brand-gold-light">
                <Bot className="h-5 w-5 animate-bounce" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold leading-tight">Ashshuruk Advisor</h4>
                <p className="text-[10px] text-brand-green-100 flex items-center">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>AI Agent • Online Helpdesk</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 hover:bg-white/10 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-green-700 text-white rounded-br-none'
                      : 'bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800/50 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{parseMarkdown(msg.text)}</p>
                  <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 rounded-2xl bg-white px-4 py-3 text-xs border border-slate-100 dark:bg-slate-800 dark:border-slate-800">
                  <Loader2 className="h-4 w-4 animate-spin text-brand-green-600" />
                  <span className="text-slate-400 font-medium">Drafting agricultural response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick recommendations */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                <HelpCircle className="h-3 w-3 mr-1 text-brand-green-500" /> Suggested Queries
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="rounded-full bg-slate-100 hover:bg-brand-green-100 hover:text-brand-green-700 border border-slate-200/50 dark:border-slate-700 dark:bg-slate-800 text-[10px] px-3 py-1 text-slate-600 dark:text-slate-300 transition text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center space-x-2 border-t border-gray-100 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 rounded-b-2xl"
          >
            <input
              type="text"
              placeholder="Ask anything about our farm..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs placeholder-slate-400 outline-none focus:border-brand-green-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:focus:bg-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green-600 text-white hover:bg-brand-green-700 disabled:opacity-30 disabled:cursor-not-allowed transition shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Trigger floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-600 text-white shadow-2xl hover:bg-brand-green-700 hover:scale-105 transition duration-300"
        aria-label="Ask Support Assistant"
      >
        {isOpen ? <Minimize2 className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}
