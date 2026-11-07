export type Domain = 'agents' | 'finance' | 'enterprise' | 'personal';

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
}
