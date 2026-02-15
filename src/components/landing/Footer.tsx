'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <span className="text-xl font-bold">
                <span className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                  Narang
                </span>{' '}
                Education
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Platform bimbingan belajar SD terbaik dengan sistem modern dan materi lengkap.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-[#667eea] hover:to-[#764ba2] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              {['Beranda', 'Fitur', 'Harga', 'Tentang Kami', 'Kontak'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Fitur</h4>
            <ul className="space-y-2">
              {['Absensi Barcode', 'Materi Interaktif', 'Game Edukasi', 'Bank Soal', 'Pembayaran SPP'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 Narang Education. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
