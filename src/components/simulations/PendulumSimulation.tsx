'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info, Activity } from 'lucide-react';

interface CelestialBody {
  name: string;
  gravity: number; // m/s^2
  accent: string;
}

const CELESTIAL_BODIES: CelestialBody[] = [
  { name: 'Bumi', gravity: 9.8, accent: '#3B82F6' },
  { name: 'Bulan', gravity: 1.62, accent: '#94A3B8' },
  { name: 'Mars', gravity: 3.72, accent: '#EF4444' },
  { name: 'Jupiter', gravity: 24.79, accent: '#F59E0B' },
];

export default function PendulumSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [length, setLength] = useState(1.4); // meters
  const [mass, setMass] = useState(1.5); // kg
  const [selectedBody, setSelectedBody] = useState<CelestialBody>(CELESTIAL_BODIES[0]);

  // State ref for physics variables
  const physicsRef = useRef({
    theta: Math.PI / 4, // 45 degrees
    omega: 0, // angular velocity
    energy: { kinetic: 0, potential: 0, total: 0 },
  });

  const resetPendulum = () => {
    physicsRef.current.theta = Math.PI / 4;
    physicsRef.current.omega = 0;
  };

  useEffect(() => {
    resetPendulum();
  }, [selectedBody, length]);

  // Physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const originX = width / 2;
      const originY = 50;

      if (isRunning) {
        // Runge-Kutta / Euler integration
        const dt = 0.02;
        const g = selectedBody.gravity;
        const damping = 0.9995;

        // alpha = - (g / L) * sin(theta)
        const alpha = -(g / length) * Math.sin(physicsRef.current.theta);
        physicsRef.current.omega += alpha * dt;
        physicsRef.current.omega *= damping;
        physicsRef.current.theta += physicsRef.current.omega * dt;

        // Energies
        // Potential: m * g * h = m * g * L * (1 - cos(theta))
        // Kinetic: 0.5 * m * v^2 = 0.5 * m * (L * omega)^2
        const L = length;
        const m = mass;
        const h = L * (1 - Math.cos(physicsRef.current.theta));
        const ep = m * g * h;
        const v = L * physicsRef.current.omega;
        const ek = 0.5 * m * v * v;
        const total = ep + ek;

        physicsRef.current.energy = {
          kinetic: Math.max(ek, 0),
          potential: Math.max(ep, 0),
          total: Math.max(total, 0.01),
        };
      }

      // Draw background
      ctx.fillStyle = '#07111F';
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(99, 230, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Pivot Support
      ctx.fillStyle = '#1E3A5F';
      ctx.fillRect(originX - 40, originY - 14, 80, 14);
      ctx.fillStyle = '#63E6FF';
      ctx.beginPath();
      ctx.arc(originX, originY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Pendulum coordinates in pixels
      const pixelLength = length * 110;
      const bobX = originX + Math.sin(physicsRef.current.theta) * pixelLength;
      const bobY = originY + Math.cos(physicsRef.current.theta) * pixelLength;

      // Draw Rope
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Draw Bob Glow
      const bobRadius = 12 + mass * 3;
      ctx.fillStyle = 'rgba(99, 230, 255, 0.25)';
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius + 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw Bob
      ctx.fillStyle = selectedBody.accent;
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(bobX, bobY, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, length, mass, selectedBody]);

  // Period T = 2 * PI * sqrt(L / g)
  const period = 2 * Math.PI * Math.sqrt(length / selectedBody.gravity);

  return (
    <div className="w-full bg-[#122238] border border-[rgba(99,230,255,0.18)] rounded-2xl overflow-hidden shadow-2xl">
      {/* Simulation Header */}
      <div className="p-4 sm:p-6 border-b border-[#1E3A5F] flex flex-wrap items-center justify-between gap-4 bg-[#0D1B2A]/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/20">
              Osilasi Harmonik & Kekekalan Energi
            </span>
            <span className="text-xs text-[#A8B7C8]">T = 2π √(L / g) &bull; Ep + Ek = Konstan</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Simulasi Bandul Gravitasi Kosmis</h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#63E6FF] hover:bg-[#38BDF8] text-[#07111F] font-semibold text-sm transition"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Jeda' : 'Jalankan'}
          </button>
          <button
            onClick={resetPendulum}
            className="p-1.5 rounded-lg bg-[#182C48] hover:bg-[#1E3A5F] text-[#A8B7C8] hover:text-white transition"
            title="Reset Sudut"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Canvas & Energy Meter */}
        <div className="lg:col-span-2 relative bg-[#07111F] p-4 flex flex-col items-center justify-center min-h-[380px]">
          <canvas
            ref={canvasRef}
            width={480}
            height={340}
            className="max-w-full h-auto rounded-lg"
          />

          {/* Energy Bars HUD */}
          <div className="w-full max-w-[420px] p-3 rounded-xl bg-[#0D1B2A]/90 border border-[rgba(99,230,255,0.15)] text-xs font-mono space-y-2 mt-2">
            <div className="flex justify-between items-center text-white">
              <span className="text-[#10B981] flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Energi Kinetik (Ek):
              </span>
              <span>{physicsRef.current.energy.kinetic.toFixed(1)} J</span>
            </div>
            <div className="w-full bg-[#1E3A5F] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#10B981] h-full transition-all duration-75"
                style={{
                  width: `${Math.min(
                    (physicsRef.current.energy.kinetic /
                      Math.max(physicsRef.current.energy.total, 0.1)) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="flex justify-between items-center text-white pt-1">
              <span className="text-[#EC4899] flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Energi Potensial (Ep):
              </span>
              <span>{physicsRef.current.energy.potential.toFixed(1)} J</span>
            </div>
            <div className="w-full bg-[#1E3A5F] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#EC4899] h-full transition-all duration-75"
                style={{
                  width: `${Math.min(
                    (physicsRef.current.energy.potential /
                      Math.max(physicsRef.current.energy.total, 0.1)) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="p-5 sm:p-6 bg-[#0E1E34] border-t lg:border-t-0 lg:border-l border-[#1E3A5F] flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Lingkungan Gravitasi
            </h4>

            {/* Celestial Body Selector */}
            <div className="grid grid-cols-2 gap-2">
              {CELESTIAL_BODIES.map((body) => (
                <button
                  key={body.name}
                  onClick={() => setSelectedBody(body)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    selectedBody.name === body.name
                      ? 'bg-[#122238] border-[#63E6FF] text-white shadow-lg'
                      : 'bg-[#0D1B2A]/70 border-[#1E3A5F] text-[#A8B7C8] hover:border-[#63E6FF]/50'
                  }`}
                >
                  <span className="text-xs font-bold block text-white">{body.name}</span>
                  <span className="text-[11px] font-mono text-[#63E6FF]">{body.gravity} m/s²</span>
                </button>
              ))}
            </div>

            {/* Rope Length */}
            <div>
              <div className="flex justify-between text-xs text-[#A8B7C8] mb-1.5">
                <span>Panjang Tali (L)</span>
                <span className="font-mono text-[#63E6FF]">{length} meter</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-[#63E6FF] cursor-pointer"
              />
            </div>

            {/* Bob Mass */}
            <div>
              <div className="flex justify-between text-xs text-[#A8B7C8] mb-1.5">
                <span>Massa Beban (m)</span>
                <span className="font-mono text-[#EC4899]">{mass} kg</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.5"
                value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
                className="w-full accent-[#EC4899] cursor-pointer"
              />
            </div>

            {/* Period T Display */}
            <div className="p-3 rounded-xl bg-[#122238] border border-[#1E3A5F] text-xs font-mono">
              <span className="text-[#A8B7C8] block mb-0.5">Periode Satu Ayunan Penuh (T):</span>
              <span className="text-base font-bold text-[#F59E0B]">{period.toFixed(2)} detik</span>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-3.5 rounded-xl bg-[#122238]/90 border border-[rgba(99,230,255,0.12)] text-xs text-[#A8B7C8] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#EC4899] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Catatan Fisika:</strong>
              Pada sudut ayunan kecil (&lt;15°), periode bandul murni hanya bergantung pada panjang tali dan percepatan gravitasi planet, sama sekali tidak dipengaruhi oleh massa beban!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
