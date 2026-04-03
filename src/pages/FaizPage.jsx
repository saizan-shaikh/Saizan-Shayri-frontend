import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import ShayriCard from '../components/ShayriCard';

const faizData = [
  { _id: "650000000000000000004001", text: "Gulon mein rang bhare baad-e-naubahar chale,\nChale bhi aao ke gulshan ka karobar chale.", poet: "Faiz Ahmed Faiz", category: "love" },
  { _id: "650000000000000000004002", text: "Bol ke lab azaad hain tere,\nBol zubaan ab tak teri hai.", poet: "Faiz Ahmed Faiz", category: "attitude" },
  { _id: "650000000000000000004003", text: "Mujh se pehli si mohabbat mere mehboob na maang,\nMaine samjha tha ke tu hai to darakhshaan hai hayat.", poet: "Faiz Ahmed Faiz", category: "love" },
  { _id: "650000000000000000004004", text: "Raat yun dil mein teri khoi hui yaad aayi,\nJaise veerane mein chupke se bahaar aa jaye.", poet: "Faiz Ahmed Faiz", category: "love" },
  { _id: "650000000000000000004005", text: "Hum dekhenge lazim hai ke hum bhi dekhenge,\nWo din ke jiska wada hai jo lauh-e-azal pe likha hai.", poet: "Faiz Ahmed Faiz", category: "attitude" },
  { _id: "650000000000000000004006", text: "Aur bhi dukh hain zamane mein mohabbat ke siwa,\nRaahatein aur bhi hain wasl ki raahat ke siwa.", poet: "Faiz Ahmed Faiz", category: "philosophy" },
  { _id: "650000000000000000004007", text: "Nisar main teri galiyon ke ae watan ke jahan,\nChali hai rasm ke koi na sar utha ke chale.", poet: "Faiz Ahmed Faiz", category: "attitude" },
  { _id: "650000000000000000004008", text: "Dil na-umeed to nahi nakaam hi to hai,\nLambi hai gham ki shaam magar shaam hi to hai.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004009", text: "Kab yaad mein tera saath nahi, kab haath mein tera haath nahi,\nSadiyon se tanha rehte hain hum phir bhi tujh se mulaqat nahi.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004010", text: "Mat pooch ke kya haal hai mera tere peeche,\nTu dekh ke kya rang hai tera mere aage.", poet: "Faiz Ahmed Faiz", category: "love" },
  { _id: "650000000000000000004011", text: "Chand nikle kisi jaanib teri zebaai ka,\nRang badle kisi surat shab-e-tanhai ka.", poet: "Faiz Ahmed Faiz", category: "love" },
  { _id: "650000000000000000004012", text: "Teri aankhon ke siwa duniya mein rakha kya hai,\nYe uthe subah chale ye jhuke shaam dhale.", poet: "Faiz Ahmed Faiz", category: "love" },
  { _id: "650000000000000000004013", text: "Gar baazi ishq ki baazi hai jo chaho laga do dar kaisa,\nGar jeet gaye to kya kehna haare bhi to baazi maat nahi.", poet: "Faiz Ahmed Faiz", category: "attitude" },
  { _id: "650000000000000000004014", text: "Wo baat saare fasane mein jiska zikr na tha,\nWo baat unko bohot nagawar guzri hai.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004015", text: "Dil mein ab yun tere bhoole hue gham aate hain,\nJaise bichhde hue kaabe mein sanam aate hain.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004016", text: "Aaye kuch abr kuch sharaab aaye,\nIs ke baad aaye jo azaab aaye.", poet: "Faiz Ahmed Faiz", category: "philosophy" },
  { _id: "650000000000000000004017", text: "Tum aaye ho na shab-e-intezar guzri hai,\nTalash mein hai sahar bar bar guzri hai.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004018", text: "Yeh daagh daagh ujala yeh shab-gazida sahar,\nWo intezar tha jiska yeh wo sahar to nahi.", poet: "Faiz Ahmed Faiz", category: "philosophy" },
  { _id: "650000000000000000004019", text: "Na gul khile hain na un se mile na mai pi hai,\nAjeeb rang mein ab ke bahaar guzri hai.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004020", text: "Aaj bazaar mein pa-bajaulan chalo,\nDast-afshan chalo mast-o-raqsan chalo.", poet: "Faiz Ahmed Faiz", category: "attitude" },
  { _id: "650000000000000000004021", text: "Dil ke sheeshe mein basi yaadon ka andhera hai,\nRoshni bhi ho to lagta hai ujala kam hai.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004022", text: "Har taraf dard ka saaya hai magar phir bhi,\nZindagi jeene ka ek chhota sa sahara hai.", poet: "Faiz Ahmed Faiz", category: "philosophy" },
  { _id: "650000000000000000004023", text: "Waqt ke saath sab kuch badal jaata hai,\nPar kuch dard dil mein hamesha rehta hai.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004024", text: "Mohabbat bhi ajeeb cheez hai Faiz,\nJitni milti hai utni hi kam lagti hai.", poet: "Faiz Ahmed Faiz", category: "love" },
  { _id: "650000000000000000004025", text: "Dil ko samjhaya bohot par ye nahi maanta,\nHar baar tera hi naam leta hai.", poet: "Faiz Ahmed Faiz", category: "love" },
  { _id: "650000000000000000004026", text: "Yaadon ka silsila rukta hi nahi,\nDil ka safar kahin thakta hi nahi.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004027", text: "Har shaam udaasi lekar aati hai,\nHar raat teri yaad dilati hai.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004028", text: "Zindagi se gila bhi hai aur shikwa bhi,\nPar tere bina jeene ka hausla bhi nahi.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004029", text: "Dil ke zakhmon ka hisaab kaun kare,\nHar ek dard ka jawab kaun kare.", poet: "Faiz Ahmed Faiz", category: "dard" },
  { _id: "650000000000000000004030", text: "Hum ne maana ke badal jaate hain log,\nPar तुम badal jaoge ye socha na tha.", poet: "Faiz Ahmed Faiz", category: "dard" }
];

const poetImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSlgGqsehRG1eYOqQDEdj1KXBjTWmipbbu5w&s";

const FaizPage = () => {
  const [shayris, setShayris] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const pages = Math.ceil(faizData.length / pageSize);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    setShayris(faizData.slice(startIndex, startIndex + pageSize));
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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Faiz Ahmed Faiz</h1>
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">Gems of Literature</p>
        </div>
      </div>

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
              <ShayriCard shayri={shayri} poetImage={poetImage} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {page === 8 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-0.5 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400 rounded-[2.5rem] shadow-xl shadow-teal-100/50"
        >
          <div className="bg-white rounded-[2.45rem] p-10 md:p-12 text-center space-y-6 relative overflow-hidden">
            <Sparkles className="w-12 h-12 text-teal-500/10 absolute top-8 left-8" />
            <Sparkles className="w-12 h-12 text-teal-500/10 absolute bottom-8 right-8" />
            
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 text-xs font-black uppercase tracking-[0.3em]">
                Life Advice • Nasihat
              </span>
              <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">
                "Revolutionary Love"
              </h2>
            </div>

            <div className="space-y-10 max-w-4xl mx-auto py-6">
              <div className="space-y-3 group cursor-default">
                <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-teal-600 transition-colors leading-tight">
                  "Aur bhi dukh hain zamane mein mohabbat ke siwa."
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Look beyond personal sorrow to the world's pain</p>
              </div>
              
              <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full" />
              
              <div className="space-y-3 group cursor-default">
                <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-teal-600 transition-colors leading-tight">
                  "Dil na-umeed to nahi nakaam hi to hai."
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Defeat is temporary, hold onto hope</p>
              </div>
            </div>

            <p className="text-[10px] font-black text-teal-600/30 uppercase tracking-[0.5em] pt-6">
              The Faiz Ahmed Faiz Legacy
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
    </div>
  );
};

export default FaizPage;
