import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { MobileDock } from './components/MobileDock';
import { LaunchpadDeck } from './components/LaunchpadDeck';
import { PortfolioMicrofrontend } from './components/PortfolioMicrofrontend';
import { ArchitectureMatrix } from './components/ArchitectureMatrix';
import { CommandPalette } from './components/CommandPalette';
import { PreviewDrawer } from './components/PreviewDrawer';
import { APPS } from './data/apps';
import { AppItem, ViewTab } from './types';
import { Github, ArrowUp, Globe, Layers, Cpu } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<ViewTab>('launchpad');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [drawerApp, setDrawerApp] = useState<AppItem | null>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const liveAppsCount = APPS.filter((a) => a.isHosted).length;

  // PWA listener
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

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setDrawerApp(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInspect = (app: AppItem) => {
    setDrawerApp(app);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#04060a] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCommand={() => setIsCommandOpen(true)}
        onInstallPwa={handleInstallPwa}
        canInstallPwa={canInstallPwa}
        totalApps={APPS.length}
        liveApps={liveAppsCount}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          {currentTab === 'launchpad' && (
            <motion.div
              key="launchpad"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <LaunchpadDeck
                apps={APPS}
                onInspect={handleInspect}
                onOpenPortfolio={() => {
                  setCurrentTab('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {currentTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <PortfolioMicrofrontend
                onSwitchToLaunchpad={() => {
                  setCurrentTab('launchpad');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {currentTab === 'matrix' && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ArchitectureMatrix apps={APPS} onInspect={handleInspect} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Footer (Hidden when in full Portfolio MFE view on mobile to maximize viewport) */}
      {currentTab !== 'portfolio' && (
        <footer className="border-t border-white/[0.08] py-8 px-4 sm:px-8 mt-12 bg-[#020408]/90 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STASH // Amit Kumar Dey (@akdey) — Micro-Frontend Launchpad</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/akdey"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/akdey</span>
              </a>
              <span>•</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* Floating Bottom Navigation Dock for Mobile (md:hidden) */}
      <MobileDock
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCommand={() => setIsCommandOpen(true)}
        totalApps={APPS.length}
      />

      {/* In-Situ Container Inspection Drawer */}
      <PreviewDrawer
        app={drawerApp}
        onClose={() => setDrawerApp(null)}
      />

      {/* Quick Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        apps={APPS}
        onSelectApp={(app) => {
          if (app.id === 'portfolio') {
            setCurrentTab('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (app.isHosted) {
            setDrawerApp(app);
          } else {
            window.open(app.githubUrl, '_blank', 'noopener,noreferrer');
          }
        }}
      />
    </div>
  );
};
