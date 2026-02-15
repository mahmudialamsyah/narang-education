'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Siap Mulai Belajar?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Daftarkan anak Anda sekarang dan rasakan pengalaman belajar yang menyenangkan
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-semibold">Telepon</div>
              <div className="text-white/70 text-sm">+62 812-3456-7890</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-semibold">Email</div>
              <div className="text-white/70 text-sm">info@narangeducation.id</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-semibold">Alamat</div>
              <div className="text-white/70 text-sm">Jl. Pendidikan No. 123</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-[#667eea] hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-2xl shadow-2xl"
              >
                Daftar Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login?admin=true">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-2xl"
              >
                Login Admin
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
