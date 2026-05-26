import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, Loader2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(formData);
      
      // ✅ Ensure user has role (fallback if backend doesn't send)
      const userData = response.data.user;
      if (!userData.role) {
        userData.role = userData.email === 'mohsinkhantwy@gmail.com' ? 'admin' : 'user';
      }
      
      login(userData, response.data.token);
      toast.success('Welcome back, ' + (userData.name || userData.email));
      
      // ✅ Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-primary/10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl font-bold mb-3 italic">Welcome Back</h2>
          <p className="text-muted font-serif">Continue your literary journey at Lumina</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted px-1">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
               <input
                 type="email"
                 required
                 className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-colors"
                 placeholder="your@email.com"
                 value={formData.email}
                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
               />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
               <input
                 type={showPassword ? "text" : "password"}
                 required
                 autoComplete="current-password"
                 className="w-full pl-12 pr-12 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-colors"
                 placeholder="••••••••"
                 value={formData.password}
                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
               >
                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
               </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><LogIn size={20} /> Sign In</>}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted">
          New to Lumina? <Link to="/signup" className="text-primary font-bold hover:underline">Create account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;