import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AiTool } from '../types';
import { AI_TOOLS_DATA } from '../data/toolsData';
import {
  Wrench,
  Search,
  ExternalLink,
  Sparkles,
  BookOpen,
  X,
  Copy,
  Check,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export const AiToolsDirectory: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolModal, setSelectedToolModal] = useState<AiTool | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'AI Writing',
    'AI Image Generation',
    'AI Video Generation',
    'AI Voice',
    'AI Presentation',
    'AI Coding',
    'AI Marketing',
    'AI Productivity',
    'AI Automation',
  ];

  const filteredTools = useMemo(() => {
    return AI_TOOLS_DATA.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-purple-300 text-xs font-semibold backdrop-blur-md">
            <Wrench className="w-3.5 h-3.5 text-purple-300" />
            <span>Essential AI Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI Tools Directory & Master Guides
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Curated directory of the world's most powerful AI tools with quickstart guides, best-use scenarios, and copy-paste prompt blueprints.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tool name or tag (e.g. Midjourney, Claude, ElevenLabs)..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 focus:border-purple-400/50 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all backdrop-blur-md ${
                    selectedCategory === cat
                      ? 'bg-white text-indigo-700 font-bold shadow-md'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 p-6 space-y-4 flex flex-col justify-between transition-all duration-300 group shadow-2xl hover:scale-[1.01]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
                      {tool.logo}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-purple-300">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
                      tool.pricing === 'Free'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : tool.pricing === 'Freemium'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {tool.pricing}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>

                <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs">
                  <span className="text-slate-400 font-medium">Pro Tip: </span>
                  <span className="text-slate-200 font-semibold line-clamp-2">{tool.proTip}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tool.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 backdrop-blur-md">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedToolModal(tool)}
                  className="flex-1 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-purple-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all backdrop-blur-md"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Master Guide</span>
                </button>

                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors backdrop-blur-md"
                  title="Visit Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Learn How to Use Modal */}
        {selectedToolModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl overflow-y-auto">
            <div className="relative w-full max-w-2xl rounded-3xl bg-[#0a0524]/90 backdrop-blur-2xl border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedToolModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <span className="text-4xl p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  {selectedToolModal.logo}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedToolModal.name} Master Guide</h2>
                  <p className="text-xs text-purple-300 font-semibold">{selectedToolModal.category} • {selectedToolModal.pricing}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">How to Use & Pro Tips</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedToolModal.proTip}
                </p>
              </div>

              {selectedToolModal.samplePrompt && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Recommended Prompt Recipe</span>
                  </h3>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Blueprint Recipe</span>
                      <button
                        onClick={() => handleCopyPrompt(selectedToolModal.samplePrompt || '', 0)}
                        className="text-purple-300 hover:text-white flex items-center gap-1 text-[11px] font-semibold"
                      >
                        {copiedIndex === 0 ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="font-mono text-slate-200 select-all">{selectedToolModal.samplePrompt}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={selectedToolModal.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-2 shadow-lg shadow-black/20 transition-all"
                >
                  <span>Open Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    setSelectedToolModal(null);
                    setCurrentView('courses');
                  }}
                  className="text-xs text-indigo-300 hover:text-white hover:underline transition-colors"
                >
                  View Related Courses →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
