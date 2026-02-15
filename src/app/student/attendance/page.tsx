'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  Camera, 
  CheckCircle, 
  XCircle,
  Clock,
  Calendar,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase/config';
import { getUserData, getStudentData } from '@/lib/firebase/auth';
import { recordAttendance, getStudentAttendance, AttendanceRecord } from '@/lib/firebase/firestore';

export default function AttendancePage() {
  const [userData, setUserData] = useState<any>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setStatus('idle');
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStatus('scanning');
    } catch (error) {
      console.error('Error accessing camera:', error);
      setStatus('error');
      setMessage('Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const user = await getUserData(auth.currentUser.uid);
        const student = await getStudentData(auth.currentUser.uid);
        setUserData(user);
        setStudentData(student);

        // Fetch attendance history
        try {
          const history = await getStudentAttendance(auth.currentUser.uid);
          setAttendanceHistory(history);
          
          // Check today's attendance
          const today = new Date().toISOString().split('T')[0];
          const todayRecord = history.find(h => h.date === today);
          if (todayRecord) {
            setTodayAttendance(todayRecord);
          }
        } catch (error) {
          console.error('Error fetching attendance:', error);
        }
      }
    };
    fetchData();

    return () => {
      stopCamera();
    };
  }, []);

  const simulateScan = async () => {
    // Simulate barcode detection (in real app, use a barcode scanning library)
    setStatus('scanning');
    setMessage('Memproses...');

    setTimeout(async () => {
      if (!studentData || !userData) {
        setStatus('error');
        setMessage('Data siswa tidak ditemukan');
        return;
      }

      try {
        // Record attendance
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
        // Determine status based on time (after 08:00 is late)
        const hour = now.getHours();
        const attendanceStatus = hour >= 8 ? 'late' : 'present';

        await recordAttendance({
          studentId: auth.currentUser!.uid,
          studentName: userData.name,
          date: today,
          time: time,
          status: attendanceStatus,
        });

        setStatus('success');
        setMessage(`Absensi tercatat! Status: ${attendanceStatus === 'present' ? 'Hadir' : 'Terlambat'}`);
        
        // Refresh history
        const history = await getStudentAttendance(auth.currentUser!.uid);
        setAttendanceHistory(history);
        
        const todayRecord = history.find(h => h.date === today);
        if (todayRecord) {
          setTodayAttendance(todayRecord);
        }
      } catch (error) {
        console.error('Error recording attendance:', error);
        setStatus('error');
        setMessage('Gagal mencatat absensi. Silakan coba lagi.');
      }

      stopCamera();
    }, 2000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Absensi</h1>
        <p className="text-gray-500">Scan barcode untuk mencatat kehadiran</p>
      </div>

      {/* Today's Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-6 ${
          todayAttendance
            ? 'bg-gradient-to-br from-[#11998e] to-[#38ef7d]'
            : 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
        } relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">Hari Ini</p>
              <p className="text-white font-semibold">{formatDate(new Date().toISOString().split('T')[0])}</p>
            </div>
          </div>

          {todayAttendance ? (
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-white" />
              <div>
                <p className="text-white font-bold text-lg">Sudah Absen</p>
                <p className="text-white/80 text-sm">
                  {todayAttendance.time} - {todayAttendance.status === 'present' ? 'Hadir' : 'Terlambat'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-white" />
              <div>
                <p className="text-white font-bold text-lg">Belum Absen</p>
                <p className="text-white/80 text-sm">Tekan tombol di bawah untuk scan barcode</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Scanner Section */}
      {!todayAttendance && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Scan Barcode Absensi</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Arahkan kamera ke barcode yang tersedia di lokasi bimbingan
                </p>
                <Button
                  onClick={simulateScan}
                  className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl h-12 px-8 shadow-lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Buka Kamera
                </Button>
              </motion.div>
            )}

            {status === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="relative aspect-square max-w-xs mx-auto bg-gray-900 rounded-2xl overflow-hidden mb-6">
                  {/* Scanner overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-white/50 rounded-2xl relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#667eea] animate-pulse" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RefreshCw className="w-12 h-12 text-white animate-spin" />
                  </div>
                </div>
                <p className="text-gray-600">{message || 'Memindai barcode...'}</p>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#11998e] to-[#38ef7d] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-xl mb-2">Berhasil!</h3>
                <p className="text-gray-600">{message}</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#f5576c] to-[#f093fb] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <XCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-xl mb-2">Gagal</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <Button
                  onClick={() => setStatus('idle')}
                  variant="outline"
                  className="rounded-xl"
                >
                  Coba Lagi
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Student Barcode Card */}
      {studentData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="font-semibold text-gray-800 mb-4">Kartu Siswa</h3>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{userData?.name}</p>
                <p className="text-sm text-gray-500">NIS: {studentData.studentId}</p>
                <p className="text-xs text-gray-400 mt-1">Barcode: {studentData.barcode}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Attendance History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Riwayat Absensi</h3>
        </div>
        
        <div className="divide-y divide-gray-50">
          {attendanceHistory.length > 0 ? (
            attendanceHistory.slice(0, 7).map((record, index) => (
              <div key={record.id || index} className="flex items-center gap-4 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  record.status === 'present' 
                    ? 'bg-green-100' 
                    : record.status === 'late' 
                    ? 'bg-yellow-100' 
                    : 'bg-red-100'
                }`}>
                  {record.status === 'present' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : record.status === 'late' ? (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">
                    {new Date(record.date).toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </p>
                  <p className="text-xs text-gray-500">{record.time}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  record.status === 'present' 
                    ? 'bg-green-100 text-green-600' 
                    : record.status === 'late'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {record.status === 'present' ? 'Hadir' : record.status === 'late' ? 'Terlambat' : 'Tidak Hadir'}
                </span>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Belum ada riwayat absensi</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
