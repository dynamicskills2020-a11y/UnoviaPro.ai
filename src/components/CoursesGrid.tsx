import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import {
  Search,
  BookOpen,
  Clock,
  Star,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle,
  Play,
} from 'lucide-react';

export const CoursesGrid: React.FC<{ isLandingPage?: boolean }> = ({ isLandingPage = false }) => {
  const {
    user,
    setSelectedCourseForModal,
    startPlayingCourse,
    openCheckout,
    courseProgressMap,
    t,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const categories = ['All', 'Beginner', 'Creator', 'Business', 'Professional'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === 'All' || course.difficulty === selectedDifficulty || course.difficulty === 'All Levels';
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const coursesToDisplay = isLandingPage ? filteredCourses.slice(0, 6) : filteredCourses;

  return (
    <section className="py-20 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
              <span>Industry-Grade Curriculums</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {isLandingPage ? 'Featured AI Mastercourses' : 'All AI Courses & Certifications'}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Step-by-step masterclasses instructed by top AI practitioners, with real assignments, prompt blueprints, and certified credentials.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currency === 'INR' ? 'bg-white text-indigo-700 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currency === 'USD' ? 'bg-white text-indigo-700 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Filter Controls (Shown fully on course page, compact on landing) */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by tool (ChatGPT, Midjourney), skill or topic..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 focus:border-indigo-400/50 text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all backdrop-blur-md ${
                    selectedCategory === cat
                      ? 'bg-white text-indigo-700 font-bold shadow-md'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesToDisplay.map((course) => {
            const isEnrolled = user.enrolledCourseIds.includes(course.id);
            const isCompleted = user.completedCourseIds.includes(course.id);
            const progress = courseProgressMap[course.id]?.progressPercent || 0;

            return (
              <div
                key={course.id}
                className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div
                    onClick={() => setSelectedCourseForModal(course)}
                    className="relative aspect-video overflow-hidden cursor-pointer bg-black/40"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                    {/* Category Pill */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-indigo-200 border border-white/10">
                      {course.category}
                    </span>

                    {/* Difficulty Pill */}
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-slate-200 border border-white/10">
                      {course.difficulty}
                    </span>

                    {/* Enrolled / Completed badge overlay */}
                    {isCompleted ? (
                      <div className="absolute bottom-3 right-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                        <CheckCircle className="w-3 h-3 text-emerald-400" /> Completed
                      </div>
                    ) : isEnrolled ? (
                      <div className="absolute bottom-3 right-3 bg-indigo-500/20 border border-indigo-500/40 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                        <Play className="w-3 h-3 fill-cyan-400 text-cyan-400" /> {progress}% Done
                      </div>
                    ) : null}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Title & Tagline */}
                    <div>
                      <h3
                        onClick={() => setSelectedCourseForModal(course)}
                        className="font-bold text-base sm:text-lg text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                      >
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                        {course.tagline}
                      </p>
                    </div>

                    {/* Instructor Info */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
                      />
                      <div className="text-xs">
                        <p className="font-semibold text-slate-200">{course.instructor.name}</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                          {course.instructor.title}
                        </p>
                      </div>
                    </div>

                    {/* Metadata Specs */}
                    <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
                        <span>{course.lessonsCount} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-300" />
                        <span>{course.durationHours} hrs</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.skills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 backdrop-blur-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions & Price */}
                <div className="p-5 sm:p-6 pt-0 border-t border-white/10 mt-2 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold text-white">
                        {currency === 'INR' ? `₹${course.priceINR}` : `$${course.priceUSD}`}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {currency === 'INR' ? `₹${course.originalPriceINR}` : `$${Math.round(course.priceUSD * 2.4)}`}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium">Includes Certificate</span>
                  </div>

                  {isEnrolled ? (
                    <button
                      onClick={() => startPlayingCourse(course)}
                      className="px-5 py-2 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <Play className="w-3 h-3 fill-indigo-700" />
                      <span>{isCompleted ? 'Review' : 'Continue'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openCheckout(course)}
                      className="px-5 py-2.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-black/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Enroll Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All CTA if on Landing Page */}
        {isLandingPage && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                const { setCurrentView } = useApp();
                setCurrentView('courses');
              }}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 font-bold text-sm transition-all hover:scale-105 backdrop-blur-md"
            >
              Browse All 10+ AI Mastercourses →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
