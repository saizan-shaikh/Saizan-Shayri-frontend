import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import ShayriCard from '../components/ShayriCard';

const ghalibData = [
  { _id: "650000000000000000001001", text: "Hazaron khwahishen aisi ke har khwahish pe dam nikle,\nBohat nikle mere armaan lekin phir bhi kam nikle.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001002", text: "Dil hi to hai na sang-o-khisht, dard se bhar na aaye kyun,\nRoyenge hum hazaar baar, koi humein sataye kyun.", poet: "Mirza Ghalib", category: "dard" },
  { _id: "650000000000000000001003", text: "Ishq par zor nahi hai ye wo aatish Ghalib,\nJo lagaye na lage aur bujhaye na bane.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001004", text: "Koi umeed bar nahi aati, koi surat nazar nahi aati,\nMaut ka ek din muayyan hai, neend kyun raat bhar nahi aati.", poet: "Mirza Ghalib", category: "dard" },
  { _id: "650000000000000000001005", text: "Ragon mein daudte phirne ke hum nahi qaayal,\nJab aankh hi se na tapka to phir lahu kya hai.", poet: "Mirza Ghalib", category: "attitude" },
  { _id: "650000000000000000001006", text: "Bas ke dushwar hai har kaam ka asaan hona,\nAadmi ko bhi mayassar nahi insaan hona.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001007", text: "Ye na thi hamari qismat ke visaal-e-yaar hota,\nAgar aur jeete rehte yahi intezaar hota.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001008", text: "Dil-e-nadaan tujhe hua kya hai,\nAakhir is dard ki dawa kya hai.", poet: "Mirza Ghalib", category: "dard" },
  { _id: "650000000000000000001009", text: "Ishq ne Ghalib nikamma kar diya,\nWarna hum bhi aadmi the kaam ke.", poet: "Mirza Ghalib", category: "attitude" },
  { _id: "650000000000000000001010", text: "Na tha kuch to khuda tha, kuch na hota to khuda hota,\nDuboya mujh ko hone ne, na hota main to kya hota.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001011", text: "Hain aur bhi duniya mein sukhanwar bahut achhe,\nKehte hain ke Ghalib ka hai andaaz-e-bayaan aur.", poet: "Mirza Ghalib", category: "attitude" },
  { _id: "650000000000000000001012", text: "Ye kahan ki dosti hai ke bane hain dost naseh,\nKoi chara saaz hota koi ghamgusar hota.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001013", text: "Humko maloom hai jannat ki haqeeqat lekin,\nDil ko khush rakhne ko Ghalib ye khayal achha hai.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001014", text: "Mohabbat mein nahi hai farq jeene aur marne ka,\nUsi ko dekh kar jeete hain jis kafir pe dam nikle.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001015", text: "Unke dekhe se jo aa jaati hai muh par raunaq,\nWo samajhte hain ke beemar ka haal achha hai.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001016", text: "Aaina kyun na doon ke tamaasha kahe jise,\nAisa kahan se laaun ke tujh sa kahe jise.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001017", text: "Qaid-e-hayat aur band-e-gham asl mein dono ek hain,\nMaut se pehle aadmi gham se nijaat paaye kyun.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001018", text: "Har ek baat pe kehte ho tum ke tu kya hai,\nTumhi kaho ke ye andaaz-e-guftagu kya hai.", poet: "Mirza Ghalib", category: "attitude" },
  { _id: "650000000000000000001019", text: "Wo aaye ghar mein hamare khuda ki qudrat hai,\nKabhi hum unko kabhi apne ghar ko dekhte hain.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001020", text: "Dard minnat-kash-e-dawa na hua,\nMain na achha hua bura na hua.", poet: "Mirza Ghalib", category: "dard" },
  { _id: "650000000000000000001021", text: "Ibn-e-maryam hua kare koi,\nMere dukh ki dawa kare koi.", poet: "Mirza Ghalib", category: "dard" },
  { _id: "650000000000000000001022", text: "Dil se teri nigah jigar tak utar gayi,\nDo hi mein thi ke teer nazar tak utar gayi.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001023", text: "Kahan maikada ka darwaza Ghalib aur kahan waiz,\nPar itna jaante hain kal wo jaata tha ke hum nikle.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001024", text: "Ishq mujh ko nahi wehshat hi sahi,\nMeri wehshat teri shohrat hi sahi.", poet: "Mirza Ghalib", category: "love" },
  { _id: "650000000000000000001025", text: "Phir mujhe deed-e-tar yaad aaya,\nDil jigar tashna-e-faryad aaya.", poet: "Mirza Ghalib", category: "dard" },
  { _id: "650000000000000000001026", text: "Hua jab gham se yun behis to gham kya sar ke katne ka,\nNa hota gar juda tan se to zaano par dhara hota.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001027", text: "Nikalna khuld se Adam ka sunte aaye hain lekin,\nBohat be-aabroo ho kar tere kuche se hum nikle.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001028", text: "Karz ki peete the mai lekin samajhte the ke haan,\nRang laayegi hamari faaqa-masti ek din.", poet: "Mirza Ghalib", category: "attitude" },
  { _id: "650000000000000000001029", text: "Ye masaail-e-tasawwuf ye tera bayan Ghalib,\nTujhe hum wali samajhte jo na baada-khwar hota.", poet: "Mirza Ghalib", category: "philosophy" },
  { _id: "650000000000000000001030", text: "Bana hai shah ka musahib phire hai itraata,\nWagarna shehar mein Ghalib ki aabroo kya hai.", poet: "Mirza Ghalib", category: "attitude" }
];

const poetImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAY4-74QC1sADfuhR3SGo_KB-3cE7j4UKUI9_6nMWtNA&s";

const GhalibPage = () => {
  const [shayris, setShayris] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const pages = Math.ceil(ghalibData.length / pageSize);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    setShayris(ghalibData.slice(startIndex, startIndex + pageSize));
  }, [page]);

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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Mirza Ghalib</h1>
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">Gems of Literature</p>
        </div>
      </div>

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
              <ShayriCard shayri={shayri} poetImage={poetImage} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {page === 8 && (
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
    </div>
  );
};

export default GhalibPage;
