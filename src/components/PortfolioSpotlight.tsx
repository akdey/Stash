import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal, ShieldCheck, ArrowUpRight, Play, Eye, Sparkles, Layers } from 'lucide-react';
import { AppItem } from '../types';

interface PortfolioSpotlightProps {
  flagshipApps: AppItem[];
  onOpenPreviewDrawer: (app: AppItem) => void;
}

export const PortfolioSpotlight: React.FC<PortfolioSpotlightProps> = ({
  flagshipApps,
  onOpenPreviewDrawer,
}) => {
  const [activeFlagshipId, setActiveFlagshipId] = useState<string>(flagshipApps[0]?.id || 'portfolio');

  const currentApp = flagshipApps.find((a) => a.id === activeFlagshipId) || flagshipApps[0];

  return (
    <section className="mb-10">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Cell 1: Identity & Engineering Thesis (7 Cols) */}
        <div className="lg:col-span-7 panel-obsidian rounded-2xl p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <span className="live-pulse-dot bg-brand-400 rounded-full"></span>
                <span>SYSTEMS ARCHITECT & STAFF ENGINEER</span>
              </div>
              <span className="text-xs font-mono text-slate-500">Kolkata, IN • Remote</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Amit Kumar Dey
            </h1>
            <p className="text-xs font-mono text-cyan-400 mt-1">@akdey // Autonomous AI, Quantitative Systems & Zero-Cost Infra</p>

            <p className="text-xs sm:text-sm text-slate-300 mt-3.5 leading-relaxed max-w-xl">
              Engineering autonomous multi-agent councils, institutional-grade equity intelligence engines, and local-first zero-billing architectures. Strict proponent of <strong className="text-white font-semibold">"No AI UI"</strong> — designing bespoke, domain-specific command surfaces rather than generic chat bubbles.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://portfolio.akdey.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-slate-200 transition-colors shadow-sm"
              >
                <span>Master Portfolio ↗</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/akdey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 text-xs font-mono border border-white/10 transition-colors"
              >
                <span>github.com/akdey</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                7 Live Deployments
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                14 Open Source
              </span>
            </div>
          </div>
        </div>

        {/* Cell 2: Interactive Flagship Showcase Radar (5 Cols) */}
        <div className="lg:col-span-5 panel-obsidian rounded-2xl p-6 lg:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                Featured Flagship Radar
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                ACTIVE PRODUCTION
              </span>
            </div>

            {/* Quick-Switch Pill Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-4 custom-scrollbar">
              {flagshipApps.slice(0, 5).map((app) => (
                <button
                  key={app.id}
                  onClick={() => setActiveFlagshipId(app.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                    activeFlagshipId === app.id
                      ? 'bg-brand-500 text-black font-bold shadow-sm'
                      : 'bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{app.name}</span>
                </button>
              ))}
            </div>

            {/* Active System Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentApp.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center text-xl border border-white/10">
                    {currentApp.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{currentApp.name}</h3>
                    <p className="text-xs font-mono text-brand-400">{currentApp.tagline}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {currentApp.description}
                </p>

                <div className="p-2.5 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Architectural Metric:</span>
                  <span className="text-cyan-400 font-semibold">{currentApp.keyMetric}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Row */}
          <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2">
            <a
              href={currentApp.hostedUrl || currentApp.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 px-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-black font-mono font-bold text-xs transition-all shadow-md shadow-brand-500/10 flex items-center justify-center gap-1.5"
            >
              <span>Launch Live App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {currentApp.isHosted && (
              <button
                onClick={() => onOpenPreviewDrawer(currentApp)}
                className="px-3 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Preview inside slide-over drawer"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Inspect</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
