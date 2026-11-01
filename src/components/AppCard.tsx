import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Cpu, ArrowUpRight, Terminal } from 'lucide-react';
import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
  index: number;
  onInspect: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, index, onInspect }) => {
  const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;
  const podNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`cyber-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between group ${
        app.isHosted ? 'hover:border-cyber-emerald/40' : 'hover:border-cyber-cyan/40'
      }`}
    >
      <div>
        {/* Top Header Strip */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-void-950 flex items-center justify-center text-xl border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
              {app.icon}
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block">POD // {podNumber}</span>
              <span className="text-xs font-mono text-slate-300 font-semibold">{app.architectureTier}</span>
            </div>
          </div>

          <div>
            {app.isHosted ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30 shadow-sm shadow-cyber-emerald/10">
                <span className="radar-pulse-green"></span>
                <span>Live Host</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-void-950 text-slate-400 border border-white/10">
                <Github className="w-2.5 h-2.5" />
                <span>Open Source</span>
              </span>
            )}
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyber-cyan transition-colors">
          {app.name}
        </h3>
        <p className="text-xs font-mono text-slate-400 mb-2.5">
          {app.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4 font-sans">
          {app.description}
        </p>

        {/* Engineering Metric Box */}
        <div className="mb-4 p-2.5 rounded-xl bg-void-950 border border-white/5 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-500">Core Metric:</span>
          <span className={app.isHosted ? 'text-cyber-emerald font-semibold' : 'text-cyber-cyan font-semibold'}>
            {app.keyMetric}
          </span>
        </div>
      </div>

      {/* Footer: Tags & Laser Buttons */}
      <div>
        {/* Badges */}
        <div className="flex flex-wrap gap-1 mb-4">
          {app.badges.map((b) => (
            <span
              key={b}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-void-950 text-slate-400 border border-white/5"
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
            className={`flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
              app.isHosted
                ? 'bg-gradient-to-r from-cyber-emerald to-cyber-mint text-black hover:opacity-90 shadow-md shadow-cyber-emerald/10'
                : 'bg-void-850 hover:bg-void-800 text-white border border-white/10'
            }`}
          >
            <span>{app.isHosted ? 'Initialize Live Host' : 'Audit Repository'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {app.isHosted && (
            <button
              onClick={() => onInspect(app)}
              className="p-2.5 rounded-xl bg-void-950 hover:bg-void-900 text-cyber-cyan border border-white/10 text-xs font-mono transition-colors"
              title="Inspect live container"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>
          )}

          {app.isHosted && (
            <a
              href={app.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-void-950 hover:bg-void-900 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="View source on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
