import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ReadBook from './pages/ReadBook';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-bg text-foreground transition-colors duration-300">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              <Route path="/read/:id" element={
                <PrivateRoute>
                  <ReadBook />
                </PrivateRoute>
              } />
              
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
            </Routes>
          </main>
          
          <footer className="py-6 border-t border-primary/10 bg-primary/5">
             <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
                <div className="col-span-2 space-y-4">
                   <h3 className="font-display font-bold text-2xl">LuminaBooks</h3>
                   <p className="text-muted font-serif italic max-w-sm">Every page is a new beginning. Lumina is a sanctuary for those who seek wisdom in the written word.</p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Avenue</h4>
                   <nav className="flex flex-col gap-2 font-medium">
                      <a href="/" className="hover:text-primary transition-colors">Library</a>
                      <a href="/about" className="hover:text-primary transition-colors">Our Origin</a>
                      <a href="/contact" className="hover:text-primary transition-colors">Send a Letter</a>
                   </nav>
                </div>
                <div className="space-y-4">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Legal</h4>
                   <nav className="flex flex-col gap-2 font-medium">
                      <span className="hover:text-primary transition-colors cursor-pointer text-muted/60">Privacy Policy</span>
                      <span className="hover:text-primary transition-colors cursor-pointer text-muted/60">Terms & Lore</span>
                   </nav>
                </div>
             </div>
             <div className="max-w-7xl mx-auto px-6 pt-6 mt-12 border-t border-primary/5 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted/40">
                &copy; MMXXVI LUMINA LITERARY SOCIETY. ALL RIGHTS RESERVED.
             </div>
          </footer>
        </div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </Router>
    </AuthProvider>
  );
}

export default App;