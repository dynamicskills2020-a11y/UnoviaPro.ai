import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import { LanguageCode } from '../types';
import {
  Sparkles,
  Search,
  BookOpen,
  Bot,
  Wrench,
  FileText,
  Award,
  Calendar,
  Trophy,
  User,
  Globe,
  Bell,
  Menu,
  X,
  ShieldAlert,
  Flame,
  ChevronDown,
  Layers,
  GraduationCap,
  Briefcase,
  Sliders,
  DollarSign,
  Phone,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    currentView,
    setCurrentView,
    language,
    setLanguage,
    unreadNotificationsCount,
    notifications,
    markNotificationsAsRead,
    openAuthModal,
    openContactModal,
    switchUserRole,
    t,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'ml', label: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी (Marathi)', flag: '🇮🇳' },
  ];

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 text-slate-100 shadow-2xl shadow-black/40">
      {/* Top micro-banner with official contact & announcements */}
      <div className="bg-white/[0.03] backdrop-blur-md border-b border-white/10 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-indigo-200">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-indigo-300 px-3 py-0.5 rounded-full border border-white/15 font-medium shadow-sm">
              <Sparkles className="w-3 h-3 text-indigo-400" /> New: Gemini 2.5 & Autonomous AI Agents Course
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300 font-medium">
              🌐 www.unovia.ai
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <a
              href="tel:+919353649990"
              className="hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3 h-3 text-indigo-400" /> +91-9353649990
            </a>
            <a
              href="https://wa.me/918074933077"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium bg-emerald-500/10 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-emerald-500/20 shadow-sm"
            >
              💬 WhatsApp: +91-8074933077
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300 border border-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                  Unovia AI
                </span>
                <span className="text-[10px] uppercase tracking-widest text-indigo-300 font-semibold px-2 py-0.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                  Academy Pro
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              id="nav-home"
              onClick={() => handleNavClick('landing')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                currentView === 'landing'
                  ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            <button
              id="nav-courses"
              onClick={() => handleNavClick('courses')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'courses'
                  ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Courses
            </button>

            <button
              id="nav-dashboard"
              onClick={() => handleNavClick('dashboard')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              My Learning
            </button>

            <button
              id="nav-mentor"
              onClick={() => handleNavClick('mentor')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 relative ${
                currentView === 'mentor'
                  ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              AI Mentor
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute top-2 right-1.5" />
            </button>

            <button
              id="nav-tools"
              onClick={() => handleNavClick('tools')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'tools'
                  ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wrench className="w-4 h-4 text-purple-400" />
              AI Tools
            </button>

            <button
              id="nav-prompts"
              onClick={() => handleNavClick('prompts')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'prompts'
                  ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Prompts
            </button>

            <button
              id="nav-certificates"
              onClick={() => handleNavClick('certificates')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'certificates'
                  ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4 text-yellow-400" />
              Certificates
            </button>

            <button
              id="nav-events"
              onClick={() => handleNavClick('events')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'events'
                  ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              Live Events
            </button>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gamification Streak & XP Badge */}
            <div
              id="streak-xp-badge"
              onClick={() => handleNavClick('gamification')}
              className="hidden sm:flex items-center gap-2.5 bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-full border border-white/10 cursor-pointer backdrop-blur-md transition-all shadow-sm"
              title="View Gamification & Leaderboard"
            >
              <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                <span>{user.streakDays}d</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1 text-indigo-300 font-bold text-xs">
                <Trophy className="w-3.5 h-3.5 text-indigo-400" />
                <span>{user.xp} XP</span>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                id="language-switcher-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1 text-xs font-medium backdrop-blur-md transition-all"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0a0524]/95 border border-white/10 backdrop-blur-2xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Language
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                        language === l.code ? 'text-indigo-400 font-semibold bg-white/5' : 'text-slate-300'
                      }`}
                    >
                      <span>
                        {l.flag} {l.label}
                      </span>
                      {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                id="notifications-btn"
                onClick={() => {
                  setIsNotifDropdownOpen(!isNotifDropdownOpen);
                  if (!isNotifDropdownOpen) markNotificationsAsRead();
                }}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white relative backdrop-blur-md transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-300" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950" />
                )}
              </button>

              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0a0524]/95 border border-white/10 backdrop-blur-2xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="text-xs font-semibold text-white">Notifications</span>
                    <span className="text-[10px] text-slate-400 font-medium">All updates</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs"
                      >
                        <p className="font-semibold text-slate-200">{n.title}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-indigo-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher for Seamless Review */}
            <div className="relative hidden xl:block">
              <button
                id="role-switch-btn"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-indigo-300 flex items-center gap-1.5 backdrop-blur-md transition-all"
                title="Switch View Mode"
              >
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span className="capitalize">{user.role} Mode</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0a0524]/95 border border-white/10 backdrop-blur-2xl shadow-2xl py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase">
                    Portal Perspective
                  </div>
                  <button
                    onClick={() => {
                      switchUserRole('student');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-white/10 ${
                      user.role === 'student' ? 'text-indigo-400 font-semibold bg-white/5' : 'text-slate-300'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" /> Student Dashboard
                  </button>
                  <button
                    onClick={() => {
                      switchUserRole('instructor');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-white/10 ${
                      user.role === 'instructor' ? 'text-indigo-400 font-semibold bg-white/5' : 'text-slate-300'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" /> Instructor Portal
                  </button>
                  <button
                    onClick={() => {
                      switchUserRole('admin');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-white/10 ${
                      user.role === 'admin' ? 'text-indigo-400 font-semibold bg-white/5' : 'text-slate-300'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" /> Super Admin Panel
                  </button>
                </div>
              )}
            </div>

            {/* User Profile Avatar / Menu */}
            <div className="relative">
              <button
                id="user-profile-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0a0524]/95 border border-white/10 backdrop-blur-2xl shadow-2xl p-2 z-50 text-xs">
                  <div className="p-2 border-b border-white/10">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-300 text-[10px] font-semibold border border-white/10">
                      <span>Lvl {user.level}</span> • <span>{user.levelTitle}</span>
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-400" /> Student Profile
                    </button>
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Learning Dashboard
                    </button>
                    <button
                      onClick={() => handleNavClick('gamification')}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-400" /> Gamification & XP
                    </button>
                    <button
                      onClick={() => handleNavClick('affiliate')}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                    >
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Affiliate & Referrals
                    </button>
                    <button
                      onClick={() => handleNavClick('instructor')}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-purple-400" /> Instructor Portal
                    </button>
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Super Admin Panel
                    </button>
                  </div>

                  <div className="pt-1 border-t border-white/10">
                    <button
                      onClick={() => {
                        openAuthModal();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
                    >
                      Sign In / Switch Account
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white backdrop-blur-md"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#05011a]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-2">
          <button
            onClick={() => handleNavClick('landing')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('courses')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" /> All Courses
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-cyan-400" /> My Learning Dashboard
          </button>
          <button
            onClick={() => handleNavClick('mentor')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-cyan-300 bg-white/10 border border-white/10 font-medium flex items-center gap-2 backdrop-blur-md"
          >
            <Bot className="w-4 h-4 text-cyan-400" /> Unovia AI Mentor (Live AI)
          </button>
          <button
            onClick={() => handleNavClick('tools')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-purple-400" /> AI Tools Directory
          </button>
          <button
            onClick={() => handleNavClick('prompts')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-amber-400" /> AI Prompt Library
          </button>
          <button
            onClick={() => handleNavClick('certificates')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-yellow-400" /> Verified Certificates
          </button>
          <button
            onClick={() => handleNavClick('events')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-emerald-400" /> Live Events & Webinars
          </button>
          <button
            onClick={() => handleNavClick('instructor')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-purple-400" /> Instructor Portal
          </button>
          <button
            onClick={() => handleNavClick('affiliate')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" /> Affiliate & Earn
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 font-medium flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Super Admin
          </button>
        </div>
      )}
    </header>
  );
};
