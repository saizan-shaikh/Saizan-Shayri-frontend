import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Heart, BookOpen, PlusCircle, UserX, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogoutStandard = () => {
    logout();
    setShowLogoutModal(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleRegistrationLogout = async () => {
    try {
      setIsDeleting(true);
      await deleteAccount();
      setShowLogoutModal(false);
      toast.warning('Account and data permanently deleted');
      navigate('/register');
    } catch (error) {
      toast.error('Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <>
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

            {user?.role === 'admin' && (
              <Link to="/admin/add-shayri" className="p-2 md:p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 group" title="Add New Shayri">
                <PlusCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300" />
              </Link>
            )}
            
            {user ? (
              <>
                <Link to="/favorites" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-2 font-bold text-xs md:text-sm uppercase tracking-wide">
                  <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden md:inline">Favorites</span>
                </Link>
                <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>
                <div className="flex items-center space-x-2 md:space-x-4">
                  <div className="flex flex-col items-end -space-y-1 hidden sm:flex">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Welcome</span>
                    <span className="text-sm font-black text-slate-800">{user.username.split(' ')[0]}</span>
                  </div>
                  <button 
                    onClick={() => setShowLogoutModal(true)}
                    className="p-2 md:p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 shadow-sm"
                    title="Logout Options"
                  >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                {!isLoginPage && (
                  <Link to="/login" className="text-slate-600 hover:text-blue-600 font-bold text-xs md:text-sm uppercase tracking-wider transition-colors">
                    Login
                  </Link>
                )}
                <Link to="/register" className="primary-btn px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Selection Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100"
            >
              <div className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                    <LogOut className="w-8 h-8" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Choice of Logout</h3>
                  <p className="text-slate-400 text-xs font-bold px-4">How would you like to proceed with your session?</p>
                </div>

                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={handleLogoutStandard}
                    className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Standard Logout
                  </button>
                  
                  <button 
                    onClick={handleRegistrationLogout}
                    disabled={isDeleting}
                    className="w-full py-4 rounded-2xl bg-white border border-red-100 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-50"
                  >
                    <UserX className="w-4 h-4" />
                    <span>{isDeleting ? 'Deleting...' : 'Registration Logout'}</span>
                  </button>

                  <button 
                    onClick={() => setShowLogoutModal(false)}
                    className="w-full py-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
                  >
                    Cancel Selection
                  </button>
                </div>

                <div className="pt-4 border-t border-dotted border-slate-100">
                  <div className="flex items-center justify-center space-x-2 text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    <span>Registration Logout is permanent</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
