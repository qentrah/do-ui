import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../constants/colors';

/** Authored objects are counted from the prompt, never from the expected answer. */
export function MathExpression({value}:{value:string}) {
 const dots=/^[●\s]+$/.test(value)?value.match(/●/g)?.length:0;
 if(dots&&dots<=20){
  const columns=Math.min(dots,5),rows=Math.ceil(dots/5),width=columns*48,height=rows*48;
  return <View className="items-center py-5"><Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} accessibilityLabel={value}>{Array.from({length:dots},(_,i)=><Circle key={i} cx={24+(i%5)*48} cy={24+Math.floor(i/5)*48} r={17} fill={colors.selection}/>)}</Svg></View>;
 }
 const prose=/[A-Za-z]{5,}/.test(value)&&/\s/.test(value);
 return <Text selectable className={`${prose?'ui__body':value.length>42?'ui__card-title':'ui__math'} text-text-primary text-center py-4`}>{value.split(/([+−×÷=])/).map((part,index)=><Text key={index} style={/^[+−×÷=]$/.test(part)?{color:colors.selection}:undefined}>{part}</Text>)}</Text>;
}
