import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Terminal, Search, Radio } from 'lucide-react';
import { AppItem } from '../types';

interface ProjectShowcaseProps {
  apps: AppItem[];
  highlightedId: string | null;
  onInspect: (app: AppItem) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  apps,
  highlightedId,
  onInspect,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'hosted'>('all');

  const filteredApps = apps.filter((app) => {
    const matchesFilter = filter === 'all' || (filter === 'hosted' && app.isHosted);
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 lg:px-8 py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM DIRECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flagship Systems & Micro-Frontends
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
            Zero-overhead autonomous agents, algorithmic market engines, and mission interfaces.
          </p>
        </div>

        {/* Minimal Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter systems..."
              className="pl-8 pr-3 py-1.5 bg-zinc-950 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors w-44 sm:w-56"
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-white/10 text-xs font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === 'all'
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({apps.length})
            </button>
            <button
              onClick={() => setFilter('hosted')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === 'hosted'
                  ? 'bg-zinc-800 text-emerald-400 font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hosted ({apps.filter((a) => a.isHosted).length})
            </button>
          </div>
        </div>
      </div>

      {/* Projects List with Staggered Scroll Animations */}
      <div className="divide-y divide-white/5">
        {filteredApps.map((app, index) => {
          const isHighlighted = highlightedId === app.id;
          const indexNum = String(index + 1).padStart(2, '0');
          const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;

          return (
            <motion.div
              key={app.id}
              id={`project-${app.id}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
              className={`py-8 sm:py-10 transition-colors rounded-2xl px-4 sm:px-6 -mx-4 sm:-mx-6 ${
                isHighlighted
                  ? 'bg-emerald-950/20 border border-emerald-500/40'
                  : 'hover:bg-zinc-950/40'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left: Index + Project Identity */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">
                      // {indexNum}
                    </span>

                    {app.isHosted ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Host</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        Open Source
                      </span>
                    )}

                    <span className="text-xs font-mono text-slate-600">•</span>
                    <span className="text-xs font-mono text-cyan-400">{app.tagline}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{app.icon}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {app.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {app.description}
                  </p>

                  {/* Clean Single-Line Tech Stack (No badge pills!) */}
                  <div className="pt-1 text-xs font-mono text-slate-500">
                    <span className="text-slate-400 font-medium">Stack: </span>
                    {app.badges.join(' · ')}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center lg:flex-col lg:items-end gap-2.5 pt-2 lg:pt-0 shrink-0">
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                      app.isHosted
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-lg shadow-emerald-500/10'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10'
                    }`}
                  >
                    <span>{app.isHosted ? 'Launch Host' : 'View Code'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-2">
                    {app.isHosted && (
                      <button
                        onClick={() => onInspect(app)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-cyan-400 border border-white/10 transition-colors"
                        title="Inspect in live drawer"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    )}

                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredApps.length === 0 && (
          <div className="py-16 text-center text-xs font-mono text-slate-500">
            No systems found matching '{search}'.
          </div>
        )}
      </div>
    </section>
  );
};
