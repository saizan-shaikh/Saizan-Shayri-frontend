import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Copy, Download, Share2, Globe } from 'lucide-react';
import { transliterate } from '../utils/transliterate';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'react-toastify';

const poetImages = {
  "Mirza Ghalib": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAY4-74QC1sADfuhR3SGo_KB-3cE7j4UKUI9_6nMWtNA&s",
  "Jaun Elia": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7QeVH86M7ZZyFKFxgkkfUnsN1PvxYnYHciqhmZON7JQ&s",
  "Rahat Indori": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThKYeSDNDOdRcLeQYZhaLlRnAVF2f_a3Bi4w&s",
  "Allama Iqbal": "https://i.pinimg.com/474x/d2/7c/94/d27c9411ecf85794bb0c8f66a98248d9.jpg",
  "Faiz Ahmed Faiz": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSlgGqsehRG1eYOqQDEdj1KXBjTWmipbbu5w&s",
  "Mir Taqi Mir": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TQe0vTTn7mJ_cZZbdLx7RBAMhlG0nY4iTAEWTR4kJQ&s"
};

const ShayriCard = ({ shayri, poetImage, isFavoritePage }) => {
  const [lang, setLang] = useState('roman'); // roman, hindi, urdu
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav._id === shayri._id);
  const displayImage = poetImage || poetImages[shayri.poet] || "https://via.placeholder.com/200x200?text=Poet";

  const handleCopy = () => {
    const textToCopy = transliterate(shayri.text, lang);
    navigator.clipboard.writeText(textToCopy);
    toast.success('Shayri copied to clipboard!');
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([transliterate(shayri.text, lang)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${shayri.poet}_shayri.txt`;
    document.body.appendChild(element);
    element.click();
    toast.info('Downloading Shayri...');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col justify-between h-full bg-white/70 aspect-square md:aspect-auto"
    >
      <div className="space-y-2 md:space-y-3 flex-grow flex flex-col">
        <div className="flex justify-between items-start flex-shrink-0">
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-slate-100">
            <img 
              src={displayImage} 
              alt={shayri.poet} 
              onError={(e) => { e.target.src = "https://via.placeholder.com/200x200?text=Poet" }}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="flex flex-col items-end space-y-2">
            {isFavoritePage ? (
               <button 
                onClick={() => removeFromFavorites(shayri._id)}
                className="bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold transition-all shadow-sm"
               >
                 ❌ <span className="hidden xs:inline">Remove</span>
               </button>
            ) : (
               <button 
                onClick={() => isFavorite ? removeFromFavorites(shayri._id) : addToFavorites(shayri)}
                className={`p-1.5 rounded-xl transition-all border ${isFavorite ? 'bg-red-50 border-red-100 text-red-500' : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-red-400'}`}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
               >
                <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isFavorite ? 'fill-current' : ''}`} />
               </button>
            )}
            <div className="flex bg-slate-50 rounded-md p-0.5 md:p-1 border border-slate-100 scale-[0.8] md:scale-90 origin-right">
              {['roman', 'hindi', 'urdu'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1 md:px-1.5 py-0.5 text-[8px] md:text-[9px] rounded transition-all capitalize font-bold ${
                    lang === l ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {l.charAt(0)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex-grow flex items-center justify-center text-center px-1 overflow-hidden py-2 md:py-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={lang}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`text-xs sm:text-sm md:text-base font-bold tracking-tight leading-relaxed text-slate-800 ${lang === 'urdu' ? 'font-serif' : ''} text-center w-full line-clamp-4 md:line-clamp-none`}
              dir={lang === 'urdu' ? 'rtl' : 'ltr'}
            >
              {transliterate(shayri.text, lang)}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 md:pt-3 mt-2 md:mt-3 border-t border-slate-100/50 flex-shrink-0">
        <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[60%]">{shayri.poet}</span>
        <div className="flex items-center space-x-1">
          <button 
            onClick={handleCopy}
            className="p-1 rounded-md bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90"
            title="Copy"
          >
            <Copy className="w-3 md:w-3.5 h-3 md:h-3.5" />
          </button>
          <button 
            onClick={handleDownload}
            className="p-1 rounded-md bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90"
            title="Save"
          >
            <Download className="w-3 md:w-3.5 h-3 md:h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShayriCard;
