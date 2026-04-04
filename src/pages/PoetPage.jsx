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
        const { data } = await axios.get(`https://saizan-shayri-backend.onrender.com/api/shayri/poet/${name}?pageNumber=${page}`);

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
