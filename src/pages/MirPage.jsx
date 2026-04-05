import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import axios from 'axios';
import ShayriCard from '../components/ShayriCard';
import LifeAdvice from '../components/LifeAdvice';
import BASE_URL from '../config/api';

const poetImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TQe0vTTn7mJ_cZZbdLx7RBAMhlG0nY4iTAEWTR4kJQ&s";

const MirPage = () => {
  const [shayris, setShayris] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 4;
  
  const poetName = "Mir Taqi Mir";
  const poetImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TQe0vTTn7mJ_cZZbdLx7RBAMhlG0nY4iTAEWTR4kJQ&s";

  const fetchShayris = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/shayri/poet/${poetName}?pageNumber=${page}`);
      setShayris(data.shayris);
      setCount(data.count);
      
      // Dynamic Pagination Logic for LifeAdvice
      const lastPageItems = data.count % pageSize;
      const basePages = data.pages;
      // Requirement: If 3rd shayari is added on a page -> move Life Advice to NEXT page
      const computedTotal = (lastPageItems >= 3 || lastPageItems === 0) && data.count > 0 ? basePages + 1 : basePages;
      setTotalPages(computedTotal);
      
      setLoading(false);
    } catch (err) {
      setError("Failed to load verses. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShayris();
  }, [page]);

  const handleDeleteShayri = (id) => {
    setShayris(prev => prev.filter(s => s._id !== id));
    setCount(prev => prev - 1);
    // If the page becomes empty after deletion, move to the previous page
    if (shayris.length === 1 && page > 1) {
      setPage(p => p - 1);
    } else {
      // Re-fetch to pull the next item from the next page into this one if necessary
      fetchShayris();
    }
  };

  const adviceConfig = {
    title: "Classical Sorrow",
    verses: [
      { text: "Ibtida-e-ishq hai rota hai kya...", subtext: "If the beginning brings tears, brace for the journey" },
      { text: "Faqeerana aaye sada kar chale.", subtext: "Walk through this world with the detachment of a mystic" }
    ],
    gradient: "from-rose-600 via-red-500 to-orange-400",
    themeColor: "text-rose-600",
    tagLine: "The Mir Taqi Mir Legacy"
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
        <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-all group font-bold uppercase tracking-wider text-xs z-10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Poets Gallery</span>
        </Link>
        <div className="md:text-right z-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">{poetName}</h1>
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">Gems of Literature</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
        <AnimatePresence mode="popLayout">
          {shayris.length > 0 ? (
            shayris.map((shayri, index) => (
              <motion.div
                key={shayri._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                <ShayriCard 
                  shayri={shayri} 
                  poetImage={poetImage} 
                  onDelete={handleDeleteShayri}
                />
              </motion.div>
            ))
          ) : (
            null // Empty on extra Advice page
          )}
        </AnimatePresence>
      </div>

      {page === totalPages && (
        <LifeAdvice {...adviceConfig} />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 md:space-x-6 py-6 md:py-12">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <div className="flex items-center space-x-1.5 md:space-x-2">
            {(() => {
              const start = Math.floor((page - 1) / 3) * 3 + 1;
              const end = Math.min(start + 2, totalPages);
              const pageNumbers = [];
              for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
              }
              
              return (
                <>
                  {start > 1 && (
                      <button
                      onClick={() => setPage(start - 1)}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center font-black bg-white border border-slate-100 text-slate-400 hover:bg-slate-50"
                      >
                        ...
                      </button>
                  )}
                  {pageNumbers.map(n => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center font-black transition-all ${
                        page === n ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-slate-100 hover:bg-slate-50 text-slate-400'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  {end < totalPages && (
                      <button
                      onClick={() => setPage(end + 1)}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center font-black bg-white border border-slate-100 text-slate-400 hover:bg-slate-50"
                      >
                        {">"}
                      </button>
                  )}
                </>
              )
            })()}
          </div>

          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 shadow-sm"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MirPage;
