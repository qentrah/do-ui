import { Image, View } from 'react-native';
import { images } from '../constants/images';
import { MotionReaction } from './Motion';
export type FoxLessonAction = 'passed' | 'perfect' | 'recovery';

// New single-pose artwork: a gentle reaction, not the retired character's atlas.
export function FoxLessonMotion({action,eventId,size=192}:{action:FoxLessonAction;eventId:string;size?:number}) {
 return <View accessible accessibilityLabel={action==='recovery'?'Fox encourages you':'Fox celebrates your progress'} style={{width:size,height:size}}>
  <MotionReaction key={eventId} reaction={action==='recovery'?'retry':'success'}><Image source={images.fox} accessible={false} resizeMode="contain" style={{width:size,height:size}}/></MotionReaction>
 </View>;
}
