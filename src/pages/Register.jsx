import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Register() {
  const { register, mockGoogleLogin } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      // Mock Google login - uses existing backend credentials
      await mockGoogleLogin();
      toast.success('Welcome! You can now explore DriveFleet');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password });
      toast.success('Registration successful. Welcome!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#161618] border border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2">Join Exclusive</h1>
          <p className="text-xs uppercase tracking-widest text-[#71717a]">Elevate your journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#71717a] mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111113] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors"
              placeholder="e.g. Drive123"
            />
            <p className="text-[10px] text-[#71717a] mt-2">Must have 1 uppercase, 1 lowercase, and 6+ chars.</p>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#e5e5e7] transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Apply for Membership'}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-[#71717a]">
              <span className="bg-[#161618] px-4">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full bg-[#111113] border border-white/10 text-white py-3 px-4 flex items-center justify-center gap-3 hover:bg-[#1a1a1c] transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-[#71717a]">
          Already a member? <Link to="/login" className="text-white hover:text-[#d4af37] transition-colors">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}