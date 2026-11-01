export type Category = 'all' | 'hosted' | 'agents' | 'finance' | 'enterprise' | 'culture';

export type ViewMode = 'grid' | 'table' | 'topology';

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'agents' | 'finance' | 'enterprise' | 'culture';
  isHosted: boolean;
  hostedUrl?: string;
  githubUrl: string;
  badges: string[];
  icon: string;
  architectureTier: 'Frontend PWA' | 'Full-Stack Agent' | 'CLI / Engine' | 'VS Code Extension' | 'MCP / Gateway';
  keyMetric: string;
}
