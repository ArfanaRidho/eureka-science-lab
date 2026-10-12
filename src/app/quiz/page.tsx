'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flame,
  Trophy,
  Award,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import { CATEGORIES } from '@/data/categories';
import { getQuizStats, recordQuizAnswer } from '@/lib/storage';
import { CategoryId } from '@/types';

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStats, setQuizStats] = useState({
    answeredCount: 0,
    correctCount: 0,
    streak: 0,
    bestStreak: 0,
  });

  useEffect(() => {
    setQuizStats(getQuizStats());
    const handleSync = () => setQuizStats(getQuizStats());
    window.addEventListener('eurekalab_storage_update', handleSync);
    return () => window.removeEventListener('eurekalab_storage_update', handleSync);
  }, []);

  const filteredQuestions =
    selectedCategory === 'all'
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.category === selectedCategory);

  const safeIndex = Math.min(currentIndex, Math.max(filteredQuestions.length - 1, 0));
  const currentQ = filteredQuestions[safeIndex] || QUIZ_QUESTIONS[0];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    const updated = recordQuizAnswer(currentQ.id, isCorrect);
    setQuizStats(updated);

    if (isCorrect) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#63E6FF', '#10B981', '#F59E0B', '#A78BFA'],
        });
      } catch {
        // Ignore if confetti not supported
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex(0);
  };

  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="w-full min-h-screen bg-[#07111F] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63E6FF]/10 border border-[#63E6FF]/20 text-xs font-mono text-[#63E6FF]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tantangan Pengetahuan Eureka</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Kuis Sains & Penemuan
          </h1>
          <p className="text-sm sm:text-base text-[#A8B7C8] max-w-xl mx-auto">
            Uji wawasan Anda mengenai penemuan penting, tokoh ilmuwan, dan hukum alam. Dapatkan umpan balik langsung beserta penjelasan komprehensif.
          </p>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 font-mono text-xs">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#122238] border border-[#1E3A5F] text-[#F59E0B]">
              <Flame className="w-4 h-4 fill-current" />
              <span>Streak Saat Ini: {quizStats.streak}</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#122238] border border-[#1E3A5F] text-[#10B981]">
              <Trophy className="w-4 h-4" />
              <span>Skor Total: {quizStats.correctCount} / {quizStats.answeredCount}</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#122238] border border-[#1E3A5F] text-[#63E6FF]">
              <Award className="w-4 h-4" />
              <span>Rekor Terbaik: {quizStats.bestStreak}</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              handleReset();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
              selectedCategory === 'all'
                ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                : 'bg-[#122238] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
            }`}
          >
            Semua Topik ({QUIZ_QUESTIONS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                handleReset();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#63E6FF] text-[#07111F] border-[#63E6FF]'
                  : 'bg-[#122238] text-[#A8B7C8] border-[#1E3A5F] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.accentColor }} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-[#122238] border border-[rgba(99,230,255,0.2)] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between text-xs text-[#A8B7C8] font-mono">
            <span className="px-3 py-1 rounded-full bg-[#0D1B2A] border border-[#1E3A5F] text-[#63E6FF]">
              Soal {safeIndex + 1} dari {filteredQuestions.length}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#182C48] text-white">
              Tingkat Kesulitan: {currentQ.difficulty}
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              let buttonStyle = 'bg-[#0D1B2A] border-[#1E3A5F] text-[#F59E0F] hover:border-[#63E6FF]/50 text-white';

              if (isAnswered) {
                if (idx === currentQ.correctAnswer) {
                  buttonStyle = 'bg-[#10B981]/20 border-[#10B981] text-white ring-1 ring-[#10B981]';
                } else if (idx === selectedOption) {
                  buttonStyle = 'bg-[#EF4444]/20 border-[#EF4444] text-white ring-1 ring-[#EF4444]';
                } else {
                  buttonStyle = 'bg-[#0D1B2A]/50 border-[#1E3A5F]/40 text-[#A8B7C8]/50 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all flex items-center justify-between group ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-xl bg-[#182C48] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-[#63E6FF] group-hover:text-[#07111F] transition">
                      {letter}
                    </span>
                    <span className="text-white">{option}</span>
                  </div>

                  {isAnswered && idx === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 ml-2" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-[#EF4444] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div
              className={`p-5 sm:p-6 rounded-2xl border transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                isCorrect
                  ? 'bg-[#10B981]/10 border-[#10B981]/30 text-white'
                  : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-2 text-sm sm:text-base">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                    <span className="text-[#10B981]">Jawaban Benar! Selamat.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-[#EF4444]" />
                    <span className="text-[#EF4444]">Jawaban Belum Tepat. Simak Penjelasannya:</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#F5F7FA] leading-relaxed">
                {currentQ.explanation}
              </p>

              {currentQ.discoverySlug && (
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                  <Link
                    href={`/discover/${currentQ.discoverySlug}`}
                    className="text-xs font-semibold text-[#63E6FF] hover:underline flex items-center gap-1"
                  >
                    <span>Pelajari Penemuan Ini Secara Menyeluruh</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Action Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#182C48] hover:bg-[#1E3A5F] text-[#A8B7C8] hover:text-white text-xs sm:text-sm transition border border-[#1E3A5F]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mulai Ulang Topik Ini</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#63E6FF] hover:bg-[#38BDF8] text-[#07111F] font-bold text-xs sm:text-sm transition shadow-lg"
            >
              <span>Pertanyaan Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
