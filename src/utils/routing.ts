export type AppView =
  | 'home'
  | 'about'
  | 'ai'
  | 'cyberverse'
  | 'exception-manager'
  | 'training'
  | 'compliance'
  | 'not-found';

const viewPaths: Record<Exclude<AppView, 'not-found'>, string> = {
  home: '/',
  about: '/about',
  ai: '/ai',
  cyberverse: '/cyberverse',
  'exception-manager': '/exception-manager',
  training: '/training',
  compliance: '/compliance',
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
  '#training': 'training',
  '#compliance': 'compliance',
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
