import { MatchingPairs } from './MatchingPairs';
import { FractionModel } from './FractionModel';
import { NumberAnswer } from './NumberAnswer';
import { colors } from '../constants/colors';
import { answerParts } from '../data/answerTokens';
import { MotionPressable } from './Motion';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { useFeedbackPhase } from '../hooks/useFeedbackPhase';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { FunctionGraph } from './FunctionGraph';
import { Ionicons } from '@expo/vector-icons';
import type { Question } from '../data/mathCourse';
export function QuestionInteraction({question,value,onChange,disabled,result}: {question:Question;value:string;onChange:(value:string)=>void;disabled:boolean;result?:'success'|'retry'}) {
 const input=useRef<TextInput>(null);const [lineWidth,setLineWidth]=useState(330);const kind=question.kind??'choice';
 if(kind==='match')return <MatchingPairs pairs={question.matchPairs??[]} value={value} onChange={onChange} disabled={disabled}/>;
 if(kind==='function-graph')return <FunctionGraph question={question} value={value} onChange={onChange} disabled={disabled} result={result}/>;
 const answerInput=(label:string,placeholder:string)=><View><TextInput ref={input} accessibilityLabel={label} placeholder={placeholder} placeholderTextColor={colors.muted} value={value} onChangeText={onChange} editable={!disabled} autoCapitalize="none" autoCorrect={false} maxLength={120} onSubmitEditing={()=>input.current?.blur()} className="font-poppins text-lg text-text-primary border-2 border-b-4 border-border rounded-2xl bg-white px-4 py-3 min-h-14"/>{question.answerFormat&&<Text className="body-sm text-text-secondary mt-3">{question.answerFormat.startsWith('Use ^ for powers')?'^ for powers · * for multiplication':question.answerFormat}</Text>}</View>;
 if(kind==='number'&&!question.grading)return <NumberAnswer value={value} onChange={onChange} disabled={disabled}/>;
 if(kind==='number'||kind==='fraction'||kind==='expression')return <AnswerBuilder question={question} value={value} onChange={onChange} disabled={disabled} fallback={answerInput(question.stepLabel?'Write this step':kind==='expression'?'Write the next equation':'Write your answer',question.stepLabel?(question.grading==='text'?'Type the requested word or symbol':question.grading==='ordered-values'?'Values separated by commas':kind==='number'||kind==='fraction'?'Type a number or fraction':'Type a mathematical expression'):kind==='fraction'?'e.g. 1/4 or 1 1/3':kind==='expression'?'e.g. x = 4':'Type a number')}/>;
 if(kind==='order'){
  let steps:string[]=[];try{steps=JSON.parse(value||'[]');}catch{}
  return <View><View className="border-2 border-border rounded-2xl p-3 min-h-20 mb-4">{!steps.length&&<Text className="body-md text-text-secondary p-3">…</Text>}{steps.map((step,i)=><TouchableOpacity key={step} accessibilityRole="button" accessibilityLabel={`Remove step ${i+1}: ${step}`} disabled={disabled} onPress={()=>onChange(JSON.stringify(steps.filter(s=>s!==step)))} className="border border-selection bg-white rounded-xl p-2.5 mb-2"><Text className="font-poppins-bold text-brand-text">{i+1}. {step}</Text></TouchableOpacity>)}</View>{question.options.filter(step=>!steps.includes(step)).map(step=><TouchableOpacity key={step} accessibilityRole="button" accessibilityLabel={step} accessibilityState={{disabled:disabled||steps.includes(step)}} disabled={disabled||steps.includes(step)} onPress={()=>onChange(JSON.stringify([...steps,step]))} className={`min-h-11 border-2 border-border rounded-xl p-2.5 mb-2 ${steps.includes(step)?'bg-surface':'bg-white'}`}><Text className={`font-poppins text-base ${steps.includes(step)?'text-text-secondary':'text-text-primary'}`}>{step}</Text></TouchableOpacity>)}</View>;
 }
 if(kind==='fraction-model')return <FractionModel denominator={question.denominator??8} value={value} onChange={onChange} disabled={disabled}/>;
 if(kind==='number-line')return <View><View onLayout={event=>setLineWidth(event.nativeEvent.layout.width)} style={{width:330,maxWidth:'100%',height:110,alignSelf:'center'}}><Svg width="100%" height={110} viewBox="0 0 330 110" accessibilityLabel="Number line from minus five to five"><Line x1={15} y1={45} x2={315} y2={45} stroke={colors.muted} strokeWidth={3}/>{Array.from({length:11},(_,i)=>{const n=i-5,x=15+i*30;return <ViewPoint key={n} x={x} n={n} chosen={value===String(n)} onPress={()=>!disabled&&onChange(String(n))}/>;})}</Svg>{Platform.OS==='web'&&Array.from({length:11},(_,i)=><TouchableOpacity key={i} accessible={false} disabled={disabled} onPress={()=>onChange(String(i-5))} style={{position:'absolute',left:(15+i*30)/330*lineWidth-12,top:23,width:24,height:44}}/>)}</View>{answerInput('Number line position','Type an integer from −5 to 5')}</View>;
 if(kind==='graph'){
  const coords=value.split(',').map(Number);const x=coords[0],y=coords[1];const valid=value.includes(',')&&Number.isFinite(x)&&Number.isFinite(y);
  return <View><View className="items-center mb-5" style={{width:286,height:286,alignSelf:'center'}}><Svg width={286} height={286} viewBox="0 0 286 286" accessibilityLabel="Coordinate plane from minus five to five">{Array.from({length:11},(_,i)=><Line key={`x${i}`} x1={18+i*25} y1={18} x2={18+i*25} y2={268} stroke={i===5?'#777':colors.border} strokeWidth={i===5?2:1}/>)}{Array.from({length:11},(_,i)=><Line key={`y${i}`} x1={18} y1={18+i*25} x2={268} y2={18+i*25} stroke={i===5?'#777':colors.border} strokeWidth={i===5?2:1}/>)}{Array.from({length:121},(_,i)=>{const px=i%11-5,py=5-Math.floor(i/11);return <Circle key={i} cx={143+px*25} cy={143-py*25} r={11} fill="transparent" {...svgPress(()=>!disabled&&onChange(`${px},${py}`))}/>;})}{valid&&x>=-5&&x<=5&&y>=-5&&y<=5&&<Circle cx={143+x*25} cy={143-y*25} r={7} fill={colors.selection}/>}<SvgText x={270} y={138} fontSize={14} fill="#777">x</SvgText><SvgText x={148} y={14} fontSize={14} fill="#777">y</SvgText>{[-4,-2,2,4].map(n=><SvgText key={n} x={139+n*25} y={158} fontSize={11} fill="#777">{n}</SvgText>)}{[-4,-2,2,4].map(n=><SvgText key={`y${n}`} x={126} y={148-n*25} fontSize={11} fill="#777">{n}</SvgText>)}</Svg>{Platform.OS==='web'&&Array.from({length:121},(_,i)=>{const px=i%11-5,py=5-Math.floor(i/11);return <TouchableOpacity key={i} accessible={false} disabled={disabled} onPress={()=>onChange(`${px},${py}`)} style={{position:'absolute',left:131+px*25,top:131-py*25,width:24,height:24}}/>;})}</View>{answerInput('Coordinates (x, y)','e.g. 0, 1')}</View>;
 }
 return <View accessibilityRole="radiogroup" accessibilityLabel="Answer choices" style={{gap:8}}>{question.options.map(option=><AnswerChoice key={option} label={option} chosen={value===option} disabled={disabled} result={value===option?result:undefined} onPress={()=>onChange(option)}/>)}</View>;

}
function ViewPoint({x,n,chosen,onPress}:{x:number;n:number;chosen:boolean;onPress:()=>void}) {return <><Line x1={x} y1={38} x2={x} y2={52} stroke={colors.muted} strokeWidth={2}/><Circle cx={x} cy={45} r={12} fill={chosen?colors.selection:'transparent'} {...svgPress(onPress)}/><SvgText x={x} y={78} textAnchor="middle" fill={chosen?colors.selection:'#777'} fontSize={15}>{n}</SvgText></>;}
export function MathExample({type}: {type:'apples'|'groups'}) {
 return <View accessible accessibilityLabel={type==='groups'?'Five groups of two':'Five objects in one group'} className="py-4 mb-4"><View className="flex-row flex-wrap gap-2 justify-center">{Array.from({length:type==='groups'?5:1},(_,i)=><View key={i} className="flex-row gap-1 border-2 border-selection rounded-xl p-2">{Array.from({length:type==='groups'?2:5},(_,j)=><View key={j} className="w-5 h-5 bg-[#FB923C] rounded-md"/>)}</View>)}</View></View>;
}

function svgPress(callback:()=>void){return Platform.OS==='web'?{onClick:callback}:{onPress:callback};}

function AnswerBuilder({question,value,onChange,disabled,fallback}:{question:Question;value:string;onChange:(v:string)=>void;disabled:boolean;fallback:React.ReactNode}) {
 const [keyboard,setKeyboard]=useState(question.grading==='text');
 const [picked,setPicked]=useState<number[]>([]);
 const {tokens,separator}=useMemo(()=>{
  const generated=answerParts({answer:question.answer,kind:question.kind});
  const parts=question.answerTiles??generated.parts;const separator=question.answerTiles?'':generated.separator;
  const numeric=question.kind==='number'||question.kind==='fraction';
  const extras=(numeric?['0','1','2','3','4','5','6','7','8','9']:['+','-','*','/','2','cos(x)']).filter(t=>!parts.includes(t)).slice(0,numeric?10:3);
  return {separator,tokens:[...parts,...(question.answerTiles?[]:extras)].map((text,id)=>({text,id,sort:Math.sin(id*9283+question.prompt.length*317)})).sort((a,b)=>a.sort-b.sort)};
 },[question.answer,question.prompt,question.kind,question.answerTiles]);
 useEffect(()=>{
  if(!value){setPicked([]);return;}
  // Rebuild the visible answer when an interrupted lesson resumes.
  let remaining=value;const restored:number[]=[];
  while(remaining){
   const next=tokens.filter(t=>!restored.includes(t.id)&&remaining.startsWith(t.text)).sort((a,b)=>b.text.length-a.text.length)[0];
   if(!next){setKeyboard(true);return;}
   restored.push(next.id);remaining=remaining.slice(next.text.length);
   if(separator&&remaining.startsWith(separator))remaining=remaining.slice(separator.length);
  }
  setPicked(previous=>previous.map(id=>tokens.find(t=>t.id===id)?.text??'').join(separator)===value?previous:restored);
 },[value,tokens,separator]);
 const display=(v:string)=>v.replace(/\*/g,'×').replace(/-/g,'−').replace(/\bpi\b/g,'π');
 function update(ids:number[]){setPicked(ids);onChange(ids.map(id=>tokens.find(t=>t.id===id)!.text).join(separator));}
 return <View>{!keyboard&&tokens.length<=35?<><View accessibilityLabel="Your answer. Tap a tile to remove it." className={`flex-row flex-wrap gap-1.5 border-2 border-b-4 rounded-2xl min-h-16 p-3 mb-6 ${picked.length?'border-selection bg-selection-soft':'border-border bg-white'}`}>{picked.length===0&&<Text className="font-poppins text-text-secondary text-base pt-1">Your answer</Text>}{picked.map((id,i)=><MotionPressable key={id} accessibilityRole="button" accessibilityLabel={`Remove ${display(tokens.find(t=>t.id===id)!.text)} at position ${i+1}`} disabled={disabled} onPress={()=>update(picked.filter(p=>p!==id))} className="min-h-11 min-w-11 items-center justify-center"><View className="min-h-9 min-w-10 px-3 py-2 border-2 border-selection rounded-xl bg-selection-soft"><Text className="font-poppins-bold text-base text-text-primary">{display(tokens.find(t=>t.id===id)!.text)}</Text></View></MotionPressable>)}</View><View className="flex-row flex-wrap gap-2 justify-center">{tokens.map(t=><MotionPressable key={t.id} accessibilityRole="button" accessibilityLabel={`Add ${display(t.text)} tile ${t.id+1}`} accessibilityState={{disabled:disabled||picked.includes(t.id)}} disabled={disabled||picked.includes(t.id)} onPress={()=>update([...picked,t.id])} className="min-h-11 min-w-11 items-center justify-center"><View className={`min-h-9 min-w-10 px-3 py-2 border-2 border-b-4 rounded-xl ${picked.includes(t.id)?'border-transparent bg-surface':'border-border bg-white'}`}><Text className={`font-poppins-bold text-base ${picked.includes(t.id)?'text-text-secondary':'text-text-primary'}`}>{picked.includes(t.id)?'·':display(t.text)}</Text></View></MotionPressable>)}</View></>:fallback}{question.grading!=='text'&&tokens.length<=35&&<MotionPressable accessibilityRole="button" accessibilityLabel={keyboard?'Use answer tiles':'Use keyboard to write your own solution'} disabled={disabled} onPress={()=>{setKeyboard(!keyboard);update([]);}} className="min-h-11 items-center justify-center mt-3"><Ionicons name={keyboard?'grid-outline':'keypad-outline'} size={23} color={colors.brandText}/></MotionPressable>}</View>;
}

function AnswerChoice({label,chosen,disabled,result,onPress}:{label:string;chosen:boolean;disabled:boolean;result?:'success'|'retry';onPress:()=>void}){
 const phase=useFeedbackPhase(result??'idle');
 const border=result==='success'?colors.successEdge:result==='retry'?colors.error:chosen?colors.selection:colors.border;
 const fill=result==='success'?colors.successSoft:result==='retry'?colors.errorSoft:chosen?colors.selectionSoft:'white';
 const text=result==='success'?colors.successInk:result==='retry'?colors.errorInk:chosen?colors.selectionInk:colors.text;
 const color=useAnimatedStyle(()=>({
  backgroundColor:result?interpolateColor(Math.min(1,phase.value/.25),[0,1],[colors.selectionSoft,fill]):fill,
  borderColor:result?interpolateColor(Math.min(1,phase.value/.25),[0,1],[colors.selection,border]):border,
 }));
 return <Animated.View style={[{borderWidth:2,borderBottomWidth:4,borderRadius:12,overflow:'hidden'},color]}><MotionPressable accessibilityRole="radio" accessibilityLabel={label} aria-checked={chosen} accessibilityState={{checked:chosen,disabled}} disabled={disabled} onPress={onPress} className="min-h-[50px] px-4 py-2 justify-center"><View className="relative items-center justify-center min-h-6"><Text className="ui__body text-center w-full px-4" style={{color:text}}>{label}</Text>{chosen&&<View className="absolute right-0"><Ionicons name={result==='success'?'checkmark-circle':result==='retry'?'close-circle':'checkmark-circle-outline'} size={20} color={text} accessible={false}/></View>}</View></MotionPressable></Animated.View>;
}
