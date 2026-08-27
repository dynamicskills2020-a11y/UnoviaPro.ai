import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { TrustBenefitsSection } from './components/TrustBenefitsSection';
import { LearningPathsSection } from './components/LearningPathsSection';
import { CoursesGrid } from './components/CoursesGrid';
import { CourseDetailModal } from './components/CourseDetailModal';
import { CoursePlayer } from './components/CoursePlayer';
import { AiMentorChat } from './components/AiMentorChat';
import { StudentDashboard } from './components/StudentDashboard';
import { AiToolsDirectory } from './components/AiToolsDirectory';
import { PromptLibrary } from './components/PromptLibrary';
import { GamificationView } from './components/GamificationView';
import { CertificateView } from './components/CertificateView';
import { EventsView } from './components/EventsView';
import { InstructorPortal } from './components/InstructorPortal';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import { AffiliateDashboard } from './components/AffiliateDashboard';
import { UserProfileView } from './components/UserProfileView';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { X, Mail, Phone, MessageSquare, Globe, ShieldCheck, FileText, Info } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    currentView,
    isContactModalOpen,
    closeContactModal,
    isLegalModalOpen,
    closeLegalModal,
    legalModalType,
  } = useApp();

  return (
    <div className="min-h-screen bg-[#05011a] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans antialiased pb-20 md:pb-0 relative overflow-x-hidden">
      {/* Ambient background light orbs for frosted glass effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
        {(currentView === 'landing' || currentView === 'home') && (
          <>
            <HeroSection />
            <TrustBenefitsSection />
            <LearningPathsSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center space-y-3 mb-12">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  Featured Masterclasses
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Trending AI Courses in India & Worldwide
                </h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto">
                  Step-by-step practical curriculums built for beginner students, creators, developers, and corporate professionals.
                </p>
              </div>
              <CoursesGrid />
            </div>
          </>
        )}

        {currentView === 'dashboard' && <StudentDashboard />}
        {currentView === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Complete AI Course Library
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl">
                Browse step-by-step masterclasses with hands-on AI projects, downloadable prompt templates, and verifiable certificates.
              </p>
            </div>
            <CoursesGrid />
          </div>
        )}
        {currentView === 'player' && <CoursePlayer />}
        {currentView === 'mentor' && <AiMentorChat />}
        {currentView === 'tools' && <AiToolsDirectory />}
        {currentView === 'prompts' && <PromptLibrary />}
        {(currentView === 'gamification' || currentView === 'achievements') && <GamificationView />}
        {currentView === 'certificates' && <CertificateView />}
        {currentView === 'events' && <EventsView />}
        {currentView === 'instructor' && <InstructorPortal />}
        {currentView === 'admin' && <SuperAdminPanel />}
        {currentView === 'affiliate' && <AffiliateDashboard />}
        {currentView === 'profile' && <UserProfileView />}
      </main>

      {/* Global Overlays & Modals */}
      <CourseDetailModal />
      <CheckoutModal />
      <AuthModal />

      {/* Frosted Glass Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Get in Touch with Unovia AI</h3>
                  <p className="text-xs text-slate-300">We respond in under 15 minutes</p>
                </div>
              </div>
              <button
                onClick={closeContactModal}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@unovia.ai"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Mail className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs text-slate-400">Official Email</div>
                  <div className="font-semibold text-white">info@unovia.ai</div>
                </div>
              </a>

              <a
                href="tel:+919353649990"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs text-slate-400">Direct Phone Line</div>
                  <div className="font-semibold text-white">+91-9353649990</div>
                </div>
              </a>

              <a
                href="https://wa.me/918074933077"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs text-emerald-300">WhatsApp Instant Support</div>
                  <div className="font-semibold text-white">+91-8074933077</div>
                </div>
              </a>

              <a
                href="https://www.unovia.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Globe className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs text-slate-400">Official Web Portal</div>
                  <div className="font-semibold text-white">www.unovia.ai</div>
                </div>
              </a>
            </div>

            <button
              onClick={closeContactModal}
              className="w-full py-3.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Frosted Glass Legal / Policy Modal */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between sticky top-0 bg-[#05011a]/80 backdrop-blur-xl p-2 -m-2 rounded-2xl border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  {legalModalType === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                  {legalModalType === 'terms' && <FileText className="w-5 h-5 text-indigo-400" />}
                  {legalModalType === 'about' && <Info className="w-5 h-5 text-cyan-400" />}
                  {legalModalType === 'contact' && <Mail className="w-5 h-5 text-indigo-400" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white capitalize">
                    {legalModalType === 'privacy' && 'Privacy Policy & Data Security'}
                    {legalModalType === 'terms' && 'Terms of Service & Course Access'}
                    {legalModalType === 'about' && 'About Unovia AI Academy Pro'}
                    {legalModalType === 'contact' && 'Official Contact Directory'}
                  </h3>
                  <p className="text-xs text-slate-300">Unovia AI Academy Pro • ISO 9001:2015 Certified</p>
                </div>
              </div>
              <button
                onClick={closeLegalModal}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              {legalModalType === 'privacy' && (
                <>
                  <p>
                    At Unovia AI Academy Pro (<strong>www.unovia.ai</strong>), we are committed to protecting learner privacy. Your personal information, learning logs, and submitted prompts are encrypted using industry-standard TLS 1.3 encryption.
                  </p>
                  <h4 className="text-white font-bold text-base">1. Information Collection</h4>
                  <p>
                    We collect minimal personal data including name, email address, phone/WhatsApp number, and payment references purely for authenticating your account, delivering verified certificates, and issuing course updates.
                  </p>
                  <h4 className="text-white font-bold text-base">2. No AI Training on User Submissions</h4>
                  <p>
                    We do not sell user data or license prompt creations to third-party model trainers. All exercises and mentor chat interactions are securely isolated within your student workspace.
                  </p>
                </>
              )}

              {legalModalType === 'terms' && (
                <>
                  <p>
                    By enrolling in any program on Unovia AI Academy Pro, you receive lifetime access to video curriculum, practice quizzes, and verifiable digital certificates.
                  </p>
                  <h4 className="text-white font-bold text-base">1. 7-Day Money-Back Guarantee</h4>
                  <p>
                    Every paid course is protected by a 100% unconditional 7-day money-back guarantee. If you are not satisfied with the quality of instruction, request a refund via email at info@unovia.ai.
                  </p>
                  <h4 className="text-white font-bold text-base">2. Certificate Integrity</h4>
                  <p>
                    Certificates are issued with cryptographic verification codes. Plagiarism or fraudulent submission of assignments may result in certificate revocation.
                  </p>
                </>
              )}

              {legalModalType === 'about' && (
                <>
                  <p>
                    <strong>Unovia AI Academy Pro</strong> is India and the world's premier practical AI learning platform. Founded with the mission to democratize Artificial Intelligence education, we equip students, professionals, teachers, and founders with actionable AI capabilities.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-xl font-extrabold text-white">45,000+</div>
                      <div className="text-xs text-slate-400">Certified Students</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-xl font-extrabold text-white">99.4%</div>
                      <div className="text-xs text-slate-400">Satisfaction Score</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={closeLegalModal}
              className="w-full py-3.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm shadow-lg transition-all"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}

      {/* Footer and Mobile Nav */}
      {currentView !== 'player' && <Footer />}
      <MobileBottomNav />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
