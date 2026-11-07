import React from 'react';
import { Terminal, Github, ExternalLink, Download, Layers, Globe, Cpu } from 'lucide-react';
import { ViewTab } from '../types';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenCommand: () => void;
  onInstallPwa: () => void;
  canInstallPwa: boolean;
  totalApps: number;
  liveApps: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenCommand,
  onInstallPwa,
  canInstallPwa,
  totalApps,
  liveApps,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#04060a]/85 backdrop-blur-xl border-b border-white/[0.08] px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Telemetry */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => onSelectTab('launchpad')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent border border-emerald-500/30 p-1 flex items-center justify-center overflow-hidden shadow-lg shadow-emerald-950/40">
              <img src="/favicon.svg" alt="STASH" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-white font-mono">
                  STASH
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{liveApps} LIVE</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden md:block">
                Micro-Frontend Launchpad & Architecture Hub
              </p>
            </div>
          </button>
        </div>

        {/* Desktop View Switcher Tabs */}
        <nav className="hidden md:flex items-center bg-zinc-900/80 p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => onSelectTab('launchpad')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'launchpad'
                ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Launchpad Deck ({totalApps})</span>
          </button>

          <button
            onClick={() => onSelectTab('portfolio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'portfolio'
                ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Master Portfolio MFE</span>
          </button>

          <button
            onClick={() => onSelectTab('matrix')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'matrix'
                ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture Radar</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-slate-300 border border-white/10 transition-colors shadow-sm"
            title="Search Systems (⌘K)"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-slate-400 border border-white/10 hidden sm:inline">
              ⌘K
            </kbd>
          </button>

          {/* PWA Install */}
          {canInstallPwa && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium transition-colors"
              title="Install Stash PWA on your device"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Install</span>
            </button>
          )}

          {/* GitHub link */}
          <a
            href="https://github.com/akdey"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-white border border-white/10 transition-colors"
            title="Amit Kumar Dey on GitHub"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">akdey</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
