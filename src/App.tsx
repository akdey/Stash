import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Github, Radio, CheckCircle2, SlidersHorizontal, Activity } from 'lucide-react';
import { Header } from './components/Header';
import { PortfolioSpotlight } from './components/PortfolioSpotlight';
import { AppCard } from './components/AppCard';
import { TableView } from './components/TableView';
import { TopologyView } from './components/TopologyView';
import { CommandPalette } from './components/CommandPalette';
import { PreviewDrawer } from './components/PreviewDrawer';
import { APPS } from './data/apps';
import { AppItem, Category, ViewMode } from './types';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<Category>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [drawerApp, setDrawerApp] = useState<AppItem | null>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const hostedApps = APPS.filter((a) => a.isHosted);

  // Subtle mechanical sound synthesizer via Web Audio API
  const playMechanicalSound = (freq = 800) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

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
    playMechanicalSound(1000);
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstallPwa(false);
    }
    setDeferredPrompt(null);
  };

  // Keyboard shortcut listener (Cmd+K or / or Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playMechanicalSound(900);
        setIsCommandOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        playMechanicalSound(900);
        setIsCommandOpen(true);
      } else if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setDrawerApp(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

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
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyber-emerald selection:text-black">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        setViewMode={(m) => {
          playMechanicalSound(850);
          setViewMode(m);
        }}
        onOpenCommand={() => {
          playMechanicalSound(900);
          setIsCommandOpen(true);
        }}
        onInstallPwa={handleInstallPwa}
        canInstallPwa={canInstallPwa}
        hostedCount={hostedApps.length}
        totalCount={APPS.length}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        
        {/* Executive Portfolio Spotlight & Flagship Flight Deck */}
        <PortfolioSpotlight
          flagshipApps={hostedApps}
          onOpenPreviewDrawer={(app) => {
            playMechanicalSound(1100);
            setDrawerApp(app);
          }}
        />

        {/* View Mode Switcher Router */}
        {viewMode === 'topology' ? (
          <TopologyView
            apps={APPS}
            onSelectApp={(app) => {
              playMechanicalSound(800);
              setViewMode('grid');
            }}
          />
        ) : (
          <div>
            {/* Tactical Filter & Search Bar */}
            <div className="cyber-panel rounded-2xl p-4 mb-6">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search systems, models, capabilities or tags... ('/' for quick command)"
                    className="w-full pl-10 pr-12 py-2 bg-void-950 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors"
                  />
                  <kbd className="hidden sm:inline-flex absolute right-3 top-2 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-void-900 rounded border border-white/10">
                    ⌘K
                  </kbd>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar text-xs font-mono">
                  <button
                    onClick={() => {
                      playMechanicalSound(750);
                      setCurrentCategory('all');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'all'
                        ? 'bg-cyber-emerald text-black font-bold shadow-sm shadow-cyber-emerald/20'
                        : 'bg-void-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    All Systems ({APPS.length})
                  </button>
                  <button
                    onClick={() => {
                      playMechanicalSound(750);
                      setCurrentCategory('hosted');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'hosted'
                        ? 'bg-cyber-emerald text-black font-bold shadow-sm shadow-cyber-emerald/20'
                        : 'bg-void-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-emerald mr-1.5 animate-pulse"></span>
                    Hosted ({hostedApps.length})
                  </button>
                  <button
                    onClick={() => {
                      playMechanicalSound(750);
                      setCurrentCategory('agents');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'agents'
                        ? 'bg-cyber-emerald text-black font-bold shadow-sm shadow-cyber-emerald/20'
                        : 'bg-void-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    🦅 Forensics & Agents
                  </button>
                  <button
                    onClick={() => {
                      playMechanicalSound(750);
                      setCurrentCategory('finance');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'finance'
                        ? 'bg-cyber-emerald text-black font-bold shadow-sm shadow-cyber-emerald/20'
                        : 'bg-void-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    📈 Quant & Markets
                  </button>
                  <button
                    onClick={() => {
                      playMechanicalSound(750);
                      setCurrentCategory('enterprise');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      currentCategory === 'enterprise'
                        ? 'bg-cyber-emerald text-black font-bold shadow-sm shadow-cyber-emerald/20'
                        : 'bg-void-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    🏛️ Enterprise & Defense
                  </button>
                </div>

              </div>
            </div>

            {/* Render Grid Mode vs Table Mode */}
            {viewMode === 'table' ? (
              <TableView
                apps={filteredApps}
                onInspect={(a) => {
                  playMechanicalSound(1100);
                  setDrawerApp(a);
                }}
              />
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                <AnimatePresence>
                  {filteredApps.map((app, idx) => (
                    <AppCard
                      key={app.id}
                      app={app}
                      index={idx}
                      onInspect={(a) => {
                        playMechanicalSound(1100);
                        setDrawerApp(a);
                      }}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Empty State */}
            {filteredApps.length === 0 && (
              <div className="text-center py-16 cyber-panel rounded-2xl">
                <p className="text-xs font-mono text-slate-400">No architectural systems match your filter query.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentCategory('all');
                  }}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-void-900 text-xs font-mono text-cyber-cyan border border-cyber-cyan/20"
                >
                  Reset Query
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer Strip */}
      <footer className="bg-void-950 border-t border-white/10 py-5 px-4 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyber-emerald" />
            <span>STASH // Amit Kumar Dey (@akdey) — Zero-BS Architecture</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/akdey" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Github className="w-3.5 h-3.5" />
              <span>github.com/akdey</span>
            </a>
            <span>•</span>
            <span className="text-cyber-emerald flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Edge Verified
            </span>
          </div>
        </div>
      </footer>

      {/* Slide-Over Preview Drawer (for in-situ live test drive) */}
      <PreviewDrawer
        app={drawerApp}
        onClose={() => setDrawerApp(null)}
      />

      {/* Raycast Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        apps={APPS}
        onSelectApp={(app) => {
          if (app.isHosted) {
            setDrawerApp(app);
          } else {
            window.open(app.githubUrl, '_blank', 'noopener,noreferrer');
          }
        }}
      />
    </div>
  );
};
