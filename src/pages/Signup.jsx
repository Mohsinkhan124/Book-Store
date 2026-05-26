import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { motion } from 'motion/react';
import { Mail, Lock, User, UserPlus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signup(formData);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
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
          <h2 className="font-display text-4xl font-bold mb-3 italic">Join Lumina</h2>
          <p className="text-muted font-serif">Begin your adventure book by book</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted px-1">Full Name</label>
            <div className="relative">
               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
               <input
                 type="text"
                 required
                 className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-colors"
                 placeholder="Alex Reed"
                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
               />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted px-1">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
               <input
                 type="email"
                 required
                 className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-colors"
                 placeholder="your@email.com"
                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
               />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted px-1">Password</label>
            <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
               <input
                 type="password"
                 required
                 className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-colors"
                 placeholder="Minimum 6 characters"
                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
               />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><UserPlus size={20} /> Create Account</>}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted">
          Already a reader? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
