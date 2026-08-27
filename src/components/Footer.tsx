import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Award,
  ArrowUpRight,
  BookOpen,
  Bot,
  Wrench,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, openContactModal, openLegalModal } = useApp();

  return (
    <footer className="bg-transparent border-t border-white/10 text-slate-300 pt-14 pb-24 lg:pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-md shadow-indigo-600/30">
                <div className="w-full h-full bg-[#0d0728] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white">Unovia AI Academy Pro</span>
                <p className="text-xs text-indigo-300 font-medium">Learn AI. Build Skills. Create Opportunities.</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Empowering students, creators, professionals, and entrepreneurs to master practical Artificial Intelligence through interactive curriculums, 24/7 AI Mentors, real-world sandboxes, and globally verified digital certificates.
            </p>

            {/* Official Contact Badges */}
            <div className="space-y-2 pt-2 text-xs">
              <a
                href="http://www.unovia.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>www.unovia.ai</span>
              </a>

              <a
                href="mailto:info@unovia.ai"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>info@unovia.ai</span>
              </a>

              <a
                href="tel:+919353649990"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>+91-9353649990</span>
              </a>

              <a
                href="https://wa.me/918074933077"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp: +91-8074933077</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  Courses Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('mentor')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  Unovia AI Mentor <span className="text-[10px] px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30 backdrop-blur-md">AI</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('tools')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  AI Tools Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('prompts')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  AI Prompt Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('certificates')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Certificate Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Portals */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Learning Paths & Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  AI Beginner Path
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  AI Creator & Media
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  AI Business & Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('instructor')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  Become an Instructor <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('affiliate')}
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  Affiliate Program (30%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('events')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Live AI Masterclasses
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Support */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Trust & Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={openContactModal}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('about')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  About Unovia
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('privacy')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('terms')}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <div className="mt-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs text-indigo-200">
                  <div className="flex items-center gap-1.5 font-semibold text-white mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> ISO Certified
                  </div>
                  Verified 100% genuine AI curriculum reviewed by industry experts.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Unovia AI Academy Pro. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Tagline: Learn AI. Build Skills. Create Opportunities.</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <button
              onClick={() => openLegalModal('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => openLegalModal('terms')}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
