import { ViewType } from '../types';
import { Network, Image as ImageIcon, CheckSquare, Gamepad2, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ChoiceBoardProps {
  setView: (view: ViewType) => void;
}

const choices = [
  {
    id: 'diagram' as ViewType,
    title: 'The Energy Cycle',
    description: 'Explore our interactive diagram showing how Sun and Earth energy drive the materials cycle.',
    icon: Network,
    iconWrapColor: 'bg-blue-500/20 text-blue-400'
  },
  {
    id: 'game' as ViewType,
    title: 'Simulator Lab',
    description: 'Use the powers of Solar Energy and Internal Earth Heat to transform rocks yourself.',
    icon: Gamepad2,
    iconWrapColor: 'bg-orange-500/20 text-orange-400'
  },
  {
    id: 'examples' as ViewType,
    title: 'Global Examples',
    description: 'See gorgeous photos of rocks from around the globe and identify the forces that shaped them.',
    icon: ImageIcon,
    iconWrapColor: 'bg-purple-500/20 text-purple-400'
  },
  {
    id: 'quiz' as ViewType,
    title: 'Knowledge Check',
    description: 'Think you understand how energy flows through Earth? Test what you have learned.',
    icon: CheckSquare,
    iconWrapColor: 'bg-emerald-500/20 text-emerald-400'
  }
];

export default function ChoiceBoard({ setView }: ChoiceBoardProps) {
  return (
    <div className="flex flex-col h-full gap-8 max-w-4xl mx-auto py-8">
      <div className="text-center space-y-4 mb-4">
        <h2 className="text-3xl font-black text-white tracking-tight uppercase">Module Selection</h2>
        <p className="text-slate-300 font-medium">Explore how the flow of energy shapes and cycles Earth's materials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {choices.map((choice, i) => {
          return (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={choice.id}
              onClick={() => setView(choice.id)}
              className={cn(
                "group relative flex flex-col justify-between text-left p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl transition-all duration-300 hover:bg-white/15 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-2 shadow-xl overflow-hidden"
              )}
            >
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-[30px] group-hover:bg-white/10 transition-colors pointer-events-none" />
              <div className="flex justify-between items-start mb-6">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner", choice.iconWrapColor)}>
                  <choice.icon className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div className="px-4 py-2 text-xs font-bold rounded-full uppercase border bg-white/5 text-slate-300 border-white/10 group-hover:text-white group-hover:border-white/30 transition-colors flex items-center gap-1.5">
                  <Play className="w-3 h-3" /> Start
                </div>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-white transition-colors">{choice.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed block group-hover:text-slate-300 transition-colors">{choice.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
