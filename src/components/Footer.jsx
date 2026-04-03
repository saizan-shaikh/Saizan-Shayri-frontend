import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Book, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 mt-20 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column: Brand & Logo */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <span className="text-2xl font-black text-white">S</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Shayri <span className="text-blue-600">Book</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              This platform provides original Urdu Shayri from famous poets. 
              Read, save, and share beautiful verses that touch the soul. 
              A digital heritage for the lovers of deep literature.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Center Column: Navigation */}
          <div className="space-y-6">
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

          {/* Right Column: Author Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Author Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-900 font-black text-sm">Saizan Shaikh</p>
                  <p className="text-slate-500 text-xs font-medium">Shahibug, Ahmedabad</p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Gujarat 380004</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-slate-900 font-black text-sm">+91 9026278246</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-slate-900 font-black text-sm break-all">contact@shayribook.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
          <p>&copy; 2026 Shayri Book. Created with <Heart className="w-3 h-3 text-pink-500 inline-block mx-1 fill-current" /> by Saizan Shaikh</p>
          <div className="flex items-center space-x-6">
             <span className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-blue-600 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
