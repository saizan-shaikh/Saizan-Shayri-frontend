import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import ShayriCard from '../components/ShayriCard';

const iqbalData = [
  { _id: "650000000000000000006001", text: "Mana ke main teri nazar ke laiq nahi,\nMagar meri lagan dekh, mera intezar dekh.", poet: "Allama Iqbal", category: "love" },
  { _id: "650000000000000000006002", text: "Khudi ko itna buland kar ke har taqdeer se pehle,\nKhuda khud pooche bata teri raza kya hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006003", text: "Parinda ki parwaaz gawah hai ke zindagi sirf koshish hai,\nAgar urhne ka jazba ho to aasman door nahi.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006004", text: "Sitare abhi parde me chhupe hue hain,\nTu kya jaane aage kya hone wala hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006005", text: "Ishq sukoon bhi hai aur zindagi bhi,\nAqal sawal karti hai aur ishq jawab deta hai.", poet: "Allama Iqbal", category: "love" },
  { _id: "650000000000000000006006", text: "Apne andar ki roshni ko mat chhupa aye musafir,\nDuniya ko roshan karne ke liye ye zaroori hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006007", text: "Be-parinda kabhi bulandi tak nahi pohanchta,\nIman kamzor ko bhi par de deta hai.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006008", text: "Jo khud ko pehchaan le wo badshah ban jata hai,\nJo khud ko na samjhe wo faqeer rehta hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006009", text: "Teri taqdeer toofanon me jeena hai,\nLehron se darna tera kaam nahi.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006010", text: "Aqal hamesha soch samajh kar chalti hai,\nMagar ishq bina dare aage badhta hai.", poet: "Allama Iqbal", category: "love" },
  { _id: "650000000000000000006011", text: "Tabdeeli hi asal zindagi hai,\nJo ruk gaya wo mar gaya.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006012", text: "Jo baat dil se nikalti hai wo asar karti hai,\nAur door tak pohanch jati hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006013", text: "Jannat aur dozakh jagah nahi hoti,\nYe insaan ke aamaal ka nateeja hote hain.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006014", text: "Asaan raasta mat maang,\nMushkil raaste par chalne ki taqat maang.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006015", text: "Mazhab humein nafrat sikhata nahi,\nHum sab ek hain aur insaniyat hi hamara watan hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006016", text: "Nazar ko badlo to nazare badal jaate hain,\nSoch ko badlo to sitare badal jaate hain.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006017", text: "Zindagi ka har pal ek naya sabaq hai,\nSeekhne wale ke liye har din ek naya panna hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006018", text: "Toofanon se aankh milao, sailabon par war karo,\nMallahon ka chakkar chhodo, tair ke darya par karo.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006019", text: "Waqt ke saanche mein dhalna hi zindagi nahi,\nWaqt ko apne saanche mein dhalna zindagi hai.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006020", text: "Hausle buland rakh, raste khud ban jayenge,\nJo log himmat karte hain, woh asmaan chho jayenge.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006021", text: "Utaar-charhao zindagi ka hissa hain,\nKamiyabi unhin ko milti hai jo rukte nahi.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006022", text: "Roshni ka talabgaar kabhi dar nahi sakta,\nAndhere mein nikalne se hi raasta milta hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006023", text: "Apne aibon ko dekh, doosron ke aib ko chhod,\nKhud ko sudharne mein hi asli bhalai hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006024", text: "Zameen par chalna seekh liya, ab asmaan apna,\nHauslon se udan bhar, har asmaan tera apna.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006025", text: "Zindagi mein kuch banna hai to samandar ban,\nLogon ke paaseine chhooth jaayen teri gehrai napte napte.", poet: "Allama Iqbal", category: "attitude" },
  { _id: "650000000000000000006026", text: "Sitaron se aage jahan aur bhi hain,\nAbhi ishq ke imtihaan aur bhi hain.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006027", text: "Na tu zameen ke liye hai na asmaan ke liye,\nJahan hai tere liye, tu nahi jahan ke liye.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006028", text: "Hazaaron saal nargis apni be-noori pe roti hai,\nBadi mushkil se hota hai chaman mein deedawar paida.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006029", text: "Dil se jo baat nikalti hai asar rakhti hai,\nPar nahi, taqat-e-parwaz magar rakhti hai.", poet: "Allama Iqbal", category: "philosophy" },
  { _id: "650000000000000000006030", text: "Amal se zindagi banti hai jannat bhi, jahannam bhi,\nYe khakee apni fitrat mein na noori hai na naari hai.", poet: "Allama Iqbal", category: "philosophy" }
];

const poetImage = "https://i.pinimg.com/474x/d2/7c/94/d27c9411ecf85794bb0c8f66a98248d9.jpg";

const IqbalPage = () => {
  const [shayris, setShayris] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const pages = Math.ceil(iqbalData.length / pageSize);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    setShayris(iqbalData.slice(startIndex, startIndex + pageSize));
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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Allama Iqbal</h1>
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
          className="mt-12 p-0.5 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-400 rounded-[2.5rem] shadow-xl shadow-green-100/50"
        >
          <div className="bg-white rounded-[2.45rem] p-10 md:p-12 text-center space-y-6 relative overflow-hidden">
            <Sparkles className="w-12 h-12 text-green-500/10 absolute top-8 left-8" />
            <Sparkles className="w-12 h-12 text-green-500/10 absolute bottom-8 right-8" />
            
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-[0.3em]">
                Life Advice • Nasihat
              </span>
              <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">
                "Philosophical Vision"
              </h2>
            </div>

            <div className="space-y-10 max-w-4xl mx-auto py-6">
              <div className="space-y-3 group cursor-default">
                <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-green-600 transition-colors leading-tight">
                  "Khudi ko itna buland kar ke har taqdeer se pehle..."
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Elevate your self-worth above destiny</p>
              </div>
              
              <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full" />
              
              <div className="space-y-3 group cursor-default">
                <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-green-600 transition-colors leading-tight">
                  "Amal se zindagi banti hai jannat bhi, jahannam bhi."
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— Action determines the fate of existence</p>
              </div>
            </div>

            <p className="text-[10px] font-black text-green-600/30 uppercase tracking-[0.5em] pt-6">
              The Allama Iqbal Legacy
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

export default IqbalPage;
