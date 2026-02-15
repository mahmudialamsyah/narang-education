'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Camera, Users, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminAttendancePage() {
  const [isDark, setIsDark] = useState(false);
  const [scanMode, setScanMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      requestAnimationFrame(() => setIsDark(true));
    }
  }, []);

  // Demo attendance data
  const attendanceData = [
    { id: 1, name: 'Ahmad Rizki', kelas: '4', time: '07:30', status: 'hadir' },
    { id: 2, name: 'Siti Aisyah', kelas: '5', time: '07:35', status: 'hadir' },
    { id: 3, name: 'Budi Santoso', kelas: '4', time: '07:45', status: 'hadir' },
    { id: 4, name: 'Dewi Lestari', kelas: '6', time: '08:00', status: 'terlambat' },
    { id: 5, name: 'Eko Prasetyo', kelas: '5', time: '-', status: 'tidak_hadir' },
  ];

  const today = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Absensi
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {today}
          </p>
        </div>
        <Button 
          onClick={() => setScanMode(!scanMode)}
          className="bg-[#007aff] hover:bg-[#0066d6]"
        >
          <QrCode className="w-4 h-4 mr-2" />
          Scan Barcode
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>3</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Hadir</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Terlambat</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tidak Hadir</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-4 rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>5</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Siswa</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Attendance List */}
      <div className={`rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm overflow-hidden`}>
        <div className={`px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Daftar Kehadiran Hari Ini
          </h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-white/10">
          {attendanceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{item.name.charAt(0)}</span>
                </div>
                <div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.name}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Kelas {item.kelas}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.time}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'hadir' 
                    ? 'bg-green-100 text-green-700' 
                    : item.status === 'terlambat'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {item.status === 'hadir' ? 'Hadir' : item.status === 'terlambat' ? 'Terlambat' : 'Tidak Hadir'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
