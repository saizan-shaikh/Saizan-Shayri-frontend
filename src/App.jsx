import React from 'react';  
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PoetPage from './pages/PoetPage';
import Favorites from './pages/Favorites';
import GhalibPage from './pages/GhalibPage';
import JaunEliaPage from './pages/JaunEliaPage';
import IqbalPage from './pages/IqbalPage';
import FaizPage from './pages/FaizPage';
import MirPage from './pages/MirPage';
import RahatPage from './pages/RahatPage';
import AddShayri from './pages/AddShayri';
import Trending from './pages/Trending';
import Popular from './pages/Popular';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen bg-[#f8fafc]">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Public Contribution Routes */}
                <Route path="/add-shayri" element={<AddShayri />} />
                <Route path="/edit-shayri/:id" element={<AddShayri />} />
                
                {/* Individual Configured Routes for Poets */}
                <Route path="/ghalib" element={<GhalibPage />} />
                <Route path="/jaun-elia" element={<JaunEliaPage />} />
                <Route path="/iqbal" element={<IqbalPage />} />
                <Route path="/faiz-ahmed" element={<FaizPage />} />
                <Route path="/mir-taqi" element={<MirPage />} />
                <Route path="/rahat" element={<RahatPage />} />
                
                {/* Legacy Parametric Route (kept safe) */}
                <Route path="/poet/:name" element={<PoetPage />} />
                
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer position="top-center" theme="light" autoClose={3000} hideProgressBar={false} />
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
