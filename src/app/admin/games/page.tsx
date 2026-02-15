'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Plus, Search, Edit, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminGamesPage() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      requestAnimationFrame(() => setIsDark(true));
    }
  }, []);

  // Demo games data
  const games = [
    { id: 1, title: 'Kuis Matematika', subject: 'Matematika', kelas: '4', plays: 156, rating: 4.5 },
    { id: 2, title: 'Tebak Kata Benda', subject: 'Bahasa Indonesia', kelas: '5', plays: 234, rating: 4.8 },
    { id: 3, title: 'Petualangan IPA', subject: 'IPA', kelas: '6', plays: 189, rating: 4.7 },
    { id: 4, title: 'Puzzle Geografi', subject: 'IPS', kelas: '5', plays: 98, rating: 4.3 },
    { id: 5, title: 'Quiz Pahlawan', subject: 'PPKn', kelas: '4', plays: 145, rating: 4.6 },
  ];

  const filteredGames = games.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Game Edukasi
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Kelola game edukasi untuk siswa
          </p>
        </div>
        <Button className="bg-[#007aff] hover:bg-[#0066d6]">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Game
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Cari game..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm ${
            isDark 
              ? 'bg-[#1c1c1e] border-white/10 text-white placeholder-gray-500' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-xl p-4 ${isDark ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff9500] to-[#ff6b00] rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <div className="flex gap-1">
                <button className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                  <Edit className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {game.title}
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {game.subject} • Kelas {game.kelas}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {game.rating}
                </span>
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {game.plays} dimainkan
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
