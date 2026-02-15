'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ibu Sarah',
    role: 'Orang Tua Siswa Kelas 4',
    content: 'Anak saya jadi lebih semangat belajar dengan game edukasi di Narang Education. Nilainya pun meningkat!',
    avatar: '👩',
    rating: 5,
  },
  {
    name: 'Pak Budi',
    role: 'Guru SD',
    content: 'Sistem absensi barcode sangat memudahkan saya. Tidak perlu lagi absensi manual yang merepotkan.',
    avatar: '👨‍🏫',
    rating: 5,
  },
  {
    name: 'Anisa',
    role: 'Siswa Kelas 5',
    content: 'Belajar di Narang Education asyik banget! Materinya lengkap dan game-nya seru-seru.',
    avatar: '👧',
    rating: 5,
  },
  {
    name: 'Ibu Dewi',
    role: 'Orang Tua Siswa Kelas 6',
    content: 'Pembayaran SPP jadi mudah dan transparan. Bisa cek status pembayaran kapan saja.',
    avatar: '👩‍💼',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
              Kata Mereka
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Ribuan siswa dan orang tua telah merasakan manfaatnya
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-[#667eea]/10">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4 relative z-10">{testimonial.content}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
