'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, FlaskConical, Atom, Orbit, Compass, Activity } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#07111F] pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-[#1E3A5F]/60">
      {/* Background Cosmic Grid & Glowing Orbs */}
      <div className="absolute inset-0 science-grid-bg opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122238] border border-[rgba(99,230,255,0.25)] text-xs font-mono text-[#63E6FF] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#63E6FF] animate-pulse" />
              <span>EurekaLab Discovery Platform &bull; Edisi Bahasa Indonesia</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Setiap Penemuan Besar Berawal dari{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#63E6FF] via-[#A78BFA] to-[#38BDF8]">
                Sebuah Pertanyaan.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#A8B7C8] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Jelajahi kisah para ilmuwan, temukan ide yang mengubah dunia, dan pahami bagaimana sains membentuk kehidupan kita hari ini melalui narasi mendalam dan simulasi laboratorium interaktif.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/discover"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#63E6FF] hover:bg-[#38BDF8] text-[#07111F] font-bold text-sm sm:text-base transition duration-300 shadow-lg shadow-cyan-500/20 hover:scale-105"
              >
                <span>Jelajahi Penemuan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/lab"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#122238] hover:bg-[#182C48] text-white font-semibold text-sm sm:text-base transition duration-300 border border-[rgba(99,230,255,0.25)] hover:border-[#63E6FF]"
              >
                <FlaskConical className="w-4 h-4 text-[#63E6FF]" />
                <span>Mulai Eksplorasi Lab</span>
              </Link>
            </div>

            {/* Key Metrics / Stat Ticker */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 border-t border-[#1E3A5F]/70 font-mono text-left">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-white block">12+</span>
                <span className="text-[11px] text-[#A8B7C8]">Kisah Penemuan Monumental</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#63E6FF] block">15+</span>
                <span className="text-[11px] text-[#A8B7C8]">Tokoh Ilmuwan Bersejarah</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#10B981] block">4</span>
                <span className="text-[11px] text-[#A8B7C8]">Simulasi Laboratorium Aktif</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Scientific Orbital & Laboratory Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              {/* Outer Orbital Ring 1 */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#63E6FF]/20 animate-spin-slow" />
              {/* Orbital Ring 2 (Tilted) */}
              <div className="absolute inset-4 rounded-full border border-[#A78BFA]/25 animate-spin-reverse-slow" />
              {/* Orbital Ring 3 */}
              <div className="absolute inset-12 rounded-full border border-[rgba(99,230,255,0.35)]" />

              {/* Central Glowing Core (The Question / Curiosity Spark) */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#0D1B2A] to-[#1E3A5F] border-2 border-[#63E6FF] flex flex-col items-center justify-center shadow-2xl shadow-cyan-500/30 text-center p-2 z-10">
                <Atom className="w-8 h-8 text-[#63E6FF] animate-pulse mb-1" />
                <span className="text-[11px] font-mono font-bold text-white tracking-wider uppercase">
                  Eureka!
                </span>
              </div>

              {/* Orbiting Milestone Badges */}
              <div className="absolute top-2 left-6 px-3 py-1.5 rounded-xl bg-[#0D1B2A]/90 backdrop-blur-md border border-[#10B981]/50 text-xs text-white font-mono shadow-lg flex items-center gap-1.5 animate-bounce duration-1000">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Penisilin 1928</span>
              </div>

              <div className="absolute bottom-6 right-2 px-3 py-1.5 rounded-xl bg-[#0D1B2A]/90 backdrop-blur-md border border-[#63E6FF]/50 text-xs text-white font-mono shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#63E6FF]" />
                <span>E = mc² (1905)</span>
              </div>

              <div className="absolute top-1/2 -left-6 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0D1B2A]/90 backdrop-blur-md border border-[#EF4444]/50 text-xs text-white font-mono shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span>Faktor Habibie</span>
              </div>

              <div className="absolute bottom-2 left-10 px-3 py-1.5 rounded-xl bg-[#0D1B2A]/90 backdrop-blur-md border border-[#F472B6]/50 text-xs text-white font-mono shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                <span>DNA Heliks Ganda</span>
              </div>

              <div className="absolute -top-3 right-8 px-3 py-1.5 rounded-xl bg-[#0D1B2A]/90 backdrop-blur-md border border-[#3B82F6]/50 text-xs text-white font-mono shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span>World Wide Web</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
