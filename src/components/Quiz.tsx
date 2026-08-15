import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Check, Sparkles, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { quizQuestions } from '../data/ilosData';
import { soundManager } from '../utils/audio';
import { launchPurpleConfetti } from '../utils/confetti';

interface QuizProps {
  onUnlockAchievement: (id: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onUnlockAchievement }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQ = quizQuestions[currentQuestionIndex];

  const handleSelectOption = (key: string) => {
    soundManager.playPop();
    setSelectedOption(key);
    setAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    soundManager.playClick();

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      soundManager.playAchievement();
      launchPurpleConfetti();
      onUnlockAchievement('zaateeen-master');
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCompleted(false);
    setAnswers({});
  };

  const selectedOptObj = currentQ?.options.find((opt) => opt.key === selectedOption);

  return (
    <section id="quiz-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 04 • TEST-İ İLOŞ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Ne Kadar İloş'sun?
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-md mx-auto mt-2">
            İloş parametrelerini ne kadar iyi tanıdığını ölçen, tamamen taraflı ve bilimsel olmayan test.
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-[#140b25]/90 backdrop-blur-xl border border-purple-700/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60">
          {!isCompleted ? (
            <div>
              {/* Question Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-mono-code text-purple-300 mb-6">
                <span>SORU {currentQuestionIndex + 1} / {quizQuestions.length}</span>
                <div className="flex gap-1.5">
                  {quizQuestions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-5 h-1.5 rounded-full transition-all ${
                        idx === currentQuestionIndex
                          ? 'bg-pink-500 w-8'
                          : idx < currentQuestionIndex
                          ? 'bg-purple-500'
                          : 'bg-purple-900/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <motion.h3
                key={currentQ.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug"
              >
                {currentQ.question}
              </motion.h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt.key;
                  return (
                    <motion.button
                      key={opt.key}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-900/60 border-pink-400 text-white shadow-md shadow-purple-950'
                          : 'bg-purple-950/30 border-purple-800/40 text-purple-200 hover:bg-purple-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl font-mono-code text-xs font-bold flex items-center justify-center ${
                          isSelected
                            ? 'bg-pink-500 text-white'
                            : 'bg-purple-900/70 text-purple-300'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="text-sm sm:text-base font-medium">
                          {opt.text}
                        </span>
                      </div>

                      {isSelected && (
                        <Check className="w-4 h-4 text-pink-400 shrink-0 ml-2" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Selected Option Feedback Note */}
              <AnimatePresence>
                {selectedOptObj && selectedOptObj.funnyComment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-700/30 text-xs sm:text-sm text-pink-300 font-serif-italic mb-6"
                  >
                    💡 {selectedOptObj.funnyComment}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  id="quiz-next-btn"
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-purple-950"
                >
                  <span>{currentQuestionIndex === quizQuestions.length - 1 ? 'Sonucu Gör' : 'Sonraki Soru'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Result Screen */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 flex items-center justify-center mx-auto mb-4 text-white shadow-xl shadow-purple-900/60 border border-purple-400/40">
                <Trophy className="w-8 h-8 text-yellow-200" />
              </div>

              <span className="text-xs uppercase tracking-widest text-pink-400 font-mono-code">
                TEST SONUCU
              </span>
              <h3 className="text-4xl sm:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-300 to-purple-100 my-2">
                %100 İLOŞ
              </h3>

              <div className="max-w-md mx-auto bg-purple-950/50 border border-purple-800/40 rounded-2xl p-5 my-6 text-sm text-purple-200/90 leading-relaxed font-serif-italic">
                “Test bilimsel değildir ama sonuç tartışmaya kapalıdır zaateeen.”
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/40 text-purple-300 text-xs font-mono-code flex items-center gap-2 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Testi Tekrar Çöz</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
