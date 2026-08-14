import React, { useState } from 'react';
import OrganizerDashboard from './components/OrganizerDashboard';
import EventBookingPage from './components/EventBookingPage';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  
  // Login Modal State (Frontend only, as requested)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if(loginName.trim()) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 flex flex-col justify-between font-sans">
      
      {/* Navigation Header - Height Reduced for Mobile & Desktop */}
      <nav className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white px-4 sm:px-8 py-2.5 shadow-xl flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => setCurrentView('home')}>
          <span className="text-xl p-1.5 bg-white/10 rounded-lg group-hover:scale-110 transition duration-300 shadow-inner">🎟️</span>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-wide bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
              NG
            </h1>
            <p className="hidden sm:block text-[9px] text-indigo-300 tracking-wider uppercase font-medium">Smart Ticketing Ecosystem</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {currentView !== 'home' ? (
            <button
              onClick={() => setCurrentView('home')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 transition shadow-sm flex items-center space-x-1.5"
            >
              <span>←</span>
              <span>Back</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center space-x-2 text-xs text-indigo-200 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>MySQL Connected System</span>
            </div>
          )}

          {/* Login / User Info Button */}
          {isLoggedIn ? (
            <div className="bg-indigo-700/60 border border-indigo-400/30 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center space-x-2 shadow-inner">
              <span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center font-bold text-[10px]">
                {loginName.charAt(0).toUpperCase()}
              </span>
              <span>Hi, {loginName}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-indigo-500/25 transition duration-300 transform hover:-translate-y-0.5"
            >
              🔐 Login / Portal Info
            </button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 transform transition-all">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-xl mb-3 shadow-sm">
                👤
              </div>
              <h3 className="text-xl font-bold text-slate-900">User Session Setup</h3>
              <p className="text-slate-500 text-xs mt-1">Enter your details for customized navigation</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="e.g. Monika Rajput"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm transition"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="w-1/2 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs shadow-lg shadow-indigo-600/30 transition"
                >
                  Save Info
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                Welcome Dashboard
              </span>
              <h2 className="text-4xl font-black text-slate-900 mt-4 tracking-tight">Event Ticket Management System</h2>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Choose your designated workspace below. Create and manage professional events or securely book tickets via shared custom links.
              </p>
            </div>

            {/* Two Separate Side-by-Side Modern Containers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Container 1: Organizer Management */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl hover:border-indigo-200 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -z-0 group-hover:bg-indigo-100 transition duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition duration-300">
                    🛠️
                  </div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">For Event Creators</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">Create & Manage Events</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Setup new events with customized pricing, capacities, and real-time database persistence. Generate unique links instantly.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentView('organizer')}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-600/20 transition duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Open Organizer Dashboard</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Container 2: Attendee Booking */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl hover:border-purple-200 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -z-0 group-hover:bg-purple-100 transition duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-slate-900/30 group-hover:scale-110 transition duration-300">
                    🔗
                  </div>
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">For Attendees</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">Join & Book via Link</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Paste an active event shareable link, check real-time ticket availability, and complete fast secure bookings seamlessly.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentView('booking')}
                    className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-slate-900/20 transition duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Open Booking Portal</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {currentView === 'organizer' && <OrganizerDashboard />}
        {currentView === 'booking' && <EventBookingPage />}
      </main>

      {/* Footer with Custom Information */}
      <footer className="bg-white border-t border-slate-200 py-6 px-8 text-center text-xs text-slate-500 shadow-inner mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-semibold text-slate-700">EventPulse Ticketing Ecosystem &copy; 2026</p>
            <p className="text-slate-400 text-[11px] mt-0.5">Powered by React, Tailwind CSS & MySQL Database Backend</p>
          </div>
          <div className="flex items-center space-x-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span className="font-medium text-slate-600">Developer / Manager Info:</span>
            <span className="text-indigo-600 font-bold">Monika Rajput</span>
          </div>
        </div>
      </footer>

    </div>
  );
}