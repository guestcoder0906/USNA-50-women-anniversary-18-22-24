import React, { useState } from 'react';
import { Calendar, MapPin, Users, User, Heart, Award, ArrowRight, PenTool, Clock, Mail, Megaphone } from 'lucide-react';
import { ScheduleItem, PageView } from '../types.ts';
import { saveSubmission } from '../services/storageService.ts';


// --- Enums for consolidated forms ---
enum ShareStoryTab {
  NOMINATE = 'NOMINATE',
  SHOUTOUT = 'SHOUTOUT',
  HELLO = 'HELLO'
}

interface HomeProps {
  onNavigate: (view: PageView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  // State for Share Story Form
  const [activeShareTab, setActiveShareTab] = useState<ShareStoryTab>(ShareStoryTab.NOMINATE);
  const [nominationFileName, setNominationFileName] = useState<string | null>(null);
  const [nominationFileBase64, setNominationFileBase64] = useState<string | null>(null);


  const schedule: ScheduleItem[] = [
    {
      day: "Thursday",
      date: "April 16th",
      events: ["Golf Outing (Brigade Sports Complex)", "Welcoming Reception (FAC)"]
    },
    {
      day: "Friday",
      date: "April 17th",
      events: ["Day 1 Conference (NMCMS)", "50th Anniversary Gala (FAC)"]
    },
    {
      day: "Saturday",
      date: "April 18th",
      events: ["Day 2 Conference (NMCMS)"]
    },
    {
      day: "Sunday",
      date: "April 19th",
      events: ["First Class Welcome (Welcoming Class of 2026) (FAC)"]
    }
  ];

  // --- Form Handlers ---
  const handlePledgeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    saveSubmission('PLEDGE', data);
    alert("Thank you for your pledge!");
    
    e.currentTarget.reset();
  };

  const handleNominationFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNominationFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNominationFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleShareStorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      
      if (activeShareTab === ShareStoryTab.NOMINATE) {
        delete data.file; // Remove original file object
        if (nominationFileName) {
          data.fileName = nominationFileName;
        }
        if (nominationFileBase64) {
          data.imageBase64 = nominationFileBase64;
        }
      }

      saveSubmission(activeShareTab, data);
      alert("Submission received! Thank you for sharing.");
      e.currentTarget.reset();

      setNominationFileName(null);
      setNominationFileBase64(null);
  };


  const renderShareStoryForm = () => {
    switch (activeShareTab) {
      case ShareStoryTab.NOMINATE:
        return (
          <form onSubmit={handleShareStorySubmit} className="space-y-6 animate-fadeIn">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <p className="text-blue-800 text-sm">
                We are looking for inspiring, in-depth stories. Nominate a trailblazer (or yourself!) to be featured in a spotlight article.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="email" required type="email" placeholder="Your Email" className="input-field" />
              <input name="nomineeName" required type="text" placeholder="Name of Nominee" className="input-field" />
              <input name="major" type="text" placeholder="Major" className="input-field" />
              <input name="sportsEcas" type="text" placeholder="Sports / ECAs" className="input-field" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="usnaBillets" type="text" placeholder="USNA Billets" className="input-field" />
              <input name="serviceSelection" type="text" placeholder="Service Selection" className="input-field" />
            </div>
            <textarea name="reason" required rows={4} placeholder="Reason for Nomination (The Story)" className="input-field" />
             <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-slate-700">Upload Pictures/Video</label>
                <input name="file" type="file" onChange={handleNominationFileChange} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy-50 file:text-navy-700 hover:file:bg-navy-100"/>
                {nominationFileName && <p className="text-xs font-semibold text-green-600">Selected: {nominationFileName}</p>}
             </div>
            <button type="submit" className="btn-primary w-full">Submit Nomination</button>
          </form>
        );
      case ShareStoryTab.SHOUTOUT:
        return (
          <form onSubmit={handleShareStorySubmit} className="space-y-6 animate-fadeIn">
             <div className="bg-gold-50 p-4 rounded-lg border border-gold-100 mb-6">
              <p className="text-navy-800 text-sm">
                "BZ" (Bravo Zulu) means "Well Done". Give a public congratulations to a classmate or fellow alumna!
              </p>
            </div>
            <input name="recipient" required type="text" placeholder="Recipient's Initials and Class Year (Ex: IP '24)" className="input-field" />
            <textarea name="message" required rows={3} placeholder="Your Shoutout Message" className="input-field" />
            <button type="submit" className="btn-primary w-full">Submit BZ Shoutout</button>
          </form>
        );
      case ShareStoryTab.HELLO:
        return (
          <form onSubmit={handleShareStorySubmit} className="space-y-6 animate-fadeIn">
             <div className="bg-pink-50 p-4 rounded-lg border border-pink-100 mb-6">
              <p className="text-pink-900 text-sm">
                Send messages of love and support to midshipmen and alumnae serving around the globe.
              </p>
            </div>
            <input name="initials" required type="text" placeholder="Recipient Initials and Class Year (Ex: IP '24)" className="input-field" />
            <textarea name="message" required rows={3} placeholder="Your Message" className="input-field" />
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        );
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
       <style>{`
            .input-field {
                width: 100%;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                background-color: #f1f5f9;
                border: 1px solid #e2e8f0;
                outline: none;
                transition: all 0.2s;
            }
            .input-field:focus {
                background-color: #ffffff;
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
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             {/* Placeholder for a background image of the academy or abstract navy theme */}
            <img src="everything.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-gold-500 text-gold-400 text-sm font-semibold uppercase tracking-widest bg-navy-900/50 backdrop-blur-sm">
                1976 - 2026
            </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 leading-tight">
            Breaking Barriers <span className="text-gold-500 italic">&</span> Building Bonds
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 font-light">
            Annual Gathering to Celebrate 50 Years of Women at the US Naval Academy.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
              <Calendar className="w-5 h-5 text-gold-400" />
              <span>April 16-19, 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span>Annapolis, MD (FAC & NMCMS)</span>
            </div>
          </div>

          <div className="mt-12">
            <button 
                onClick={() => onNavigate(PageView.REGISTER)}
                className="bg-gold-500 text-navy-900 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gold-400 transition-all transform hover:-translate-y-1 hover:shadow-gold-500/20"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-navy-800 mb-6">Welcome Home</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Join us for a historic weekend celebrating five decades of excellence. The weekend will feature USNA Women artists, authors, and entrepreneurs; inspiring speakers and panelists; valuable networking opportunities; and celebrations that honor our shared legacy.
          </p>
        </div>
      </section>

      {/* Featured Events Cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-navy-800">Signature Events</h2>
                <div className="h-1 w-20 bg-gold-500 mx-auto mt-4"></div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mother Daughter */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Mother Daughter Weekend</h3>
              <p className="text-slate-600">
                Connecting female midshipmen and their mothers with the legacy and community of women graduates.
              </p>
            </div>

            {/* Father Daughter */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 text-navy-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Father Daughter Weekend</h3>
              <p className="text-slate-600">
                Celebrating the unique bond and steadfast support system between fathers and their daughters at the academy.
              </p>
            </div>

            {/* Mentorship */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-bl-lg">KEY EVENT</div>
              <div className="w-12 h-12 bg-green-50 text-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Mentorship Weekend</h3>
              <p className="text-slate-600">
                The cornerstone event providing invaluable networking between seasoned alumnae and current midshipmen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-navy-800">Conference Schedule</h2>
                    <p className="text-slate-500 mt-2">An overview of the key events planned.</p>
                </div>
                <button onClick={() => onNavigate(PageView.REGISTER)} className="hidden md:flex items-center text-gold-600 font-bold hover:text-gold-700 mt-4 md:mt-0">
                    Get Tickets <ArrowRight className="ml-2 w-4 h-4" />
                </button>
            </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {schedule.map((item, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon Indicator */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-50 group-hover:border-gold-500 group-hover:bg-gold-50 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                   <Calendar className="w-5 h-5 text-slate-500 group-hover:text-gold-600" />
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-slate-50 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <span className="font-bold text-navy-800 text-lg">{item.day}</span>
                    <span className="text-sm font-semibold text-gold-600 uppercase tracking-wider">{item.date}</span>
                  </div>
                  <ul className="space-y-2">
                    {item.events.map((event, i) => (
                        <li key={i} className="flex items-start text-slate-600 text-sm">
                            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-navy-400 rounded-full shrink-0"></span>
                            {event}
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
            
            <div className="mt-10 text-center md:hidden">
                <button onClick={() => onNavigate(PageView.REGISTER)} className="text-gold-600 font-bold hover:text-gold-700">
                    Get Tickets &rarr;
                </button>
            </div>
        </div>
      </section>

      {/* --- Exhibit Form Section (NEW) --- */}
      <section id="exhibit-section" className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-navy-900 mb-4">Class Sponsorship Challenge</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              If you are interested in supporting the event, take the pledge to donate for your class. In order to participate in the Sponsorship Challenge a class needs a minimum of $10K
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              {/* Deadlines & Contact */}
            </div>
            <div className="lg:col-span-2 flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-gold-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-navy-50 p-3 rounded-full"><Heart className="w-6 h-6 text-navy-800" /></div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-900">Take the pledge</h3>
                    <p className="text-slate-500 text-sm">Support the Class Sponsorship Challenge.</p>
                  </div>
                </div>
                <form onSubmit={handlePledgeSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input name="email" required type="email" className="input-field" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Class Year</label>
                    <input name="classYear" required type="text" className="input-field" placeholder="Ex: '82 or '24" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Donation Amount ($)</label>
                    <input name="donationAmount" required type="number" min="1" className="input-field" placeholder="100" />
                  </div>
                  <div className="pt-4">
                      <button type="submit" className="w-full btn-primary py-3.5">Submit Pledge</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Share Story Form Section (NEW) --- */}
      <section id="share-story-section" className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-navy-900 mb-4">Class Spotlight</h2>
            <p className="text-slate-600">Contribute by sharing nominations, shoutouts, and messages.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="flex flex-col md:flex-row border-b border-slate-200">
               <button onClick={() => setActiveShareTab(ShareStoryTab.NOMINATE)} className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeShareTab === ShareStoryTab.NOMINATE ? 'text-navy-900 border-b-4 border-navy-900 bg-slate-50' : 'text-slate-500'}`}>
                  <PenTool className="w-5 h-5" /> Article Nominations
              </button>
              <button onClick={() => setActiveShareTab(ShareStoryTab.SHOUTOUT)} className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeShareTab === ShareStoryTab.SHOUTOUT ? 'text-gold-600 border-b-4 border-gold-500 bg-slate-50' : 'text-slate-500'}`}>
                  <Megaphone className="w-5 h-5" /> BZ Shoutout
              </button>
              <button onClick={() => setActiveShareTab(ShareStoryTab.HELLO)} className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeShareTab === ShareStoryTab.HELLO ? 'text-pink-600 border-b-4 border-pink-500 bg-slate-50' : 'text-slate-500'}`}>
                  <Heart className="w-5 h-5" /> Hometown Hello
              </button>
            </div>
            <div className="p-8 md:p-12">
              {renderShareStoryForm()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;