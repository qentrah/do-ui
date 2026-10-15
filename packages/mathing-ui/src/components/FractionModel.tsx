import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../constants/colors';

export function FractionModel({denominator,value,onChange,disabled}:{denominator:number;value:string;onChange:(value:string)=>void;disabled:boolean}) {
 const count=Math.max(0,Math.min(denominator,Number(value.split('/')[0])||0));
 const [selected,setSelected]=useState<number[]>(()=>Array.from({length:count},(_,i)=>i));
 useEffect(()=>{setSelected(previous=>previous.length===count?previous:Array.from({length:count},(_,i)=>i));},[count]);
 function update(next:number[]){setSelected(next);onChange(`${next.length}/${denominator}`);}
 function toggle(index:number){update(selected.includes(index)?selected.filter(i=>i!==index):[...selected,index]);}
 return <View className="items-center">
  <View style={{width:220,height:220}}>
   <Svg accessibilityLabel="Fraction model" pointerEvents="none" width={220} height={220} viewBox="0 0 220 220">
    <Circle cx={110} cy={110} r={102} fill="#D99427"/>
    {Array.from({length:denominator},(_,i)=>{const a=i/denominator*Math.PI*2-Math.PI/2,b=(i+1)/denominator*Math.PI*2-Math.PI/2;return <Path key={i} d={`M110 110L${110+96*Math.cos(a)} ${110+96*Math.sin(a)}A96 96 0 ${b-a>Math.PI?1:0} 1 ${110+96*Math.cos(b)} ${110+96*Math.sin(b)}Z`} fill={selected.includes(i)?'#FFD432':colors.surface} stroke={selected.includes(i)?'#D99427':colors.border} strokeWidth={2}/>;})}
    {selected.map(i=>{const a=(i+.5)/denominator*Math.PI*2-Math.PI/2;return <Circle key={i} cx={110+61*Math.cos(a)} cy={110+61*Math.sin(a)} r={12} fill="#EF6941"/>;})}
   </Svg>
   {Array.from({length:denominator},(_,i)=>{const a=(i+.5)/denominator*Math.PI*2-Math.PI/2;return <TouchableOpacity key={i} accessibilityRole="checkbox" accessibilityLabel={`Slice ${i+1}`} aria-checked={selected.includes(i)} accessibilityState={{checked:selected.includes(i),disabled}} disabled={disabled} onPress={()=>toggle(i)} style={{position:'absolute',left:88+64*Math.cos(a),top:88+64*Math.sin(a),width:44,height:44}}/>;})}
  </View>
  <Text accessibilityLiveRegion="polite" className="ui__math text-brand-text mt-3 mb-4">{count} / {denominator}</Text>
  <View className="flex-row gap-4">
   <TouchableOpacity accessibilityRole="button" accessibilityLabel="Remove one slice" disabled={disabled||count===0} onPress={()=>update(selected.slice(0,-1))} className="w-14 h-14 border-2 border-b-4 border-border rounded-xl items-center justify-center"><Text className="ui__math">−</Text></TouchableOpacity>
   <TouchableOpacity accessibilityRole="button" accessibilityLabel="Add one slice" disabled={disabled||count===denominator} onPress={()=>{const next=Array.from({length:denominator},(_,i)=>i).find(i=>!selected.includes(i));if(next!==undefined)update([...selected,next]);}} className="w-14 h-14 border-2 border-b-4 border-border rounded-xl items-center justify-center"><Text className="ui__math">+</Text></TouchableOpacity>
  </View>
 </View>;
}
