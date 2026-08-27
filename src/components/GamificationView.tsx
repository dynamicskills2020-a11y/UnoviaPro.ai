import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../types';
import {
  Trophy,
  Flame,
  Zap,
  Award,
  Crown,
  Lock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const GamificationView: React.FC = () => {
  const { user, badges, setCurrentView, addXp } = useApp();
  const [selectedLeaderboardTimeframe, setSelectedLeaderboardTimeframe] = useState<'weekly' | 'allTime'>('weekly');

  const leaderboardData = [
    { rank: 1, name: 'Vikram Mehta', xp: 4820, streak: 21, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80', badge: '👑 Unovia Pro' },
    { rank: 2, name: 'Ananya Deshmukh', xp: 4150, streak: 14, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80', badge: '🚀 Prompt Master' },
    { rank: 3, name: 'Aditya Roy', xp: 3600, streak: 12, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80', badge: '🤖 Automation Lead' },
    { rank: 4, name: `${user.name} (You)`, xp: user.xp, streak: user.streakDays, avatar: user.avatar, badge: `⚡ ${user.levelTitle}`, isCurrentUser: true },
    { rank: 5, name: 'Sneha Patel', xp: 2600, streak: 6, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80', badge: '🎨 AI Creator' },
    { rank: 6, name: 'Rahul Verma', xp: 2420, streak: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80', badge: '💡 AI Explorer' },
  ];

  const dailyQuests = [
    {
      id: 'q-1',
      title: 'Complete 1 AI Lesson Video',
      rewardXP: 50,
      isCompleted: true,
      progress: '1/1',
    },
    {
      id: 'q-2',
      title: 'Test or Copy 2 Prompts from Prompt Library',
      rewardXP: 30,
      isCompleted: true,
      progress: '2/2',
    },
    {
      id: 'q-3',
      title: 'Ask Unovia AI Mentor a doubt or study request',
      rewardXP: 25,
      isCompleted: false,
      progress: '0/1',
    },
    {
      id: 'q-4',
      title: 'Score 80%+ on any course comprehension quiz',
      rewardXP: 100,
      isCompleted: true,
      progress: '1/1',
    },
  ];

  const nextLevelXp = user.level * 800;
  const currentLevelBase = (user.level - 1) * 800;
  const levelProgress = Math.min(100, Math.round(((user.xp - currentLevelBase) / 800) * 100));

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Hero Banner */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-600 p-1 shadow-xl shadow-amber-500/20">
              <div className="w-full h-full bg-[#0d0728]/80 backdrop-blur-md rounded-[12px] flex items-center justify-center text-3xl">
                🏆
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Gamification & Achievements
                </h1>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  Tier: Gold
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Level {user.level}: <span className="text-cyan-300 font-bold">{user.levelTitle}</span> • {user.xp} Total XP Points
              </p>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="w-full md:w-80 space-y-2 bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Level {user.level} Progress</span>
              <span className="text-amber-400 font-bold">{user.xp} / {nextLevelXp} XP</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-indigo-400 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(10, levelProgress)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-300 text-right">
              {nextLevelXp - user.xp} XP to Level {user.level + 1}
            </p>
          </div>
        </div>

        {/* 7-Day Streak & Daily Quests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Streak Box */}
          <div className="lg:col-span-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce" />
                <h3 className="font-bold text-lg text-white">7-Day Study Streak</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400">+100 XP Bonus Active</span>
            </div>

            <p className="text-xs text-slate-300">
              Study at least 5 minutes every day to maintain your streak multiplier and unlock secret AI tool recipes.
            </p>

            {/* Streak Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 pt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div
                  key={day}
                  className="flex flex-col items-center p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-center"
                >
                  <span className="text-[10px] font-bold text-slate-400">{day}</span>
                  <Flame className="w-5 h-5 text-amber-400 fill-amber-400 mt-1" />
                  <span className="text-[9px] text-emerald-400 font-bold mt-1">✓</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 flex items-center justify-between backdrop-blur-md">
              <span>Next Milestone: 14 Days</span>
              <span className="font-bold text-amber-300">+500 XP & "Relentless" Badge</span>
            </div>
          </div>

          {/* Daily Quests Box */}
          <div className="lg:col-span-7 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg text-white">Daily AI Learning Quests</h3>
              </div>
              <span className="text-xs text-slate-300 font-medium">Resets in 6h 30m</span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${q.isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${q.isCompleted ? 'text-slate-300 line-through' : 'text-white'}`}>
                        {q.title}
                      </p>
                      <span className="text-[10px] text-slate-400">Progress: {q.progress}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-400 whitespace-nowrap">
                    +{q.rewardXP} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges Showcase Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>Badges & Accreditations</span>
            </h3>
            <span className="text-xs text-slate-300">
              {user.earnedBadgeIds.length} of {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((b) => {
              const isUnlocked = user.earnedBadgeIds.includes(b.id) || !!b.unlockedAt;

              return (
                <div
                  key={b.id}
                  className={`rounded-3xl p-6 border space-y-3 relative transition-all duration-300 backdrop-blur-xl ${
                    isUnlocked
                      ? 'bg-white/5 border-white/20 shadow-2xl hover:border-amber-400/50 hover:scale-[1.02]'
                      : 'bg-black/30 border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-2xl shadow-inner">
                      {isUnlocked ? b.icon : <Lock className="w-5 h-5 text-slate-500" />}
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
                        b.rarity === 'Legendary'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : b.rarity === 'Epic'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      }`}
                    >
                      {b.rarity}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-white">{b.name}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {b.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400">+{b.xpValue} XP</span>
                    {isUnlocked ? (
                      <span className="text-emerald-400 font-semibold text-[11px]">
                        Unlocked {b.unlockedAt || 'Recently'}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>Global Unovia AI Leaderboard</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Top 3 monthly finishers win 1-on-1 mentorship calls and pro AI tool subscription credits!
              </p>
            </div>

            <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setSelectedLeaderboardTimeframe('weekly')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedLeaderboardTimeframe === 'weekly' ? 'bg-white text-indigo-700 font-bold shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setSelectedLeaderboardTimeframe('allTime')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedLeaderboardTimeframe === 'allTime' ? 'bg-white text-indigo-700 font-bold shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                All Time
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {leaderboardData.map((player) => (
              <div
                key={player.rank}
                className={`p-4 rounded-2xl flex items-center justify-between gap-4 transition-all backdrop-blur-md ${
                  player.isCurrentUser
                    ? 'bg-white/15 border border-cyan-400/40 shadow-xl'
                    : 'bg-black/25 border border-white/5 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-7 text-center font-extrabold text-sm ${
                      player.rank === 1
                        ? 'text-amber-400 text-lg'
                        : player.rank === 2
                        ? 'text-slate-200 text-base'
                        : player.rank === 3
                        ? 'text-amber-500 text-base'
                        : 'text-slate-400'
                    }`}
                  >
                    #{player.rank}
                  </span>

                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/20"
                  />

                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>{player.name}</span>
                    </p>
                    <p className="text-[11px] text-cyan-300 font-medium">{player.badge}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Flame className="w-4 h-4 fill-amber-400" />
                    <span>{player.streak}d</span>
                  </div>
                  <span className="font-extrabold text-white text-sm whitespace-nowrap">
                    {player.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
