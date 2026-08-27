import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LiveEvent } from '../types';
import { EVENTS_DATA } from '../data/eventsData';
import {
  Calendar,
  Clock,
  Users,
  Video,
  Play,
  CheckCircle2,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const EventsView: React.FC = () => {
  const { user, addXp, triggerConfetti } = useApp();
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(['evt-1']);
  const [activeLiveRoomEvent, setActiveLiveRoomEvent] = useState<LiveEvent | null>(null);

  // Live Webinar Room state
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Dr. Aarav Sharma (Instructor)', text: 'Welcome everyone! We will dive straight into LangChain tool routing in 2 minutes.', time: '7:00 PM' },
    { sender: 'Aditya R.', text: 'Super excited for the autonomous agent demo!', time: '7:01 PM' },
    { sender: 'Neha Gupta', text: 'Can we connect local SQLite databases to Gemini agents?', time: '7:02 PM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleRegister = (eventId: string) => {
    if (!registeredEventIds.includes(eventId)) {
      setRegisteredEventIds((prev) => [...prev, eventId]);
      addXp(50, 'Registered for Live AI Masterclass');
      triggerConfetti();
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        sender: user.name,
        text: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Live Cohorts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Live AI Masterclasses & Webinars
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Join live interactive sessions with seasoned AI researchers and industry builders. Ask questions in real time and build practical projects together.
          </p>
        </div>

        {/* Live Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS_DATA.map((event) => {
            const isRegistered = registeredEventIds.includes(event.id);

            return (
              <div
                key={event.id}
                className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 p-6 space-y-5 flex flex-col justify-between transition-all duration-300 shadow-2xl hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      {event.type}
                    </span>
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.registeredCount} Registered</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white">{event.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{event.description}</p>

                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black/30 border border-white/10 text-xs">
                    <div className="flex items-center gap-2 text-slate-200">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>{event.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-200">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>{event.duration}</span>
                    </div>
                  </div>

                  {/* Speaker info */}
                  <div className="flex items-center gap-3 pt-1">
                    <img
                      src={event.speaker.avatar}
                      alt={event.speaker.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-white">{event.speaker.name}</p>
                      <p className="text-[10px] text-slate-400">{event.speaker.role} • {event.speaker.company}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-emerald-400 tracking-wide">
                    FREE MASTERCLASS
                  </span>

                  <div className="flex items-center gap-2">
                    {isRegistered ? (
                      <button
                        onClick={() => setActiveLiveRoomEvent(event)}
                        className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Enter Live Room</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(event.id)}
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs transition-all backdrop-blur-md"
                      >
                        Register Free (+50 XP)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Live Webinar Room Simulation */}
        {activeLiveRoomEvent && (
          <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <div>
                  <h2 className="text-lg font-bold text-white">{activeLiveRoomEvent.title}</h2>
                  <p className="text-xs text-emerald-400">Live with {activeLiveRoomEvent.speaker.name}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveLiveRoomEvent(null)}
                className="text-xs text-slate-300 hover:text-white px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
              >
                Leave Room
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Video Stream */}
              <div className="lg:col-span-8 aspect-video rounded-3xl overflow-hidden bg-black/40 relative border border-white/10 flex items-center justify-center">
                <img
                  src={activeLiveRoomEvent.bannerUrl || "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80"}
                  alt="Live Webinar"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  ● LIVE BROADCAST
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl text-xs text-white border border-white/10">
                  Speaker: {activeLiveRoomEvent.speaker.name} (Sharing Screen: Python Agent Loop)
                </div>
              </div>

              {/* Right Live Chat */}
              <div className="lg:col-span-4 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 p-4 flex flex-col h-[350px] justify-between">
                <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-bold text-slate-200">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Live Attendee Chat (248 online)</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 py-2 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="p-2.5 rounded-2xl bg-white/5 border border-white/5 space-y-0.5 backdrop-blur-md">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-semibold text-emerald-300">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-slate-200">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="flex gap-2 pt-3 border-t border-white/10">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type in live Q&A..."
                    className="flex-1 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none backdrop-blur-md"
                  />
                  <button type="submit" className="p-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
