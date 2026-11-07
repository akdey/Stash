import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, X, Search } from 'lucide-react';
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
      onSelectApp(app);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4 bg-black/70 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-zinc-900 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
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
                placeholder="Search projects..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-zinc-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[340px] overflow-y-auto p-1.5 custom-scrollbar">
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-500">
                  No projects found
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
                      className={`px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-white/[0.06] text-white'
                          : 'text-slate-300 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg flex-shrink-0">{app.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white truncate">{app.name}</span>
                            {app.isHosted && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">{app.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 text-xs">
                        {app.isHosted ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span>Launch</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-1">
                            <span>Repo</span>
                            <Github className="w-3 h-3" />
                          </span>
                        )}
                        <ArrowRight className={`w-3 h-3 transition-opacity ${isSelected ? 'opacity-100 text-slate-400' : 'opacity-0'}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Keyboard hints */}
            <div className="px-4 py-2 bg-zinc-950/60 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
              </div>
              <span>{filtered.length} projects</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
