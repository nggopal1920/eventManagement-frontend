import React, { useState, useEffect } from 'react';

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [totalTickets, setTotalTickets] = useState('');
  const [price, setPrice] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      if (Array.isArray(data)) {
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events from MySQL:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const newEventData = {
      title,
      description: description || "Exciting event organized via dashboard.",
      date: date || "30th Sep 2026",
      location: location || "Main Auditorium",
      ticketPrice: Number(price),
      totalTickets: Number(totalTickets),
      link: `http://localhost:3000/event/${slug}`
    };

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEventData)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Event successfully saved in MySQL!");
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
        setTotalTickets('');
        setPrice('');
        setShowModal(false);
        fetchEvents();
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error('Server error:', err);
      alert("Backend is not connected.");
    }
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard: " + link);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <div>
          <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Organizer Portal
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Dashboard (MySQL Connected)</h1>
          <p className="text-xs text-slate-500 mt-0.5">Create events and store them directly in your MySQL database</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition duration-300 text-sm flex items-center space-x-2"
        >
          <span>+ Create New Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div key={ev.id || ev.title} className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition duration-300">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-800">{ev.title}</h3>
                <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-xl">₹{ev.ticket_price || ev.ticketPrice}</span>
              </div>
              <p className="text-xs text-slate-400 mb-4 line-clamp-1">{ev.description || "No description provided."}</p>
              
              <div className="grid grid-cols-3 text-center text-xs text-slate-600 my-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Total</p>
                  <p className="font-bold text-slate-800 mt-0.5">{ev.total_tickets || ev.totalTickets}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Sold</p>
                  <p className="font-bold text-indigo-600 mt-0.5">{ev.ticketsSold || 0}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Left</p>
                  <p className="font-bold text-emerald-600 mt-0.5">{(ev.total_tickets || ev.totalTickets) - (ev.ticketsSold || 0)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 border-t border-slate-100 pt-4 mt-2">
              <input
                type="text"
                readOnly
                value={ev.link}
                className="text-xs text-slate-500 bg-slate-50 px-3 py-2.5 rounded-xl w-3/4 truncate border border-slate-200 font-mono"
              />
              <button
                onClick={() => copyToClipboard(ev.link)}
                className="w-1/4 bg-slate-900 hover:bg-black text-white text-xs py-2.5 rounded-xl font-bold shadow transition"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <h2 className="text-xl font-black text-slate-900 mb-4">Create New Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Code Camp 2026"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Ticket Limit (Capacity)</label>
                <input
                  type="number"
                  required
                  value={totalTickets}
                  onChange={(e) => setTotalTickets(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Ticket Price (₹)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 199"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none text-sm"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 transition"
                >
                  Save to MySQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
