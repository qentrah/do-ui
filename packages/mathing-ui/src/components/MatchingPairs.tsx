import { useState } from 'react';
import { Text, View } from 'react-native';
import { MotionPressable } from './Motion';

export function MatchingPairs({pairs,value,onChange,disabled}:{pairs:[string,string][];value:string;onChange:(v:string)=>void;disabled:boolean}) {
 const [active,setActive]=useState<number|null>(null);
 let chosen:string[]=[];try{chosen=JSON.parse(value||'[]');}catch{}
 const right=pairs.map(p=>p[1]).slice().reverse();
 function pair(answer:string){if(active===null)return;const next=pairs.map((_,i)=>chosen[i]??'');next.forEach((v,i)=>{if(v===answer)next[i]='';});next[active]=answer;onChange(JSON.stringify(next));setActive(null);}
 return <View className="mt-4">
  <Text accessibilityLiveRegion="polite" className="ui__body-small text-text-secondary mb-3">{active===null?'Tap a left tile, then its partner.':`Choose a partner for ${pairs[active][0]}.`}</Text>
  <View className="flex-row gap-3"><View className="flex-1 gap-3">{pairs.map(([left],i)=><MotionPressable key={left} accessibilityRole="button" accessibilityLabel={`Match ${left}${chosen[i]?`, paired with ${chosen[i]}`:''}`} accessibilityState={{selected:active===i,disabled}} disabled={disabled} onPress={()=>setActive(i)} className={`min-h-20 rounded-xl border-2 border-b-4 px-2 py-3 justify-center ${active===i?'border-selection bg-selection-soft':chosen[i]?'border-selection bg-selection-soft':'border-border bg-white'}`}><Text className="ui__body text-center text-text-primary">{left}</Text>{!!chosen[i]&&<Text className="ui__body-small text-center text-text-secondary mt-1">↔ {chosen[i]}</Text>}</MotionPressable>)}</View>
  <View className="flex-1 gap-3">{right.map(answer=><MotionPressable key={answer} accessibilityRole="button" accessibilityLabel={`Pair with ${answer}`} accessibilityState={{disabled:disabled||active===null}} disabled={disabled||active===null} onPress={()=>pair(answer)} className={`min-h-20 rounded-xl border-2 border-b-4 border-border px-2 py-3 justify-center ${chosen.includes(answer)?'bg-surface':'bg-white'}`}><Text className="ui__body text-center text-text-primary">{answer}</Text></MotionPressable>)}</View></View>
 </View>;
}
