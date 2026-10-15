import { useState } from 'react';
import { Image, View } from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { images } from '../constants/images';
import registration from '../constants/registration';
import { useFeedbackPhase } from '../hooks/useFeedbackPhase';
import { MotionReaction } from './Motion';
import { POSE_BLEND_MS, REACTION_DURATION_MS } from '../lib/feedbackTiming';
export type CharacterName = 'fox' | 'nia' | 'orbit';
export type CharacterPose = 'idle' | 'thinking' | 'success' | 'retry';
const poses: CharacterPose[] = ['idle', 'thinking', 'success', 'retry'];

/** Mount all registered poses once, keeping the body origin fixed during a short dissolve. */
export function CharacterSprite({ character, pose = 'idle', size = 64 }: { character: CharacterName; pose?: CharacterPose; size?: number; animate?: boolean }) {
  if (character === 'fox') return <MotionReaction reaction={pose}><Image source={images.fox} accessibilityLabel="Fox" resizeMode="contain" style={{width:size,height:size}}/></MotionReaction>;
  return <RegisteredCharacter character={character} pose={pose} size={size}/>;
}
function RegisteredCharacter({character,pose,size}:{character:'nia'|'orbit';pose:CharacterPose;size:number}) {
  const label = character === 'nia' ? 'Nia' : 'Orbit';
  const phase = useFeedbackPhase(pose);
  const [transition, setTransition] = useState({ from: pose, to: pose });
  if (transition.to !== pose) setTransition({ from: transition.to, to: pose });
  const from = transition.from;
  const imageSize = size * registration.displayScale[character], inset = (size - imageSize) / 2;
  return <View accessible accessibilityLabel={`${label} ${pose === 'success' ? 'celebrates' : pose === 'retry' ? 'encourages you to try again' : pose === 'thinking' ? 'thinks with you' : 'is ready'}`} testID={`${character}-registered-${pose}`} style={{ width: size, height: size }}>
    {poses.map(candidate => <PoseImage key={candidate} character={character} candidate={candidate} pose={pose} from={from} phase={phase}  size={imageSize} inset={inset} />)}
  </View>;
}
function PoseImage({ character, candidate, pose, from, phase, size, inset }: { character: CharacterName; candidate: CharacterPose; pose: CharacterPose; from: CharacterPose; phase: SharedValue<number>; size: number; inset: number }) {
  const style = useAnimatedStyle(() => {
    const blend = Math.min(1, phase.value * REACTION_DURATION_MS / POSE_BLEND_MS);
    return { opacity: candidate === pose ? (from === pose ? 1 : blend) : candidate === from ? 1 - blend : 0 };
  });
  return <Animated.Image source={images.companions[character][candidate]} accessible={false} resizeMode="contain" fadeDuration={0} style={[{ position: 'absolute', width: size, height: size, left: inset, top: inset }, style]} />;
}
