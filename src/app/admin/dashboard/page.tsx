'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users,
  QrCode,
  BookOpen,
  PenTool,
  Gamepad2,
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

const statCards = [
  { 
    label: 'Total Siswa', 
    key: 'students',
    icon: Users, 
    gradient: 'from-[#667eea] to-[#764ba2]',
    change: '+12%',
    positive: true 
  },
  { 
    label: 'Hadir Hari Ini', 
    key: 'attendance',
    icon: QrCode, 
    gradient: 'from-[#4facfe] to-[#00f2fe]',
    change: '95%',
    positive: true 
  },
  { 
    label: 'Total Materi', 
    key: 'materials',
    icon: BookOpen, 
    gradient: 'from-[#f093fb] to-[#f5576c]',
    change: '+5',
    positive: true 
  },
  { 
    label: 'Pending Pembayaran', 
    key: 'payments',
    icon: Wallet, 
    gradient: 'from-[#11998e] to-[#38ef7d]',
    change: '8',
    positive: false 
  },
];

const recentStudents = [
  { name: 'Anisa Putri', class: 'Kelas 4', status: 'active', date: '10 Jan 2025' },
  { name: 'Budi Santoso', class: 'Kelas 5', status: 'active', date: '8 Jan 2025' },
  { name: 'Citra Dewi', class: 'Kelas 4', status: 'active', date: '5 Jan 2025' },
  { name: 'Dani Pratama', class: 'Kelas 6', status: 'inactive', date: '3 Jan 2025' },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    students: 0,
    attendance: 0,
    materials: 0,
    payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const studentsSnapshot = await getDocs(collection(db, 'students'));
        const materialsSnapshot = await getDocs(collection(db, 'materials'));
        const paymentsSnapshot = await getDocs(collection(db, 'payments'));
        
        // Get today's attendance
        const today = new Date().toISOString().split('T')[0];
        const attendanceSnapshot = await getDocs(collection(db, 'attendance'));
        const todayAttendance = attendanceSnapshot.docs.filter(
          doc => doc.data().date === today
        ).length;

        const pendingPayments = paymentsSnapshot.docs.filter(
          doc => doc.data().status === 'pending'
        ).length;

        setStats({
          students: studentsSnapshot.size,
          attendance: todayAttendance,
          materials: materialsSnapshot.size,
          payments: pendingPayments,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set demo data
        setStats({
          students: 124,
          attendance: 95,
          materials: 48,
          payments: 8,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Selamat datang di panel admin Narang Education</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                card.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {card.change}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-800">
                {loading ? '...' : stats[card.key as keyof typeof stats]}
              </div>
              <div className="text-sm text-gray-500">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Statistik Mingguan</h2>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
              <option>Tahun Ini</option>
            </select>
          </div>
          
          {/* Placeholder Chart */}
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-[#667eea] mx-auto mb-2" />
              <p className="text-gray-500">Chart akan ditampilkan di sini</p>
              <p className="text-xs text-gray-400">Gunakan Recharts untuk visualisasi</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            {[
              { label: 'Tambah Siswa', path: '/admin/students', icon: Users, color: '#667eea' },
              { label: 'Buat Materi', path: '/admin/materials', icon: BookOpen, color: '#4facfe' },
              { label: 'Buat Ujian', path: '/admin/exams', icon: PenTool, color: '#f093fb' },
              { label: 'Kelola Games', path: '/admin/games', icon: Gamepad2, color: '#11998e' },
            ].map((action) => (
              <Link key={action.path} href={action.path}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <action.icon className="w-5 h-5" style={{ color: action.color }} />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">
                    {action.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-gray-600" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Students */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Siswa Terbaru</h2>
          <Link href="/admin/students" className="text-sm text-[#667eea] font-medium hover:underline">
            Lihat Semua
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Nama</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Kelas</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Bergabung</th>
                <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map((student, index) => (
                <tr key={index} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#f093fb] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{student.class}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {student.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{student.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
