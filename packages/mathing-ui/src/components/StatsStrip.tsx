import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotionPressable } from './Motion';
type Stat={label:string;value:number;icon:keyof typeof Ionicons.glyphMap;color:string;onPress:()=>void};
export function StatsStrip({items}:{items:Stat[]}){
 return <View className="flex-row gap-2 my-5">{items.map(item=><MotionPressable key={item.label} containerStyle={{flex:1}} accessibilityRole="button" accessibilityLabel={`${item.value} ${item.label}`} onPress={item.onPress} className="min-h-24 app__card items-center justify-center gap-1 px-1 py-3">
  <View className="flex-row items-center gap-1.5"><Ionicons name={item.icon} size={20} color={item.color} accessible={false}/><Text className="font-poppins-bold text-xl text-text-primary">{item.value}</Text></View><Text className="font-poppins text-xs text-text-secondary text-center">{item.label}</Text>
 </MotionPressable>)}</View>;
}
