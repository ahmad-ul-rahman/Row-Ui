
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CategoriesPage from './pages/CategoriesPage';
import SinglePostPage from './pages/SinglePostPage';
import AllPostsPage from './pages/AllPostsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  if (loading) return null;

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
        <ScrollToTop />
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        
        <main className="pt-20 min-h-[calc(100vh-400px)]">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<AllPostsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/blog/:id" element={<SinglePostPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/login" 
                element={!session ? <AdminLogin /> : <Navigate to="/admin" replace />} 
              />
              <Route 
                path="/admin/*" 
                element={session ? <AdminDashboard session={session} /> : <Navigate to="/admin/login" replace />} 
              />
              
              {/* Catch-all Route for 404s */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: darkMode ? '#1e293b' : '#fff',
              color: darkMode ? '#fff' : '#333',
            },
          }}
        />
      </div>
    </HashRouter>
  );
};

export default App;
