import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import Admin from './pages/Admin.tsx';
import { PageView } from './types.ts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);
  const [activeLink, setActiveLink] = useState<PageView>(PageView.HOME);

  const handleNavigate = (view: PageView) => {
    setActiveLink(view);

    if (view === PageView.EXHIBIT || view === PageView.SHARE_STORY) {
      setCurrentView(PageView.HOME);
      
      setTimeout(() => {
        const elementId = view === PageView.EXHIBIT ? 'exhibit-section' : 'share-story-section';
        const element = document.getElementById(elementId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } else {
      setCurrentView(view);
    }
  };

  // Scroll to top when view actually changes to a different page
  useEffect(() => {
    if (currentView !== PageView.HOME) {
      window.scrollTo(0, 0);
    }
  }, [currentView]);


  // Listen for hash changes for simple routing (Admin)
  useEffect(() => {
    const handleHashChange = () => {
        if (window.location.hash === '#admin') {
            setCurrentView(PageView.ADMIN);
        } else if (currentView === PageView.ADMIN) { // Navigating away from admin via back button
            setCurrentView(PageView.HOME);
            setActiveLink(PageView.HOME);
        }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash on load
    if (window.location.hash === '#admin') {
        setCurrentView(PageView.ADMIN);
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case PageView.HOME:
        return <Home onNavigate={handleNavigate} />;
      case PageView.REGISTER:
        return <Register />;
      case PageView.ADMIN:
        return <Admin />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {currentView !== PageView.ADMIN && (
        <Navigation activeLink={activeLink} onNavigate={handleNavigate} />
      )}
      
      <main className="flex-grow">
        {renderView()}
      </main>
      
      {currentView !== PageView.ADMIN && <Footer />}
      
    </div>
  );
};

export default App;