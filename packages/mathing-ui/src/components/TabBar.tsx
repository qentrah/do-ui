import { Text, View } from 'react-native';
import { MathArtwork, type MathArtworkName } from './MathArtwork';
import { MotionPressable } from './Motion';

export type UITab = { key: string; label: string; artwork: MathArtworkName };
export function TabBar({ items, selectedKey, onChange }: { items: UITab[]; selectedKey: string; onChange: (key: string) => void }) {
  return <View accessibilityRole="tablist" className="flex-row border-t-2 border-border bg-white">
    {items.map(item => <MotionPressable key={item.key} containerStyle={{ flex: 1 }} accessibilityRole="tab" accessibilityLabel={item.label}
      aria-selected={selectedKey === item.key} accessibilityState={{ selected: selectedKey === item.key }} onPress={() => onChange(item.key)} className="min-h-20 items-center justify-center gap-1 py-2">
      <View className={`w-11 h-11 rounded-xl border-2 items-center justify-center ${selectedKey === item.key ? 'border-selection bg-selection-soft' : 'border-transparent'}`}><MathArtwork name={item.artwork} size={32}/></View>
      <Text className="ui__body-small text-text-primary text-center">{item.label}</Text>
    </MotionPressable>)}
  </View>;
}
