import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { AppItem } from '../types';

interface TableViewProps {
  apps: AppItem[];
  onInspect: (app: AppItem) => void;
}

export const TableView: React.FC<TableViewProps> = ({ apps, onInspect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="cyber-panel rounded-2xl overflow-hidden border border-white/10"
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-void-950/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">System Identity</th>
              <th className="py-3 px-4">Architecture Tier</th>
              <th className="py-3 px-4">Key Engineering Metric</th>
              <th className="py-3 px-4">Runtime Status</th>
              <th className="py-3 px-4 text-right">Action Gate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs font-mono">
            {apps.map((app) => {
              const primaryUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;

              return (
                <tr
                  key={app.id}
                  className="hover:bg-void-800/50 transition-colors group"
                >
                  {/* Name & Tagline */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">{app.icon}</span>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm group-hover:text-cyber-cyan transition-colors">
                          {app.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                          {app.tagline}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Architecture Tier */}
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-void-900 border border-white/5 text-[11px]">
                      {app.architectureTier}
                    </span>
                  </td>

                  {/* Key Metric */}
                  <td className="py-3.5 px-4">
                    <span className="text-cyber-emerald font-semibold">
                      {app.keyMetric}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {app.isHosted ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30">
                        <span className="radar-pulse-green"></span>
                        <span>Live Prod</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] text-slate-400 bg-void-900 border border-white/5">
                        <Github className="w-2.5 h-2.5" />
                        <span>Source</span>
                      </span>
                    )}
                  </td>

                  {/* Action Gate */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      {app.isHosted && (
                        <button
                          onClick={() => onInspect(app)}
                          className="px-2.5 py-1 rounded-lg bg-void-850 hover:bg-void-800 text-cyber-cyan border border-white/10 text-[11px] inline-flex items-center gap-1 transition-colors"
                          title="Inspect live container"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Drawer</span>
                        </button>
                      )}

                      <a
                        href={primaryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-3 py-1 rounded-lg text-[11px] inline-flex items-center gap-1 transition-all ${
                          app.isHosted
                            ? 'bg-cyber-emerald text-black font-bold hover:bg-cyber-mint shadow-sm'
                            : 'bg-void-850 hover:bg-void-800 text-white border border-white/10'
                        }`}
                      >
                        <span>{app.isHosted ? 'Launch' : 'Code'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
