import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Sparkles,
  Palette,
  Briefcase,
  Layers,
  Code2,
  CheckCircle2,
  ArrowRight,
  Bot,
  Zap,
} from 'lucide-react';

export const LearningPathsSection: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activePathIndex, setActivePathIndex] = useState(0);

  const paths = [
    {
      id: 'beginner',
      title: 'AI Beginner',
      subtitle: 'Zero to Competent in Generative AI Foundations',
      badge: 'Level 1-2',
      icon: Compass,
      color: 'from-blue-600 to-indigo-600',
      accentColor: 'text-blue-400',
      topics: [
        'What is Artificial Intelligence & Machine Learning?',
        'Introduction to Generative AI & Foundation Models',
        'Top 10 AI Tools for Everyday Productivity',
        'Foundations of Natural Language Prompting',
      ],
      recommendedCourseId: 'ai-for-beginners',
      targetAudience: 'Students, Beginners, Teachers, and Curious Professionals',
    },
    {
      id: 'creator',
      title: 'AI Creator',
      subtitle: 'Produce High-Yield Visual, Audio & Social Media Assets',
      badge: 'Level 2-3',
      icon: Palette,
      color: 'from-purple-600 to-pink-600',
      accentColor: 'text-purple-400',
      topics: [
        'AI Content Creation & Long-form Storytelling',
        'AI Image Generation (Midjourney v6 & DALL-E)',
        'AI Video Generation (Runway Gen-3 & Sora Prep)',
        'AI Voice Generation & Multilingual Dubbing (ElevenLabs)',
        'Social Media Content Creation & Viral Video Reels',
      ],
      recommendedCourseId: 'ai-image-creation',
      targetAudience: 'Designers, Content Creators, YouTubers, and Freelancers',
    },
    {
      id: 'business',
      title: 'AI Business',
      subtitle: 'Scale Revenue, Lead Gen, and Operational Efficiency',
      badge: 'Level 2-4',
      icon: Briefcase,
      color: 'from-amber-600 to-orange-600',
      accentColor: 'text-amber-400',
      topics: [
        'AI for Entrepreneurs & Agency Founders',
        'High-Converting AI Marketing & SEO Pipelines',
        'AI Lead Generation & Cold Outbound Sequences',
        'Zero-Code AI Workflow Automation (Make.com / Zapier)',
        'AI Business Systems & Client Retainer Packages',
      ],
      recommendedCourseId: 'build-your-ai-business',
      targetAudience: 'Entrepreneurs, Small Business Owners, Marketers, and Consultants',
    },
    {
      id: 'professional',
      title: 'AI Professional',
      subtitle: 'Enterprise-Grade Reasoning & Cognitive Workflows',
      badge: 'Level 3-4',
      icon: Layers,
      color: 'from-indigo-600 to-cyan-600',
      accentColor: 'text-indigo-400',
      topics: [
        'Advanced Enterprise Prompt Engineering (CoT, ReAct)',
        'Executive AI Productivity & Meeting Intelligence',
        'Enterprise AI Workflow Automation & Webhooks',
        'Autonomous AI Agents & Reasoning Architecture',
        'Professional AI Tools for Corporate Teams',
      ],
      recommendedCourseId: 'prompt-engineering-pro',
      targetAudience: 'Product Managers, Engineers, Consultants, and Corporate Leaders',
    },
    {
      id: 'developer',
      title: 'AI Developer',
      subtitle: 'Build & Deploy Full-Stack AI Products & Agent Swarms',
      badge: 'Level 4-5',
      icon: Code2,
      color: 'from-cyan-600 to-emerald-600',
      accentColor: 'text-cyan-400',
      topics: [
        'Introduction to Modern AI Development & Embeddings',
        'Gemini & OpenAI APIs Integration & Function Calling',
        'Building Full-Stack AI Applications (React + Node)',
        'Autonomous AI Agents with LangChain & LangGraph',
        'Monetizing & Scaling AI-Powered SaaS Products',
      ],
      recommendedCourseId: 'prompt-engineering-pro',
      targetAudience: 'Software Developers, Tech Leads, and AI Builders',
    },
  ];

  const currentPath = paths[activePathIndex];
  const PathIcon = currentPath.icon;

  return (
    <section className="py-20 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Structured Roadmaps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Curated AI Learning Paths
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Follow structured step-by-step career tracks tailored to your background and aspirations—from absolute beginner to AI founder.
          </p>
        </div>

        {/* Path Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {paths.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = idx === activePathIndex;
            return (
              <button
                key={p.id}
                onClick={() => setActivePathIndex(idx)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all backdrop-blur-md ${
                  isSelected
                    ? 'bg-white text-indigo-700 font-bold shadow-lg shadow-black/20 scale-105'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-700' : p.accentColor}`} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Path Hero Card */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl p-6 sm:p-10 border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentPath.color} p-0.5 shadow-lg`}>
                  <div className="w-full h-full bg-[#0d0728]/80 backdrop-blur-md rounded-[14px] flex items-center justify-center">
                    <PathIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">{currentPath.title}</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                      {currentPath.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 font-medium">{currentPath.subtitle}</p>
                </div>
              </div>

              {/* Topics List */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  What You Will Master in This Path:
                </p>
                <div className="space-y-2.5">
                  {currentPath.topics.map((t, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Persona */}
              <div className="p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-xs text-slate-300">
                <span className="font-semibold text-white">Ideal For:</span> {currentPath.targetAudience}
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentView('courses')}
                  className="px-6 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm shadow-lg shadow-black/20 flex items-center gap-2 group transition-all"
                >
                  <span>Start This Learning Path</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentView('mentor')}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-sm font-semibold flex items-center gap-2 transition-all backdrop-blur-md"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Get AI Study Plan</span>
                </button>
              </div>
            </div>

            {/* Right side visual badge */}
            <div className="lg:col-span-5 bg-black/30 backdrop-blur-xl rounded-3xl p-6 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Track Milestone Reward</span>
                  <span className="text-xs font-bold text-amber-400">+1,500 XP & Badge</span>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-indigo-500 p-1 shadow-xl shadow-amber-500/20">
                    <div className="w-full h-full bg-[#0d0728] rounded-full flex items-center justify-center text-2xl">
                      👑
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{currentPath.title} Specialist</h4>
                    <p className="text-xs text-indigo-300">Verified Certificate & LinkedIn Badge</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Average Time to Complete:</span>
                  <span className="text-white font-medium">3 - 4 Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span>Hands-on AI Projects:</span>
                  <span className="text-white font-medium">4 Capstones</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Certificate:</span>
                  <span className="text-emerald-400 font-semibold">Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
