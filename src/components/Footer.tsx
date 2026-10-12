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
            {/* Developer Profile & Contact */}
            <div className="pt-2">
              <div className="p-3.5 rounded-2xl bg-[#0D1B2A]/90 border border-[#1E3A5F] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#63E6FF] uppercase tracking-wider font-semibold">
                    Pengembang Web
                  </span>
                  <span className="text-xs text-white font-semibold">Arfana Ridho</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <a
                    href="https://www.instagram.com/arfnn.a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#122238] hover:bg-[#E1306C]/15 border border-[#1E3A5F] hover:border-[#E1306C]/40 text-[#A8B7C8] hover:text-[#E1306C] text-xs transition duration-200 group"
                    title="Instagram @arfnn.a"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current text-[#A8B7C8] group-hover:text-[#E1306C] transition-colors"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="font-mono">@arfnn.a</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/arfana-ridho-3b7463342?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#122238] hover:bg-[#0A66C2]/15 border border-[#1E3A5F] hover:border-[#0A66C2]/40 text-[#A8B7C8] hover:text-[#0A66C2] text-xs transition duration-200 group"
                    title="LinkedIn Arfana Ridho"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current text-[#A8B7C8] group-hover:text-[#0A66C2] transition-colors"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="font-mono">LinkedIn</span>
                  </a>
                </div>
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

        {/* Bottom Bar: Copyright & Contact Links */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A8B7C8]/70">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-center md:text-left">
            <span>
             &copy; 2026 <strong className="text-white font-semibold">Arfana Ridho</strong> &bull; EurekaLab.
            </span>
            <span className="hidden sm:inline text-[#1E3A5F]">|</span>
            <span>Hak Cipta Dilindungi. Platform Edukasi Terbuka Indonesia.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#A8B7C8]/60 text-[11px] hidden sm:inline">Hubungi Pengembang:</span>
            <a
              href="https://www.instagram.com/arfnn.a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8B7C8] hover:text-[#E1306C] transition flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-lg bg-[#0D1B2A] border border-[#1E3A5F] hover:border-[#E1306C]/40"
              aria-label="Instagram Arfana Ridho"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>@arfnn.a</span>
            </a>
            <span className="text-[#1E3A5F]">&bull;</span>
            <a
              href="https://www.linkedin.com/in/arfana-ridho-3b7463342?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8B7C8] hover:text-[#0A66C2] transition flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-lg bg-[#0D1B2A] border border-[#1E3A5F] hover:border-[#0A66C2]/40"
              aria-label="LinkedIn Arfana Ridho"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
