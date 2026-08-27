import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Users,
  DollarSign,
  BookOpen,
  CheckCircle2,
  XCircle,
  Bell,
  Send,
  Database,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

export const SuperAdminPanel: React.FC = () => {
  const { addXp, triggerConfetti } = useApp();
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'app-1',
      title: 'Voice Cloning & AI Podcasting with ElevenLabs',
      instructor: 'Siddharth Rao',
      submittedDate: 'Today',
      category: 'Creator',
    },
    {
      id: 'app-2',
      title: 'Autonomous Multi-Agent Swarms with CrewAI',
      instructor: 'Dr. Aarav Sharma',
      submittedDate: 'Yesterday',
      category: 'Professional',
    },
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));
    triggerConfetti();
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    setBroadcastSuccess(true);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold backdrop-blur-md">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Master System Administration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Unovia AI Super Admin
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Real-time platform telemetry, marketplace moderation, course approval pipeline, and sitewide broadcast system.
          </p>
        </div>

        {/* Sitewide KPI Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Total Platform Learners</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">45,820</p>
            <p className="text-[11px] text-emerald-400 font-semibold">+1,240 this week</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Gross Marketplace GMV</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">₹38,42,000</p>
            <p className="text-[11px] text-emerald-400 font-semibold">₹3.84M INR Transacted</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Published Courses</span>
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">24</p>
            <p className="text-[11px] text-indigo-300 font-semibold">10 Flagship, 14 Creator</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Server AI Uptime</span>
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">99.98%</p>
            <p className="text-[11px] text-emerald-400 font-semibold">Gemini 2.5 Active</p>
          </div>
        </div>

        {/* Course Approval Queue */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Course Moderation & Approval Pipeline</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Review submitted curriculums for video quality, ISO standards, and correct pricing.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
              {pendingApprovals.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingApprovals.length > 0 ? (
              pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-300 border border-white/10">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-white text-base mt-1">{item.title}</h4>
                    <p className="text-xs text-slate-400">
                      Submitted by <strong>{item.instructor}</strong> • {item.submittedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>

                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-rose-300 font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md transition-all"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Request Revision</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">
                All instructor submissions have been approved and published to the live catalog!
              </p>
            )}
          </div>
        </div>

        {/* Global Broadcast Notification Engine */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-400" />
              <span>Broadcast Push Notification to All 45,000+ Learners</span>
            </h3>
            <p className="text-xs text-slate-300">
              Send real-time alerts for live masterclasses, new model releases, or streak rewards.
            </p>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Notification Title</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. 🚀 Live Workshop: Gemini 2.5 Flash Autonomous Agents Tonight at 7 PM"
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-400 text-xs text-white backdrop-blur-md focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Notification Message</label>
              <textarea
                rows={3}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Enter details, Zoom room links, or coupon codes..."
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-400 text-xs text-white backdrop-blur-md focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {broadcastSuccess && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Broadcast pushed to 45,820 active student apps successfully!</span>
                </span>
              )}
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg ml-auto transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Broadcast Alert</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
