import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, PlusCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <span className="text-xl md:text-2xl font-black text-white">S</span>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-lg md:text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Shayri <span className="text-blue-600 group-hover:text-slate-900 hidden sm:inline">Book</span>
            </span>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Shaikh Edition</span>
          </div>
        </Link>

        <div className="flex items-center space-x-3 md:space-x-8">
          <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-2 font-bold text-xs md:text-sm uppercase tracking-wider">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link to="/favorites" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-2 font-bold text-xs md:text-sm uppercase tracking-wide">
            <Heart className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">Favorites</span>
          </Link>

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

          <Link 
            to="/add-shayri" 
            className="flex items-center space-x-2 px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 group"
            title="Add New Shayri"
          >
            <PlusCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-xs md:text-sm font-black uppercase tracking-widest hidden xs:inline">Add</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
