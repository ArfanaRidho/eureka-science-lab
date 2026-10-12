'use client';

import React, { useState, useMemo } from 'react';
import { Search, Users, Sparkles, Filter, X } from 'lucide-react';
import ScientistCard from '@/components/ScientistCard';
import { SCIENTISTS } from '@/data/scientists';

export default function ScientistsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<string>('all');

  const fields = [
    { id: 'all', label: 'Semua Bidang' },
    { id: 'indonesia', label: 'Ilmuwan Indonesia' },
    { id: 'fisika', label: 'Fisika & Relativitas' },
    { id: 'kedokteran', label: 'Kedokteran & Biologi' },
    { id: 'komputer', label: 'Komputer & Matematika' },
  ];

  const filteredScientists = useMemo(() => {
    return SCIENTISTS.filter((s) => {
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.field.toLowerCase().includes(q) ||
        s.countryOrContext.toLowerCase().includes(q) ||
        s.biography.toLowerCase().includes(q);

      let matchField = true;
      if (selectedField === 'indonesia') {
        matchField = s.countryOrContext.toLowerCase().includes('indonesia');
      } else if (selectedField === 'fisika') {
        matchField = s.field.toLowerCase().includes('fisika') || s.field.toLowerCase().includes('astronomi');
      } else if (selectedField === 'kedokteran') {
        matchField = s.field.toLowerCase().includes('kedokteran') || s.field.toLowerCase().includes('bakteriologi') || s.field.toLowerCase().includes('genetika') || s.field.toLowerCase().includes('biologi');
      } else if (selectedField === 'komputer') {
        matchField = s.field.toLowerCase().includes('komputer') || s.field.toLowerCase().includes('matematika') || s.field.toLowerCase().includes('telekomunikasi');
      }

      return matchSearch && matchField;
    });
  }, [searchQuery, selectedField]);

  return (
    <div className="w-full min-h-screen bg-[#07111F] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-xs font-mono text-[#A78BFA]">
            <Users className="w-3.5 h-3.5" />
            <span>Direktori Tokoh Ilmuwan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Para Penemu & Pemikir Revolusioner
          </h1>
          <p className="text-sm sm:text-base text-[#A8B7C8] max-w-2xl">
            Mengenal tokoh-tokoh hebat dunia dan Indonesia yang menantang kemapanan ilmu pengetahuan demi mengungkap rahasia alam semesta dan memajukan kehidupan manusia.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="bg-[#122238] border border-[rgba(99,230,255,0.18)] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-[#63E6FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tokoh ilmuwan (misal: Habibie, Einstein, Marie Curie, Fleming, Joe Hin Tjio)..."
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

          {/* Field Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
            {fields.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedField(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
                  selectedField === f.id
                    ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                    : 'bg-[#0D1B2A] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#A8B7C8] pt-1">
            Menampilkan <span className="text-white font-bold">{filteredScientists.length}</span> profil ilmuwan
          </div>
        </div>

        {/* Scientists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScientists.map((scientist) => (
            <ScientistCard key={scientist.id} scientist={scientist} />
          ))}
        </div>
      </div>
    </div>
  );
}
