import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Sparkles } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Inquiries' },
    { id: 'poultry', name: 'Poultry & Birds' },
    { id: 'orders', name: 'Ordering & COD' },
    { id: 'delivery', name: 'Logistics' }
  ];

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category.toLowerCase() === activeCategory;
      const matchesSearch = !searchQuery.trim() || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      
      {/* Header and Search */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green-600 font-bold">
          SUPPORT OFFICE
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 dark:text-white">
          Frequently Answered Questions
        </h2>
        <p className="text-xs text-slate-500 mt-1.5">
          Find precise responses regarding live bird transport, processed slaughter hygiene, and mobile bank transfer validation metrics.
        </p>

        {/* FAQ Search */}
        <div className="relative max-w-md mx-auto mt-6">
          <input
            type="text"
            placeholder="Type your question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-xs focus:border-brand-green-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Categories select pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setActiveId(null); }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              activeCategory === cat.id
                ? 'bg-brand-green-600 text-white shadow-sm'
                : 'bg-white border border-gray-100 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-850'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border dark:bg-slate-900 dark:border-slate-800">
          <span className="text-3xl block mb-2">💡</span>
          <h4 className="font-bold text-slate-800 dark:text-white text-xs">No FAQ items match</h4>
          <p className="text-xs text-slate-400 mt-0.5">Try resetting your filters or search keywords.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div 
                key={faq.id}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition dark:border-slate-850 dark:bg-slate-900"
              >
                {/* Button toggle header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center pr-4">
                    <span className="text-brand-green-600 mr-2 shrink-0">Q.</span>
                    {faq.question}
                  </span>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="h-4 w-4 text-brand-green-600" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Answer section with sliding transition simulation */}
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-50/50 pt-3 dark:border-slate-800/50">
                    <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400 font-sans">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Custom query CTA box */}
      <div className="mt-12 rounded-2xl bg-brand-green-50/50 p-6 border border-brand-green-100/50 text-center space-y-3 dark:bg-slate-950 dark:border-slate-850">
        <h4 className="font-display text-sm font-bold text-slate-800 dark:text-white flex items-center justify-center">
          <MessageSquare className="h-4.5 w-4.5 mr-1.5 text-brand-green-600" /> Still Have Agriculture Questions?
        </h4>
        <p className="text-[11px] text-slate-500 max-w-md mx-auto dark:text-slate-450">
          Our real-time AI Chatbot (available at the bottom right) is fully integrated with our complete livestock catalogues and sanitary guidelines to resolve inquiries instantly.
        </p>
      </div>
    </div>
  );
}
