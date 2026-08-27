import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Lock,
  Tag,
  ArrowRight,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutCourse,
    closeCheckout,
    enrollInCourse,
    currency,
    setCurrency,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!checkoutCourse) return null;

  const basePrice = currency === 'INR' ? checkoutCourse.priceINR : checkoutCourse.priceUSD;
  const originalPrice = currency === 'INR' ? checkoutCourse.originalPriceINR : checkoutCourse.originalPriceUSD;
  const discountAmount = Math.round((basePrice * discountPercent) / 100);
  const finalPrice = basePrice - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'UNOVIA50' || code === 'AI2026' || code === 'PROMO50') {
      setDiscountPercent(50);
    } else if (code === 'UNOVIA20' || code === 'STUDENT') {
      setDiscountPercent(20);
    } else {
      setDiscountPercent(10);
    }
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      enrollInCourse(checkoutCourse.id);

      setTimeout(() => {
        closeCheckout();
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0a0524]/90 backdrop-blur-2xl border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 my-8 animate-in fade-in zoom-in-95">
        <button
          onClick={closeCheckout}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Overlay */}
        {isSuccess ? (
          <div className="text-center py-10 space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">Enrollment Successful! 🎉</h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              You now have full lifetime access to <strong>{checkoutCourse.title}</strong>, including AI notes, prompt templates, and verified certification.
            </p>
            <p className="text-xs text-amber-400 font-bold">+250 XP Awarded to your profile!</p>
          </div>
        ) : (
          <>
            {/* Header & Course Summary */}
            <div className="space-y-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                  Instant Access
                </span>
                <span className="text-xs text-slate-400">Secure 256-bit SSL Checkout</span>
              </div>

              <div className="flex gap-4 items-center">
                <img
                  src={checkoutCourse.thumbnail}
                  alt={checkoutCourse.title}
                  className="w-20 h-14 rounded-2xl object-cover border border-white/10 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1">
                    {checkoutCourse.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Instructor: {checkoutCourse.instructor.name} • {checkoutCourse.lessonsCount} lessons
                  </p>
                </div>
              </div>
            </div>

            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code (e.g. UNOVIA50)"
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white uppercase placeholder-slate-400 focus:border-amber-400/50 backdrop-blur-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-indigo-200 text-xs font-semibold backdrop-blur-md transition-all"
              >
                Apply
              </button>
            </form>

            {discountPercent > 0 && (
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between backdrop-blur-md">
                <span>Coupon Applied!</span>
                <span className="font-bold">{discountPercent}% Discount</span>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Original Price</span>
                <span className="line-through">{currency === 'INR' ? `₹${originalPrice}` : `$${originalPrice}`}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Special Coupon Savings</span>
                  <span>-{currency === 'INR' ? `₹${discountAmount}` : `$${discountAmount}`}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-extrabold text-sm pt-2 border-t border-white/10">
                <span>Total Amount Due</span>
                <span className="text-cyan-300">
                  {currency === 'INR' ? `₹${finalPrice}` : `$${finalPrice}`}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Select Payment Method (India & Global)</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all backdrop-blur-md ${
                    paymentMethod === 'upi'
                      ? 'bg-white text-indigo-700 font-bold border-white shadow-lg'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all backdrop-blur-md ${
                    paymentMethod === 'card'
                      ? 'bg-white text-indigo-700 font-bold border-white shadow-lg'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all backdrop-blur-md ${
                    paymentMethod === 'netbanking'
                      ? 'bg-white text-indigo-700 font-bold border-white shadow-lg'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'upi' && (
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400">Enter UPI ID (Google Pay, PhonePe, Paytm)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@okhdfcbank or 9353649990@paytm"
                  className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 backdrop-blur-md focus:outline-none"
                />
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handleCompletePayment}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-full bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm shadow-xl shadow-black/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    Pay {currency === 'INR' ? `₹${finalPrice}` : `$${finalPrice}`} & Start Learning
                  </span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400">
              Official Unovia AI Academy Pro Guarantee: 100% 7-Day Money-Back Guarantee. No questions asked.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
