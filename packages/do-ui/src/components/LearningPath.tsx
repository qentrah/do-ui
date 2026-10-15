import { Text, View } from 'react-native';
import { MathScreen } from './MathUI';
import { PathNode } from './PathNode';
import { ChestArtwork } from './ChestArtwork';

export type PathStep = { id: string; title: string; passed: number; total: number; studied?: number; videoTotal?: number; current?: boolean; locked?: boolean };
/** Access and mastery are supplied by the host. The library performs no unlocking. */
export default function LearningPath({ title, steps, selectedId, onSelect }: { title: string; steps: PathStep[]; selectedId?: string; onSelect: (id: string) => void }) {
  return <MathScreen><View className="bg-brand rounded-2xl p-4 mb-6"><Text accessibilityRole="header" className="ui__instruction text-brand-ink">{title}</Text></View>
    <View className="items-center gap-4 py-6">{steps.map((step, index) => <View key={step.id} style={{ transform: [{ translateX: [24,0,-32,0][index % 4] }] }}>
      <PathNode label={step.title} passed={step.passed} total={step.total} studied={step.studied ?? 0} videoTotal={step.videoTotal ?? 0}
        active={!!step.current} expanded={selectedId === step.id} locked={!!step.locked} onPress={() => onSelect(step.id)}/>
    </View>)}<ChestArtwork size={96}/></View>
  </MathScreen>;
}
