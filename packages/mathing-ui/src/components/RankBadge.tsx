import { Image, Text, View } from 'react-native';
import { images } from '../constants/images';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
export const RANKS = [
 {name:'Bronze',face:'#FFB347',edge:'#F58A18',shine:'#FFE6AE'},
 {name:'Silver',face:'#B8CEDA',edge:'#7895A5',shine:'#E2F2F8'},
 {name:'Gold',face:'#FFC800',edge:'#E5A900',shine:'#FFF38A'},
 {name:'Platinum',face:'#57D9CA',edge:'#209F9B',shine:'#B6FFF1'},
 {name:'Sapphire',face:'#38BFFF',edge:'#168BC2',shine:'#B7EAFF'},
 {name:'Ruby',face:'#FF7087',edge:'#DD405D',shine:'#FFC4CF'},
 {name:'Emerald',face:'#89D83A',edge:'#58A700',shine:'#DCFFAF'},
 {name:'Diamond',face:'#80E8FA',edge:'#27ADC9',shine:'#E2FBFF'},
 {name:'Master',face:'#FFC800',edge:'#E5A900',shine:'#FFF38A'},
] as const;
export const RANK_DIVISIONS=['Α','Β','Γ'] as const;
export function RankBadge({rank=0,division='Α',size=72}:{rank?:number;division?:string;size?:number}) {
 const tier=RANKS[rank]??RANKS[0];
 if(rank===4||rank===2)return <View style={{width:size,height:size}}><Image source={rank===4?images.league.sapphire:images.league.gold} style={{width:size,height:size}} resizeMode="contain" accessible={false}/><Text className="font-poppins-bold text-text-primary text-center absolute left-0 right-0" style={{bottom:size*0.08,fontSize:size*0.14,lineHeight:size*0.16}}>{division}</Text></View>;
 return <Svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
  {rank>=2&&<Path d="M23 65 4 49l7 25 17 9m49-18 19-16-7 25-17 9" fill={tier.shine} stroke={tier.edge} strokeWidth="3" strokeLinejoin="round"/>}
  {rank===8&&<Path d="m23 24-1-18 17 10L50 2l11 14L78 6l-1 18Z" fill={tier.face} stroke={tier.edge} strokeWidth="3" strokeLinejoin="round"/>}
  <Path d={rank>=4?'m50 16 29 14 5 35-34 29-34-29 5-35Z':'m20 22 30-10 30 10v32c0 20-30 36-30 36S20 74 20 54Z'} fill={tier.edge}/>
  <Path d={rank>=4?'m50 10 29 14 5 35-34 29-34-29 5-35Z':'m20 16 30-10 30 10v32c0 20-30 36-30 36S20 68 20 48Z'} fill={tier.face}/>
  <Path d="m28 23 22-7 22 7v10L32 61l-4-10Z" fill={tier.shine}/>
  <Path d="m29 43-2-26 19 13h8l19-13-2 26c9 28-51 29-42 0Z" fill="#FF9600"/>
  <Path d="m31 26 3 14 9-7m26-7-3 14-9-7" fill="#FFE4B5"/>
  <Path d="M29 45c8-5 13-2 21 9 8-11 13-14 21-9-1 15-11 22-21 22S30 60 29 45Z" fill="#FFF4DA"/>
  <Path d="m45 52 5-3 5 3-5 5Z" fill="#4B4B4B"/>
  <Circle cx="40" cy="42" r="3" fill="#4B4B4B"/><Circle cx="60" cy="42" r="3" fill="#4B4B4B"/>
  <Path d="M47 59q3 3 6 0" fill="none" stroke="#4B4B4B" strokeWidth="2" strokeLinecap="round"/>
  <SvgText x="50" y="83" textAnchor="middle" fontWeight="900" fontSize="15" fill="#4B4B4B">{division}</SvgText>
 </Svg>;
}
