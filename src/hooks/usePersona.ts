export type Persona = 'hub' | 'wayne' | 'luna' | 'log';

export function usePersona(): Persona {
  const hostname = window.location.hostname;
  const params = new URLSearchParams(window.location.search);

  // Dev override: ?persona=wayne / ?persona=luna / ?persona=log
  const devOverride = params.get('persona') as Persona | null;
  if (devOverride && ['hub', 'wayne', 'luna', 'log'].includes(devOverride)) {
    return devOverride;
  }

  if (hostname.startsWith('wayne')) return 'wayne';
  if (hostname.startsWith('luna')) return 'luna';
  if (hostname.startsWith('log')) return 'log';
  return 'hub';
}
