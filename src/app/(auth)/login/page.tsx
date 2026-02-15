'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  User,
  Loader2,
  Users,
  Phone,
  Moon,
  Sun,
  Settings
} from 'lucide-react';
import Link from 'next/link';

// Demo credentials
const DEMO_ADMIN = { email: 'admin@narang.id', password: 'admin123', name: 'Admin Narang' };
const DEMO_STUDENT = { email: 'siswa@narang.id', password: 'siswa123', name: 'Siswa Demo', kelas: '4' };

// Loading fallback component
function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
      <div className="w-8 h-8 border-2 border-[#007aff] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Main login content component
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdminLogin = searchParams.get('admin') === 'true';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    kelas: '',
    parentName: '',
    parentPhone: '',
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
      if (formData.email === DEMO_ADMIN.email && formData.password === DEMO_ADMIN.password) {
        const sessionData = {
          email: DEMO_ADMIN.email,
          name: DEMO_ADMIN.name,
          role: 'admin',
          loginTime: Date.now()
        };
        localStorage.setItem('narang_session', JSON.stringify(sessionData));
        router.push('/admin/dashboard');
        return;
      }

      // Demo student check
      if (formData.email === DEMO_STUDENT.email && formData.password === DEMO_STUDENT.password) {
        const sessionData = {
          email: DEMO_STUDENT.email,
          name: DEMO_STUDENT.name,
          role: 'student',
          kelas: DEMO_STUDENT.kelas,
          studentId: 'SD2024001',
          barcode: 'NRGDEMO123',
          loginTime: Date.now()
        };
        localStorage.setItem('narang_session', JSON.stringify(sessionData));
        router.push('/student/dashboard');
        return;
      }

      // Invalid credentials
      setError('Email atau password salah');
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

    if (!formData.name || !formData.email || !formData.password || !formData.kelas) {
      setError('Lengkapi semua data wajib');
      setLoading(false);
      return;
    }

    try {
      // Demo registration
      const studentId = `SD${Date.now().toString().slice(-6)}`;
      const barcode = `NRG${Date.now().toString(36).toUpperCase()}`;
      
      const sessionData = {
        email: formData.email,
        name: formData.name,
        role: 'student',
        kelas: formData.kelas,
        studentId,
        barcode,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
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
      {/* macOS Style Header */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-[#1c1c1e]/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 cursor-pointer" />
          </div>

          {/* Center Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isAdminLogin ? 'Admin Panel' : 'Student Portal'}
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-gray-600'}`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-[22px] bg-gradient-to-br from-[#ff9500] to-[#ff6b00] shadow-lg mb-4"
            >
              <span className="text-4xl">📚</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
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

          {/* Main Card - macOS Sonoma Style */}
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
                      Email
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
                  className="space-y-3"
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

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Kelas <span className="text-[#ff3b30]">*</span>
                      </label>
                      <select
                        name="kelas"
                        value={formData.kelas}
                        onChange={(e) => setFormData(prev => ({ ...prev, kelas: e.target.value }))}
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white focus:border-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#007aff] focus:bg-white'
                        } outline-none`}
                        required
                      >
                        <option value="" className={isDark ? 'bg-[#1c1c1e]' : ''}>Pilih</option>
                        {[1, 2, 3, 4, 5, 6].map(k => (
                          <option key={k} value={k} className={isDark ? 'bg-[#1c1c1e]' : ''}>Kelas {k}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Password <span className="text-[#ff3b30]">*</span>
                      </label>
                      <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min. 6 karakter"
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-colors ${
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

                  <div className="space-y-1.5">
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nama Orang Tua
                    </label>
                    <div className="relative">
                      <Users className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Nama orang tua/wali"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500 focus:border-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#007aff] focus:bg-white'
                        } outline-none`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      No. HP Orang Tua
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleChange}
                        placeholder="08xxxxxxxxxx"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          isDark 
                            ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500 focus:border-[#007aff]' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#007aff] focus:bg-white'
                        } outline-none`}
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

          {/* Back to Home - Red Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
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
            transition={{ delay: 0.7 }}
            className={`mt-6 p-3 rounded-xl ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'
            }`}
          >
            <p className={`text-xs font-medium mb-1.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Demo Credentials
            </p>
            <div className={`text-xs space-y-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <p><strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>Admin:</strong> admin@narang.id / admin123</p>
              <p><strong className={isDark ? 'text-gray-300' : 'text-gray-700'}>Siswa:</strong> siswa@narang.id / siswa123</p>
            </div>
          </motion.div>

          {/* Watermark */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-4 text-center text-xs font-medium ${
              isDark ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            System developed by masmudi
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Admin Access Button - Only show if not admin login */}
      {!isAdminLogin && (
        <Link href="/login?admin=true">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
              isDark 
                ? 'bg-[#3a3a3c] hover:bg-[#4a4a4c] border border-white/10' 
                : 'bg-white hover:bg-gray-50 border border-gray-200'
            }`}
            title="Login sebagai Admin"
          >
            <Settings className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          </motion.button>
        </Link>
      )}
    </div>
  );
}

// Main export with Suspense wrapper
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}
