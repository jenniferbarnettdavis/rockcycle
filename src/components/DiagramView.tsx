import { useState } from 'react';
import { ArrowLeft, Info, Sun, Flame, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { ViewType } from '../types';
import { ROCK_STATE_IMAGES } from '../data/rockData';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface DiagramViewProps {
  setView: (view: ViewType) => void;
}

type DiagramNode = 'Igneous Rock' | 'Sedimentary Rock' | 'Metamorphic Rock' | 'Magma' | 'Sediment';

interface InfoData {
  title: string;
  energySource: string;
  description: string;
  color: string;
  reviewHint: string;
}

const INFO_MAP: Record<DiagramNode, InfoData> = {
  'Igneous Rock': {
    title: 'Igneous Rock',
    energySource: "Earth's Internal Heat",
    description: 'Formed from the cooling and solidification of molten rock (magma). The internal heat of the Earth initially melts the rock, and then it cools quickly or slowly depending on where it sits.',
    color: 'bg-red-500/10 border-red-400/30 text-red-100',
    reviewHint: "Click the phase formed from the cooling and solidification of molten rock."
  },
  'Sedimentary Rock': {
    title: 'Sedimentary Rock',
    energySource: "Solar Energy & Gravity",
    description: 'Solar energy drives rain and wind to weather rocks into sediments. Gravity pulls water and sediments down to settle in layers, which eventually compact into rock.',
    color: 'bg-blue-500/10 border-blue-400/30 text-blue-100',
    reviewHint: "Click the phase formed when sediments settle in layers and compact over millions of years."
  },
  'Metamorphic Rock': {
    title: 'Metamorphic Rock',
    energySource: "Earth's Internal Heat & Tectonic Pressure",
    description: 'Formed by deep Earth forces. Heat from the mantle and immense pressure from tectonic plates squish and bake rocks into completely new forms without melting them.',
    color: 'bg-purple-500/10 border-purple-400/30 text-purple-100',
    reviewHint: "Click the phase formed when rocks are baked and squeezed into new forms without fully melting."
  },
  'Magma': {
    title: 'Magma',
    energySource: "Earth's Internal Heat",
    description: 'Extreme thermal energy from Earth\'s radioactive core melts any rock that gets pushed deep enough down into the mantle via tectonic subduction.',
    color: 'bg-orange-500/10 border-orange-400/30 text-orange-100',
    reviewHint: "Click the phase created when extreme thermal energy melts rocks deep underground."
  },
  'Sediment': {
    title: 'Sediment',
    energySource: "Solar Energy",
    description: 'The Sun heats the Earth unevenly, creating wind. It also powers the water cycle. Together, they break massive mountains into tiny grains of sand and clay.',
    color: 'bg-amber-500/10 border-amber-400/30 text-amber-100',
    reviewHint: "Click the phase consisting of tiny rock grains broken apart by wind and water weathering."
  }
};

export default function DiagramView({ setView }: DiagramViewProps) {
  const [activeNode, setActiveNode] = useState<DiagramNode | null>(null);
  const [mode, setMode] = useState<'explore' | 'review'>('explore');
  const [reviewIndex, setReviewIndex] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const reviewSequence: DiagramNode[] = [
    'Magma', 'Igneous Rock', 'Sediment', 'Sedimentary Rock', 'Metamorphic Rock'
  ];

  const handleNodeClick = (node: DiagramNode) => {
    if (mode === 'explore') {
      setActiveNode(node);
    } else if (mode === 'review' && feedback !== 'correct') {
      setActiveNode(node);
      if (node === reviewSequence[reviewIndex]) {
        setFeedback('correct');
        setTimeout(() => {
          setFeedback('idle');
          setActiveNode(null);
          setReviewIndex(prev => prev + 1);
        }, 1500);
      } else {
        setFeedback('wrong');
        setTimeout(() => {
          setFeedback('idle');
          setActiveNode(null);
        }, 1200);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setView('board')}
          className="flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors uppercase text-sm tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Board
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-8 border-b border-white/10 bg-slate-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">The Materials & Energy Cycle</h2>
            <p className="text-slate-300 font-medium">
              {mode === 'explore' ? 'Click on each stage to reveal which energy source drives its formation.' : 'Find the material matching the description to complete the review.'}
            </p>
          </div>
          <div className="flex bg-black/40 p-1.5 rounded-full border border-white/10 w-fit backdrop-blur-md shrink-0">
            <button 
              onClick={() => { setMode('explore'); setActiveNode(null); }} 
              className={cn("px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all tracking-widest", mode === 'explore' ? 'bg-white/20 text-white shadow-md' : 'text-slate-400 hover:text-slate-200')}
            >
              Explore Mode
            </button>
            <button 
              onClick={() => { setMode('review'); setReviewIndex(0); setFeedback('idle'); setActiveNode(null); }} 
              className={cn("px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all tracking-widest", mode === 'review' ? 'bg-emerald-500/30 text-emerald-300 shadow-md border border-emerald-400/30' : 'text-slate-400 hover:text-slate-200')}
            >
              Review Mode
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 min-h-[500px]">
          {/* Visual Diagram Area */}
          <div className="md:col-span-3 p-8 py-16 relative flex flex-col items-center justify-center bg-white/5 border-r border-white/10 gap-12">
            
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row gap-8 w-full justify-around items-center relative">
              
              {/* Solar Energy Callout */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 flex flex-col items-center text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]">
                 <Sun className="w-10 h-10 mb-2 animate-[spin_20s_linear_infinite]" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-center">Solar Energy<br/>(Drives surface weathering)</span>
              </div>

              <NodeButton 
                node="Igneous Rock" 
                active={activeNode === 'Igneous Rock'} 
                onClick={() => handleNodeClick('Igneous Rock')} 
                styleClass="bg-red-500/20 text-red-200 border-red-400/50" 
                activeClass="ring-red-400"
              />
              <div className="text-slate-400 text-[10px] font-bold text-center uppercase tracking-widest">
                Weathering & Erosion →<br/>← Melting
              </div>
              <NodeButton 
                node="Sedimentary Rock" 
                active={activeNode === 'Sedimentary Rock'} 
                onClick={() => handleNodeClick('Sedimentary Rock')} 
                styleClass="bg-blue-500/20 text-blue-200 border-blue-400/50"
                activeClass="ring-blue-400" 
              />
            </div>

            {/* Middle connecting text */}
            <div className="w-full flex justify-center py-4">
              <NodeButton 
                node="Sediment" 
                active={activeNode === 'Sediment'} 
                onClick={() => handleNodeClick('Sediment')} 
                styleClass="bg-amber-500/20 text-amber-200 border-amber-400/50" 
                activeClass="ring-amber-400"
              />
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row gap-8 w-full justify-around items-center relative z-10">
              <NodeButton 
                node="Magma" 
                active={activeNode === 'Magma'} 
                onClick={() => handleNodeClick('Magma')} 
                styleClass="bg-orange-500/20 text-orange-200 border-orange-400/50" 
                activeClass="ring-orange-400"
              />
              <div className="text-slate-400 text-[10px] font-bold text-center uppercase tracking-widest">
                Cooling ←<br/>→ Melting
              </div>
              <NodeButton 
                node="Metamorphic Rock" 
                active={activeNode === 'Metamorphic Rock'} 
                onClick={() => handleNodeClick('Metamorphic Rock')} 
                styleClass="bg-purple-500/20 text-purple-200 border-purple-400/50" 
                activeClass="ring-purple-400"
              />

              {/* Internal Heat Callout */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 flex flex-col items-center text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                 <span className="text-[10px] font-black uppercase tracking-widest text-center">Earth's Internal Heat<br/>(Drives melting & pressure)</span>
                 <Flame className="w-10 h-10 mt-2" />
              </div>
            </div>

          </div>

          {/* Info Panel */}
          <div className="md:col-span-2 p-8 bg-slate-900/40 flex flex-col items-center justify-center min-h-[400px]">
            {mode === 'explore' ? (
              <AnimatePresence mode="wait">
                {activeNode ? (
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={cn("w-full h-full p-8 rounded-3xl border flex flex-col items-center text-center relative overflow-hidden group", INFO_MAP[activeNode].color)}
                  >
                    <div className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-30">
                      <img 
                        src={ROCK_STATE_IMAGES[activeNode]} 
                        alt={activeNode} 
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="mb-6 border-2 border-white/20 w-28 h-28 rounded-full overflow-hidden shadow-2xl flex-shrink-0">
                        <img 
                          src={ROCK_STATE_IMAGES[activeNode]} 
                          alt={activeNode} 
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter text-white">{INFO_MAP[activeNode].title}</h3>
                      <div className="mb-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Driven By: </span>
                        <span className="text-xs font-bold text-white">{INFO_MAP[activeNode].energySource}</span>
                      </div>
                      <p className="text-sm leading-relaxed font-medium opacity-90">{INFO_MAP[activeNode].description}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-slate-500 flex flex-col items-center p-8"
                  >
                    <Info className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg font-bold tracking-tight uppercase">Select a component<br/>from the diagram.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="wait">
                {reviewIndex < reviewSequence.length ? (
                  <motion.div
                    key={reviewIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full h-full p-8 rounded-3xl border border-emerald-400/20 bg-emerald-900/10 flex flex-col items-center justify-center text-center shadow-inner"
                  >
                    <span className="text-emerald-400 font-bold tracking-widest text-[10px] uppercase mb-6 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-400/20">
                      Knowledge Check {reviewIndex + 1} of {reviewSequence.length}
                    </span>
                    <h3 className="text-2xl font-medium leading-relaxed text-white mb-12 max-w-sm">
                      "{INFO_MAP[reviewSequence[reviewIndex]].reviewHint}"
                    </h3>
                    
                    <div className="h-16 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {feedback === 'correct' && (
                          <motion.div key="correct" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="text-emerald-400 font-bold text-2xl flex items-center gap-2 bg-emerald-500/20 px-6 py-3 rounded-full border border-emerald-400/30">
                            <CheckCircle2 className="w-8 h-8" /> Correct!
                          </motion.div>
                        )}
                        {feedback === 'wrong' && (
                          <motion.div key="wrong" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="text-rose-400 font-bold text-xl flex items-center gap-2 bg-rose-500/20 px-6 py-3 rounded-full border border-rose-400/30">
                            <XCircle className="w-6 h-6" /> Try Again
                          </motion.div>
                        )}
                        {feedback === 'idle' && (
                          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-400 font-semibold uppercase tracking-widest text-sm animate-pulse">
                            Click the correct node in the cycle...
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full p-8 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                  >
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-400/40 mb-6 text-emerald-400">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-white">Review Complete!</h3>
                    <p className="text-slate-300 font-medium mb-10">You successfully proved you understand how each phase is formed.</p>
                    <button 
                      onClick={() => { setMode('explore'); setActiveNode(null); }}
                      className="px-8 py-4 bg-emerald-500/80 hover:bg-emerald-500 border border-emerald-400/50 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Restart Exploration
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NodeButton({ node, active, onClick, styleClass, activeClass }: { node: string, active: boolean, onClick: () => void, styleClass: string, activeClass: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-full aspect-square w-32 flex flex-col items-center justify-center p-4 text-center font-bold text-sm sm:text-base transition-all duration-300 border-2 backdrop-blur-md shadow-xl",
        active ? cn("ring-4 ring-offset-4 ring-offset-transparent scale-105 z-10", activeClass, styleClass) : cn("hover:scale-105 hover:bg-white/20", styleClass, "bg-white/5 border-white/10 text-slate-300 z-0")
      )}
    >
      {node}
    </button>
  );
}
