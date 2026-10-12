'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Search,
  Bookmark,
  FlaskConical,
  Clock,
  Users,
  Sparkles,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react';
import { getBookmarks } from '@/lib/storage';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // Sync bookmark count
  useEffect(() => {
    const updateCount = () => {
      setBookmarkCount(getBookmarks().length);
    };
    updateCount();
    window.addEventListener('eurekalab_storage_update', updateCount);
    return () => window.removeEventListener('eurekalab_storage_update', updateCount);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('eurekalab_open_search'));
  };

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Compass },
    { href: '/discover', label: 'Penemuan', icon: Sparkles },
    { href: '/scientists', label: 'Ilmuwan', icon: Users },
    { href: '/timeline', label: 'Garis Waktu', icon: Clock },
    { href: '/lab', label: 'Science Lab', icon: FlaskConical },
    { href: '/quiz', label: 'Kuis Sains', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07111F]/85 backdrop-blur-md border-b border-[rgba(99,230,255,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D1B2A] to-[#1E3A5F] border border-[#63E6FF]/40 flex items-center justify-center shadow-lg group-hover:border-[#63E6FF] transition duration-300">
            <Compass className="w-5 h-5 text-[#63E6FF] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              Eureka<span className="text-[#63E6FF]">Lab</span>
            </span>
            <span className="text-[10px] text-[#A8B7C8] tracking-widest uppercase font-mono hidden sm:inline">
              Scientific Discovery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#122238] text-[#63E6FF] border border-[rgba(99,230,255,0.25)] shadow-sm'
                    : 'text-[#A8B7C8] hover:text-white hover:bg-[#122238]/50'
                }`}
              >
                <Icon className="w-4 h-4 opacity-80" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons: Search & Saved Bookmarks */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-[#0D1B2A] border border-[rgba(99,230,255,0.18)] hover:border-[#63E6FF] text-[#A8B7C8] hover:text-white transition group text-xs sm:text-sm"
            aria-label="Cari penemuan atau ilmuwan"
          >
            <Search className="w-4 h-4 text-[#63E6FF]" />
            <span className="hidden sm:inline">Cari Penemuan...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#182C48] text-[#A8B7C8] rounded border border-[#1E3A5F]">
              Ctrl+K
            </kbd>
          </button>

          {/* Bookmarks Link */}
          <Link
            href="/saved"
            className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-[#0D1B2A] border border-[rgba(99,230,255,0.18)] hover:border-[#63E6FF] text-[#A8B7C8] hover:text-white transition flex items-center gap-1.5 text-xs sm:text-sm"
            title="Artikel Tersimpan & Progres Belajar"
          >
            <Bookmark className="w-4 h-4 text-[#63E6FF]" />
            <span className="hidden sm:inline">Tersimpan</span>
            {bookmarkCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold font-mono bg-[#63E6FF] text-[#07111F] rounded-full">
                {bookmarkCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#0D1B2A] border border-[rgba(99,230,255,0.18)] text-white"
            aria-label="Buka menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#1E3A5F] bg-[#07111F] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#122238] text-[#63E6FF] border border-[#63E6FF]/30 font-semibold'
                    : 'text-[#A8B7C8] hover:text-white hover:bg-[#122238]/60'
                }`}
              >
                <Icon className="w-4 h-4 text-[#63E6FF]" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
