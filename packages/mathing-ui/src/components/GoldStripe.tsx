import Svg, { Path, Rect } from 'react-native-svg';

/** A quiet diagonal highlight behind reward headers, never behind question text. */
export function GoldStripe(){
 return <Svg aria-hidden pointerEvents="none" width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none" style={{position:'absolute',inset:0}}><Rect width={400} height={80} fill="#FFC800"/><Path d="M20 80 100 0h48L68 80ZM220 80 300 0h62l-80 80Z" fill="#FFDE27"/></Svg>;
}
