import React, { useState } from 'react';
import { Upload, Info, Clock, Mail, Heart, Linkedin } from 'lucide-react';
import { saveSubmission } from '../services/storageService.ts';

const Exhibit: React.FC = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    saveSubmission('PLEDGE', data);
    alert("Thank you for your pledge!");
    
    // Reset form
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-navy-900 mb-4">Class Sponsorship Challenge</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            If you are interested in supporting the event, take the pledge to donate for your class. In order to participate in the Sponsorship Challenge a class needs a minimum of $10K
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Info Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-500" />
                Important Deadlines
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-gold-400 pl-4 py-1">
                  <p className="text-xs uppercase text-slate-400 font-bold tracking-wider">Physical Exhibit</p>
                  <p className="font-semibold text-navy-800">November 1st</p>
                </div>
                <div className="border-l-4 border-navy-600 pl-4 py-1">
                  <p className="text-xs uppercase text-slate-400 font-bold tracking-wider">Digital Repository</p>
                  <p className="font-semibold text-navy-800">November 30th</p>
                </div>
              </div>
            </div>

            <div className="bg-navy-900 p-6 rounded-xl shadow-md text-white">
              <h3 className="font-bold text-gold-400 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Questions?
              </h3>
              <p className="text-sm text-slate-300">
                Contact <a href="https://www.linkedin.com/in/izabella-peralta-491589308" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-2">Izabella Peralta '24 <Linkedin className="w-4 h-4" /></a>
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-gold-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-navy-50 p-3 rounded-full">
                    <Heart className="w-6 h-6 text-navy-800" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-navy-900">Take the pledge</h2>
                    <p className="text-slate-500 text-sm">Support the Class Sponsorship Challenge.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input name="email" required type="email" className="w-full rounded-lg border-slate-300 border px-4 py-2.5 bg-slate-100 focus:bg-white focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Class Year</label>
                  <input name="classYear" required type="text" className="w-full rounded-lg border-slate-300 border px-4 py-2.5 bg-slate-100 focus:bg-white focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="Ex: '82 or '24" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Donation Amount ($)</label>
                  <input name="donationAmount" required type="number" min="1" className="w-full rounded-lg border-slate-300 border px-4 py-2.5 bg-slate-100 focus:bg-white focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="100" />
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-navy-800 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg hover:bg-navy-700 transition-all flex justify-center items-center gap-2">
                        Submit Pledge
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exhibit;