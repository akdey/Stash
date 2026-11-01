import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal, ShieldCheck, ArrowUpRight, Sparkles, Cpu, Activity, Globe } from 'lucide-react';
import { AppItem } from '../types';

interface PortfolioSpotlightProps {
  flagshipApps: AppItem[];
  onOpenPreviewDrawer: (app: AppItem) => void;
}

export const PortfolioSpotlight: React.FC<PortfolioSpotlightProps> = ({
  flagshipApps,
  onOpenPreviewDrawer,
}) => {
  const [activeId, setActiveId] = useState<string>(flagshipApps[0]?.id || 'portfolio');
  const currentApp = flagshipApps.find((a) => a.id === activeId) || flagshipApps[0];

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Architect Identity & System Ethos (7 Cols) */}
        <div className="lg:col-span-7 cyber-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden laser-border-cyan">
          {/* Ambient Cybernetic Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div>
            {/* Mission Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
                <span className="radar-pulse-green"></span>
                <span>CHIEF ARCHITECT // AUTONOMOUS AI & SYSTEMS</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">NODE: AP-SOUTH-1 (IN)</span>
            </div>

            {/* Name & Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
              Amit Kumar Dey
            </h1>
            <p className="text-xs font-mono text-cyber-emerald mt-2">
              @akdey // High-Performance Agentic Runtimes • Market Alpha • Zero-Cost Cloud Infra
            </p>

            {/* Architectural Manifesto */}
            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed max-w-xl">
              Architecting autonomous multi-agent councils, institutional market intelligence, and air-gapped security firewalls. Championing the <strong className="text-white font-semibold">"No AI UI"</strong> engineering principle: domain-specific operational command planes instead of passive chat boxes.
            </p>

            {/* Telemetry Stats Strip */}
            <div className="grid grid-cols-3 gap-3 mt-6 text-xs font-mono">
              <div className="p-3 rounded-xl bg-void-900 border border-white/5">
                <div className="text-cyber-emerald font-bold text-lg">7 LIVE</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Cloud Deployments</div>
              </div>
              <div className="p-3 rounded-xl bg-void-900 border border-white/5">
                <div className="text-cyber-cyan font-bold text-lg">14 REPOS</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Open Source</div>
              </div>
              <div className="p-3 rounded-xl bg-void-900 border border-white/5">
                <div className="text-cyber-sky font-bold text-lg">₹0.00</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Database Billing</div>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://portfolio.akdey.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-sky text-black font-mono font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-cyber-cyan/20"
              >
                <span>Launch Master Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/akdey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-void-850 hover:bg-void-800 text-slate-200 text-xs font-mono border border-white/10 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>github.com/akdey</span>
              </a>
            </div>

            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyber-emerald" />
              <span>Full-Stack & Edge Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column: Flagship Flight Deck Radar (5 Cols) */}
        <div className="lg:col-span-5 cyber-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between laser-border-emerald relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyber-emerald" />
                Active Flagship Systems
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/20">
                RADAR ONLINE
              </span>
            </div>

            {/* Quick-Switch Pill Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-4 custom-scrollbar">
              {flagshipApps.slice(0, 6).map((app) => (
                <button
                  key={app.id}
                  onClick={() => setActiveId(app.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                    activeId === app.id
                      ? 'bg-cyber-emerald text-black font-bold shadow-sm'
                      : 'bg-void-900 hover:bg-void-850 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{app.name}</span>
                </button>
              ))}
            </div>

            {/* Selected System Blueprint */}
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
                  <div className="w-12 h-12 rounded-xl bg-void-900 flex items-center justify-center text-2xl border border-white/10 shadow-inner">
                    {currentApp.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{currentApp.name}</h3>
                    <p className="text-xs font-mono text-cyber-cyan">{currentApp.tagline}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {currentApp.description}
                </p>

                <div className="p-3 rounded-xl bg-void-950 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Core Architecture:</span>
                  <span className="text-cyber-emerald font-semibold">{currentApp.keyMetric}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Row */}
          <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2">
            <a
              href={currentApp.hostedUrl || currentApp.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2.5 px-3 rounded-xl bg-cyber-emerald text-black font-mono font-bold text-xs hover:bg-cyber-mint transition-colors shadow-md shadow-cyber-emerald/10 flex items-center justify-center gap-1.5"
            >
              <span>{currentApp.isHosted ? 'Initialize Live Host' : 'Audit Repository'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {currentApp.isHosted && (
              <button
                onClick={() => onOpenPreviewDrawer(currentApp)}
                className="px-3 py-2.5 rounded-xl bg-void-900 hover:bg-void-850 text-cyber-cyan border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Inspect in live drawer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
