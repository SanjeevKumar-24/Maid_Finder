"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [bookingModal, setBookingModal] = useState(null);
  
  // Initialize as an empty array and add a loading state
  const [helpers, setHelpers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Express backend on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/helpers")
      .then((res) => res.json())
      .then((data) => {
        setHelpers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching helpers:", err);
        setIsLoading(false);
      });
  }, []);

  const roles = ["All", "Maid", "Cook", "Cleaner", "Nanny"];
  const filteredHelpers = helpers.filter((helper) => {
    const matchesSearch = helper.name?.toLowerCase().includes(searchQuery.toLowerCase()) || helper.role?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "All" || helper.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-gray-900">
      <header className="mb-10 text-center max-w-2xl mx-auto mt-4 sm:mt-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">Find Trusted Household Help</h1>
        <p className="text-gray-400 text-base sm:text-lg">Browse verified profiles and book flexible service plans instantly.</p>
      </header>

      <section className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
        <input
          type="text"
          placeholder="Search by name or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 bg-gray-900 text-gray-100 border border-gray-600 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <div className="w-full sm:w-auto flex items-center gap-3">
          <span className="text-gray-400 font-medium">Filter by:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-gray-900 text-gray-100 border border-gray-600 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          >
            {roles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
      </section>

      {/* Loading State or Data Grid */}
      {isLoading ? (
        <div className="text-center text-gray-400 py-12 text-xl font-medium">Loading helper profiles...</div>
      ) : (
        <section className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHelpers.length > 0 ? (
            filteredHelpers.map((helper) => (
              <div key={helper._id} className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-blue-900/20 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">{helper.name}</h2>
                      {helper.isVerified && <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 mt-2 inline-block">Verified</span>}
                    </div>
                    <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full tracking-wide uppercase">{helper.role}</span>
                  </div>
                  <div className="space-y-3 text-sm text-gray-300 mb-6 border-t border-gray-700/50 pt-4">
                    <div className="flex justify-between items-center"><span className="text-gray-400">Hourly Plan</span><span className="font-semibold text-gray-100 text-lg">₹{helper.hourlyRate}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-400">Monthly Plan</span><span className="font-semibold text-gray-100 text-lg">₹{helper.monthlyRate}</span></div>
                  </div>
                </div>
                <button onClick={() => setBookingModal(helper)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-900/50 mt-auto">
                  Book {helper.role}
                </button>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center text-gray-400 py-12 text-lg">No helpers currently available in the database.</div>
          )}
        </section>
      )}

      {bookingModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Book {bookingModal.name}</h3>
            <p className="text-gray-400 mb-6">Select your preferred service plan below.</p>
            <div className="space-y-3 mb-6">
              <button className="w-full p-4 rounded-xl border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-left flex justify-between items-center">
                <span className="font-medium text-gray-200">Hourly Plan</span>
                <span className="text-blue-400 font-bold">₹{bookingModal.hourlyRate}</span>
              </button>
              <button className="w-full p-4 rounded-xl border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-left flex justify-between items-center">
                <span className="font-medium text-gray-200">Monthly Plan</span>
                <span className="text-blue-400 font-bold">₹{bookingModal.monthlyRate}</span>
              </button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setBookingModal(null)} className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-300 bg-gray-700 hover:bg-gray-600 transition-all">Cancel</button>
              <button className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/50 transition-all">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}