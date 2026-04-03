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
  const [shayris, setShayris] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Hardcoded fallback data for Jaun Elia (in case backend/seeding fails)
  const jaunFallback = [
    { _id: "f1", text: "Main bhi bohot ajeeb hoon itna ajeeb hoon ke bas, Khud ko tabaah kar liya aur malaal bhi nahi.", poet: "Jaun Elia", category: "dard" },
    { _id: "f2", text: "Ab nahi koi baat khatre ki, Ab sabhi ko sabhi se khatra hai.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f3", text: "Tum mera naam kyun nahi leti, Mujh se milne kyun nahi aati.", poet: "Jaun Elia", category: "love" },
    { _id: "f4", text: "Kya sitam hai ke ab teri surat, Ghaur karne pe yaad aati hai.", poet: "Jaun Elia", category: "love" },
    { _id: "f5", text: "Hum kahan ke dana the kis hunar mein yakta the, Be-sabab dushman hua aasman apna.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f6", text: "Zindagi kis tarah basar hogi, Dil nahi lag raha mohabbat mein.", poet: "Jaun Elia", category: "love" },
    { _id: "f7", text: "Ek hi hadsa to hai aur wo ye ke aaj tak, Baat nahi kahi gayi baat nahi suni gayi.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f8", text: "Kitne aish se rehte honge kitne itraate honge, Jaane kaise log wo honge jo usko bhaate honge.", poet: "Jaun Elia", category: "love" },
    { _id: "f9", text: "Ab to har baat yaad rehti hai, Ghalat aur sahi ka kya karna.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f10", text: "Shayad mujhe kisi se mohabbat nahi hui, Lekin yaqeen sab ko dilata raha hoon main.", poet: "Jaun Elia", category: "attitude" },
    { _id: "f11", text: "Main bhi bohot ajeeb hoon itna ajeeb hoon ke bas, Khud ko tabaah kar liya aur malaal bhi nahi.", poet: "Jaun Elia", category: "dard" },
    { _id: "f12", text: "Kisi se koi bhi umeed rakhna, Yeh sab se bada dhoka hai.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f13", text: "Dil ki takleef kam nahi hoti, Ab koi marham bhi nahi milta.", poet: "Jaun Elia", category: "dard" },
    { _id: "f14", text: "Mujh se mil kar udaas kyun hai, Kya mujhe pehchaan liya hai.", poet: "Jaun Elia", category: "love" },
    { _id: "f15", text: "Main ne maana ke kuch nahi hoon main, Phir bhi tujh se kam nahi hoon main.", poet: "Jaun Elia", category: "attitude" },
    { _id: "f16", text: "Aaj kal main bohot udaas rehta hoon, Aaj kal main kisi se baat nahi karta.", poet: "Jaun Elia", category: "dard" },
    { _id: "f17", text: "Koi mujh tak nahi pohanchta hai, Is qadar faasla ho gaya hoon main.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f18", text: "Main jo hoon wo hoon, Aur jo nahi hoon wo ban nahi sakta.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f19", text: "Zindagi ek khwab hai, Aur khwab bhi adhoora hai.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f20", text: "Main bhi khush था kabhi, Ab to sirf yaadein reh gayi hain.", poet: "Jaun Elia", category: "dard" },
    { _id: "f21", text: "Dil ko kisi ki aadat ho gayi hai, Aur wo aadat bhi buri ho gayi hai.", poet: "Jaun Elia", category: "dard" },
    { _id: "f22", text: "Mohabbat kar ke dekha hai, Bas dard hi mila hai.", poet: "Jaun Elia", category: "love" },
    { _id: "f23", text: "Ab to khud se bhi baat nahi hoti, Itna tanha ho gaya hoon main.", poet: "Jaun Elia", category: "dard" },
    { _id: "f24", text: "Kuch log zindagi mein aise aate hain, Jo sirf dard de jaate hain.", poet: "Jaun Elia", category: "dard" },
    { _id: "f25", text: "Main kisi ka nahi raha, Aur koi mera nahi raha.", poet: "Jaun Elia", category: "dard" },
    { _id: "f26", text: "Ajeeb sa dard hai dil mein, Jo kisi ko samajh nahi aata.", poet: "Jaun Elia", category: "dard" },
    { _id: "f27", text: "Main toot chuka hoon andar se, Par muskura raha hoon bahar se.", poet: "Jaun Elia", category: "dard" },
    { _id: "f28", text: "Ab kisi se koi gila nahi, Bas khud se hi shikayat hai.", poet: "Jaun Elia", category: "dard" },
    { _id: "f29", text: "Zindagi se thak chuka hoon, Ab sukoon chahta hoon.", poet: "Jaun Elia", category: "philosophy" },
    { _id: "f30", text: "Main khud se hi haar gaya hoon, Aur ab jeetne ki himmat nahi.", poet: "Jaun Elia", category: "philosophy" }
  ];

  useEffect(() => {
    const fetchShayris = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/shayri/poet/${name}?pageNumber=${page}`);
        
        if (data.shayris && data.shayris.length > 0) {
          setShayris(data.shayris);
          setPages(data.pages);
        } else if (name === "Jaun Elia") {
          // If backend returns empty, use frontend fallback
          const pageSize = 4;
          setPages(Math.ceil(jaunFallback.length / pageSize));
          const startIndex = (page - 1) * pageSize;
          setShayris(jaunFallback.slice(startIndex, startIndex + pageSize));
        } else {
          setShayris([]);
          setPages(1);
        }
      } catch (error) {
        console.error('Error fetching shayris', error);
        if (name === "Jaun Elia") {
          const pageSize = 4;
          setPages(Math.ceil(jaunFallback.length / pageSize));
          const startIndex = (page - 1) * pageSize;
          setShayris(jaunFallback.slice(startIndex, startIndex + pageSize));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchShayris();
  }, [name, page]);

  return (
    <div className="space-y-12 pb-20">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {shayris.map((shayri, index) => (
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

          {/* Mirza Ghalib Advice Section (Last Page - Page 8 for 30 shayris) */}
          {name === "Mirza Ghalib" && page === 8 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-0.5 bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 rounded-[2.5rem] shadow-xl shadow-blue-100/50"
            >
              <div className="bg-white rounded-[2.45rem] p-10 md:p-12 text-center space-y-6 relative overflow-hidden">
                <Sparkles className="w-12 h-12 text-blue-500/10 absolute top-8 left-8" />
                <Sparkles className="w-12 h-12 text-blue-500/10 absolute bottom-8 right-8" />
                
                <div className="space-y-4">
                  <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.3em]">
                    Life Advice • Nasihat
                  </span>
                  <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">
                    "Eternal Wisdom"
                  </h2>
                </div>

                <div className="space-y-10 max-w-4xl mx-auto py-6">
                  <div className="space-y-3 group cursor-default">
                    <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                      "Aadmi ko bhi mayassar nahi insaan hona."
                    </p>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— True humanity is the ultimate pursuit</p>
                  </div>
                  
                  <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full" />
                  
                  <div className="space-y-3 group cursor-default">
                    <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                      "Dard minnat-kash-e-dawa na hua."
                    </p>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Finding strength within the struggle</p>
                  </div>
                </div>

                <p className="text-[10px] font-black text-blue-600/30 uppercase tracking-[0.5em] pt-6">
                  The Mirza Ghalib Legacy
                </p>
              </div>
            </motion.div>
          )}

          {/* Jaun Elia Legacy Section (Last Page - Page 8 for 30 shayris) */}
          {name === "Jaun Elia" && page === 8 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-0.5 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-400 rounded-[2.5rem] shadow-xl shadow-purple-100/50"
            >
              <div className="bg-white rounded-[2.45rem] p-10 md:p-12 text-center space-y-6 relative overflow-hidden">
                <Sparkles className="w-12 h-12 text-purple-500/10 absolute top-8 left-8" />
                <Sparkles className="w-12 h-12 text-purple-500/10 absolute bottom-8 right-8" />
                
                <div className="space-y-4">
                  <span className="px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-black uppercase tracking-[0.3em]">
                    Life Advice • Nasihat
                  </span>
                  <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">
                    "Deep Intellect"
                  </h2>
                </div>

                <div className="space-y-10 max-w-4xl mx-auto py-6">
                  <div className="space-y-3 group cursor-default">
                    <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-purple-600 transition-colors leading-tight">
                      "Main jo hoon wo hoon, Aur jo nahi hoon wo ban nahi sakta."
                    </p>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Self-acceptance and authenticity</p>
                  </div>
                  
                  <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full" />
                  
                  <div className="space-y-3 group cursor-default">
                    <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-purple-600 transition-colors leading-tight">
                      "Ab nahi koi baat khatre ki, Ab sabhi ko sabhi se khatra hai."
                    </p>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— The profound realization of modern isolation</p>
                  </div>
                </div>

                <p className="text-[10px] font-black text-purple-600/30 uppercase tracking-[0.5em] pt-6">
                  The Jaun Elia Legacy
                </p>
              </div>
            </motion.div>
          )}

          {pages > 1 && (
            <div className="flex justify-center items-center space-x-6 py-16">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-4 rounded-2xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-2">
                {[...Array(pages).keys()].map(x => (
                   <button
                    key={x + 1}
                    onClick={() => setPage(x + 1)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black transition-all ${
                      page === x + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-slate-100 hover:bg-slate-50 text-slate-400'
                    }`}
                   >
                     {x + 1}
                   </button>
                ))}
              </div>

              <button 
                onClick={() => setPage(p => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="p-4 rounded-2xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90 shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PoetPage;
