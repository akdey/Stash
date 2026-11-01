import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Github, ExternalLink, Download, Layers, Grid, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  viewMode: 'grid' | 'topology';
  setViewMode: (mode: 'grid' | 'topology') => void;
  onOpenCommand: () => void;
  onInstallPwa: () => void;
  canInstallPwa: boolean;
  hostedCount: number;
  totalCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onOpenCommand,
  onInstallPwa,
  canInstallPwa,
  hostedCount,
  totalCount,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-dark-850 border border-white/10 flex items-center justify-center font-mono font-bold text-brand-400 text-sm shadow-sm">
            AK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white">AKDEY // Central Command</span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Micro-Frontend & System Architecture Hub</p>
          </div>
        </div>

        {/* Center: View Switcher */}
        <div className="hidden md:flex items-center bg-dark-900 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-dark-750 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-brand-400" />
            <span>Matrix Grid ({totalCount})</span>
          </button>
          <button
            onClick={() => setViewMode('topology')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'topology'
                ? 'bg-dark-750 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Topology Graph</span>
          </button>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2">
          {/* Subtle Audio Feedback Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl text-xs font-mono border border-white/10 transition-colors ${
              soundEnabled ? 'bg-dark-800 text-brand-400' : 'bg-dark-900 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? "Mute Mechanical Audio" : "Enable Tactile Audio Feedback"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900 hover:bg-dark-850 text-xs font-mono text-slate-300 border border-white/10 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-brand-400" />
            <span>Command</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-dark-800 text-slate-400 border border-white/10">⌘K</kbd>
          </button>

          {/* PWA Install Button */}
          {canInstallPwa && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-mono font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Install PWA</span>
            </button>
          )}

          {/* GitHub Profile */}
          <a
            href="https://github.com/akdey"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900 hover:bg-dark-850 text-xs font-mono text-white border border-white/10 transition-colors"
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
