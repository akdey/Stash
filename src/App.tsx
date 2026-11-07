import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PortfolioMicrofrontend } from './components/PortfolioMicrofrontend';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ProjectDirectory } from './components/ProjectDirectory';
import { CommandPalette } from './components/CommandPalette';
import { PreviewDrawer } from './components/PreviewDrawer';
import { APPS } from './data/apps';
import { AppItem } from './types';
import { Github, ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [drawerApp, setDrawerApp] = useState<AppItem | null>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

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

  const scrollToSystems = () => {
    const el = document.getElementById('featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInspect = (app: AppItem) => {
    setDrawerApp(app);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-black text-slate-200 selection:bg-emerald-500 selection:text-black">
      <Header
        onOpenCommand={() => setIsCommandOpen(true)}
        onInstallPwa={handleInstallPwa}
        canInstallPwa={canInstallPwa}
      />

      <main className="flex-1 w-full">
        {/* Hero: Live Portfolio Microfrontend */}
        <PortfolioMicrofrontend onScrollDown={scrollToSystems} />

        {/* Featured Projects — the marquee work */}
        <FeaturedProjects apps={APPS} onInspect={handleInspect} />

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <hr className="border-white/[0.06]" />
        </div>

        {/* Full Project Directory — grouped by domain */}
        <ProjectDirectory apps={APPS} onInspect={handleInspect} />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-4 lg:px-8 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>STASH — Amit Kumar Dey (@akdey)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/akdey"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/akdey</span>
            </a>
            <span>·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Preview Drawer */}
      <PreviewDrawer
        app={drawerApp}
        onClose={() => setDrawerApp(null)}
      />

      {/* Command Palette */}
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
