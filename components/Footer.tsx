import React from 'react';
import { Anchor, Mail, MapPin, Phone, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-slate-300 py-12 border-t border-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold-500">
              <Anchor className="w-6 h-6" />
              <span className="font-serif text-xl font-bold">USNA WOMEN</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Celebrating 50 years of excellence, leadership, and service. "Breaking Barriers and Building Bonds" (1976-2026).
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 shrink-0" />
                <span>Fluegel Alumni Center<br/>Annapolis, MD 21402</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                <span>Pamela Pitkin '82: 703-801-3221</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition-colors">About the Event</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Registration</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-navy-800 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} USNA Women 50th Anniversary. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            {/* This is the "hidden" admin link */}
            <a href="#admin" onClick={(e) => { e.preventDefault(); window.location.hash = 'admin'; window.dispatchEvent(new HashChangeEvent("hashchange"))}} className="text-navy-800 hover:text-slate-600 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;