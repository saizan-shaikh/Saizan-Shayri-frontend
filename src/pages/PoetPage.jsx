import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Quote, Sparkles } from 'lucide-react';
import ShayriCard from '../components/ShayriCard';

// Poet images mapping (synced with Home.jsx)
const poetImages = {
  "Mirza Ghalib": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAY4-74QC1sADfuhR3SGo_KB-3cE7j4UKUI9_6nMWtNA&s",
  "Jaun Elia": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7QeVH86M7ZZyFKFxgkkfUnsN1PvxYnYHciqhmZON7JQ&s",
  "Rahat Indori": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThKYeSDNDOdRcLeQYZhaLlRnAVF2f_a3Bi4w&s",
  "Allama Iqbal": "https://i.pinimg.com/474x/d2/7c/94/d27c9411ecf85794bb0c8f66a98248d9.jpg",
  "Faiz Ahmed Faiz": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSlgGqsehRG1eYOqQDEdj1KXBjTWmipbbu5w&s",
  "Mir Taqi Mir": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TQe0vTTn7mJ_cZZbdLx7RBAMhlG0nY4iTAEWTR4kJQ&s"
};

const PoetPage = () => {
  const { name } = useParams();
  const [allShayris, setAllShayris] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 4;

  const fetchShayris = async () => {
    setLoading(true);
    try {
      // 1. Fetch Backend (attempt to get all)
      const { data } = await axios.get(`https://saizan-shayri-backend.onrender.com/api/shayri/poet/${name}?limit=all`);
      const backendShayris = data.shayris || [];

      // 2. Local Storage fallback/merge (optional but good for consistency)
      const STORAGE_KEY = `user_shayaris_${name.toLowerCase().replace(/\s+/g, '_')}`;
      const localShayris = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      // 3. Static Data (using the same source as others)
      const staticData = (poetsStaticData[name] || []).map((text, idx) => ({
        _id: `static-${idx}`,
        text,
        poet: name,
        category: "general"
      }));

      // 4. Merge and Deduplicate
      const allMerged = [...backendShayris, ...localShayris, ...staticData];
      const seen = new Set();
      const uniqueShayris = allMerged.filter(item => {
        if (!item || typeof item.text !== 'string') return false;
        const textKey = item.text.trim().toLowerCase();
        if (seen.has(textKey)) return false;
        seen.add(textKey);
        return true;
      });

      setAllShayris(uniqueShayris);
      setTotalPages(Math.max(1, Math.ceil(uniqueShayris.length / pageSize)));
    } catch (error) {
      console.error('Error fetching shayris', error);
      // Fallback to static + local
      const staticData = (poetsStaticData[name] || []).map((text, idx) => ({ _id: `static-${idx}`, text, poet: name, category: "general" }));
      const localShayris = JSON.parse(localStorage.getItem(`user_shayaris_${name.toLowerCase().replace(/\s+/g, '_')}`)) || [];
      const combined = [...localShayris, ...staticData];
      
      const seen = new Set();
      const unique = combined.filter(item => {
        if (!item || typeof item.text !== 'string') return false;
        const key = item.text.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setAllShayris(unique);
      setTotalPages(Math.max(1, Math.ceil(unique.length / pageSize)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShayris();
  }, [name]);

  const currentShayris = allShayris.slice((page - 1) * pageSize, page * pageSize);

  // Re-calculating pages UI logic remains the same but using totalPages
  const pages = totalPages;


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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">{name}</h1>
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">Gems of Literature</p>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
            <AnimatePresence mode="popLayout">
              {currentShayris.map((shayri, index) => (
                <motion.div
                  key={shayri._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ShayriCard shayri={shayri} poetImage={poetImages[name]} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ... (Legacy Sections Kept) ... */}

          {pages > 1 && (
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
                  const end = Math.min(start + 2, pages);
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
                      {end < pages && (
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
                onClick={() => setPage(p => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 shadow-sm"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PoetPage;
