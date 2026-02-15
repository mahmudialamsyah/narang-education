'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  QrCode, 
  BookOpen, 
  PenTool, 
  Gamepad2, 
  Wallet,
  User,
  LogOut,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import Link from 'next/link';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: Home, label: 'Beranda', path: '/student/dashboard' },
  { icon: QrCode, label: 'Absensi', path: '/student/attendance' },
  { icon: BookOpen, label: 'Materi', path: '/student/materials' },
  { icon: PenTool, label: 'Ujian', path: '/student/exams' },
  { icon: Gamepad2, label: 'Games', path: '/student/games' },
];

export function StudentLayout({ children }: StudentLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      requestAnimationFrame(() => setIsDark(true));
    }

    // Check session
    const checkSession = () => {
      try {
        const sessionStr = localStorage.getItem('narang_session');
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          
          // Check if session is valid and is student
          if (session && session.role === 'student') {
            setUserData(session);
            setLoading(false);
            return;
          }
          
          // If admin, redirect to admin dashboard
          if (session && session.role === 'admin') {
            router.push('/admin/dashboard');
            return;
          }
        }
        
        // No valid session, redirect to login
        router.push('/login');
      } catch (e) {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('narang_session');
    router.push('/login');
  };

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

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#1c1c1e]' : 'bg-[#f5f5f7]'}`}>
        <div className="w-8 h-8 border-2 border-[#007aff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-[#1c1c1e]' : 'bg-[#f5f5f7]'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-[#1c1c1e]/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          {/* Left - Traffic Lights on mobile, Logo on desktop */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 md:hidden">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            
            <Link href="/student/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-lg flex items-center justify-center">
                <span className="text-sm">📚</span>
              </div>
              <span className={`font-semibold hidden sm:inline ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Narang
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#007aff] text-white'
                        : isDark 
                          ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-full flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {userData?.name}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-white/10 text-[#ff453a]' : 'bg-gray-100 text-[#ff3b30]'
              }`}
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-[#007aff] text-white"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed right-0 top-0 bottom-0 w-72 z-50 md:hidden ${
                isDark ? 'bg-[#2c2c2e]' : 'bg-white'
              }`}
            >
              <div className={`p-4 flex items-center justify-between border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Menu</span>
                <button onClick={() => setSidebarOpen(false)} className={isDark ? 'text-white' : 'text-gray-900'}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                          isActive
                            ? 'bg-[#007aff] text-white'
                            : isDark 
                              ? 'text-gray-400 hover:bg-white/5' 
                              : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
                
                <div className={`my-2 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`} />
                
                <Link href="/student/payments" onClick={() => setSidebarOpen(false)}>
                  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                    isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                    <Wallet className="w-5 h-5" />
                    <span className="font-medium">Pembayaran</span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#ff453a] hover:bg-[#ff453a]/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Keluar</span>
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 md:hidden z-40 border-t ${
        isDark ? 'bg-[#1c1c1e] border-white/10' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={`flex flex-col items-center justify-center w-14 h-12 ${
                  isActive 
                    ? 'text-[#007aff]' 
                    : isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-[#007aff] text-white' : ''
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
