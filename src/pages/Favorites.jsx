import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen } from 'lucide-react';
import ShayriCard from '../components/ShayriCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-12">
      <div className="flex flex-col space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">My <span className="text-blue-600">Treasured</span> Verses</h1>
          <p className="text-slate-500 font-medium">Your curated collection of profound emotions and timeless wisdom.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="h-96 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center space-y-6 shadow-sm">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
             <BookOpen className="w-10 h-10 text-slate-300" />
           </div>
           <div className="text-center space-y-2">
             <p className="text-xl text-slate-400 italic font-medium">"Empty pages waiting for your heart's echo..."</p>
             <p className="text-sm text-slate-300">Bookmark your favorite shayri to see them here.</p>
           </div>
           <Link to="/" className="text-blue-600 font-black uppercase tracking-widest text-sm hover:underline">Explore Poets</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {favorites.map((shayri) => (
              <motion.div
                key={shayri._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ShayriCard shayri={shayri} isFavoritePage={true} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Favorites;
