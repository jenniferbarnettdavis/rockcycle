import { useState } from 'react';
import { ArrowLeft, Flame, Wind, Droplets, Sun, Activity } from 'lucide-react';
import { ViewType } from '../types';
import { ROCK_STATE_IMAGES } from '../data/rockData';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface GameViewProps {
  setView: (view: ViewType) => void;
}

type RockState = 'Sediment' | 'Sedimentary Rock' | 'Metamorphic Rock' | 'Magma' | 'Igneous Rock';

interface Action {
  id: string;
  source: string;
  label: string;
  icon: any;
  color: string;
  effect: (current: RockState) => RockState | 'invalid';
}

const ACTIONS: Action[] = [
  {
    id: 'heat_pressure',
    source: "Earth's Internal Heat & Gravity",
    label: 'Bake & Squeeze',
    icon: Activity,
    color: 'text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-400/30',
    effect: (current) => (current === 'Sedimentary Rock' || current === 'Igneous Rock') ? 'Metamorphic Rock' : 'invalid'
  },
  {
    id: 'melt',
    source: "Earth's Internal Heat",
    label: 'Melt to Magma',
    icon: Flame,
    color: 'text-orange-400 group-hover:bg-orange-500/20 group-hover:border-orange-400/30',
    effect: (current) => (current === 'Metamorphic Rock' || current === 'Igneous Rock' || current === 'Sedimentary Rock') ? 'Magma' : 'invalid'
  },
  {
    id: 'cool',
    source: "Thermal Energy Loss",
    label: 'Cool & Crystallize',
    icon: Droplets,
    color: 'text-red-400 group-hover:bg-red-500/20 group-hover:border-red-400/30',
    effect: (current) => current === 'Magma' ? 'Igneous Rock' : 'invalid'
  },
  {
    id: 'weather',
    source: "Solar Energy & Gravity",
    label: 'Weather & Erode',
    icon: Sun,
    color: 'text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-400/30',
    effect: (current) => (current === 'Igneous Rock' || current === 'Metamorphic Rock' || current === 'Sedimentary Rock') ? 'Sediment' : 'invalid'
  },
  {
    id: 'compact',
    source: "Gravity (Pressure)",
    label: 'Compact & Cement',
    icon: Wind,
    color: 'text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-400/30',
    effect: (current) => current === 'Sediment' ? 'Sedimentary Rock' : 'invalid'
  }
];

export default function GameView({ setView }: GameViewProps) {
  const [level, setLevel] = useState(1);
  const [currentRock, setCurrentRock] = useState<RockState>('Sedimentary Rock');
  const [targetRock, setTargetRock] = useState<RockState>('Magma');
  const [feedback, setFeedback] = useState<string | null>(null);

  const startLevel2 = () => {
    setLevel(2);
    setCurrentRock('Igneous Rock');
    setTargetRock('Sedimentary Rock');
    setFeedback(null);
  };

  const startSandbox = () => {
    setLevel(0);
    setFeedback(null);
  };

  const handleAction = (action: Action) => {
    const result = action.effect(currentRock);
    if (result === 'invalid') {
      setFeedback("That energy transfer didn't affect this material! Try another source.");
    } else {
      setCurrentRock(result);
      if (level !== 0 && result === targetRock) {
        setFeedback("Success! You've used the right energy forms to reach your goal!");
      } else {
        setFeedback(`The energy transformed it into ${result}!`);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <button 
        onClick={() => setView('board')}
        className="flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors uppercase tracking-widest text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Board
      </button>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-slate-900/40 p-6 sm:p-8 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Energy Simulator Lab</h2>
            <p className="text-orange-400 font-bold mt-1 uppercase tracking-widest text-xs">
              {level === 0 ? "Sandbox Mode - Explore Freely" : `Level ${level} - Transform the rock!`}
            </p>
          </div>
          {level !== 0 && (
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center shadow-inner">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Form</span>
              <span className="text-xl font-bold text-white leading-none">{targetRock}</span>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center justify-center py-8">
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentRock}
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className={cn(
                  "relative w-56 h-56 rounded-[3rem] shadow-[0_0_40px_rgba(0,0,0,0.3)] flex items-center justify-center mb-8 border-2 transition-all duration-500 backdrop-blur-xl overflow-hidden group",
                  currentRock === 'Sedimentary Rock' ? 'bg-blue-500/30 border-blue-400/50 text-blue-100 shadow-[0_0_30px_rgba(59,130,246,0.3)]' :
                  currentRock === 'Metamorphic Rock' ? 'bg-purple-500/30 border-purple-400/50 text-purple-100 shadow-[0_0_30px_rgba(168,85,247,0.3)]' :
                  currentRock === 'Igneous Rock' ? 'bg-red-500/30 border-red-400/50 text-red-100 shadow-[0_0_30px_rgba(239,68,68,0.3)]' :
                  currentRock === 'Magma' ? 'bg-orange-500/40 border-orange-400 text-orange-100 shadow-[0_0_40px_rgba(249,115,22,0.4)]' :
                  currentRock === 'Sediment' ? 'bg-amber-500/30 border-amber-400/50 text-amber-100 border-dashed shadow-[0_0_30px_rgba(245,158,11,0.3)]' :
                  'bg-white/10 border-white/20'
                )}
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={ROCK_STATE_IMAGES[currentRock]}
                    alt={currentRock}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <span className="relative z-10 text-2xl font-black text-center px-4 leading-tight uppercase tracking-tighter drop-shadow-md">
                  {currentRock}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Feedback Message */}
            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "text-center mb-8 px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase border shadow-lg backdrop-blur-md",
                    feedback.includes('Success') ? "bg-emerald-500/20 text-emerald-400 border-emerald-400/30" :
                    feedback.includes('transformed') ? "bg-blue-500/20 text-blue-400 border-blue-400/30" :
                    "bg-rose-500/20 text-rose-400 border-rose-400/30"
                  )}
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>

            {feedback?.includes('Success') && level === 1 ? (
              <button onClick={startLevel2} className="px-8 py-3 bg-purple-500/80 hover:bg-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all uppercase tracking-widest text-sm border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                Start Level 2
              </button>
            ) : feedback?.includes('Success') && level === 2 ? (
              <button onClick={startSandbox} className="px-8 py-3 bg-amber-500/80 hover:bg-amber-500 text-white font-bold rounded-xl hover:scale-105 transition-all uppercase tracking-widest text-sm border border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                Enter Sandbox Mode
              </button>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full border-t border-white/10 pt-8 mt-4">
                {ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action)}
                    className="group flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 transition-all text-slate-300 active:translate-y-[2px] active:border-white/10 backdrop-blur-md"
                  >
                    <div className={cn("bg-white/10 p-3 rounded-2xl shadow-sm border border-white/5 transition-colors", action.color)}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <span className={cn("text-[9px] font-black uppercase tracking-widest block mb-1 opacity-70 group-hover:opacity-100 transition-opacity", action.color)}>
                        {action.source}
                      </span>
                      <span className="text-sm font-bold leading-tight text-white group-hover:text-white transition-colors">
                        {action.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
