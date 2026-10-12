'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Search, Filter, ArrowUpDown, X, BookOpen } from 'lucide-react';
import DiscoveryCard from '@/components/DiscoveryCard';
import { DISCOVERIES } from '@/data/discoveries';
import { CATEGORIES } from '@/data/categories';
import { HISTORICAL_PERIODS } from '@/data/historicalPeriods';
import { CategoryId, HistoricalPeriodId } from '@/types';

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as CategoryId | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(
    initialCategory || 'all'
  );
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriodId | 'all'>('all');
  const [sortBy, setSortBy] = useState<'chronological-asc' | 'chronological-desc' | 'title'>(
    'chronological-desc'
  );

  const filteredDiscoveries = useMemo(() => {
    return DISCOVERIES.filter((item) => {
      // Search text match
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query);

      // Category match
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Period match
      const matchPeriod =
        selectedPeriod === 'all' || item.historicalPeriod === selectedPeriod;

      return matchSearch && matchCategory && matchPeriod;
    }).sort((a, b) => {
      if (sortBy === 'chronological-desc') {
        return b.yearNumeric - a.yearNumeric;
      }
      if (sortBy === 'chronological-asc') {
        return a.yearNumeric - b.yearNumeric;
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedPeriod, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPeriod('all');
    setSortBy('chronological-desc');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'all' || selectedPeriod !== 'all';

  return (
    <div className="w-full min-h-screen bg-[#07111F] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63E6FF]/10 border border-[#63E6FF]/20 text-xs font-mono text-[#63E6FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Penemuan Ilmiah</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Jelajahi Terobosan yang Mengubah Dunia
          </h1>
          <p className="text-sm sm:text-base text-[#A8B7C8] max-w-2xl">
            Dari pembuktian optika Ibn al-Haytham hingga heliks ganda DNA dan Faktor Habibie. Cari, saring berdasarkan era sejarah, dan pelajari sains dengan bahasa yang mudah dipahami.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#122238] border border-[rgba(99,230,255,0.18)] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#63E6FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kata kunci penemuan (misal: Penisilin, Relativitas, 4G, DNA)..."
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

            {/* Historical Period Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as HistoricalPeriodId | 'all')}
                className="w-full bg-[#0D1B2A] border border-[#1E3A5F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#63E6FF]"
              >
                <option value="all">Semua Era Sejarah</option>
                {HISTORICAL_PERIODS.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#0D1B2A] border border-[#1E3A5F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#63E6FF]"
              >
                <option value="chronological-desc">Tahun (Terbaru &rarr; Terdahulu)</option>
                <option value="chronological-asc">Tahun (Terdahulu &rarr; Terbaru)</option>
                <option value="title">Judul (A &rarr; Z)</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
                selectedCategory === 'all'
                  ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                  : 'bg-[#0D1B2A] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
              }`}
            >
              Semua Kategori
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                    : 'bg-[#0D1B2A] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.accentColor }} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Active Filter Clear indicator */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between text-xs text-[#A8B7C8] pt-2 border-t border-[#1E3A5F]">
              <span>Menampilkan {filteredDiscoveries.length} penemuan</span>
              <button
                onClick={clearFilters}
                className="text-[#63E6FF] hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {filteredDiscoveries.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#122238] border border-[#1E3A5F] text-center space-y-4 max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-[#63E6FF] mx-auto opacity-70" />
            <h3 className="text-lg font-bold text-white">Tidak Ada Penemuan yang Cocok</h3>
            <p className="text-xs text-[#A8B7C8]">
              Coba gunakan kata kunci lain atau bersihkan filter kategori dan era sejarah yang dipilih.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl bg-[#63E6FF] text-[#07111F] font-bold text-xs"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiscoveries.map((discovery) => (
              <DiscoveryCard key={discovery.id} discovery={discovery} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07111F] flex items-center justify-center text-[#63E6FF] font-mono">
          Memuat Katalog Penemuan...
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}
