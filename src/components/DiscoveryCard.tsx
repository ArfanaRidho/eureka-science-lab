'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Discovery } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { SCIENTISTS } from '@/data/scientists';
import { isBookmarked, toggleBookmark } from '@/lib/storage';

interface DiscoveryCardProps {
  discovery: Discovery;
}

export default function DiscoveryCard({ discovery }: DiscoveryCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(discovery.slug));
    const handleUpdate = () => {
      setBookmarked(isBookmarked(discovery.slug));
    };
    window.addEventListener('eurekalab_storage_update', handleUpdate);
    return () => window.removeEventListener('eurekalab_storage_update', handleUpdate);
  }, [discovery.slug]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = toggleBookmark(discovery.slug);
    setBookmarked(nextState);
  };

  const categoryInfo = CATEGORIES.find((c) => c.id === discovery.category);
  const scientistNames = discovery.scientistIds
    .map((id) => SCIENTISTS.find((s) => s.id === id)?.name || id)
    .join(' & ');

  return (
    <article className="group relative bg-[#122238] hover:bg-[#182C48] border border-[rgba(99,230,255,0.14)] hover:border-[#63E6FF]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-1">
      {/* Card Header & Visual Ribbon */}
      <div className="p-5 sm:p-6 pb-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className="px-2.5 py-1 text-xs font-medium rounded-lg border flex items-center gap-1.5"
            style={{
              backgroundColor: categoryInfo?.badgeBg || 'rgba(99,230,255,0.1)',
              borderColor: `${categoryInfo?.accentColor || '#63E6FF'}40`,
              color: categoryInfo?.accentColor || '#63E6FF',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: categoryInfo?.accentColor || '#63E6FF' }}
            />
            {categoryInfo?.name || discovery.category}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-xl transition ${
              bookmarked
                ? 'bg-[#63E6FF] text-[#07111F]'
                : 'bg-[#0D1B2A] text-[#A8B7C8] hover:text-white hover:bg-[#1E3A5F]'
            }`}
            title={bookmarked ? 'Hapus dari Simpanan' : 'Simpan Artikel'}
            aria-label={bookmarked ? 'Hapus bookmark' : 'Tambah bookmark'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Hero Visual Badge */}
        <div className="mb-4 h-24 rounded-xl bg-gradient-to-br from-[#07111F] to-[#0D1B2A] border border-[#1E3A5F]/70 flex items-center justify-center p-3 relative overflow-hidden group-hover:border-[#63E6FF]/30 transition">
          <div className="absolute inset-0 bg-radial-gradient from-[rgba(99,230,255,0.06)] to-transparent" />
          <span
            className="font-mono text-base sm:text-lg font-bold tracking-tight text-center z-10 px-2"
            style={{ color: discovery.heroVisual.accent || '#63E6FF' }}
          >
            {discovery.heroVisual.value}
          </span>
          <span className="absolute bottom-1 right-2 text-[10px] font-mono text-[#A8B7C8]/50">
            {discovery.yearOrDate}
          </span>
        </div>

        {/* Title */}
        <Link href={`/discover/${discovery.slug}`} className="block group-hover:text-[#63E6FF] transition">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug line-clamp-2">
            {discovery.title}
          </h3>
        </Link>

        {/* Scientist attribution */}
        <div className="mt-2 text-xs text-[#A8B7C8] flex items-center gap-1.5 line-clamp-1">
          <span className="text-[#63E6FF] font-semibold">Oleh:</span>
          <span>{scientistNames}</span>
        </div>

        {/* Summary */}
        <p className="mt-3 text-xs sm:text-sm text-[#A8B7C8] leading-relaxed line-clamp-3">
          {discovery.summary}
        </p>
      </div>

      {/* Card Footer */}
      <div className="p-5 sm:p-6 pt-3 border-t border-[#1E3A5F]/60 flex items-center justify-between text-xs text-[#A8B7C8] bg-[#0E1E34]/50">
        <span className="flex items-center gap-1 font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-[#63E6FF]" />
          {discovery.readingTime}
        </span>

        <Link
          href={`/discover/${discovery.slug}`}
          className="flex items-center gap-1 text-[#63E6FF] hover:text-white font-semibold transition group-hover:translate-x-0.5"
        >
          <span>Baca Selengkapnya</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
