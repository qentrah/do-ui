import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MotionPressable } from './Motion';

type ProfileStats={streak:number;xp:number;passed?:number;perfect?:boolean;showAchievements?:boolean;onNavigate?:(destination:'statistics'|'progress'|'ranks')=>void};

/** Reference-led flat statistics with explicit labels for local math progress. */
export function ProfileOverview({streak,xp,passed,perfect=false,showAchievements=true,onNavigate}:ProfileStats) {
 const stats=[
  {label:'Day streak',value:String(streak),icon:'flame' as const,color:colors.brand,onPress:()=>onNavigate?.('statistics')},
  ...(passed!==undefined?[{label:'Lessons passed',value:String(passed),icon:'checkmark-circle' as const,color:colors.success,onPress:()=>onNavigate?.('progress')}]:[]),
  {label:'Collection',value:'Badges',icon:'trophy' as const,color:colors.resultBlue,onPress:()=>onNavigate?.('ranks')},
  {label:'Total XP',value:xp.toLocaleString(),icon:'flash' as const,color:colors.reward,onPress:()=>onNavigate?.('statistics')},
 ];
 return <>
  <Text accessibilityRole="header" className="profile__section text-text-secondary mb-3">OVERVIEW</Text>
  <View className="flex-row flex-wrap mb-6">
   {stats.map(stat=>{
    const content=<><Ionicons name={stat.icon} size={30} color={stat.color} accessible={false}/><View className="flex-1"><Text className="profile__stat text-text-primary">{stat.value}</Text><Text className="ui__body-small text-text-secondary">{stat.label}</Text></View></>;
    const label=`${stat.value} ${stat.label.toLowerCase()}`;
    return passed===undefined&&stat.label!=='Collection'?<View key={stat.label} accessible accessibilityLabel={label} className="w-1/2 min-h-16 flex-row items-center gap-3 pr-2">{content}</View>:<MotionPressable key={stat.label} containerStyle={{width:'50%'}} accessibilityRole="button" accessibilityLabel={`${label}. View details`} disabled={!onNavigate} onPress={stat.onPress} className="min-h-16 flex-row items-center gap-3 pr-2">{content}</MotionPressable>;
   })}
  </View>
  {showAchievements&&<ProfileAchievements streak={streak} passed={passed} perfect={perfect}/>}
 </>;
}

export function ProfileAchievements({streak,passed,perfect=false}:Omit<ProfileStats,'xp'>) {
 const badges=[
  {label:'First lesson',icon:'checkmark-circle' as const,earned:passed!==undefined&&passed>0,color:colors.success},
  {label:'Perfect lesson',icon:'star' as const,earned:perfect,color:colors.brand},
  {label:'7-day streak',icon:'flame' as const,earned:streak>=7,color:colors.brand},
 ].filter(badge=>passed!==undefined||badge.label==='7-day streak');
 return <>
  <Text accessibilityRole="header" className="profile__section text-text-secondary mb-4">ACHIEVEMENTS</Text>
  <View className="flex-row mb-6">{badges.map(badge=><View key={badge.label} accessible accessibilityLabel={`${badge.label}. ${badge.earned?'Earned':'Locked'}`} className="flex-1 items-center gap-2 px-1">
   <View className={`w-16 h-16 rounded-2xl border-2 items-center justify-center ${badge.earned?'bg-brand-soft border-brand-outline':'bg-surface border-border'}`}><Ionicons name={badge.earned?badge.icon:'lock-closed-outline'} size={30} color={badge.earned?badge.color:colors.outline}/></View>
   <Text className="ui__body-small text-text-secondary text-center">{badge.label}</Text>
  </View>)}</View>
 </>;
}
