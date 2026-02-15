'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Filter,
  ChevronRight,
  Clock,
  Eye
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getMaterials, Material } from '@/lib/firebase/firestore';
import { CATEGORIES, GRADES } from '@/types';

// Demo materials for when Firebase is not configured
const demoMaterials: Material[] = [
  {
    id: '1',
    title: 'Operasi Hitung Bilangan',
    description: 'Pelajari penjumlahan, pengurangan, perkalian, dan pembagian',
    content: '<p>Konten materi...</p>',
    images: [],
    category: 'matematika',
    grade: '4',
    author: 'Guru Matematika',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Makhluk Hidup dan Lingkungan',
    description: 'Memahami hubungan makhluk hidup dengan lingkungannya',
    content: '<p>Konten materi...</p>',
    images: [],
    category: 'ipa',
    grade: '4',
    author: 'Guru IPA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Teks Naratif - Cerita Rakyat',
    description: 'Membaca dan memahami cerita rakyat Indonesia',
    content: '<p>Konten materi...</p>',
    images: [],
    category: 'bahasa_indonesia',
    grade: '5',
    author: 'Guru Bahasa',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Introduction to English',
    description: 'Basic English vocabulary and greetings',
    content: '<p>Konten materi...</p>',
    images: [],
    category: 'bahasa_inggris',
    grade: '4',
    author: 'English Teacher',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Sejarah Kerajaan Hindu-Buddha',
    description: 'Mengenal kerajaan Hindu-Buddha di Indonesia',
    content: '<p>Konten materi...</p>',
    images: [],
    category: 'ips',
    grade: '5',
    author: 'Guru IPS',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: 'Pecahan dan Desimal',
    description: 'Memahami konsep pecahan dan konversi ke desimal',
    content: '<p>Konten materi...</p>',
    images: [],
    category: 'matematika',
    grade: '5',
    author: 'Guru Matematika',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await getMaterials();
        if (data.length > 0) {
          setMaterials(data);
          setFilteredMaterials(data);
        } else {
          // Use demo materials
          setMaterials(demoMaterials);
          setFilteredMaterials(demoMaterials);
        }
      } catch (error) {
        console.error('Error fetching materials:', error);
        setMaterials(demoMaterials);
        setFilteredMaterials(demoMaterials);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  useEffect(() => {
    let filtered = materials;

    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }

    if (selectedGrade) {
      filtered = filtered.filter(m => m.grade === selectedGrade);
    }

    setFilteredMaterials(filtered);
  }, [searchQuery, selectedCategory, selectedGrade, materials]);

  const getCategoryInfo = (categoryValue: string) => {
    return CATEGORIES.find(c => c.value === categoryValue) || { label: categoryValue, icon: '📚' };
  };

  const getGradeInfo = (gradeValue: string) => {
    return GRADES.find(g => g.value === gradeValue) || { label: `Kelas ${gradeValue}` };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Materi Pembelajaran</h1>
        <p className="text-gray-500">Pilih materi untuk mulai belajar</p>
      </div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cari materi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl border-gray-200"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('')}
              className={`rounded-xl ${selectedCategory === '' ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]' : ''}`}
            >
              Semua
            </Button>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-xl whitespace-nowrap ${selectedCategory === cat.value ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]' : ''}`}
              >
                {cat.icon} {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Grade Filter */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {GRADES.map((grade) => (
            <Button
              key={grade.value}
              variant={selectedGrade === grade.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGrade(grade.value)}
              className={`rounded-xl text-xs ${selectedGrade === grade.value ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]' : ''}`}
            >
              {grade.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Materials Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMaterials.map((material, index) => {
            const categoryInfo = getCategoryInfo(material.category);
            const gradeInfo = getGradeInfo(material.grade);
            
            return (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/student/materials/${material.id}`}>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center text-xl shadow-lg">
                        {categoryInfo.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 group-hover:text-[#667eea] transition-colors truncate">
                          {material.title}
                        </h3>
                        <p className="text-xs text-gray-500">{material.author}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#667eea] transition-colors" />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {material.description}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                        {categoryInfo.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {gradeInfo.label}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredMaterials.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-600 font-medium mb-2">Tidak ada materi ditemukan</h3>
          <p className="text-gray-400 text-sm">Coba ubah filter atau kata kunci pencarian</p>
        </motion.div>
      )}
    </div>
  );
}
