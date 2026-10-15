import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useUIOptions } from '../UIProvider';

export function useMotion() {
  const { animations } = useUIOptions();
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled().then(value => { if (mounted) setReduced(value); }).catch(() => {});
    const listener = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => { mounted = false; listener.remove(); };
  }, []);
  return animations && !reduced;
}
