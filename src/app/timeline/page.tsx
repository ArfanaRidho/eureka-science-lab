'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Clock,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  ChevronRight,
  X,
  Compass,
} from 'lucide-react';
import { TIMELINE_MILESTONES } from '@/data/timeline';
import { HISTORICAL_PERIODS } from '@/data/historicalPeriods';
import { CATEGORIES } from '@/data/categories';
import { HistoricalPeriodId, CategoryId, TimelineMilestone } from '@/types';

export default function TimelinePage() {
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriodId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);

  const filteredMilestones = useMemo(() => {
    return TIMELINE_MILESTONES.filter((m) => {
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.keyFigure.toLowerCase().includes(q);

      const matchPeriod = selectedPeriod === 'all' || m.period === selectedPeriod;
      const matchCategory = selectedCategory === 'all' || m.category === selectedCategory;

      return matchSearch && matchPeriod && matchCategory;
    });
  }, [searchQuery, selectedPeriod, selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-[#07111F] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-xs font-mono text-[#A78BFA]">
            <Clock className="w-3.5 h-3.5" />
            <span>Kronologi Sejarah Sains Dunia</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Garis Waktu Inovasi & Peradaban
          </h1>
          <p className="text-sm sm:text-base text-[#A8B7C8] max-w-2xl">
            Menyusuri evolusi gagasan ilmiah manusia dari prinsip tuas Archimedes di zaman kuno, kejayaan aljabar dan optika Islam di abad pertengahan, hingga gelombang gravitasi dan era digital 5G.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#122238] border border-[rgba(99,230,255,0.18)] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#63E6FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari peristiwa atau tokoh (misal: Newton, DNA, Gutenberg, Habibie)..."
                className="w-full bg-[#0D1B2A] border border-[#1E3A5F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A8B7C8]/60 focus:outline-none focus:border-[#63E6FF]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8B7C8] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CategoryId | 'all')}
                className="w-full bg-[#0D1B2A] border border-[#1E3A5F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#63E6FF]"
              >
                <option value="all">Semua Kategori Sains</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Historical Era Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedPeriod('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
                selectedPeriod === 'all'
                  ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                  : 'bg-[#0D1B2A] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
              }`}
            >
              Semua Era ({TIMELINE_MILESTONES.length})
            </button>
            {HISTORICAL_PERIODS.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
                  selectedPeriod === period.id
                    ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                    : 'bg-[#0D1B2A] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#A8B7C8] pt-1 flex items-center justify-between">
            <span>Ditemukan <strong className="text-white">{filteredMilestones.length}</strong> peristiwa bersejarah</span>
          </div>
        </div>

        {/* Timeline Event List */}
        <div className="relative border-l-2 border-[#1E3A5F] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {filteredMilestones.map((milestone) => (
            <div
              key={milestone.id}
              onClick={() => setSelectedMilestone(milestone)}
              className="relative group cursor-pointer"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#07111F] border-2 border-[#63E6FF] group-hover:bg-[#63E6FF] group-hover:scale-125 transition-all duration-300 shadow-md shadow-cyan-500/20" />

              {/* Card */}
              <div className="bg-[#122238] hover:bg-[#182C48] border border-[rgba(99,230,255,0.14)] hover:border-[#63E6FF]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg group-hover:-translate-y-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#63E6FF] bg-[#63E6FF]/10 px-2.5 py-0.5 rounded-lg border border-[#63E6FF]/20">
                      {milestone.year}
                    </span>
                    <span className="text-xs text-[#A8B7C8]">
                      Tokoh: <strong className="text-white">{milestone.keyFigure}</strong>
                    </span>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#1E3A5F]/70 text-[#A8B7C8]">
                    {milestone.impactBadge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#63E6FF] transition mb-2">
                  {milestone.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A8B7C8] leading-relaxed">
                  {milestone.summary}
                </p>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#1E3A5F]/60 text-xs">
                  <span className="text-[#63E6FF] font-semibold flex items-center gap-1 group-hover:underline">
                    Lihat Rincian Peristiwa
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  {milestone.discoverySlug && (
                    <span className="text-[11px] text-[#A8B7C8] font-mono">
                      Artikel Tersedia &rarr;
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0D1B2A] border border-[rgba(99,230,255,0.25)] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-[#122238] text-[#A8B7C8] hover:text-white border border-[#1E3A5F]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 font-mono text-sm font-bold bg-[#63E6FF]/10 text-[#63E6FF] rounded-xl border border-[#63E6FF]/30">
                  {selectedMilestone.year}
                </span>
                <span className="text-xs text-[#A8B7C8]">{selectedMilestone.impactBadge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {selectedMilestone.title}
              </h3>

              <div className="text-xs text-[#A8B7C8] font-mono p-3 rounded-xl bg-[#122238] border border-[#1E3A5F]">
                Tokoh Utama: <span className="text-white font-bold">{selectedMilestone.keyFigure}</span>
              </div>

              <p className="text-sm text-[#F5F7FA] leading-relaxed">
                {selectedMilestone.summary}
              </p>

              <div className="pt-3 border-t border-[#1E3A5F]">
                {selectedMilestone.discoverySlug ? (
                  <Link
                    href={`/discover/${selectedMilestone.discoverySlug}`}
                    onClick={() => setSelectedMilestone(null)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#63E6FF] text-[#07111F] font-bold text-sm hover:bg-[#38BDF8] transition"
                  >
                    <span>Baca Artikel Lengkap Penemuan Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setSelectedMilestone(null)}
                    className="w-full py-2.5 rounded-xl bg-[#122238] text-white text-sm font-semibold hover:bg-[#182C48] transition border border-[#1E3A5F]"
                  >
                    Tutup Rincian
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
