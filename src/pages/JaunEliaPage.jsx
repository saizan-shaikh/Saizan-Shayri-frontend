import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import ShayriCard from '../components/ShayriCard';

const jaunEliaData = [
  { _id: "650000000000000000002001", text: "Main bhi bohot ajeeb hoon itna ajeeb hoon ke bas,\nKhud ko tabaah kar liya aur malaal bhi nahi.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002002", text: "Ab nahi koi baat khatre ki,\nAb sabhi ko sabhi se khatra hai.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002003", text: "Tum mera naam kyun nahi leti,\nMujh se milne kyun nahi aati.", poet: "Jaun Elia", category: "love" },
  { _id: "650000000000000000002004", text: "Kya sitam hai ke ab teri surat,\nGhaur karne pe yaad aati hai.", poet: "Jaun Elia", category: "love" },
  { _id: "650000000000000000002005", text: "Hum kahan ke dana the kis hunar mein yakta the,\nBe-sabab dushman hua aasman apna.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002006", text: "Zindagi kis tarah basar hogi,\nDil nahi lag raha mohabbat mein.", poet: "Jaun Elia", category: "love" },
  { _id: "650000000000000000002007", text: "Ek hi hadsa to hai aur wo ye ke aaj tak,\nBaat nahi kahi gayi baat nahi suni gayi.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002008", text: "Kitne aish se rehte honge kitne itraate honge,\nJaane kaise log wo honge jo usko bhaate honge.", poet: "Jaun Elia", category: "love" },
  { _id: "650000000000000000002009", text: "Ab to har baat yaad rehti hai,\nGhalat aur sahi ka kya karna.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002010", text: "Shayad mujhe kisi se mohabbat nahi hui,\nLekin yaqeen sab ko dilata raha hoon main.", poet: "Jaun Elia", category: "attitude" },
  { _id: "650000000000000000002011", text: "Main bhi bohot ajeeb hoon itna ajeeb hoon ke bas,\nKhud ko tabaah kar liya aur malaal bhi nahi.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002012", text: "Kisi se koi bhi umeed rakhna,\nYeh sab se bada dhoka hai.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002013", text: "Dil ki takleef kam nahi hoti,\nAb koi marham bhi nahi milta.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002014", text: "Mujh se mil kar udaas kyun hai,\nKya mujhe pehchaan liya hai.", poet: "Jaun Elia", category: "love" },
  { _id: "650000000000000000002015", text: "Main ne maana ke kuch nahi hoon main,\nPhir bhi tujh se kam nahi hoon main.", poet: "Jaun Elia", category: "attitude" },
  { _id: "650000000000000000002016", text: "Aaj kal main bohot udaas rehta hoon,\nAaj kal main kisi se baat nahi karta.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002017", text: "Koi mujh tak nahi pohanchta hai,\nIs qadar faasla ho gaya hoon main.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002018", text: "Main jo hoon wo hoon,\nAur jo nahi hoon wo ban nahi sakta.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002019", text: "Zindagi ek khwab hai,\nAur khwab bhi adhoora hai.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002020", text: "Main bhi khush था kabhi,\nAb to sirf yaadein reh gayi hain.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002021", text: "Dil ko kisi ki aadat ho gayi hai,\nAur wo aadat bhi buri ho gayi hai.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002022", text: "Mohabbat kar ke dekha hai,\nBas dard hi mila hai.", poet: "Jaun Elia", category: "love" },
  { _id: "650000000000000000002023", text: "Ab to khud se bhi baat nahi hoti,\nItna tanha ho gaya hoon main.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002024", text: "Kuch log zindagi mein aise aate hain,\nJo sirf dard de jaate hain.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002025", text: "Main kisi ka nahi raha,\nAur koi mera nahi raha.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002026", text: "Ajeeb sa dard hai dil mein,\nJo kisi ko samajh nahi aata.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002027", text: "Main toot chuka hoon andar se,\nPar muskura raha hoon bahar se.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002028", text: "Ab kisi se koi gila nahi,\nBas khud se hi shikayat hai.", poet: "Jaun Elia", category: "dard" },
  { _id: "650000000000000000002029", text: "Zindagi se thak chuka hoon,\nAb sukoon chahta hoon.", poet: "Jaun Elia", category: "philosophy" },
  { _id: "650000000000000000002030", text: "Main khud se hi haar gaya hoon,\nAur ab jeetne ki himmat nahi.", poet: "Jaun Elia", category: "philosophy" }
];

const poetImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7QeVH86M7ZZyFKFxgkkfUnsN1PvxYnYHciqhmZON7JQ&s";

const JaunEliaPage = () => {
  const [shayris, setShayris] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const pages = Math.ceil(jaunEliaData.length / pageSize);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    setShayris(jaunEliaData.slice(startIndex, startIndex + pageSize));
  }, [page]);

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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Jaun Elia</h1>
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">Gems of Literature</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
        <AnimatePresence mode="popLayout">
          {shayris.map((shayri, index) => (
            <motion.div
              key={shayri._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <ShayriCard shayri={shayri} poetImage={poetImage} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {page === 8 && (
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
        <div className="flex justify-center items-center space-x-3 md:space-x-6 py-12 md:py-16">
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
    </div>
  );
};

export default JaunEliaPage;
