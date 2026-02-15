'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Gamepad2, 
  QrCode, 
  BarChart3, 
  Users, 
  CreditCard,
  PenTool,
  Trophy
} from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'Absensi Barcode',
    description: 'Sistem absensi modern dengan scan barcode. Cepat, akurat, dan mudah digunakan.',
    gradient: 'from-[#667eea] to-[#764ba2]',
  },
  {
    icon: BookOpen,
    title: 'Materi Interaktif',
    description: 'Materi pembelajaran lengkap dengan teks dan gambar untuk semua mata pelajaran SD.',
    gradient: 'from-[#4facfe] to-[#00f2fe]',
  },
  {
    icon: PenTool,
    title: 'Bank Soal',
    description: 'Ribuan soal latihan dan ujian dengan berbagai tingkat kesulitan.',
    gradient: 'from-[#f093fb] to-[#f5576c]',
  },
  {
    icon: Gamepad2,
    title: 'Game Edukasi',
    description: 'Belajar sambil bermain dengan game edukatif yang menyenangkan.',
    gradient: 'from-[#11998e] to-[#38ef7d]',
  },
  {
    icon: Trophy,
    title: 'Scoreboard',
    description: 'Lihat ranking dan achievemen. Kompetisi sehat antar siswa.',
    gradient: 'from-[#fa709a] to-[#fee140]',
  },
  {
    icon: BarChart3,
    title: 'Laporan Progress',
    description: 'Pantau perkembangan belajar siswa dengan laporan komprehensif.',
    gradient: 'from-[#667eea] to-[#f093fb]',
  },
  {
    icon: Users,
    title: 'Manajemen Siswa',
    description: 'Dashboard admin lengkap untuk mengelola data siswa dan kelas.',
    gradient: 'from-[#4facfe] to-[#f093fb]',
  },
  {
    icon: CreditCard,
    title: 'Pembayaran SPP',
    description: 'Sistem pembayaran SPP online yang mudah dan terintegrasi.',
    gradient: 'from-[#764ba2] to-[#f5576c]',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Fitur Lengkap
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Semua yang Anda butuhkan untuk bimbingan belajar modern dalam satu platform
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
              
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#667eea] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
