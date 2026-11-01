import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal as TerminalIcon, Sparkles, ArrowRight } from 'lucide-react';
import { AppItem } from '../types';

interface HeroTerminalProps {
  apps: AppItem[];
  onSelectProject: (projectId: string) => void;
  onScrollToProjects: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const HeroTerminal: React.FC<HeroTerminalProps> = ({
  apps,
  onSelectProject,
  onScrollToProjects,
}) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'welcome',
      command: 'init stash',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-white font-medium">
            STASH // Unified Architecture & Micro-Frontend Hub
          </p>
          <p className="text-xs text-slate-400">
            Architect: <span className="text-emerald-400 font-semibold">Amit Kumar Dey</span> (@akdey) — Full-Stack AI & Systems Architect
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Type <span className="text-cyan-400 font-mono font-medium">'projects'</span> or a system name (e.g. <span className="text-cyan-400 font-mono">'hawk'</span>, <span className="text-cyan-400 font-mono">'bluestar'</span>, <span className="text-cyan-400 font-mono">'smoke-recon'</span>) to navigate, or scroll down to explore.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal log
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newId = String(Date.now());

    if (cmd === 'clear') {
      setLogs([]);
      setInput('');
      return;
    }

    if (cmd === 'help') {
      setLogs((prev) => [
        ...prev,
        {
          id: newId,
          command: rawCmd,
          output: (
            <div className="space-y-1 text-xs font-mono text-slate-300">
              <p className="text-emerald-400 font-bold mb-1">Available Terminal Commands:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <div><span className="text-cyan-400">projects</span> — Jump to all projects showcase</div>
                <div><span className="text-cyan-400">about</span> — System ethos & background</div>
                <div><span className="text-cyan-400">hosted</span> — Show only live hosted deployments</div>
                <div><span className="text-cyan-400">clear</span> — Clear terminal output</div>
                <div><span className="text-cyan-400">&lt;project_name&gt;</span> — Jump directly to any project</div>
              </div>
            </div>
          ),
        },
      ]);
      setInput('');
      return;
    }

    if (cmd === 'about') {
      setLogs((prev) => [
        ...prev,
        {
          id: newId,
          command: rawCmd,
          output: (
            <div className="text-xs text-slate-300 space-y-1 font-mono">
              <p className="text-white font-semibold">Amit Kumar Dey — Full-Stack AI & Systems Architect</p>
              <p className="text-slate-400 leading-relaxed">
                Specialized in Agentic AI platforms, high-performance web frontends (React Flow, Vite, Next.js), and Python/FastAPI backend runtimes with LangChain & LangFlow orchestration.
              </p>
            </div>
          ),
        },
      ]);
      setInput('');
      return;
    }

    if (cmd === 'projects' || cmd === 'ls' || cmd === 'all') {
      setLogs((prev) => [
        ...prev,
        {
          id: newId,
          command: rawCmd,
          output: (
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
              <span>Navigating to projects deck...</span>
            </div>
          ),
        },
      ]);
      setInput('');
      setTimeout(() => onScrollToProjects(), 200);
      return;
    }

    // Check if command matches an app ID or name
    const foundApp = apps.find(
      (a) =>
        a.id.toLowerCase() === cmd ||
        a.name.toLowerCase().includes(cmd) ||
        cmd.includes(a.id.toLowerCase())
    );

    if (foundApp) {
      setLogs((prev) => [
        ...prev,
        {
          id: newId,
          command: rawCmd,
          output: (
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <p className="text-cyan-400 font-semibold">{foundApp.name} ({foundApp.tagline})</p>
              <p className="text-slate-400">{foundApp.description}</p>
              <p className="text-emerald-400">Jumping to {foundApp.name} below...</p>
            </div>
          ),
        },
      ]);
      setInput('');
      setTimeout(() => {
        onSelectProject(foundApp.id);
      }, 250);
      return;
    }

    // Unknown command
    setLogs((prev) => [
      ...prev,
      {
        id: newId,
        command: rawCmd,
        output: (
          <p className="text-xs font-mono text-rose-400">
            command not found: '{rawCmd}'. Type 'help' or 'projects'.
          </p>
        ),
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-10 pb-8 px-4 lg:px-8">
      {/* Background Ambient Cyber Grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        {/* Architect Sub-headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center sm:text-left mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PORTFOLIO & SYSTEM LAUNCHPAD</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Amit Kumar Dey
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-mono max-w-2xl leading-relaxed">
            Full-Stack AI Developer & Systems Architect. Building autonomous agent systems, live market intelligence runtimes, and zero-overhead micro-frontends.
          </p>
        </motion.div>

        {/* Live Interactive Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="w-full rounded-2xl bg-zinc-950/90 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Titlebar */}
          <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-slate-300 font-medium">amit@stash: ~</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 hidden sm:flex">
              <span>Interactive Console</span>
              <span>•</span>
              <span>type 'projects' to jump</span>
            </div>
          </div>

          {/* Terminal Scroll Stream */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm max-h-[300px] sm:max-h-[360px] overflow-y-auto space-y-3 custom-scrollbar"
          >
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400 font-medium">
                  <span className="text-cyan-400">amit@stash:~$</span>
                  <span className="text-emerald-300">{log.command}</span>
                </div>
                <div className="pl-4 border-l border-zinc-800 text-slate-200">
                  {log.output}
                </div>
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm pt-1">
              <span className="text-cyan-400 shrink-0 font-medium">amit@stash:~$</span>
              <div className="relative flex-1 flex items-center min-w-0">
                <span className="text-emerald-300 font-mono whitespace-pre">{input}</span>
                <span className="inline-block w-2 sm:w-2.5 h-4 bg-emerald-400 animate-pulse ml-0.5 align-middle select-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 opacity-0 cursor-text w-full bg-transparent"
                  autoFocus
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  placeholder="type command..."
                />
              </div>
            </div>
          </div>

          {/* Quick Command Suggestions at Bottom of Terminal */}
          <div className="px-4 py-2 bg-zinc-900/50 border-t border-white/5 flex items-center justify-between gap-2 overflow-x-auto text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 shrink-0">Quick triggers:</span>
            <div className="flex items-center gap-2">
              {['projects', 'hawk', 'bluestar', 'smoke-recon', 'about', 'help'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommand(cmd);
                  }}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 hover:text-emerald-300 text-slate-300 transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        onClick={onScrollToProjects}
        className="mx-auto flex flex-col items-center gap-1.5 cursor-pointer group text-slate-400 hover:text-white transition-colors select-none mt-6"
      >
        <span className="text-xs font-mono tracking-wider uppercase text-slate-500 group-hover:text-emerald-400 transition-colors">
          Scroll to explore systems
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
