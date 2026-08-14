import React, { useState, useEffect } from 'react';

export default function EventBookingPage() {
  const [pastedLink, setPastedLink] = useState('');
  const [activeEvent, setActiveEvent] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicket, setSuccessTicket] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  // MySQL Database se events load karna (Backend connectivity untouched)
  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllEvents(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching events from backend:', err);
      });
  }, []);

  const handleVerifyLink = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const cleanInputLink = pastedLink.trim().toLowerCase();

    const foundEvent = allEvents.find(
      (ev) => ev.link?.toLowerCase() === cleanInputLink || 
              cleanInputLink.includes(ev.title.toLowerCase().replace(/\s+/g, '-'))
    );

    if (foundEvent) {
      setActiveEvent(foundEvent);
    } else {
      setErrorMsg('Invalid or expired event link! Please verify the link.');
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      setSuccessTicket({
        name: buyerName,
        email: buyerEmail,
        eventTitle: activeEvent.title,
        pricePaid: activeEvent.ticket_price || activeEvent.ticketPrice || 499,
        date: activeEvent.date || "Upcoming Date",
        location: activeEvent.location || "Online / Venue",
        ticketId: 'TICKET-' + Math.floor(100000 + Math.random() * 900000)
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        
        {!activeEvent && !successTicket && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Attendee Portal
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-3 mb-2">Join Event via Link</h2>
            <p className="text-slate-500 text-sm mb-6">
              Paste the shareable link of any event created from the Organizer Dashboard.
            </p>

            <form onSubmit={handleVerifyLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Paste Event Link</label>
                <input
                  type="text"
                  required
                  value={pastedLink}
                  onChange={(e) => setPastedLink(e.target.value)}
                  placeholder="e.g. http://localhost:3000/event/..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm transition"
                />
              </div>

              {errorMsg && (
                <p className="text-red-600 text-xs font-medium bg-red-50 p-3 rounded-xl border border-red-200">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition duration-200"
              >
                Verify & Load Event
              </button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="font-bold text-slate-700 text-xs mb-2">🔗 Active Event Links from MySQL:</p>
              <div className="space-y-1.5">
                {allEvents.map((ev) => (
                  <div key={ev.id || ev.title} className="text-xs">
                    <span className="font-semibold text-slate-800">{ev.title}:</span>
                    <span 
                      onClick={() => setPastedLink(ev.link)} 
                      className="text-indigo-600 hover:underline cursor-pointer block truncate font-mono"
                    >
                      {ev.link}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeEvent && !successTicket && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white flex justify-between items-start">
              <div>
                <span className="bg-white/25 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Verified Event
                </span>
                <h1 className="text-3xl font-extrabold mt-3">{activeEvent.title}</h1>
                <p className="text-indigo-100 mt-1 text-xs font-medium">{activeEvent.date || "Scheduled Soon"} • {activeEvent.location || "Main Arena"}</p>
              </div>
              <button 
                onClick={() => setActiveEvent(null)}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl text-white transition"
              >
                Change Link
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-slate-700 font-bold text-sm mb-2">About Event</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{activeEvent.description || "No description provided."}</p>
              </div>

              <div className="flex justify-between items-center bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Fixed Ticket Price</p>
                  <p className="text-2xl font-black text-indigo-600">₹{activeEvent.ticket_price || activeEvent.ticketPrice || 499}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-medium">Availability</p>
                  <p className="text-sm font-bold text-emerald-600">
                    {(activeEvent.total_tickets || activeEvent.totalTickets || 100) - (activeEvent.ticketsSold || 0)} Tickets Left
                  </p>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition duration-200 disabled:bg-slate-400 text-sm"
                >
                  {isSubmitting ? 'Processing Payment...' : `Pay ₹{activeEvent.ticket_price || activeEvent.ticketPrice || 499} & Book Ticket`}
                </button>
              </form>
            </div>
          </div>
        )}

        {successTicket && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4 shadow-inner">
              ✓
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">Ticket Booked Successfully!</h2>
            <p className="text-slate-500 text-sm mb-6">Payment of <b className="text-slate-800">₹{successTicket.pricePaid}</b> received successfully.</p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-3 mb-6">
              <div className="flex justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
                <span>Ticket ID:</span>
                <span className="font-mono font-bold text-slate-800">{successTicket.ticketId}</span>
              </div>
              <div>
                <p className="text-xs text-slate-500">Event</p>
                <p className="font-bold text-slate-800 text-base">{successTicket.eventTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-slate-500">Attendee Name</p>
                  <p className="font-bold text-slate-800 text-sm">{successTicket.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date & Location</p>
                  <p className="font-bold text-slate-800 text-sm">{successTicket.date}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setSuccessTicket(null); setActiveEvent(null); setPastedLink(''); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition text-sm"
            >
              Book Another Ticket
            </button>
          </div>
        )}

      </div>
    </div>
  );
}