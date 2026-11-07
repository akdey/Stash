import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Terminal, Search, X, Globe, Sparkles, Filter } from 'lucide-react';
import { AppItem, Domain } from '../types';

interface LaunchpadDeckProps {
  apps: AppItem[];
  onInspect: (app: AppItem) => void;
  onOpenPortfolio: () => void;
}

const DOMAIN_FILTERS: { id: Domain | 'all' | 'hosted'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Systems', icon: '⚡' },
  { id: 'hosted', label: 'Live Hosted', icon: '🟢' },
  { id: 'agents', label: 'AI & Agents', icon: '🤖' },
  { id: 'finance', label: 'FinTech Alpha', icon: '📈' },
  { id: 'enterprise', label: 'Enterprise', icon: '🏢' },
  { id: 'personal', label: 'Culture & Labs', icon: '🎨' },
];

export const LaunchpadDeck: React.FC<LaunchpadDeckProps> = ({
  apps,
  onInspect,
  onOpenPortfolio,
}) => {
  const [activeFilter, setActiveFilter] = useState<Domain | 'all' | 'hosted'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Featured marquee apps
  const featuredApps = apps.filter((app) => app.featured);

  // Filtered apps
  const filteredApps = apps.filter((app) => {
    // Category / Filter check
    if (activeFilter === 'hosted' && !app.isHosted) return false;
    if (activeFilter !== 'all' && activeFilter !== 'hosted' && app.domain !== activeFilter) {
      return false;
    }

    // Search query check
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.architectureTier.toLowerCase().includes(q) ||
      app.badges.some((b) => b.toLowerCase().includes(q))
    );
  });

  const liveHostedCount = apps.filter((a) => a.isHosted).length;
  const agentCount = apps.filter((a) => a.domain === 'agents').length;
  const financeCount = apps.filter((a) => a.domain === 'finance').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 md:pb-16 space-y-8 sm:space-y-12">
      {/* Hero & Ecosystem Banner */}
      <section className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-zinc-900/90 via-[#070d18]/90 to-zinc-950/90 border border-white/[0.08] p-5 sm:p-8 lg:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FLIGHT DECK ONLINE</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                // Direct-Routing Protocol v2.5
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ecosystem Launchpad & Architecture Hub
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-sans">
              Central command plane orchestrating <strong className="text-white">20 software systems</strong>, autonomous agent councils, institutional trading engines, and edge PWAs designed & engineered by <strong className="text-emerald-400">Amit Kumar Dey</strong>.
            </p>

            {/* Quick Metrics Pills */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs font-mono">
              <div className="bg-black/40 border border-white/[0.06] rounded-xl p-2.5 flex flex-col">
                <span className="text-slate-400 text-[10px]">TOTAL SYSTEMS</span>
                <span className="text-lg font-bold text-white mt-0.5">{apps.length} Systems</span>
              </div>
              <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-2.5 flex flex-col">
                <span className="text-emerald-400/80 text-[10px]">LIVE PRODUCTION</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5">{liveHostedCount} Hosted</span>
              </div>
              <div className="bg-black/40 border border-cyan-500/20 rounded-xl p-2.5 flex flex-col">
                <span className="text-cyan-400/80 text-[10px]">AI AGENT SWARMS</span>
                <span className="text-lg font-bold text-cyan-400 mt-0.5">{agentCount} Swarms</span>
              </div>
              <div className="bg-black/40 border border-amber-500/20 rounded-xl p-2.5 flex flex-col">
                <span className="text-amber-400/80 text-[10px]">QUANT FINTECH</span>
                <span className="text-lg font-bold text-amber-400 mt-0.5">{financeCount} Engines</span>
              </div>
            </div>
          </div>

          {/* Master Portfolio Spotlight Card */}
          <div className="lg:max-w-xs w-full bg-black/60 rounded-2xl border border-emerald-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-xl backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  CORE MICROFRONTEND
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Master Portfolio MFE
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Full-fidelity interactive terminal & showcase running as an integrated edge microfrontend container.
              </p>
            </div>

            <button
              onClick={onOpenPortfolio}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Launch Live MFE Stage</span>
            </button>
          </div>
        </div>
      </section>

      {/* Flagship Spotlight Carousel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP ARCHITECTURES</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              Spotlight Systems
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Scroll or swipe horizontally on mobile →
          </span>
        </div>

        {/* Mobile-Friendly Horizontal Swipe / Desktop Responsive Grid */}
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scroll-smooth custom-scrollbar lg:grid lg:grid-cols-3 lg:overflow-visible">
          {featuredApps.map((app) => {
            const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;

            return (
              <div
                key={app.id}
                className="flex-shrink-0 w-[290px] sm:w-[320px] lg:w-auto snap-center rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-white/[0.08] hover:border-emerald-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
                      {app.icon}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {app.isHosted ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>LIVE</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-zinc-800 border border-white/10 text-[10px] font-mono text-slate-400">
                          OPEN SOURCE
                        </span>
                      )}

                      <span className="text-[10px] font-mono text-cyan-400/90">
                        {app.architectureTier}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5 line-clamp-1">
                    {app.tagline}
                  </p>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                    {app.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">KEY ALPHA:</span>
                    <span className="text-emerald-400 font-medium truncate max-w-[160px]">
                      {app.keyMetric}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-4 pt-3 flex items-center gap-2">
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all ${
                      app.isHosted
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10'
                    }`}
                  >
                    <span>{app.isHosted ? 'Launch Host' : 'View Repo'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {app.isHosted && (
                    <button
                      onClick={() => onInspect(app)}
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-white/10 transition-colors"
                      title="Inspect live in drawer"
                    >
                      <Terminal className="w-4 h-4" />
                    </button>
                  )}

                  <a
                    href={app.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Directory: Filter, Search & Full System Cards */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Filter className="w-3.5 h-3.5" />
              <span>SYSTEMS INVENTORY</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              Complete Systems Directory
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tag, or tech..."
              className="w-full pl-9 pr-8 py-2 bg-zinc-900/90 border border-white/10 rounded-xl text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills with Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {DOMAIN_FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            let count = apps.length;
            if (f.id === 'hosted') count = apps.filter((a) => a.isHosted).length;
            else if (f.id !== 'all') count = apps.filter((a) => a.domain === f.id).length;

            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-zinc-900/80 text-slate-300 hover:text-white hover:bg-zinc-800 border border-white/[0.06]'
                }`}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-black/20 text-black' : 'bg-black/40 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Systems Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredApps.map((app, index) => {
            const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;

            return (
              <motion.article
                key={app.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index % 6) * 0.04 }}
                className="rounded-2xl bg-zinc-900/60 border border-white/[0.08] hover:border-white/20 p-5 flex flex-col justify-between transition-all duration-200 hover:bg-zinc-900/90 hover:shadow-xl group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-zinc-800/80 border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform">
                        {app.icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white tracking-tight truncate group-hover:text-emerald-300 transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-xs font-mono text-cyan-400/90 truncate">
                          {app.tagline}
                        </p>
                      </div>
                    </div>

                    {app.isHosted ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-zinc-800/80 border border-white/10 text-[10px] font-mono text-slate-400 flex-shrink-0">
                        REPO
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                    {app.description}
                  </p>

                  {/* Tech stack badge pills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {app.badges.slice(0, 3).map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/40 text-slate-400 border border-white/[0.04]"
                      >
                        {badge}
                      </span>
                    ))}
                    {app.badges.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/20 text-slate-400">
                        +{app.badges.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Architecture Tier & Metric */}
                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-slate-400">{app.architectureTier}</span>
                    <span className="text-emerald-400 font-semibold truncate max-w-[140px]">
                      {app.keyMetric}
                    </span>
                  </div>
                </div>

                {/* Mobile-Friendly Action Buttons */}
                <div className="mt-4 pt-3 flex items-center gap-2">
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all active:scale-95 ${
                      app.isHosted
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/10'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10'
                    }`}
                  >
                    <span>{app.isHosted ? 'Launch Host' : 'View Code'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {app.isHosted && (
                    <button
                      onClick={() => onInspect(app)}
                      className="inline-flex items-center gap-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-white/10 text-xs font-mono transition-colors active:scale-95"
                      title="Inspect live container"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Inspect</span>
                    </button>
                  )}

                  <a
                    href={app.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-slate-400 hover:text-white border border-white/10 transition-colors active:scale-95"
                    title="Audit GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filteredApps.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm font-mono text-slate-400">
              No systems match "{searchQuery}" under the selected filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-mono text-white hover:bg-zinc-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

