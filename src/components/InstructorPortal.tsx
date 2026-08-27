import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Plus,
  DollarSign,
  Users,
  Star,
  BookOpen,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Tag,
  ArrowRight,
  Upload,
} from 'lucide-react';

export const InstructorPortal: React.FC = () => {
  const { user, triggerConfetti } = useApp();
  const [isCourseWizardOpen, setIsCourseWizardOpen] = useState(false);
  const [coursesCreated, setCoursesCreated] = useState([
    {
      id: 'inst-c1',
      title: 'Enterprise Prompt Engineering with Anthropic Claude',
      enrolledCount: 1420,
      earningsINR: 284000,
      rating: 4.9,
      status: 'Published',
    },
    {
      id: 'inst-c2',
      title: 'Full-Stack Gemini 2.5 Coding Masterclass',
      enrolledCount: 890,
      earningsINR: 178000,
      rating: 4.85,
      status: 'Published',
    },
  ]);

  // Wizard state
  const [wizTitle, setWizTitle] = useState('');
  const [wizCategory, setWizCategory] = useState('Professional');
  const [wizPriceINR, setWizPriceINR] = useState('1499');
  const [wizTagline, setWizTagline] = useState('');
  const [wizLessonsCount, setWizLessonsCount] = useState('8');

  // Coupon Generator state
  const [coupons, setCoupons] = useState([
    { code: 'UNOVIA50', discount: '50% OFF', uses: 412, active: true },
    { code: 'AI2026', discount: '30% OFF', uses: 280, active: true },
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newDiscountPercent, setNewDiscountPercent] = useState('20');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizTitle.trim()) return;

    setCoursesCreated((prev) => [
      {
        id: `inst-c-${Date.now()}`,
        title: wizTitle,
        enrolledCount: 0,
        earningsINR: 0,
        rating: 5.0,
        status: 'Under Review',
      },
      ...prev,
    ]);

    setIsCourseWizardOpen(false);
    setWizTitle('');
    setWizTagline('');
    triggerConfetti();
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    setCoupons((prev) => [
      ...prev,
      {
        code: newCouponCode.toUpperCase(),
        discount: `${newDiscountPercent}% OFF`,
        uses: 0,
        active: true,
      },
    ]);
    setNewCouponCode('');
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-xs font-semibold backdrop-blur-md">
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              <span>Instructor Studio & Creator Marketplace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Instructor Dashboard
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Publish structured AI curriculums, manage student reviews, issue certified exams, and earn 70% revenue share on every enrollment.
            </p>
          </div>

          <button
            onClick={() => setIsCourseWizardOpen(true)}
            className="px-7 py-3.5 rounded-full bg-white text-purple-950 hover:bg-slate-100 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-black/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create New AI Course</span>
          </button>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Total Revenue Earned</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">₹4,62,000</p>
            <p className="text-[11px] text-emerald-400 font-semibold">+18.4% this month</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Active Students</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">2,310</p>
            <p className="text-[11px] text-cyan-400 font-semibold">Across 2 courses</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Average Student Rating</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">4.88 / 5.0</p>
            <p className="text-[11px] text-amber-400 font-semibold">410 Reviews</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Completion Rate</span>
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-extrabold text-white">82.4%</p>
            <p className="text-[11px] text-purple-400 font-semibold">Above academy avg</p>
          </div>
        </div>

        {/* My Published Courses */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white">My AI Courses</h3>

          <div className="space-y-4">
            {coursesCreated.map((course) => (
              <div
                key={course.id}
                className="p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white">{course.title}</span>
                    <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      {course.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {course.enrolledCount} Students Enrolled • Rating: {course.rating} ★
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Net Earnings</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      ₹{course.earningsINR.toLocaleString()}
                    </span>
                  </div>

                  <button className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold backdrop-blur-md transition-all">
                    Edit Curriculum
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Code & Coupon Generator */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-400" />
              <span>Discount Coupon Manager</span>
            </h3>
            <p className="text-xs text-slate-300">
              Create special discounts for student cohorts, corporate bulk sales, and social media campaigns.
            </p>
          </div>

          <form onSubmit={handleAddCoupon} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={newCouponCode}
              onChange={(e) => setNewCouponCode(e.target.value)}
              placeholder="Coupon Code (e.g. EARLYBIRD40)"
              className="flex-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white uppercase backdrop-blur-md focus:border-amber-400/50 focus:outline-none"
            />
            <input
              type="number"
              min="5"
              max="90"
              value={newDiscountPercent}
              onChange={(e) => setNewDiscountPercent(e.target.value)}
              placeholder="Discount %"
              className="w-32 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white backdrop-blur-md focus:border-amber-400/50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              Generate Coupon
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {coupons.map((c, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-amber-400/20 flex items-center justify-between"
              >
                <div>
                  <p className="font-mono font-bold text-amber-300 text-sm">{c.code}</p>
                  <p className="text-[11px] text-slate-400">{c.discount} • {c.uses} redemptions</p>
                </div>
                <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Create Course Wizard Modal */}
        {isCourseWizardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
            <div className="relative w-full max-w-2xl rounded-3xl bg-[#0a0520]/90 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 space-y-6 text-slate-100 shadow-2xl animate-in fade-in zoom-in-95">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-purple-400" />
                  <span>Create & Publish AI Mastercourse</span>
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Fill in course details to submit for review and publication on the Unovia AI Marketplace.
                </p>
              </div>

              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Course Title</label>
                  <input
                    type="text"
                    required
                    value={wizTitle}
                    onChange={(e) => setWizTitle(e.target.value)}
                    placeholder="e.g. Advanced Autonomous AI Agents with LangGraph"
                    className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white backdrop-blur-md focus:border-purple-400/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tagline / Subtitle</label>
                  <input
                    type="text"
                    required
                    value={wizTagline}
                    onChange={(e) => setWizTagline(e.target.value)}
                    placeholder="e.g. Build multi-agent swarms that execute autonomous business tasks."
                    className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white backdrop-blur-md focus:border-purple-400/50 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Category</label>
                    <select
                      value={wizCategory}
                      onChange={(e) => setWizCategory(e.target.value)}
                      className="w-full p-3.5 rounded-2xl bg-black/50 border border-white/10 text-xs text-white backdrop-blur-md focus:border-purple-400/50 focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Creator">Creator</option>
                      <option value="Business">Business</option>
                      <option value="Professional">Professional</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Price (INR ₹)</label>
                    <input
                      type="number"
                      required
                      value={wizPriceINR}
                      onChange={(e) => setWizPriceINR(e.target.value)}
                      className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white backdrop-blur-md focus:border-purple-400/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Upload className="w-4 h-4 text-purple-400" />
                    <span>Next Steps in Course Builder:</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Once initialized, you can upload video MP4s/URLs, markdown notes, prompt cheatsheets, and interactive multiple-choice quizzes.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCourseWizardOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 text-xs backdrop-blur-md transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-full bg-white text-purple-950 font-bold text-xs shadow-lg hover:bg-slate-100 transition-all"
                  >
                    Publish Course Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
