'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, BookOpen, Wallet, TrendingUp, TrendingDown, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminReportsPage() {
  const [isDark, setIsDark] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      requestAnimationFrame(() => setIsDark(true));
    }
  }, []);

  const stats = [
    { label: 'Total Siswa', value: '156', change: '+12%', trend: 'up', icon: Users },
    { label: 'Materi Aktif', value: '48', change: '+5', trend: 'up', icon: BookOpen },
    { label: 'Pendapatan Bulan Ini', value: 'Rp 12.5 Jt', change: '+8%', trend: 'up', icon: Wallet },
    { label: 'Kehadiran Rata-rata', value: '92%', change: '-2%', trend: 'down', icon: BarChart3 },
  ];

  const attendanceByClass = [
    { kelas: '4', hadir: 45, tidakHadir: 5 },
    { kelas: '5', hadir: 52, tidakHadir: 3 },
    { kelas: '6', hadir: 48, tidakHadir: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Laporan
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Analisis dan statistik platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-4 py-2 rounded-lg border text-sm ${
              isDark 
                ? 'bg-[#1c1c1e] border-white/10 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-white/10' : 'bg-gray-100'
              }`}>
                <stat.icon className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance by Class */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl p-4 ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
        >
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Kehadiran per Kelas
          </h3>
          <div className="space-y-4">
            {attendanceByClass.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Kelas {item.kelas}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.hadir + item.tidakHadir} siswa
                  </span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-white/10">
                  <div 
                    className="bg-green-500 rounded-l-full"
                    style={{ width: `${(item.hadir / (item.hadir + item.tidakHadir)) * 100}%` }}
                  />
                  <div 
                    className="bg-red-500 rounded-r-full"
                    style={{ width: `${(item.tidakHadir / (item.hadir + item.tidakHadir)) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Hadir: {item.hadir}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Tidak Hadir: {item.tidakHadir}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-xl p-4 ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
        >
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Aktivitas Terbaru
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Siswa baru mendaftar', name: 'Ahmad Rizki', time: '5 menit lalu' },
              { action: 'Pembayaran diterima', name: 'Siti Aisyah', time: '15 menit lalu' },
              { action: 'Ujian selesai', name: 'Kelas 4 - Matematika', time: '1 jam lalu' },
              { action: 'Materi ditambahkan', name: 'IPA - Tata Surya', time: '2 jam lalu' },
              { action: 'Absensi direkam', name: '25 siswa hadir', time: '3 jam lalu' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#007aff]" />
                <div className="flex-1">
                  <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {activity.action}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {activity.name}
                  </div>
                </div>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
