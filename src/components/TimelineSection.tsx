'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Sparkles, Filter, ChevronRight, X } from 'lucide-react';
import { TIMELINE_MILESTONES } from '@/data/timeline';
import { HISTORICAL_PERIODS } from '@/data/historicalPeriods';
import { HistoricalPeriodId, TimelineMilestone } from '@/types';

export default function TimelineSection() {
  const [activePeriod, setActivePeriod] = useState<HistoricalPeriodId | 'all'>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);

  const filteredMilestones =
    activePeriod === 'all'
      ? TIMELINE_MILESTONES
      : TIMELINE_MILESTONES.filter((m) => m.period === activePeriod);

  return (
    <section className="w-full py-16 sm:py-24 bg-[#0D1B2A]/40 border-t border-[#1E3A5F]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-xs font-mono text-[#A78BFA]">
              <Clock className="w-3.5 h-3.5" />
              <span>Kronologi Peradaban</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Garis Waktu Inovasi & Penemuan
            </h2>
            <p className="text-sm sm:text-base text-[#A8B7C8] max-w-xl">
              Telusuri jejak lompatan intelektual manusia dari pengamatan kuno hingga era kecerdasan komputasi modern.
            </p>
          </div>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#122238] hover:bg-[#182C48] text-[#63E6FF] font-semibold text-sm transition border border-[rgba(99,230,255,0.2)] shrink-0 self-start md:self-auto"
          >
            <span>Jelajahi Garis Waktu Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActivePeriod('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 border ${
              activePeriod === 'all'
                ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                : 'bg-[#122238] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
            }`}
          >
            Semua Era ({TIMELINE_MILESTONES.length})
          </button>
          {HISTORICAL_PERIODS.map((period) => (
            <button
              key={period.id}
              onClick={() => setActivePeriod(period.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 border ${
                activePeriod === period.id
                  ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                  : 'bg-[#122238] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>

        {/* Horizontal/Vertical Interactive Milestone Flow */}
        <div className="relative border-l-2 border-[#1E3A5F] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {filteredMilestones.map((milestone, idx) => (
            <div
              key={milestone.id}
              onClick={() => setSelectedMilestone(milestone)}
              className="relative group cursor-pointer"
            >
              {/* Glowing Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#07111F] border-2 border-[#63E6FF] group-hover:bg-[#63E6FF] group-hover:scale-125 transition-all duration-300 shadow-md shadow-cyan-500/20" />

              {/* Milestone Card */}
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

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1E3A5F]/70 text-[#A8B7C8]">
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

        {/* Milestone Detail Modal */}
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

              <div className="pt-3 border-t border-[#1E3A5F] flex items-center justify-between">
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
    </section>
  );
}
