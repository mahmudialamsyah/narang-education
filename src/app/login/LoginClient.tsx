'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  User,
  Loader2,
  Moon,
  Sun,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Demo credentials
const DEMO_ADMIN = { username: 'admin', password: 'admin123', name: 'Admin Narang' };
const DEMO_STUDENT = { username: 'siswa', password: 'siswa123', name: 'Siswa Demo' };

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdminLogin = searchParams.get('admin') === 'true';
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isDark, setIsDark] = useState(false);

  // Check theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Demo admin check
      if (formData.username === DEMO_ADMIN.username && formData.password === DEMO_ADMIN.password) {
        const sessionData = {
          username: DEMO_ADMIN.username,
          name: DEMO_ADMIN.name,
          role: 'admin',
          loginTime: Date.now()
        };
        localStorage.setItem('narang_session', JSON.stringify(sessionData));
        router.push('/admin/dashboard');
        return;
      }

      // Demo student check
      if (formData.username === DEMO_STUDENT.username && formData.password === DEMO_STUDENT.password) {
        const sessionData = {
          username: DEMO_STUDENT.username,
          name: DEMO_STUDENT.name,
          role: 'student',
          studentId: 'SD2024001',
          barcode: 'NRGDEMO123',
          loginTime: Date.now()
        };
        localStorage.setItem('narang_session', JSON.stringify(sessionData));
        router.push('/student/dashboard');
        return;
      }

      // Invalid credentials
      setError('Username atau password salah');
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.username || !formData.password) {
      setError('Lengkapi semua data wajib');
      setLoading(false);
      return;
    }

    if (formData.username.length < 4) {
      setError('Username minimal 4 karakter');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      // Demo registration
      const studentId = `SD${Date.now().toString().slice(-6)}`;
      const barcode = `NRG${Date.now().toString(36).toUpperCase()}`;
      
      const sessionData = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        role: 'student',
        studentId,
        barcode,
        loginTime: Date.now()
      };
      
      localStorage.setItem('narang_session', JSON.stringify(sessionData));
      router.push('/student/dashboard');
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-[#1c1c1e]' : 'bg-[#f5f5f7]'}`}>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo - Using uploaded image */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-3"
            >
              <Image 
                src="/logo.png" 
                alt="Narang Education" 
                width={64} 
                height={64}
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Narang Education
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {isAdminLogin ? 'Panel Administrator' : 'Platform Bimbingan Belajar SD'}
            </motion.p>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl p-6 shadow-xl ${
              isDark 
                ? 'bg-[#2c2c2e] border border-white/10' 
                : 'bg-white border border-black/5'
            }`}
          >
            {/* Mode Tabs - Only show if not admin */}
            {!isAdminLogin && (
              <div className={`flex gap-1 mb-6 p-1 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'login'
                      ? 'bg-[#007aff] text-white shadow-sm'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Masuk
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'register'
                      ? 'bg-[#007aff] text-white shadow-sm'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Daftar
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {mode === 'login' || isAdminLogin ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Username
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Masukkan username"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500 focus:border-[#007aff] focus:ring-1 focus:ring-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#007aff] focus:bg-white focus:ring-1 focus:ring-[#007aff]/20'
                        } outline-none`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Masukkan password"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500 focus:border-[#007aff] focus:ring-1 focus:ring-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#007aff] focus:bg-white focus:ring-1 focus:ring-[#007aff]/20'
                        } outline-none`}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 text-[#ff3b30] rounded-lg px-3 py-2 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#007aff] hover:bg-[#0066d6] text-white font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      'Masuk'
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nama Lengkap <span className="text-[#ff3b30]">*</span>
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => {
                          const words = e.target.value.split(' ');
                          const capitalized = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
                          setFormData(prev => ({ ...prev, name: capitalized.join(' ') }));
                        }}
                        placeholder="Nama lengkap"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500 focus:border-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#007aff] focus:bg-white'
                        } outline-none`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Username <span className="text-[#ff3b30]">*</span>
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Min. 4 karakter"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500 focus:border-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#007aff] focus:bg-white'
                        } outline-none`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Password <span className="text-[#ff3b30]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min. 6 karakter"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500 focus:border-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#007aff] focus:bg-white'
                        } outline-none`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email <span className="text-[#ff3b30]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500 focus:border-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#007aff] focus:bg-white'
                        } outline-none`}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 text-[#ff3b30] rounded-lg px-3 py-2 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#007aff] hover:bg-[#0066d6] text-white font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      'Daftar Sekarang'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <Link href="/">
              <button className="text-sm font-medium text-[#ff3b30] hover:text-[#ff453a] transition-colors">
                ← Kembali ke Beranda
              </button>
            </Link>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`mt-6 p-3 rounded-xl ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'
            }`}
          >
            <p className={`text-xs font-medium mb-1.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Demo Credentials
            </p>
            <div className={`text-xs space-y-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <p><strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>Admin:</strong> admin / admin123</p>
              <p><strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>Siswa:</strong> siswa / siswa123</p>
            </div>
          </motion.div>

          {/* Watermark */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`mt-4 text-center text-xs font-medium ${
              isDark ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            System developed by masmudi
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Bottom Navigation Bar - Pill Style */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-xl ${
            isDark 
              ? 'bg-[#2c2c2e]/80 border border-white/10' 
              : 'bg-white/80 border border-gray-200/50'
          }`}
        >
          {/* Home Link */}
          <Link href="/">
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
              isDark 
                ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}>
              <span className="text-lg">🏠</span>
              <span className="text-sm font-medium hidden sm:inline">Beranda</span>
            </button>
          </Link>

          {/* Divider */}
          <div className={`w-px h-5 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
              isDark 
                ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="text-sm font-medium hidden sm:inline">
              {isDark ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Divider */}
          <div className={`w-px h-5 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />

          {/* Admin Access - Only show if not admin login */}
          {!isAdminLogin && (
            <Link href="/login?admin=true">
              <button className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                isDark 
                  ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}>
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">Admin</span>
              </button>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
