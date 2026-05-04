export type Persona = 'hub' | 'wayne' | 'luna';

export function usePersona(): Persona {
  const hostname = window.location.hostname;
  const params = new URLSearchParams(window.location.search);

  // Dev override: ?persona=wayne or ?persona=luna
  const devOverride = params.get('persona') as Persona | null;
  if (devOverride && ['hub', 'wayne', 'luna'].includes(devOverride)) {
    return devOverride;
  }

  if (hostname.startsWith('wayne')) return 'wayne';
  if (hostname.startsWith('luna')) return 'luna';
  return 'hub';
}
