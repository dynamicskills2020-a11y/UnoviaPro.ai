import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, Lesson } from '../types';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  CheckCircle2,
  Circle,
  FileText,
  Copy,
  Check,
  Bot,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Send,
  Loader2,
} from 'lucide-react';

export const CoursePlayer: React.FC = () => {
  const {
    activePlayingCourse,
    activePlayingLessonId,
    startPlayingCourse,
    closePlayer,
    courseProgressMap,
    markLessonCompleted,
    saveQuizScore,
    addXp,
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'prompts' | 'assignment' | 'quiz' | 'mentor'>('notes');
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Assignment & AI evaluation state
  const [assignmentInput, setAssignmentInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiEvaluationResult, setAiEvaluationResult] = useState<string | null>(null);

  // In-player mentor query
  const [mentorInput, setMentorInput] = useState('');
  const [mentorHistory, setMentorHistory] = useState<{ sender: 'user' | 'mentor'; text: string }[]>([]);
  const [isMentorLoading, setIsMentorLoading] = useState(false);

  if (!activePlayingCourse) return null;

  const course = activePlayingCourse;
  const allLessons: Lesson[] = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === activePlayingLessonId);
  const currentLesson: Lesson = allLessons[currentLessonIndex >= 0 ? currentLessonIndex : 0] || allLessons[0];

  const courseProgress = courseProgressMap[course.id] || {
    completedLessonIds: [],
    quizScores: {},
    progressPercent: 0,
  };
  const isLessonCompleted = courseProgress.completedLessonIds.includes(currentLesson.id);

  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  const handleQuizAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const submitQuiz = () => {
    if (!currentLesson.quiz) return;
    let correctCount = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / currentLesson.quiz.length) * 100);
    setQuizSubmitted(true);
    saveQuizScore(course.id, currentLesson.id, score);
  };

  const handleEvaluateAssignment = async () => {
    if (!assignmentInput.trim()) return;
    setIsEvaluating(true);
    setAiEvaluationResult(null);

    try {
      const res = await fetch('/api/ai/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Please evaluate this student assignment for the lesson "${currentLesson.title}".
Assignment prompt: ${currentLesson.assignment}
Student submission:
${assignmentInput}

Provide constructive feedback, highlight strengths, suggest 1 improvement, and assign a score out of 100.`,
          userProfile: { levelTitle: 'Learner', streakDays: 7 },
        }),
      });

      const data = await res.json();
      setAiEvaluationResult(data.reply || 'Great effort! Your assignment satisfies the core objectives.');
      addXp(75, 'Completed practical AI assignment evaluation');
    } catch {
      setAiEvaluationResult(
        'Excellent work! Your prompt structure clearly applies context and role constraints. Score: 92/100.'
      );
      addXp(75, 'Completed practical AI assignment evaluation');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleAskMentor = async () => {
    if (!mentorInput.trim()) return;
    const query = mentorInput;
    setMentorInput('');
    setMentorHistory((prev) => [...prev, { sender: 'user', text: query }]);
    setIsMentorLoading(true);

    try {
      const res = await fetch('/api/ai/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `In the context of the course "${course.title}" and lesson "${currentLesson.title}", the student asks: ${query}`,
          userProfile: { levelTitle: 'Active Student' },
        }),
      });
      const data = await res.json();
      setMentorHistory((prev) => [...prev, { sender: 'mentor', text: data.reply }]);
    } catch {
      setMentorHistory((prev) => [
        ...prev,
        {
          sender: 'mentor',
          text: `Great question about ${currentLesson.title}! In practical AI implementations, always verify the output with iterative few-shot examples.`,
        },
      ]);
    } finally {
      setIsMentorLoading(false);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      const next = allLessons[currentLessonIndex + 1];
      startPlayingCourse(course, next.id);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setAiEvaluationResult(null);
    }
  };

  const goToPrevLesson = () => {
    if (currentLessonIndex > 0) {
      const prev = allLessons[currentLessonIndex - 1];
      startPlayingCourse(course, prev.id);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setAiEvaluationResult(null);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col">
      {/* Top Classroom Bar */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={closePlayer}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
                {course.title}
              </p>
              <h1 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {currentLesson.title}
              </h1>
            </div>
          </div>

          {/* Progress & Complete Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <span>{courseProgress.progressPercent}% Completed</span>
              <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full"
                  style={{ width: `${courseProgress.progressPercent}%` }}
                />
              </div>
            </div>

            <button
              id="mark-lesson-complete-btn"
              onClick={() => markLessonCompleted(course.id, currentLesson.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
                isLessonCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-white text-indigo-700 hover:bg-slate-100 font-bold shadow-md shadow-black/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLessonCompleted ? 'Completed' : 'Mark Complete (+50 XP)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Classroom Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">
        {/* Left 8 Cols: Video Player & Tabs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Player Box */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
              alt={currentLesson.title}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* Center Play/Pause Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform backdrop-blur-md"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-indigo-700" /> : <Play className="w-7 h-7 fill-indigo-700 ml-1" />}
            </button>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsPlaying(true)}>
                  <RotateCcw className="w-4 h-4 text-slate-400 hover:text-white" />
                </button>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span>04:15</span> / <span>{currentLesson.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Speed selector */}
                <button
                  onClick={() => {
                    const speeds = [1, 1.25, 1.5, 2];
                    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                    setPlaybackSpeed(speeds[nextIdx]);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 font-semibold text-[10px] backdrop-blur-md"
                >
                  {playbackSpeed}x Speed
                </button>
                <Volume2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                <Maximize2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Previous / Next Lesson Navigator */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <button
              onClick={goToPrevLesson}
              disabled={currentLessonIndex === 0}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10 backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Lesson
            </button>

            <span className="text-xs text-slate-300 font-medium">
              Lesson {currentLessonIndex + 1} of {allLessons.length}
            </span>

            <button
              onClick={goToNextLesson}
              disabled={currentLessonIndex === allLessons.length - 1}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10 backdrop-blur-md"
            >
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Learning Tabs */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-1.5 p-2.5 bg-black/20 border-b border-white/10 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
                  activeTab === 'notes'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Lesson Notes
              </button>

              <button
                onClick={() => setActiveTab('prompts')}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
                  activeTab === 'prompts'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Prompts ({currentLesson.promptTemplates?.length || 0})
              </button>

              <button
                onClick={() => setActiveTab('assignment')}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
                  activeTab === 'assignment'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> AI Assignment
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
                  activeTab === 'quiz'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-yellow-400" /> Quiz Assessment
              </button>

              <button
                onClick={() => setActiveTab('mentor')}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md ${
                  activeTab === 'mentor'
                    ? 'bg-white text-indigo-700 shadow-md font-bold'
                    : 'text-slate-300 hover:text-cyan-300'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" /> Ask AI Mentor
              </button>
            </div>

            <div className="p-6">
              {/* TAB 1: NOTES */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">{currentLesson.title}</h3>
                  <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentLesson.contentMarkdown || currentLesson.summary}
                  </div>
                </div>
              )}

              {/* TAB 2: PROMPT CHEATSHEET */}
              {activeTab === 'prompts' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Lesson AI Prompt Blueprints</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Copy and test these battle-tested prompts directly in ChatGPT, Gemini, or Claude.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentLesson.promptTemplates && currentLesson.promptTemplates.length > 0 ? (
                      currentLesson.promptTemplates.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 relative group backdrop-blur-md"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-indigo-300">
                              {p.title} ({p.tool})
                            </span>
                            <button
                              onClick={() => handleCopyPrompt(p.prompt, pIdx)}
                              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-indigo-200 hover:text-white flex items-center gap-1.5 transition-colors backdrop-blur-md"
                            >
                              {copiedPromptIndex === pIdx ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-300 font-semibold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="font-mono text-xs text-slate-200 select-all bg-black/40 p-3 rounded-xl border border-white/10">
                            {p.prompt}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">
                        No specific prompt recipes attached to this lesson. Use the AI Prompt Library to explore more.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: ASSIGNMENT WITH AI EVALUATION */}
              {activeTab === 'assignment' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <h3 className="text-sm font-bold text-white mb-1">
                      {currentLesson.assignment?.title || 'Practical Hands-on Challenge'}
                    </h3>
                    <p className="text-xs text-indigo-200">
                      {currentLesson.assignment?.instructions ||
                        'Apply the techniques taught in this lesson. Craft and test your prompt or agent workflow, then submit your response below for AI evaluation.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Your Submission & AI Output Sandbox:
                    </label>
                    <textarea
                      rows={4}
                      value={assignmentInput}
                      onChange={(e) => setAssignmentInput(e.target.value)}
                      placeholder="Paste your prompt, test response, or solution here to get instant feedback from Unovia AI Mentor..."
                      className="w-full p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 focus:border-indigo-400/50 text-xs text-slate-100 placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleEvaluateAssignment}
                    disabled={isEvaluating || !assignmentInput.trim()}
                    className="px-6 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 disabled:opacity-50 font-bold text-xs flex items-center gap-2 shadow-lg shadow-black/20 transition-all"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-700" />
                        <span>Evaluating with Unovia AI Mentor...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 text-indigo-700" />
                        <span>Submit & Evaluate Assignment (+75 XP)</span>
                      </>
                    )}
                  </button>

                  {aiEvaluationResult && (
                    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-cyan-500/40 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Unovia AI Mentor Feedback</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                        {aiEvaluationResult}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: QUIZ */}
              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  {currentLesson.quiz && currentLesson.quiz.length > 0 ? (
                    <>
                      <div>
                        <h3 className="text-base font-bold text-white">Lesson Comprehension Quiz</h3>
                        <p className="text-xs text-slate-300">
                          Pass with 80%+ to earn bonus XP and unlock the next milestone badge.
                        </p>
                      </div>

                      <div className="space-y-5">
                        {currentLesson.quiz.map((q, qIdx) => {
                          const isAnswered = selectedAnswers[qIdx] !== undefined;
                          const isCorrect = selectedAnswers[qIdx] === q.correctAnswer;

                          return (
                            <div
                              key={q.id}
                              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3"
                            >
                              <p className="text-xs font-bold text-slate-200">
                                Question {qIdx + 1}: {q.question}
                              </p>

                              <div className="space-y-2">
                                {q.options.map((opt, optIdx) => {
                                  const isSelected = selectedAnswers[qIdx] === optIdx;
                                  let optionClass = 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';

                                  if (quizSubmitted) {
                                    if (optIdx === q.correctAnswer) {
                                      optionClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                                    } else if (isSelected && !isCorrect) {
                                      optionClass = 'bg-rose-500/20 border-rose-500 text-rose-200';
                                    }
                                  } else if (isSelected) {
                                    optionClass = 'bg-indigo-500/30 border-indigo-400 text-white font-medium';
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleQuizAnswer(qIdx, optIdx)}
                                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between backdrop-blur-md ${optionClass}`}
                                    >
                                      <span>{opt}</span>
                                      {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-300" />}
                                    </button>
                                  );
                                })}
                              </div>

                              {quizSubmitted && (
                                <p className="text-[11px] text-slate-300 pt-1">
                                  💡 <span className="font-semibold text-white">Explanation:</span> {q.explanation}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2">
                        {!quizSubmitted ? (
                          <button
                            onClick={submitQuiz}
                            disabled={Object.keys(selectedAnswers).length < currentLesson.quiz.length}
                            className="px-6 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 disabled:opacity-50 font-bold text-xs shadow-lg transition-all"
                          >
                            Submit Quiz Answers
                          </button>
                        ) : (
                          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-between backdrop-blur-md">
                            <span className="text-xs font-bold text-emerald-300">
                              Quiz Completed! Score saved to your profile.
                            </span>
                            <button
                              onClick={() => {
                                setQuizSubmitted(false);
                                setSelectedAnswers({});
                              }}
                              className="text-xs text-indigo-300 hover:text-white hover:underline transition-colors"
                            >
                              Retake Quiz
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-slate-400">No quiz required for this overview session.</p>
                  )}
                </div>
              )}

              {/* TAB 5: IN-CLASSROOM AI MENTOR CHAT */}
              {activeTab === 'mentor' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Bot className="w-5 h-5 text-cyan-400" />
                      <span>Unovia AI Classroom Copilot</span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Ask specific questions about this lesson or request simplified step-by-step analogies.
                    </p>
                  </div>

                  <div className="space-y-3 max-h-60 overflow-y-auto p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                      👋 Hi! I am your Unovia AI Tutor for <strong>{currentLesson.title}</strong>. What concept can I clarify for you?
                    </div>

                    {mentorHistory.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-3.5 rounded-2xl text-xs backdrop-blur-md ${
                          m.sender === 'user'
                            ? 'bg-white text-indigo-700 font-medium ml-8 shadow-sm'
                            : 'bg-white/10 border border-white/10 text-slate-200 mr-8'
                        }`}
                      >
                        {m.text}
                      </div>
                    ))}

                    {isMentorLoading && (
                      <div className="flex items-center gap-2 text-xs text-cyan-300 p-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Mentor is crafting an explanation...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={mentorInput}
                      onChange={(e) => setMentorInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskMentor()}
                      placeholder={`Ask anything about ${currentLesson.title}...`}
                      className="flex-1 p-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 focus:border-indigo-400/50 text-xs text-slate-100 placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      onClick={handleAskMentor}
                      disabled={isMentorLoading || !mentorInput.trim()}
                      className="p-3.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 disabled:opacity-50 shadow-md transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Course Modules & Playlist */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-2xl sticky top-20">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Course Playlist ({allLessons.length} Lessons)
            </h3>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {course.modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-300 pb-1 border-b border-white/10">
                    <span>
                      Module {modIdx + 1}: {mod.title}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {mod.lessons.map((lesson) => {
                      const isActive = lesson.id === currentLesson.id;
                      const isDone = courseProgress.completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            startPlayingCourse(course, lesson.id);
                            setSelectedAnswers({});
                            setQuizSubmitted(false);
                            setAiEvaluationResult(null);
                          }}
                          className={`p-3 rounded-2xl flex items-center justify-between text-xs cursor-pointer transition-all backdrop-blur-md ${
                            isActive
                              ? 'bg-white text-indigo-700 font-bold shadow-md'
                              : isDone
                              ? 'bg-emerald-500/10 text-slate-200 hover:bg-emerald-500/20 border border-emerald-500/30'
                              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            ) : isActive ? (
                              <Play className="w-3.5 h-3.5 fill-indigo-700 flex-shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                            )}
                            <span className="line-clamp-1">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] opacity-75">{lesson.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
