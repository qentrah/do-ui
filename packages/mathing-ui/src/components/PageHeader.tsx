import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MotionPressable } from './Motion';

export function PageHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  return <View className="bg-white"><View className="w-full max-w-[520px] self-center flex-row items-center px-4 py-2">
    {onBack && <MotionPressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} className="w-11 h-11 items-center justify-center"><Ionicons name="chevron-back" size={24} color={colors.brandText}/></MotionPressable>}
    <Text accessibilityRole="header" className="ui__card-title text-text-primary flex-1 ml-2">{title}</Text>
  </View></View>;
}
