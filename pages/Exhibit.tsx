import React, { useState } from 'react';
import { Upload, Info, Clock, Mail } from 'lucide-react';
import { saveSubmission } from '../services/storageService.ts';

const Exhibit: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add the filename manually since file inputs are tricky to serialize directly in this demo
    if (fileName) {
        data.fileName = fileName;
    }

    saveSubmission('EXHIBIT', data);
    alert("Thank you! Your memory has been uploaded to the repository.");
    
    // Reset form
    e.currentTarget.reset();
    setFileName(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-navy-900 mb-4">The 50 Year Exhibit</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            In partnership with the <span className="font-semibold text-navy-800">Historic Museum of Annapolis</span>, 
            we are creating a permanent exhibit and digital repository to preserve the history of women at the Academy.
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
              <p className="text-sm mb-2 text-slate-300">Contact Pamela Pitkin ‘82</p>
              <p className="text-lg font-mono">703-801-3221</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-gold-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-navy-50 p-3 rounded-full">
                    <Upload className="w-6 h-6 text-navy-800" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-navy-900">Upload Your Memories</h2>
                    <p className="text-slate-500 text-sm">Help us tell our story for future generations.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First & Last Name</label>
                    <input name="fullName" required type="text" className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input name="email" required type="email" className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="jane@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Class Year</label>
                        <input name="classYear" required type="text" className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="e.g. 1982" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date of Photo (Approx.)</label>
                        <input name="photoDate" type="text" className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="Month / Year" />
                    </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Context of the Photo</label>
                  <textarea name="context" rows={3} className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="Describe the event, location, and what is happening..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Who is in the photo?</label>
                  <textarea name="people" rows={2} className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all" placeholder="List names and class years..."></textarea>
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Digital Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:bg-slate-50 transition-colors relative">
                        <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-slate-400" />
                        <div className="flex text-sm text-slate-600 justify-center">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-navy-600 hover:text-navy-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file" type="file" className="sr-only" onChange={handleFileChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                        {fileName && (
                            <p className="text-sm font-semibold text-green-600 mt-2">Selected: {fileName}</p>
                        )}
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-navy-800 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg hover:bg-navy-700 transition-all flex justify-center items-center gap-2">
                        Submit Contribution
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