'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  QrCode,
  Mail,
  Phone,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getAllStudents } from '@/lib/firebase/firestore';

// Demo students data
const demoStudents = [
  { id: '1', userId: '1', studentId: 'SD2024001', name: 'Anisa Putri', email: 'anisa@demo.com', class: '4', parentName: 'Ibu Sarah', parentPhone: '08123456789', status: 'active', barcode: 'NRG123ABC' },
  { id: '2', userId: '2', studentId: 'SD2024002', name: 'Budi Santoso', email: 'budi@demo.com', class: '5', parentName: 'Pak Ahmad', parentPhone: '08123456790', status: 'active', barcode: 'NRG456DEF' },
  { id: '3', userId: '3', studentId: 'SD2024003', name: 'Citra Dewi', email: 'citra@demo.com', class: '4', parentName: 'Ibu Dewi', parentPhone: '08123456791', status: 'active', barcode: 'NRG789GHI' },
  { id: '4', userId: '4', studentId: 'SD2024004', name: 'Dani Pratama', email: 'dani@demo.com', class: '6', parentName: 'Pak Budi', parentPhone: '08123456792', status: 'inactive', barcode: 'NRG012JKL' },
  { id: '5', userId: '5', studentId: 'SD2024005', name: 'Eka Putri', email: 'eka@demo.com', class: '5', parentName: 'Ibu Rina', parentPhone: '08123456793', status: 'active', barcode: 'NRG345MNO' },
];

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        if (data.length > 0) {
          setStudents(data);
        } else {
          setStudents(demoStudents);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents(demoStudents);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.studentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const classCounts = students.reduce((acc, student) => {
    acc[student.class] = (acc[student.class] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Siswa</h1>
          <p className="text-gray-500">Kelola data siswa bimbingan belajar</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Siswa
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Siswa', value: students.length, color: 'from-[#667eea] to-[#764ba2]' },
          { label: 'Aktif', value: students.filter(s => s.status === 'active').length, color: 'from-[#11998e] to-[#38ef7d]' },
          { label: 'Nonaktif', value: students.filter(s => s.status === 'inactive').length, color: 'from-[#f5576c] to-[#f093fb]' },
          { label: 'Kelas', value: Object.keys(classCounts).length, color: 'from-[#4facfe] to-[#00f2fe]' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cari nama, NIS, atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl border-gray-200"
            />
          </div>
          <div className="flex gap-2">
            {['', '4', '5', '6'].map((cls) => (
              <Button
                key={cls}
                variant={selectedClass === cls ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedClass(cls)}
                className={`rounded-xl ${selectedClass === cls ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]' : ''}`}
              >
                {cls ? `Kelas ${cls}` : 'Semua'}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-4">Siswa</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-4">NIS</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-4">Kelas</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-4">Orang Tua</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-4">Status</th>
                <th className="text-right text-xs font-medium text-gray-500 px-5 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                          <div className="h-3 bg-gray-100 rounded w-32 mt-1 animate-pulse" />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-20 animate-pulse" /></td>
                    <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-16 animate-pulse" /></td>
                    <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded w-24 animate-pulse" /></td>
                    <td className="px-5 py-4"><div className="h-5 bg-gray-100 rounded w-16 animate-pulse" /></td>
                    <td className="px-5 py-4"><div className="h-8 bg-gray-100 rounded w-8 ml-auto animate-pulse" /></td>
                  </tr>
                ))
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#f093fb] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {student.name?.charAt(0) || 'S'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {student.studentId}
                      </code>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="outline">Kelas {student.class}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm text-gray-700">{student.parentName}</p>
                        <p className="text-xs text-gray-500">{student.parentPhone}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge className={
                        student.status === 'active'
                          ? 'bg-green-100 text-green-600 border-0'
                          : 'bg-gray-100 text-gray-600 border-0'
                      }>
                        {student.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedStudent(student);
                              setShowDetail(true);
                            }}>
                              <QrCode className="w-4 h-4 mr-2" />
                              Lihat Barcode
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Tidak ada siswa ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Student Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Siswa</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#f093fb] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {selectedStudent.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{selectedStudent.name}</h3>
                  <p className="text-gray-500">{selectedStudent.email}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedStudent.parentPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedStudent.parentName}</span>
                </div>
              </div>

              {/* Barcode Card */}
              <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl p-4 text-white text-center">
                <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p className="font-mono text-sm">{selectedStudent.barcode}</p>
                <p className="text-xs text-white/70 mt-1">NIS: {selectedStudent.studentId}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
