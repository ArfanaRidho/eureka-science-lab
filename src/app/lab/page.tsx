'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FlaskConical,
  Orbit,
  Zap,
  Atom,
  Activity,
  Info,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import OrbitSimulation from '@/components/simulations/OrbitSimulation';
import CircuitSimulation from '@/components/simulations/CircuitSimulation';
import AtomSimulation from '@/components/simulations/AtomSimulation';
import PendulumSimulation from '@/components/simulations/PendulumSimulation';

function LabContent() {
  const searchParams = useSearchParams();
  const initialSim = searchParams.get('sim') || 'orbit';

  const [activeTab, setActiveTab] = useState<'orbit' | 'circuit' | 'atom' | 'pendulum'>(
    (initialSim as any) || 'orbit'
  );

  const tabs = [
    {
      id: 'orbit',
      name: 'Orbit Planet & Gravitasi',
      icon: Orbit,
      badge: 'Mekanika Langit',
      color: '#63E6FF',
      description: 'Hukum Gravitasi Universal Newton dan orbit elips Kepler di bawah pengaruh massa bintang.',
    },
    {
      id: 'circuit',
      name: 'Rangkaian Listrik & Pijar',
      icon: Zap,
      badge: 'Hukum Ohm & Joule',
      color: '#F59E0B',
      description: 'Hubungan arus, tegangan, dan hambatan listrik yang menyalakan filamen lampu pijar Edison.',
    },
    {
      id: 'atom',
      name: 'Struktur Atom & Foton',
      icon: Atom,
      badge: 'Fisika Kuantum Bohr',
      color: '#A78BFA',
      description: 'Eksitasi elektron, kulit energi, dan emisi gelombang cahaya tampak saat lompatan kuantum.',
    },
    {
      id: 'pendulum',
      name: 'Bandul Gravitasi Kosmis',
      icon: Activity,
      badge: 'Harmonik & Energi',
      color: '#EC4899',
      description: 'Kekekalan energi kinetik dan potensial bandul sederhana di gravitasi Bumi, Bulan, Mars, dan Jupiter.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#07111F] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Lab Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-xs font-mono text-[#10B981]">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Laboratorium Eksperimen Maya</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Eureka Science Lab
          </h1>
          <p className="text-sm sm:text-base text-[#A8B7C8] max-w-2xl">
            Eksperimen langsung dengan hukum-hukum fundamental fisika. Ubah parameter matematis secara real-time dan amati perubahan sistem fisis di depan mata Anda.
          </p>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between shadow-lg ${
                  isActive
                    ? 'bg-[#122238] border-[#63E6FF] ring-1 ring-[#63E6FF]/50 -translate-y-0.5'
                    : 'bg-[#0D1B2A]/60 border-[#1E3A5F] hover:border-[#63E6FF]/40 hover:bg-[#122238]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${tab.color}15`, color: tab.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#07111F] text-[#A8B7C8] border border-[#1E3A5F]">
                      {tab.badge}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">{tab.name}</h3>
                  <p className="text-xs text-[#A8B7C8] line-clamp-2 leading-relaxed">
                    {tab.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1E3A5F]/60 text-xs font-semibold flex items-center justify-between" style={{ color: tab.color }}>
                  <span>{isActive ? 'Sedang Aktif' : 'Buka Eksperimen'}</span>
                  <span>&rarr;</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Simulation Container */}
        <div className="pt-4">
          {activeTab === 'orbit' && <OrbitSimulation />}
          {activeTab === 'circuit' && <CircuitSimulation />}
          {activeTab === 'atom' && <AtomSimulation />}
          {activeTab === 'pendulum' && <PendulumSimulation />}
        </div>

        {/* Scientific Educational Context */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1B2A] border border-[#1E3A5F] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#A8B7C8] leading-relaxed">
          <div className="space-y-1.5">
            <div className="text-white font-bold flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-[#63E6FF]" />
              Interaktivitas Real-Time
            </div>
            <p>
              Seluruh kalkulasi fisika (integrasi gaya gravitasi, hukum Ohm, emisi kuantum, dan osilasi mekanik) dihitung secara langsung per-frame menggunakan JavaScript Canvas dan matematika numerik.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-white font-bold flex items-center gap-1.5 text-sm">
              <Info className="w-4 h-4 text-[#F59E0B]" />
              Model Edukasi Terbimbing
            </div>
            <p>
              Simulasi dirancang untuk memberikan intuisi fisik bagi siswa dan pembelajar sains. Kami dengan sengaja membatasi variabel rumit (seperti perturbasi relativitas atau gesekan udara dinamis) demi kejelasan konsep dasar.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-white font-bold flex items-center gap-1.5 text-sm">
              <BookOpen className="w-4 h-4 text-[#10B981]" />
              Terhubung dengan Sejarah
            </div>
            <p>
              Setiap eksperimen memiliki artikel latar belakang sejarah terkait di katalog penemuan kami: dari Principia Newton 1687 hingga laboratorium Menlo Park Edison 1879.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScienceLabPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07111F] flex items-center justify-center text-[#63E6FF] font-mono">
          Memuat Science Lab...
        </div>
      }
    >
      <LabContent />
    </Suspense>
  );
}
