import React, { useState, useEffect } from 'react';
import { getSubmissions, clearAllSubmissions, Submission } from '../services/storageService.ts';
import { Trash2, RefreshCw, Database, Lock, ArrowLeft, ArrowRight, ShieldCheck, Loader2, Cloud, HardDrive, AlertCircle } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>('ALL');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getSubmissions();
      // Sort by newest first
      data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setSubmissions(data);
    } catch (err) {
      console.error("Failed to load data", err);
      setError("Failed to fetch data from Canto. Check console/config.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'PS71steg@') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Access Denied: Incorrect Password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setSubmissions([]);
  };

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const handleClear = async () => {
    // Only alert now, as we removed the clearing logic for Canto safety
    await clearAllSubmissions();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-navy-900" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-navy-900">Admin Access</h1>
            <p className="text-slate-500 text-sm mt-2">View Canto Data Repository</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
                placeholder="Enter secure password"
                autoFocus
              />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button 
                type="submit" 
                className="w-full bg-navy-800 text-white font-bold py-3 rounded-lg hover:bg-navy-700 transition-colors shadow-lg"
              >
                Access Dashboard
              </button>
              <button 
                type="button"
                onClick={handleBackToHome}
                className="w-full bg-white text-slate-600 font-semibold py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Return to Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Interface
  const filteredSubmissions = filter === 'ALL' 
    ? submissions 
    : submissions.filter(s => s.type === filter);
  
  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <button onClick={handleBackToHome} className="p-2 rounded-full hover:bg-slate-200 transition-colors" title="Back to Home">
                    <ArrowLeft className="w-6 h-6 text-navy-900" />
                </button>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-navy-900 flex items-center gap-3">
                        <Database className="w-8 h-8 text-gold-500" />
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm">Canto Global Storage</p>
                </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
                <button onClick={loadData} disabled={isLoading} className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} 
                    Refresh Data
                </button>
                <button onClick={handleLogout} className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors shadow-sm">
                    <Lock className="w-4 h-4" /> Logout
                </button>
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {['ALL', 'EXHIBIT', 'NOMINATE', 'SHOUTOUT', 'HELLO'].map(type => (
                <button 
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm whitespace-nowrap ${
                        filter === type 
                        ? 'bg-navy-800 text-white ring-2 ring-gold-400 ring-offset-2' 
                        : 'bg-white text-slate-500 hover:text-navy-900 hover:bg-slate-50'
                    }`}
                >
                    {type === 'ALL' ? 'All Records' : type}
                </button>
            ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            {isLoading ? (
                <div className="p-16 flex justify-center items-center flex-col gap-4 text-navy-800">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <p>Fetching data from Canto...</p>
                </div>
            ) : filteredSubmissions.length === 0 ? (
                <div className="p-16 text-center text-slate-500 flex flex-col items-center">
                    <Cloud className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-lg font-semibold">No records found in Canto</p>
                    <p className="text-sm mt-2">Ensure you have connected your Canto API credentials in the code.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Content</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredSubmissions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="flex items-center gap-1 text-blue-600 font-bold text-xs bg-blue-50 px-2 py-1 rounded border border-blue-100 w-fit">
                                            <Cloud className="w-3 h-3" /> CANTO
                                        </span>
                                        <div className="text-[10px] text-slate-400 mt-1 font-mono">{sub.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        <div className="font-medium">{new Date(sub.timestamp).toLocaleDateString()}</div>
                                        <div className="text-xs text-slate-400">{new Date(sub.timestamp).toLocaleTimeString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full inline-flex items-center ${
                                            sub.type === 'PLEDGE' || sub.type === 'EXHIBIT' ? 'bg-purple-100 text-purple-800' :
                                            sub.type === 'NOMINATE' ? 'bg-blue-100 text-blue-800' :
                                            sub.type === 'SHOUTOUT' ? 'bg-gold-100 text-navy-900' :
                                            'bg-pink-100 text-pink-800'
                                        }`}>
                                            {sub.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700">
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-xs overflow-x-auto max-w-2xl">
                                            {Object.entries(sub.data)
                                                .filter(([key]) => key !== 'imageBase64' && key !== 'submissionType' && key !== 'submissionDate' && key !== 'raw')
                                                .map(([key, value]) => (
                                                <div key={key} className="mb-1 last:mb-0 break-words">
                                                    <span className="text-slate-500 font-semibold">{key}:</span> <span className="text-navy-900">{String(value)}</span>
                                                </div>
                                            ))}
                                            {sub.data.raw && (
                                                <div className="text-slate-400 italic">Raw desc: {String(sub.data.raw).substring(0, 50)}...</div>
                                            )}
                                            {/* Display Image Link */}
                                            {sub.cantoUrl && (
                                                <div className="mt-2 pt-2 border-t border-slate-200">
                                                    <a href={sub.cantoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-bold">
                                                        View Asset <ArrowRight className="w-3 h-3" />
                                                    </a>
                                                    {sub.type === 'NOMINATE' && (
                                                        <img 
                                                            src={sub.cantoUrl} 
                                                            alt="Attachment" 
                                                            className="mt-2 rounded-md border border-slate-300 h-24 object-cover bg-white" 
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Admin;