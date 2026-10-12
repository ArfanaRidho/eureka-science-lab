'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Flame, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import { getQuizStats, recordQuizAnswer } from '@/lib/storage';

export default function DailyQuizSection() {
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

  const currentQ = QUIZ_QUESTIONS[currentIndex] || QUIZ_QUESTIONS[0];

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
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#63E6FF', '#10B981', '#F59E0B', '#A78BFA'],
        });
      } catch {
        // Ignore if confetti not supported
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <section className="w-full py-16 sm:py-20 bg-[#07111F] border-t border-[#1E3A5F]/60 relative overflow-hidden">
      {/* Background science glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-950/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63E6FF]/10 border border-[#63E6FF]/20 text-xs font-mono text-[#63E6FF]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tantangan Harian Eureka</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Uji Rasa Ingin Tahumu Hari Ini
          </h2>
          <p className="text-sm sm:text-base text-[#A8B7C8] max-w-xl mx-auto">
            Jawab pertanyaan seputar penemuan terbesar dan dapatkan penjelasan ilmiah mendalam di setiap pilihanmu.
          </p>

          {/* Stats Badges */}
          <div className="flex items-center justify-center gap-4 pt-2 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#122238] border border-[#1E3A5F] text-[#F59E0B]">
              <Flame className="w-4 h-4 fill-current" />
              <span>Streak: {quizStats.streak} benar beruntun</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#122238] border border-[#1E3A5F] text-[#10B981]">
              <Trophy className="w-4 h-4" />
              <span>Skor Total: {quizStats.correctCount} / {quizStats.answeredCount}</span>
            </div>
          </div>
        </div>

        {/* Quiz Interactive Card */}
        <div className="bg-[#122238] border border-[rgba(99,230,255,0.2)] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Question Tag & Difficulty */}
          <div className="flex items-center justify-between text-xs text-[#A8B7C8] font-mono">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0D1B2A] border border-[#1E3A5F] text-[#63E6FF]">
              Pertanyaan {currentIndex + 1} dari {QUIZ_QUESTIONS.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#182C48] text-white">
              Tingkat: {currentQ.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* 4 Multiple-Choice Answers */}
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
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all flex items-center justify-between group ${buttonStyle}`}
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

          {/* Immediate Feedback & Educational Explanation */}
          {isAnswered && (
            <div
              className={`p-5 rounded-2xl border transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                isCorrect
                  ? 'bg-[#10B981]/10 border-[#10B981]/30 text-white'
                  : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-2 text-sm sm:text-base">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                    <span className="text-[#10B981]">Jawaban Tepat! Luar Biasa.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-[#EF4444]" />
                    <span className="text-[#EF4444]">Belum Tepat, Mari Kita Pelajari:</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#F5F7FA] leading-relaxed">
                {currentQ.explanation}
              </p>

              {currentQ.discoverySlug && (
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-end">
                  <Link
                    href={`/discover/${currentQ.discoverySlug}`}
                    className="text-xs font-semibold text-[#63E6FF] hover:underline flex items-center gap-1"
                  >
                    <span>Baca Artikel Penemuan Terkait</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Quiz Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#182C48] hover:bg-[#1E3A5F] text-[#63E6FF] font-semibold text-xs sm:text-sm transition border border-[#1E3A5F]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Pertanyaan Lain</span>
            </button>

            <Link
              href="/quiz"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-[#63E6FF] transition"
            >
              <span>Semua Kuis & Lencana</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
