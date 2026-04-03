import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import ShayriCard from '../components/ShayriCard';

const mirData = [
  { _id: "650000000000000000005001", text: "Patta patta boota boota haal hamara jaane hai,\nJaane na jaane gul hi na jaane baagh to sara jaane hai.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005002", text: "Ibtida-e-ishq hai rota hai kya,\nAage aage dekhiye hota hai kya.", poet: "Mir Taqi Mir", category: "philosophy" },
  { _id: "650000000000000000005003", text: "Mir ke deen-o-mazhab ko ab poochte kya ho un ne to,\nKashka khencha dair mein baitha kab ka tark Islam kiya.", poet: "Mir Taqi Mir", category: "attitude" },
  { _id: "650000000000000000005004", text: "Dikhai diye yun ke be-khud kiya,\nHumein aap se bhi juda kar chale.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005005", text: "Ishq ek Mir bhari pathar hai,\nKab dil-e-na-tawan se uthta hai.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005006", text: "Aashiqi sabr talab aur tamanna betaab,\nDil ka kya rang karoon khoon-e-jigar hone tak.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005007", text: "Ulti ho gayi sab tadbeerein kuch na dawa ne kaam kiya,\nDekha is beemari-e-dil ne aakhir kaam tamaam kiya.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005008", text: "Dil ki veerani ka kya mazkoor hai,\nYe nagar sau martaba loota gaya.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005009", text: "Jis sar ko ghuroor aaj hai yaan tajwari ka,\nKal us pe yahin shor hai phir nauha-gari ka.", poet: "Mir Taqi Mir", category: "philosophy" },
  { _id: "650000000000000000005010", text: "Faqeerana aaye sada kar chale,\nMiyan khush raho hum dua kar chale.", poet: "Mir Taqi Mir", category: "attitude" },
  { _id: "650000000000000000005011", text: "Chalte ho to chaman ko chaliye kehte hain,\nHum to nahi kehte magar log kehte hain.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005012", text: "Aah ko chahiye ek umr asar hone tak,\nKaun jeeta hai teri zulf ke sar hone tak.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005013", text: "Hum hue tum hue ke Mir hue,\nUs ki zulfon ke sab aseer hue.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005014", text: "Karta hai ishq dil ko tabaah,\nIs se bachna koi aasaan nahi.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005015", text: "Ye ishq nahi aasaan itna hi samajh lijiye,\nEk aag ka dariya hai aur doob ke jaana hai.", poet: "Mir Taqi Mir", category: "philosophy" },
  { _id: "650000000000000000005016", text: "Dil se rukhsat hui koi hasrat,\nGiriya kuch be-sabab nahi aata.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005017", text: "Kuch to hote hain mohabbat mein junoon ke asar,\nAur kuch log bhi deewana bana dete hain.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005018", text: "Har ek baat pe kehte ho tum ke tu kya hai,\nTumhi kaho ke ye andaaz-e-guftagu kya hai.", poet: "Mir Taqi Mir", category: "attitude" },
  { _id: "650000000000000000005019", text: "Hum ne maana ke taghaful na karoge lekin,\nKhaak ho jayenge hum tum ko khabar hone tak.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005020", text: "Ab ke hum bichhde to shayad kabhi khwabon mein milein,\nJis tarah sookhe hue phool kitaabon mein milein.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005021", text: "Dil hi to hai na sang-o-khisht dard se bhar na aaye kyun,\nRoyenge hum hazaar baar koi humein sataye kyun.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005022", text: "Kisi ko de ke dil koi nava-sanje-fughan kyun ho,\nNa ho jab dil hi seene mein to phir muh mein zubaan kyun ho.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005023", text: "Zakhm dil ka bhar gaya lekin nishaan baqi raha,\nZindagi bhar ek yaad ka samaan baqi raha.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005024", text: "Dil ka kya rang karoon khoon-e-jigar hone tak,\nAah ko chahiye ek umr asar hone tak.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005025", text: "Naazuki us ke lab ki kya kahiye,\nPankhuri ek gulaab ki si hai.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005026", text: "Kya kahun tum se main ke kya hai ishq,\nJaan ka rog hai bala hai ishq.", poet: "Mir Taqi Mir", category: "dard" },
  { _id: "650000000000000000005027", text: "Hum ko un se wafa ki hai umeed,\nJo nahi jaante wafa kya hai.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005028", text: "Ye na thi hamari qismat ke visaal-e-yaar hota,\nAgar aur jeete rehte yahi intezaar hota.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005029", text: "Raat yun dil mein teri khoi hui yaad aayi,\nJaise veerane mein chupke se bahaar aa jaye.", poet: "Mir Taqi Mir", category: "love" },
  { _id: "650000000000000000005030", text: "Bas ke dushwar hai har kaam ka asaan hona,\nAadmi ko bhi mayassar nahi insaan hona.", poet: "Mir Taqi Mir", category: "philosophy" }
];

const poetImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TQe0vTTn7mJ_cZZbdLx7RBAMhlG0nY4iTAEWTR4kJQ&s";

const MirPage = () => {
  const [shayris, setShayris] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const pages = Math.ceil(mirData.length / pageSize);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    setShayris(mirData.slice(startIndex, startIndex + pageSize));
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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Mir Taqi Mir</h1>
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
          className="mt-12 p-0.5 bg-gradient-to-br from-rose-600 via-red-500 to-orange-400 rounded-[2.5rem] shadow-xl shadow-rose-100/50"
        >
          <div className="bg-white rounded-[2.45rem] p-10 md:p-12 text-center space-y-6 relative overflow-hidden">
            <Sparkles className="w-12 h-12 text-rose-500/10 absolute top-8 left-8" />
            <Sparkles className="w-12 h-12 text-rose-500/10 absolute bottom-8 right-8" />
            
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-[0.3em]">
                Life Advice • Nasihat
              </span>
              <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">
                "Classical Sorrow"
              </h2>
            </div>

            <div className="space-y-10 max-w-4xl mx-auto py-6">
              <div className="space-y-3 group cursor-default">
                <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-rose-500 transition-colors leading-tight">
                  "Ibtida-e-ishq hai rota hai kya..."
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— If the beginning brings tears, brace for the journey</p>
              </div>
              
              <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full" />
              
              <div className="space-y-3 group cursor-default">
                <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-rose-500 transition-colors leading-tight">
                  "Faqeerana aaye sada kar chale."
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Walk through this world with the detachment of a mystic</p>
              </div>
            </div>

            <p className="text-[10px] font-black text-rose-600/30 uppercase tracking-[0.5em] pt-6">
              The Mir Taqi Mir Legacy
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

export default MirPage;
