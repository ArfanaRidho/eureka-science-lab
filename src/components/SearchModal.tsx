'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Sparkles, Users, FlaskConical, ArrowRight } from 'lucide-react';
import { DISCOVERIES } from '@/data/discoveries';
import { SCIENTISTS } from '@/data/scientists';

export default function SearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'discoveries' | 'scientists' | 'lab'>('all');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Listen to keyboard shortcut (Ctrl+K / Cmd+K) and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('eurekalab_open_search', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('eurekalab_open_search', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter items
  const cleanQ = query.trim().toLowerCase();

  const matchingDiscoveries = DISCOVERIES.filter(
    (d) =>
      cleanQ === '' ||
      d.title.toLowerCase().includes(cleanQ) ||
      d.summary.toLowerCase().includes(cleanQ) ||
      d.tagline.toLowerCase().includes(cleanQ) ||
      d.category.toLowerCase().includes(cleanQ)
  );

  const matchingScientists = SCIENTISTS.filter(
    (s) =>
      cleanQ === '' ||
      s.name.toLowerCase().includes(cleanQ) ||
      s.field.toLowerCase().includes(cleanQ) ||
      s.countryOrContext.toLowerCase().includes(cleanQ) ||
      s.biography.toLowerCase().includes(cleanQ)
  );

  const labSimulations = [
    { title: 'Simulasi Orbit Planet & Gravitasi', href: '/lab?sim=orbit', desc: 'Hukum Newton & Kepler' },
    { title: 'Simulasi Rangkaian Listrik & Lampu Pijar', href: '/lab?sim=circuit', desc: 'Hukum Ohm & Efek Joule' },
    { title: 'Struktur Atom & Lompatan Kuantum Bohr', href: '/lab?sim=atom', desc: 'Spektrum Emisi Foton' },
    { title: 'Bandul Gravitasi Kosmis Harmonis', href: '/lab?sim=pendulum', desc: 'Kekekalan Energi Mekanik' },
  ].filter(
    (l) => cleanQ === '' || l.title.toLowerCase().includes(cleanQ) || l.desc.toLowerCase().includes(cleanQ)
  );

  const totalResults =
    (filterType === 'all' || filterType === 'discoveries' ? matchingDiscoveries.length : 0) +
    (filterType === 'all' || filterType === 'scientists' ? matchingScientists.length : 0) +
    (filterType === 'all' || filterType === 'lab' ? labSimulations.length : 0);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0D1B2A] border border-[rgba(99,230,255,0.25)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1E3A5F] flex items-center gap-3 bg-[#122238]">
          <Search className="w-5 h-5 text-[#63E6FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari penemuan, tokoh ilmuwan, konsep fisika, DNA, 4G, dll..."
            className="w-full bg-transparent text-white placeholder-[#A8B7C8]/60 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#A8B7C8] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="px-2 py-1 text-xs rounded bg-[#182C48] text-[#A8B7C8] hover:text-white border border-[#1E3A5F]"
          >
            ESC
          </button>
        </div>

        {/* Filter Type Tabs */}
        <div className="px-4 py-2 border-b border-[#182C48] bg-[#07111F] flex items-center gap-2 text-xs overflow-x-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg transition ${
              filterType === 'all' ? 'bg-[#63E6FF] text-[#07111F] font-bold' : 'text-[#A8B7C8] hover:text-white'
            }`}
          >
            Semua ({totalResults})
          </button>
          <button
            onClick={() => setFilterType('discoveries')}
            className={`px-3 py-1 rounded-lg transition ${
              filterType === 'discoveries' ? 'bg-[#63E6FF] text-[#07111F] font-bold' : 'text-[#A8B7C8] hover:text-white'
            }`}
          >
            Penemuan ({matchingDiscoveries.length})
          </button>
          <button
            onClick={() => setFilterType('scientists')}
            className={`px-3 py-1 rounded-lg transition ${
              filterType === 'scientists' ? 'bg-[#63E6FF] text-[#07111F] font-bold' : 'text-[#A8B7C8] hover:text-white'
            }`}
          >
            Ilmuwan ({matchingScientists.length})
          </button>
          <button
            onClick={() => setFilterType('lab')}
            className={`px-3 py-1 rounded-lg transition ${
              filterType === 'lab' ? 'bg-[#63E6FF] text-[#07111F] font-bold' : 'text-[#A8B7C8] hover:text-white'
            }`}
          >
            Simulasi Lab ({labSimulations.length})
          </button>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {totalResults === 0 ? (
            <div className="text-center py-10 text-[#A8B7C8]">
              <p className="text-sm">Tidak ditemukan hasil untuk &ldquo;<span className="text-white">{query}</span>&rdquo;</p>
              <p className="text-xs text-[#A8B7C8]/70 mt-1">Coba kata kunci lain seperti &ldquo;Habibie&rdquo;, &ldquo;Penisilin&rdquo;, &ldquo;Relativitas&rdquo;, atau &ldquo;DNA&rdquo;.</p>
            </div>
          ) : (
            <>
              {/* Discoveries Results */}
              {(filterType === 'all' || filterType === 'discoveries') && matchingDiscoveries.length > 0 && (
                <div>
                  <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#63E6FF] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Penemuan Ilmiah
                  </h5>
                  <div className="space-y-1.5">
                    {matchingDiscoveries.slice(0, 4).map((d) => (
                      <div
                        key={d.id}
                        onClick={() => handleSelect(`/discover/${d.slug}`)}
                        className="p-3 rounded-xl bg-[#122238]/60 hover:bg-[#182C48] border border-transparent hover:border-[#63E6FF]/30 cursor-pointer transition flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <h6 className="text-sm font-semibold text-white group-hover:text-[#63E6FF] transition">
                            {d.title}
                          </h6>
                          <p className="text-xs text-[#A8B7C8] line-clamp-1">{d.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#A8B7C8] group-hover:text-[#63E6FF] group-hover:translate-x-1 transition shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scientists Results */}
              {(filterType === 'all' || filterType === 'scientists') && matchingScientists.length > 0 && (
                <div>
                  <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#A78BFA] mb-2 flex items-center gap-1.5">
                    <Users className="w-3 h-3" /> Tokoh Ilmuwan
                  </h5>
                  <div className="space-y-1.5">
                    {matchingScientists.slice(0, 4).map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect(`/scientists/${s.slug}`)}
                        className="p-3 rounded-xl bg-[#122238]/60 hover:bg-[#182C48] border border-transparent hover:border-[#A78BFA]/30 cursor-pointer transition flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
                            style={{ backgroundColor: s.avatarColor }}
                          >
                            {s.avatarInitial}
                          </div>
                          <div>
                            <h6 className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition">
                              {s.name}
                            </h6>
                            <p className="text-xs text-[#A8B7C8]">{s.field} &bull; {s.countryOrContext}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#A8B7C8] group-hover:text-[#A78BFA] group-hover:translate-x-1 transition shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lab Simulations */}
              {(filterType === 'all' || filterType === 'lab') && labSimulations.length > 0 && (
                <div>
                  <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#10B981] mb-2 flex items-center gap-1.5">
                    <FlaskConical className="w-3 h-3" /> Laboratorium Eksperimen
                  </h5>
                  <div className="space-y-1.5">
                    {labSimulations.map((l, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelect(l.href)}
                        className="p-3 rounded-xl bg-[#122238]/60 hover:bg-[#182C48] border border-transparent hover:border-[#10B981]/30 cursor-pointer transition flex items-center justify-between group"
                      >
                        <div>
                          <h6 className="text-sm font-semibold text-white group-hover:text-[#10B981] transition">
                            {l.title}
                          </h6>
                          <p className="text-xs text-[#A8B7C8]">{l.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#A8B7C8] group-hover:text-[#10B981] group-hover:translate-x-1 transition shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-[#182C48] bg-[#07111F] text-[11px] text-[#A8B7C8]/70 flex items-center justify-between">
          <span>Gunakan kata kunci bahasa Indonesia atau istilah ilmiah</span>
          <span>Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
}
