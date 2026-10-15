import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Polygon, Rect, Text as SvgText } from 'react-native-svg';
import { colors } from '../../constants/colors';

/** Original vector models. Coordinates, counts, and labels come from givens. */
export function CoordinateBoard({ points = [], selected, onSelect, disabled = false }: {
  points?: [number, number][]; selected: [number, number][]; onSelect: (point: [number, number]) => void; disabled?: boolean;
}) {
  const values = Array.from({ length: 11 }, (_, i) => i - 4);
  const [width, setWidth] = useState(292);
  const scale = Math.min(292, width) / 292;
  const x = (n: number) => 26 + (n + 4) * 24;
  const y = (n: number) => 266 - (n + 4) * 24;
  return <View className="w-full self-center max-w-[292px]" onLayout={event=>setWidth(event.nativeEvent.layout.width)} style={{height:292*scale}}>
    <Svg width={292*scale} height={292*scale} viewBox="0 0 292 292" accessibilityLabel="Coordinate plane, minus four to six on each axis">
      {values.map(n => <Line key={`x${n}`} x1={x(n)} x2={x(n)} y1={26} y2={266} stroke={n === 0 ? colors.muted : colors.border} strokeWidth={n === 0 ? 2 : 1} />)}
      {values.map(n => <Line key={`y${n}`} x1={26} x2={266} y1={y(n)} y2={y(n)} stroke={n === 0 ? colors.muted : colors.border} strokeWidth={n === 0 ? 2 : 1} />)}
      {values.filter(n => n % 2 === 0).map(n => <SvgText key={n} x={x(n)} y={y(0) + 16} fontSize={10} fill={colors.muted} textAnchor="middle">{n}</SvgText>)}
      {points.map(([a, b], i) => <Circle key={`given${i}`} cx={x(a)} cy={y(b)} r={5} fill={colors.outline} />)}
      {selected.length > 1 && <Polygon points={selected.map(([a, b]) => `${x(a)},${y(b)}`).join(' ')} fill={selected.length > 2 ? colors.selectionSoft : 'none'} stroke={colors.resultBlue} strokeWidth={2} />}
      {selected.map(([a, b], i) => <Circle key={`selected${i}`} cx={x(a)} cy={y(b)} r={6} fill={colors.resultBlue} />)}
    </Svg>
    {values.flatMap(a => values.map(b => <Pressable key={`${a},${b}`} accessibilityRole="button"
      accessibilityLabel={`Point (${a}, ${b})`} accessibilityState={{ selected: selected.some(p => p[0] === a && p[1] === b), disabled }}
      aria-pressed={selected.some(p => p[0] === a && p[1] === b)}
      disabled={disabled} onPress={() => onSelect([a, b])} style={{ position: 'absolute', left: (x(a) - 11)*scale, top: (y(b) - 11)*scale, width: 22*scale, height: 22*scale }} />))}
  </View>;
}

export function HundredGrid({ count = 28 }: { count?: number }) {
  return <Svg width={220} height={220} viewBox="0 0 220 220" accessibilityLabel={`${count} hundredths`}>
    {Array.from({ length: 100 }, (_, i) => <Rect key={i} x={10 + i % 10 * 20} y={10 + Math.floor(i / 10) * 20}
      width={20} height={20} fill={i < count ? colors.resultBlue : colors.white} stroke={i < count ? '#1899D6' : colors.border} strokeWidth={1} />)}
  </Svg>;
}

export function GeometryBoard({ kind = 'triangle' }: { kind?: 'triangle' | 'circle' | 'angles' | 'spinner' | 'weights' }) {
  return <Svg width="100%" height={200} viewBox="0 0 300 200" accessibilityLabel={`${kind} model, illustrative and not to scale`}>
    {kind === 'triangle' && <><Polygon points="65,150 65,35 235,150" fill={colors.resultBlue} /><SvgText x={49} y={98} fill={colors.selectionInk} fontSize={17}>3</SvgText><SvgText x={150} y={177} fill={colors.selectionInk} fontSize={17}>10</SvgText><SvgText x={160} y={85} fill={colors.selectionInk} fontSize={17}>x</SvgText></>}
    {kind === 'circle' && <><Circle cx={150} cy={100} r={76} fill={colors.resultBlue} /><Line x1={150} x2={226} y1={100} y2={100} stroke="white" strokeWidth={2} /><Circle cx={150} cy={100} r={3} fill="white" /><SvgText x={179} y={91} fill="white" fontSize={20}>r</SvgText></>}
    {kind === 'angles' && <><Path d="M30 150H275M145 150 220 35" stroke={colors.resultBlue} strokeWidth={3} /><Path d="M175 150A30 30 0 0 0 162 125" stroke={colors.resultBlue} strokeWidth={2} fill="none" /><SvgText x={185} y={137} fill={colors.selectionInk} fontSize={17}>60°</SvgText><SvgText x={116} y={130} fill={colors.selectionInk} fontSize={17}>x</SvgText></>}
    {kind === 'spinner' && <>{Array.from({ length: 5 }, (_, i) => { const a = i * 2 * Math.PI / 5 - Math.PI / 2, b = a + 2 * Math.PI / 5;
      return <Path key={i} d={`M150 100L${150 + 80 * Math.cos(a)} ${100 + 80 * Math.sin(a)}A80 80 0 0 1 ${150 + 80 * Math.cos(b)} ${100 + 80 * Math.sin(b)}Z`} fill={i === 4 ? colors.resultBlue : colors.white} stroke={colors.border} strokeWidth={2} />; })}
      {Array.from({ length: 5 }, (_, i) => { const a = (i + .5) * 2 * Math.PI / 5 - Math.PI / 2; return <SvgText key={i} x={150 + 52 * Math.cos(a)} y={105 + 52 * Math.sin(a)} textAnchor="middle" fontSize={15} fill={colors.text}>{i + 1}</SvgText>; })}</>}
    {kind === 'weights' && <>{[70,180].map((x, i) => <ViewWeight key={x} x={x} label={i === 0 ? '5 g' : '6 g'} />)}</>}
  </Svg>;
}
function ViewWeight({ x, label }: { x: number; label: string }) {
  return <><Circle cx={x + 24} cy={62} r={12} fill="none" stroke={colors.brand} strokeWidth={6} />
    <Path d={`M${x} 77h48l10 60h-68Z`} fill={colors.brand} /><SvgText x={x + 24} y={113} fontSize={19} textAnchor="middle" fill={colors.brandInk}>{label}</SvgText></>;
}

export function LiquidBoard({ amount }: { amount: number }) {
  const fill = Math.min(4, Math.max(0, amount)) / 4;
  return <View className="items-center"><Svg width={200} height={210} viewBox="0 0 200 210" accessibilityLabel={`${amount} liters, capacity four liters`}>
    <Path d={`M44 ${175 - fill * 125}H146V175H44Z`} fill={colors.resultBlue} />
    <Path d="M40 30H155L146 180H49Z" stroke={colors.border} strokeWidth={4} fill="none" />
    {[0,1,2,3,4].map(n => <SvgText key={n} x={115} y={179 - n * 31} fill={colors.selectionInk} fontSize={14}>{n} L</SvgText>)}
  </Svg><Text className="ui__body-small text-text-secondary">Adjust the amount using the answer controls.</Text></View>;
}
