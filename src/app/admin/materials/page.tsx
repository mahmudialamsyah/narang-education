'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Search, Edit, Trash2, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminMaterialsPage() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      requestAnimationFrame(() => setIsDark(true));
    }
  }, []);

  // Demo materials data
  const materials = [
    { id: 1, title: 'Matematika Kelas 4 - Bab 1: Bilangan', kelas: '4', type: 'pdf', date: '2024-01-15' },
    { id: 2, title: 'Bahasa Indonesia - Membaca Puisi', kelas: '5', type: 'video', date: '2024-01-14' },
    { id: 3, title: 'IPA - Sistem Tata Surya', kelas: '6', type: 'pdf', date: '2024-01-13' },
    { id: 4, title: 'IPS - Kerajaan Hindu-Buddha', kelas: '5', type: 'link', date: '2024-01-12' },
    { id: 5, title: 'PKn - Pancasila', kelas: '4', type: 'pdf', date: '2024-01-11' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'link': return <LinkIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-600';
      case 'video': return 'bg-purple-100 text-purple-600';
      case 'link': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Materi Pembelajaran
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Kelola materi pembelajaran siswa
          </p>
        </div>
        <Button className="bg-[#007aff] hover:bg-[#0066d6]">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Materi
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Cari materi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm ${
            isDark 
              ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>

      {/* Materials List */}
      <div className={`rounded-xl ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm overflow-hidden`}>
        <div className="divide-y divide-gray-100 dark:divide-white/10">
          {filteredMaterials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Kelas {item.kelas} • {item.date}
                  </div>
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
