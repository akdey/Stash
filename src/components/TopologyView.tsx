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
      title: "1. Data Ingestion, Forensics & Crawlers",
      subtitle: "Autonomous stealth web crawling, CAS statement parsing & social sentiment stream",
      icon: <Database className="w-4 h-4 text-cyber-emerald" />,
      appIds: ["hawk", "smoke-recon", "echo", "grip"]
    },
    {
      title: "2. Governance, Security & ContextOps",
      subtitle: "Deterministic firewalls, air-gapped FPE anonymization & agent approval hooks",
      icon: <ShieldCheck className="w-4 h-4 text-cyber-cyan" />,
      appIds: ["heyhuman", "aicontrolpanel", "docshield", "kaps"]
    },
    {
      title: "3. Multi-Agent Reasoning & Synthesis",
      subtitle: "8-agent architecture councils, dialectic debates & adversarial legal sim",
      icon: <Cpu className="w-4 h-4 text-cyber-indigo" />,
      appIds: ["blueprint", "alphastream", "verdictlab", "devopsdebugger", "botster"]
    },
    {
      title: "4. Production Command Planes & PWAs",
      subtitle: "Zero-billing architectures, trading ERPs & personal sovereign tools",
      icon: <Layers className="w-4 h-4 text-cyber-sky" />,
      appIds: ["portfolio", "bluestar", "molat", "opengym", "besttake", "luminapath", "apekstyle"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="cyber-panel p-6 rounded-2xl border border-white/10 laser-border-cyan">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyber-cyan" />
          <span>Macro System Architecture & Dataflow Topology</span>
        </h3>
        <p className="text-xs text-slate-300 mt-1 font-mono">
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
              className="cyber-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-2 rounded-lg bg-void-950 border border-white/10">
                    {tier.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{tier.title}</h4>
                </div>
                <p className="text-xs text-slate-400 font-mono mb-5">{tier.subtitle}</p>

                <div className="space-y-2.5">
                  {tierApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-3.5 rounded-xl bg-void-950/70 hover:bg-void-900 border border-white/5 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl flex-shrink-0">{app.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white truncate">{app.name}</span>
                            {app.isHosted && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse flex-shrink-0"></span>
                            )}
                          </div>
                          <p className="text-[11px] font-mono text-cyber-cyan truncate">{app.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={app.isHosted ? app.hostedUrl : app.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-3 py-1 rounded-lg text-[11px] font-mono inline-flex items-center gap-1 transition-all ${
                            app.isHosted
                              ? 'bg-cyber-emerald text-black font-bold hover:bg-cyber-mint shadow-sm'
                              : 'bg-void-850 hover:bg-void-800 text-slate-200 border border-white/10'
                          }`}
                        >
                          <span>{app.isHosted ? 'Host ↗' : 'Code ↗'}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>{tierApps.length} Integrated Pods</span>
                <span>Tier 0{idx + 1} Architecture</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
