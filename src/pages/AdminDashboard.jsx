import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Heart, Eye, BookOpen, TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BASE_URL from '../config/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BASE_URL}/shayri/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard stats");
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Aggregating Global Data...</p>
      </div>
    );
  }

  const statCards = [
    { label: "Total Shayari", value: stats?.totalShayri || 0, icon: BookOpen, color: "bg-blue-50 text-blue-600" },
    { label: "Total Views", value: stats?.totalViews || 0, icon: Eye, color: "bg-orange-50 text-orange-600" },
    { label: "Total Likes", value: stats?.totalLikes || 0, icon: Heart, color: "bg-pink-50 text-pink-600" },
  ];

  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <BarChart3 className="w-32 h-32 text-slate-200" />
        </div>
        <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-all group font-bold uppercase tracking-wider text-xs z-10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <div className="md:text-right z-10">
          <div className="flex items-center md:justify-end space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Dashboard</h1>
          </div>
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mt-1">Platform Analytics Overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-6 hover:shadow-md transition-shadow"
          >
            <div className={`p-4 rounded-2xl ${stat.color}`}>
               <stat.icon className="w-8 h-8" />
            </div>
            <div>
               <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{stat.label}</p>
               <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value.toLocaleString()}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="flex items-center space-x-3 mb-8">
             <TrendingUp className="w-6 h-6 text-blue-600" />
             <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Star Performers <span className="text-slate-300 font-bold ml-2">(Top 5 Viewed)</span></h2>
          </div>
          
          <div className="space-y-4">
            {stats?.topPerforming?.map((shayri, idx) => (
              <div key={shayri._id} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group">
                <div className="flex items-center space-x-4 max-w-[80%]">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-black rounded-lg text-xs">{idx + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{shayri.text}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{shayri.poet}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center space-x-2 text-xs font-black text-slate-700">
                      <Eye className="w-3.5 h-3.5 text-orange-500" />
                      <span>{shayri.views.toLocaleString()}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
