'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Search, Filter, CheckCircle, Clock, XCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPaymentsPage() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      requestAnimationFrame(() => setIsDark(true));
    }
  }, []);

  // Demo payments data
  const payments = [
    { id: 1, student: 'Ahmad Rizki', kelas: '4', amount: 150000, date: '2024-01-15', status: 'paid', method: 'Transfer' },
    { id: 2, student: 'Siti Aisyah', kelas: '5', amount: 250000, date: '2024-01-14', status: 'paid', method: 'Cash' },
    { id: 3, student: 'Budi Santoso', kelas: '4', amount: 150000, date: '2024-01-13', status: 'pending', method: 'Transfer' },
    { id: 4, student: 'Dewi Lestari', kelas: '6', amount: 400000, date: '2024-01-12', status: 'paid', method: 'Transfer' },
    { id: 5, student: 'Eko Prasetyo', kelas: '5', amount: 250000, date: '2024-01-11', status: 'overdue', method: 'Cash' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Lunas';
      case 'pending': return 'Menunggu';
      case 'overdue': return 'Terlambat';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredPayments = payments.filter(p => {
    const matchSearch = p.student.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = !selectedStatus || p.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Pembayaran
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Kelola pembayaran siswa
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
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
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>3</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Lunas</div>
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
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Menunggu</div>
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
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Terlambat</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Cari siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm ${
              isDark 
                ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500' 
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className={`px-4 py-2.5 rounded-lg border text-sm ${
            isDark 
              ? 'bg-[#1c1c1e] border-white/10 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <option value="">Semua Status</option>
          <option value="paid">Lunas</option>
          <option value="pending">Menunggu</option>
          <option value="overdue">Terlambat</option>
        </select>
      </div>

      {/* Payments List */}
      <div className={`rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm overflow-hidden`}>
        <div className="divide-y divide-gray-100 dark:divide-white/10">
          {filteredPayments.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{item.student.charAt(0)}</span>
                </div>
                <div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.student}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Kelas {item.kelas} • {item.method}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(item.amount)}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.date}
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {getStatusLabel(item.status)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
