import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LifeAdvice = ({ title, verses, gradient, tagLine, themeColor }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mt-12 p-0.5 bg-gradient-to-br ${gradient} rounded-[2.5rem] shadow-xl shadow-blue-100/50`}
    >
      <div className="bg-white rounded-[2.45rem] p-10 md:p-12 text-center space-y-6 relative overflow-hidden">
        <Sparkles className={`w-12 h-12 ${themeColor}/10 absolute top-8 left-8`} />
        <Sparkles className={`w-12 h-12 ${themeColor}/10 absolute bottom-8 right-8`} />
        
        <div className="space-y-4">
          <span className={`px-4 py-1.5 rounded-full bg-slate-50 ${themeColor} text-xs font-black uppercase tracking-[0.3em]`}>
            Life Advice • Nasihat
          </span>
          <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">
            "{title}"
          </h2>
        </div>

        <div className="space-y-10 max-w-4xl mx-auto py-6">
          {verses.map((verse, index) => (
            <React.Fragment key={index}>
              <div className="space-y-3 group cursor-default">
                <p className={`text-2xl md:text-3xl font-black text-slate-800 group-hover:${themeColor} transition-colors leading-tight`}>
                  "{verse.text}"
                </p>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">— {verse.subtext}</p>
              </div>
              {index < verses.length - 1 && (
                <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full" />
              )}
            </React.Fragment>
          ))}
        </div>

        <p className={`text-[10px] font-black ${themeColor}/30 uppercase tracking-[0.5em] pt-6`}>
          {tagLine}
        </p>
      </div>
    </motion.div>
  );
};

export default LifeAdvice;
