import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Github, Radio, CheckCircle2 } from 'lucide-react';
import { Header } from './components/Header';
import { PortfolioSpotlight } from './components/PortfolioSpotlight';
import { AppCard } from './components/AppCard';
import { TopologyView } from './components/TopologyView';
import { CommandPalette } from './components/CommandPalette';
import { APPS } from './data/apps';
import { AppItem, Category } from './types';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<Category>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'topology'>('grid');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppItem>(APPS[0]); // Starts with Master Portfolio
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const hostedApps = APPS.filter((a) => a.isHosted);

  // PWA Install prompt listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstallPwa(false);
    }
    setDeferredPrompt(null);
  };

  // Keyboard shortcut listener (Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsCommandOpen(true);
      } else if (e.key === 'Escape') {
        setIsCommandOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredApps = APPS.filter((app) => {
    const matchesCategory =
      currentCategory === 'all' ||
      (currentCategory === 'hosted' && app.isHosted) ||
      app.category === currentCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.badges.some((b) => b.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-500 selection:text-black">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenCommand={() => setIsCommandOpen(true)}
        onInstallPwa={handleInstallPwa}
        canInstallPwa={canInstallPwa}
        hostedCount={hostedApps.length}
        totalCount={APPS.length}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        
        {/* Executive Portfolio Spotlight & Live Device Inspector */}
        <PortfolioSpotlight
          hostedApps={hostedApps}
          selectedApp={selectedApp}
          onSelectApp={(app) => setSelectedApp(app)}
        />

        {/* View Switcher Content */}
        {viewMode === 'topology' ? (
          <TopologyView
            apps={APPS}
            onSelectApp={(app) => {
              setSelectedApp(app);
              setViewMode('grid');
            }}
          />
        ) : (
          <div>
            {/* Search & Filter Controls */}
            <div className="glass-panel rounded-2xl p-4 mb-6">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search systems by name, capability, or tech stack... ('/' for quick command)"
                    className="w-full pl-10 pr-12 py-2 bg-dark-900 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  <kbd className="hidden sm:inline-flex absolute right-3 top-2 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-dark-800 rounded border border-white/10">
                    ⌘K
                  </kbd>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar text-xs font-mono">
                  <button
                    onClick={() => setCurrentCategory('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'all'
                        ? 'bg-brand-500 text-black font-bold shadow-md shadow-brand-500/10'
                        : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    All ({APPS.length})
                  </button>
                  <button
                    onClick={() => setCurrentCategory('hosted')}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'hosted'
                        ? 'bg-brand-500 text-black font-bold shadow-md shadow-brand-500/10'
                        : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    🟢 Hosted Only ({hostedApps.length})
                  </button>
                  <button
                    onClick={() => setCurrentCategory('agents')}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'agents'
                        ? 'bg-brand-500 text-black font-bold shadow-md shadow-brand-500/10'
                        : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    🤖 Agents & Dev
                  </button>
                  <button
                    onClick={() => setCurrentCategory('finance')}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'finance'
                        ? 'bg-brand-500 text-black font-bold shadow-md shadow-brand-500/10'
                        : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    📈 Financial Intel
                  </button>
                  <button
                    onClick={() => setCurrentCategory('enterprise')}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'enterprise'
                        ? 'bg-brand-500 text-black font-bold shadow-md shadow-brand-500/10'
                        : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    🏛️ Enterprise & Legal
                  </button>
                </div>

              </div>
            </div>

            {/* Application Cards Grid with Motion */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence>
                {filteredApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onPreview={(a) => {
                      setSelectedApp(a);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredApps.length === 0 && (
              <div className="text-center py-16">
                <p className="text-sm font-mono text-slate-400">No applications match your filter query.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentCategory('all');
                  }}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-dark-800 text-xs font-mono text-brand-400 border border-brand-500/20"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer Strip */}
      <footer className="glass-panel border-t border-white/10 py-6 px-4 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-brand-400" />
            <span>Built by Amit Kumar Dey (@akdey) — Zero-BS Architecture</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/akdey" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <span className="text-brand-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Vercel Edge Ready
            </span>
          </div>
        </div>
      </footer>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        apps={APPS}
        onSelectApp={(app) => setSelectedApp(app)}
      />
    </div>
  );
};

