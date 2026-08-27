import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  MessageCircle,
  Globe,
  Award,
  Flame,
  Shield,
  Save,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const { user, updateUserProfile, currentLanguage, setCurrentLanguage, certificates, badges } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Student Account & Preferences</h1>
          <p className="text-xs text-slate-300">
            Manage your personal learning credentials, verified certification identity, and language settings.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/10">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white/20 shadow-xl"
            />
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white border border-white/20 backdrop-blur-md uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-300">{user.email}</p>
              <p className="text-xs text-amber-400 font-semibold pt-1">
                Level {user.level}: {user.levelTitle} • {user.xp} XP Points
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Full Name (On Certificates)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white backdrop-blur-md focus:border-amber-400/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white backdrop-blur-md focus:border-amber-400/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Preferred Language</label>
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as any)}
                className="w-full p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-white backdrop-blur-md focus:border-amber-400/50 focus:outline-none"
              >
                <option value="en">English (Global)</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </span>
              )}

              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs shadow-lg shadow-black/20 ml-auto flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Official Academy Support & Contact Information */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-4 shadow-2xl">
          <h3 className="text-lg font-bold text-white">Unovia AI Academy Pro Support</h3>
          <p className="text-xs text-slate-300">
            Have questions about course access, enterprise licensing, or certificate verification? Reach out directly:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <a
              href="mailto:info@unovia.ai"
              className="p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-white/25 space-y-1 block transition-all"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <p className="font-bold text-white">Email Us</p>
              <p className="text-slate-400 text-[11px]">info@unovia.ai</p>
            </a>

            <a
              href="tel:+919353649990"
              className="p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-white/25 space-y-1 block transition-all"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <p className="font-bold text-white">Direct Phone</p>
              <p className="text-slate-400 text-[11px]">+91-9353649990</p>
            </a>

            <a
              href="https://wa.me/918074933077"
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 space-y-1 block transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <p className="font-bold text-white">Official WhatsApp</p>
              <p className="text-slate-400 text-[11px]">+91-8074933077</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
