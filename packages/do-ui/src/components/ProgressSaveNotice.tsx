import { Text, View } from 'react-native';
import { Action } from './MathUI';

export function ProgressSaveNotice({ error, onRetry }: { error?: string | null; onRetry?: () => void }) {
  if (!error) return null;
  return <View accessibilityLiveRegion="polite" className="gap-3 p-4 bg-error-soft rounded-xl mt-4">
    <Text className="ui__body text-error-ink">{error}</Text>{onRetry && <Action secondary label="Retry saving" onPress={onRetry}/>}
  </View>;
}
