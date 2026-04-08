import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import axios from 'axios';
import ShayriCard from '../components/ShayriCard';
import LifeAdvice from '../components/LifeAdvice';
import { poetsStaticData } from '../data/poetData';
import BASE_URL from '../config/api';

const IqbalPage = () => {
  const [allShayris, setAllShayris] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 4;
  
  const poetName = "Allama Iqbal";
  const poetImage = "https://i.pinimg.com/474x/d2/7c/94/d27c9411ecf85794bb0c8f66a98248d9.jpg";

  const STORAGE_KEY = "iqbal";

  const fetchShayris = async () => {
    setLoading(true);
    try {
      // 1. Check LocalStorage for the ENTIRE collection
      const localData = localStorage.getItem(STORAGE_KEY);
      let collection = [];
      
      if (localData) {
        // Use the existing persistent collection
        collection = JSON.parse(localData);
      } else {
        // 2. Self-Seeding: First time visit, load from static and SAVE to localStorage
        const staticItems = (poetsStaticData[poetName] || []).map((text, idx) => ({ 
          _id: `static-${idx}`, 
          text, 
          poet: poetName, 
          category: "general" 
        }));
        
        collection = staticItems;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(staticItems));
      }

      // 3. Update State
      setAllShayris(collection);
      setTotalPages(Math.max(1, Math.ceil(collection.length / pageSize)));
      setLoading(false);
    } catch (err) {
      console.error("Fetch error, using static fallback");
      const staticData = (poetsStaticData[poetName] || []).map((text, idx) => ({ _id: `static-${idx}`, text, poet: poetName, category: "general" }));
      setAllShayris(staticData);
      setTotalPages(Math.max(1, Math.ceil(staticData.length / pageSize)));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShayris();
  }, []);

  const handleDeleteShayri = (id) => {
    const updated = allShayris.filter(s => s._id !== id);
    setAllShayris(updated);
    setTotalPages(Math.max(1, Math.ceil(updated.length / pageSize)));
    // Persist the deletion
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const currentShayris = allShayris.slice((page - 1) * pageSize, page * pageSize);


  const adviceConfig = {
    title: "Philosophical Vision",
    verses: [
      { text: "Khudi ko itna buland kar ke har taqdeer se pehle...", subtext: "Elevate your self-worth above destiny" },
      { text: "Amal se zindagi banti hai jannat bhi, jahannam bhi.", subtext: "Action determines the fate of existence" }
    ],
    gradient: "from-green-600 via-emerald-500 to-teal-400",
    themeColor: "text-green-600",
    tagLine: "The Allama Iqbal Legacy"
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Fetching Verses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <p className="text-red-500 font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">Try Refreshing</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Quote className="w-32 h-32 text-slate-200" />
        </div>
        <div className="flex flex-col space-y-4 z-10">
          <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-all group font-bold uppercase tracking-wider text-xs">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Poets Gallery</span>
          </Link>
          <Link 
            to={`/add-shayri?poet=${encodeURIComponent(poetName)}`}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-all font-black uppercase tracking-widest text-[10px] bg-blue-50 px-4 py-2 rounded-xl w-fit border border-blue-100 shadow-sm hover:shadow-md active:scale-95"
          >
            <Sparkles className="w-3 h-3" />
            <span>Add {poetName} Shayri</span>
          </Link>
        </div>
        <div className="md:text-right z-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">{poetName}</h1>
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">Gems of Literature</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <AnimatePresence mode="popLayout">
          {currentShayris.length > 0 && currentShayris.map((shayri, index) => (
            <motion.div
              key={shayri._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.02 }}
            >
              <ShayriCard 
                shayri={shayri} 
                poetImage={poetImage} 
                onDelete={handleDeleteShayri}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {currentShayris.length > 0 && page === totalPages && (
        <LifeAdvice {...adviceConfig} />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 md:space-x-4 py-6 md:py-12">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            {[...Array(totalPages)].map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-md md:rounded-lg flex items-center justify-center font-bold text-xs md:text-sm transition-all ${
                    page === n ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-100 hover:bg-slate-50 text-slate-400'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>

          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default IqbalPage;
