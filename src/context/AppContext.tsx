import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  LanguageCode,
  Course,
  PromptItem,
  AiTool,
  Certificate,
  NotificationItem,
  Badge,
} from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { PROMPTS_DATA } from '../data/promptsData';
import { AI_TOOLS_DATA } from '../data/toolsData';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export type AppView =
  | 'home'
  | 'landing'
  | 'courses'
  | 'dashboard'
  | 'player'
  | 'mentor'
  | 'tools'
  | 'prompts'
  | 'certificates'
  | 'events'
  | 'achievements'
  | 'gamification'
  | 'instructor'
  | 'admin'
  | 'affiliate'
  | 'profile';

export interface CourseProgress {
  completedLessonIds: string[];
  quizScores: Record<string, number>;
  progressPercent: number;
}

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-ai-explorer',
    name: 'AI Explorer',
    icon: '🏆',
    description: 'Completed foundational AI for Beginners course.',
    unlockedAt: '2026-08-20',
    rarity: 'Common',
    xpValue: 250,
  },
  {
    id: 'badge-prompt-master',
    name: 'Prompt Master',
    icon: '🚀',
    description: 'Mastered ChatGPT power user prompts and few-shot engineering.',
    unlockedAt: '2026-08-22',
    rarity: 'Rare',
    xpValue: 500,
  },
  {
    id: 'badge-ai-creator',
    name: 'AI Creator',
    icon: '🎨',
    description: 'Generated over 20+ photorealistic assets with Midjourney and Runway.',
    unlockedAt: '2026-08-25',
    rarity: 'Rare',
    xpValue: 500,
  },
  {
    id: 'badge-automation-expert',
    name: 'Automation Expert',
    icon: '🤖',
    description: 'Constructed zero-code AI agent workflows connecting CRM and Webhooks.',
    rarity: 'Epic',
    xpValue: 750,
  },
  {
    id: 'badge-ai-entrepreneur',
    name: 'AI Entrepreneur',
    icon: '💼',
    description: 'Launched a high-ticket AI agency or micro-SaaS service offer.',
    rarity: 'Epic',
    xpValue: 1000,
  },
  {
    id: 'badge-unovia-pro',
    name: 'Unovia AI Pro',
    icon: '👑',
    description: 'Completed 5+ mastercourses and reached Top 5% Global Leaderboard.',
    rarity: 'Legendary',
    xpValue: 2000,
  },
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    studentName: 'Ram Sharma',
    courseId: 'ai-for-beginners',
    courseTitle: 'AI for Beginners',
    instructorName: 'Dr. Aarav Sharma',
    issueDate: 'August 22, 2026',
    verificationCode: 'UNOVIA-2026-AI-89421',
    skillsLearned: ['Generative AI Fundamentals', 'Prompt Engineering', 'Everyday AI Tools', 'Token Optimization'],
    gradeScore: 96,
  },
  {
    id: 'cert-2',
    studentName: 'Ram Sharma',
    courseId: 'master-chatgpt',
    courseTitle: 'Master ChatGPT: From Casual User to Power Operator',
    instructorName: 'Priya Nambiar',
    issueDate: 'August 25, 2026',
    verificationCode: 'UNOVIA-2026-CGPT-41029',
    skillsLearned: ['Custom Instructions', 'Data Analysis', 'Custom GPTs Builder', 'Multimodal Vision'],
    gradeScore: 98,
  },
];

interface AppContextType {
  user: UserProfile;
  currentView: AppView;
  language: LanguageCode;
  selectedCourseForModal: Course | null;
  activePlayingCourse: Course | null;
  activePlayingLessonId: string | null;
  courseProgressMap: Record<string, CourseProgress>;
  badges: Badge[];
  certificates: Certificate[];
  notifications: NotificationItem[];
  savedPromptIds: string[];
  customPrompts: PromptItem[];
  isAuthModalOpen: boolean;
  isCheckoutModalOpen: boolean;
  checkoutCourse: Course | null;
  isContactModalOpen: boolean;
  isLegalModalOpen: boolean;
  legalModalType: 'privacy' | 'terms' | 'about' | 'contact';
  unreadNotificationsCount: number;
  t: (key: keyof typeof TRANSLATIONS.en) => string;
  setCurrentView: (view: AppView) => void;
  setLanguage: (lang: LanguageCode) => void;
  setSelectedCourseForModal: (course: Course | null) => void;
  startPlayingCourse: (course: Course, lessonId?: string) => void;
  closePlayer: () => void;
  markLessonCompleted: (courseId: string, lessonId: string) => void;
  saveQuizScore: (courseId: string, lessonId: string, score: number) => void;
  enrollInCourse: (course: Course) => void;
  openCheckout: (course: Course) => void;
  closeCheckout: () => void;
  toggleSavePrompt: (promptId: string) => void;
  addCustomPrompt: (prompt: Omit<PromptItem, 'id' | 'likesCount' | 'author'>) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openContactModal: () => void;
  closeContactModal: () => void;
  openLegalModal: (type: 'privacy' | 'terms' | 'about' | 'contact') => void;
  closeLegalModal: () => void;
  switchUserRole: (role: 'student' | 'instructor' | 'admin') => void;
  loginUser: (userData: Partial<UserProfile>) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addXp: (amount: number, reason?: string) => void;
  triggerConfetti: () => void;
  markNotificationsAsRead: () => void;
  generateCertificate: (course: Course) => Certificate;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [activePlayingCourse, setActivePlayingCourse] = useState<Course | null>(null);
  const [activePlayingLessonId, setActivePlayingLessonId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'about' | 'contact'>('about');

  const [user, setUser] = useState<UserProfile>({
    id: 'usr-1',
    name: 'Ram',
    email: 'dynamicskills2020@gmail.com',
    phone: '+91-9353649990',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    xp: 2850,
    level: 4,
    levelTitle: 'Prompt Architect',
    streakDays: 7,
    streakActiveToday: true,
    certificatesCount: 2,
    completedLessonsCount: 14,
    enrolledCourseIds: ['ai-for-beginners', 'master-chatgpt', 'prompt-engineering-pro'],
    completedCourseIds: ['ai-for-beginners', 'master-chatgpt'],
    earnedBadgeIds: ['badge-ai-explorer', 'badge-prompt-master', 'badge-ai-creator'],
    referralCode: 'UNOVIA-RAM77',
    affiliateEarnings: 42500,
    joinedDate: 'August 2026',
  });

  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, CourseProgress>>({
    'ai-for-beginners': {
      completedLessonIds: ['l1', 'l2', 'l3', 'l4'],
      quizScores: { l1: 100, l2: 100 },
      progressPercent: 100,
    },
    'master-chatgpt': {
      completedLessonIds: ['cgpt-l1', 'cgpt-l2'],
      quizScores: { 'cgpt-l1': 100 },
      progressPercent: 100,
    },
    'prompt-engineering-pro': {
      completedLessonIds: ['pe-l1'],
      quizScores: {},
      progressPercent: 45,
    },
  });

  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>(['p-1', 'p-3', 'p-5']);
  const [customPrompts, setCustomPrompts] = useState<PromptItem[]>([]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: '🔥 7-Day Streak Maintained!',
      message: 'You unlocked a +100 XP streak bonus! Keep learning daily.',
      timestamp: '10 mins ago',
      type: 'reward',
      isRead: false,
    },
    {
      id: 'notif-2',
      title: '🚀 Live Masterclass Tomorrow',
      message: 'Building Autonomous AI Agents with Gemini starts at 7:00 PM IST.',
      timestamp: '2 hours ago',
      type: 'event',
      isRead: false,
    },
    {
      id: 'notif-3',
      title: '🎓 Certificate Issued',
      message: 'Your Certificate for "Master ChatGPT" is verified and ready to download.',
      timestamp: '1 day ago',
      type: 'course',
      isRead: true,
    },
  ]);

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const t = (key: keyof typeof TRANSLATIONS.en): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4338ca', '#6366f1', '#8b5cf6', '#3b82f6', '#ec4899', '#fbbf24'],
      });
    } catch {
      // safe fallback
    }
  };

  const addXp = (amount: number, reason?: string) => {
    setUser((prev) => {
      const nextXp = prev.xp + amount;
      const nextLevel = Math.floor(nextXp / 800) + 1;
      let nextTitle = prev.levelTitle;
      if (nextLevel >= 5) nextTitle = 'Unovia AI Pro';
      else if (nextLevel >= 4) nextTitle = 'Prompt Architect';
      else if (nextLevel >= 3) nextTitle = 'AI Specialist';
      else if (nextLevel >= 2) nextTitle = 'AI Practitioner';

      return {
        ...prev,
        xp: nextXp,
        level: nextLevel,
        levelTitle: nextTitle,
      };
    });

    if (reason) {
      setNotifications((prev) => [
        {
          id: `xp-${Date.now()}`,
          title: `+${amount} XP Earned!`,
          message: reason,
          timestamp: 'Just now',
          type: 'reward',
          isRead: false,
        },
        ...prev,
      ]);
    }
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const switchUserRole = (role: 'student' | 'instructor' | 'admin') => {
    setUser((prev) => ({ ...prev, role }));
    if (role === 'instructor') setCurrentView('instructor');
    else if (role === 'admin') setCurrentView('admin');
    else setCurrentView('dashboard');
  };

  const loginUser = (userData: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...userData,
    }));
    triggerConfetti();
    setIsAuthModalOpen(false);
    if (userData.role === 'instructor') setCurrentView('instructor');
    else if (userData.role === 'admin') setCurrentView('admin');
    else setCurrentView('dashboard');

    setNotifications((prev) => [
      {
        id: `auth-${Date.now()}`,
        title: `Welcome back, ${userData.name || 'Learner'}! 👋`,
        message: 'Successfully logged in to Unovia AI Academy Pro. Continue where you left off!',
        timestamp: 'Just now',
        type: 'reward',
        isRead: false,
      },
      ...prev,
    ]);
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const startPlayingCourse = (course: Course, lessonId?: string) => {
    setActivePlayingCourse(course);
    const targetLessonId = lessonId || course.modules[0]?.lessons[0]?.id || null;
    setActivePlayingLessonId(targetLessonId);
    setCurrentView('player');
    setSelectedCourseForModal(null);
  };

  const closePlayer = () => {
    setActivePlayingCourse(null);
    setActivePlayingLessonId(null);
    setCurrentView('dashboard');
  };

  const markLessonCompleted = (courseId: string, lessonId: string) => {
    setCourseProgressMap((prev) => {
      const current = prev[courseId] || { completedLessonIds: [], quizScores: {}, progressPercent: 0 };
      if (!current.completedLessonIds.includes(lessonId)) {
        const nextCompleted = [...current.completedLessonIds, lessonId];
        const course = COURSES_DATA.find((c) => c.id === courseId);
        const totalLessons = course ? course.lessonsCount : 10;
        const progress = Math.min(100, Math.round((nextCompleted.length / totalLessons) * 100));

        // Award XP
        addXp(50, `Completed lesson: ${lessonId}`);

        // Check course completion
        if (progress >= 100 && course && !user.completedCourseIds.includes(courseId)) {
          setUser((u) => ({
            ...u,
            completedCourseIds: [...u.completedCourseIds, courseId],
            completedLessonsCount: u.completedLessonsCount + 1,
          }));
          generateCertificate(course);
          triggerConfetti();
        }

        return {
          ...prev,
          [courseId]: {
            ...current,
            completedLessonIds: nextCompleted,
            progressPercent: progress,
          },
        };
      }
      return prev;
    });
  };

  const saveQuizScore = (courseId: string, lessonId: string, score: number) => {
    setCourseProgressMap((prev) => {
      const current = prev[courseId] || { completedLessonIds: [], quizScores: {}, progressPercent: 0 };
      return {
        ...prev,
        [courseId]: {
          ...current,
          quizScores: {
            ...current.quizScores,
            [lessonId]: score,
          },
        },
      };
    });
    if (score >= 80) {
      addXp(100, `Passed lesson quiz with score ${score}%!`);
    }
  };

  const generateCertificate = (course: Course): Certificate => {
    const existing = certificates.find((c) => c.courseId === course.id);
    if (existing) return existing;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      studentName: user.name,
      courseId: course.id,
      courseTitle: course.title,
      instructorName: course.instructor.name,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verificationCode: `UNOVIA-${new Date().getFullYear()}-${course.category.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      skillsLearned: course.skills,
      gradeScore: 97,
    };

    setCertificates((prev) => [newCert, ...prev]);
    setUser((u) => ({
      ...u,
      certificatesCount: u.certificatesCount + 1,
      earnedBadgeIds: course.badgeReward ? [...u.earnedBadgeIds, course.badgeReward.id] : u.earnedBadgeIds,
    }));

    addXp(300, `Earned verified certificate for ${course.title}!`);
    return newCert;
  };

  const openCheckout = (course: Course) => {
    setCheckoutCourse(course);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutModalOpen(false);
    setCheckoutCourse(null);
  };

  const enrollInCourse = (course: Course) => {
    if (!user.enrolledCourseIds.includes(course.id)) {
      setUser((prev) => ({
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, course.id],
      }));
      setCourseProgressMap((prev) => ({
        ...prev,
        [course.id]: {
          completedLessonIds: [],
          quizScores: {},
          progressPercent: 0,
        },
      }));
    }
    triggerConfetti();
    closeCheckout();
    startPlayingCourse(course);
  };

  const toggleSavePrompt = (promptId: string) => {
    setSavedPromptIds((prev) =>
      prev.includes(promptId) ? prev.filter((id) => id !== promptId) : [...prev, promptId]
    );
  };

  const addCustomPrompt = (newPromptData: Omit<PromptItem, 'id' | 'likesCount' | 'author'>) => {
    const item: PromptItem = {
      ...newPromptData,
      id: `custom-${Date.now()}`,
      likesCount: 1,
      author: user.name,
      isSaved: true,
    };
    setCustomPrompts((prev) => [item, ...prev]);
    setSavedPromptIds((prev) => [...prev, item.id]);
    addXp(75, 'Created a custom prompt template');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  const openLegalModal = (type: 'privacy' | 'terms' | 'about' | 'contact') => {
    setLegalModalType(type);
    setIsLegalModalOpen(true);
  };
  const closeLegalModal = () => setIsLegalModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        user,
        currentView,
        language,
        selectedCourseForModal,
        activePlayingCourse,
        activePlayingLessonId,
        courseProgressMap,
        badges,
        certificates,
        notifications,
        savedPromptIds,
        customPrompts,
        isAuthModalOpen,
        isCheckoutModalOpen,
        checkoutCourse,
        isContactModalOpen,
        isLegalModalOpen,
        legalModalType,
        unreadNotificationsCount,
        t,
        setCurrentView,
        setLanguage,
        setSelectedCourseForModal,
        startPlayingCourse,
        closePlayer,
        markLessonCompleted,
        saveQuizScore,
        enrollInCourse,
        openCheckout,
        closeCheckout,
        toggleSavePrompt,
        addCustomPrompt,
        openAuthModal,
        closeAuthModal,
        openContactModal,
        closeContactModal,
        openLegalModal,
        closeLegalModal,
        switchUserRole,
        loginUser,
        updateUserProfile,
        addXp,
        triggerConfetti,
        markNotificationsAsRead,
        generateCertificate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
