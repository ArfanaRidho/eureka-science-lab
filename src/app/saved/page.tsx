'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  BookOpen,
  Award,
  Trophy,
  Flame,
  Clock,
  Trash2,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { DISCOVERIES } from '@/data/discoveries';
import {
  getBookmarks,
  getReadArticles,
  getQuizStats,
  getRecentViews,
  clearUserData,
  RecentItem,
  QuizStats,
} from '@/lib/storage';
import DiscoveryCard from '@/components/DiscoveryCard';

export default function SavedPage() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [quizStats, setQuizStats] = useState<QuizStats>({
    answeredCount: 0,
    correctCount: 0,
    streak: 0,
    bestStreak: 0,
    answeredQuestionIds: [],
  });
  const [recentViews, setRecentViews] = useState<RecentItem[]>([]);

  const loadData = () => {
    setBookmarks(getBookmarks());
    setReadArticles(getReadArticles());
    setQuizStats(getQuizStats());
    setRecentViews(getRecentViews());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('eurekalab_storage_update', loadData);
    return () => window.removeEventListener('eurekalab_storage_update', loadData);
  }, []);

  const bookmarkedDiscoveries = bookmarks
    .map((slug) => DISCOVERIES.find((d) => d.slug === slug))
    .filter(Boolean);

  const handleClear = () => {
    if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat bacaan dan simpanan lokal di peramban ini?')) {
      clearUserData();
      loadData();
    }
  };

  // Badges calculations
  const badges = [
    {
      id: 'pembaca-tekun',
      title: 'Pembaca Tekun',
      description: 'Membaca minimal 3 artikel penemuan ilmiah.',
      isUnlocked: readArticles.length >= 3,
      icon: BookOpen,
      accent: '#63E6FF',
    },
    {
      id: 'pakar-kuis',
      title: 'Pakar Kuis Sains',
      description: 'Menjawab dengan benar 3 atau lebih kuis sains.',
      isUnlocked: quizStats.correctCount >= 3,
      icon: Trophy,
      accent: '#10B981',
    },
    {
      id: 'streak-master',
      title: 'Api Keingintahuan',
      description: 'Mencapai streak 2 jawaban benar berturut-turut.',
      isUnlocked: quizStats.bestStreak >= 2,
      icon: Flame,
      accent: '#F59E0B',
    },
    {
      id: 'bangga-indonesia',
      title: 'Penjelajah Sains Nusantara',
      description: 'Mempelajari inovasi ilmuwan kebanggaan Indonesia.',
      isUnlocked: readArticles.some(
        (slug) =>
          slug.includes('habibie') ||
          slug.includes('tjio') ||
          slug.includes('anwar')
      ),
      icon: Award,
      accent: '#EF4444',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#07111F] py-10 sm:py-16 text-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1E3A5F] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63E6FF]/10 border border-[#63E6FF]/20 text-xs font-mono text-[#63E6FF]">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Pusat Pembelajaran & Artikel Tersimpan</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Progres Belajar Anda
            </h1>
            <p className="text-sm sm:text-base text-[#A8B7C8] max-w-xl">
              Lacak artikel penemuan yang telah Anda pelajari, koleksi bookmark favorit, dan capaian lencana rasa ingin tahu Anda.
            </p>
          </div>

          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#122238] hover:bg-rose-950/40 text-[#A8B7C8] hover:text-rose-400 border border-[#1E3A5F] hover:border-rose-800 transition text-xs font-semibold self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Bersihkan Data Lokal</span>
          </button>
        </div>

        {/* Learning Stats Counter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[#122238] border border-[rgba(99,230,255,0.15)] space-y-1">
            <span className="text-xs text-[#A8B7C8] flex items-center gap-1.5 font-mono">
              <Bookmark className="w-3.5 h-3.5 text-[#63E6FF]" /> Artikel Disimpan
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{bookmarks.length}</div>
            <p className="text-[11px] text-[#A8B7C8]">Dapat dibaca ulang kapan pun</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#122238] border border-[rgba(99,230,255,0.15)] space-y-1">
            <span className="text-xs text-[#A8B7C8] flex items-center gap-1.5 font-mono">
              <BookOpen className="w-3.5 h-3.5 text-[#10B981]" /> Artikel Selesai Dibaca
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{readArticles.length}</div>
            <p className="text-[11px] text-[#A8B7C8]">Dari total 12 penemuan utama</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#122238] border border-[rgba(99,230,255,0.15)] space-y-1">
            <span className="text-xs text-[#A8B7C8] flex items-center gap-1.5 font-mono">
              <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" /> Jawaban Kuis Benar
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{quizStats.correctCount}</div>
            <p className="text-[11px] text-[#A8B7C8]">Dari {quizStats.answeredCount} soal dikerjakan</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#122238] border border-[rgba(99,230,255,0.15)] space-y-1">
            <span className="text-xs text-[#A8B7C8] flex items-center gap-1.5 font-mono">
              <Flame className="w-3.5 h-3.5 text-[#EC4899]" /> Rekor Streak Kuis
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{quizStats.bestStreak}</div>
            <p className="text-[11px] text-[#A8B7C8]">Jawaban benar berurutan</p>
          </div>
        </div>

        {/* Achievement Badges Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Lencana Pencapaian Belajar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-2xl border transition flex items-start gap-3.5 ${
                    badge.isUnlocked
                      ? 'bg-[#122238] border-[#63E6FF]/40 shadow-lg'
                      : 'bg-[#0D1B2A]/50 border-[#1E3A5F]/50 opacity-60'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      badge.isUnlocked ? 'border border-white/20' : 'bg-[#1E3A5F]'
                    }`}
                    style={badge.isUnlocked ? { backgroundColor: `${badge.accent}25`, color: badge.accent } : {}}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">{badge.title}</h4>
                      {badge.isUnlocked && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      )}
                    </div>
                    <p className="text-xs text-[#A8B7C8] leading-relaxed">
                      {badge.description}
                    </p>
                    <span className="text-[10px] font-mono block pt-1" style={{ color: badge.isUnlocked ? badge.accent : '#64748B' }}>
                      {badge.isUnlocked ? '✓ Terbuka' : 'Belum Tercapai'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Saved Articles List */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#63E6FF]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Artikel Tersimpan ({bookmarkedDiscoveries.length})
              </h2>
            </div>
            {bookmarkedDiscoveries.length > 0 && (
              <Link href="/discover" className="text-xs font-semibold text-[#63E6FF] hover:underline">
                Eksplorasi Lainnya &rarr;
              </Link>
            )}
          </div>

          {bookmarkedDiscoveries.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#122238] border border-[#1E3A5F] text-center space-y-4 max-w-md mx-auto">
              <Bookmark className="w-10 h-10 text-[#63E6FF] mx-auto opacity-70" />
              <h3 className="text-lg font-bold text-white">Belum Ada Artikel yang Disimpan</h3>
              <p className="text-xs text-[#A8B7C8]">
                Saat menjelajahi artikel penemuan ilmiah, klik ikon bookmark untuk menyimpannya ke daftar bacaan pribadi Anda.
              </p>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#63E6FF] text-[#07111F] font-bold text-xs"
              >
                <span>Buka Katalog Penemuan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedDiscoveries.map((discovery) => (
                discovery && <DiscoveryCard key={discovery.id} discovery={discovery} />
              ))}
            </div>
          )}
        </section>

        {/* Recently Viewed Articles */}
        {recentViews.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-[#1E3A5F]">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A8B7C8]" />
              Riwayat Terakhir Dikunjungi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {recentViews.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/discover/${item.slug}`}
                  className="p-3.5 rounded-xl bg-[#122238]/60 hover:bg-[#182C48] border border-[#1E3A5F] hover:border-[#63E6FF]/40 transition block group"
                >
                  <span className="text-[10px] font-mono text-[#63E6FF] uppercase block">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-semibold text-white group-hover:text-[#63E6FF] transition line-clamp-1 mt-0.5">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-[#A8B7C8]/70 block mt-1">
                    Buka kembali artikel &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Local Storage Privacy Note */}
        <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#1E3A5F] flex items-start gap-3 text-xs text-[#A8B7C8]">
          <Info className="w-4 h-4 text-[#63E6FF] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Penyimpanan Lokal:</strong> Seluruh progres pembelajaran, riwayat baca, dan artikel tersimpan Anda disimpan secara aman pada peramban web perangkat ini (localStorage) dan tidak disinkronkan ke peladen eksternal demi kenyamanan dan privasi Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
