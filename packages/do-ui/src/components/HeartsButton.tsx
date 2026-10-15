import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MotionPressable } from './Motion';

export type HeartsButtonProps = { hearts: number; maximum?: number; loading?: boolean; onPress?: () => void };
export function HeartsButton({ hearts, maximum = 5, loading = false, onPress }: HeartsButtonProps) {
  return <MotionPressable accessibilityRole="button" accessibilityLabel={loading ? 'Loading hearts' : `${hearts} of ${maximum} hearts`}
    onPress={onPress} disabled={!onPress || loading} className="min-h-11 min-w-11 flex-row items-center justify-center gap-1 px-1">
    <Ionicons name="heart" size={22} color={colors.heart} accessible={false}/><Text className="font-poppins-bold text-xl text-heart">{loading ? '…' : hearts}</Text>
  </MotionPressable>;
}
