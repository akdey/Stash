import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PortfolioMicrofrontend } from './components/PortfolioMicrofrontend';
import { ProjectShowcase } from './components/ProjectShowcase';
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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null);

  // Audio synthesizer
  const playMechanicalSound = (freq = 800) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {
      // AudioContext unavailable
    }
  };

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
    playMechanicalSound(1000);
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
        playMechanicalSound(900);
        setIsCommandOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setDrawerApp(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  const scrollToSystems = () => {
    playMechanicalSound(700);
    const el = document.getElementById('systems');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-black text-slate-200 selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <Header
        onOpenCommand={() => {
          playMechanicalSound(900);
          setIsCommandOpen(true);
        }}
        onInstallPwa={handleInstallPwa}
        canInstallPwa={canInstallPwa}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Flow */}
      <main className="flex-1 w-full">
        {/* Fullscreen Initial View: Live Portfolio Microfrontend */}
        <PortfolioMicrofrontend onScrollDown={scrollToSystems} />

        {/* Next Projects Section with Smooth Scroll Animations & Zero Clutter */}
        <ProjectShowcase
          apps={APPS}
          highlightedId={highlightedProjectId}
          onInspect={(app) => {
            playMechanicalSound(1000);
            setDrawerApp(app);
          }}
        />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 py-8 px-4 lg:px-8 mt-16 bg-zinc-950/80">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>STASH // Amit Kumar Dey (@akdey) — Micro-Frontend Launchpad</span>
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
            <span>•</span>
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

      {/* In-Situ Preview Drawer */}
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
