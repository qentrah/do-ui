import { useId } from 'react';
import Svg, { ClipPath, Defs, Ellipse, G, Path } from 'react-native-svg';

/** Original completed-step artwork, shared by the path and result celebration. */
export function CompletedMedal({size=82}:{size?:number}) {
 const clip=useId().replace(/:/g,'');
 return <Svg width={size} height={size} viewBox="0 0 100 100" aria-hidden pointerEvents="none">
  <Defs><ClipPath id={clip}><Ellipse cx={50} cy={43} rx={43} ry={36}/></ClipPath></Defs>
  <Ellipse cx={50} cy={55} rx={43} ry={36} fill="#DDA000"/>
  <Ellipse cx={50} cy={47} rx={43} ry={36} fill="#F3B800"/>
  <Ellipse cx={50} cy={43} rx={43} ry={36} fill="#FFC800"/>
  <G clipPath={`url(#${clip})`}><Path d="M-5 67 59 0h20L14 78ZM29 85 97 12h18L47 92Z" fill="#FFE430"/></G>
  <Path d="m34 44 11 11 23-25" fill="none" stroke="#B97500" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round"/>
 </Svg>;
}
