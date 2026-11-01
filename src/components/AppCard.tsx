import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Cpu } from 'lucide-react';
import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
  onPreview: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onPreview }) => {
  const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;
  const primaryLabel = app.isHosted ? "Launch Hosted App ↗" : "View GitHub Repo ↗";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Top Bar: Icon, Tier Badge & Status Indicator */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-dark-850 flex items-center justify-center text-2xl border border-white/5 shadow-inner">
            {app.icon}
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {app.isHosted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-brand-500/15 text-brand-400 border border-brand-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                Hosted Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-dark-800 text-slate-400 border border-white/10">
                <Github className="w-3 h-3 text-slate-400" />
                GitHub Open Source
              </span>
            )}
            
            <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5 text-cyan-400" />
              {app.architectureTier}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors">
          {app.name}
        </h3>
        <p className="text-xs font-mono text-cyan-400 mb-2.5">
          {app.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
          {app.description}
        </p>

        {/* Highlight Key Engineering Metric */}
        <div className="mb-4 px-2.5 py-1.5 rounded-lg bg-dark-900 border border-white/5 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-500">Core Metric:</span>
          <span className="text-brand-400 font-semibold">{app.keyMetric}</span>
        </div>
      </div>

      {/* Footer: Tags & Action Buttons */}
      <div>
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {app.badges.map((b) => (
            <span
              key={b}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-900 text-slate-300 border border-white/5"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex-1 text-center py-2 px-3 rounded-xl text-xs font-mono transition-all ${
              app.isHosted
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-black font-bold shadow-md shadow-brand-500/10'
                : 'bg-dark-800 hover:bg-dark-750 text-white font-semibold border border-white/10'
            }`}
          >
            {primaryLabel}
          </a>

          {app.isHosted && (
            <button
              onClick={() => onPreview(app)}
              className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Test drive in top device inspector"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
            </button>
          )}

          {app.isHosted && (
            <a
              href={app.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
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

