import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { motion } from 'motion/react';
import { Lock, Loader2, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Auto-fill email and OTP from URL
  useEffect(() => {
    const emailParam = searchParams.get('email');
    const otpParam = searchParams.get('otp');
    if (emailParam) setEmail(decodeURIComponent(emailParam));
    if (otpParam) setOtp(otpParam);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    try {
      await authService.resetPassword(email, otp, password);
      toast.success('Password reset successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Reset error:', err);
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white dark:bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-primary/10 shadow-2xl"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8">
          <ArrowLeft size={16} /> Back to Login
        </Link>
        
        <div className="text-center mb-10 space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="font-display text-4xl font-bold italic">Reset Password</h2>
          <p className="text-muted font-serif">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all font-serif"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!!searchParams.get('email')}
            />
          </div>

          {/* OTP Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">OTP Code</label>
            <input
              type="text"
              required
              className="w-full px-4 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all font-serif text-center text-2xl tracking-widest"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              readOnly={!!searchParams.get('otp')}
            />
          </div>

          {/* New Password Field with Eye Icon */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength="6"
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all font-serif"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-primary cursor-pointer hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field with Eye Icon */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength="6"
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all font-serif"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-primary cursor-pointer hover:text-primary transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Reset Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;