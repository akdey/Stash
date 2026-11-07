import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Terminal } from 'lucide-react';
import { AppItem } from '../types';

interface FeaturedProjectsProps {
  apps: AppItem[];
  onInspect: (app: AppItem) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ apps, onInspect }) => {
  const featured = apps.filter((app) => app.featured);

  return (
    <section id="featured" className="max-w-6xl mx-auto px-4 lg:px-8 py-20 scroll-mt-6">
      <div className="mb-10">
        <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-3">
          Featured Work
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Flagship Projects
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-xl">
          Autonomous agents, enterprise systems, and financial intelligence — the projects that define the stack.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((app, index) => {
          const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;

          return (
            <motion.article
              key={app.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="group relative rounded-2xl bg-zinc-900/60 border border-white/[0.06] p-6 sm:p-8 hover:border-white/[0.12] hover:bg-zinc-900/80 transition-all duration-300"
            >
              {/* Status indicator */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{app.icon}</span>
                  {app.isHosted ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Live
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">Open Source</span>
                  )}
                </div>
              </div>

              {/* Identity */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                {app.name}
              </h3>
              <p className="text-sm font-mono text-cyan-400/80 mb-4">
                {app.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                {app.description}
              </p>

              {/* Tech stack */}
              <p className="text-xs font-mono text-slate-500 mb-6">
                {app.badges.join(' · ')}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2.5">
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    app.isHosted
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black font-semibold'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10'
                  }`}
                >
                  <span>{app.isHosted ? 'Launch' : 'View Code'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {app.isHosted && (
                  <button
                    onClick={() => onInspect(app)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-cyan-400 border border-white/10 transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                )}

                <a
                  href={app.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
