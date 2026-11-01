import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Laptop, Tablet, Smartphone, ShieldCheck, ChevronDown, ChevronUp, Radio } from 'lucide-react';
import { AppItem } from '../types';

interface PortfolioSpotlightProps {
  hostedApps: AppItem[];
  selectedApp: AppItem;
  onSelectApp: (app: AppItem) => void;
}

export const PortfolioSpotlight: React.FC<PortfolioSpotlightProps> = ({
  hostedApps,
  selectedApp,
  onSelectApp
}) => {
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [frameLoading, setFrameLoading] = useState<boolean>(true);

  const viewportWidths = {
    desktop: 'w-full h-[580px]',
    tablet: 'w-[768px] h-[580px] mx-auto',
    mobile: 'w-[390px] h-[580px] mx-auto'
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel rounded-2xl border border-white/10 mb-8 overflow-hidden shadow-2xl relative"
    >
      {/* Top Banner & Profile Overview */}
      <div className="p-6 lg:p-8 border-b border-white/10 bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Identity & Mission */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span>EXECUTIVE PORTFOLIO SPOTLIGHT</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Amit Kumar Dey (@akdey)</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Autonomous AI Systems & Full-Stack Command Planes
            </h1>
            
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">
              Staff / Principal level engineering spanning <span className="text-brand-400 font-semibold">Agent Governance & LLM Firewalls</span>, <span className="text-cyan-400 font-semibold">Real-Time Algorithmic Market Intelligence</span>, and <span className="text-sky-400 font-semibold">Local-First Zero-Billing Architectures</span>.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 mt-5 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-dark-800 border border-white/5 text-slate-300">
                <span className="text-brand-400 font-bold text-sm">7</span> Hosted Production Systems
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-dark-800 border border-white/5 text-slate-300">
                <span className="text-cyan-400 font-bold text-sm">14</span> Open Source Engines
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-dark-800 border border-white/5 text-slate-300">
                <span className="text-sky-400 font-bold text-sm">₹0.00</span> Cloud DB Billing Philosophy
              </div>
            </div>
          </div>

          {/* Action Hub & Live Simulator Trigger */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
            <div className="flex items-center gap-2">
              <a
                href={selectedApp.hostedUrl || "https://portfolio.akdey.vercel.app/"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-black font-mono font-bold text-xs transition-all shadow-lg shadow-brand-500/20"
              >
                <span>Launch {selectedApp.name} ↗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-xs font-mono text-slate-300 border border-white/10 transition-colors"
                title={isExpanded ? "Collapse Device Simulator" : "Expand Device Simulator"}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span className="hidden sm:inline">{isExpanded ? 'Hide Viewport' : 'Show Viewport'}</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-brand-400 animate-pulse" />
              Interactive Device Inspector Active
            </span>
          </div>

        </div>
      </div>

      {/* Interactive Device Viewport & Multi-App Switcher */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 lg:p-6 bg-dark-950 border-t border-white/5"
          >
            {/* Viewport Control Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              
              {/* App Switcher Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full custom-scrollbar">
                {hostedApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setFrameLoading(true);
                      onSelectApp(app);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                      selectedApp.id === app.id
                        ? 'bg-brand-500 text-black font-bold shadow-md shadow-brand-500/20'
                        : 'bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{app.icon}</span>
                    <span>{app.name}</span>
                  </button>
                ))}
              </div>

              {/* Device Bezel Selector */}
              <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setDeviceViewport('desktop')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    deviceViewport === 'desktop' ? 'bg-dark-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Desktop (1280px)"
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceViewport('tablet')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    deviceViewport === 'tablet' ? 'bg-dark-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceViewport('mobile')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    deviceViewport === 'mobile' ? 'bg-dark-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mobile (390px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Device Container Frame */}
            <div className="bg-dark-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300">
              
              {/* Fake Browser URL Bar */}
              <div className="px-4 py-2.5 bg-dark-850 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-dark-950 border border-white/10 text-slate-400 text-[11px] max-w-md truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                  <span className="text-slate-200">{selectedApp.hostedUrl}</span>
                </div>

                <div className="text-[10px] text-slate-500 font-mono hidden sm:block">
                  Latency: 14ms (Vercel Edge Global)
                </div>
              </div>

              {/* Iframe Viewport with Smooth Loading State */}
              <div className={`relative bg-black transition-all duration-300 ${viewportWidths[deviceViewport]}`}>
                {frameLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-950/90 text-xs font-mono text-slate-400 z-10">
                    <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mb-3"></div>
                    <span>Streaming live runtime for {selectedApp.name}...</span>
                  </div>
                )}
                <iframe
                  key={selectedApp.id}
                  src={selectedApp.hostedUrl}
                  title={selectedApp.name}
                  onLoad={() => setFrameLoading(false)}
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};

