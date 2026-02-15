'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard,
  Users,
  QrCode,
  BookOpen,
  HelpCircle,
  PenTool,
  Gamepad2,
  Wallet,
  BarChart3,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Siswa', path: '/admin/students' },
  { icon: QrCode, label: 'Absensi', path: '/admin/attendance' },
  { icon: BookOpen, label: 'Materi', path: '/admin/materials' },
  { icon: HelpCircle, label: 'Bank Soal', path: '/admin/questions' },
  { icon: PenTool, label: 'Ujian', path: '/admin/exams' },
  { icon: Gamepad2, label: 'Games', path: '/admin/games' },
  { icon: Wallet, label: 'Pembayaran', path: '/admin/payments' },
  { icon: BarChart3, label: 'Laporan', path: '/admin/reports' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
          
          // Check if session is valid and is admin
          if (session && session.role === 'admin') {
            setUserData(session);
            setLoading(false);
            return;
          }
          
          // If student, redirect to student dashboard
          if (session && session.role === 'student') {
            router.push('/student/dashboard');
            return;
          }
        }
        
        // No valid session, redirect to login
        router.push('/login?admin=true');
      } catch (e) {
        router.push('/login?admin=true');
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('narang_session');
    router.push('/login?admin=true');
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
    <div className={`min-h-screen flex ${isDark ? 'dark bg-[#1c1c1e]' : 'bg-[#f5f5f7]'}`}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col transition-all duration-300 border-r ${
        sidebarCollapsed ? 'w-16' : 'w-56'
      } ${isDark ? 'bg-[#1c1c1e] border-white/10' : 'bg-white border-gray-100'}`}>
        {/* Logo */}
        <div className={`h-12 flex items-center px-4 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-lg flex items-center justify-center">
              <span className="text-sm">📚</span>
            </div>
            {!sidebarCollapsed && (
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Admin
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-[#007aff] text-white'
                      : isDark 
                        ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="font-medium truncate">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className={`p-3 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {userData?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userData?.name}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-1">
            <button
              onClick={toggleTheme}
              className={`flex-1 h-8 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={handleLogout}
              className={`flex-1 h-8 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-white/10 text-[#ff453a]' : 'bg-gray-100 text-[#ff3b30]'
              }`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`absolute top-14 -right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
            isDark ? 'bg-[#2c2c2e] border border-white/10' : 'bg-white border border-gray-100'
          }`}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''} ${isDark ? 'text-white' : 'text-gray-600'}`} />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`h-12 flex items-center justify-between px-4 sticky top-0 z-40 border-b ${
          isDark ? 'bg-[#1c1c1e]/80 border-white/10' : 'bg-white/80 border-gray-100'
        } backdrop-blur-xl`}>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-[#007aff] text-white"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Title */}
          <h1 className={`font-semibold hidden lg:block ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {navItems.find(item => item.path === pathname)?.label || 'Dashboard'}
          </h1>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <div className={`text-right hidden sm:block`}>
              <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {userData?.name}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Administrator
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {userData?.name?.charAt(0) || 'A'}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden ${
                isDark ? 'bg-[#2c2c2e]' : 'bg-white'
              }`}
            >
              <div className={`p-4 flex items-center justify-between border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Admin Panel
                </span>
                <button onClick={() => setSidebarOpen(false)} className={isDark ? 'text-white' : 'text-gray-900'}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-2 space-y-0.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
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
                
                <button
                  onClick={() => { toggleTheme(); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#ff453a] hover:bg-[#ff453a]/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Keluar</span>
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
