export type Persona = 'hub' | 'wayne' | 'luna' | 'log' | 'future';

export function usePersona(): Persona {
  const hostname = window.location.hostname;
  const params = new URLSearchParams(window.location.search);

  // Dev override: ?persona=wayne / ?persona=luna / ?persona=log / ?persona=future
  const devOverride = params.get('persona') as Persona | null;
  if (devOverride && ['hub', 'wayne', 'luna', 'log', 'future'].includes(devOverride)) {
    return devOverride;
  }

  if (hostname.startsWith('wayne')) return 'wayne';
  if (hostname.startsWith('luna')) return 'luna';
  if (hostname.startsWith('log')) return 'log';
  if (hostname.startsWith('future')) return 'future';
  return 'hub';
}
