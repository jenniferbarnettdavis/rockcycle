import { ArrowLeft, Zap } from 'lucide-react';
import { ViewType } from '../types';
import { REAL_WORLD_EXAMPLES } from '../data/rockData';
import { motion } from 'motion/react';

interface ExamplesViewProps {
  setView: (view: ViewType) => void;
}

export default function ExamplesView({ setView }: ExamplesViewProps) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <button 
        onClick={() => setView('board')}
        className="flex items-center gap-2 text-slate-300 hover:text-white font-bold tracking-widest uppercase text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Board
      </button>

      <div className="space-y-4 mb-8">
        <h2 className="text-4xl font-black text-white uppercase tracking-tight">World Examples</h2>
        <p className="text-slate-300 font-medium tracking-wide text-lg">See how massive flows of energy shape the rocks found across our globe over millions of years.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REAL_WORLD_EXAMPLES.map((rock, index) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={rock.id} 
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden flex flex-col hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 shadow-xl group"
          >
            <div className="aspect-[4/3] bg-slate-900/40 relative overflow-hidden">
              <img 
                src={rock.imageUrl} 
                alt={rock.name} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                crossOrigin="anonymous" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-1.5 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg inline-block border
                  ${rock.type === 'Igneous' ? 'bg-red-500/20 text-red-300 border-red-400/30' : 
                    rock.type === 'Sedimentary' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' : 'bg-purple-500/20 text-purple-300 border-purple-400/30'}`}
                >
                  {rock.type}
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-2 text-white">{rock.name}</h3>
              <p className="text-slate-300 leading-relaxed flex-grow text-sm mb-4">{rock.description}</p>
              
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 mt-auto">
                <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 mb-1 flex items-center gap-1.5"><Zap className="w-3 h-3" /> Energy Flow Source</p>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">{rock.energySource}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
