
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-slate-800">MediScan AI</h3>
            <p className="text-sm text-slate-500">Democratizing health insights with advanced intelligence.</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Terms of Service</a>
            <a href="#" className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Contact</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} MediScan AI. All rights reserved. Built for professional assistance only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
