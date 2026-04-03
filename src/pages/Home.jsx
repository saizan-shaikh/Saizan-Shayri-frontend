import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const poets = [
  {
    name: "Mirza Ghalib",
    path: "/ghalib",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAY4-74QC1sADfuhR3SGo_KB-3cE7j4UKUI9_6nMWtNA&s",
    bio: "Legendary classical Urdu poet known for deep ghazals and philosophy."
  },
  {
    name: "Jaun Elia",
    path: "/jaun-elia",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7QeVH86M7ZZyFKFxgkkfUnsN1PvxYnYHciqhmZON7JQ&s",
    bio: "Modern Urdu poet known for sadness, intellect, and unique expression."
  },
  {
    name: "Rahat Indori",
    path: "/rahat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThKYeSDNDOdRcLeQYZhaLlRnAVF2f_a3Bi4w&s",
    bio: "Powerful Indian poet famous for bold and impactful shayri."
  },
  {
    name: "Allama Iqbal",
    path: "/iqbal",
    image: "https://i.pinimg.com/474x/d2/7c/94/d27c9411ecf85794bb0c8f66a98248d9.jpg",
    bio: "Philosopher and poet who inspired millions."
  },
  {
    name: "Faiz Ahmed Faiz",
    path: "/faiz-ahmed",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSlgGqsehRG1eYOqQDEdj1KXBjTWmipbbu5w&s",
    bio: "Revolutionary poet known for love and resistance poetry."
  },
  {
    name: "Mir Taqi Mir",
    path: "/mir-taqi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7TQe0vTTn7mJ_cZZbdLx7RBAMhlG0nY4iTAEWTR4kJQ&s",
    bio: "One of the greatest classical Urdu poets of all time."
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pb-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase">
            The Digital Anthology
          </span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
          Timeless Wisdom from <span className="text-blue-600">Great Poets</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Explore the profound depth of Urdu and Hindi poetry through the words of the legends.
        </p>
      </div>

      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        {poets.map((poet, index) => (
          <motion.div
            key={poet.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => navigate(poet.path)}
            className="min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center accent-card group cursor-pointer flex-shrink-0"
          >
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img 
                src={poet.image} 
                alt={poet.name} 
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Poet" }}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute bottom-3 left-4 md:bottom-4 md:left-6">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{poet.name}</h3>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-2 md:space-y-3">
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                {poet.bio}
              </p>
              <div className="flex items-center text-blue-600 text-xs md:text-sm font-bold group-hover:translate-x-2 transition-transform">
                <span>See Poetry</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
