import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Search, Terminal } from 'lucide-react';
import { AppItem, Domain } from '../types';

interface ProjectDirectoryProps {
  apps: AppItem[];
  onInspect: (app: AppItem) => void;
}

const DOMAIN_META: Record<Domain, { label: string; icon: string }> = {
  agents: { label: 'Agents & AI', icon: '🤖' },
  finance: { label: 'Finance & Markets', icon: '📊' },
  enterprise: { label: 'Enterprise', icon: '🏢' },
  personal: { label: 'Personal & Culture', icon: '🎨' },
};

const DOMAIN_ORDER: Domain[] = ['agents', 'finance', 'enterprise', 'personal'];

export const ProjectDirectory: React.FC<ProjectDirectoryProps> = ({ apps, onInspect }) => {
  const [search, setSearch] = useState('');

  // Exclude the portfolio (it's the hero microfrontend) and featured projects
  const directoryApps = apps.filter((app) => app.id !== 'portfolio' && !app.featured);

  const filtered = directoryApps.filter((app) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.badges.some((b) => b.toLowerCase().includes(q))
    );
  });

  // Group by domain
  const grouped = DOMAIN_ORDER.map((domain) => ({
    domain,
    ...DOMAIN_META[domain],
    apps: filtered.filter((app) => app.domain === domain),
  })).filter((group) => group.apps.length > 0);

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
      {/* Section header + search */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-3">
            All Projects
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Project Directory
          </h2>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-9 pr-3 py-2 bg-zinc-900 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors w-48 sm:w-64"
          />
        </div>
      </div>

      {/* Grouped domains */}
      <div className="space-y-12">
        {grouped.map((group) => (
          <div key={group.domain}>
            {/* Domain header */}
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/[0.06]">
              <span className="text-lg">{group.icon}</span>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                {group.label}
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {group.apps.length}
              </span>
            </div>

            {/* Grid of compact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.apps.map((app, index) => {
                const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;

                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: 'easeOut' }}
                    className="group rounded-xl bg-zinc-900/40 border border-white/[0.05] p-4 hover:border-white/[0.1] hover:bg-zinc-900/60 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg flex-shrink-0">{app.icon}</span>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {app.name}
                          </h4>
                          <p className="text-[11px] font-mono text-slate-500 truncate">
                            {app.tagline}
                          </p>
                        </div>
                      </div>

                      {app.isHosted && (
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                      )}
                    </div>

                    {/* Actions row */}
                    <div className="flex items-center gap-1.5">
                      <a
                        href={primaryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                          app.isHosted
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300'
                        }`}
                      >
                        <span>{app.isHosted ? 'Launch' : 'Code'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>

                      {app.isHosted && (
                        <button
                          onClick={() => onInspect(app)}
                          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-[11px] font-mono text-cyan-400/70 transition-colors"
                          title="Inspect in live drawer"
                        >
                          <Terminal className="w-3 h-3" />
                        </button>
                      )}

                      <a
                        href={app.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-slate-500 hover:text-white transition-colors ml-auto"
                        title="GitHub"
                      >
                        <Github className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-slate-500">
            No projects found matching "{search}"
          </div>
        )}
      </div>
    </section>
  );
};
