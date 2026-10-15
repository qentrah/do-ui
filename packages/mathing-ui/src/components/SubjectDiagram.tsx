import { useId } from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Ellipse, ClipPath, Defs, G, Line, Polygon, Polyline, Rect, Text as SvgText } from 'react-native-svg';
import type { MathDiagramData } from '../data/mathDiagram';

const blue='#1CB0F6',edge='#1899D6',ink='#145A79',orange='#FF9600';
type SubjectDiagramData=Exclude<MathDiagramData,{kind:'bars'|'table'|'area'|'plot'}>;
/** Context-specific visual models, all drawn from explicit givens. */
export function SubjectDiagram({diagram:d}:{diagram:SubjectDiagramData}) {
 const clipId=useId().replace(/:/g,'');
 if(d.kind==='flow')return <View className="flex-row flex-wrap justify-center gap-2 my-3">{d.nodes.map((n,i)=><View key={i} className="flex-1 min-w-20 items-center py-2 px-1 border-b-4 border-[#B9E9FC]"><Text className="ui__body-small text-text-secondary text-center mb-2">{n.label}</Text><Text className="ui__card-title text-[#145A79] text-center">{n.value}</Text></View>)}</View>;
 if(d.kind==='matrices')return <View className="flex-row flex-wrap justify-center gap-4 my-3">{d.items.map((m,i)=><View key={i} className="items-center"><Text className="ui__body-small text-text-secondary mb-2">{m.label}</Text><View className="border-x-2 border-[#1899D6] rounded-lg px-2 py-1 gap-1">{m.cells.map((row,j)=><View key={j} className="flex-row gap-1">{row.map((cell,k)=><Text key={k} className="min-w-10 px-1 py-1 text-center ui__card-title text-[#145A79]">{cell}</Text>)}</View>)}</View></View>)}</View>;
 if(d.kind==='counters')return <View className="my-3 gap-3"><View className="flex-row flex-wrap justify-center gap-3">{d.groups.map((count,i)=><View key={i} accessibilityLabel={`Group ${i+1}: ${count} counters${d.mutedLast&&i===d.groups.length-1?', unfilled':''}`} className="flex-row flex-wrap max-w-48 gap-1 p-2 border-2 border-border rounded-xl">{Array.from({length:count},(_,j)=><View key={j} className={`w-5 h-5 rounded-md ${d.mutedLast&&i===d.groups.length-1?'bg-border':'bg-[#1CB0F6]'}`}/>)}</View>)}</View>{!!d.unit&&<Text className="ui__body-small text-text-secondary text-center">{d.unit}</Text>}</View>;
 if(d.kind==='fraction-bars')return <View className="my-3 gap-3">{d.fractions.map(([n,den],i)=><View key={i} accessibilityLabel={`${n} of ${den} equal parts`} className="flex-row gap-1 h-10">{Array.from({length:den},(_,j)=><View key={j} className={`flex-1 rounded-md border-2 ${j<n?'bg-[#1CB0F6] border-[#1899D6]':'bg-white border-border'}`}/>)}</View>)}</View>;
 if(d.kind==='geometry')return <View className="items-center my-2"><Svg width="100%" height={180} viewBox="0 0 300 180" accessibilityLabel={`${d.caption}. ${d.labels.map(l=>l.text).join(', ')}`}>
  {d.points.length>0&&<Polygon points={d.points.map(p=>p.join(',')).join(' ')} stroke={edge} fill="#DDF4FF" strokeWidth={3} strokeLinejoin="round"/>}
  {d.circles.map(([x,y,r],i)=><Circle key={`c${i}`} cx={x} cy={y} r={r} fill={r<10?blue:'#DDF4FF'} stroke={edge} strokeWidth={3}/>)}
  {d.ellipses?.map(([x,y,rx,ry],i)=><Ellipse key={`e${i}`} cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={edge} strokeWidth={1.5}/>)}
  {d.segments.map(([x1,y1,x2,y2],i)=><Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={orange} strokeWidth={3}/>)}
  {d.labels.map((l,i)=><SvgText key={i} x={l.x} y={l.y} textAnchor="middle" fontSize={13} fontWeight="bold" fill={ink}>{l.text}</SvgText>)}
 </Svg><Text className="ui__body-small text-text-secondary text-center">{d.caption}</Text></View>;
 if(d.kind==='columns'||d.kind==='riemann'){
  const values=d.kind==='columns'?d.values:d.heights,labels=d.kind==='columns'?d.labels:values.map((_,i)=>String((i+1)*d.width));
  const max=Math.max(1,...values),unit=240/values.length;
  return <View className="items-center my-2"><Svg width="100%" height={175} viewBox="0 0 300 175" accessibilityLabel={`${d.caption}. ${values.map((v,i)=>`${labels[i]}: ${v}`).join('; ')}`}>
   <Line x1={32} y1={140} x2={278} y2={140} stroke="#777" strokeWidth={2}/>
   {values.map((v,i)=><G key={i}><Rect x={35+i*unit} y={140-v/max*108} width={unit-(d.kind==='riemann'?0:12)} height={v/max*108} rx={d.kind==='riemann'?0:5} fill={i%2?orange:blue}/><SvgText x={35+i*unit+(unit-12)/2} y={130-v/max*108} textAnchor="middle" fontSize={13} fill={ink}>{v}</SvgText><SvgText x={35+i*unit+(unit-12)/2} y={160} textAnchor="middle" fontSize={12} fill="#555">{labels[i]}</SvgText></G>)}
  </Svg><Text className="ui__body-small text-text-secondary text-center">{d.caption}</Text></View>;
 }
 const [xmin,xmax,ymin,ymax]=d.bounds;
 const px=(x:number)=>35+230*(x-xmin)/(xmax-xmin),py=(y:number)=>145-125*(y-ymin)/(ymax-ymin);
 const xaxis=py(Math.max(ymin,Math.min(ymax,0))),yaxis=px(Math.max(xmin,Math.min(xmax,0)));
 const tick=(n:number)=>Number(n.toFixed(2)).toString();
 return <View className="items-center my-2"><Svg width="100%" height={180} viewBox="0 0 300 180" accessibilityLabel={`${d.caption}. Horizontal range ${xmin} to ${xmax}; vertical range ${ymin} to ${ymax}.`}>
  <Defs><ClipPath id={clipId}><Rect x={35} y={20} width={230} height={125}/></ClipPath></Defs>
  {[0,1,2,3,4].map(i=><G key={i}><Line x1={35+i*57.5} x2={35+i*57.5} y1={20} y2={145} stroke="#E5E5E5"/><Line x1={35} x2={265} y1={20+i*31.25} y2={20+i*31.25} stroke="#E5E5E5"/></G>)}
  <Line x1={35} x2={265} y1={xaxis} y2={xaxis} stroke="#777" strokeWidth={1.5}/><Line x1={yaxis} x2={yaxis} y1={20} y2={145} stroke="#777" strokeWidth={1.5}/>
  <G clipPath={`url(#${clipId})`}>{d.series.map((points,i)=><Polyline key={i} points={points.map(([x,y])=>`${px(x)},${py(y)}`).join(' ')} stroke={i===0?blue:orange} fill="none" strokeWidth={3}/>)}</G>
  {[xmin,(xmin+xmax)/2,xmax].map(n=><SvgText key={`x${n}`} x={px(n)} y={163} textAnchor="middle" fontSize={11} fill="#555">{tick(n)}</SvgText>)}
  {[ymin,(ymin+ymax)/2,ymax].map(n=><SvgText key={`y${n}`} x={29} y={py(n)+4} textAnchor="end" fontSize={11} fill="#555">{tick(n)}</SvgText>)}
 </Svg><Text className="ui__body-small text-text-secondary text-center">{d.caption}</Text></View>;
}
