import { colors } from '../constants/colors';
import { MotionEntry, MotionPressable } from './Motion';
import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
export function ListPage({title,children,back=false,footer,action,compactTitle=false,hideHeader=false,centerTitle=false,onBack}:{title:string;children:ReactNode;back?:boolean;footer?:ReactNode;action?:ReactNode;compactTitle?:boolean;hideHeader?:boolean;centerTitle?:boolean;onBack?:()=>void}){
 return <SafeAreaView edges={footer?['top','bottom','left','right']:['top','left','right']} style={{flex:1,backgroundColor:'white'}}>
  {!hideHeader&&<View className={`w-full max-w-[520px] self-center flex-row items-center gap-2 px-4 py-2 ${centerTitle?'border-b-2 border-border':''}`}>
   {back&&<MotionPressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} disabled={!onBack} className="w-11 h-11 items-center justify-center -ml-2"><Ionicons name="chevron-back" size={24} color={colors.text}/></MotionPressable>}
   <Text accessibilityRole="header" numberOfLines={compactTitle || back ? 2 : 1} className={`ui__card-title flex-1 py-1 ${centerTitle?'text-center text-text-secondary':'text-text-primary'}`}>{title}</Text>{action}{centerTitle&&!action&&<View className="w-11"/>}
  </View>}
  <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{width:'100%',maxWidth:520,alignSelf:'center',paddingHorizontal:16,paddingTop:16,paddingBottom:24,flexGrow:1}}><MotionEntry trigger={title} style={{flexGrow:1}}>{children}</MotionEntry></ScrollView>
  {footer&&<View className="w-full max-w-[520px] self-center px-4 py-4 border-t-2 border-border">{footer}</View>}
 </SafeAreaView>;
}
export function ListGroup({children}:{children:ReactNode}){
 return <View className="app__card px-4 mb-4 overflow-hidden">{children}</View>;
}
export function ListRow({title,icon,onPress,value,selected=false,color=colors.brandText,detail,divider=true,accessibilityLabel,disabled=false}:{title:string;icon:keyof typeof Ionicons.glyphMap;onPress:()=>void;value?:string;selected?:boolean;color?:string;detail?:string;divider?:boolean;accessibilityLabel?:string;disabled?:boolean}){
 return <MotionPressable accessibilityRole="button" accessibilityLabel={accessibilityLabel??`${title}${value?`, ${value}`:''}${detail?`. ${detail}`:''}`} accessibilityState={{selected,disabled}} disabled={disabled} onPress={onPress} className={`min-h-16 py-3 flex-row items-center gap-3 ${divider?'border-b border-border':''}`}>
  <View className={`w-11 h-11 rounded-xl items-center justify-center ${selected?'bg-selection-soft':'bg-transparent'}`}><Ionicons name={icon} size={23} color={color} accessible={false}/></View>
  <View className="flex-1"><Text numberOfLines={2} className={`ui__card-title ${selected?'text-selection-ink':'text-text-primary'}`}>{title}</Text>{detail&&<Text numberOfLines={2} className="ui__body-small text-text-secondary mt-0.5">{detail}</Text>}</View>
  {value&&<Text className="font-poppins-bold text-sm text-text-secondary">{value}</Text>}<Ionicons name={selected?'checkmark':'chevron-forward'} size={selected?20:16} color={selected?colors.selection:colors.muted} accessible={false}/>
 </MotionPressable>;
}
export function EmptyList({message,icon='document-outline'}:{message:string;icon?:keyof typeof Ionicons.glyphMap}){
 return <View className="flex-1 items-center justify-center py-16 gap-4"><Ionicons name={icon} size={38} color={colors.muted} accessible={false}/><Text className="font-poppins text-base text-text-secondary text-center">{message}</Text></View>;
}
