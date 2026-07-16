import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, Calendar, ArrowRight, User, X, Flame } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOGS } from '../data';

export default function BlogView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return BLOGS;
    const query = searchQuery.toLowerCase();
    return BLOGS.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      {/* Title */}
      <div className="mb-10 text-center max-w-xl mx-auto">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green-600 font-bold">
          FARMING JOURNALS
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 dark:text-white">
          Agriculture Insights & Organic Recipes
        </h2>
        <p className="text-xs text-slate-500 mt-1.5">
          Read guides from veteran veterinarians, organic agronomists, and gourmet chefs detailing poultry health and fresh veggie storage.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mt-6">
          <input
            type="text"
            placeholder="Search farming guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-xs focus:border-brand-green-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Main Grid catalog */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white border rounded-2xl dark:bg-slate-900 dark:border-slate-850">
          <span className="text-3xl block mb-2">📚</span>
          <h4 className="font-bold text-slate-800 dark:text-white text-sm">No Farming Guides Match</h4>
          <p className="text-xs text-slate-500 mt-1">Try resetting your search query.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:border-brand-green-200 hover:shadow-md transition cursor-pointer dark:border-slate-850 dark:bg-slate-900"
              onClick={() => setSelectedPost(post)}
            >
              {/* Cover Image */}
              <div className="h-48 w-full overflow-hidden bg-slate-50">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content body */}
              <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span className="uppercase text-brand-green-600 dark:text-brand-green-400 tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-slate-850 dark:text-white group-hover:text-brand-green-600 transition line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer metadata */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/60">
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold">
                    <span className="flex items-center"><User className="h-3.5 w-3.5 mr-1" /> {post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <span className="text-[10px] font-bold text-brand-green-600 dark:text-brand-green-400 flex items-center space-x-0.5 group-hover:translate-x-1 transition duration-200">
                    <span>Read Article</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 3. POST FULL-TEXT MODAL / DETAILED OVERLAY */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden dark:bg-slate-950 border border-slate-800/30 max-h-[90%] flex flex-col animate-scale-up">
            {/* Modal header details */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between dark:border-slate-850 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green-600 dark:text-brand-green-400">
                {selectedPost.category} • {selectedPost.readTime}
              </span>
              <button 
                onClick={() => setSelectedPost(null)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable text container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              <img 
                src={selectedPost.image} 
                className="w-full h-56 rounded-2xl object-cover shrink-0" 
                referrerPolicy="no-referrer"
              />

              <div className="space-y-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-slate-850 dark:text-white leading-tight">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-semibold">
                  <span className="flex items-center"><User className="h-3.5 w-3.5 mr-1" /> {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                </div>
              </div>

              <p className="text-sm italic font-medium bg-slate-50 p-4 rounded-xl dark:bg-slate-900 dark:border-slate-800 border-l-4 border-brand-green-500">
                "{selectedPost.excerpt}"
              </p>

              {/* Mock full content */}
              <div className="space-y-4 text-xs font-sans">
                <p>
                  Proper agricultural nutrition combined with certified sanitary processing protocols forms the absolute backbone of Ashshuruk Ventures. As consumers demand higher traceabilities from soil to poultry cages, commercial logistics players must re-adapt cold-chain delivery grids.
                </p>
                <h4 className="font-bold text-slate-850 dark:text-white text-sm">Key Veterinary Pillars:</h4>
                <p>
                  1. Maintain weekly microbial water cultures to completely mitigate bird flu infection channels.<br/>
                  2. Guard organic fodder formulas against mold or storage dampness to ensure pristine yellow egg yolks.<br/>
                  3. Implement immediate blast freezing and vacuum sealing upon bird processing to secure tender nutrients.
                </p>
                <p>
                  By prioritizing these veterinarian checkups, smallholder cooperatives are unlocking wholesale export-grade catalogs across Nigeria, driving a greener economic agriculture standard.
                </p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="p-4 border-t border-gray-100 bg-slate-50 flex justify-end dark:bg-slate-950 dark:border-slate-850 shrink-0">
              <button
                onClick={() => setSelectedPost(null)}
                className="rounded-lg bg-slate-800 text-white px-5 py-2 font-bold transition text-xs hover:bg-slate-900"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
