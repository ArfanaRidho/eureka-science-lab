import React from 'react';
import Link from 'next/link';
import { Scientist } from '@/types';
import { ArrowRight, Globe, Award, Sparkles } from 'lucide-react';

interface ScientistCardProps {
  scientist: Scientist;
}

export default function ScientistCard({ scientist }: ScientistCardProps) {
  return (
    <article className="group relative bg-[#122238] hover:bg-[#182C48] border border-[rgba(99,230,255,0.14)] hover:border-[#63E6FF]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-1">
      <div className="p-5 sm:p-6 pb-4">
        {/* Top Header: Avatar & Context */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-lg text-white shadow-lg shrink-0 border border-white/20"
            style={{ backgroundColor: scientist.avatarColor }}
          >
            {scientist.avatarInitial}
          </div>

          <div className="space-y-1 overflow-hidden">
            <Link href={`/scientists/${scientist.slug}`} className="block group-hover:text-[#63E6FF] transition">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug truncate">
                {scientist.name}
              </h3>
            </Link>
            <div className="text-xs text-[#63E6FF] font-medium truncate">
              {scientist.field}
            </div>
            <div className="text-[11px] text-[#A8B7C8] flex items-center gap-1 font-mono">
              <Globe className="w-3 h-3 text-[#A8B7C8]" />
              <span>{scientist.countryOrContext} &bull; {scientist.lifespan}</span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="p-3 rounded-xl bg-[#0D1B2A]/70 border border-[#1E3A5F]/60 text-xs italic text-[#A8B7C8] leading-relaxed mb-4 line-clamp-3">
          &ldquo;{scientist.quote}&rdquo;
        </blockquote>

        {/* Major Contribution snippet */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-[#63E6FF] uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3 h-3" /> Kontribusi Utama
          </div>
          <p className="text-xs text-[#A8B7C8] line-clamp-2 leading-relaxed">
            {scientist.majorContributions[0]}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 sm:p-6 pt-3 border-t border-[#1E3A5F]/60 flex items-center justify-between text-xs text-[#A8B7C8] bg-[#0E1E34]/50">
        <span className="font-mono text-[11px] text-[#A8B7C8]">
          {scientist.discoverySlugs.length} Penemuan Terkait
        </span>

        <Link
          href={`/scientists/${scientist.slug}`}
          className="flex items-center gap-1 text-[#63E6FF] hover:text-white font-semibold transition group-hover:translate-x-0.5"
        >
          <span>Profil Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
