import React, { useState } from 'react';
import { Calendar, MapPin, User, Heart, Award, ArrowRight, PenTool, Megaphone } from 'lucide-react';
import { ScheduleItem, PageView } from '../types.ts';


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
  // State for Share Story Form - Default to SHOUTOUT (first tab)
  const [activeShareTab, setActiveShareTab] = useState<ShareStoryTab>(ShareStoryTab.SHOUTOUT);
  
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

  const renderShareStoryForm = () => {
    switch (activeShareTab) {
      case ShareStoryTab.SHOUTOUT:
        return (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="w-full h-[800px] bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                 <iframe 
                    src="https://forms.gle/qCiQTnQsXkdagTZ27" 
                    className="w-full h-full border-0"
                    title="BZ Shoutout Form"
                >Loading...</iframe>
            </div>
          </div>
        );
      case ShareStoryTab.HELLO:
        return (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="w-full h-[800px] bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                 <iframe 
                    src="https://forms.gle/79XJxAtutYqH9Ajs8" 
                    className="w-full h-full border-0"
                    title="Hometown Hello Form"
                >Loading...</iframe>
            </div>
          </div>
        );
      case ShareStoryTab.NOMINATE:
        return (
          <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-lg text-center">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                 <PenTool className="w-8 h-8 text-navy-900" />
             </div>
             <h3 className="text-2xl font-serif font-bold text-navy-900 mb-3">Article Nomination Form</h3>
             <p className="text-slate-600 max-w-lg mb-8 leading-relaxed">
                 We are using Google Forms to collect detailed stories and file uploads. 
                 <br/>
                 Please open the form in a new secure window to proceed with your nomination.
             </p>
             <a 
                 href="https://forms.gle/rghMCFg4nNXeQhU99" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 font-bold px-8 py-4 rounded-lg hover:bg-gold-400 transition-colors shadow-md"
             >
                 Launch Nomination Form <ArrowRight className="w-5 h-5" />
             </a>
             <p className="mt-6 text-sm text-slate-400 flex items-center gap-1">
                 <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                 Secure Google Form
             </p>
          </div>
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
            .btn-primary:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
        `}</style>
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-24 lg:py-40 overflow-hidden">
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-gold-500 text-gold-400 text-sm font-semibold uppercase tracking-widest bg-navy-900/60 backdrop-blur-sm">
                1976 - 2026
            </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 leading-tight drop-shadow-lg">
            Breaking Barriers <span className="text-gold-500 italic">&</span> Building Bonds
          </h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto mb-10 font-light drop-shadow-md">
            Annual Gathering to Celebrate 50 Years of Women at the US Naval Academy.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center justify-center gap-2 bg-navy-800/80 backdrop-blur px-6 py-3 rounded-lg border border-navy-700 shadow-lg">
              <Calendar className="w-5 h-5 text-gold-400" />
              <span>April 16-19, 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-navy-800/80 backdrop-blur px-6 py-3 rounded-lg border border-navy-700 shadow-lg">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span>Annapolis, MD (FAC & NMCMS)</span>
            </div>
          </div>

          <div className="mt-12">
            <button 
                onClick={() => onNavigate(PageView.REGISTER)}
                className="bg-gold-500 text-navy-900 font-bold py-4 px-8 rounded-full shadow-xl hover:bg-gold-400 transition-all transform hover:-translate-y-1 hover:shadow-gold-500/20"
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
          
          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-gold-500">
                <iframe 
                    src="https://forms.gle/6aBpdwrMQ9wQFUc1A" 
                    className="w-full h-[800px] md:h-[1200px] border-0"
                    title="Class Sponsorship Form"
                >Loading...</iframe>
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
              {/* BZ Shoutout - Orange (First) */}
              <button onClick={() => setActiveShareTab(ShareStoryTab.SHOUTOUT)} className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeShareTab === ShareStoryTab.SHOUTOUT ? 'text-orange-600 border-b-4 border-orange-500 bg-slate-50' : 'text-slate-500'}`}>
                  <Megaphone className="w-5 h-5" /> BZ Shoutout
              </button>
              {/* Hometown Hello - Pink (Second) */}
              <button onClick={() => setActiveShareTab(ShareStoryTab.HELLO)} className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeShareTab === ShareStoryTab.HELLO ? 'text-pink-600 border-b-4 border-pink-500 bg-slate-50' : 'text-slate-500'}`}>
                  <Heart className="w-5 h-5" /> Hometown Hello
              </button>
              {/* Article Nomination - Navy (Third) */}
               <button onClick={() => setActiveShareTab(ShareStoryTab.NOMINATE)} className={`flex-1 p-6 flex items-center justify-center gap-3 text-sm font-bold transition-all hover:bg-slate-50 ${activeShareTab === ShareStoryTab.NOMINATE ? 'text-navy-900 border-b-4 border-navy-900 bg-slate-50' : 'text-slate-500'}`}>
                  <PenTool className="w-5 h-5" /> Article Nominations
              </button>
            </div>
            <div className="p-0">
              {renderShareStoryForm()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;