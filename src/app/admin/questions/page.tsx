'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminQuestionsPage() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      requestAnimationFrame(() => setIsDark(true));
    }
  }, []);

  // Demo questions data
  const questions = [
    { id: 1, question: 'Berapakah hasil dari 125 + 375?', subject: 'Matematika', kelas: '4', difficulty: 'mudah' },
    { id: 2, question: 'Apa ibukota provinsi Jawa Timur?', subject: 'IPS', kelas: '5', difficulty: 'mudah' },
    { id: 3, question: 'Siapakah pahlawan yang dikenal dengan sebutan "Bapak Pendidikan Nasional"?', subject: 'PPKn', kelas: '6', difficulty: 'sedang' },
    { id: 4, question: 'Hewan yang berkembang biak dengan bertelur disebut...', subject: 'IPA', kelas: '4', difficulty: 'mudah' },
    { id: 5, question: 'Tentukan nilai x dari persamaan 2x + 5 = 15', subject: 'Matematika', kelas: '6', difficulty: 'sulit' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'mudah': return 'bg-green-100 text-green-700';
      case 'sedang': return 'bg-yellow-100 text-yellow-700';
      case 'sulit': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       q.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKelas = !selectedKelas || q.kelas === selectedKelas;
    return matchSearch && matchKelas;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Bank Soal
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Kelola bank soal untuk ujian dan latihan
          </p>
        </div>
        <Button className="bg-[#007aff] hover:bg-[#0066d6]">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Soal
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Cari soal..."
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
          value={selectedKelas}
          onChange={(e) => setSelectedKelas(e.target.value)}
          className={`px-4 py-2.5 rounded-lg border text-sm ${
            isDark 
              ? 'bg-[#1c1c1e] border-white/10 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <option value="">Semua Kelas</option>
          {[4, 5, 6].map(k => (
            <option key={k} value={k.toString()}>Kelas {k}</option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className={`rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm overflow-hidden`}>
        <div className="divide-y divide-gray-100 dark:divide-white/10">
          {filteredQuestions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex-1">
                <div className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.question}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`px-2 py-0.5 rounded ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {item.subject}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Kelas {item.kelas}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                  <Edit className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
                <button className={`p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20`}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
