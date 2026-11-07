export type Domain = 'agents' | 'finance' | 'enterprise' | 'personal';

export type ArchitectureTier =
  | 'Frontend PWA'
  | 'Full-Stack Agent'
  | 'CLI / Engine'
  | 'VS Code Extension'
  | 'MCP / Gateway';

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: Domain;
  isHosted: boolean;
  hostedUrl?: string;
  githubUrl: string;
  badges: string[];
  icon: string;
  featured?: boolean;
  architectureTier: ArchitectureTier;
  keyMetric: string;
}

export type ViewTab = 'launchpad' | 'portfolio' | 'matrix';
