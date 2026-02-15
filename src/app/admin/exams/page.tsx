'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Plus, Search, Calendar, Users, Clock, Play, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminExamsPage() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      requestAnimationFrame(() => setIsDark(true));
    }
  }, []);

  // Demo exams data
  const exams = [
    { 
      id: 1, 
      title: 'Ujian Tengah Semester - Matematika', 
      kelas: '4',
      subject: 'Matematika',
      date: '2024-02-15',
      duration: 90,
      participants: 25,
      status: 'active'
    },
    { 
      id: 2, 
      title: 'Ujian Bahasa Indonesia', 
      kelas: '5',
      subject: 'Bahasa Indonesia',
      date: '2024-02-18',
      duration: 60,
      participants: 30,
      status: 'upcoming'
    },
    { 
      id: 3, 
      title: 'Tryout UN - IPA', 
      kelas: '6',
      subject: 'IPA',
      date: '2024-02-10',
      duration: 120,
      participants: 28,
      status: 'completed'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'upcoming': return 'Akan Datang';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const filteredExams = exams.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ujian
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Kelola ujian dan tryout
          </p>
        </div>
        <Button className="bg-[#007aff] hover:bg-[#0066d6]">
          <Plus className="w-4 h-4 mr-2" />
          Buat Ujian
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Cari ujian..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm ${
            isDark 
              ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {filteredExams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl p-4 ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {exam.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                    {getStatusLabel(exam.status)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4" />
                    {exam.date}
                  </span>
                  <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock className="w-4 h-4" />
                    {exam.duration} menit
                  </span>
                  <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Users className="w-4 h-4" />
                    {exam.participants} peserta
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {exam.status === 'active' && (
                  <Button size="sm" variant="outline" className="gap-1">
                    <Play className="w-4 h-4" />
                    Monitor
                  </Button>
                )}
                {exam.status === 'completed' && (
                  <Button size="sm" variant="outline" className="gap-1">
                    <BarChart className="w-4 h-4" />
                    Hasil
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
