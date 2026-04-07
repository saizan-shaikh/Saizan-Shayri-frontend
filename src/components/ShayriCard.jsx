import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Copy, Download, Edit3, Trash2 } from 'lucide-react';
import { transliterate } from '../utils/transliterate';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../config/api';

const poetImages = {
  "Mirza Ghalib": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAY4-74QC1sADfuhR3SGo_KB-3cE7j4UKUI9_6nMWtNA&s",
  "Jaun Elia": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7QeVH86M7ZZyFKFxgkkfUnsN1PvxYnYHciqhmZON7JQ&s",
  "Rahat Indori": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThKYeSDNDOdRcLeQYZhaLlRnAVF2f_a3Bi4w&s",
  "Allama Iqbal": "https://i.pinimg.com/474x/d2/7c/94/d27c9411ecf85794bb0c8f66a98248d9.jpg",
  "Faiz Ahmed Faiz": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSlgGqsehRG1eYOqQDEdj1KXBjTWmipbbu5w&s",
  "Mir Taqi Mir": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TQe0vTTn7mJ_cZZbdLx7RBAMhlG0nY4iTAEWTR4kJQ&s"
};

const ShayriCard = ({ shayri, poetImage, isFavoritePage, onDelete }) => {
  const [lang, setLang] = useState('roman'); // roman, hindi, urdu
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();
  
  const isFavorite = favorites.some(fav => fav._id === shayri._id || fav.text === shayri.text);
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this shayri? This action is permanent.')) {
      try {
        await axios.delete(`${BASE_URL}/admin/shayri/${shayri._id}`);
        toast.success('Shayri deleted successfully');
        if (onDelete) onDelete(shayri._id);
      } catch (error) {
        toast.error('Failed to delete shayri');
      }
    }
  };

  useEffect(() => {
    const trackView = async () => {
      try {
        await axios.put(`${BASE_URL}/shayri/${shayri._id}/view`);
      } catch (error) {
        // Silent fail for tracking
      }
    };
    trackView();
  }, [shayri._id]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="glass rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col justify-between h-full bg-white/80 min-h-[400px] group"
    >
      <div className="space-y-3 md:space-y-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start flex-shrink-0">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-slate-100">
             <img 
              src={displayImage} 
              alt={shayri.poet} 
              onError={(e) => { e.target.src = "https://via.placeholder.com/200x200?text=Poet" }}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              {isFavoritePage && (
                <button 
                  onClick={() => removeFromFavorites(shayri._id)}
                  className="bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold transition-all shadow-sm"
                >
                  ❌ <span className="hidden xs:inline">Remove</span>
                </button>
              )}
              
              {!isFavoritePage && (
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => navigate(`/edit-shayri/${shayri._id}`)}
                    className="p-1.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors shadow-sm"
                    title="Edit Shayri"
                  >
                    <Edit3 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-1.5 rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-colors shadow-sm"
                    title="Delete Shayri"
                  >
                    <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                  <button 
                    onClick={() => isFavorite ? removeFromFavorites(shayri._id) : addToFavorites(shayri)}
                    className={`p-1.5 rounded-xl transition-all border shadow-sm ${isFavorite ? 'bg-red-50 border-red-100 text-red-500' : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-red-400'}`}
                    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex bg-slate-50 rounded-md p-0.5 md:p-1 border border-slate-100 scale-[0.8] md:scale-90 origin-right">
              {['roman', 'hindi', 'urdu'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 md:px-2 py-0.5 text-[8px] md:text-[9px] rounded transition-all capitalize font-bold ${
                    lang === l ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {l.charAt(0)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex-grow flex items-center justify-center text-center px-2 overflow-hidden py-3 md:py-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={lang}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`text-sm sm:text-base md:text-xl font-bold tracking-tight leading-loose text-slate-800 ${lang === 'urdu' ? 'font-serif' : ''} text-center w-full break-words overflow-wrap-anywhere`}
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
