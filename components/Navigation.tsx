import React, { useState } from 'react';
import { Menu, X, Anchor } from 'lucide-react';
import { PageView, NavItem } from '../types.ts';

interface NavigationProps {
  activeLink: PageView;
  onNavigate: (view: PageView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeLink, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Home', view: PageView.HOME },
    { label: 'Class Spotlight', view: PageView.SHARE_STORY },
    { label: 'Class Sponsorship Challenge', view: PageView.EXHIBIT },
    { label: 'Register Now', view: PageView.REGISTER },
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  // Years for the crests display
  const years = [2018, 2022, 2023, 2024, 2025];

  return (
    <nav className="sticky top-0 z-40 bg-navy-800 text-white shadow-lg border-b-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            {/* Logo Area */}
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick(PageView.HOME)}>
              <div className="flex-shrink-0 bg-gold-500 p-2 rounded-full mr-3">
                <Anchor className="h-6 w-6 text-navy-900" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-wide text-gold-400 leading-none">USNA WOMEN</span>
                <span className="text-xs uppercase tracking-widest text-slate-300">50th Anniversary</span>
              </div>
            </div>

            {/* Class Crests Row - Next to Logo */}
            <div className="hidden xl:flex items-center space-x-2 ml-8 border-l border-navy-700 pl-8 h-12">
                {years.map(year => (
                    <div key={year} className="h-10 w-8 bg-navy-900 border border-gold-600/30 rounded-sm flex items-center justify-center text-[10px] font-bold text-gold-400 hover:bg-navy-700 transition-colors cursor-default" title={`Class of ${year}`}>
                        '{year.toString().slice(2)}
                    </div>
                    /* 
                       NOTE: To use real images, replace the div above with:
                       <img key={year} src={`/path/to/crest-${year}.png`} alt={`Class of ${year}`} className="h-10 w-auto object-contain" />
                    */
                ))}
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeLink === item.view
                    ? 'text-gold-400 bg-navy-900'
                    : 'text-slate-300 hover:text-white hover:bg-navy-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-t border-navy-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  activeLink === item.view
                    ? 'text-gold-400 bg-navy-800'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;