import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Github, ArrowRight, X } from 'lucide-react';
import { AppItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  onSelectApp: (app: AppItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  apps,
  onSelectApp
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = apps.filter((app) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.badges.some((b) => b.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      const app = filtered[selectedIndex];
      const targetUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-dark-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-dark-850">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type an app name, technology, or capability..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-dark-750 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filtered Results */}
            <div className="max-h-[380px] overflow-y-auto p-2 custom-scrollbar space-y-1">
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-xs font-mono text-slate-500">
                  No matching systems found
                </div>
              ) : (
                filtered.map((app, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={app.id}
                      onClick={() => {
                        const targetUrl = app.isHosted ? app.hostedUrl! : app.githubUrl;
                        window.open(targetUrl, '_blank', 'noopener,noreferrer');
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-dark-800 border border-brand-500/40 text-white'
                          : 'hover:bg-dark-850 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl flex-shrink-0">{app.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white truncate">{app.name}</span>
                            {app.isHosted ? (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                                Hosted
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-dark-750 text-slate-400 border border-white/10">
                                GitHub
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-mono text-cyan-400 truncate">{app.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 text-xs font-mono">
                        {app.isHosted ? (
                          <span className="text-brand-400 flex items-center gap-1">
                            <span>Launch</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1">
                            <span>Repo</span>
                            <Github className="w-3 h-3" />
                          </span>
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-transparent'}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2.5 bg-dark-950 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open Destination</span>
                <span>ESC Close</span>
              </div>
              <div>{filtered.length} Applications</div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

