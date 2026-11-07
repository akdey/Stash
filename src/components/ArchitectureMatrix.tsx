import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, Github, Terminal, CheckCircle2, Search } from 'lucide-react';
import { AppItem, ArchitectureTier } from '../types';

interface ArchitectureMatrixProps {
  apps: AppItem[];
  onInspect: (app: AppItem) => void;
}

const TIERS: ArchitectureTier[] = [
  'Full-Stack Agent',
  'Frontend PWA',
  'VS Code Extension',
  'CLI / Engine',
  'MCP / Gateway',
];

export const ArchitectureMatrix: React.FC<ArchitectureMatrixProps> = ({ apps, onInspect }) => {
  const [selectedTier, setSelectedTier] = useState<ArchitectureTier | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredApps = apps.filter((app) => {
    if (selectedTier !== 'all' && app.architectureTier !== selectedTier) return false;
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      app.name.toLowerCase().includes(q) ||
      app.architectureTier.toLowerCase().includes(q) ||
      app.keyMetric.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 md:pb-16 space-y-8">
      {/* Matrix Header */}
      <div className="rounded-2xl sm:rounded-3xl bg-zinc-900/80 border border-white/[0.08] p-5 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>ARCHITECTURE RADAR & TOPOLOGY</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          System Capability & Protocol Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          STASH enforces a strict <strong className="text-white">Direct-Routing Protocol</strong>: Cloud-deployed microfrontends open in live production containers with responsive in-situ inspection. Local-first forensic agents and developer extensions route directly to verified GitHub repositories.
        </p>

        {/* Protocol Rules Visualizer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-black/50 border border-emerald-500/30 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>PROTOCOL A: LIVE PRODUCTION EDGE</span>
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Hosted on Vercel Global Edge or HuggingFace Docker Spaces. Supports responsive multi-device in-situ live container inspection and PWA installation.
            </p>
          </div>

          <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>PROTOCOL B: VERIFIED REPOSITORY AUDIT</span>
            </div>
            <p className="text-slate-400 font-sans text-xs">
              For security-sensitive forensic scrapers, air-gapped encryption engines, and VS Code extensions. Code is verified and audited directly on GitHub.
            </p>
          </div>
        </div>
      </div>

      {/* Tier Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tier Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex-shrink-0 ${
              selectedTier === 'all'
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-zinc-900 text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            All Tiers ({apps.length})
          </button>
          {TIERS.map((tier) => {
            const count = apps.filter((a) => a.architectureTier === tier).length;
            return (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex-shrink-0 ${
                  selectedTier === tier
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'bg-zinc-900 text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                <span>{tier}</span>
                <span className="ml-1.5 opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Filter Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search matrix..."
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
        </div>
      </div>

      {/* Datasheet Table / Mobile Card Grid */}
      <div className="rounded-2xl bg-zinc-900/60 border border-white/[0.08] overflow-hidden shadow-xl">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-zinc-950/80 border-b border-white/[0.08] text-[11px] font-mono text-slate-400 font-semibold">
          <div className="col-span-4">APPLICATION & SPEC</div>
          <div className="col-span-2">ARCHITECTURE TIER</div>
          <div className="col-span-2">OPERATIONAL STATE</div>
          <div className="col-span-2">KEY ALPHA METRIC</div>
          <div className="col-span-2 text-right">DIRECT ROUTE</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/[0.06]">
          {filteredApps.map((app) => {
            const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;

            return (
              <div
                key={app.id}
                className="p-4 sm:px-6 hover:bg-zinc-900/90 transition-colors flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 items-start lg:items-center"
              >
                {/* Application Name & Tagline */}
                <div className="col-span-4 flex items-center gap-3 min-w-0 w-full">
                  <span className="text-2xl p-1.5 rounded-lg bg-zinc-800/80 border border-white/10 flex-shrink-0">
                    {app.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white truncate">{app.name}</span>
                      {app.featured && (
                        <span className="text-[9px] font-mono px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          STAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-slate-400 truncate">{app.tagline}</p>
                  </div>
                </div>

                {/* Architecture Tier */}
                <div className="col-span-2 flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span className="lg:hidden text-slate-400">Tier:</span>
                  <span>{app.architectureTier}</span>
                </div>

                {/* Operational State */}
                <div className="col-span-2 flex items-center gap-2">
                  <span className="lg:hidden text-xs font-mono text-slate-400">Status:</span>
                  {app.isHosted ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Production</span>
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-slate-400">
                      Verified Repository
                    </span>
                  )}
                </div>

                {/* Key Metric */}
                <div className="col-span-2 text-xs font-mono text-slate-300">
                  <span className="lg:hidden text-slate-400">Alpha: </span>
                  <span className="text-emerald-400 font-medium">{app.keyMetric}</span>
                </div>

                {/* Action Links */}
                <div className="col-span-2 w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    {app.isHosted && (
                      <button
                        onClick={() => onInspect(app)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-400 text-xs font-mono border border-white/10 transition-colors flex items-center gap-1"
                      >
                        <Terminal className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    )}

                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-slate-400 hover:text-white border border-white/10 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                      app.isHosted
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10'
                    }`}
                  >
                    <span>{app.isHosted ? 'Launch' : 'Code'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
