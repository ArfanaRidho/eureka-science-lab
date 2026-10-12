import React from 'react';
import Link from 'next/link';
import { Compass, BookOpen, FlaskConical, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050C16] border-t border-[#1E3A5F] pt-14 pb-10 text-[#A8B7C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#182C48]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#122238] border border-[#63E6FF]/40 flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#63E6FF]" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Eureka<span className="text-[#63E6FF]">Lab</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#A8B7C8] max-w-sm">
              Platform edukasi sains interaktif yang menelusuri kisah di balik penemuan ilmiah terbesar, tokoh ilmuwan revolusioner, dan inovasi yang membentuk peradaban manusia.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#122238] border border-[rgba(99,230,255,0.2)] text-xs text-[#63E6FF] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tagline: Every Great Discovery Begins With a Question.</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#63E6FF] transition">Beranda</Link>
              </li>
              <li>
                <Link href="/discover" className="hover:text-[#63E6FF] transition">Katalog Penemuan</Link>
              </li>
              <li>
                <Link href="/scientists" className="hover:text-[#63E6FF] transition">Direktori Ilmuwan</Link>
              </li>
              <li>
                <Link href="/timeline" className="hover:text-[#63E6FF] transition">Garis Waktu Inovasi</Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-[#63E6FF] transition">Laboratorium Sains</Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-[#63E6FF] transition">Tantangan Kuis Sains</Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-[#63E6FF] transition">Artikel Tersimpan</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Kategori Penemuan</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/discover?category=${cat.id}`}
                  className="hover:text-[#63E6FF] transition truncate flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.accentColor }} />
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* References and Educational Integrity Statement */}
        <div className="py-6 border-b border-[#182C48] text-xs text-[#A8B7C8]/80 space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            Integritas Ilmiah & Sumber Referensi
          </div>
          <p>
            Materi dalam EurekaLab disarikan dari literatur ilmiah bereputasi, arsip Nobel Prize, naskah orisinal (seperti Nature, Hereditas, The Lancet, Principia Mathematica), dan arsip sejarah teknologi. Model simulasi interaktif dirancang sebagai sarana edukatif untuk memvisualisasikan hukum fisika dasar secara intuitif.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8B7C8]/70">
          <div>
            &copy; 2026 EurekaLab. Hak Cipta Dilindungi. Platform Edukasi Terbuka Indonesia.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#63E6FF] font-mono text-[11px]">Interaktif &bull; Akurat &bull; Terbuka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
