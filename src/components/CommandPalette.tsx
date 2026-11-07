import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, X, Search, Terminal } from 'lucide-react';
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
      app.architectureTier.toLowerCase().includes(q) ||
      app.badges.some((b) => b.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
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
      onSelectApp(app);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-[12vh] p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-[#090e18] border border-white/[0.12] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="p-3.5 sm:p-4 border-b border-white/[0.08] flex items-center gap-3 bg-[#0d1422]">
              <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search 20 systems, agents, models, tags..."
                className="w-full bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-zinc-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 custom-scrollbar space-y-1">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-xs font-mono text-slate-500">
                  No matching systems found
                </div>
              ) : (
                filtered.map((app, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={app.id}
                      onClick={() => {
                        onSelectApp(app);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`p-2.5 sm:p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors active:scale-[0.99] ${
                        isSelected
                          ? 'bg-zinc-800/90 text-white border border-white/10'
                          : 'text-slate-300 hover:bg-zinc-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl flex-shrink-0 p-1 rounded-lg bg-black/40">
                          {app.icon}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white truncate">{app.name}</span>
                            {app.isHosted ? (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                                Live Host
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-800 text-slate-400 border border-white/10 flex-shrink-0">
                                Open Source
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-mono text-slate-400 truncate">{app.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 text-xs font-mono">
                        {app.isHosted ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="hidden sm:inline">Launch</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1">
                            <span className="hidden sm:inline">Repo</span>
                            <Github className="w-3 h-3" />
                          </span>
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 transition-opacity ${isSelected ? 'opacity-100 text-cyan-400' : 'opacity-0'}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Keyboard Footer */}
            <div className="px-4 py-2 bg-[#060a12] border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Enter</span>
                <span>ESC Dismiss</span>
              </div>
              <span>{filtered.length} Systems</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
