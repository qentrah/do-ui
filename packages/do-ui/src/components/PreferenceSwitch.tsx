import { useState } from 'react';
import { Platform, Switch, View } from 'react-native';
import { colors } from '../constants/colors';

/** Keep the platform Switch for interaction, with the reference's square thumb above it. */
export function PreferenceSwitch({label,value,onValueChange,disabled=false}:{label:string;value:boolean;onValueChange:(value:boolean)=>void;disabled?:boolean}) {
 const [focused,setFocused]=useState(false);
 return <View className={`w-16 h-12 items-center justify-center rounded-xl ${focused?'border-2 border-selection-ink':'border-2 border-transparent'}`}>
  <View pointerEvents="none" accessible={false} className="absolute w-[60px] h-9 justify-center">
   <View className={`absolute left-0 right-0 h-[26px] rounded-full ${value?'bg-result-blue':'bg-border'}`}/>
   <View className={`absolute w-8 h-9 bg-white border-2 rounded-[10px] ${value?'right-0 border-result-blue':'left-0 border-border'}`}/>
  </View>
  <Switch accessibilityLabel={label} accessibilityState={{disabled}} disabled={disabled} value={value} onValueChange={onValueChange} style={{opacity:0,width:60,height:44}} trackColor={{false:colors.border,true:colors.resultBlue}} thumbColor={colors.white} {...(Platform.OS==='web'?{onFocus:()=>setFocused(true),onBlur:()=>setFocused(false)}:{})}/>
 </View>;
}
