import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/api';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success('Reset link sent to your email');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-primary/10 shadow-2xl"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8">
           <ArrowLeft size={16} /> Back to Login
        </Link>
        
        <div className="text-center mb-10 space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
             <Sparkles size={32} />
          </div>
          <h2 className="font-display text-4xl font-bold italic">Lost?</h2>
          <p className="text-muted font-serif">Enter your email to find your way back to Lumina.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
               <input
                 type="email"
                 required
                 className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all font-serif"
                 placeholder="your@email.com"
                 onChange={(e) => setEmail(e.target.value)}
               />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Send Recovery Link'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
