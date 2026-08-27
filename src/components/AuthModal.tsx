import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  KeyRound,
  GraduationCap,
  Briefcase,
  ShieldAlert,
} from 'lucide-react';

type AuthTab = 'signin' | 'signup' | 'otp' | 'forgot';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginUser } = useApp();
  const [tab, setTab] = useState<AuthTab>('signin');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 9353649990');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor' | 'admin'>('student');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // OTP Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOtpSent, otpCountdown]);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      loginUser({
        name: 'Ram Sharma',
        email: 'dynamicskills2020@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: selectedRole,
      });
      setIsLoading(false);
    }, 600);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || (!password && tab !== 'forgot')) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsLoading(true);

    if (tab === 'forgot') {
      setTimeout(() => {
        setIsLoading(false);
        setResetEmailSent(true);
      }, 700);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      const userName = name.trim() || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Learner');
      loginUser({
        name: userName,
        email: email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userName)}`,
        role: selectedRole,
      });
    }, 600);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) {
      setErrorMsg('Please enter a valid mobile number.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setOtpCountdown(45);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length < 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser({
        name: 'Mobile Learner',
        phone: phone,
        email: 'learner.mobile@unovia.ai',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: selectedRole,
      });
    }, 700);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090325]/90 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 text-white overflow-hidden">
        {/* Glow ambient background effect */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Unovia AI Academy Pro</h3>
              <p className="text-xs text-slate-300">Learn AI. Build Skills. Create Opportunities.</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 p-1 rounded-2xl bg-white/5 border border-white/10 relative z-10">
          <button
            onClick={() => {
              setTab('signin');
              setErrorMsg('');
              setResetEmailSent(false);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'signin'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab('signup');
              setErrorMsg('');
              setResetEmailSent(false);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'signup'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => {
              setTab('otp');
              setErrorMsg('');
              setResetEmailSent(false);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'otp'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mobile OTP
          </button>
        </div>

        {/* Error notification banner */}
        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Google 1-Click Button */}
        {tab !== 'forgot' && (
          <div className="space-y-4 relative z-10">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-3 shadow-lg transition-all backdrop-blur-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex-1 h-px bg-white/10" />
              <span>or continue with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </div>
        )}

        {/* TAB 1 & 2: Email Sign In / Sign Up */}
        {(tab === 'signin' || tab === 'signup') && (
          <form onSubmit={handleEmailAuth} className="space-y-4 relative z-10">
            {tab === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ram Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400 backdrop-blur-md"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400 backdrop-blur-md"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                {tab === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setTab('forgot');
                      setErrorMsg('');
                    }}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400 backdrop-blur-md"
                />
              </div>
            </div>

            {/* Role Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Account Role</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    selectedRole === 'student'
                      ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
                  <div className="text-[11px] font-bold">Student</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('instructor')}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    selectedRole === 'instructor'
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                  <div className="text-[11px] font-bold">Instructor</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    selectedRole === 'admin'
                      ? 'bg-rose-600/30 border-rose-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 mx-auto mb-1 text-rose-400" />
                  <div className="text-[11px] font-bold">Admin</div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
            >
              <span>{isLoading ? 'Authenticating...' : tab === 'signin' ? 'Sign In to Academy' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 3: Mobile OTP Login */}
        {tab === 'otp' && (
          <div className="space-y-4 relative z-10">
            {!isOtpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Enter Mobile Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9353649990"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400 backdrop-blur-md font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    We will send a 6-digit verification code via SMS / WhatsApp OTP.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <span>{isLoading ? 'Sending Code...' : 'Send 6-Digit OTP Code'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>OTP Sent to {phone}</span>
                  </div>
                  <p className="text-xs text-slate-300">Enter the 6-digit code received on your phone</p>
                </div>

                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-bold rounded-2xl bg-white/10 border border-white/20 text-white focus:border-indigo-400 focus:outline-none backdrop-blur-md"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="hover:text-white underline"
                  >
                    Change Number
                  </button>
                  {otpCountdown > 0 ? (
                    <span>Resend in {otpCountdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOtpSent(true);
                        setOtpCountdown(45);
                      }}
                      className="text-indigo-400 hover:text-indigo-300 font-bold"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
                >
                  <span>{isLoading ? 'Verifying...' : 'Verify OTP & Enter Academy'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: Forgot Password */}
        {tab === 'forgot' && (
          <div className="space-y-4 relative z-10">
            {resetEmailSent ? (
              <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Password Reset Link Sent</h4>
                <p className="text-xs text-slate-300">
                  We sent instructions to <strong>{email}</strong>. Check your inbox and follow the secure link to create a new password.
                </p>
                <button
                  onClick={() => setTab('signin')}
                  className="px-6 py-2.5 rounded-full bg-white text-indigo-700 font-bold text-xs"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">Reset Your Password</h4>
                  <p className="text-xs text-slate-300">
                    Enter your registered email address and we will dispatch a secure reset link.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400 backdrop-blur-md"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTab('signin')}
                    className="flex-1 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-white transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/25 transition-all"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{isLoading ? 'Dispatching...' : 'Send Reset Link'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Security badge footer */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Sessions</span>
          </div>
          <span>Unovia AI v2.5 Pro</span>
        </div>
      </div>
    </div>
  );
};
