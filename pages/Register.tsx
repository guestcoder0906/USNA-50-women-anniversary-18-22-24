
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

// IMPORTANT: Replace this with the actual URL for your event registration platform.
const REGISTRATION_PORTAL_URL = 'https://signupnow.events/Default_Forum.aspx?OrgId=1066&eid=1158&OrgName=USNAWomen50';

const Register: React.FC = () => {

  const handleRegisterClick = () => {
    window.open(REGISTRATION_PORTAL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Secure Your Spot</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join us for a historic weekend of celebration, reflection, and connection.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-8 border-gold-500">
          <h2 className="text-2xl font-bold text-navy-900 text-center mb-6">Event Registration</h2>
          
          <p className="text-center text-slate-600 mb-8">
            Registration grants you access to the full weekend of curated events and experiences.
          </p>

          <div className="bg-gold-50 p-4 rounded-lg border border-gold-100 mb-4 text-center">
            <p className="text-navy-800 text-sm font-semibold">
              Early Bird Registration Ends January 15th!
            </p>
            <p className="text-navy-800 text-sm">
              Conference: <span className="font-bold">$200</span> | Gala: <span className="font-bold">$175</span>
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8 text-center">
            <p className="text-navy-800 text-sm font-semibold">
              Regular Registration Ends April 1st!
            </p>
            <p className="text-navy-800 text-sm">
              Conference: <span className="font-bold">$250</span> | Gala: <span className="font-bold">$200</span>
            </p>
          </div>

          <button 
            onClick={handleRegisterClick}
            className="w-full bg-gold-500 text-navy-900 font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gold-400 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
          >
            Proceed to Registration Portal
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-slate-400 text-xs mt-4">
            You will be redirected to our secure registration partner to complete your booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;