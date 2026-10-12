'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Info, Sparkles } from 'lucide-react';

export default function OrbitSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [starMass, setStarMass] = useState(100);
  const [planetVelocity, setPlanetVelocity] = useState(2.8);
  const [showTrails, setShowTrails] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);

  // Simulation state
  const stateRef = useRef({
    planet: { x: 0, y: 140, vx: 2.8, vy: 0 },
    trail: [] as { x: number; y: number }[],
    telemetry: { distance: 140, speed: 2.8, force: 0.5 },
  });

  const resetOrbit = (velocity = planetVelocity, mass = starMass) => {
    stateRef.current.planet = { x: 0, y: 140, vx: velocity, vy: 0 };
    stateRef.current.trail = [];
  };

  useEffect(() => {
    resetOrbit();
  }, [starMass]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      if (isRunning) {
        const substeps = 4;
        const dt = (0.35 * simSpeed) / substeps;

        for (let step = 0; step < substeps; step++) {
          const p = stateRef.current.planet;
          const r = Math.sqrt(p.x * p.x + p.y * p.y);
          const safeR = Math.max(r, 18);

          // Gravitational force: F = G * M / r^2
          const G = 15;
          const force = (G * starMass) / (safeR * safeR);
          const ax = -force * (p.x / safeR);
          const ay = -force * (p.y / safeR);

          p.vx += ax * dt;
          p.vy += ay * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;

          // If too far, reset
          if (r > 600 || r < 12) {
            resetOrbit();
            break;
          }
        }

        const p = stateRef.current.planet;
        const currentDist = Math.sqrt(p.x * p.x + p.y * p.y);
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const currentForce = (15 * starMass) / Math.max(currentDist * currentDist, 20);

        stateRef.current.telemetry = {
          distance: Math.round(currentDist),
          speed: Number(currentSpeed.toFixed(2)),
          force: Number(currentForce.toFixed(3)),
        };

        if (showTrails) {
          stateRef.current.trail.push({ x: p.x, y: p.y });
          if (stateRef.current.trail.length > 250) {
            stateRef.current.trail.shift();
          }
        } else {
          stateRef.current.trail = [];
        }
      }

      // Draw background
      ctx.fillStyle = '#07111F';
      ctx.fillRect(0, 0, width, height);

      // Draw coordinate grid lines
      ctx.strokeStyle = 'rgba(99, 230, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw reference orbit circle
      ctx.strokeStyle = 'rgba(99, 230, 255, 0.12)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw orbital trails
      if (showTrails && stateRef.current.trail.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(99, 230, 255, 0.4)';
        ctx.lineWidth = 2;
        const trail = stateRef.current.trail;
        ctx.moveTo(centerX + trail[0].x, centerY + trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(centerX + trail[i].x, centerY + trail[i].y);
        }
        ctx.stroke();
      }

      // Draw Central Star (Sun)
      const starRadius = 16 + (starMass - 50) * 0.08;
      const grad = ctx.createRadialGradient(
        centerX,
        centerY,
        4,
        centerX,
        centerY,
        starRadius * 2
      );
      grad.addColorStop(0, '#FFFBEB');
      grad.addColorStop(0.3, '#F59E0B');
      grad.addColorStop(0.7, 'rgba(239, 68, 68, 0.4)');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, starRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(centerX, centerY, starRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw vector line from star to planet
      const p = stateRef.current.planet;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + p.x, centerY + p.y);
      ctx.stroke();

      // Draw Planet
      const planetX = centerX + p.x;
      const planetY = centerY + p.y;

      // Planet glow
      ctx.fillStyle = 'rgba(99, 230, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(planetX, planetY, 12, 0, Math.PI * 2);
      ctx.fill();

      // Planet body
      ctx.fillStyle = '#63E6FF';
      ctx.beginPath();
      ctx.arc(planetX, planetY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Velocity vector arrow
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(planetX, planetY);
      ctx.lineTo(planetX + p.vx * 10, planetY + p.vy * 10);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, starMass, simSpeed, showTrails]);

  return (
    <div className="w-full bg-[#122238] border border-[rgba(99,230,255,0.18)] rounded-2xl overflow-hidden shadow-2xl">
      {/* Simulation Header */}
      <div className="p-4 sm:p-6 border-b border-[#1E3A5F] flex flex-wrap items-center justify-between gap-4 bg-[#0D1B2A]/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-[#63E6FF]/10 text-[#63E6FF] border border-[#63E6FF]/20">
              Mekanika Langit Newton
            </span>
            <span className="text-xs text-[#A8B7C8]">Hukum Gravitasi Universal</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Simulasi Orbit Planet & Gravitasi</h3>
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
            onClick={() => resetOrbit()}
            className="p-1.5 rounded-lg bg-[#182C48] hover:bg-[#1E3A5F] text-[#A8B7C8] hover:text-white transition"
            title="Reset Orbit"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Canvas Area */}
        <div className="lg:col-span-2 relative bg-[#07111F] flex items-center justify-center p-2 min-h-[360px] sm:min-h-[440px]">
          <canvas
            ref={canvasRef}
            width={580}
            height={440}
            className="max-w-full h-auto rounded-lg"
          />

          {/* Telemetry Overlay */}
          <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0D1B2A]/85 backdrop-blur-md border border-[rgba(99,230,255,0.15)] text-xs font-mono space-y-1.5">
            <div className="text-[#A8B7C8] flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#63E6FF]" /> Telemetri Real-Time
            </div>
            <div className="text-white">
              Jarak Orbit: <span className="text-[#63E6FF]">{stateRef.current.telemetry.distance} px</span>
            </div>
            <div className="text-white">
              Kecepatan: <span className="text-[#10B981]">{stateRef.current.telemetry.speed} AU/s</span>
            </div>
            <div className="text-white">
              Gaya Gravitasi: <span className="text-[#F59E0B]">{stateRef.current.telemetry.force} N</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-4 text-[11px] text-[#A8B7C8]/70 font-mono">
            Vektor Hijau = Kecepatan Planet
          </div>
        </div>

        {/* Control Panel */}
        <div className="p-5 sm:p-6 bg-[#0E1E34] border-t lg:border-t-0 lg:border-l border-[#1E3A5F] flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Parameter Eksperimen
            </h4>

            {/* Star Mass */}
            <div>
              <div className="flex justify-between text-xs text-[#A8B7C8] mb-1.5">
                <span>Massa Bintang Pusat (M)</span>
                <span className="font-mono text-[#63E6FF]">{starMass} M☉</span>
              </div>
              <input
                type="range"
                min="40"
                max="200"
                value={starMass}
                onChange={(e) => setStarMass(Number(e.target.value))}
                className="w-full accent-[#63E6FF] cursor-pointer"
              />
              <p className="text-[11px] text-[#A8B7C8] mt-1">
                Semakin besar massa bintang, semakin kuat kelengkungan gravitasi di sekitarnya.
              </p>
            </div>

            {/* Launch Velocity */}
            <div>
              <div className="flex justify-between text-xs text-[#A8B7C8] mb-1.5">
                <span>Kecepatan Tangensial Awal (v₀)</span>
                <span className="font-mono text-[#10B981]">{planetVelocity} km/s</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="4.5"
                step="0.1"
                value={planetVelocity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPlanetVelocity(val);
                  resetOrbit(val);
                }}
                className="w-full accent-[#10B981] cursor-pointer"
              />
              <p className="text-[11px] text-[#A8B7C8] mt-1">
                Jika v₀ terlalu pelan planet jatuh ke bintang; jika terlalu kencang planet lepas (kecepatan lolos).
              </p>
            </div>

            {/* Speed & Trails */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-[#A8B7C8] block mb-1">Kecepatan Waktu</label>
                <select
                  value={simSpeed}
                  onChange={(e) => setSimSpeed(Number(e.target.value))}
                  className="w-full bg-[#122238] border border-[#1E3A5F] rounded-lg p-1.5 text-xs text-white"
                >
                  <option value={0.5}>0.5x (Lambat)</option>
                  <option value={1}>1.0x (Normal)</option>
                  <option value={2}>2.0x (Cepat)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#A8B7C8] block mb-1">Jejak Orbit</label>
                <button
                  onClick={() => setShowTrails(!showTrails)}
                  className={`w-full py-1.5 px-2 rounded-lg text-xs font-medium border transition ${
                    showTrails
                      ? 'bg-[#63E6FF]/10 text-[#63E6FF] border-[#63E6FF]/30'
                      : 'bg-[#122238] text-[#A8B7C8] border-[#1E3A5F]'
                  }`}
                >
                  {showTrails ? 'Jejak: Aktif' : 'Jejak: Padam'}
                </button>
              </div>
            </div>
          </div>

          {/* Scientific Disclaimer Card */}
          <div className="p-3.5 rounded-xl bg-[#122238]/90 border border-[rgba(99,230,255,0.12)] text-xs text-[#A8B7C8] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#63E6FF] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Catatan Model Edukasi:</strong>
              Ini adalah simulasi numerik 2-benda mekanika klasik Newton. Di alam nyata, gravitasi dipengaruhi oleh massa kedua benda, perturbasi planet lain, dan efek presesi relativitas umum Einstein.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
