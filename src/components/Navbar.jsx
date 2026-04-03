import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Heart, BookOpen, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <span className="text-2xl font-black text-white">S</span>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Shayri <span className="text-blue-600 group-hover:text-slate-900">Book</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Shaikh Edition</span>
          </div>
        </Link>

        <div className="flex items-center space-x-8">
          <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-2 font-bold text-sm uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          {user ? (
            <>
              <Link to="/favorites" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-2 font-bold text-sm uppercase tracking-wider">
                <Heart className="w-4 h-4" />
                <span>Favorites</span>
              </Link>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end -space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Welcome</span>
                  <span className="text-sm font-black text-slate-800">{user.username}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 shadow-sm"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-slate-600 hover:text-blue-600 font-bold text-sm uppercase tracking-wider transition-colors">
                Login
              </Link>
              <Link to="/register" className="primary-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
