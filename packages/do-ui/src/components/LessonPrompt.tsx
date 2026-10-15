import { Text, View } from 'react-native';
import { ModeCharacter, type CompanionReaction } from './ModeCharacter';

export function LessonPrompt({ prompt, mode, reaction, withCompanion = true }: {
  prompt: string;
  mode: 'count' | 'algebra' | 'graph';
  reaction: CompanionReaction;
  withCompanion?: boolean;
}) {
  if (!withCompanion) return <Text accessibilityRole="header" className="ui__instruction text-text-primary mb-3">{prompt}</Text>;
  return <View className="flex-row items-center gap-3 mb-3">
    <ModeCharacter mode={mode} size={64} reaction={reaction}/>
    <View className="flex-1 border-2 border-border bg-white rounded-2xl px-4 py-3">
      <Text accessibilityRole="header" className="ui__card-title text-text-primary">{prompt}</Text>
    </View>
  </View>;
}
