import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Sparkles,
  Send,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  Compass,
  FileCode,
  HelpCircle,
  Zap,
  Lightbulb,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
}

export const AiMentorChat: React.FC = () => {
  const { user, addXp } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'mentor',
      text: `👋 Greetings ${user.name}! I am your **Unovia AI Mentor** — your 24/7 personal tutor and learning copilot.

How can I accelerate your AI mastery today?
• 🚀 Generate a **Personalized 30-Day AI Roadmap**
• 💡 Explain complex AI models & concepts in plain English
• ✨ Refine and engineer custom prompts
• 🎯 Test your skills with an on-demand practice quiz`,
      timestamp: 'Just now',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'roadmap' | 'improver' | 'quiz'>('chat');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Prompt Improver State
  const [roughPrompt, setRoughPrompt] = useState('');
  const [improvedPromptResult, setImprovedPromptResult] = useState<{
    improved: string;
    explanation: string;
  } | null>(null);
  const [isImproving, setIsImproving] = useState(false);

  // Roadmap Generator State
  const [userGoal, setUserGoal] = useState('Build AI Automation Workflows for Clients');
  const [userLevel, setUserLevel] = useState('Beginner');
  const [roadmapResult, setRoadmapResult] = useState<string | null>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  // Dynamic Quiz Generator State
  const [quizTopic, setQuizTopic] = useState('Midjourney Prompting');
  const [generatedQuiz, setGeneratedQuiz] = useState<any[] | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    'How do I make money with AI tools as a beginner in 2026?',
    'What is the difference between Gemini, ChatGPT 4o, and Claude 3.5 Sonnet?',
    'Give me the RCTF prompt engineering framework with examples.',
    'Which AI video generator is best for YouTube Shorts & Reels?',
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          userProfile: {
            name: user.name,
            level: user.level,
            levelTitle: user.levelTitle,
            streakDays: user.streakDays,
          },
        }),
      });

      const data = await response.json();
      const mentorMsg: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: data.reply || 'I am ready to help! What would you like to explore next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, mentorMsg]);
      addXp(15, 'Engaged with Unovia AI Mentor');
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: `Here is a practical perspective on that:\n\n1. **Core Concept:** Modern Generative AI works by learning probabilistic token patterns across high-dimensional semantic spaces.\n2. **Actionable Step:** Always provide clear Context, Role, Task, and Format constraints to get precision outputs.\n\nWould you like me to generate a personalized practice assignment for you?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      addXp(15, 'Engaged with Unovia AI Mentor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImprovePrompt = async () => {
    if (!roughPrompt.trim()) return;
    setIsImproving(true);
    try {
      const res = await fetch('/api/ai/improve-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: roughPrompt, targetTool: 'ChatGPT & Gemini' }),
      });
      const data = await res.json();
      setImprovedPromptResult(data);
      addXp(30, 'Engineered a master prompt with AI');
    } catch {
      setImprovedPromptResult({
        improved: `[ROLE]: You are an elite AI Strategist and Subject Expert.\n[CONTEXT]: Working on high-impact business deliverables.\n[TASK]: ${roughPrompt}\n[CONSTRAINTS]: Step-by-step reasoning, markdown formatting, zero fluff, include actionable examples.\n[OUTPUT FORMAT]: Structured table + summary bullet points.`,
        explanation: 'Applied the RCTF (Role-Context-Task-Format) blueprint with negative constraints.',
      });
      addXp(30, 'Engineered a master prompt with AI');
    } finally {
      setIsImproving(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    setIsGeneratingRoadmap(true);
    try {
      const res = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: userGoal, currentLevel: userLevel, hoursPerWeek: 6 }),
      });
      const data = await res.json();
      setRoadmapResult(data.roadmap);
      addXp(50, 'Generated a custom 30-day AI Roadmap');
    } catch {
      setRoadmapResult(`### 30-Day AI Roadmap for ${userGoal}\n\n**Week 1: Foundations & Tool Setup**\n- Day 1-3: Prompt engineering & RCTF principles\n- Day 4-7: Top 10 productivity tools setup\n\n**Week 2: Image & Media Pipelines**\n- Day 8-14: Midjourney v6 + ElevenLabs voice cloning\n\n**Week 3: Automation & Make.com**\n- Day 15-21: Webhook triggers and AI auto-responders\n\n**Week 4: Capstone Launch**\n- Day 22-30: Build client-facing AI prototype`);
      addXp(50, 'Generated a custom 30-day AI Roadmap');
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true);
    setQuizSubmitted(false);
    setQuizAnswers({});
    try {
      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: quizTopic, difficulty: 'Intermediate', count: 3 }),
      });
      const data = await res.json();
      setGeneratedQuiz(data.quiz);
    } catch {
      setGeneratedQuiz([
        {
          id: 'q1',
          question: 'What is the primary benefit of Few-Shot Prompting?',
          options: [
            'It reduces API costs to zero',
            'It provides explicit input-output examples so the model learns the desired style & schema',
            'It replaces the need for vector databases',
            'It prevents the model from generating text',
          ],
          correctAnswerIndex: 1,
          explanation: 'Few-shot prompting provides sample demonstrations to steer style, format, and edge-case handling.',
        },
        {
          id: 'q2',
          question: 'In image generation with Midjourney, what does the parameter "--ar 16:9" control?',
          options: ['Animation rate', 'Aspect ratio', 'Artificial resolution', 'Alpha reflection'],
          correctAnswerIndex: 1,
          explanation: '--ar sets the aspect ratio dimensions of the generated canvas.',
        },
      ]);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-[85vh] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-xl shadow-cyan-500/20">
              <div className="w-full h-full bg-[#05011a]/80 backdrop-blur-md rounded-[14px] flex items-center justify-center">
                <Bot className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">UNOVIA AI MENTOR</h1>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 backdrop-blur-md">
                  Gemini 2.5 Live
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Your 24/7 Intelligent Learning Companion & AI Career Copilot
              </p>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/5 backdrop-blur-xl p-1.5 rounded-full border border-white/10 relative z-10">
            <button
              onClick={() => setActiveMode('chat')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeMode === 'chat'
                  ? 'bg-white text-indigo-700 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bot className="w-3.5 h-3.5" /> Tutor Chat
            </button>

            <button
              onClick={() => setActiveMode('improver')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeMode === 'improver'
                  ? 'bg-white text-indigo-700 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Prompt Improver
            </button>

            <button
              onClick={() => setActiveMode('roadmap')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeMode === 'roadmap'
                  ? 'bg-white text-indigo-700 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> 30-Day Roadmap
            </button>

            <button
              onClick={() => setActiveMode('quiz')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeMode === 'quiz'
                  ? 'bg-white text-indigo-700 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-yellow-400" /> AI Quiz Generator
            </button>
          </div>
        </div>

        {/* MODE 1: TUTOR CHAT */}
        {activeMode === 'chat' && (
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col h-[650px] overflow-hidden">
            {/* Messages Container */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.sender === 'mentor' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex-shrink-0 flex items-center justify-center shadow-md">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg border border-white/20'
                        : 'bg-white/5 backdrop-blur-md border border-white/10 text-slate-200 shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.text}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px] opacity-70">
                      <span>{m.timestamp}</span>
                      {m.sender === 'mentor' && (
                        <button
                          onClick={() => handleCopy(m.text, m.id)}
                          className="hover:text-cyan-300 flex items-center gap-1 font-semibold"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {m.sender === 'user' && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-xl object-cover ring-1 ring-white/20 flex-shrink-0 shadow-md"
                    />
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center shadow-md">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs text-cyan-300 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Unovia AI Mentor is formulating a personalized answer...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips & Input Bar */}
            <div className="p-4 bg-white/[0.02] backdrop-blur-md border-t border-white/10 space-y-3">
              {/* Suggested Quick Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-400" /> Suggestions:
                </span>
                {quickPrompts.map((qp, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => handleSendMessage(qp)}
                    className="text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white whitespace-nowrap transition-colors backdrop-blur-md"
                  >
                    {qp}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Unovia AI Mentor anything about courses, AI tools, prompt tips..."
                  className="flex-1 p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 focus:border-cyan-400/50 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-6 py-3.5 rounded-2xl bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs sm:text-sm disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-black/20 transition-all"
                >
                  <Send className="w-4 h-4 fill-indigo-700" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: PROMPT IMPROVER */}
        {activeMode === 'improver' && (
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>AI Prompt Supercharger & Blueprint Generator</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Transform rough, 1-line ideas into bulletproof professional prompts using the RCTF (Role, Context, Task, Format) structure.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300">
                Your Initial Prompt or Idea:
              </label>
              <textarea
                rows={3}
                value={roughPrompt}
                onChange={(e) => setRoughPrompt(e.target.value)}
                placeholder="Example: Write a cold email to sell web development to restaurants..."
                className="w-full p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 focus:border-amber-400/50 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleImprovePrompt}
              disabled={isImproving || !roughPrompt.trim()}
              className="px-7 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-black/20 transition-all disabled:opacity-50"
            >
              {isImproving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-700" />
                  <span>Engineering High-Yield Prompt...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Supercharge Prompt (+30 XP)</span>
                </>
              )}
            </button>

            {improvedPromptResult && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-amber-500/30 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      ✨ Supercharged Master Prompt
                    </span>
                    <button
                      onClick={() => handleCopy(improvedPromptResult.improved, 'improved-p')}
                      className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-amber-300 border border-white/10 flex items-center gap-1.5 backdrop-blur-md transition-all"
                    >
                      {copiedId === 'improved-p' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-slate-200 bg-black/40 p-4 rounded-2xl whitespace-pre-wrap border border-white/10">
                    {improvedPromptResult.improved}
                  </pre>
                  <p className="text-[11px] text-slate-300">
                    💡 <strong>Strategy:</strong> {improvedPromptResult.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 3: 30-DAY ROADMAP GENERATOR */}
        {activeMode === 'roadmap' && (
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Personalized 30-Day AI Career Roadmap Generator</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Tell Unovia AI Mentor what you want to achieve, and receive a customized 4-week structured curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Your Primary AI Goal:</label>
                <input
                  type="text"
                  value={userGoal}
                  onChange={(e) => setUserGoal(e.target.value)}
                  placeholder="e.g. Become an AI Video Creator & Launch a YouTube Channel"
                  className="w-full p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 focus:border-cyan-400/50 text-xs sm:text-sm text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Current Knowledge Level:</label>
                <select
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-[#0a0524]/90 backdrop-blur-md border border-white/10 focus:border-cyan-400/50 text-xs sm:text-sm text-slate-100"
                >
                  <option className="bg-[#0a0524] text-white">Beginner (Little or no AI background)</option>
                  <option className="bg-[#0a0524] text-white">Intermediate (Regular ChatGPT user)</option>
                  <option className="bg-[#0a0524] text-white">Advanced (Knows APIs / Workflows)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateRoadmap}
              disabled={isGeneratingRoadmap}
              className="px-7 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-black/20 transition-all disabled:opacity-50"
            >
              {isGeneratingRoadmap ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-700" />
                  <span>Generating Tailored Roadmap...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4 text-cyan-600" />
                  <span>Generate 30-Day AI Roadmap (+50 XP)</span>
                </>
              )}
            </button>

            {roadmapResult && (
              <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-cyan-500/30 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    🗺️ Your Custom 30-Day AI Milestone Plan
                  </span>
                  <button
                    onClick={() => handleCopy(roadmapResult, 'roadmap')}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs text-cyan-300 border border-white/10 hover:bg-white/20 flex items-center gap-1 backdrop-blur-md transition-all"
                  >
                    {copiedId === 'roadmap' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Roadmap</span>
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  {roadmapResult}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 4: DYNAMIC AI QUIZ GENERATOR */}
        {activeMode === 'quiz' && (
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-yellow-400" />
                <span>On-Demand AI Knowledge Quiz Generator</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Challenge your comprehension on any AI tool, framework, or model in real time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={quizTopic}
                onChange={(e) => setQuizTopic(e.target.value)}
                placeholder="Topic: Midjourney, Claude Artifacts, ReAct Prompting, Voice AI..."
                className="flex-1 p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 focus:border-yellow-400/50 text-xs sm:text-sm text-slate-100"
              />
              <button
                onClick={handleGenerateQuiz}
                disabled={isGeneratingQuiz}
                className="px-7 py-3.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/20 transition-all"
              >
                {isGeneratingQuiz ? (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-700" />
                ) : (
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                )}
                <span>Generate Live Quiz</span>
              </button>
            </div>

            {generatedQuiz && (
              <div className="space-y-5 pt-4 border-t border-white/10">
                {generatedQuiz.map((q, qIdx) => (
                  <div
                    key={q.id || qIdx}
                    className="p-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3 shadow-lg"
                  >
                    <p className="text-xs font-bold text-slate-200">
                      Q{qIdx + 1}: {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        let optClass = 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';

                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswerIndex) {
                            optClass = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 font-semibold';
                          } else if (isSelected) {
                            optClass = 'bg-rose-500/20 border-rose-500/40 text-rose-200';
                          }
                        } else if (isSelected) {
                          optClass = 'bg-indigo-600 text-white font-semibold border-white/30';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => !quizSubmitted && setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                            className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all backdrop-blur-md ${optClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && (
                      <p className="text-[11px] text-slate-300 pt-1">
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}

                {!quizSubmitted ? (
                  <button
                    onClick={() => {
                      setQuizSubmitted(true);
                      addXp(100, 'Completed custom AI quiz');
                    }}
                    className="px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-xl transition-all"
                  >
                    Submit Quiz (+100 XP)
                  </button>
                ) : (
                  <p className="text-xs font-bold text-emerald-400">
                    Quiz Finished! Your XP has been credited.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
