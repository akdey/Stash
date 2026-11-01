import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Cpu, Database, ExternalLink } from 'lucide-react';
import { AppItem } from '../types';

interface TopologyViewProps {
  apps: AppItem[];
  onSelectApp: (app: AppItem) => void;
}

export const TopologyView: React.FC<TopologyViewProps> = ({ apps, onSelectApp }) => {
  const tiers = [
    {
      title: "1. Data Ingestion & Real-Time Crawlers",
      subtitle: "Autonomous market scraping, CAS statement parsing & social streams",
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      appIds: ["smoke-recon", "echo", "grip"]
    },
    {
      title: "2. Governance, Security & ContextOps",
      subtitle: "Deterministic firewalls, air-gapped FPE anonymization & agent approval hooks",
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
      appIds: ["heyhuman", "aicontrolpanel", "docshield", "kaps"]
    },
    {
      title: "3. Multi-Agent Reasoning & Synthesis",
      subtitle: "8-agent architecture councils, dialectic debates & adversarial legal sim",
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      appIds: ["blueprint", "alphastream", "verdictlab", "devopsdebugger", "botster"]
    },
    {
      title: "4. Production Command Planes & PWAs",
      subtitle: "Zero-billing architectures, trading ERPs & personal sovereign tools",
      icon: <Layers className="w-4 h-4 text-sky-400" />,
      appIds: ["portfolio", "bluestar", "molat", "opengym", "besttake", "luminapath", "apekstyle"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="glass-panel p-5 rounded-2xl border border-white/10">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" />
          <span>Macro System Architecture & Flow Topology</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visual mapping demonstrating how independent microservices, agent councils, and client PWAs interconnect across your engineering portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tiers.map((tier, idx) => {
          const tierApps = tier.appIds
            .map((id) => apps.find((a) => a.id === id))
            .filter((a): a is AppItem => Boolean(a));

          return (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-dark-800 border border-white/5">
                    {tier.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{tier.title}</h4>
                </div>
                <p className="text-xs text-slate-400 font-mono mb-4">{tier.subtitle}</p>

                <div className="space-y-2.5">
                  {tierApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-3 rounded-xl bg-dark-850 hover:bg-dark-800 border border-white/5 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl flex-shrink-0">{app.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white truncate">{app.name}</span>
                            {app.isHosted && (
                              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse flex-shrink-0"></span>
                            )}
                          </div>
                          <p className="text-[11px] font-mono text-cyan-400 truncate">{app.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={app.isHosted ? app.hostedUrl : app.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-dark-750 hover:bg-dark-700 text-[11px] font-mono text-slate-200 border border-white/10 inline-flex items-center gap-1"
                        >
                          <span>{app.isHosted ? 'Live' : 'Code'}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>{tierApps.length} Components</span>
                <span>Tier 0{idx + 1} Orchestration</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

