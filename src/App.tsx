import { useState } from 'react';
import { ViewType } from './types';
import ChoiceBoard from './components/ChoiceBoard';
import DiagramView from './components/DiagramView';
import ExamplesView from './components/ExamplesView';
import QuizView from './components/QuizView';
import GameView from './components/GameView';
import { Map } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { useFirebase } from './components/FirebaseProvider';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('board');
  const { user, signIn, logout } = useFirebase();
  
  const BackgroundElements = () => (
    <>
      <div className="fixed top-[-100px] left-[-100px] w-80 h-80 bg-orange-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-[-100px] right-[-100px] w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[160px] opacity-10 pointer-events-none" />
    </>
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans text-slate-200 transition-colors" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}>
      <BackgroundElements />

      <div className="relative z-10 w-full h-full flex flex-col min-h-screen">
        <header className="bg-slate-900/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 py-4">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div 
              className="flex flex-col cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setCurrentView('board')}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-none uppercase text-left group">
                Rock Cycle <span className="text-orange-400 group-hover:text-orange-300 transition-colors">Explorer</span>
              </h1>
              <p className="text-slate-400 font-medium mt-1 text-[10px] sm:text-xs tracking-widest uppercase truncate max-w-[200px] sm:max-w-none">
                Energy Flow & Materials • SC.7.13.5.a
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="hidden sm:flex items-center gap-3 bg-black/30 px-4 py-2 rounded-2xl border border-white/10">
                  <div className="text-right">
                    <p className="text-xs font-bold text-white leading-tight">{user.displayName}</p>
                    <button onClick={logout} className="text-[9px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-300">Logout</button>
                  </div>
                  {user.photoURL ? (
                    <img src={user.photoURL} className="w-8 h-8 rounded-full border border-white/20" alt="" />
                  ) : (
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border border-white/10">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={signIn}
                  className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-2xl border border-white/10 transition-all font-bold text-xs uppercase tracking-widest"
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              )}
              
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 shadow-lg shadow-orange-500/20">
                <Map className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-grow">
          <AnimatePresence mode="wait">
            {currentView === 'board' && (
              <motion.div key="board" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <ChoiceBoard setView={setCurrentView} />
              </motion.div>
            )}
            {currentView === 'diagram' && (
              <motion.div key="diagram" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
                <DiagramView setView={setCurrentView} />
              </motion.div>
            )}
            {currentView === 'examples' && (
              <motion.div key="examples" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
                <ExamplesView setView={setCurrentView} />
              </motion.div>
            )}
            {currentView === 'quiz' && (
              <motion.div key="quiz" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
                <QuizView setView={setCurrentView} />
              </motion.div>
            )}
            {currentView === 'game' && (
              <motion.div key="game" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
                <GameView setView={setCurrentView} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {currentView === 'board' && (
          <footer className="max-w-6xl w-full mx-auto px-6 pb-8">
            <div className="flex flex-col sm:flex-row justify-center items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl px-8 py-5 gap-4">
               <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center">
                 Interactive Geology Module • Free Exploration Mode
               </p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
