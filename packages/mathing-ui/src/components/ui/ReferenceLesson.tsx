import { useState } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import type { ReferenceScreen } from '../../data/uiReferenceScreens';
import { Action } from '../MathUI';
import { MotionPressable } from '../Motion';
import { NumberAnswer } from '../NumberAnswer';
import { FractionModel } from '../FractionModel';
import { MatchingPairs } from '../MatchingPairs';
import { MathExpression } from '../MathExpression';
import { MathDiagram } from '../MathDiagram';
import { SubjectDiagram } from '../SubjectDiagram';
import { Choice, Field, IconButton } from './Primitives';
import { CoordinateBoard, GeometryBoard, HundredGrid, LiquidBoard } from './MathCanvas';

/** Interactive source-inspired reconstruction. Each instance owns disposable state. */
export function ReferenceLesson({ screen, onClose }: { screen: ReferenceScreen; onClose: () => void }) {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [cells, setCells] = useState<Record<number, string>>({});
  const [active, setActive] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [help, setHelp] = useState(false);
  const [paired, setPaired] = useState('');
  const [path, setPath] = useState<number[]>([]);
  const numbers = [5,7,9,1,2,5,3,8,5,6,7,3,7,5,9,2];
  const blankCount = screen.mode === 'blanks' ? screen.rows?.length ?? 1 : screen.rows?.flat().filter(c => c.includes('?')).length ?? 1;
  const normalize = (text: string) => text.replace(/\s/g, '').replace(/−/g, '-').replace(/−0\b|-0\b/g, '0');
  function reset() { setValue(''); setSelected([]); setPoints([]); setCells({}); setActive(0); setFeedback(null); setHelp(false); setPaired(''); setPath([]); }
  function check() {
    if (feedback) { reset(); return; }
    if (screen.mode === 'explanation') { setFeedback('Example complete. This preview records no mastery.'); return; }
    const response = screen.mode === 'multi' ? [...selected].sort().join('|') : screen.mode === 'match' ? paired :
      screen.mode === 'blanks' || screen.mode === 'table' ? Array.from({ length: blankCount }, (_, i) => cells[i] ?? '').join(',') :
      screen.mode === 'paths' ? String(path.reduce((total, i) => total + numbers[i], 0)) : value;
    const expected = screen.mode === 'multi' ? screen.answer.split('|').sort().join('|') : screen.answer;
    const canonical = (text:string) => screen.mode==='graph'&&!screen.options?normalize(text).split(';').sort().join(';'):normalize(text);
    setFeedback(canonical(response) === canonical(expected) ? 'Correct! Preview only — no XP or hearts change.' : 'Try another answer. Your learning progress is unchanged.');
  }
  function selectPoint(point: [number, number]) {
    const next = points.some(p => p[0] === point[0] && p[1] === point[1]) ? points.filter(p => p[0] !== point[0] || p[1] !== point[1]) : [...points, point];
    setPoints(next); setValue(next.map(p => p.join(',')).join(';'));
  }
  const input = <NumberAnswer value={value} onChange={setValue} disabled={!!feedback} />;
  let content;
  if (screen.mode === 'match') content = <MatchingPairs pairs={(screen.rows ?? []) as [string, string][]} value={paired} onChange={setPaired} disabled={!!feedback} />;
  else if (screen.mode === 'choice' || screen.mode === 'multi' || (screen.options && screen.mode !== 'tiles')) content = <View accessibilityRole={screen.mode === 'multi' ? undefined : 'radiogroup'} accessibilityLabel="Preview answer choices" className="gap-2">{screen.options?.map(option => <Choice key={option} label={option} selected={screen.mode === 'multi' ? selected.includes(option) : value === option} multiple={screen.mode === 'multi'} disabled={!!feedback} onPress={() => screen.mode === 'multi' ? setSelected(previous => previous.includes(option) ? previous.filter(v => v !== option) : [...previous, option]) : setValue(option)} />)}</View>;
  else if (screen.mode === 'fraction') content = <FractionModel denominator={screen.denominator ?? 6} value={value} onChange={setValue} disabled={!!feedback} />;
  else if (screen.mode === 'blanks' || screen.mode === 'table') {
    let blank = -1;
    content = <View className="gap-4"><View className="border-2 border-border rounded-xl overflow-hidden">{screen.rows?.map((row, r) => <View key={r} className="flex-row border-b border-border">{row.map((cell, c) => {
      const isBlank = cell.includes('?'); const index = isBlank ? ++blank : -1;
      return isBlank ? <MotionPressable key={c} containerStyle={{ flex: 1 }} accessibilityRole="button" accessibilityLabel={`Edit blank ${index + 1}`} accessibilityState={{ selected: active === index }} onPress={() => setActive(index)} className={`min-h-14 p-3 items-center justify-center ${active === index ? 'bg-selection-soft' : 'bg-surface'}`}><Text className="ui__card-title text-selection-ink">{cell.replace('?',cells[index] || '?')}</Text></MotionPressable> : <View key={c} className="flex-1 min-h-14 p-3 justify-center"><Text className="ui__body text-text-primary text-center">{cell}</Text></View>;
    })}</View>)}</View><NumberAnswer value={cells[active] ?? ''} onChange={next => setCells(previous => ({ ...previous, [active]: next }))} disabled={!!feedback} />
    <Action secondary label="Next blank" disabled={!!feedback} onPress={() => setActive((active + 1) % Math.max(1, blankCount))} /></View>;
  } else if (screen.mode === 'graph') content = <View className="gap-3"><CoordinateBoard points={screen.points} selected={points} onSelect={selectPoint} disabled={!!feedback} /><Field label="Coordinates, separated by semicolons" value={value} onChangeText={setValue} editable={!feedback} placeholder="3,2;6,4" /></View>;
  else if (screen.mode === 'tiles') content = <View className="gap-4"><Field label="Your expression" value={value} onChangeText={setValue} editable={!feedback} /><View className="flex-row flex-wrap gap-2">{screen.options?.map((tile, i) => <MotionPressable key={i} accessibilityRole="button" accessibilityLabel={`Add ${tile}`} disabled={!!feedback} onPress={() => setValue(previous => previous + tile)} className="min-h-12 min-w-12 p-3 border-2 border-b-4 border-border rounded-xl"><Text className="ui__card-title text-text-primary">{tile}</Text></MotionPressable>)}</View></View>;
  else if (screen.mode === 'paths') content = <View className="gap-4"><Text accessibilityLiveRegion="polite" className="ui__math text-center text-selection-ink">{path.map(i => numbers[i]).join(' + ') || 'Select numbers'}</Text><View className="flex-row flex-wrap">{numbers.map((number, i) => <MotionPressable key={i} containerStyle={{ width: '25%' }} accessibilityRole="button" accessibilityLabel={`Row ${Math.floor(i / 4) + 1}, column ${i % 4 + 1}: ${number}`} accessibilityState={{ selected: path.includes(i), disabled: !!feedback }} disabled={!!feedback} onPress={() => setPath(previous => previous.includes(i) ? previous.filter(v => v !== i) : [...previous, i])} className="items-center p-1"><View className={`w-14 h-14 rounded-full border-2 items-center justify-center ${path.includes(i) ? 'border-success-edge bg-success-soft' : 'border-border bg-white'}`}><Text className="ui__math text-text-primary">{number}</Text></View></MotionPressable>)}</View><Text className="ui__body-small text-text-secondary">Sum-selection preview. Adjacency and timer rules are not implemented here.</Text></View>;
  else if (screen.mode === 'explanation') content = <View className="gap-4"><View className="p-4 border-2 border-border rounded-2xl"><Text className="ui__body text-text-primary">Read the example, then use Next. Example playback grants no mastery.</Text></View></View>;
  else content = input;
  const matched=JSON.parse(paired||'[]') as string[];
  const ready = screen.mode === 'explanation' || screen.mode === 'multi' && selected.length > 0 || screen.mode === 'match' && matched.filter(Boolean).length === screen.rows?.length ||
    (screen.mode === 'blanks' || screen.mode === 'table') && Object.values(cells).filter(Boolean).length === blankCount || screen.mode === 'paths' && path.length > 0 || value.trim().length > 0;
  return <View className="bg-white rounded-2xl border-2 border-border overflow-hidden w-full">
    <View className="flex-row items-center gap-3 p-3"><IconButton label="Close preview" icon="close" onPress={onClose} />
      <View className="flex-1 h-3 bg-border rounded-full overflow-hidden"><View className="h-full w-3/5 bg-success rounded-full" /></View><Ionicons name="heart" size={20} color={colors.heart} accessible={false} /><Text className="ui__label text-text-secondary">DEMO</Text></View>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16, gap: 20 }} style={{ maxHeight: 680 }}>
      <Text accessibilityRole="header" className="ui__instruction text-text-primary">{screen.prompt}</Text>
      {screen.expression ? <View className="py-6"><MathExpression value={screen.expression} /></View> : null}
      {screen.rows&&!['table','blanks','match'].includes(screen.mode)&&<MathDiagram diagram={{kind:'table',headers:screen.rows[0],rows:screen.rows.slice(1)}}/>}
      {screen.points&&screen.mode==='number'&&<CoordinateBoard points={screen.points} selected={[]} onSelect={()=>{}} disabled/>}
      {screen.mode === 'grid' && <View className="items-center"><HundredGrid /></View>}
      {screen.mode === 'geometry' && <GeometryBoard kind={/spinner/.test(screen.expression) ? 'spinner' : /radius/i.test(screen.expression) ? 'circle' : /angle|Parallel/.test(screen.expression) ? 'angles' : / g/.test(screen.expression) ? 'weights' : 'triangle'} />}
      {screen.mode === 'graph' && screen.options && <SubjectDiagram diagram={{ kind: 'chart', bounds: [-4,6,-4,6], series: [[[-4,-3],[6,7]]], caption: 'Illustrative graph; source-inspired preview' }} />}
      {screen.mode === 'groups' && <SubjectDiagram diagram={{ kind: 'counters', groups: [2,2,2], unit: 'Three groups of two' }} />}
      {screen.mode === 'liquid' && <LiquidBoard amount={Number(value) || 0} />}
      {screen.mode === 'line' && <SubjectDiagram diagram={{ kind: 'chart', bounds: [-5,25,-1,1], series: [[[-5,0],[25,0]]], caption: 'Number-line preview. Enter the numerical value below.' }} />}
      {content}
      {help && <Text className="ui__body text-selection-ink">This is a disposable UI fixture. The source article and the research guide explain the topic. Open the source to compare the original screen.</Text>}
    </ScrollView>
    <View className="p-4 gap-3 border-t-2 border-border">
      {feedback && <Text accessibilityLiveRegion="polite" className="ui__body text-text-primary">{feedback}</Text>}
      <View className="flex-row items-center gap-3"><IconButton label="Show preview help" icon="bulb-outline" onPress={() => setHelp(!help)} /><View className="flex-1"><Action label={feedback ? 'Reset preview' : screen.mode === 'explanation' ? 'Next' : 'Check'} disabled={!ready && !feedback} onPress={check} /></View></View>
      <MotionPressable accessibilityRole="link" accessibilityLabel="Open official source article" onPress={() => void Linking.openURL(screen.sourceUrl)} className="min-h-11 justify-center"><Text className="ui__body-small text-selection-ink text-center">Grade {screen.grade} · {screen.topic} · Source panel {screen.panel}</Text></MotionPressable>
    </View>
  </View>;
}
