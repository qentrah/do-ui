import { SubjectDiagram } from './SubjectDiagram';
import { Text, View } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

import type { MathDiagramData } from '../data/mathDiagram';

/** Diagrams contain the problem's givens, never inferred expected answers. */
export function MathDiagram({diagram}:{diagram:MathDiagramData}) {
 if(diagram.kind!=='plot'&&diagram.kind!=='bars'&&diagram.kind!=='table'&&diagram.kind!=='area')return <SubjectDiagram diagram={diagram}/>;
 if(diagram.kind==='plot')return <View className="items-center my-3"><Svg width={260} height={240} viewBox="0 0 260 240" accessibilityLabel={`Given points: ${diagram.points.map(p=>`(${p.join(', ')})`).join(' and ')}`}>
  {Array.from({length:11},(_,i)=><Line key={`v${i}`} x1={20+i*22} x2={20+i*22} y1={10} y2={230} stroke={i===5?'#777':'#E5E5E5'} strokeWidth={i===5?2:1}/>)}
  {Array.from({length:11},(_,i)=><Line key={`h${i}`} x1={20} x2={240} y1={10+i*22} y2={10+i*22} stroke={i===5?'#777':'#E5E5E5'} strokeWidth={i===5?2:1}/>)}
  {[-4,-2,2,4].map(n=><SvgText key={n} x={130+n*22} y={136} fontSize={11} textAnchor="middle" fill="#777">{n}</SvgText>)}
  {[-4,-2,2,4].map(n=><SvgText key={`y${n}`} x={118} y={124-n*22} fontSize={11} textAnchor="end" fill="#777">{n}</SvgText>)}
  {diagram.points.length===2&&<Line x1={130+diagram.points[0][0]*22} y1={120-diagram.points[0][1]*22} x2={130+diagram.points[1][0]*22} y2={120-diagram.points[1][1]*22} stroke="#1CB0F6" strokeWidth={3}/>}
  {diagram.points.map(([x,y],i)=><Circle key={i} cx={130+x*22} cy={120-y*22} r={6} fill="#1CB0F6"/>)}
 </Svg></View>;
 if(diagram.kind==='bars')return <View className="gap-3 py-4">{diagram.rows.map((row,i)=><View key={i}><Text className="ui__body-small text-text-secondary mb-1">{row.label}</Text><View className="flex-row gap-1">{row.parts.map((part,j)=><View key={j} className="flex-1 min-h-11 border-2 border-[#1899D6] rounded-lg bg-[#DDF4FF] items-center justify-center px-1"><Text className="ui__card-title text-[#145A79]">{part}</Text></View>)}</View></View>)}</View>;
 return <View className="my-4 rounded-xl border-2 border-border overflow-hidden">
  <View className="flex-row bg-[#DDF4FF]">{diagram.kind==='area'&&<View className="w-11"/>}{diagram.headers.map((header,i)=><Text key={i} className="flex-1 text-center ui__card-title text-[#145A79] py-3">{header}</Text>)}</View>
  {diagram.rows.map((row,i)=><View key={i} className="flex-row border-t-2 border-border">{diagram.kind==='area'&&<Text className="w-11 text-center ui__card-title text-[#145A79] bg-[#DDF4FF] py-3">{diagram.labels[i]}</Text>}{row.map((cell,j)=><Text key={j} className={`flex-1 text-center ui__card-title py-3 px-1 ${cell==='?'?'text-[#1483AF] bg-[#F1FAFE]':'text-text-primary'}`}>{cell}</Text>)}</View>)}
 </View>;
}
