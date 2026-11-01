import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Cpu, ArrowUpRight } from 'lucide-react';
import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
  onInspect: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onInspect }) => {
  const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="panel-obsidian-hover rounded-2xl p-5 flex flex-col justify-between group"
    >
      <div>
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-dark-850 flex items-center justify-center text-xl border border-white/5 shadow-inner">
            {app.icon}
          </div>

          <div className="flex flex-col items-end gap-1">
            {app.isHosted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/25">
                <span className="live-pulse-dot bg-brand-400 rounded-full"></span>
                <span>Live Prod</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-dark-850 text-slate-400 border border-white/10">
                <Github className="w-3 h-3 text-slate-400" />
                <span>GitHub Repo</span>
              </span>
            )}
            <span className="text-[10px] font-mono text-slate-500">
              {app.architectureTier}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors">
          {app.name}
        </h3>
        <p className="text-xs font-mono text-cyan-400 mb-2">
          {app.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3.5">
          {app.description}
        </p>

        {/* Technical Metric Strip */}
        <div className="mb-4 px-2.5 py-1.5 rounded-lg bg-dark-900 border border-white/5 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-500">System Metric:</span>
          <span className="text-brand-400 font-medium">{app.keyMetric}</span>
        </div>
      </div>

      {/* Footer: Tags & Buttons */}
      <div>
        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1 mb-4">
          {app.badges.map((b) => (
            <span
              key={b}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-900 text-slate-400 border border-white/5"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex-1 text-center py-2 px-3 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-1.5 ${
              app.isHosted
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-black font-bold shadow-md shadow-brand-500/10'
                : 'bg-dark-850 hover:bg-dark-800 text-white font-semibold border border-white/10'
            }`}
          >
            <span>{app.isHosted ? 'Launch Live' : 'View Code'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {app.isHosted && (
            <button
              onClick={() => onInspect(app)}
              className="px-2.5 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
              title="Test drive in slide-over drawer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          )}

          {app.isHosted && (
            <a
              href={app.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="View source on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
