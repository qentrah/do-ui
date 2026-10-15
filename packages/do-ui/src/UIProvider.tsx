import { createContext, useContext, type ReactNode } from 'react';

export type UIOptions = { animations: boolean };
const Options = createContext<UIOptions>({ animations: true });

/** Optional presentation preferences only. No app stores, accounts, or persistence. */
export function UIProvider({ children, animations = true }: { children: ReactNode; animations?: boolean }) {
  return <Options.Provider value={{ animations }}>{children}</Options.Provider>;
}
export function useUIOptions() { return useContext(Options); }
