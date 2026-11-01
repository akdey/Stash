import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Github, ExternalLink, Download, Layers, Grid } from 'lucide-react';

interface HeaderProps {
  viewMode: 'grid' | 'topology';
  setViewMode: (mode: 'grid' | 'topology') => void;
  onOpenCommand: () => void;
  onInstallPwa: () => void;
  canInstallPwa: boolean;
  hostedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onOpenCommand,
  onInstallPwa,
  canInstallPwa,
  hostedCount,
  totalCount
}) => {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/10 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-cyan-500 to-sky-500 p-0.5 shadow-lg shadow-brand-500/20"
          >
            <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-white text-sm">
              AK
            </div>
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white">AKDEY // Central Command</span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                PWA READY
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Micro-Frontend & System Architecture Hub</p>
          </div>
        </div>

        {/* Center: View Switcher */}
        <div className="hidden md:flex items-center bg-dark-900 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'grid'
                ? 'bg-dark-750 text-white font-semibold shadow-sm border border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-brand-400" />
            <span>Matrix Grid</span>
          </button>
          <button
            onClick={() => setViewMode('topology')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'topology'
                ? 'bg-dark-750 text-white font-semibold shadow-sm border border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>System Topology</span>
          </button>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5">
          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-xs font-mono text-slate-300 border border-white/10 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-brand-400" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-dark-750 text-slate-400 border border-white/10">⌘K</kbd>
          </button>

          {/* PWA Install Button */}
          {canInstallPwa && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-mono font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Install App</span>
            </motion.button>
          )}

          {/* GitHub Profile */}
          <a
            href="https://github.com/akdey"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-xs font-mono text-white border border-white/10 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden lg:inline">akdey</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

      </div>
    </header>
  );
};

