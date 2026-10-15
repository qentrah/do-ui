import { CompletedMedal } from './CompletedMedal';
import { ResultIcon } from './ResultIcon';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants/colors';
import { Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDuration, type LessonResult } from '../lib/learningProgress';
import { FoxLessonMotion } from './FoxLessonMotion';
import { ProgressSaveNotice } from './ProgressSaveNotice';
import { useState } from 'react';
import { MotionPressable } from './Motion';

type CompletionMomentProps = {
 result: LessonResult;
 missedSteps?: { prompt: string; explanation: string }[];
 checkpoint?: boolean;
};

export function CompletionMoment({ result, missedSteps = [], checkpoint = false }: CompletionMomentProps) {
 const [showReview, setShowReview] = useState(false);
 const { width, height } = useWindowDimensions();
 const compact = width < 360;
 const perfect = result.passed && result.stars === 3;
 const title = perfect ? checkpoint ? 'Perfect checkpoint!' : 'Perfect lesson!' : result.passed ? checkpoint ? 'Checkpoint passed!' : 'Lesson complete!' : 'Keep practicing!';
 const stats = [
  { label: 'Total XP', value: String(result.xp), accessibility: `${result.xp} XP earned this attempt`, icon: 'xp' as const, surface: 'bg-result-gold', edge: 'border-result-gold', ink: 'text-[#A86700]' },
  { label: perfect ? 'Amazing' : 'Accuracy', value: `${Number((result.accuracy * 100).toFixed(1))}%`, accessibility: `${result.correct} of ${result.total} correct on the first answer without help`, icon: 'accuracy' as const, surface: 'bg-result-green', edge: 'border-result-green', ink: 'text-[#368000]' },
  { label: 'Time', value: formatDuration(result.durationMs), accessibility: result.durationMs === undefined ? 'Time was not recorded for this older attempt' : `${formatDuration(result.durationMs)} active lesson time`, icon: 'time' as const, surface: 'bg-result-blue', edge: 'border-result-blue', ink: 'text-[#087FAF]' },
 ];
 return <View className="w-full flex-1 justify-center py-5">
  <View className="items-center">
   {result.passed&&<View pointerEvents="none" className="absolute top-4 w-64 h-64 rounded-full bg-[#FFF7D6]"/>}
   <FoxLessonMotion action={perfect ? 'perfect' : result.passed ? 'passed' : 'recovery'} eventId={result.attemptId} size={height < 450 ? 112 : 224}/>
   <View className="absolute top-0 right-0">{result.passed&&<CompletedMedal size={72}/>}</View>
   <Text accessibilityRole="header" className="ui__math text-[#AD6500] text-center mt-3">{title}</Text>
   <Text className="ui__body text-text-secondary text-center mt-3">{perfect ? 'Take a bow!' : result.passed ? 'Nicely done!' : 'Review, then try again.'}</Text>
  </View>
  <View className="flex-row gap-2 mt-8">
   {stats.map(stat => <View key={stat.label} accessible accessibilityLabel={`${stat.label}: ${stat.value}. ${stat.accessibility}`} className={`flex-1 min-w-0 border-[3px] rounded-2xl overflow-hidden ${stat.surface} ${stat.edge}`}>
    <View className="px-1 py-2 overflow-hidden">
     {perfect&&stat.icon==='accuracy'&&<Svg aria-hidden={true} pointerEvents="none" width="100%" height="100%" viewBox="0 0 120 40" preserveAspectRatio="none" style={{position:'absolute',inset:0}}><Path d="M16 40 50 0h15L31 40ZM54 40 88 0h23L77 40Z" fill="white" opacity={0.22}/></Svg>}
     <Text className={`font-poppins-bold ${compact?'text-[11px]':'text-[13px]'} leading-4 tracking-wide text-center uppercase text-brand-ink`}>{stat.label}</Text>
    </View>
    <View className="flex-row flex-wrap items-center justify-center gap-1 px-1 py-4 bg-white rounded-xl">
     <ResultIcon name={stat.icon} size={compact?16:25}/><Text className={`font-poppins-bold ${compact?'text-[19px]':'text-[22px]'} ${stat.ink}`}>{stat.value}</Text>
    </View>
   </View>)}
  </View>
  {!result.passed && <Text className="body-sm text-text-secondary text-center mt-4">{checkpoint ? 'Pass with 8 of 10 correct first answers.' : 'Reach 80% on your first answers to pass.'}</Text>}
  {missedSteps.length > 0 && !result.passed && <View className="mt-3">
   <MotionPressable accessibilityRole="button" accessibilityLabel={`Review ${missedSteps.length} missed ${missedSteps.length===1?'question':'questions'}`} accessibilityState={{ expanded: showReview }} onPress={() => setShowReview(value => !value)} className="min-h-11 flex-row items-center justify-center gap-2">
    <Ionicons name="refresh-circle-outline" size={22} color={colors.selection} accessible={false}/><Text className="font-poppins-bold text-base text-selection-ink">Review missed questions</Text><Ionicons name={showReview ? 'chevron-up' : 'chevron-down'} size={18} color={colors.selection} accessible={false}/>
   </MotionPressable>
   {showReview && missedSteps.map((step, index) => <View key={index} className="rounded-2xl border border-border p-4 mt-2 gap-2"><Text className="font-poppins-bold text-base leading-6 text-text-primary">{step.prompt}</Text><Text className="body-sm text-text-secondary">{step.explanation}</Text></View>)}
  </View>}
  <ProgressSaveNotice/>
  {!result.verified && <Text className="body-sm text-text-secondary text-center mt-4">Practice preview. This result earns no mastery or XP.</Text>}
 </View>;
}
