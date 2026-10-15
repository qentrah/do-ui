import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type MathArtworkName = 'numbers' | 'calculator' | 'equation' | 'geometry' | 'fraction' | 'graph' | 'games' | 'quiz' | 'streak' | 'matrix';

/** Original, scalable artwork: rounded silhouettes, a solid face and a darker lower edge. */
export function MathArtwork({name,size=48}:{name:MathArtworkName;size?:number}) {
 const blue='#1CB0F6',edge='#1899D6',orange='#FF9600',gold='#FFC800',ink='#925000';
 return <Svg width={size} height={size} viewBox="0 0 64 64" aria-hidden={true}>
  {name==='calculator'&&<><Rect x="13" y="6" width="38" height="54" rx="10" fill={edge}/><Rect x="13" y="3" width="38" height="52" rx="10" fill={blue}/><Rect x="20" y="10" width="24" height="13" rx="4" fill="#DDF4FF"/>{[21,32,43].flatMap(x=>[32,43].map(y=><Circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="white"/>))}</>}
  {(name==='numbers'||name==='matrix')&&<>{[0,1,2,3].map(i=><Rect key={i} x={7+i%2*27} y={7+Math.floor(i/2)*27} width="23" height="23" rx="6" fill={i===0?gold:i===3?orange:blue}/>)}<Path d="M13 18h11m-5-5v11m23-6h10M14 41l9 9m0-9-9 9m26-6h12m-12 5h12" stroke="white" strokeWidth="4" strokeLinecap="round"/></>}
  {name==='equation'&&<><Rect x="4" y="12" width="56" height="43" rx="12" fill={ink}/><Rect x="4" y="8" width="56" height="43" rx="12" fill={orange}/><Path d="m14 21 12 17m0-17L14 38m22-12h13m-13 9h13" stroke="white" strokeWidth="5" strokeLinecap="round"/></>}
  {name==='geometry'&&<><Circle cx="43" cy="41" r="19" fill={edge}/><Circle cx="43" cy="37" r="19" fill={blue}/><Path d="M5 42 25 7l20 35Z" fill={orange} stroke="white" strokeWidth="3" strokeLinejoin="round"/></>}
  {name==='fraction'&&<><Circle cx="32" cy="34" r="26" fill={ink}/><Circle cx="32" cy="30" r="26" fill={gold}/><Path d="M32 30V4a26 26 0 0 1 26 26Z" fill={orange} stroke="white" strokeWidth="3"/><Path d="M32 30 14 48" stroke="white" strokeWidth="3"/></>}
  {name==='graph'&&<><Path d="M10 7v47h46" fill="none" stroke={edge} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><Path d="m17 40 12-15 12 8 13-19" fill="none" stroke={orange} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>{[[17,40],[29,25],[41,33],[54,14]].map(([x,y])=><Circle key={x} cx={x} cy={y} r="4" fill={gold}/>)}</>}
  {name==='games'&&<><Path d="M18 17h28c9 0 16 30 11 37-6 7-15-8-19-8H26c-4 0-13 15-19 8C2 47 9 17 18 17" fill={edge}/><Path d="M18 12h28c9 0 16 30 11 37-6 7-15-8-19-8H26c-4 0-13 15-19 8C2 42 9 12 18 12" fill={blue}/><Path d="M14 28h14m-7-7v14" stroke="white" strokeWidth="5" strokeLinecap="round"/><Circle cx="44" cy="25" r="4" fill={gold}/><Circle cx="50" cy="34" r="4" fill={orange}/></>}
  {name==='quiz'&&<><Rect x="10" y="11" width="44" height="48" rx="9" fill={ink}/><Rect x="10" y="7" width="44" height="48" rx="9" fill={gold}/><Rect x="22" y="3" width="20" height="10" rx="4" fill={orange}/><Path d="m20 27 4 4 7-9m-11 22 4 4 7-9m7-11h8m-8 16h8" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></>}
  {name==='streak'&&<><Path d="M34 3c2 16 22 20 20 37-2 25-42 26-44 1-1-12 9-21 13-24l2 12Z" fill={orange}/><Path d="M32 30c0 8 11 10 10 18-1 12-21 12-22 0-1-6 7-11 12-18" fill={gold}/></>}
 </Svg>;
}

export function subjectArtwork(id:number):MathArtworkName {
 return (['numbers','calculator','equation','geometry','fraction','graph','graph','equation','matrix','graph','graph','geometry'] as const)[id]??'numbers';
}
