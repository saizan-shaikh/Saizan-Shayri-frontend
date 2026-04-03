import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(username, email, password);
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Try a different username or email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[2.5rem] space-y-8 shadow-xl shadow-blue-100/50 border border-white"
      >
        <div className="text-center space-y-3">
           <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
              <UserPlus className="w-8 h-8 text-white" />
           </div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h2>
           <p className="text-slate-500 text-sm font-medium">Be part of the most premium Shayri community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Full Name / Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-semibold"
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-semibold"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-semibold"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="primary-btn w-full py-4 text-lg font-black tracking-wide"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>Create Account</span>}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-50">
           <p className="text-slate-500 text-sm font-medium">
             Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In Instead</Link>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
