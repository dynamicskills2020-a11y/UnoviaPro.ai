import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Certificate } from '../types';
import QRCode from 'qrcode';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  Search,
  Printer,
  Sparkles,
  ShieldCheck,
  Globe,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const CertificateView: React.FC = () => {
  const { certificates, user } = useApp();
  const [selectedCert, setSelectedCert] = useState<Certificate>(certificates[0]);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [verifyCodeInput, setVerifyCodeInput] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<{
    status: 'idle' | 'valid' | 'invalid';
    cert?: Certificate;
  }>({ status: 'idle' });

  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCert) {
      const verifyUrl = `https://www.unovia.ai/verify/${selectedCert.verificationCode}`;
      QRCode.toDataURL(verifyUrl, {
        width: 120,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch(() => {});
    }
  }, [selectedCert]);

  const handleVerifyLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const found = certificates.find(
      (c) => c.verificationCode.toLowerCase() === verifyCodeInput.trim().toLowerCase()
    );

    if (found) {
      setVerificationStatus({ status: 'valid', cert: found });
    } else {
      setVerificationStatus({ status: 'invalid' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `Excited to have earned my verified AI Certification in "${selectedCert.courseTitle}" from Unovia AI Academy Pro! Verification Code: ${selectedCert.verificationCode} #ArtificialIntelligence #UnoviaAI`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://www.unovia.ai&summary=${text}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out my verified Certificate in "${selectedCert.courseTitle}" from Unovia AI Academy Pro! Code: ${selectedCert.verificationCode} (Contact: +91-8074933077)`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Globally Verifiable Credentials</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Official Certificates of Completion
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Each Unovia certificate features cryptographic verification, unique ID QR authentication, and ISO-compliant learning track accreditation.
            </p>
          </div>

          {/* Certificate Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {certificates.map((cert) => (
              <button
                key={cert.id}
                onClick={() => {
                  setSelectedCert(cert);
                  setVerificationStatus({ status: 'idle' });
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 backdrop-blur-md ${
                  selectedCert.id === cert.id
                    ? 'bg-white text-emerald-800 font-bold shadow-lg shadow-black/20'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{cert.courseTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Display Canvas */}
        <div className="flex flex-col items-center space-y-6">
          <div
            ref={certRef}
            id="official-certificate-canvas"
            className="w-full max-w-4xl aspect-[1.414/1] bg-white/5 backdrop-blur-2xl border-[8px] border-double border-amber-400/50 rounded-3xl p-6 sm:p-12 relative shadow-2xl overflow-hidden flex flex-col justify-between text-slate-100 print:bg-white print:text-black print:border-black"
          >
            {/* Background Guilloche Watermark */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950/80 to-[#05011a] pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            {/* Certificate Header */}
            <div className="relative z-10 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-indigo-600 p-0.5 shadow-lg">
                  <div className="w-full h-full bg-[#0d0728] rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white uppercase">
                  Unovia AI Academy Pro
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Certificate of Mastery & Completion
              </p>
            </div>

            {/* Main Recipient Body */}
            <div className="relative z-10 text-center space-y-3 sm:space-y-4 my-auto">
              <p className="text-xs sm:text-sm text-slate-300 italic">
                This is to officially certify that
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300 tracking-tight font-serif">
                {selectedCert.studentName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                has successfully fulfilled all curriculum requirements, hands-on assignments, and final assessments for the specialized course:
              </p>
              <h3 className="text-lg sm:text-2xl font-black text-cyan-300 uppercase tracking-wide">
                {selectedCert.courseTitle}
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {selectedCert.skillsLearned.map((s, i) => (
                  <span
                    key={i}
                    className="text-[9px] sm:text-[10px] px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-slate-200"
                  >
                    • {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Certificate Footer with Signatures & QR */}
            <div className="relative z-10 pt-4 border-t border-amber-400/30 flex items-end justify-between gap-4 text-xs">
              {/* Instructor Signature */}
              <div className="text-left space-y-1">
                <div className="h-8 font-serif italic text-base text-amber-300 font-bold">
                  {selectedCert.instructorName}
                </div>
                <div className="w-32 sm:w-44 h-px bg-white/20" />
                <p className="font-bold text-white text-[11px] sm:text-xs">Lead Instructor</p>
                <p className="text-[9px] text-slate-300">Unovia AI Curriculum Board</p>
              </div>

              {/* Official Gold Seal Stamp */}
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-400/80 p-1 flex items-center justify-center bg-amber-500/10 shadow-lg shadow-amber-500/20">
                  <div className="w-full h-full rounded-full bg-[#0d0728] border border-amber-400 flex flex-col items-center justify-center text-[7px] font-bold text-amber-300 uppercase leading-none">
                    <span>★ VERIFIED ★</span>
                    <span className="text-[9px] my-0.5">UNOVIA</span>
                    <span>AI ACADEMY</span>
                  </div>
                </div>
                <span className="text-[8px] text-slate-300 mt-1">Score: {selectedCert.gradeScore}%</span>
              </div>

              {/* QR Verification & Code */}
              <div className="text-right flex items-center gap-3">
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-400 uppercase font-semibold">Verification ID</p>
                  <p className="font-mono text-[10px] sm:text-xs font-bold text-amber-400">
                    {selectedCert.verificationCode}
                  </p>
                  <p className="text-[9px] text-slate-400">{selectedCert.issueDate}</p>
                </div>

                {qrCodeDataUrl && (
                  <img
                    src={qrCodeDataUrl}
                    alt="Certificate QR Verification"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1 shadow-md"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs flex items-center gap-2 shadow-md backdrop-blur-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleShareLinkedIn}
              className="px-5 py-2.5 rounded-full bg-[#0a66c2]/80 hover:bg-[#0a66c2] text-white font-semibold text-xs flex items-center gap-2 shadow-md backdrop-blur-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on LinkedIn</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-5 py-2.5 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md backdrop-blur-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Live Certificate Verification Box */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl max-w-3xl mx-auto">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Live Certificate Authenticity Checker</span>
            </h3>
            <p className="text-xs text-slate-300">
              Employers and recruiters can enter any Unovia Certificate ID to verify issue date, student identity, and course legitimacy.
            </p>
          </div>

          <form onSubmit={handleVerifyLookup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={verifyCodeInput}
              onChange={(e) => setVerifyCodeInput(e.target.value)}
              placeholder="e.g. UNOVIA-2026-AI-89421"
              className="flex-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-400 text-xs sm:text-sm text-slate-100 font-mono backdrop-blur-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Verify ID</span>
            </button>
          </form>

          {verificationStatus.status === 'valid' && verificationStatus.cert && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 space-y-2 text-xs backdrop-blur-md">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Authentic Credential</span>
              </div>
              <p className="text-slate-200">
                Student: <strong>{verificationStatus.cert.studentName}</strong> • Course: <strong>{verificationStatus.cert.courseTitle}</strong> • Issued: {verificationStatus.cert.issueDate}
              </p>
            </div>
          )}

          {verificationStatus.status === 'invalid' && (
            <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 backdrop-blur-md">
              ❌ No verified record matching this certificate ID was found in the official registry. Please double check the ID.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
