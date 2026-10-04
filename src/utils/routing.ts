export type AppView =
  | 'home'
  | 'about'
  | 'ai'
  | 'cyberverse'
  | 'exception-manager'
  | 'threatforge'
  | 'soc-ai'
  | 'threat-collector'
  | 'training'
  | 'compliance'
  | 'vapt'
  | 'iso-27001'
  | 'soc-2'
  | 'cloud-security'
  | 'ai-security'
  | 'dpdp-compliance'
  | 'resources'
  | 'not-found';

const viewPaths: Record<Exclude<AppView, 'not-found'>, string> = {
  home: '/',
  about: '/about',
  ai: '/ai',
  cyberverse: '/cyberverse',
  'exception-manager': '/exception-manager',
  threatforge: '/threatforge',
  'soc-ai': '/soc-ai',
  'threat-collector': '/threat-collector',
  training: '/training',
  compliance: '/compliance',
  vapt: '/vapt',
  'iso-27001': '/iso-27001',
  'soc-2': '/soc-2',
  'cloud-security': '/cloud-security',
  'ai-security': '/ai-security',
  'dpdp-compliance': '/dpdp-compliance',
  resources: '/resources',
};

const pathViews = Object.fromEntries(
  Object.entries(viewPaths).map(([view, path]) => [path, view]),
) as Record<string, Exclude<AppView, 'not-found'>>;

const hashViews: Record<string, Exclude<AppView, 'not-found'>> = {
  '#about': 'about',
  '#about-us': 'about',
  '#company': 'about',
  '#ai': 'ai',
  '#cyberrange': 'cyberverse',
  '#cyberverse': 'cyberverse',
  '#exception-manager': 'exception-manager',
  '#threatforge': 'threatforge',
  '#soc-ai': 'soc-ai',
  '#soc': 'soc-ai',
  '#threat-collector': 'threat-collector',
  '#misp': 'threat-collector',
  '#training': 'training',
  '#compliance': 'compliance',
  '#vapt': 'vapt',
  '#iso27001': 'iso-27001',
  '#iso-27001': 'iso-27001',
  '#soc2': 'soc-2',
  '#soc-2': 'soc-2',
  '#cloud-security': 'cloud-security',
  '#ai-security': 'ai-security',
  '#dpdp': 'dpdp-compliance',
  '#dpdp-compliance': 'dpdp-compliance',
  '#resources': 'resources',
  '#blog': 'resources',
};

export function resolveAppView(pathname: string, hash = ''): AppView {
  const normalizedPath = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  const pathView = pathViews[normalizedPath];
  if (pathView) return pathView;

  const normalizedHash = hash.toLowerCase();
  const hashView = hashViews[normalizedHash] ?? hashViews[normalizedHash.replace(/^#\//, '#')];
  if (hashView) return hashView;

  return normalizedPath === '/' ? 'home' : 'not-found';
}

export function pathForView(view: string): string | undefined {
  return view in viewPaths ? viewPaths[view as Exclude<AppView, 'not-found'>] : undefined;
}
