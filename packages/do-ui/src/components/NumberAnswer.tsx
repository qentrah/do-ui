import { Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotionPressable } from './Motion';
import { colors } from '../constants/colors';

/** A neutral keypad, independent of the answer. Digits can be used more than once. */
export function NumberAnswer({value,onChange,disabled}:{value:string;onChange:(value:string)=>void;disabled:boolean}) {
 const keys=['1','2','3','4','5','6','7','8','9','.','0','backspace'];
 return <View className="w-full max-w-[360px] self-center">
  <TextInput accessibilityLabel="Your numerical answer" value={value} onChangeText={onChange} editable={!disabled} inputMode="decimal" autoCorrect={false} maxLength={120} placeholder="?" placeholderTextColor={colors.muted} style={{fontFamily:'Nunito-ExtraBold',fontSize:28,lineHeight:36,color:colors.text,textAlign:'center',minHeight:60,borderWidth:2,borderBottomWidth:4,borderColor:value?colors.selection:colors.border,borderRadius:12,backgroundColor:value?colors.selectionSoft:'white',padding:8,marginBottom:16}}/>
  <View className="flex-row flex-wrap justify-between gap-y-2">{keys.map(key=><MotionPressable key={key} containerStyle={{width:'31.8%'}} accessibilityRole="button" accessibilityLabel={key==='backspace'?'Delete last digit':key==='.'?'Decimal point':`Digit ${key}`} disabled={disabled} onPress={()=>onChange(key==='backspace'?value.slice(0,-1):`${value}${key}`)} className="min-h-12 border-2 border-b-4 border-border rounded-xl items-center justify-center bg-white">
   {key==='backspace'?<Ionicons name="backspace-outline" size={23} color={colors.text}/>:<Text className="ui__card-title text-text-primary">{key}</Text>}
  </MotionPressable>)}</View>
  <View className="flex-row justify-between mt-2"><MotionPressable accessibilityRole="button" accessibilityLabel="Fraction slash" disabled={disabled} onPress={()=>onChange(`${value}/`)} className="min-h-11 min-w-16 items-center justify-center"><Text className="ui__card-title text-text-secondary">/</Text></MotionPressable><MotionPressable accessibilityRole="button" accessibilityLabel="Change answer sign" disabled={disabled} onPress={()=>onChange(value.startsWith('-')?value.slice(1):`-${value}`)} className="min-h-11 min-w-16 items-center justify-center"><Text className="ui__card-title text-text-secondary">+/−</Text></MotionPressable><MotionPressable accessibilityRole="button" accessibilityLabel="Clear answer" disabled={disabled||!value} onPress={()=>onChange('')} className="min-h-11 min-w-16 items-center justify-center"><Text className="ui__label text-text-secondary">CLEAR</Text></MotionPressable></View>
 </View>;
}
