import React from 'react';  
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PoetPage from './pages/PoetPage';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import GhalibPage from './pages/GhalibPage';
import JaunEliaPage from './pages/JaunEliaPage';
import IqbalPage from './pages/IqbalPage';
import FaizPage from './pages/FaizPage';
import MirPage from './pages/MirPage';
import RahatPage from './pages/RahatPage';
import AddShayri from './pages/AddShayri';
import EditShayri from './pages/EditShayri';
import Trending from './pages/Trending';
import Popular from './pages/Popular';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen bg-[#f8fafc]">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                
                {/* Analytics & Discovery */}
                <Route path="/trending" element={<ProtectedRoute><Trending /></ProtectedRoute>} />
                <Route path="/popular" element={<ProtectedRoute><Popular /></ProtectedRoute>} />
                
                {/* Admin-Only Routes */}
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/add-shayri" element={<AdminRoute><AddShayri /></AdminRoute>} />
                <Route path="/admin/edit-shayri/:id" element={<AdminRoute><EditShayri /></AdminRoute>} />
                
                {/* Individual Configured Routes for Poets */}
                <Route path="/ghalib" element={<ProtectedRoute><GhalibPage /></ProtectedRoute>} />
                <Route path="/jaun-elia" element={<ProtectedRoute><JaunEliaPage /></ProtectedRoute>} />
                <Route path="/iqbal" element={<ProtectedRoute><IqbalPage /></ProtectedRoute>} />
                <Route path="/faiz-ahmed" element={<ProtectedRoute><FaizPage /></ProtectedRoute>} />
                <Route path="/mir-taqi" element={<ProtectedRoute><MirPage /></ProtectedRoute>} />
                <Route path="/rahat" element={<ProtectedRoute><RahatPage /></ProtectedRoute>} />
                
                {/* Legacy Parametric Route (kept safe) */}
                <Route path="/poet/:name" element={<ProtectedRoute><PoetPage /></ProtectedRoute>} />
                
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
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
