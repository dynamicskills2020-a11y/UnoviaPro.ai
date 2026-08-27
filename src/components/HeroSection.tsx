import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Play,
  Award,
  Flame,
  CheckCircle2,
  Users,
  Star,
  Zap,
  Bot,
  Layers,
  TrendingUp,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, openAuthModal, t } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-300 text-xs font-semibold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Next-Gen AI Learning Platform & Marketplace</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Master <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-200 to-cyan-300">Artificial Intelligence</span> Skills for the Future
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('heroSubheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-cta-start-free"
                onClick={() => setCurrentView('courses')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-base shadow-xl shadow-black/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>{t('startLearningFree')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-explore-courses"
                onClick={() => setCurrentView('mentor')}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 hover:border-white/30 font-bold text-base backdrop-blur-md transition-all flex items-center justify-center gap-2 group shadow-sm"
              >
                <Bot className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>Ask AI Mentor</span>
              </button>
            </div>

            {/* Micro Social Proof Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="Student"
                    className="w-7 h-7 rounded-full border-2 border-white/20 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="Student"
                    className="w-7 h-7 rounded-full border-2 border-white/20 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&auto=format&fit=crop&q=80"
                    alt="Student"
                    className="w-7 h-7 rounded-full border-2 border-white/20 object-cover"
                  />
                </div>
                <div>
                  <span className="font-bold text-white">45,000+</span> Learners Enrolled
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-amber-400">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white text-xs">4.92 / 5.0</span>
                <span className="text-slate-400">(8.4k reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-400">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Verified ISO Digital Certificates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dashboard & AI Preview Mockup */}
          <div className="lg:col-span-5 relative">
            {/* Floating Badges */}
            <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Bot className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white">24/7 AI Mentor Active</p>
                <p className="text-[10px] text-cyan-300">Powered by Gemini 2.5</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 z-20 hidden sm:flex items-center gap-2.5 bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white">7-Day Study Streak</p>
                <p className="text-[10px] text-amber-300">+350 XP Points Earned</p>
              </div>
            </div>

            {/* Main Interactive Preview Card */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-2xl p-4 sm:p-6 border border-white/15 shadow-2xl shadow-black/50 relative group">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-semibold text-slate-300 ml-2">
                    Unovia Live Learning Player
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE
                </span>
              </div>

              {/* Video Player Mockup inside Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/40 border border-white/10 group-hover:border-white/25 transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                  alt="Lesson Preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Play Button Overlay */}
                <button
                  onClick={() => setCurrentView('courses')}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform backdrop-blur-sm"
                >
                  <Play className="w-6 h-6 fill-indigo-700 ml-0.5" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white font-medium">
                    Lesson 2: Prompt Engineering RCTF
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-cyan-300 text-[11px] font-semibold">
                    14:30 Mins
                  </div>
                </div>
              </div>

              {/* Progress & Quick Actions */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Overall Progress</span>
                  <span className="text-indigo-300 font-bold">75% Complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
                  <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full w-3/4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </div>

                {/* Floating AI Tool Badges Grid */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium mr-1">Tools Mastered:</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-200 border border-white/10 backdrop-blur-md">
                    💬 ChatGPT
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-200 border border-white/10 backdrop-blur-md">
                    🎨 Midjourney
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-200 border border-white/10 backdrop-blur-md">
                    🎙️ ElevenLabs
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-200 border border-white/10 backdrop-blur-md">
                    ⚙️ Make.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
