import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { MotionPressable } from './Motion';
export default function SocialButton({icon,label,onPress}:{icon:ReactNode;label:string;onPress?:()=>void}){
 return <MotionPressable accessibilityRole="button" accessibilityLabel={label} disabled={!onPress} onPress={onPress} className="min-h-12 border-2 border-b-4 border-border rounded-xl px-4 py-3 flex-row items-center gap-3 bg-white"><View className="w-7 items-center">{icon}</View><Text className="flex-1 ui__button-label text-text-primary text-center">{label}</Text><View className="w-7"/></MotionPressable>;
}
