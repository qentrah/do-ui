import { useEffect, useMemo, useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotionPressable } from '@qentrah/mathing-ui';
import { tokenizeCode, tokenClasses, type CodeLanguage } from '../lib/codeTokens';
const labels: Record<CodeLanguage,string> = {tsx:'TypeScript React',ts:'TypeScript',jsx:'JavaScript React',javascript:'JavaScript',css:'CSS',shell:'Shell'};
const extensions: Record<CodeLanguage,string> = {tsx:'example.tsx',ts:'example.ts',jsx:'example.jsx',javascript:'example.js',css:'styles.css',shell:'Terminal'};
export function CodeBlock({code,fileName,language,}:{code:string;fileName?:string;language?:CodeLanguage}) {
  const inferred = language ?? (code.startsWith('npm ') ? 'shell' : code.includes('@import') ? 'css' : code.includes('module.exports') ? 'javascript' : /<[A-Z]/.test(code) ? 'tsx' : 'ts');
  const lines=useMemo(()=>tokenizeCode(code,inferred),[code,inferred]);
  const [wrap,setWrap]=useState(false);
  const [copyState,setCopyState]=useState('Copy');
  useEffect(()=>setCopyState('Copy'),[code]);
  async function copy(){
    try {await navigator.clipboard.writeText(code);setCopyState('Copied');}
    catch {setCopyState('Select to copy');}
  }
  const source=<Text selectable accessibilityLabel={`Source code, ${labels[inferred]}`} style={{fontFamily:'monospace',fontSize:13,lineHeight:22,flexShrink:wrap?1:0}}>{lines.map((line,index)=><Text key={index}>{index>0?'\n':''}{line.map((token,i)=><Text key={i} className={tokenClasses[token.kind]}>{token.text}</Text>)}</Text>)}</Text>;
  return <View className="rounded-xl border border-[#454545] bg-[#1e1e1e] overflow-hidden">
    <View className="bg-[#252526] flex-row flex-wrap items-center justify-between border-b border-[#454545]">
      <View className="min-h-12 px-4 flex-row items-center gap-2 bg-[#1e1e1e] border-t-2 border-[#ff9600]"><Text className="text-xs font-bold text-[#75beff]">{inferred==='css'?'#':inferred==='shell'?'>_':inferred==='javascript'||inferred==='jsx'?'JS':'TS'}</Text><Text className="text-sm text-[#d4d4d4]">{(fileName??extensions[inferred]).split('/').pop()}</Text></View>
      <View className="flex-row items-center px-2 gap-1"><MotionPressable accessibilityRole="button" accessibilityLabel="Toggle code wrapping" accessibilityState={{selected:wrap}} onPress={()=>setWrap(!wrap)} className="min-h-11 px-3 flex-row gap-2 items-center"><Ionicons accessible={false} name="return-down-back" size={16} color={wrap?'#75beff':'#cccccc'}/><Text className="text-xs text-[#cccccc]">Wrap {wrap?'on':'off'}</Text></MotionPressable>{Platform.OS==='web'&&<MotionPressable accessibilityRole="button" accessibilityLabel="Copy source code" onPress={()=>void copy()} className="min-h-11 px-3 flex-row gap-2 items-center"><Ionicons accessible={false} name="copy-outline" size={16} color="#cccccc"/><Text accessibilityLiveRegion="polite" className="text-xs text-[#cccccc]">{copyState}</Text></MotionPressable>}</View>
    </View>
    <View className="flex-row py-4">
      <View accessible={false} aria-hidden className="px-3 border-r border-[#333333] mr-3"><Text style={{fontFamily:'monospace',fontSize:13,lineHeight:22,color:'#858585',textAlign:'right'}}>{wrap?'':lines.map((_,i)=>i+1).join('\n')}</Text></View>
      {wrap?<View className="flex-1 pr-4">{source}</View>:<ScrollView horizontal className="flex-1" contentContainerStyle={{paddingRight:20}}>{source}</ScrollView>}
    </View>
    <View className="bg-[#252526] border-t border-[#333333] px-4 py-2 flex-row justify-between"><Text className="text-xs text-[#cccccc]">{labels[inferred]}</Text><Text className="text-xs text-[#cccccc]">{lines.length} {lines.length===1?'line':'lines'} · UTF-8</Text></View>
  </View>;
}
