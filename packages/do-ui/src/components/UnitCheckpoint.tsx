import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MotionPressable } from './Motion';

export type UnitCheckpointProps = { title?: string; passed: boolean; available: boolean; completed: number; total: number; requirement?: string; onPress: () => void };
export function UnitCheckpoint({ title = 'Unit checkpoint', passed, available, completed, total, requirement, onPress }: UnitCheckpointProps) {
  return <MotionPressable accessibilityRole="button" accessibilityLabel={`${title}. ${passed ? 'Passed' : available ? 'Available' : 'Locked'}. ${requirement ?? ''}`}
    onPress={onPress} className={`border-2 rounded-2xl p-4 gap-3 ${passed ? 'border-success-edge' : available ? 'border-selection' : 'border-border'}`}>
    <View className="flex-row items-center gap-3"><Ionicons name={passed ? 'trophy' : 'trophy-outline'} size={30} color={passed ? colors.successEdge : colors.selection}/>
      <View className="flex-1"><Text className="ui__card-title text-text-primary">{title}</Text><Text className="ui__body-small text-text-secondary">{completed} / {total} required lessons passed</Text></View>
    </View>{requirement && <Text className="ui__body-small text-text-secondary">{requirement}</Text>}
  </MotionPressable>;
}
