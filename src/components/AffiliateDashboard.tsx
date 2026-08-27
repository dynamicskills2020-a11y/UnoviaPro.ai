import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  DollarSign,
  Share2,
  Copy,
  Check,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

export const AffiliateDashboard: React.FC = () => {
  const { user, triggerConfetti } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPayoutRequested, setIsPayoutRequested] = useState(false);

  const referralLink = `https://www.unovia.ai/?ref=${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleRequestPayout = () => {
    setIsPayoutRequested(true);
    triggerConfetti();
    setTimeout(() => setIsPayoutRequested(false), 5000);
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>30% Recurring Affiliate Tier</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Unovia Partner & Affiliate Dashboard
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Recommend Unovia AI Academy Pro to your community, friends, and followers. Earn a guaranteed 30% lifetime commission on every course enrollment.
          </p>
        </div>

        {/* Affiliate Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Total Commission Earned</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">₹{user.affiliateEarnings.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-400 font-semibold">₹12,400 available for withdrawal</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Referral Link Clicks</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">1,480</p>
            <p className="text-[11px] text-cyan-300 font-semibold">6.2% Conversion Rate</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Paid Enrollments</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">92</p>
            <p className="text-[11px] text-purple-300 font-semibold">Average order ₹999</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Commission Tier</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-extrabold text-amber-400">30% PRO</p>
            <p className="text-[11px] text-slate-400">Instant UPI & Direct Bank Wire</p>
          </div>
        </div>

        {/* Unique Referral Link Box */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-emerald-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-emerald-400" />
              <span>Your Unique Referral Link & Code</span>
            </h3>
            <p className="text-xs text-slate-300">
              Share this link across WhatsApp groups, LinkedIn posts, blogs, and YouTube video descriptions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm font-mono text-emerald-300 select-all flex items-center backdrop-blur-md">
              {referralLink}
            </div>
            <button
              onClick={handleCopyLink}
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Partner Link</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            <div className="text-xs text-slate-300">
              Referral Code: <span className="font-mono font-bold text-white">{user.referralCode}</span>
            </div>

            <button
              onClick={handleRequestPayout}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold backdrop-blur-md transition-all"
            >
              {isPayoutRequested ? '✓ Payout of ₹12,400 Queued to UPI!' : 'Request Instant Payout to UPI / Bank'}
            </button>
          </div>
        </div>

        {/* Ready-to-Use WhatsApp & Social Swipe Copy */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Ready-to-Post WhatsApp & LinkedIn Copy</span>
            </h3>
            <p className="text-xs text-slate-300">
              Copy and share these high-converting post templates with your partner link attached.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 space-y-2 text-xs text-slate-300 font-mono">
              <p className="font-bold text-white font-sans text-sm">Template 1: For Beginners & Students</p>
              <p className="whitespace-pre-line">
                🚀 Master AI in 2026 without any coding! Learn ChatGPT, Midjourney, Claude, and workflow automation step-by-step with practical assignments and verified certificates at Unovia AI Academy Pro.
                👉 Get started here: {referralLink}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
