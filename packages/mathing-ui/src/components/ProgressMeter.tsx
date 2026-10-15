import { colors } from '../constants/colors';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export function ProgressMeter({ percent, label, ring = false }: { percent: number; label: string; ring?: boolean }) {
  const value = Math.max(0, Math.min(100, percent));
  return <View accessibilityRole="progressbar" accessibilityLabel={label} accessibilityValue={{ min: 0, max: 100, now: value }} className={ring ? 'items-center justify-center' : 'w-full'}>
    {ring ? <View className="w-32 h-32 items-center justify-center"><Svg width={128} height={128} viewBox="0 0 128 128" aria-hidden={true}>
      <Circle cx={64} cy={64} r={54} stroke={colors.border} strokeWidth={12} fill="none"/>
      <Circle cx={64} cy={64} r={54} opacity={value>0?1:0} stroke={colors.brand} strokeWidth={12} fill="none" strokeDasharray={`${value / 100 * 339.292} 339.292`} strokeLinecap="round" rotation={-90} origin="64,64"/>
    </Svg><View className="absolute items-center"><Text className="font-poppins-bold text-3xl text-text-primary">{value}%</Text></View></View>
      : <View className="h-3 rounded-full overflow-hidden bg-border"><View className="h-full rounded-full bg-brand" style={{ width: `${value}%` }}/></View>}
  </View>;
}
