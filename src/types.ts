export type LanguageCode = 'en' | 'hi' | 'kn' | 'te' | 'ta' | 'ml' | 'mr';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  xp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  streakActiveToday: boolean;
  certificatesCount: number;
  completedLessonsCount: number;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  earnedBadgeIds: string[];
  referralCode: string;
  affiliateEarnings: number;
  joinedDate: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonResource {
  name: string;
  type: 'pdf' | 'template' | 'code' | 'link';
  url: string;
  size?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "12 mins"
  videoUrl?: string;
  summary: string;
  contentMarkdown: string;
  promptTemplates?: { title: string; prompt: string; tool: string }[];
  assignment?: {
    title: string;
    instructions: string;
    starterPromptOrCode: string;
    solutionHint: string;
  };
  quiz?: QuizQuestion[];
  resources?: LessonResource[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  category: 'Beginner' | 'Creator' | 'Business' | 'Professional' | 'Developer';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  instructor: {
    name: string;
    title: string;
    avatar: string;
    rating: number;
    studentsCount: number;
  };
  rating: number;
  reviewsCount: number;
  lessonsCount: number;
  durationHours: number;
  enrolledCount: number;
  priceINR: number;
  priceUSD: number;
  originalPriceINR: number;
  thumbnail: string;
  skills: string[];
  prerequisites: string[];
  description: string;
  modules: CourseModule[];
  badgeReward: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
}

export interface AiTool {
  id: string;
  name: string;
  category:
    | 'AI Writing'
    | 'AI Image Generation'
    | 'AI Video Generation'
    | 'AI Voice'
    | 'AI Presentation'
    | 'AI Coding'
    | 'AI Marketing'
    | 'AI Productivity'
    | 'AI Automation'
    | 'AI Business';
  description: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  websiteUrl: string;
  logo: string;
  tags: string[];
  proTip: string;
  featuredCourseId?: string;
  samplePrompt?: string;
}

export interface PromptItem {
  id: string;
  title: string;
  category:
    | 'ChatGPT Prompts'
    | 'Business Prompts'
    | 'Marketing Prompts'
    | 'Social Media Prompts'
    | 'Image Generation Prompts'
    | 'Video Generation Prompts'
    | 'Education Prompts'
    | 'Productivity Prompts';
  targetTool: string;
  promptText: string;
  tags: string[];
  author: string;
  likesCount: number;
  isSaved?: boolean;
  variables?: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  xpValue: number;
}

export interface Certificate {
  id: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  issueDate: string;
  verificationCode: string;
  qrCodeUrl?: string;
  skillsLearned: string[];
  gradeScore: number;
}

export interface LiveEvent {
  id: string;
  title: string;
  type: 'Masterclass' | 'Workshop' | 'Webinar' | 'AMA Session' | 'Challenge';
  speaker: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
  dateTime: string;
  duration: string;
  registeredCount: number;
  isLiveNow?: boolean;
  description: string;
  tags: string[];
  bannerUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; payload?: any }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'reward' | 'course' | 'event' | 'system';
  isRead: boolean;
}
