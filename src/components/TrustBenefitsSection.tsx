import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Wrench,
  Bot,
  Laptop,
  Award,
  Smartphone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const TrustBenefitsSection: React.FC = () => {
  const { setCurrentView, t } = useApp();

  const benefits = [
    {
      icon: Clock,
      title: 'Learn at Your Own Pace',
      description: 'Bite-sized, jargon-free video lessons and step-by-step guides crafted for busy beginners and working professionals.',
      highlight: '5-15 min lessons',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Wrench,
      title: 'Practical AI Skills',
      description: 'Master cutting-edge AI tools for content creation, marketing, workflow automation, coding, business, and daily productivity.',
      highlight: '50+ Real AI Tools',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Bot,
      title: 'Personalized AI Learning',
      description: 'Unovia AI Mentor crafts custom 30-day roadmaps, generates adaptive practice quizzes, and answers doubts in real time.',
      highlight: '24/7 AI Tutor',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Laptop,
      title: 'Learn by Doing',
      description: 'Interactive prompt testbeds, hands-on video editing sandboxes, code playgrounds, and real client business simulations.',
      highlight: 'Hands-on Projects',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Award,
      title: 'Earn Verified Certificates',
      description: 'Earn digital certificates with unique verification QR codes and share credentials directly on LinkedIn and WhatsApp.',
      highlight: 'Global Credential',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Smartphone,
      title: 'Learn Anytime, Anywhere',
      description: 'Seamlessly transition across desktop, tablet, and mobile applications with synchronized learning progress and offline notes.',
      highlight: '100% Mobile Ready',
      color: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <section className="py-20 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Why Choose Unovia AI Academy Pro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Built for Real-World AI Competence
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            We reject boring theoretical lectures. Every lesson at Unovia is designed to help you execute, create, and build practical AI solutions immediately.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 sm:p-7 border border-white/10 hover:border-white/25 shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${b.color} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-[#0d0728]/80 backdrop-blur-md rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 text-indigo-200 border border-white/10 backdrop-blur-md">
                      {b.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center text-xs font-medium text-indigo-300 group-hover:text-cyan-300 transition-colors">
                  <span>Explore in Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
