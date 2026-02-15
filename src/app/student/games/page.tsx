'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Gamepad2, 
  Trophy, 
  Clock,
  Star,
  Play,
  Medal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getLeaderboard, GameScore } from '@/lib/firebase/firestore';

// Demo games
const games = [
  {
    id: 'math-challenge',
    title: 'Math Challenge',
    description: 'Uji kecepatan hitungmu!',
    icon: '🧮',
    color: 'from-[#667eea] to-[#764ba2]',
    difficulty: 'Mudah',
    players: 124,
  },
  {
    id: 'quiz-time',
    title: 'Quiz Time',
    description: 'Kuis pengetahuan umum',
    icon: '🧠',
    color: 'from-[#4facfe] to-[#00f2fe]',
    difficulty: 'Sedang',
    players: 89,
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Latih daya ingatmu',
    icon: '🎴',
    color: 'from-[#f093fb] to-[#f5576c]',
    difficulty: 'Mudah',
    players: 156,
  },
  {
    id: 'word-puzzle',
    title: 'Word Puzzle',
    description: 'Teka-teki kata seru',
    icon: '📝',
    color: 'from-[#11998e] to-[#38ef7d]',
    difficulty: 'Sedang',
    players: 67,
  },
];

// Demo leaderboard
const demoLeaderboard = [
  { id: '1', gameId: 'math-challenge', studentId: '1', studentName: 'Anisa Putri', score: 1250, playedAt: new Date() },
  { id: '2', gameId: 'math-challenge', studentId: '2', studentName: 'Budi Santoso', score: 1100, playedAt: new Date() },
  { id: '3', gameId: 'math-challenge', studentId: '3', studentName: 'Citra Dewi', score: 980, playedAt: new Date() },
  { id: '4', gameId: 'math-challenge', studentId: '4', studentName: 'Dani Pratama', score: 850, playedAt: new Date() },
  { id: '5', gameId: 'math-challenge', studentId: '5', studentName: 'Eka Putri', score: 720, playedAt: new Date() },
];

export default function GamesPage() {
  const [leaderboard, setLeaderboard] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        if (data.length > 0) {
          setLeaderboard(data);
        } else {
          setLeaderboard(demoLeaderboard);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLeaderboard(demoLeaderboard);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Game Edukasi</h1>
        <p className="text-gray-500">Belajar sambil bermain!</p>
      </div>

      {/* Featured Game */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] rounded-3xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl opacity-20" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
            🎮
          </div>
          <div className="flex-1">
            <Badge className="bg-white/20 text-white border-0 mb-2">Game Terpopuler</Badge>
            <h2 className="text-xl font-bold text-white">Math Challenge</h2>
            <p className="text-white/80 text-sm">124 siswa bermain hari ini</p>
          </div>
          <Link href="/student/games/math-challenge">
            <Button className="bg-white text-[#667eea] hover:bg-white/90 rounded-xl shadow-lg">
              <Play className="w-4 h-4 mr-2" />
              Main
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Games Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pilih Game</h2>
        <div className="grid grid-cols-2 gap-4">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/student/games/${game.id}`}>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl mb-3 shadow-lg`}>
                    {game.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#667eea] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{game.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {game.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gamepad2 className="w-3 h-3" />
                      {game.players}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#fee140]" />
            <h2 className="font-semibold text-gray-800">Leaderboard</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {leaderboard.map((entry, index) => (
            <div key={entry.id || index} className="flex items-center gap-4 p-4">
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0 ? 'bg-gradient-to-br from-[#fee140] to-[#fa709a] text-white' :
                index === 1 ? 'bg-gradient-to-br from-[#a8a8a8] to-[#d4d4d4] text-white' :
                index === 2 ? 'bg-gradient-to-br from-[#cd7f32] to-[#daa06d] text-white' :
                'bg-gray-100 text-gray-600'
              }`}>
                {index < 3 ? <Medal className="w-4 h-4" /> : index + 1}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#f093fb] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {entry.studentName.charAt(0)}
                </span>
              </div>

              {/* Name */}
              <div className="flex-1">
                <p className="font-medium text-gray-800">{entry.studentName}</p>
                <p className="text-xs text-gray-500">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {entry.playedAt ? new Date(entry.playedAt).toLocaleDateString('id-ID') : 'Hari ini'}
                </p>
              </div>

              {/* Score */}
              <div className="text-right">
                <p className="font-bold text-gray-800">{entry.score.toLocaleString()}</p>
                <p className="text-xs text-gray-500">poin</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
