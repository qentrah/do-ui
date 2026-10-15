import Svg, { Circle, Line, Path } from 'react-native-svg';
import { colors } from '../constants/colors';

export function ResultIcon({name,size=26}:{name:'xp'|'accuracy'|'time';size?:number}) {
 const color=name==='xp'?colors.resultGold:name==='accuracy'?colors.resultGreen:colors.resultBlue;
 return <Svg aria-hidden={true} width={size} height={size} viewBox="0 0 32 32">
  {name==='xp'&&<><Path d="M18 2c1-1 3 0 3 2l-1 9 8 2c2 0 2 2 1 3L14 30c-2 1-3 0-3-2l1-9-8-2c-2 0-2-2-1-3Z" fill={color}/><Path d="m18 5-9 9 8 1Z" fill="#FFE66A"/><Path d="m15 19-1 8 8-7Z" fill="#E8AD00"/></>}
  {name==='accuracy'&&<><Circle cx={14} cy={18} r={12} fill="none" stroke={color} strokeWidth={3}/><Circle cx={14} cy={18} r={6.5} fill="none" stroke={color} strokeWidth={3}/><Line x1={14} y1={18} x2={28} y2={4} stroke={color} strokeWidth={3.5} strokeLinecap="round"/><Path d="m23 2 1 6 6 1-4-6Z" fill={color}/></>}
  {name==='time'&&<><Circle cx={16} cy={17} r={12} fill="none" stroke={color} strokeWidth={3.5}/><Line x1={16} y1={17} x2={23} y2={11} stroke={color} strokeWidth={3.5} strokeLinecap="round"/><Circle cx={16} cy={17} r={2.5} fill={color}/><Path d="M13 2h6" stroke={color} strokeWidth={3} strokeLinecap="round"/></>}
 </Svg>;
}
