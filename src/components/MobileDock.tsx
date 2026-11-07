import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Globe, Cpu, Search } from 'lucide-react';
import { ViewTab } from '../types';

interface MobileDockProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenCommand: () => void;
  totalApps: number;
}

export const MobileDock: React.FC<MobileDockProps> = ({
  currentTab,
  onSelectTab,
  onOpenCommand,
  totalApps,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none pb-safe">
      <div className="p-3 flex justify-center">
        <nav className="pointer-events-auto bg-[#070b12]/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 rounded-2xl px-2 py-1.5 flex items-center gap-1 max-w-sm w-full justify-around">
          {/* Systems Launchpad */}
          <button
            onClick={() => onSelectTab('launchpad')}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              currentTab === 'launchpad'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {currentTab === 'launchpad' && (
              <motion.div
                layoutId="activeDockTab"
                className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/30 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="relative flex items-center justify-center">
              <Layers className="w-4 h-4" />
              <span className="absolute -top-1 -right-2 text-[8px] font-mono px-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {totalApps}
              </span>
            </div>
            <span className="text-[10px] font-mono mt-0.5 relative z-10">Systems</span>
          </button>

          {/* Master Portfolio */}
          <button
            onClick={() => onSelectTab('portfolio')}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              currentTab === 'portfolio'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {currentTab === 'portfolio' && (
              <motion.div
                layoutId="activeDockTab"
                className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/30 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="relative flex items-center justify-center">
              <Globe className="w-4 h-4" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-1 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono mt-0.5 relative z-10">Portfolio</span>
          </button>

          {/* Architecture Matrix */}
          <button
            onClick={() => onSelectTab('matrix')}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              currentTab === 'matrix'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {currentTab === 'matrix' && (
              <motion.div
                layoutId="activeDockTab"
                className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/30 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Cpu className="w-4 h-4 relative z-10" />
            <span className="text-[10px] font-mono mt-0.5 relative z-10">Matrix</span>
          </button>

          {/* Instant Search */}
          <button
            onClick={onOpenCommand}
            className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-[10px] font-mono mt-0.5">Search</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
