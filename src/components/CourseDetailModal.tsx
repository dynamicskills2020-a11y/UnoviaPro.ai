import React from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import {
  X,
  Star,
  Clock,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  Play,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const {
    selectedCourseForModal,
    setSelectedCourseForModal,
    user,
    startPlayingCourse,
    openCheckout,
  } = useApp();

  if (!selectedCourseForModal) return null;

  const course = selectedCourseForModal;
  const isEnrolled = user.enrolledCourseIds.includes(course.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0a0524]/90 backdrop-blur-2xl border border-white/15 shadow-2xl my-8 overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={() => setSelectedCourseForModal(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 border border-white/15 text-slate-300 hover:text-white transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Thumbnail Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] overflow-hidden bg-slate-950">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0524] via-[#0a0524]/60 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md border border-white/15">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium backdrop-blur-md border border-white/10">
                  {course.difficulty}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                {course.title}
              </h2>
            </div>

            <div className="flex items-baseline gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <span className="text-2xl font-black text-white">₹{course.priceINR}</span>
              <span className="text-xs text-slate-400 line-through">₹{course.originalPriceINR}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-slate-400">Duration</p>
                <p className="font-bold text-white">{course.durationHours} Hours</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <div>
                <p className="text-slate-400">Curriculum</p>
                <p className="font-bold text-white">{course.lessonsCount} Lessons</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <div>
                <p className="text-slate-400">Rating</p>
                <p className="font-bold text-white">{course.rating} ({course.reviewsCount} reviews)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Award className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-slate-400">Certificate</p>
                <p className="font-bold text-emerald-400">Verified QR ID</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Course Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{course.description}</p>
          </div>

          {/* Skills Learned */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Skills You Will Master</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Modules Breakdown */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Curriculum Modules & Lessons</h3>
            <div className="space-y-3">
              {course.modules.map((mod) => (
                <div key={mod.id} className="rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 p-4">
                  <h4 className="font-semibold text-xs text-cyan-300 uppercase tracking-wider mb-2">
                    {mod.title}
                  </h4>
                  <div className="space-y-2">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <Play className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-medium text-slate-200">{lesson.title}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Bio */}
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/20"
            />
            <div>
              <p className="text-xs text-cyan-400 font-semibold uppercase">Lead Instructor</p>
              <h4 className="font-bold text-white text-base">{course.instructor.name}</h4>
              <p className="text-xs text-slate-300 mt-0.5">{course.instructor.title}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>30-Day Full Refund Guarantee • Lifetime Access</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isEnrolled ? (
              <button
                onClick={() => {
                  setSelectedCourseForModal(null);
                  startPlayingCourse(course);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm shadow-lg shadow-black/20 flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-4 h-4 fill-indigo-700" />
                <span>Go to Course Player</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedCourseForModal(null);
                  openCheckout(course);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm shadow-lg shadow-black/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>Enroll in Course (₹{course.priceINR})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
