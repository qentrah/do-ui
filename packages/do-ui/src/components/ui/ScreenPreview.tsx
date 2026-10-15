import { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { Action, CourseCard } from '../MathUI';
import { PathNode } from '../PathNode';
import { PathLessonPopup } from '../PathLessonPopup';
import { Fox } from '../Fox';
import { LearnerAvatar } from '../LearnerAvatar';
import { RankBadge, RANKS } from '../RankBadge';
import { MathArtwork } from '../MathArtwork';
import { ChestArtwork } from '../ChestArtwork';
import { ProgressMeter } from '../ProgressMeter';
import { CompletionMoment } from '../CompletionMoment';
import { MathDiagram } from '../MathDiagram';
import { ListGroup, ListRow, EmptyList } from '../ListUI';
import { MotionPressable } from '../Motion';
import { REFERENCE_SCREENS } from '../../data/uiReferenceScreens';
import { ReferenceLesson } from './ReferenceLesson';
import { Badge, Card, Choice, Field, StatCard } from './Primitives';

/** Isolated compositions; callbacks never update the learner's stores. */
export function ScreenPreview({ family, title }: { family: string; title: string }) {
  const [selection, setSelection] = useState('');
  const [name, setName] = useState('Alex');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [popup, setPopup] = useState(false);
  const [notice, setNotice] = useState('');
  let content;
  if (family === 'path') content = <>
    <View className="flex-row items-center justify-between mb-5"><MathArtwork name="numbers"/><Badge label="DEMO · 120 XP" tone="brand"/><Ionicons name="heart" size={26} color={colors.heart}/></View>
    <Card title="Unit 1 · Build your number sense"><Text className="ui__body text-text-secondary">Count, combine, and make equal groups.</Text></Card>
    <View className="items-center py-8 gap-2">{[true,false,false,false].map((passed,i)=><View key={i} className="relative w-full items-center" style={{minHeight:112,zIndex:i===1&&popup?10:0}}>
      <View style={{transform:[{translateX:i===0?24:i===2?-32:0}]}}><PathNode label={`Demo path step ${i+1}`} passed={passed?3:0} total={3} studied={0} videoTotal={0} active={i===1} expanded={popup&&i===1} locked={i>1} onPress={()=>i===1?setPopup(!popup):setNotice(i>1?'Pass the earlier unit first.':'Completed preview step.')}/></View>
      {i===1&&popup&&<PathLessonPopup title="Count and compare" detail="Practice · 4 questions" offset={0} locked={false} onClose={()=>setPopup(false)} onStart={()=>setNotice('Open the exercise preview from the library.')}/>}</View>)}<ChestArtwork size={100}/></View>
  </>;
  else if (family==='auth') content=<View className="gap-5"><View className="items-center"><Fox size={148} animate={false}/><Text className="ui__title text-text-primary">{title==='Sign Up'?'Create your account':'Welcome back!'}</Text></View>
    {title==='Sign Up'&&<Field label="Name" value={name} onChangeText={setName}/>}<Field label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" inputMode="email"/><Field label="Password" value={password} onChangeText={setPassword} secureTextEntry/>
    <Action label={title==='Sign Up'?'Create account':'Sign in'} disabled={!email||!password} onPress={()=>setNotice('Form preview only. Real authentication uses Clerk.')}/><Action secondary label="Continue with Google" onPress={()=>setNotice('Provider preview. No sign-in request sent.')}/></View>;
  else if(family==='onboarding'||family==='subjects') content=<View className="gap-4">{family==='onboarding'&&<><ProgressMeter percent={33} label="Onboarding preview progress"/><View className="items-center"><Fox size={138} animate={false}/></View></>}
    <Text className="ui__title text-text-primary">What would you like to learn?</Text>{['Number sense','Arithmetic','Fractions','Algebra','Geometry','Functions'].map(label=><Choice key={label} label={label} selected={selection===label} onPress={()=>setSelection(label)}/>)}<Action label="Continue" disabled={!selection} onPress={()=>setNotice(`${selection} selected in this preview.`)}/></View>;
  else if(family==='profile'||family==='account') content=<View className="gap-5"><View className="items-center bg-brand-soft rounded-2xl p-5 gap-3"><LearnerAvatar size={110}/><Text className="ui__title text-text-primary">{name}</Text><Badge label="Local learner · example profile"/></View>
    {family==='account'?<><Field label="Name" value={name} onChangeText={setName}/><Action label="Save preview" onPress={()=>setNotice('Preview name updated. Saved profile unchanged.')}/></>:<><View className="flex-row flex-wrap gap-3"><StatCard label="Total XP" value="120" icon="flash"/><StatCard label="Day streak" value="3" icon="flame"/></View><CourseCard title="Friends" subtitle="Fictional examples" icon="people" onPress={()=>setNotice('Open Friends in the screen catalog.')}/><CourseCard title="Progress" subtitle="First-answer mastery" icon="stats-chart" onPress={()=>setNotice('Open Progress in the screen catalog.')}/></>}</View>;
  else if(family==='friends'||family==='leaderboard') content=<View className="gap-4">{family==='leaderboard'&&<View className="items-center gap-3"><RankBadge rank={4} size={96}/><Badge label="Local demo · all-time XP" tone="selection"/></View>}
    {family==='friends'&&<Field label="Search example learners" value={selection} onChangeText={setSelection}/>}<ListGroup>{['Maya','Alex','Sam','Noor'].filter(person=>!selection||person.toLowerCase().includes(selection.toLowerCase())).map((person,i)=><View key={person} className="flex-row items-center gap-3 py-3 border-b border-border"><Text className="ui__body-small text-text-secondary">{i+1}</Text><LearnerAvatar avatar={i%2?'ocean':'sun'} size={42}/><View className="flex-1"><Text className="ui__card-title text-text-primary">{person}</Text><Text className="ui__body-small text-text-secondary">Fictional sample</Text></View><Text className="ui__body-small text-text-secondary">{180-i*20} XP</Text></View>)}</ListGroup></View>;
  else if(family==='ranks') content=<View className="flex-row flex-wrap">{RANKS.map((rank,i)=><MotionPressable key={rank.name} accessibilityRole="button" accessibilityLabel={`${rank.name} badge`} containerStyle={{width:'33.33%'}} onPress={()=>setNotice(`${rank.name} collectible preview.`)} className="items-center gap-2 py-4"><RankBadge rank={i}/><Text className="ui__body-small text-text-primary">{rank.name}</Text></MotionPressable>)}</View>;
  else if(family==='settings') content=<View className="gap-4"><Card><View className="flex-row items-center gap-3"><View className="flex-1"><Text className="ui__card-title text-text-primary">{title==='Sounds'?'Sound effects':'Reduced motion'}</Text><Text className="ui__body-small text-text-secondary">Preview preference</Text></View><Switch accessibilityLabel="Preview preference" value={enabled} onValueChange={setEnabled} trackColor={{true:colors.selection,false:colors.border}}/></View></Card><ListGroup>{['Account','Daily goal','Sounds','Privacy'].map(label=><ListRow key={label} title={label} icon="settings-outline" onPress={()=>setNotice(`${label} selected.`)}/>)}</ListGroup></View>;
  else if(family==='statistics'||family==='progress') content=<View className="gap-5"><View className="flex-row flex-wrap gap-3"><StatCard label="First-answer accuracy" value="80%"/><StatCard label="Lessons passed" value="4 / 10"/></View><ProgressMeter percent={40} label="Demo subject coverage" ring/><MathDiagram diagram={{kind:'columns',labels:['M','T','W','T','F'],values:[10,25,0,20,15],caption:'Example active practice XP'}}/>
    {['Level 1 · Counting','Level 2 · Operations','Unit checkpoint'].map((label,i)=><CourseCard key={label} title={label} subtitle={i===0?'Passed · best result saved':i===1?'Available':'Pass all unit lessons first'} completed={i===0} icon={i===2?'trophy':'calculator'} onPress={()=>setNotice(label)}/>)}</View>;
  else if(family==='quests') content=<View className="gap-4"><View className="items-center"><ChestArtwork size={124}/></View>{['Complete a lesson','Answer five questions','Reach your daily goal'].map((label,i)=><Card key={label} title={label}><ProgressMeter percent={[100,60,40][i]} label={label}/><Text className="ui__body-small text-text-secondary">Example daily quest</Text></Card>)}</View>;
  else if(family==='games') content=<View className="gap-5"><Text className="ui__body text-text-secondary">Train your mental math and logic.</Text><View className="flex-row flex-wrap">{['Magic Squares','Cash Dash','Secret Equation','Math Paths'].map((label,i)=><MotionPressable key={label} containerStyle={{width:'50%'}} accessibilityRole="button" accessibilityLabel={`Preview ${label}`} onPress={()=>setNotice(`${label} card selected. Full game rules are a separate feature.`)} className="p-2 items-center gap-2"><View className="w-full aspect-square rounded-2xl border-2 border-b-4 border-border items-center justify-center"><MathArtwork name={(['matrix','calculator','equation','graph'] as const)[i]} size={72}/></View><Text className="ui__card-title text-text-primary text-center">{label}</Text></MotionPressable>)}</View></View>;
  else if(family==='exercise') content=<ReferenceLesson screen={REFERENCE_SCREENS[0]} onClose={()=>setNotice('Preview remains available in the library.')}/>;
  else if(family==='example') content=<View className="gap-5"><Fox size={96} animate={false}/><Text className="ui__title text-text-primary">Keep both sides balanced</Text><MathDiagram diagram={{kind:'flow',nodes:[{label:'Given',value:'x + 3 = 7'},{label:'Subtract 3',value:'x = 7 − 3'},{label:'Solution',value:'x = 4'}]}}/><Action label="Try a question" onPress={()=>setNotice('Example finished. No mastery awarded.')}/></View>;
  else if(family==='video') content=<View className="gap-5"><View className="aspect-video bg-surface border-2 border-border rounded-2xl items-center justify-center gap-3"><Ionicons name="play-circle-outline" size={64} color={colors.selection}/><Text className="ui__body text-text-secondary">Teaching video preview</Text></View><Text className="ui__instruction text-text-primary">Addition with equal groups</Text><Text className="ui__body text-text-secondary">Video study is optional. Practice whenever you are ready.</Text><Action label="Start practice" onPress={()=>setNotice('Practice selected. No playback or progress writes.')}/></View>;
  else if(family==='recovery') content=<View className="gap-5 items-center"><Fox size={170} animate={false}/><Text className="ui__title text-text-primary">Let’s recover a heart</Text><Text className="ui__body text-text-secondary text-center">Your attempt is saved. Complete three guided questions to restore one heart.</Text><View className="w-full"><Action label="Recover a heart" onPress={()=>setNotice('Recovery preview. Actual heart balance unchanged.')}/></View><Badge label="Preview · 0 hearts · next refill 12:30" tone="error"/></View>;
  else if(family==='result') content=<CompletionMoment result={{attemptId:'ui-library-result',lessonId:'ui-library-result',total:4,correct:4,mistakes:0,accuracy:1,stars:3,passed:true,verified:false,xp:0,finishedAt:0,durationMs:142000}}/>;
  else if(family==='studio') content=<View className="gap-5 items-center"><Fox size={224} animate={false}/><Badge label="Current fox · one authored pose" tone="brand"/><View className="flex-row flex-wrap gap-3"><MathArtwork name="numbers" size={72}/><ChestArtwork size={84}/><RankBadge size={84}/></View></View>;
  else if(family==='redirect') content=<View className="gap-5"><EmptyList message="This retired route returns to Home." icon="home-outline"/><Action label="Preview Home" onPress={()=>setNotice('Use the Home screen preview in the library.')}/></View>;
  else content=<View className="gap-4">{['Review number sense','Revisit fractions','Practice algebra'].map(label=><CourseCard key={label} title={label} subtitle={title==='Mistakes'?'Targeted review after a missed first answer':'Optional practice · progress preserved'} icon="refresh" onPress={()=>setNotice(`${label} selected.`)}/>)}<EmptyList message="Saved learning state is unchanged by these examples."/></View>;
  return <View className="gap-4"><Text accessibilityRole="header" className="ui__title text-text-primary">{title}</Text><Badge label="Interactive UI example · disposable state"/>{content}{notice&&<Text accessibilityLiveRegion="polite" className="ui__body text-selection-ink">{notice}</Text>}</View>;
}
