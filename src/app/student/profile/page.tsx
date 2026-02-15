'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  GraduationCap,
  Users,
  Calendar,
  Edit,
  Camera,
  QrCode,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/firebase/config';
import { getUserData, getStudentData } from '@/lib/firebase/auth';

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const user = await getUserData(auth.currentUser.uid);
        const student = await getStudentData(auth.currentUser.uid);
        setUserData(user);
        setStudentData(student);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin w-8 h-8 border-4 border-[#667eea] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profil Saya</h1>
        <p className="text-gray-500">Kelola informasi akun Anda</p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] rounded-3xl p-6 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold">
                {userData?.name?.charAt(0) || 'S'}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-3.5 h-3.5 text-[#667eea]" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold">{userData?.name || 'Nama Siswa'}</h2>
            <p className="text-white/80">{userData?.email}</p>
            {studentData && (
              <Badge className="mt-2 bg-white/20 text-white border-0">
                Kelas {studentData.class}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      {/* Student Info */}
      {studentData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Informasi Siswa</h3>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-[#667eea]/10 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#667eea]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">NIS</p>
                <p className="font-medium text-gray-800">{studentData.studentId}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-[#4facfe]/10 rounded-xl flex items-center justify-center">
                <QrCode className="w-5 h-5 text-[#4facfe]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Barcode</p>
                <p className="font-mono text-sm text-gray-800">{studentData.barcode}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-[#11998e]/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#11998e]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <Badge className={studentData.status === 'active' ? 'bg-green-100 text-green-600 border-0' : 'bg-gray-100 text-gray-600 border-0'}>
                  {studentData.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Parent Info */}
      {studentData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Informasi Orang Tua</h3>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-[#f093fb]/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-[#f093fb]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Nama Orang Tua</p>
                <p className="font-medium text-gray-800">{studentData.parentName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 bg-[#fee140]/20 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#fa709a]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">No. HP Orang Tua</p>
                <p className="font-medium text-gray-800">{studentData.parentPhone}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Pengaturan Akun</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={userData?.email || ''}
                disabled
                className="pl-10 bg-gray-50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>No. HP</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Nomor telepon"
                className="pl-10"
              />
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl">
            <Edit className="w-4 h-4 mr-2" />
            Simpan Perubahan
          </Button>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button variant="outline" className="w-full rounded-xl" asChild>
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Ubah Password
          </div>
        </Button>
      </motion.div>
    </div>
  );
}
