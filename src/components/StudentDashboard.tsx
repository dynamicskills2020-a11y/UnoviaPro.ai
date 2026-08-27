import React from 'react';
import { useApp } from '../context/AppContext';
import { COURSES_DATA } from '../data/coursesData';
import {
  Sparkles,
  Flame,
  Trophy,
  Award,
  BookOpen,
  Clock,
  Play,
  ArrowRight,
  Bot,
  Wrench,
  FileText,
  Calendar,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    user,
    setCurrentView,
    startPlayingCourse,
    courseProgressMap,
    certificates,
    badges,
  } = useApp();

  // Find user's primary enrolled active course to resume
  const activeCourseId = user.enrolledCourseIds[0] || 'ai-for-beginners';
  const activeCourse = COURSES_DATA.find((c) => c.id === activeCourseId) || COURSES_DATA[0];
  const activeProgress = courseProgressMap[activeCourse.id]?.progressPercent || 65;

  const enrolledCourses = COURSES_DATA.filter((c) =>
    user.enrolledCourseIds.includes(c.id)
  );

  const recommendedCourses = COURSES_DATA.filter(
    (c) => !user.enrolledCourseIds.includes(c.id)
  ).slice(0, 3);

  const { openCheckout } = useApp();

  return (
    <div className="min-h-screen text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/20 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome back, {user.name}! 👋
                </h1>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                You are currently in the top <span className="text-amber-400 font-bold">5%</span> of learners this week. Keep up the momentum!
              </p>
            </div>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5 shadow-sm">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Streak</p>
                <p className="text-sm font-black text-amber-400">{user.streakDays} Days</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5 shadow-sm">
              <Trophy className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Total XP</p>
                <p className="text-sm font-black text-indigo-300">{user.xp}</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5 shadow-sm">
              <Award className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Certificates</p>
                <p className="text-sm font-black text-emerald-300">{certificates.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Resume Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-indigo-800/90 p-6 sm:p-8 border border-white/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5 w-full lg:w-auto">
              <div className="w-24 sm:w-32 aspect-video rounded-2xl overflow-hidden bg-black/40 flex-shrink-0 border border-white/20 shadow-lg">
                <img
                  src={activeCourse.thumbnail}
                  alt={activeCourse.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white uppercase tracking-wider inline-block">
                  Resume Lesson
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                  {activeCourse.title}
                </h3>
                <p className="text-xs text-indigo-100 line-clamp-1">
                  Instructor: {activeCourse.instructor.name} • {activeCourse.lessonsCount} lessons
                </p>

                {/* Progress bar */}
                <div className="pt-2 flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm">
                    <div
                      className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                      style={{ width: `${activeProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white">{activeProgress}%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => startPlayingCourse(activeCourse)}
              className="w-full lg:w-auto px-8 py-3.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm shadow-xl shadow-black/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <Play className="w-4 h-4 fill-indigo-700" />
              <span>Continue Learning</span>
            </button>
          </div>
        </div>

        {/* 3 Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setCurrentView('mentor')}
            className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08] shadow-2xl cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                24/7 AI Tutor
              </span>
            </div>
            <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
              Ask Unovia AI Mentor
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Ask questions, generate 30-day study roadmaps, and improve prompts.
            </p>
          </div>

          <div
            onClick={() => setCurrentView('tools')}
            className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/40 hover:bg-white/[0.08] shadow-2xl cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                24+ Tools
              </span>
            </div>
            <h4 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
              AI Tools Directory
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Explore step-by-step guides for ChatGPT, Midjourney, Claude, Runway, etc.
            </p>
          </div>

          <div
            onClick={() => setCurrentView('prompts')}
            className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.08] shadow-2xl cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Prompt Vault
              </span>
            </div>
            <h4 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
              AI Prompt Library
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Copy-paste 100+ proven prompts for marketing, coding, business, and study.
            </p>
          </div>
        </div>

        {/* My Enrolled Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">My Enrolled Courses</h3>
            <button
              onClick={() => setCurrentView('courses')}
              className="text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-all"
            >
              Browse Catalog <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((c) => {
              const progress = courseProgressMap[c.id]?.progressPercent || 0;
              const isCompleted = user.completedCourseIds.includes(c.id);

              return (
                <div
                  key={c.id}
                  className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 space-y-4 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all"
                >
                  <div className="space-y-3">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-300 border border-white/10 font-semibold backdrop-blur-md">
                        {c.category}
                      </span>
                      {isCompleted ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 100% Completed
                        </span>
                      ) : (
                        <span className="text-cyan-300 font-semibold">{progress}% Progress</span>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{c.title}</h4>
                  </div>

                  <button
                    onClick={() => startPlayingCourse(c)}
                    className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 backdrop-blur-md transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isCompleted ? 'Review Lessons' : 'Resume Course'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Next Courses */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-xl font-bold text-white">Recommended Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((c) => (
              <div
                key={c.id}
                className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 space-y-3 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all"
              >
                <div className="space-y-2">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                    <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-white text-sm line-clamp-1">{c.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{c.tagline}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-sm font-bold text-white">₹{c.priceINR}</span>
                  <button
                    onClick={() => openCheckout(c)}
                    className="px-4 py-1.5 rounded-full bg-indigo-500/80 hover:bg-indigo-500 text-white text-xs font-semibold border border-white/20 shadow-sm backdrop-blur-md transition-all"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
