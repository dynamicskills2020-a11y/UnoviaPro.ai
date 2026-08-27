import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, BookOpen, Bot, Trophy, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, unreadNotificationsCount } = useApp();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#07021b]/80 backdrop-blur-2xl border-t border-white/10 px-2 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        <button
          id="mobile-tab-home"
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            currentView === 'home'
              ? 'bg-white/15 text-white font-bold backdrop-blur-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          id="mobile-tab-learn"
          onClick={() => setCurrentView('courses')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            currentView === 'courses' || currentView === 'dashboard' || currentView === 'player'
              ? 'bg-white/15 text-white font-bold backdrop-blur-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Learn</span>
        </button>

        <button
          id="mobile-tab-mentor"
          onClick={() => setCurrentView('mentor')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all relative ${
            currentView === 'mentor'
              ? 'bg-white/15 text-cyan-300 font-bold backdrop-blur-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <span className="text-[10px] mt-0.5">AI Mentor</span>
        </button>

        <button
          id="mobile-tab-achievements"
          onClick={() => setCurrentView('achievements')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            currentView === 'achievements'
              ? 'bg-white/15 text-amber-300 font-bold backdrop-blur-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] mt-0.5">Badges</span>
        </button>

        <button
          id="mobile-tab-profile"
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            currentView === 'profile'
              ? 'bg-white/15 text-white font-bold backdrop-blur-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </button>
      </div>
    </div>
  );
};
