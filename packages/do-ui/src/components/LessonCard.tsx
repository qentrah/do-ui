import { Image, Text, View, type ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { images } from '../constants/images';
import { colors } from '../constants/colors';
import { MotionPressable } from './Motion';
export type LessonCardData={id:string;title:string;activityCount:number;xpReward:number};
export function LessonCard({lesson,thumbnail,index,isCompleted,isInProgress,onPress}:{lesson:LessonCardData;thumbnail?:ImageSourcePropType;index:number;isCompleted:boolean;isInProgress:boolean;onPress:()=>void}){
 return <MotionPressable accessibilityRole="button" accessibilityLabel={`${lesson.title}, ${isCompleted?'completed':isInProgress?'in progress':'available'}`} onPress={onPress} className={`border-2 border-b-4 rounded-2xl p-4 gap-3 ${isInProgress?'border-selection bg-selection-soft':'border-border bg-white'}`}>
  <View className="flex-row items-center gap-4"><Image source={thumbnail??images.fox} className="w-16 h-16" resizeMode="contain"/><View className="flex-1 gap-1"><Text className="ui__body-small text-text-secondary">Lesson {index+1}</Text><Text className="ui__card-title text-text-primary">{lesson.title}</Text><Text className="ui__body-small text-text-secondary">{lesson.activityCount} activities · {lesson.xpReward} XP</Text></View><Ionicons accessible={false} name={isCompleted?'checkmark-circle':'chevron-forward'} size={24} color={isCompleted?colors.success:colors.text}/></View>
  {isInProgress&&<Text className="ui__label text-selection-ink">Continue practice</Text>}
 </MotionPressable>;
}
