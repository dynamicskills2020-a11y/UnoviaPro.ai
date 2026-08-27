import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PromptItem } from '../types';
import { PROMPTS_DATA } from '../data/promptsData';
import {
  FileText,
  Search,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Plus,
  X,
  Bot,
  Filter,
} from 'lucide-react';

export const PromptLibrary: React.FC = () => {
  const {
    savedPromptIds,
    toggleSavePrompt,
    customPrompts,
    addCustomPrompt,
    setCurrentView,
    addXp,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);

  // New prompt form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PromptItem['category']>('Marketing');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newTargetTool, setNewTargetTool] = useState('ChatGPT / Gemini');

  const categories = [
    'All',
    'Marketing',
    'Business',
    'Content Writing',
    'Coding',
    'Image Generation',
    'Career',
    'Students',
  ];

  const allPrompts = useMemo(() => {
    return [...customPrompts, ...PROMPTS_DATA];
  }, [customPrompts]);

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((p) => {
      const isSaved = savedPromptIds.includes(p.id);
      if (onlySaved && !isSaved) return false;

      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allPrompts, selectedCategory, searchQuery, onlySaved, savedPromptIds]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addXp(10, 'Copied AI prompt blueprint');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addCustomPrompt({
      title: newTitle,
      category: newCategory,
      content: newContent,
      targetTool: newTargetTool,
      tags: newTags ? newTags.split(',').map((t) => t.trim()) : ['Custom', 'User-Created'],
      useCase: 'Custom workflow template',
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Create CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>100+ Production Prompts</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              AI Prompt Vault & Blueprints
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Curated master prompt templates structured with the RCTF framework to unlock peak reasoning from ChatGPT, Gemini, Claude, and Midjourney.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-black/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Prompt</span>
            </button>

            <button
              onClick={() => setCurrentView('mentor')}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-cyan-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Prompt Improver</span>
            </button>
          </div>
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
                placeholder="Search prompt templates by keyword, task, or tag..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 focus:border-amber-400/50 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Category Pills & Saved Toggle */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all backdrop-blur-md ${
                  onlySaved
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved ({savedPromptIds.length})</span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setOnlySaved(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all backdrop-blur-md ${
                    selectedCategory === cat && !onlySaved
                      ? 'bg-white text-indigo-700 font-bold shadow-md'
                      : 'bg-white/5 text-slate-300 hover:text-slate-100 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrompts.map((p) => {
            const isSaved = savedPromptIds.includes(p.id);

            return (
              <div
                key={p.id}
                className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 p-6 space-y-4 flex flex-col justify-between transition-all duration-300 shadow-2xl group hover:scale-[1.01]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-slate-300 font-medium">
                          Tool: {p.targetTool}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                        {p.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleSavePrompt(p.id)}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-amber-400 transition-colors border border-white/10"
                      title={isSaved ? 'Remove from Saved' : 'Save to Favorites'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-5 h-5 text-amber-400 fill-amber-400" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Prompt Text Box */}
                  <div className="relative rounded-2xl bg-black/30 p-4 border border-white/10 font-mono text-xs text-slate-200 select-all leading-relaxed max-h-48 overflow-y-auto">
                    {p.content}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 backdrop-blur-md"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Copy Button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Author: <span className="text-slate-300">{p.author || 'Unovia Curators'}</span>
                  </span>

                  <button
                    onClick={() => handleCopy(p.content, p.id)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-amber-300 hover:text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md"
                  >
                    {copiedId === p.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 font-bold">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Master Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Custom Prompt Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl">
            <div className="relative w-full max-w-xl rounded-3xl bg-[#0a0524]/90 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-5 text-slate-100 shadow-2xl animate-in fade-in zoom-in-95">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" />
                  <span>Create Custom Prompt Template</span>
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Save your reusable prompt recipe to your personal library and earn +75 XP.
                </p>
              </div>

              <form onSubmit={handleCreatePrompt} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Prompt Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. B2B SaaS Value Proposition Generator"
                    className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:border-amber-400 text-xs text-slate-100 placeholder-slate-400 backdrop-blur-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-100 backdrop-blur-md"
                    >
                      <option value="Marketing" className="bg-slate-900">Marketing</option>
                      <option value="Business" className="bg-slate-900">Business</option>
                      <option value="Content Writing" className="bg-slate-900">Content Writing</option>
                      <option value="Coding" className="bg-slate-900">Coding</option>
                      <option value="Image Generation" className="bg-slate-900">Image Generation</option>
                      <option value="Career" className="bg-slate-900">Career</option>
                      <option value="Students" className="bg-slate-900">Students</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Target AI Tool</label>
                    <input
                      type="text"
                      value={newTargetTool}
                      onChange={(e) => setNewTargetTool(e.target.value)}
                      placeholder="e.g. ChatGPT / Claude 3.5"
                      className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-100 placeholder-slate-400 backdrop-blur-md"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Prompt Content</label>
                  <textarea
                    rows={5}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Provide role, instructions, context brackets, and output structure..."
                    className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-slate-100 placeholder-slate-400 backdrop-blur-md"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="sales, copywriting, email"
                    className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-100 placeholder-slate-400 backdrop-blur-md"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 text-xs backdrop-blur-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs shadow-md shadow-black/20"
                  >
                    Save & Add to Library (+75 XP)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
