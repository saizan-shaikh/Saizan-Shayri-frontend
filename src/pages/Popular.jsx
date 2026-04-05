import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Quote, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShayriCard from '../components/ShayriCard';
import BASE_URL from '../config/api';

const Popular = () => {
  const [shayris, setShayris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/shayri/popular`);
        setShayris(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load popular verses.");
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Gathering Favorites...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Quote className="w-32 h-32 text-slate-200" />
        </div>
        <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-all group font-bold uppercase tracking-wider text-xs z-10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <div className="md:text-right z-10">
          <div className="flex items-center md:justify-end space-x-2">
            <Stars className="w-6 h-6 text-pink-500" />
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Popular</h1>
          </div>
          <p className="text-pink-500 font-bold text-sm tracking-widest uppercase mt-1">Most Loved By Community</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
        <AnimatePresence>
          {shayris.map((shayri, index) => (
            <motion.div
              key={shayri._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ShayriCard shayri={shayri} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {shayris.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
           <Heart className="w-12 h-12 text-slate-200 mx-auto mb-4" />
           <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No popular verses found yet.</p>
        </div>
      )}
    </div>
  );
};

export default Popular;
