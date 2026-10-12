'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Info, Play, Zap } from 'lucide-react';

interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  protons: number;
  neutrons: number;
  electronShells: number[]; // e.g. [2, 4]
  accent: string;
}

const ELEMENTS: ElementData[] = [
  { symbol: 'H', name: 'Hidrogen', atomicNumber: 1, protons: 1, neutrons: 0, electronShells: [1], accent: '#63E6FF' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, protons: 2, neutrons: 2, electronShells: [2], accent: '#F59E0B' },
  { symbol: 'C', name: 'Karbon', atomicNumber: 6, protons: 6, neutrons: 6, electronShells: [2, 4], accent: '#10B981' },
  { symbol: 'O', name: 'Oksigen', atomicNumber: 8, protons: 8, neutrons: 8, electronShells: [2, 6], accent: '#EC4899' },
  { symbol: 'Na', name: 'Natrium', atomicNumber: 11, protons: 11, neutrons: 12, electronShells: [2, 8, 1], accent: '#A78BFA' },
];

export default function AtomSimulation() {
  const [selectedElement, setSelectedElement] = useState<ElementData>(ELEMENTS[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isExcited, setIsExcited] = useState(false);
  const [photonEmitted, setPhotonEmitted] = useState<string | null>(null);

  // Rotate electrons
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1.2) % 360);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Trigger Quantum Leap / Photon Excitation
  const triggerQuantumExcitation = () => {
    if (isExcited) return;
    setIsExcited(true);
    setPhotonEmitted('Menyerap Foton (Eksitasi n=1 -> n=3)');

    setTimeout(() => {
      setIsExcited(false);
      setPhotonEmitted('Emisi Foton Cahaya Tampak! (λ = 656 nm, Garis Balmer H-α)');
      setTimeout(() => {
        setPhotonEmitted(null);
      }, 3500);
    }, 1800);
  };

  const shellRadii = [55, 95, 135]; // K, L, M shells

  return (
    <div className="w-full bg-[#122238] border border-[rgba(99,230,255,0.18)] rounded-2xl overflow-hidden shadow-2xl">
      {/* Simulation Header */}
      <div className="p-4 sm:p-6 border-b border-[#1E3A5F] flex flex-wrap items-center justify-between gap-4 bg-[#0D1B2A]/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20">
              Model Atom Bohr & Kuantum
            </span>
            <span className="text-xs text-[#A8B7C8]">ΔE = h &bull; ν &bull; Spektrum Emisi Foton</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Struktur Atom & Lompatan Kuantum</h3>
        </div>

        {/* Action Button */}
        <button
          onClick={triggerQuantumExcitation}
          disabled={isExcited}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-gradient-to-r from-[#A78BFA] to-[#63E6FF] hover:opacity-90 text-[#07111F] transition shadow-lg disabled:opacity-50"
        >
          <Zap className="w-4 h-4" />
          {isExcited ? 'Elektron Tereksitasi...' : 'Eksitasi Foton (Lompatan Kuantum)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Visual Display */}
        <div className="lg:col-span-2 relative bg-[#07111F] p-4 flex flex-col items-center justify-center min-h-[380px]">
          <svg viewBox="0 0 360 360" className="w-full max-w-[360px] h-auto select-none">
            {/* Center coordinates: 180, 180 */}
            {/* Electron Shell Tracks */}
            {shellRadii.map((radius, idx) => (
              <g key={idx}>
                <circle
                  cx="180"
                  cy="180"
                  r={radius}
                  fill="none"
                  stroke={isExcited && idx === 1 ? 'rgba(167, 139, 250, 0.45)' : 'rgba(99, 230, 255, 0.15)'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={180 + radius - 10}
                  y="172"
                  fill="#64748B"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  Kulit {['K (n=1)', 'L (n=2)', 'M (n=3)'][idx]}
                </text>
              </g>
            ))}

            {/* Photon Wave Packet Animation */}
            {photonEmitted && (
              <g transform="translate(180, 180)">
                <circle
                  cx="0"
                  cy="0"
                  r={isExcited ? 80 : 130}
                  fill="none"
                  stroke={isExcited ? '#F59E0B' : '#EF4444'}
                  strokeWidth="3"
                  opacity="0.8"
                  className="animate-ping"
                />
              </g>
            )}

            {/* Nucleus (Protons & Neutrons) */}
            <g transform="translate(180, 180)">
              {/* Nucleus glow */}
              <circle cx="0" cy="0" r="22" fill={selectedElement.accent} opacity="0.25" />
              <circle cx="0" cy="0" r="14" fill="#0D1B2A" stroke={selectedElement.accent} strokeWidth="2" />
              <text
                x="0"
                y="4"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {selectedElement.symbol}
              </text>
            </g>

            {/* Orbiting Electrons */}
            {selectedElement.electronShells.map((count, shellIdx) => {
              const currentRadius =
                isExcited && shellIdx === selectedElement.electronShells.length - 1
                  ? shellRadii[shellIdx] + 35
                  : shellRadii[shellIdx];

              return Array.from({ length: count }).map((_, electronIdx) => {
                const angleStep = (360 / count);
                const currentAngle = (rotationAngle * (shellIdx % 2 === 0 ? 1 : -0.7) + electronIdx * angleStep) * (Math.PI / 180);
                const cx = 180 + Math.cos(currentAngle) * currentRadius;
                const cy = 180 + Math.sin(currentAngle) * currentRadius;

                return (
                  <g key={`${shellIdx}-${electronIdx}`}>
                    {/* Electron Glow */}
                    <circle cx={cx} cy={cy} r="7" fill="#63E6FF" opacity="0.4" />
                    {/* Electron core */}
                    <circle cx={cx} cy={cy} r="4" fill="#63E6FF" stroke="#FFFFFF" strokeWidth="1" />
                  </g>
                );
              });
            })}
          </svg>

          {/* Photon Event Alert */}
          {photonEmitted && (
            <div className="absolute bottom-4 p-3 rounded-xl bg-[#0D1B2A]/90 border border-[#A78BFA] text-xs font-mono text-[#63E6FF] flex items-center gap-2 animate-bounce">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>{photonEmitted}</span>
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="p-5 sm:p-6 bg-[#0E1E34] border-t lg:border-t-0 lg:border-l border-[#1E3A5F] flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Pilih Unsur Kimia
            </h4>

            {/* Element Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ELEMENTS.map((elm) => (
                <button
                  key={elm.symbol}
                  onClick={() => setSelectedElement(elm)}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    selectedElement.symbol === elm.symbol
                      ? 'bg-[#122238] border-[#63E6FF] text-white shadow-lg'
                      : 'bg-[#0D1B2A]/70 border-[#1E3A5F] text-[#A8B7C8] hover:border-[#63E6FF]/50'
                  }`}
                >
                  <span className="font-mono text-lg font-bold text-[#63E6FF]">{elm.symbol}</span>
                  <span className="text-xs font-medium text-white">{elm.name}</span>
                  <span className="text-[10px] text-[#A8B7C8]">Z = {elm.atomicNumber}</span>
                </button>
              ))}
            </div>

            {/* Nuclear Composition Stats */}
            <div className="p-3.5 rounded-xl bg-[#122238] border border-[#1E3A5F] text-xs font-mono space-y-2">
              <div className="text-white font-bold flex justify-between">
                <span>Nomor Atom (Z):</span>
                <span className="text-[#63E6FF]">{selectedElement.atomicNumber}</span>
              </div>
              <div className="text-white flex justify-between">
                <span>Jumlah Proton:</span>
                <span className="text-[#EF4444]">{selectedElement.protons} p⁺</span>
              </div>
              <div className="text-white flex justify-between">
                <span>Jumlah Neutron:</span>
                <span className="text-[#94A3B8]">{selectedElement.neutrons} n⁰</span>
              </div>
              <div className="text-white flex justify-between">
                <span>Konfigurasi Elektron:</span>
                <span className="text-[#10B981]">
                  {selectedElement.electronShells.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-3.5 rounded-xl bg-[#122238]/90 border border-[rgba(99,230,255,0.12)] text-xs text-[#A8B7C8] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Catatan Model Edukasi:</strong>
              Ini adalah representasi model orbit Bohr (1913). Menurut mekanika kuantum modern (persamaan gelombang Schrödinger), elektron tidak mengorbit dalam lintasan lingkaran datar, melainkan berada dalam orbital awan probabilitas spasial (s, p, d, f).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
