import { CompletedMedal } from './CompletedMedal';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MotionPressable } from './Motion';

function arc(start: number, sweep: number) {
  const point = (angle: number) => {
    const radians = (angle - 90) * Math.PI / 180;
    return [48 + 43 * Math.cos(radians), 48 + 43 * Math.sin(radians)];
  };
  const [x1, y1] = point(start), [x2, y2] = point(start + sweep);
  return `M${x1} ${y1} A43 43 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

type Props = {
  label: string; passed: number; total: number; studied: number; videoTotal: number;
  active: boolean; expanded: boolean; locked: boolean; onPress: () => void;
};
export function PathNode({ label, passed, total, studied, videoTotal, active, expanded, locked, onPress }: Props) {
  const done = total > 0 && passed === total;
  const segments = videoTotal > 0
    ? [{ start: 5, sweep: 170, progress: total ? passed / total : 0, color: colors.brand }, { start: 185, sweep: 170, progress: studied / videoTotal, color: colors.selection }]
    : [{ start: 5, sweep: 350, progress: total ? passed / total : 0, color: colors.brand }];
  const showRing = active || expanded || passed > 0 || studied > 0;
  return <View className="items-center">
    {active && !expanded && <View pointerEvents="none" className="absolute -top-7 z-10 items-center">
      <View className="bg-white border-2 border-border rounded-xl px-3 py-2"><Text className="ui__label text-brand-text">START</Text></View>
      <View className="w-3 h-3 bg-white border-b-2 border-r-2 border-border -mt-2" style={{transform:[{rotate:'45deg'}]}}/>
    </View>}
    <MotionPressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ expanded }} onPress={onPress} className="w-24 h-24 items-center justify-center">
      {showRing&&!done&&<Svg aria-hidden={true} pointerEvents="none" width={96} height={96} viewBox="0 0 96 96" style={{ position:'absolute' }}>
        {segments.map(segment => <Path key={`track-${segment.start}`} d={arc(segment.start,segment.sweep)} fill="none" stroke={colors.border} strokeWidth={6} strokeLinecap="round"/>)}
        {segments.map(segment => {
          const progress = segment.progress;
          return progress > 0 ? <Path key={`fill-${segment.start}`} d={arc(segment.start,segment.sweep*progress)} fill="none" stroke={segment.color} strokeWidth={6} strokeLinecap="round"/> : null;
        })}
      </Svg>}
      <>{done?<CompletedMedal/>:<View className={`w-[70px] h-[62px] rounded-full border-b-[8px] items-center justify-center ${locked?'bg-border border-outline':'bg-brand border-brand-edge'}`}>
        <Ionicons name={locked?'lock-closed':'star'} size={32} color={locked?colors.outline:colors.white} accessible={false}/>
      </View>}</>
    </MotionPressable>
  </View>;
}
