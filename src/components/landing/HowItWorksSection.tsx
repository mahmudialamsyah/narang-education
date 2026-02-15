'use client';

import { motion } from 'framer-motion';
import { UserPlus, QrCode, BookOpen, Trophy } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Daftar Akun',
    description: 'Buat akun siswa atau admin dengan mudah',
    gradient: 'from-[#667eea] to-[#764ba2]',
  },
  {
    icon: QrCode,
    title: 'Scan Absensi',
    description: 'Absen harian dengan scan barcode',
    gradient: 'from-[#4facfe] to-[#00f2fe]',
  },
  {
    icon: BookOpen,
    title: 'Belajar Materi',
    description: 'Akses materi dan kerjakan soal latihan',
    gradient: 'from-[#f093fb] to-[#f5576c]',
  },
  {
    icon: Trophy,
    title: 'Raih Prestasi',
    description: 'Kumpulkan skor dan lihat ranking',
    gradient: 'from-[#11998e] to-[#38ef7d]',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#667eea] rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f093fb] rounded-full blur-3xl opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Cara Kerja
          </h2>
          <p className="text-gray-400 text-lg">
            Mulai belajar dalam 4 langkah sederhana
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#667eea]/50 to-transparent z-0" />
              )}

              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 text-center">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-4 shadow-xl`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
