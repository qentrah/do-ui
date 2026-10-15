import { colors } from '../constants/colors';
import { ReactNode, RefObject } from 'react';
import { ScrollView, Text, View, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotionEntry, MotionPressable } from './Motion';
import { Ionicons } from '@expo/vector-icons';
export function MathScreen({children,header,scrollRef,onScroll,onScrollBeginDrag,onScrollLayout}: {children: ReactNode;header?:ReactNode;scrollRef?:RefObject<ScrollView|null>;onScroll?:ScrollViewProps["onScroll"];onScrollBeginDrag?:ScrollViewProps["onScrollBeginDrag"];onScrollLayout?:ScrollViewProps["onLayout"]}) {
  return <SafeAreaView style={{flex:1,backgroundColor:'#fff'}} edges={['top','left','right']}>{header}<ScrollView onScroll={onScroll} scrollEventThrottle={16} onScrollBeginDrag={onScrollBeginDrag} onLayout={onScrollLayout} showsVerticalScrollIndicator={false} ref={scrollRef} keyboardShouldPersistTaps="handled" contentContainerStyle={{padding:16,paddingBottom:180,maxWidth:520,width:'100%',alignSelf:'center'}}><MotionEntry style={{flexGrow:1}}>{children}</MotionEntry></ScrollView></SafeAreaView>;
}
export function Action({label,onPress,disabled=false,secondary=false,tone="brand"}: {label:string;onPress:()=>void;disabled?:boolean;secondary?:boolean;tone?:"brand"|"success"|"error"}) {
  return <MotionPressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{disabled}} disabled={disabled} onPress={onPress} className={`min-h-[50px] rounded-xl px-4 py-3 items-center justify-center border-2 border-b-[5px] ${disabled?'bg-border border-border':secondary?'bg-white border-border':tone==='success'?'bg-success border-success-edge':tone==='error'?'bg-error border-error-edge':'bg-brand border-brand-edge'}`}><Text className={`ui__button-label ${disabled?'text-text-secondary':secondary?'text-brand-text':tone==='success'?'text-success-ink':tone==='error'?'text-error-ink':'text-brand-ink'}`}>{label.toUpperCase()}</Text></MotionPressable>;
}
export function Heading({eyebrow,title,subtitle}: {eyebrow?:string;title:string;subtitle?:string}) {
  return <View className="mb-5">{eyebrow&&<Text className="font-poppins-bold text-sm text-brand-text mb-2">{eyebrow.toUpperCase()}</Text>}<Text accessibilityRole="header" className="h1">{title}</Text>{subtitle&&<Text className="body-md text-text-secondary mt-2">{subtitle}</Text>}</View>;
}
export function CourseCard({title,subtitle,icon='play',onPress,completed=false}: {title:string;subtitle:string;icon?:keyof typeof Ionicons.glyphMap;onPress:()=>void;completed?:boolean}) {
  return <MotionPressable accessibilityRole="button" accessibilityLabel={`${title}. ${subtitle}${completed?'. Completed':''}`} onPress={onPress} className="flex-row items-center border-2 border-b-[5px] border-border bg-white rounded-2xl p-4 mb-3 min-h-20"><View className="w-12 h-12 rounded-2xl bg-brand-soft items-center justify-center mr-3"><Ionicons name={completed?'checkmark':icon} size={26} color={completed?colors.brandText:colors.brand} /></View><View className="flex-1"><Text className="font-poppins-bold text-base text-text-primary">{title}</Text><Text className="body-sm text-text-secondary mt-1">{subtitle}</Text></View><Ionicons name="chevron-forward" size={20} color={colors.muted} /></MotionPressable>;
}
