'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  QrCode, 
  BookOpen, 
  PenTool, 
  Gamepad2, 
  Trophy,
  Clock,
  TrendingUp,
  User
} from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  role: string;
  kelas?: string;
  studentId?: string;
  barcode?: string;
}

const quickActions = [
  { 
    icon: QrCode, 
    label: 'Absensi', 
    description: 'Scan barcode',
    path: '/student/attendance',
    color: '#007aff',
  },
  { 
    icon: BookOpen, 
    label: 'Materi', 
    description: 'Belajar sekarang',
    path: '/student/materials',
    color: '#34c759',
  },
  { 
    icon: PenTool, 
    label: 'Ujian', 
    description: 'Kerjakan soal',
    path: '/student/exams',
    color: '#ff9500',
  },
  { 
    icon: Gamepad2, 
    label: 'Games', 
    description: 'Main & belajar',
    path: '/student/games',
    color: '#af52de',
  },
];

export default function StudentDashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    requestAnimationFrame(() => {
      if (isDarkMode) {
        setIsDark(true);
      }
    });

    // Get session
    try {
      const sessionStr = localStorage.getItem('narang_session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        requestAnimationFrame(() => setUserData(session));
      }
    } catch (e) {
      console.error('Error getting session:', e);
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-[#2c2c2e] to-[#3a3a3c] border border-white/10' 
            : 'bg-white border border-gray-100'
        } shadow-sm`}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-2xl flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{getGreeting()} 👋</p>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {userData?.name || 'Siswa'}
            </h1>
            {userData?.kelas && (
              <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                Kelas {userData.kelas}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className={`text-base font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Link key={action.path} href={action.path}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-2xl p-4 ${
                  isDark 
                    ? 'bg-[#2c2c2e] border border-white/10' 
                    : 'bg-white border border-gray-100'
                } shadow-sm`}
              >
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {action.label}
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {action.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={`text-base font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Statistik Belajar
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Materi', value: '12', color: '#007aff' },
            { label: 'Ujian', value: '5', color: '#ff9500' },
            { label: 'Skor', value: '85', color: '#34c759' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-4 text-center ${
                isDark 
                  ? 'bg-[#2c2c2e] border border-white/10' 
                  : 'bg-white border border-gray-100'
              } shadow-sm`}
            >
              <div 
                className="text-2xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Student Card */}
      {userData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-5 ${
            isDark 
              ? 'bg-[#2c2c2e] border border-white/10' 
              : 'bg-white border border-gray-100'
          } shadow-sm`}
        >
          <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Kartu Siswa
          </h3>
          <div className={`rounded-xl p-4 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userData.name}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  NIS: {userData.studentId || '-'}
                </p>
                {userData.barcode && (
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Barcode: {userData.barcode}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Motivational Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-[#ff9500] to-[#ff6b00] rounded-2xl p-5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full blur-2xl opacity-30" />
        <div className="relative z-10">
          <TrendingUp className="w-6 h-6 text-white mb-2" />
          <h3 className="font-bold text-white">Tingkatkan Prestasimu! 🚀</h3>
          <p className="text-white/80 text-sm mt-1">
            Selesaikan 3 materi lagi untuk mendapat badge baru
          </p>
        </div>
      </motion.div>
    </div>
  );
}
