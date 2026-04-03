import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import ShayriCard from '../components/ShayriCard';

const rahatData = [
  { _id: "650000000000000000003001", text: "Bulati hai magar jaane ka nahi,\nYe duniya hai idhar jaane ka nahi.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003002", text: "Kisi ke baap ka Hindustan thodi hai,\nJo tum ho to kya hua ye watan tumhara thodi hai.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003003", text: "Sabhi ka khoon hai shaamil yahan ki mitti mein,\nKisi ke baap ka Hindustan thodi hai.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003004", text: "Aankh mein pani rakho honton pe chingari rakho,\nZinda rehna hai to tarkeebein bohot saari rakho.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003005", text: "Jo aaj sahib-e-masnad hain kal nahi honge,\nKirayedaar hain zaati makan thodi hai.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003006", text: "Sarhadon par bohot tanav hai kya,\nKuch pata to karo chunav hai kya.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003007", text: "Naye kirdaar aate ja rahe hain,\nMagar natak purana chal raha hai.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003008", text: "Main jab mar jaun to meri alag pehchaan likh dena,\nLahu se meri peshani pe Hindustan likh dena.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003009", text: "Lagta hai ke ab kuch badalne wala hai,\nYe hawa ka rukh bhi badalne wala hai.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003010", text: "Har ek baat pe kehte ho tum ke tu kya hai,\nTumhi kaho ke ye andaaz-e-guftagu kya hai.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003011", text: "Roz taaron ko numaish mein khalal padta hai,\nChand pagal hai andhere mein nikal padta hai.", poet: "Rahat Indori", category: "love" },
  { _id: "650000000000000000003012", text: "Main ne apni khushk aankhon se lahu chhalka diya,\nEk samandar keh raha tha mujh ko pani chahiye.", poet: "Rahat Indori", category: "dard" },
  { _id: "650000000000000000003013", text: "Zameen jal rahi hai aasman bhi jal raha hai,\nYe kaisa waqt hai insaan bhi jal raha hai.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003014", text: "Dosti jab kisi se ki jaaye,\nDushmanon ki bhi raaye li jaaye.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003015", text: "Log har mod pe ruk ruk ke sambhalte kyun hain,\nItna darte hain to phir ghar se nikalte kyun hain.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003016", text: "Aaj hum dono ko fursat hai chalo ishq karein,\nIshq dono ki zarurat hai chalo ishq karein.", poet: "Rahat Indori", category: "love" },
  { _id: "650000000000000000003017", text: "Main ne apni zindagi ka safar yun hi nahi kiya,\nHar mod pe kuch seekha hai kuch khona pada hai.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003018", text: "Kabhi mehkega ye gulshan bhi baharon ki tarah,\nAaj ke baad ye mausam nahi rehne wala.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003019", text: "Main ne har dard ko dil se lagaya hai,\nTab kahin jaake ye andaaz banaya hai.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003020", text: "Jo log yahan se guzarte hain nishaan chhod jaate hain,\nKuch yaadein ban jaate hain kuch kahani ban jaate hain.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003021", text: "Dil mein junoon ho to raaste khud ban jaate hain,\nVarna har mod pe insaan ruk jaata hai.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003022", text: "Har ek chehra yahan pehchaan ka mohtaj hai,\nIs shehar mein har xakhs thoda sa akela hai.", poet: "Rahat Indori", category: "dard" },
  { _id: "650000000000000000003023", text: "Sach bolne ki aadat mehngi padti hai,\nLog jhooth sunna zyada pasand karte hain.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003024", text: "Zindagi ki raah mein mushkilein to aayengi,\nPar hausla ho to manzil mil hi jaati hai.", poet: "Rahat Indori", category: "attitude" },
  { _id: "650000000000000000003025", text: "Dil ko sambhalna bhi ek hunar hai,\nHar koi is ka kaam nahi karta.", poet: "Rahat Indori", category: "dard" },
  { _id: "650000000000000000003026", text: "Mohabbat mein har cheez hasil nahi hoti,\nKabhi kabhi sirf yaadein reh jaati hain.", poet: "Rahat Indori", category: "love" },
  { _id: "650000000000000000003027", text: "Waqt ke saath log badal jaate hain,\nPar kuch zakhm kabhi nahi bharte.", poet: "Rahat Indori", category: "dard" },
  { _id: "650000000000000000003028", text: "Har kisi ko apni kahani sunani hoti hai,\nPar sunne wala koi nahi hota.", poet: "Rahat Indori", category: "dard" },
  { _id: "650000000000000000003029", text: "Zindagi ek kitaab hai jise samajhna mushkil hai,\nHar panna ek naya imtihaan hota hai.", poet: "Rahat Indori", category: "philosophy" },
  { _id: "650000000000000000003030", text: "Insaan ko pehchanna asaan nahi hota,\nHar chehra ek naya raaz chhupa hota hai.", poet: "Rahat Indori", category: "philosophy" }
];

const poetImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThKYeSDNDOdRcLeQYZhaLlRnAVF2f_a3Bi4w&s";

const RahatPage = () => {
  const [shayris, setShayris] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const pages = Math.ceil(rahatData.length / pageSize);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    setShayris(rahatData.slice(startIndex, startIndex + pageSize));
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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Rahat Indori</h1>
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
          className="mt-12 p-0.5 bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 rounded-[2.5rem] shadow-xl shadow-red-100/50"
        >
          <div className="bg-white rounded-[2.45rem] p-10 md:p-12 text-center space-y-6 relative overflow-hidden">
            <Sparkles className="w-12 h-12 text-red-500/10 absolute top-8 left-8" />
            <Sparkles className="w-12 h-12 text-red-500/10 absolute bottom-8 right-8" />
            
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase tracking-[0.3em]">
                Life Advice • Nasihat
              </span>
              <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">
                "Fiery Spirit"
              </h2>
            </div>

            <div className="space-y-10 max-w-4xl mx-auto py-6">
              <div className="space-y-3 group cursor-default">
                <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-red-500 transition-colors leading-tight">
                  "Aankh mein pani rakho honton pe chingari rakho..."
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Keep compassion in your eyes, but fire on your lips</p>
              </div>
              
              <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full" />
              
              <div className="space-y-3 group cursor-default">
                <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-red-500 transition-colors leading-tight">
                  "Log har mod pe ruk ruk ke sambhalte kyun hain."
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Why fear the journey when you've already stepped out?</p>
              </div>
            </div>

            <p className="text-[10px] font-black text-red-600/30 uppercase tracking-[0.5em] pt-6">
              The Rahat Indori Legacy
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

export default RahatPage;
