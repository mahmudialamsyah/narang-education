'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogIn, Phone, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      requestAnimationFrame(() => setIsDark(true));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/6282257330958', '_blank');
  };

  const navItems = [
    { label: 'Beranda', href: '#' },
    { label: 'Fitur', href: '#features' },
    { label: 'Kontak', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Narang Education" 
            width={32} 
            height={32}
            className="rounded-lg"
          />
          <span className={`font-bold whitespace-nowrap ${scrolled ? (isDark ? 'text-white' : 'text-gray-900') : 'text-white'}`}>
            Narang Education
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                scrolled 
                  ? isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              scrolled
                ? isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* WhatsApp Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={openWhatsApp}
            className={`hidden sm:flex h-8 px-3 text-sm ${
              scrolled
                ? isDark ? 'text-green-400 hover:bg-green-400/10' : 'text-green-600 hover:bg-green-50'
                : 'text-green-300 hover:bg-white/10'
            }`}
          >
            <Phone className="w-4 h-4 mr-1" />
            WhatsApp
          </Button>

          {/* Login Button */}
          <Link href="/login">
            <Button
              size="sm"
              className={`h-8 px-4 text-sm ${
                scrolled
                  ? 'bg-[#007aff] text-white hover:bg-[#0066d6]'
                  : 'bg-white text-[#007aff] hover:bg-white/90'
              }`}
            >
              <LogIn className="w-4 h-4 mr-1" />
              Masuk
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 text-white"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-white dark:bg-[#2c2c2e] z-50 shadow-2xl"
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/10">
              <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="my-2 border-t border-gray-100 dark:border-white/10" />
              
              <button
                onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                onClick={() => { openWhatsApp(); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-400/10"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>

              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#007aff] hover:bg-[#007aff]/10">
                  <LogIn className="w-5 h-5" />
                  <span>Masuk / Daftar</span>
                </div>
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </header>
  );
}
