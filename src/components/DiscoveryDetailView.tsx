'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  BookOpen,
  Calendar,
  ChevronRight,
  FlaskConical,
} from 'lucide-react';
import { Discovery, Scientist } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { isBookmarked, toggleBookmark, markArticleAsRead, addRecentView } from '@/lib/storage';
import DiscoveryCard from '@/components/DiscoveryCard';
import OrbitSimulation from '@/components/simulations/OrbitSimulation';
import CircuitSimulation from '@/components/simulations/CircuitSimulation';

interface DiscoveryDetailViewProps {
  discovery: Discovery;
  contributingScientists: (Scientist | undefined)[];
  relatedDiscoveries: (Discovery | undefined)[];
}

export default function DiscoveryDetailView({
  discovery,
  contributingScientists,
  relatedDiscoveries,
}: DiscoveryDetailViewProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    setBookmarked(isBookmarked(discovery.slug));
    markArticleAsRead(discovery.slug);
    addRecentView(discovery.slug, discovery.title, discovery.category);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(Math.max(current, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [discovery]);

  const handleBookmarkToggle = () => {
    const next = toggleBookmark(discovery.slug);
    setBookmarked(next);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const categoryInfo = CATEGORIES.find((c) => c.id === discovery.category);

  return (
    <div className="w-full min-h-screen bg-[#07111F] text-[#F5F7FA] relative">
      {/* Reading Progress Indicator Bar */}
      <div className="fixed top-16 sm:top-20 left-0 w-full h-1 bg-[#1E3A5F] z-30">
        <div
          className="h-full bg-gradient-to-r from-[#63E6FF] via-[#A78BFA] to-[#10B981] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link & Quick Actions */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#A8B7C8] hover:text-[#63E6FF] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Penemuan</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#122238] border border-[#1E3A5F] text-[#A8B7C8] hover:text-white transition flex items-center gap-1.5 text-xs"
              title="Salin Tautan Artikel"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Tautan Disalin!' : 'Bagikan'}</span>
            </button>

            <button
              onClick={handleBookmarkToggle}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold ${
                bookmarked
                  ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                  : 'bg-[#122238] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{bookmarked ? 'Tersimpan' : 'Simpan'}</span>
            </button>
          </div>
        </div>

        {/* 1. Header & Introduction */}
        <header className="space-y-4 max-w-4xl pb-8 border-b border-[#1E3A5F]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="px-3 py-1 text-xs font-mono font-semibold rounded-full border"
              style={{
                backgroundColor: categoryInfo?.badgeBg,
                borderColor: `${categoryInfo?.accentColor}40`,
                color: categoryInfo?.accentColor,
              }}
            >
              {categoryInfo?.name}
            </span>
            <span className="text-xs font-mono text-[#A8B7C8] bg-[#122238] px-2.5 py-1 rounded-full border border-[#1E3A5F]">
              Era: {discovery.yearOrDate}
            </span>
            <span className="text-xs font-mono text-[#A8B7C8] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#63E6FF]" />
              {discovery.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {discovery.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#63E6FF] font-medium leading-relaxed">
            {discovery.tagline}
          </p>

          <p className="text-base text-[#A8B7C8] leading-relaxed">
            {discovery.summary}
          </p>
        </header>

        {/* 2. Hero Visual Showcase */}
        <div className="my-8 rounded-3xl bg-gradient-to-r from-[#0D1B2A] via-[#122238] to-[#0D1B2A] border border-[rgba(99,230,255,0.25)] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-mono text-[#A8B7C8] uppercase tracking-widest block">
              Simbol & Inti Konsep Penemuan
            </span>
            <div
              className="text-3xl sm:text-6xl font-black font-mono tracking-tight py-4"
              style={{ color: discovery.heroVisual.accent }}
            >
              {discovery.heroVisual.value}
            </div>
            <span className="text-xs sm:text-sm font-mono text-white/80">
              Dokumentasi Sejarah Sains EurekaLab &bull; {discovery.yearOrDate}
            </span>
          </div>
        </div>

        {/* 3. Scientist / Contributors Profile Card */}
        <section className="my-10 p-6 sm:p-8 rounded-3xl bg-[#122238] border border-[rgba(99,230,255,0.18)] space-y-4">
          <div className="text-xs font-mono text-[#63E6FF] uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4" />
            Tokoh & Kontributor Ilmiah
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contributingScientists.map((scientist) => (
              scientist && (
                <div
                  key={scientist.id}
                  className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#1E3A5F] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-sm text-white shrink-0"
                      style={{ backgroundColor: scientist.avatarColor }}
                    >
                      {scientist.avatarInitial}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{scientist.name}</h4>
                      <p className="text-xs text-[#A8B7C8]">{scientist.field} &bull; {scientist.countryOrContext}</p>
                    </div>
                  </div>
                  <Link
                    href={`/scientists/${scientist.slug}`}
                    className="p-2 rounded-xl bg-[#182C48] hover:bg-[#63E6FF] hover:text-[#07111F] text-[#63E6FF] transition"
                    title="Lihat Profil Lengkap"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Layout: Main Article Column + Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body */}
          <article className="lg:col-span-8 space-y-12">
            {/* 4. The Problem or Motivating Question */}
            <section id="pertanyaan-pemantik" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D1B2A] to-[#122238] border border-[#F59E0B]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#F59E0B] font-mono text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                Pertanyaan Pemantik (The Motivating Question)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white italic leading-snug">
                &ldquo;{discovery.content.problemOrQuestion}&rdquo;
              </h3>
            </section>

            {/* 5. Historical Background */}
            <section id="latar-belakang" className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#63E6FF]" />
                Latar Belakang Sejarah
              </h2>
              <p className="text-base text-[#A8B7C8] leading-relaxed">
                {discovery.content.historicalBackground}
              </p>
            </section>

            {/* 6. Discovery Process & Experiments */}
            <section id="proses-penemuan" className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#F59E0B]" />
                Proses Penemuan & Eksperimen Kunci
              </h2>
              <p className="text-base text-[#A8B7C8] leading-relaxed">
                {discovery.content.discoveryProcess}
              </p>
            </section>

            {/* 7. Challenges & Breakthroughs */}
            <section id="tantangan-terobosan" className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                Tantangan, Riset Terdahulu & Terobosan
              </h2>
              <p className="text-base text-[#A8B7C8] leading-relaxed">
                {discovery.content.breakthroughsAndChallenges}
              </p>
            </section>

            {/* 8. Scientific Explanation in Accessible Indonesian */}
            <section id="penjelasan-ilmiah" className="space-y-6 p-6 sm:p-8 rounded-3xl bg-[#122238] border border-[rgba(99,230,255,0.2)]">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#63E6FF] uppercase tracking-wider font-bold">
                  Sains yang Mudah Dipahami
                </span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Bagaimana Sains di Balik Penemuan Ini Bekerja?
                </h2>
                <p className="text-base text-[#F5F7FA] leading-relaxed pt-1">
                  {discovery.content.scientificExplanation.simple}
                </p>
              </div>

              {/* Core Principles */}
              <div className="space-y-4 pt-4 border-t border-[#1E3A5F]">
                <h4 className="text-sm font-mono uppercase tracking-wider text-[#A8B7C8]">
                  Prinsip Dasar & Rumus Kunci:
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {discovery.content.scientificExplanation.corePrinciples.map((principle, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#1E3A5F] space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-white">{principle.title}</span>
                        {principle.formulaOrLaw && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#63E6FF]/10 text-[#63E6FF] font-mono text-xs border border-[#63E6FF]/20">
                            {principle.formulaOrLaw}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#A8B7C8] leading-relaxed">
                        {principle.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Embedded Simulation if available */}
            {discovery.simulationType === 'orbit' && (
              <section id="simulasi-interaktif" className="space-y-4">
                <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-[#63E6FF]" />
                  Eksperimen Langsung: Simulasi Gravitasi & Orbit
                </h2>
                <OrbitSimulation />
              </section>
            )}

            {discovery.simulationType === 'circuit' && (
              <section id="simulasi-interaktif" className="space-y-4">
                <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-[#F59E0B]" />
                  Eksperimen Langsung: Sirkuit Hukum Ohm & Lampu Pijar
                </h2>
                <CircuitSimulation />
              </section>
            )}

            {/* 9. Historical Timeline for this Discovery */}
            <section id="garis-waktu" className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#A78BFA]" />
                Kronologi Terobosan Penemuan
              </h2>
              <div className="border-l-2 border-[#1E3A5F] ml-3 pl-6 space-y-6">
                {discovery.content.timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#63E6FF] border-2 border-[#07111F]" />
                    <div className="flex items-center gap-2 font-mono text-xs text-[#63E6FF] font-bold">
                      <span>{evt.year}</span>
                      <span>&bull;</span>
                      <span className="text-[#A8B7C8] font-normal">{evt.significance}</span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1">
                      {evt.event}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. Societal Impact */}
            <section id="dampak-masyarakat" className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Dampak Bagi Peradaban & Teknologi Modern
              </h2>
              <div className="space-y-3">
                {discovery.content.societalImpact.map((impact, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0D1B2A] border border-[#1E3A5F]">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#F5F7FA] leading-relaxed">{impact}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 11. Interesting Facts */}
            <section id="fakta-menarik" className="space-y-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#122238] to-[#0D1B2A] border border-[#63E6FF]/20">
              <div className="flex items-center gap-2 text-[#63E6FF] font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Fakta Menarik (Curious Facts)
              </div>
              <ul className="space-y-3 text-sm text-[#A8B7C8] list-disc list-inside leading-relaxed">
                {discovery.content.interestingFacts.map((fact, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="text-white">{fact}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 12. Sources and Further Reading */}
            <section id="referensi" className="space-y-4 pt-6 border-t border-[#1E3A5F]">
              <h3 className="text-lg font-bold text-white">Sumber & Referensi Ilmiah</h3>
              <div className="space-y-2">
                {discovery.content.sourceReferences.map((ref, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0D1B2A] border border-[#1E3A5F] text-xs space-y-1">
                    <div className="text-white font-semibold">{ref.title}</div>
                    <div className="text-[#A8B7C8] font-mono">
                      {ref.authors} ({ref.year}) &bull; {ref.sourceType}
                    </div>
                    {ref.note && <div className="text-[#A8B7C8]/70 italic">{ref.note}</div>}
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 p-6 rounded-3xl bg-[#122238] border border-[#1E3A5F] space-y-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#63E6FF] font-bold">
                Daftar Isi Artikel
              </h4>
              <nav className="space-y-2 text-xs">
                <a href="#pertanyaan-pemantik" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  1. Pertanyaan Pemantik
                </a>
                <a href="#latar-belakang" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  2. Latar Belakang Sejarah
                </a>
                <a href="#proses-penemuan" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  3. Proses & Eksperimen
                </a>
                <a href="#tantangan-terobosan" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  4. Tantangan & Terobosan
                </a>
                <a href="#penjelasan-ilmiah" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  5. Penjelasan Ilmiah
                </a>
                {discovery.simulationType && (
                  <a href="#simulasi-interaktif" className="block text-[#10B981] font-semibold hover:underline">
                    &bull; Simulasi Laboratorium
                  </a>
                )}
                <a href="#garis-waktu" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  6. Kronologi Terobosan
                </a>
                <a href="#dampak-masyarakat" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  7. Dampak Peradaban
                </a>
                <a href="#fakta-menarik" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  8. Fakta Menarik
                </a>
                <a href="#referensi" className="block text-[#A8B7C8] hover:text-[#63E6FF] transition">
                  9. Sumber & Referensi
                </a>
              </nav>

              <div className="pt-4 border-t border-[#1E3A5F]">
                <button
                  onClick={handleBookmarkToggle}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    bookmarked
                      ? 'bg-[#63E6FF] text-[#07111F]'
                      : 'bg-[#0D1B2A] text-white hover:bg-[#182C48] border border-[#1E3A5F]'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                  <span>{bookmarked ? 'Tersimpan di Akun Anda' : 'Simpan untuk Dibaca Nanti'}</span>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* 13. Related Discoveries Section */}
        {relatedDiscoveries.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#1E3A5F] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#63E6FF] uppercase tracking-wider block">
                  Eksplorasi Lanjutan
                </span>
                <h3 className="text-2xl font-extrabold text-white">Penemuan Terkait Lainnya</h3>
              </div>
              <Link
                href="/discover"
                className="text-xs font-semibold text-[#63E6FF] hover:underline"
              >
                Lihat Semua &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDiscoveries.map((rel) => (
                rel && <DiscoveryCard key={rel.id} discovery={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
