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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        />

        {/* Slide-Over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-dark-900 border-l border-white/10 shadow-2xl flex flex-col h-full z-10"
        >
          {/* Drawer Header */}
          <div className="px-5 py-3.5 border-b border-white/10 bg-dark-950 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl flex-shrink-0">{app.icon}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">{app.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 flex-shrink-0">
                    Live Container
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 truncate">
                  <ShieldCheck className="w-3 h-3 text-brand-400 flex-shrink-0" />
                  <span className="truncate">{app.hostedUrl}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Device Selector */}
              <div className="hidden sm:flex items-center bg-dark-850 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewport === 'desktop' ? 'bg-dark-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewport === 'tablet' ? 'bg-dark-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewport === 'mobile' ? 'bg-dark-750 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mobile View (390px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Refresh iframe */}
              <button
                onClick={() => {
                  setIsLoading(true);
                  setIframeKey((k) => k + 1);
                }}
                className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/10"
                title="Reload Container"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Open in new tab */}
              <a
                href={app.hostedUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/10"
                title="Open in new window"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Drawer */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-dark-850 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/10"
                title="Close Drawer (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Body / Iframe Area */}
          <div className="flex-1 bg-black p-2 sm:p-4 relative overflow-y-auto custom-scrollbar flex flex-col justify-center">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark-950 text-xs font-mono text-slate-400">
                <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mb-3"></div>
                <span>Connecting to live production instance...</span>
              </div>
            )}

            <div className={`h-full rounded-xl overflow-hidden border border-white/10 bg-dark-950 transition-all duration-300 ${viewportWidths[viewport]}`}>
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

          {/* Drawer Footer Status */}
          <div className="px-5 py-2.5 bg-dark-950 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Runtime Latency: 12ms (Vercel Global Edge)</span>
            <span>ESC to Dismiss</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
