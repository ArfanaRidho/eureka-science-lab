import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  Globe,
  Award,
  Sparkles,
  Calendar,
  BookOpen,
  Users2,
  ChevronRight,
} from 'lucide-react';
import { SCIENTISTS } from '@/data/scientists';
import { DISCOVERIES } from '@/data/discoveries';
import DiscoveryCard from '@/components/DiscoveryCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SCIENTISTS.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scientist = SCIENTISTS.find((s) => s.slug === slug);
  if (!scientist) {
    return {
      title: 'Ilmuwan Tidak Ditemukan — EurekaLab',
    };
  }

  return {
    title: `${scientist.name} — EurekaLab`,
    description: scientist.biography,
  };
}

export default async function ScientistProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const scientist = SCIENTISTS.find((s) => s.slug === slug);

  if (!scientist) {
    notFound();
  }

  const relatedDiscoveries = scientist.discoverySlugs
    .map((s) => DISCOVERIES.find((d) => d.slug === s))
    .filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-[#07111F] text-[#F5F7FA] py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/scientists"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#A8B7C8] hover:text-[#63E6FF] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Direktori Ilmuwan</span>
        </Link>

        {/* Profile Hero Header */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#122238] via-[#0D1B2A] to-[#07111F] border border-[rgba(99,230,255,0.25)] flex flex-col md:flex-row items-start md:items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Avatar */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center font-bold font-mono text-3xl sm:text-4xl text-white shadow-2xl border-2 border-white/20 shrink-0"
            style={{ backgroundColor: scientist.avatarColor }}
          >
            {scientist.avatarInitial}
          </div>

          {/* Bio Header */}
          <div className="space-y-2 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#63E6FF]/10 text-[#63E6FF] border border-[#63E6FF]/20 text-xs font-mono font-semibold">
                {scientist.field}
              </span>
              <span className="text-xs font-mono text-[#A8B7C8] bg-[#0D1B2A] px-2.5 py-1 rounded-full border border-[#1E3A5F]">
                {scientist.lifespan}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {scientist.name}
            </h1>
            {scientist.fullName && scientist.fullName !== scientist.name && (
              <p className="text-xs sm:text-sm text-[#A8B7C8] font-mono">
                Nama Lengkap: {scientist.fullName}
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-[#A8B7C8]">
              <Globe className="w-4 h-4 text-[#63E6FF]" />
              <span>{scientist.countryOrContext}</span>
            </div>
          </div>
        </div>

        {/* Quotation */}
        <blockquote className="p-6 rounded-2xl bg-[#0D1B2A] border-l-4 border-[#63E6FF] text-sm sm:text-base italic text-[#F5F7FA] leading-relaxed shadow-lg">
          &ldquo;{scientist.quote}&rdquo;
        </blockquote>

        {/* Biography */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#63E6FF]" />
            Biografi & Perjalanan Ilmiah
          </h2>
          <p className="text-sm sm:text-base text-[#A8B7C8] leading-relaxed">
            {scientist.biography}
          </p>
        </section>

        {/* Major Contributions */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-[#122238] border border-[rgba(99,230,255,0.18)]">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F59E0B]" />
            Kontribusi Utama Bagi Peradaban
          </h2>
          <ul className="space-y-3 pt-2">
            {scientist.majorContributions.map((contr, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-[#F5F7FA] leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#63E6FF] shrink-0 mt-2" />
                <span>{contr}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Collaborative Context */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-[#0D1B2A] border border-[#1E3A5F]">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users2 className="w-5 h-5 text-[#10B981]" />
            Konteks Kolaborasi & Ekosistem Riset
          </h2>
          <p className="text-sm text-[#A8B7C8] leading-relaxed">
            {scientist.collaborationContext}
          </p>
        </section>

        {/* Historical Timeline */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#A78BFA]" />
            Tonggak Sejarah Kehidupan
          </h2>
          <div className="border-l-2 border-[#1E3A5F] ml-3 pl-6 space-y-6">
            {scientist.historicalTimeline.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#A78BFA] border-2 border-[#07111F]" />
                <span className="font-mono text-xs font-bold text-[#A78BFA] block">
                  {item.year}
                </span>
                <p className="text-sm font-medium text-white mt-0.5">
                  {item.milestone}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Discoveries */}
        {relatedDiscoveries.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#1E3A5F]">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Karya & Penemuan yang Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedDiscoveries.map((disc) => (
                disc && <DiscoveryCard key={disc.id} discovery={disc} />
              ))}
            </div>
          </section>
        )}

        {/* References */}
        <section className="space-y-3 pt-6 border-t border-[#1E3A5F] text-xs text-[#A8B7C8]">
          <h4 className="font-bold text-white">Sumber Biografi & Referensi</h4>
          <ul className="space-y-1 list-disc list-inside">
            {scientist.sourceReferences.map((ref, idx) => (
              <li key={idx}>
                <span className="text-white font-medium">{ref.title}</span> &bull; {ref.note}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
