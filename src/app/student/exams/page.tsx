'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  PenTool, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Calendar,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getExams, getStudentResults, Exam, ExamResult } from '@/lib/firebase/firestore';

// Demo exams
const demoExams: Exam[] = [
  {
    id: '1',
    title: 'Ujian Matematika - Bab 1',
    description: 'Operasi Hitung Bilangan Bulat',
    questions: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    duration: 30,
    startTime: new Date(Date.now() - 86400000),
    endTime: new Date(Date.now() + 86400000 * 7),
    grade: '4',
    status: 'published',
  },
  {
    id: '2',
    title: 'Ujian IPA - Makhluk Hidup',
    description: 'Ciri-ciri dan kebutuhan makhluk hidup',
    questions: ['1', '2', '3', '4', '5'],
    duration: 20,
    startTime: new Date(Date.now() - 86400000 * 2),
    endTime: new Date(Date.now() + 86400000 * 5),
    grade: '4',
    status: 'published',
  },
  {
    id: '3',
    title: 'Ujian Bahasa Indonesia',
    description: 'Teks Naratif dan Cerita Rakyat',
    questions: ['1', '2', '3', '4', '5', '6', '7', '8'],
    duration: 25,
    startTime: new Date(Date.now() + 86400000),
    endTime: new Date(Date.now() + 86400000 * 7),
    grade: '5',
    status: 'published',
  },
];

const demoResults: ExamResult[] = [
  {
    id: '1',
    examId: '3',
    studentId: '1',
    studentName: 'Test Student',
    answers: [],
    score: 85,
    completedAt: new Date(Date.now() - 86400000 * 3),
  },
];

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsData, resultsData] = await Promise.all([
          getExams(),
          getStudentResults('demo'),
        ]);
        
        if (examsData.length > 0) {
          setExams(examsData);
        } else {
          setExams(demoExams);
        }
        
        if (resultsData.length > 0) {
          setResults(resultsData);
        } else {
          setResults(demoResults);
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
        setExams(demoExams);
        setResults(demoResults);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const completedExamIds = results.map(r => r.examId);
  const availableExams = exams.filter(e => !completedExamIds.includes(e.id));
  const completedExams = exams.filter(e => completedExamIds.includes(e.id));

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isExamActive = (exam: Exam) => {
    const now = new Date();
    return now >= new Date(exam.startTime) && now <= new Date(exam.endTime);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pusat Ujian</h1>
        <p className="text-gray-500">Kerjakan ujian dan lihat hasilnya</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
        >
          <PenTool className="w-5 h-5 mx-auto mb-2 text-[#667eea]" />
          <div className="text-2xl font-bold text-gray-800">{availableExams.length}</div>
          <div className="text-xs text-gray-500">Tersedia</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
        >
          <CheckCircle className="w-5 h-5 mx-auto mb-2 text-[#38ef7d]" />
          <div className="text-2xl font-bold text-gray-800">{completedExams.length}</div>
          <div className="text-xs text-gray-500">Selesai</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
        >
          <BarChart3 className="w-5 h-5 mx-auto mb-2 text-[#f093fb]" />
          <div className="text-2xl font-bold text-gray-800">
            {results.length > 0 ? Math.round(results.reduce((a, b) => a + b.score, 0) / results.length) : 0}
          </div>
          <div className="text-xs text-gray-500">Rata-rata</div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('available')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'available'
              ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          Tersedia ({availableExams.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'completed'
              ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          Selesai ({completedExams.length})
        </button>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-100 rounded w-16" />
                <div className="h-6 bg-gray-100 rounded w-20" />
              </div>
            </div>
          ))
        ) : activeTab === 'available' ? (
          availableExams.length > 0 ? (
            availableExams.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/student/exams/${exam.id}`}>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isExamActive(exam)
                          ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
                          : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      } shadow-lg`}>
                        <PenTool className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 group-hover:text-[#667eea] transition-colors">
                          {exam.title}
                        </h3>
                        <p className="text-sm text-gray-500">{exam.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#667eea] transition-colors" />
                    </div>

                    {/* Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {exam.duration} menit
                      </span>
                      <span className="flex items-center gap-1">
                        <PenTool className="w-4 h-4" />
                        {exam.questions.length} soal
                      </span>
                      <Badge variant="outline" className="ml-auto">
                        Kelas {exam.grade}
                      </Badge>
                    </div>

                    {/* Status */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Batas: {formatDate(exam.endTime)}</span>
                      </div>
                      {isExamActive(exam) ? (
                        <Badge className="bg-green-100 text-green-600 border-0">Aktif</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500 border-0">Segera</Badge>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-600 font-medium mb-2">Semua ujian selesai!</h3>
              <p className="text-gray-400 text-sm">Tidak ada ujian yang tersedia saat ini</p>
            </div>
          )
        ) : (
          completedExams.length > 0 ? (
            completedExams.map((exam, index) => {
              const result = results.find(r => r.examId === exam.id);
              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#11998e] to-[#38ef7d] rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{exam.title}</h3>
                      <p className="text-sm text-gray-500">{exam.questions.length} soal</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">{result?.score || 0}</div>
                      <div className="text-xs text-gray-500">Nilai</div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-600 font-medium mb-2">Belum ada ujian selesai</h3>
              <p className="text-gray-400 text-sm">Kerjakan ujian yang tersedia</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
