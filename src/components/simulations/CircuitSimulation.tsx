'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Power, Info, Gauge } from 'lucide-react';

export default function CircuitSimulation() {
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(6); // Ohms
  const [isSwitchClosed, setIsSwitchClosed] = useState(true);
  const [electronOffset, setElectronOffset] = useState(0);

  // Calculations
  const current = isSwitchClosed ? voltage / resistance : 0; // Amperes (I = V/R)
  const power = isSwitchClosed ? voltage * current : 0; // Watts (P = V*I)

  // Bulb brightness calculation (0 to 1)
  const maxRatedPower = 50;
  const brightness = Math.min(power / maxRatedPower, 1);

  // Electron animation
  useEffect(() => {
    if (!isSwitchClosed || current === 0) return;
    const interval = setInterval(() => {
      setElectronOffset((prev) => (prev + current * 1.8) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, [isSwitchClosed, current]);

  // Glow color based on power
  const getFilamentColor = () => {
    if (!isSwitchClosed || current === 0) return '#475569';
    if (power < 5) return '#991B1B'; // dull red
    if (power < 15) return '#EA580C'; // orange
    if (power < 35) return '#F59E0B'; // golden yellow
    return '#FEF08A'; // bright white-yellow
  };

  return (
    <div className="w-full bg-[#122238] border border-[rgba(99,230,255,0.18)] rounded-2xl overflow-hidden shadow-2xl">
      {/* Simulation Header */}
      <div className="p-4 sm:p-6 border-b border-[#1E3A5F] flex flex-wrap items-center justify-between gap-4 bg-[#0D1B2A]/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
              Hukum Ohm & Efek Joule
            </span>
            <span className="text-xs text-[#A8B7C8]">I = V / R &bull; P = V &times; I</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Simulasi Rangkaian Listrik & Lampu Pijar</h3>
        </div>

        {/* Switch Toggle */}
        <button
          onClick={() => setIsSwitchClosed(!isSwitchClosed)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition shadow-lg ${
            isSwitchClosed
              ? 'bg-[#10B981] hover:bg-[#059669] text-white'
              : 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
          }`}
        >
          <Power className="w-4 h-4" />
          {isSwitchClosed ? 'Sakelar: TERTUTUP (ON)' : 'Sakelar: TERBUKA (OFF)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Schematic Circuit Display */}
        <div className="lg:col-span-2 relative bg-[#07111F] p-6 flex flex-col items-center justify-center min-h-[380px]">
          <svg
            viewBox="0 0 540 340"
            className="w-full max-w-[500px] h-auto drop-shadow-md select-none"
          >
            {/* Definitions for Glow & Filters */}
            <defs>
              <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={12 * brightness} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Wire Circuit Outline */}
            {/* Top Wire */}
            <line x1="80" y1="70" x2="230" y2="70" stroke="#334155" strokeWidth="4" />
            <line x1="310" y1="70" x2="460" y2="70" stroke="#334155" strokeWidth="4" />
            {/* Right Wire */}
            <line x1="460" y1="70" x2="460" y2="270" stroke="#334155" strokeWidth="4" />
            {/* Bottom Wire */}
            <line x1="460" y1="270" x2="80" y2="270" stroke="#334155" strokeWidth="4" />
            {/* Left Wire */}
            <line x1="80" y1="270" x2="80" y2="200" stroke="#334155" strokeWidth="4" />
            <line x1="80" y1="140" x2="80" y2="70" stroke="#334155" strokeWidth="4" />

            {/* Switch Element (at top center) */}
            <g transform="translate(230, 70)">
              <circle cx="0" cy="0" r="5" fill="#63E6FF" />
              <circle cx="80" cy="0" r="5" fill="#63E6FF" />
              {isSwitchClosed ? (
                <line x1="0" y1="0" x2="80" y2="0" stroke="#10B981" strokeWidth="4" />
              ) : (
                <line x1="0" y1="0" x2="65" y2="-28" stroke="#EF4444" strokeWidth="4" />
              )}
              <text x="35" y="-35" fill="#A8B7C8" fontSize="12" textAnchor="middle" fontFamily="monospace">
                {isSwitchClosed ? 'Sakelar ON' : 'Sakelar OFF'}
              </text>
            </g>

            {/* Battery Element (on left side) */}
            <g transform="translate(80, 170)">
              {/* Positive Plate */}
              <line x1="-24" y1="-15" x2="24" y2="-15" stroke="#63E6FF" strokeWidth="5" />
              {/* Negative Plate */}
              <line x1="-14" y1="15" x2="14" y2="15" stroke="#94A3B8" strokeWidth="5" />
              <text x="-36" y="-12" fill="#63E6FF" fontSize="14" fontWeight="bold">+</text>
              <text x="-36" y="22" fill="#94A3B8" fontSize="14" fontWeight="bold">-</text>
              <text x="34" y="5" fill="#F59E0B" fontSize="13" fontWeight="bold" fontFamily="monospace">
                {voltage} V
              </text>
            </g>

            {/* Light Bulb & Resistor Element (on right side) */}
            <g transform="translate(460, 170)">
              {/* Bulb Glass Glow Halo */}
              {isSwitchClosed && brightness > 0 && (
                <circle
                  cx="0"
                  cy="0"
                  r={30 + brightness * 25}
                  fill={getFilamentColor()}
                  opacity={brightness * 0.45}
                  filter="url(#bulb-glow)"
                />
              )}

              {/* Bulb Glass Body */}
              <circle
                cx="0"
                cy="0"
                r="32"
                fill={isSwitchClosed ? 'rgba(254, 240, 138, 0.15)' : 'rgba(30, 41, 59, 0.5)'}
                stroke="#64748B"
                strokeWidth="2"
              />

              {/* Bulb Base */}
              <rect x="-10" y="32" width="20" height="12" fill="#475569" rx="2" />
              <rect x="-6" y="44" width="12" height="4" fill="#334155" rx="1" />

              {/* Filament */}
              <path
                d="M -12 20 L -6 0 L 0 -12 L 6 0 L 12 20"
                fill="none"
                stroke={getFilamentColor()}
                strokeWidth={2.5 + brightness * 1.5}
                strokeLinecap="round"
                filter={isSwitchClosed && brightness > 0.3 ? 'url(#bulb-glow)' : undefined}
              />

              <text x="44" y="-5" fill="#63E6FF" fontSize="12" fontFamily="monospace" fontWeight="bold">
                {resistance} Ω
              </text>
              <text x="44" y="15" fill="#A8B7C8" fontSize="11" fontFamily="monospace">
                Lampu/Beban
              </text>
            </g>

            {/* Animated Electron Dots along wire */}
            {isSwitchClosed && current > 0 && (
              <g fill="#63E6FF" opacity="0.9">
                {Array.from({ length: 16 }).map((_, i) => {
                  const progress = (i * 6.25 + electronOffset) % 100;
                  let x = 80;
                  let y = 70;

                  // 4 segments: top (0-25), right (25-50), bottom (50-75), left (75-100)
                  if (progress < 25) {
                    x = 80 + (progress / 25) * 380;
                    y = 70;
                  } else if (progress < 50) {
                    x = 460;
                    y = 70 + ((progress - 25) / 25) * 200;
                  } else if (progress < 75) {
                    x = 460 - ((progress - 50) / 25) * 380;
                    y = 270;
                  } else {
                    x = 80;
                    y = 270 - ((progress - 75) / 25) * 200;
                  }

                  return <circle key={i} cx={x} cy={y} r="3" />;
                })}
              </g>
            )}
          </svg>

          {/* Multimeter Digital HUD */}
          <div className="w-full max-w-[480px] grid grid-cols-4 gap-2 mt-4 p-3 rounded-xl bg-[#0D1B2A]/90 border border-[rgba(99,230,255,0.2)] text-center font-mono">
            <div className="bg-[#122238] p-2 rounded-lg">
              <span className="text-[10px] text-[#A8B7C8] block">Tegangan (V)</span>
              <span className="text-sm sm:text-base font-bold text-[#F59E0B]">{voltage.toFixed(1)} V</span>
            </div>
            <div className="bg-[#122238] p-2 rounded-lg">
              <span className="text-[10px] text-[#A8B7C8] block">Hambatan (R)</span>
              <span className="text-sm sm:text-base font-bold text-[#63E6FF]">{resistance} Ω</span>
            </div>
            <div className="bg-[#122238] p-2 rounded-lg">
              <span className="text-[10px] text-[#A8B7C8] block">Arus (I)</span>
              <span className="text-sm sm:text-base font-bold text-[#10B981]">{current.toFixed(2)} A</span>
            </div>
            <div className="bg-[#122238] p-2 rounded-lg">
              <span className="text-[10px] text-[#A8B7C8] block">Daya (P)</span>
              <span className="text-sm sm:text-base font-bold text-[#EC4899]">{power.toFixed(1)} W</span>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="p-5 sm:p-6 bg-[#0E1E34] border-t lg:border-t-0 lg:border-l border-[#1E3A5F] flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#F59E0B]" />
              Variabel Eksperimen
            </h4>

            {/* Voltage Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#A8B7C8] mb-1.5">
                <span>Tegangan Baterai (V)</span>
                <span className="font-mono text-[#F59E0B]">{voltage} Volt</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-[#F59E0B] cursor-pointer"
              />
              <p className="text-[11px] text-[#A8B7C8] mt-1">
                Beda potensial yang mendorong muatan elektron mengalir melintasi kawat.
              </p>
            </div>

            {/* Resistance Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#A8B7C8] mb-1.5">
                <span>Hambatan Filamen (R)</span>
                <span className="font-mono text-[#63E6FF]">{resistance} Ohm</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full accent-[#63E6FF] cursor-pointer"
              />
              <p className="text-[11px] text-[#A8B7C8] mt-1">
                Semakin kecil hambatan, semakin deras arus elektron yang mengalir (Hukum Ohm).
              </p>
            </div>

            {/* Formula Explanatory Box */}
            <div className="p-3 rounded-xl bg-[#122238] border border-[#1E3A5F] text-xs font-mono space-y-1">
              <div className="text-[#63E6FF] font-bold">Rumus Inti:</div>
              <div className="text-white">I = V / R = {voltage} / {resistance} = {current.toFixed(2)} A</div>
              <div className="text-white">P = V &times; I = {voltage} &times; {current.toFixed(2)} = {power.toFixed(1)} Watt</div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-3.5 rounded-xl bg-[#122238]/90 border border-[rgba(99,230,255,0.12)] text-xs text-[#A8B7C8] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Catatan Model Edukasi:</strong>
              Ini adalah model rangkaian arus searah (DC) ideal. Pada filamen tungsten asli, hambatan logam meningkat seiring kenaikan temperatur pijar (koefisien suhu positif).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
