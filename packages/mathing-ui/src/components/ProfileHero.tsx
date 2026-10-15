import { Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LearnerAvatar, type AvatarName } from './LearnerAvatar';
import { MotionPressable } from './Motion';
import { colors } from '../constants/colors';

export function ProfileHero({name,avatar,own=false,onShare,onBack,onEdit,onSettings}:{name:string;avatar:AvatarName;own?:boolean;onShare?:()=>void;onBack?:()=>void;onEdit?:()=>void;onSettings?:()=>void}) {
 const portraitSize=Math.min(useWindowDimensions().width,520)*0.6;
 return <View className="-mx-4 -mt-4 bg-profile-sky overflow-hidden mb-6" style={{aspectRatio:1.25}}>
  <View className="flex-row items-center px-5 pt-6 gap-1">
   {!own&&onBack&&<MotionPressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} className="w-11 h-11 items-center justify-center -ml-3"><Ionicons name="arrow-back" size={25} color={colors.text}/></MotionPressable>}
   <Text accessibilityRole="header" numberOfLines={1} className="profile__name text-text-primary flex-1">{name}</Text>
   {onShare&&<MotionPressable accessibilityRole="button" accessibilityLabel="Share your progress" onPress={onShare} className="w-11 h-11 items-center justify-center"><Ionicons name="share-outline" size={27} color={colors.text}/></MotionPressable>}
   {own&&onSettings&&<MotionPressable accessibilityRole="button" accessibilityLabel="Open settings" onPress={onSettings} className="w-11 h-11 items-center justify-center"><Ionicons name="settings-outline" size={28} color={colors.text}/></MotionPressable>}
  </View>
  <View className="flex-1 items-center justify-end overflow-hidden">
   {own?<MotionPressable accessibilityRole="button" accessibilityLabel="Edit profile photo and name" onPress={onEdit} className="items-center -mb-5"><LearnerAvatar avatar={avatar} size={portraitSize} portrait/></MotionPressable>:<View className="-mb-5"><LearnerAvatar avatar={avatar} size={portraitSize} portrait/></View>}
  </View>
 </View>;
}
