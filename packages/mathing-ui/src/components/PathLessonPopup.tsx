import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { Action } from './MathUI';
import { MotionPressable } from './Motion';

/** Anchored to the selected node. It overlays the path without moving later nodes. */
export function PathLessonPopup({title,detail,offset,watch,onClose,onStart,locked}: {
  title:string;detail:string;offset:number;watch?:()=>void;onClose:()=>void;onStart:()=>void;locked:boolean;
}) {
  return <View onAccessibilityEscape={onClose} className="absolute top-[104px] left-0 right-0 bg-brand rounded-2xl px-4 pt-3 pb-4 border-b-4 border-brand-edge">
    <View pointerEvents="none" className="absolute left-1/2 -top-2 w-4 h-4 bg-brand" style={{transform:[{translateX:offset-8},{rotate:'45deg'}]}}/>
    <View className="flex-row items-center gap-2 mb-3">
      <View className="flex-1"><Text accessibilityRole="header" className="ui__card-title text-brand-ink">{title}</Text><Text className="ui__body-small text-brand-ink mt-1">{detail}</Text></View>
      {watch&&<MotionPressable accessibilityRole="button" accessibilityLabel="Watch optional video" accessibilityHint="Watching is optional. Start practice whenever you are ready." onPress={watch} className="w-11 h-11 rounded-xl border-2 border-brand-edge items-center justify-center"><Ionicons name="play" size={22} color={colors.brandInk}/></MotionPressable>}
      <MotionPressable accessibilityRole="button" accessibilityLabel="Close step menu" onPress={onClose} className="w-11 h-11 items-center justify-center"><Ionicons name="close" size={22} color={colors.brandInk}/></MotionPressable>
    </View>
    <Action secondary label={locked?'Go to prerequisite':'Start practice'} onPress={onStart}/>
  </View>;
}
