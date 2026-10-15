import { colors } from '../constants/colors';
import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { useFeedbackPhase } from '../hooks/useFeedbackPhase';
import type { ReactNode } from 'react';
export function FeedbackFooter({ result, children }: { result?: 'success' | 'retry'; children: ReactNode }) {
  const phase = useFeedbackPhase(result ?? 'idle');
  const style = useAnimatedStyle(() => ({ backgroundColor: result ? interpolateColor(Math.min(1, phase.value / .25), [0, 1], ['#FFFFFF', result === 'success' ? colors.successSoft : colors.errorSoft]) : '#FFFFFF' }));
  return <Animated.View style={[{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, borderTopWidth: result ? 0 : 2, borderColor: result ? result === 'success' ? colors.successEdge : colors.errorEdge : colors.border }, style]}>{children}</Animated.View>;
}
export function FeedbackPanel({ correct, message, children, assessment = false }: { correct: boolean; message: string; mode: 'count' | 'algebra' | 'graph'; children?: ReactNode; assessment?:boolean }) {
  const phase = useFeedbackPhase(correct ? 'success' : 'retry');
  const entry = useAnimatedStyle(() => {
    const t = Math.min(1, phase.value / .42), eased = 1 - Math.pow(1 - t, 3);
    return { opacity: Math.min(1, phase.value / .18), transform: [{ translateY: (1 - eased) * 10 }] };
  });
  return <Animated.View style={entry}><View className="flex-row items-center gap-3 mb-2">
    <View className="flex-1 flex-row items-center gap-2"><Ionicons name={correct ? 'checkmark-circle' : 'close-circle'} size={22} color={correct ? colors.successInk : colors.errorInk} accessible={false} /><Text accessibilityLiveRegion="polite" className={`ui__instruction ${correct ? 'text-success-ink' : 'text-error-ink'}`}>{correct ? 'Nicely done!' : assessment?'Let’s review this':'Try again'}</Text></View>
  </View><ScrollView style={{ maxHeight: 112 }} contentContainerStyle={{ paddingBottom: 12 }}><Text className={`ui__body ${correct ? 'text-success-ink' : 'text-error-ink'}`}>{message}</Text>{children}</ScrollView></Animated.View>;
}
