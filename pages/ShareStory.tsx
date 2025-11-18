import React, { useState } from 'react';
import { PenTool, Megaphone, Heart, Send } from 'lucide-react';
import { saveSubmission } from '../services/storageService.ts';

enum Tab {
  NOMINATE = 'NOMINATE',
  SHOUTOUT = 'SHOUTOUT',
  HELLO = 'HELLO'
}

const ShareStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.NOMINATE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      
      saveSubmission(activeTab, data);
      alert("Submission received! Thank you for sharing.");
      e.currentTarget.reset();
  };

  const renderForm = () => {
    switch (activeTab) {
      case Tab.NOMINATE:
        return (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <p className="text-blue-800 text-sm">
                We are looking for inspiring, in-depth stories. Nominate a trailblazer (or yourself!) to be featured in a spotlight article.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="email" required type="email" placeholder="Your Email" className="input-field" />
              <input name="nomineeName" required type="text" placeholder="Name of Nominee" className="input-field" />
              <input name="company" type="text" placeholder="Company Name" className="input-field" />
              <input name="background" type="text" placeholder="Major / Sports / ECAs" className="input-field" />
            </div>
            <input name="service" type="text" placeholder="USNA Billets / Service Selection" className="input-field" />
            <textarea name="reason" required rows={4} placeholder="Reason for Nomination (The Story)" className="input-field" />
             <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-slate-700">Upload Pictures/Video</label>
                <input name="file" type="file" className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy-50 file:text-navy-700 hover:file:bg-navy-100"/>
             </div>
            <button type="submit" className="btn-primary w-full">Submit Nomination</button>
          </form>
        );
      case Tab.SHOUTOUT:
        return (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
             <div className="bg-gold-50 p-4 rounded-lg border border-gold-100 mb-6">
              <p className="text-navy-800 text-sm">
                "BZ" (Bravo Zulu) means "Well Done". Give a public congratulations to a classmate or fellow alumna!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="yourName" required type="text" placeholder="Your Name" className="input-field" />
              <input name="yourEmail" required type="email" placeholder="Your Email" className="input-field" />
            </div>
            <input name="recipient" required type="text" placeholder="Recipient's Name and Class Year" className="input-field" />
            <textarea name="message" required rows={3} placeholder="Your Shoutout Message" className="input-field" />
            <button type="submit" className="btn-primary w-full">Submit BZ Shoutout</button>
          </form>
        );
      case Tab.HELLO:
        return (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
             <div className="bg-pink-50 p-4 rounded-lg border border-pink-100 mb-6">
              <p className="text-pink-900 text-sm">
                Send messages of love and support to midshipmen and alumnae serving around the globe.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="yourName" required type="text" placeholder="Your Name" className="input-field" />
              <input name="relationship" required type="text" placeholder="Relationship to Recipient" className="input-field" />
            </div>
            <input name="recipient" required type="text" placeholder="Recipient's Full Name" className="input-field" />
            <textarea name="message" required rows={3} placeholder="Your Message" className="input-field" />
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12">
        <style>{`
            .input-field {
                width: 100%;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                border: 1px solid #e2e8f0;
                outline: none;
                transition: all 0.2s;
            }
            .input-field:focus {
                border-color: #C5B358;
                box-shadow: 0 0 0 2px rgba(197, 179, 88, 0.2);
            }
            .btn-primary {
                background-color: #0A1F40;
                color: white;
                font-weight: bold;
                padding: 0.75rem;
                border-radius: 0.5rem;
                transition: background-color 0.2s;
                cursor: pointer;
            }
            .btn-primary:hover {
                background-color: #1a365d;
            }
        `}</style>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-navy-900 mb-4">Share Your Story</h1>
          <p className="text-slate-600">Contribute to the celebration by sharing nominations, shoutouts, and messages from home.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-col md:flex-row border-b border-slate-200">
            <button 
                onClick={() => setActiveTab(Tab.NOMINATE)}
                className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeTab === Tab.NOMINATE ? 'text-navy-900 border-b-4 border-navy-900 bg-slate-50' : 'text-slate-500'}`}
            >
                <PenTool className="w-5 h-5" />
                Article Nomination
            </button>
            <button 
                onClick={() => setActiveTab(Tab.SHOUTOUT)}
                className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeTab === Tab.SHOUTOUT ? 'text-gold-600 border-b-4 border-gold-500 bg-slate-50' : 'text-slate-500'}`}
            >
                <Megaphone className="w-5 h-5" />
                BZ Shoutout
            </button>
            <button 
                onClick={() => setActiveTab(Tab.HELLO)}
                className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeTab === Tab.HELLO ? 'text-pink-600 border-b-4 border-pink-500 bg-slate-50' : 'text-slate-500'}`}
            >
                <Heart className="w-5 h-5" />
                Hometown Hello
            </button>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareStory;