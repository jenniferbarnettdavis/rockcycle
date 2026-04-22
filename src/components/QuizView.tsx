import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ViewType } from '../types';
import { QUIZ_QUESTIONS } from '../data/rockData';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface QuizViewProps {
  setView: (view: ViewType) => void;
}

export default function QuizView({ setView }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const question = QUIZ_QUESTIONS[currentQuestion];
  const answered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <button 
        onClick={() => setView('board')}
        className="flex items-center gap-2 text-slate-300 hover:text-white font-bold tracking-widest uppercase text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Board
      </button>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full bg-slate-900/50 h-2">
          <div 
            className="bg-emerald-400 h-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
            style={{ width: `${(isSubmitted ? 100 : (currentQuestion / QUIZ_QUESTIONS.length) * 100)}%` }}
          />
        </div>

        <div className="p-8 sm:p-12">
          {!isSubmitted ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="border-b border-white/10 pb-6">
                  <span className="text-emerald-400 font-bold tracking-widest text-[10px] uppercase mb-2 block">
                    Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <h2 className="text-3xl font-black leading-tight text-white">{question.question}</h2>
                </div>

                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={cn(
                          "w-full text-left p-5 rounded-2xl border transition-all font-medium text-lg backdrop-blur-sm",
                          isSelected 
                            ? "border-emerald-400 bg-emerald-500/20 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]" 
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-400/50 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    disabled={!answered}
                    onClick={handleNext}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Submit Quiz' : 'Next Question'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <div className="w-24 h-24 mx-auto bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Quiz Complete!</h2>
              
              <div className="space-y-2 py-4">
                <p className="text-6xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  {Math.round((Object.values(selectedAnswers).filter((ans, i) => ans === QUIZ_QUESTIONS[i].correctAnswer).length / QUIZ_QUESTIONS.length) * 100)}%
                </p>
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Final Score</p>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers({});
                  }}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => setView('board')}
                  className="px-8 py-4 bg-emerald-500/80 hover:bg-emerald-500 border border-emerald-400/50 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  Back to Board
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
