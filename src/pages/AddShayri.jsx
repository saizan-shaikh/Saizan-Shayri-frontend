import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PlusCircle, Send, User, Tag, BookOpen, ArrowLeft, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import BASE_URL from '../config/api';

const AddShayri = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    text: '',
    poet: searchParams.get('poet') || '',
    category: '',
    language: 'roman'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id);

  const poets = [
    "Mirza Ghalib", "Jaun Elia", "Allama Iqbal", 
    "Faiz Ahmed Faiz", "Mir Taqi Mir", "Rahat Indori", "Other"
  ];

  const categories = [
    "Love", "Sad", "Philosophy", "Attitude", "Life", "Zindagi", "Aashiqui", "Other"
  ];

  useEffect(() => {
    if (id) {
      const fetchShayri = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/shayri/${id}`);
          setFormData({
            text: data.text,
            poet: data.poet,
            category: data.category,
            language: data.language || 'roman'
          });
        } catch (error) {
          toast.error('Failed to fetch shayri details');
          navigate('/add-shayri');
        } finally {
          setIsLoading(false);
        }
      };
      fetchShayri();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.text || !formData.poet || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      if (id) {
        await axios.put(`${BASE_URL}/admin/shayri/${id}`, formData);
        toast.success('Shayri updated successfully!');
        setTimeout(() => navigate(-1), 1500);
      } else {
        const { data: newShayari } = await axios.post(`${BASE_URL}/admin/shayri`, formData);
        
        // Persist to localStorage for immediate data-merging on poet pages
        const STORAGE_KEY = `user_shayaris_${formData.poet.toLowerCase().replace(/\s+/g, '_')}`;
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const updated = [...existing, newShayari];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        
        toast.success('Shayri added successfully!');
        setFormData({ 
          text: '', 
          poet: searchParams.get('poet') || '', 
          category: '', 
          language: 'roman' 
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to save Shayri';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Verses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {id ? 'Discard Changes' : 'Back to Gallery'}
        </button>

        <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="flex items-center space-x-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              {id ? <Edit3 className="w-8 h-8 text-white" /> : <PlusCircle className="w-8 h-8 text-white" />}
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {id ? 'Edit' : 'Post Your'} <span className="text-blue-600">Shayri</span>
              </h2>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
                {id ? 'Refining the Literature' : 'Contribute to the Book'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Textarea */}
            <div className="space-y-3">
              <label className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                <BookOpen className="w-3 h-3 mr-2 text-blue-600" />
                Shayri Content
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Type the beautiful verses here..."
                className="w-full h-40 px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-800 font-medium leading-relaxed resize-none shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Poet */}
              <div className="space-y-3">
                <label className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  <User className="w-3 h-3 mr-2 text-blue-600" />
                  Poet Name
                </label>
                <div className="relative group">
                  <select
                    name="poet"
                    value={formData.poet}
                    onChange={handleChange}
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-800 font-bold appearance-none cursor-pointer shadow-inner"
                  >
                    <option value="">Select Poet</option>
                    {poets.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-blue-600 transition-colors">
                    <PlusCircle className="w-4 h-4 rotate-45" />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  <Tag className="w-3 h-3 mr-2 text-blue-600" />
                  Category
                </label>
                <div className="relative group">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-800 font-bold appearance-none cursor-pointer shadow-inner"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-blue-600 transition-colors">
                    <PlusCircle className="w-4 h-4 rotate-45" />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-16 rounded-3xl bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" />
                  {id ? 'Update Shayri' : 'Publish Shayri'}
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddShayri;
