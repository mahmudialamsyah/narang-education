'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Reguler',
    price: 'Rp 150.000',
    period: '/bulan',
    description: 'Cocok untuk siswa yang ingin belajar dengan santai',
    features: [
      'Akses semua materi',
      'Bank soal lengkap',
      'Game edukasi',
      'Absensi barcode',
      'Laporan progress bulanan',
    ],
    gradient: 'from-[#667eea] to-[#764ba2]',
    popular: false,
  },
  {
    name: 'Premium',
    price: 'Rp 250.000',
    period: '/bulan',
    description: 'Pilihan terbaik untuk hasil maksimal',
    features: [
      'Semua fitur Reguler',
      'Konsultasi langsung dengan guru',
      'Tryout khusus',
      'Pembahasan soal detail',
      'Sertifikat digital',
      'Akses materi eksklusif',
    ],
    gradient: 'from-[#f093fb] to-[#f5576c]',
    popular: true,
  },
  {
    name: 'Intensive',
    price: 'Rp 400.000',
    period: '/bulan',
    description: 'Program intensif untuk persiapan ujian',
    features: [
      'Semua fitur Premium',
      'Bimbingan personal 1-on-1',
      'Program khusus UN/US',
      'Tryout prediktif',
      'Analisis kelemahan',
      'Jadwal fleksibel',
    ],
    gradient: 'from-[#4facfe] to-[#00f2fe]',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Pilih Paket
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Investasi terbaik untuk masa depan anak Anda
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-3xl p-6 shadow-lg border ${
                plan.popular ? 'border-[#f093fb]/50 scale-105' : 'border-gray-100'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Terpopuler
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4 shadow-lg`}
                >
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/login" className="block">
                <Button
                  className={`w-full bg-gradient-to-r ${plan.gradient} text-white rounded-xl font-semibold`}
                >
                  Daftar Sekarang
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
