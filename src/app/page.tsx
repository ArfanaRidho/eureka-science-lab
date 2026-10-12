import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Award,
  Globe,
  Dna,
  Cpu,
  Atom,
  Activity,
  Orbit,
  Binary,
  Rocket,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import DiscoveryCard from '@/components/DiscoveryCard';
import TimelineSection from '@/components/TimelineSection';
import DailyQuizSection from '@/components/DailyQuizSection';
import OrbitSimulation from '@/components/simulations/OrbitSimulation';
import CircuitSimulation from '@/components/simulations/CircuitSimulation';
import AtomSimulation from '@/components/simulations/AtomSimulation';
import PendulumSimulation from '@/components/simulations/PendulumSimulation';
import { DISCOVERIES } from '@/data/discoveries';
import { CATEGORIES } from '@/data/categories';
import { SCIENTISTS } from '@/data/scientists';

export default function HomePage() {
  const featuredDiscovery = DISCOVERIES.find((d) => d.isFeatured) || DISCOVERIES[0];
  const storiesDiscoveries = DISCOVERIES.slice(0, 6);

  // Icon mapping helper for categories
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom': return Atom;
      case 'Cpu': return Cpu;
      case 'Activity': return Activity;
      case 'Orbit': return Orbit;
      case 'Dna': return Dna;
      case 'Binary': return Binary;
      case 'Rocket': return Rocket;
      case 'Award': return Award;
      default: return Sparkles;
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#07111F]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Discovery Editorial Card (Section 3.C) */}
      <section className="w-full py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#10B981] font-bold">
              Sorotan Utama &bull; Featured Discovery
            </span>
          </div>
          <span className="text-xs text-[#A8B7C8] font-mono">Arsip Sejarah Medis Abad ke-20</span>
        </div>

        <div className="relative rounded-3xl bg-gradient-to-br from-[#122238] via-[#0D1B2A] to-[#07111F] border border-[rgba(99,230,255,0.25)] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Context & Editorial Story */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-mono font-semibold">
                  Ilmu Kedokteran & Antibiotik
                </span>
                <span className="text-xs font-mono text-[#A8B7C8]">
                  {featuredDiscovery.yearOrDate}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {featuredDiscovery.title}
              </h2>

              <p className="text-base sm:text-lg text-[#63E6FF] font-medium leading-relaxed">
                {featuredDiscovery.tagline}
              </p>

              <p className="text-sm sm:text-base text-[#A8B7C8] leading-relaxed max-w-2xl">
                {featuredDiscovery.summary}
              </p>

              {/* Scientist Collaborators Pill */}
              <div className="p-4 rounded-2xl bg-[#07111F]/60 border border-[#1E3A5F] flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <span className="text-white font-semibold">Tokoh Penemu:</span>
                <span className="text-[#A8B7C8]">
                  Sir Alexander Fleming (Pengamatan Awal) &bull; Howard Florey & Ernst Chain (Pemurnian & Uji Klinis Massal Oxford)
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/discover/${featuredDiscovery.slug}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#63E6FF] hover:bg-[#38BDF8] text-[#07111F] font-bold text-sm transition duration-300 shadow-lg shadow-cyan-500/20"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-[#A8B7C8] font-mono">
                  Waktu baca: {featuredDiscovery.readingTime}
                </span>
              </div>
            </div>

            {/* Right Column: Scientific Illustration Motif */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[320px] aspect-square rounded-3xl bg-[#07111F] border border-[rgba(99,230,255,0.2)] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner group">
                <div className="w-24 h-24 rounded-full bg-[#10B981]/15 border-2 border-[#10B981] flex items-center justify-center mb-4 group-hover:scale-110 transition duration-500">
                  <span className="font-mono text-2xl font-black text-[#10B981]">β</span>
                </div>
                <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                  Cincin Beta-Laktam
                </span>
                <span className="text-[11px] text-[#A8B7C8] mt-1">
                  Struktur Kimia Molekul Penisilin
                </span>
                <div className="mt-4 px-3 py-1 rounded-full bg-[#182C48] text-[10px] font-mono text-[#63E6FF]">
                  C₁₆H₁₈N₂O₄S
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore Categories (Section 3.D) */}
      <section className="w-full py-16 bg-[#0D1B2A]/30 border-t border-[#1E3A5F]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63E6FF]/10 border border-[#63E6FF]/20 text-xs font-mono text-[#63E6FF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bidang Keilmuan</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Jelajahi 8 Kategori Penemuan
            </h2>
            <p className="text-sm sm:text-base text-[#A8B7C8] max-w-xl mx-auto">
              Temukan terobosan besar peradaban manusia yang terbagi dalam ranah sains fundamental dan terapan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.iconName);
              return (
                <Link
                  key={cat.id}
                  href={`/discover?category=${cat.id}`}
                  className="group p-6 rounded-2xl bg-[#122238] hover:bg-[#182C48] border border-[rgba(99,230,255,0.12)] hover:border-[#63E6FF]/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:-translate-y-1"
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${cat.accentColor}18`, color: cat.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#63E6FF] transition mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#A8B7C8] leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1E3A5F]/60 flex items-center justify-between text-xs font-semibold" style={{ color: cat.accentColor }}>
                    <span>Eksplorasi</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Stories Behind Discoveries (Section 3.E) */}
      <section className="w-full py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-xs font-mono text-[#3B82F6]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kisah Inspiratif Sains</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kisah di Balik Penemuan Besar
            </h2>
            <p className="text-sm sm:text-base text-[#A8B7C8] max-w-xl">
              Setiap rumus dan teknologi lahir dari pertanyaan mendasar, perjuangan panjang di laboratorium, dan kolaborasi para penemu.
            </p>
          </div>

          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#122238] hover:bg-[#182C48] text-[#63E6FF] font-semibold text-sm transition border border-[rgba(99,230,255,0.2)] shrink-0 self-start md:self-auto"
          >
            <span>Lihat Semua Penemuan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storiesDiscoveries.map((discovery) => (
            <DiscoveryCard key={discovery.id} discovery={discovery} />
          ))}
        </div>
      </section>

      {/* 5. Timeline of Innovation (Section 3.F) */}
      <TimelineSection />

      {/* 6. Daily Science Challenge (Section 3.G) */}
      <DailyQuizSection />

      {/* 7. Interactive Science Lab Section (Section 3.H) */}
      <section className="w-full py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-xs font-mono text-[#10B981]">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Laboratorium Eksperimen Maya</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Science Lab
          </h2>
          <p className="text-sm sm:text-base text-[#A8B7C8] max-w-2xl mx-auto">
            Sentuh dan ubah variabel hukum alam secara langsung: ubah massa bintang, atur tegangan sirkuit, picu lompatan kuantum foton, atau amati osilasi bandul di gravitasi planet lain.
          </p>
        </div>

        {/* Embedded Featured Simulation 1: Planetary Orbit */}
        <div className="space-y-12">
          <OrbitSimulation />

          {/* Quick Sandbox Navigation to Other Labs */}
          <div className="p-6 rounded-2xl bg-[#122238]/60 border border-[#1E3A5F] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">Ingin Mencoba Simulasi Laboratorium Lainnya?</h4>
              <p className="text-xs text-[#A8B7C8]">Tersedia Simulasi Rangkaian Listrik Ohm, Spektrum Atom Bohr, dan Bandul Harmonik Kosmis.</p>
            </div>
            <Link
              href="/lab"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#63E6FF] hover:bg-[#38BDF8] text-[#07111F] font-bold text-sm transition shrink-0"
            >
              <span>Buka Seluruh Laboratorium Sains</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Newsletter / Learning CTA (Section 3.I) */}
      <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-[#07111F] to-[#050C16] border-t border-[#1E3A5F]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63E6FF]/10 text-[#63E6FF] border border-[#63E6FF]/20 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pendidikan Terbuka EurekaLab</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Rasa Ingin Tahu Adalah Awal dari Penemuan.
          </h2>

          <p className="text-base sm:text-lg text-[#A8B7C8] max-w-xl mx-auto leading-relaxed">
            Mulai perjalananmu memahami dunia melalui cerita, eksperimen, dan ide-ide luar biasa. Jelajahi arsip penemuan atau uji ketangkasan sainsmu sekarang.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/discover"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#63E6FF] hover:bg-[#38BDF8] text-[#07111F] font-bold text-sm sm:text-base transition shadow-lg shadow-cyan-500/20"
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/saved"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#122238] hover:bg-[#182C48] text-white font-semibold text-sm sm:text-base transition border border-[#1E3A5F]"
            >
              <BookOpen className="w-4 h-4 text-[#63E6FF]" />
              <span>Lihat Artikel Tersimpan</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
