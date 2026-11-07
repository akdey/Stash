import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, RefreshCw, ShieldCheck, Laptop, Tablet, Smartphone, Maximize2, Layers } from 'lucide-react';

interface PortfolioMicrofrontendProps {
  onSwitchToLaunchpad: () => void;
}

export const PortfolioMicrofrontend: React.FC<PortfolioMicrofrontendProps> = ({
  onSwitchToLaunchpad,
}) => {
  const [deviceViewport, setDeviceViewport] = useState<'full' | 'laptop' | 'tablet' | 'mobile'>('full');
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const viewportStyles = {
    full: 'w-full h-full rounded-none sm:rounded-2xl',
    laptop: 'max-w-[1024px] mx-auto h-[90%] rounded-2xl shadow-2xl border border-white/10',
    tablet: 'max-w-[768px] mx-auto h-[90%] rounded-2xl shadow-2xl border border-white/10',
    mobile: 'max-w-[390px] mx-auto h-[90%] rounded-2xl shadow-2xl border border-white/10',
  };

  return (
    <section className="relative w-full h-[calc(100dvh-58px)] sm:h-[calc(100dvh-60px)] flex flex-col bg-[#020408] overflow-hidden">
      {/* Container Chrome / Header Bar */}
      <div className="bg-[#070b12] border-b border-white/[0.08] px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 flex-shrink-0 z-20">
        {/* Left: Host Protocol & Address */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold hidden sm:inline">LIVE MFE CONTAINER</span>
            <span className="font-semibold sm:hidden">MFE</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg border border-white/[0.06] text-xs font-mono text-slate-300 min-w-0 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">portfolio.akdey.vercel.app</span>
          </div>
        </div>

        {/* Center: Device Viewport Selector (Desktop only) */}
        <div className="hidden lg:flex items-center bg-zinc-900/90 p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => setDeviceViewport('full')}
            className={`p-1.5 rounded-lg transition-colors ${
              deviceViewport === 'full' ? 'bg-zinc-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Full Width"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceViewport('laptop')}
            className={`p-1.5 rounded-lg transition-colors ${
              deviceViewport === 'laptop' ? 'bg-zinc-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Laptop (1024px)"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceViewport('tablet')}
            className={`p-1.5 rounded-lg transition-colors ${
              deviceViewport === 'tablet' ? 'bg-zinc-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceViewport('mobile')}
            className={`p-1.5 rounded-lg transition-colors ${
              deviceViewport === 'mobile' ? 'bg-zinc-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Container Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => {
              setIsLoading(true);
              setIframeKey((k) => k + 1);
            }}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors flex items-center gap-1"
            title="Reload Microfrontend"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reload</span>
          </button>

          <a
            href="https://portfolio.akdey.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors flex items-center gap-1"
            title="Open Live Portfolio Direct"
          >
            <span className="hidden sm:inline">Direct</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={onSwitchToLaunchpad}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono transition-all shadow-md shadow-emerald-500/20"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View All 20 Apps</span>
          </button>
        </div>
      </div>

      {/* Iframe Viewport Area */}
      <div className="relative flex-1 min-h-0 w-full bg-[#030509] sm:p-2 flex flex-col justify-center overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#030509] text-xs font-mono text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mb-3" />
            <span className="animate-pulse">Mounting Live Portfolio Microfrontend...</span>
          </div>
        )}

        <div className={`relative overflow-hidden transition-all duration-300 ${viewportStyles[deviceViewport]}`}>
          <iframe
            key={iframeKey}
            src="https://portfolio.akdey.vercel.app/"
            title="Master Engineering Portfolio Microfrontend"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0 bg-black"
            loading="eager"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </div>

      {/* Mobile Bottom Quick Switcher Bar */}
      <div className="sm:hidden bg-[#070b12] border-t border-white/[0.08] px-3 py-2 flex items-center justify-between text-[11px] font-mono text-slate-400 pb-16">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Vercel Global Edge</span>
        </div>
        <button
          onClick={onSwitchToLaunchpad}
          className="text-emerald-400 font-semibold flex items-center gap-1 active:scale-95 transition-transform"
        >
          <span>Explore 19 Other Apps →</span>
        </button>
      </div>
    </section>
  );
};
