import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface PortfolioMicrofrontendProps {
  onScrollDown: () => void;
}

export const PortfolioMicrofrontend: React.FC<PortfolioMicrofrontendProps> = ({
  onScrollDown,
}) => {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col bg-black overflow-hidden border-b border-white/[0.06]">
      {/* Live Embedded Portfolio Microfrontend */}
      <div className="relative w-full flex-1 min-h-0 bg-black">
        <iframe
          src="https://portfolio.akdey.vercel.app/"
          title="Master Engineering Portfolio Microfrontend"
          className="w-full h-full border-0"
          loading="eager"
          allow="clipboard-read; clipboard-write"
        />
      </div>

      {/* Floating Bottom Hint Bar */}
      <div className="sticky bottom-0 z-30 w-full bg-zinc-950/90 backdrop-blur-md border-t border-white/[0.06] px-4 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 hidden sm:inline">Microfrontend:</span>
          <span className="text-emerald-400 font-medium">portfolio.akdey.vercel.app</span>
        </div>

        {/* Scroll hint button */}
        <button
          onClick={onScrollDown}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white border border-white/[0.08] transition-all cursor-pointer group"
        >
          <span className="text-[11px] text-slate-400 group-hover:text-emerald-300 transition-colors">
            Explore featured projects
          </span>
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
          </motion.div>
        </button>

        <div className="flex items-center gap-2">
          <a
            href="https://portfolio.akdey.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-slate-300 flex items-center gap-1 text-[11px] transition-colors"
          >
            <span className="hidden sm:inline">Open direct</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

