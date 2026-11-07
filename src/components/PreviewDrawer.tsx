import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Laptop, Tablet, Smartphone, ShieldCheck, RefreshCw } from 'lucide-react';
import { AppItem } from '../types';

interface PreviewDrawerProps {
  app: AppItem | null;
  onClose: () => void;
}

export const PreviewDrawer: React.FC<PreviewDrawerProps> = ({ app, onClose }) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  if (!app || !app.hostedUrl) return null;

  const viewportWidths = {
    desktop: 'w-full',
    tablet: 'max-w-[768px] mx-auto',
    mobile: 'max-w-[390px] mx-auto'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Responsive Drawer / Bottom-Sheet on Mobile */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full lg:max-w-5xl bg-[#060a12] border-l border-white/[0.1] shadow-2xl flex flex-col h-full z-10"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-[#080d16] flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl sm:text-2xl flex-shrink-0 p-1.5 rounded-xl bg-zinc-800 border border-white/10">
                {app.icon}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">{app.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold flex-shrink-0">
                    LIVE CONTAINER
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 truncate mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{app.hostedUrl}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Device Selector (Desktop only) */}
              <div className="hidden sm:flex items-center bg-zinc-900 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewport === 'desktop' ? 'bg-zinc-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewport === 'tablet' ? 'bg-zinc-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewport === 'mobile' ? 'bg-zinc-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mobile View (390px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Reload */}
              <button
                onClick={() => {
                  setIsLoading(true);
                  setIframeKey((k) => k + 1);
                }}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Reload Container"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Open in new tab */}
              <a
                href={app.hostedUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Open Live Host in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/10 transition-colors"
                title="Dismiss (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 bg-black p-2 sm:p-4 relative overflow-hidden flex flex-col justify-center">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#060a12] text-xs font-mono text-slate-400">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mb-3" />
                <span className="animate-pulse">Connecting to live container...</span>
              </div>
            )}

            <div className={`h-full rounded-xl overflow-hidden border border-white/[0.08] bg-[#020408] transition-all duration-300 ${viewportWidths[viewport]}`}>
              <iframe
                key={iframeKey}
                src={app.hostedUrl}
                title={app.name}
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#080d16] border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400 flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Vercel Global Edge / Docker Active</span>
            </span>
            <span className="hidden sm:inline">Press ESC to dismiss</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
