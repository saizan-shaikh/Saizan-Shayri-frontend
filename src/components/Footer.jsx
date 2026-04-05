import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-8 md:pt-16 pb-8 mt-6 md:mt-20 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Left Column: Brand & Logo */}
          <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <span className="text-xl md:text-2xl font-black text-white">S</span>
              </div>
              <span className="text-lg md:text-xl font-black tracking-tight text-slate-900">
                Shayri <span className="text-blue-600">Book</span>
              </span>
            </Link>

            {/* Mobile Branding: Author Name (Hidden on Desktop) */}
            <div className="block md:hidden py-1">
               <span className="text-lg font-black tracking-widest uppercase italic text-blue-600 drop-shadow-[0_0_12px_rgba(37,99,235,0.4)] animate-pulse">
                 Saizan Shaikh
               </span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed font-medium hidden md:block max-w-sm">
              This platform provides original Urdu Shayri from famous poets. 
              Read, save, and share beautiful verses that touch the soul. 
              A digital heritage for the lovers of deep literature.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer border border-slate-100">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer border border-slate-100">
                <Twitter className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Center Column: Navigation (Desktop Only) */}
          <div className="space-y-6 hidden md:block">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600/30 mr-2" />
                  Home Gallery
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600/30 mr-2" />
                  My Favorites
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600/30 mr-2" />
                  Library Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Author Branding (Hidden on Mobile, Redesigned for Desktop) */}
          <div className="hidden md:flex flex-col items-end justify-center">
            <div className="space-y-4 bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-500 w-full max-w-[280px]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600/50">Project Lead</h4>
              <div className="space-y-1">
                <p className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                  Saizan <span className="text-blue-600 text-3xl block -mt-2">Shaikh</span>
                </p>
                <div className="w-8 h-1 bg-blue-600 rounded-full" />
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Full-Stack Developer & <br />
                Poetry Enthusiast
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center md:text-left">
          <p>&copy; {currentYear} Shayri Book. Created with <Heart className="w-3 h-3 text-pink-500 inline-block mx-1 fill-current" /> by <span className="text-slate-900 font-black">Saizan Shaikh</span></p>
          <div className="flex items-center space-x-4 md:space-x-8">
             <span className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</span>
             <span className="hover:text-blue-600 cursor-pointer transition-colors">Terms</span>
             <span className="hover:text-blue-600 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

