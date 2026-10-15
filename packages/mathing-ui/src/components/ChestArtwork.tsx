import Svg, { Path, Rect } from 'react-native-svg';

/** Original gold chest: a readable closed lid or genuinely open dark interior. */
export function ChestArtwork({size,opened=false,dimmed=false}:{size:number;opened?:boolean;dimmed?:boolean}){
 const gold=dimmed?'#EDB927':'#FFC800';
 return <Svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
  <Rect x={10} y={79} width={80} height={14} rx={4} fill="#E5E5E5"/>
  <Rect x={18} y={45} width={64} height={42} rx={3} fill="#BA7800"/>
  <Rect x={23} y={48} width={54} height={28} fill={opened?'#805000':'#D79200'}/>
  <Path d="M17 42h11v48H17Zm55 0h11v48H72Z" fill={gold}/>
  <Path d="M25 79h50v7H25Z" fill="#E3A100"/>
  {opened?<><Path d="M20 13h60v29H20Z" fill="#B57700"/><Path d="M18 11h15v30H18Zm49 0h15v30H67Z" fill="#FFD900"/><Path d="M17 29h66v16H17Z" fill="#FFE600"/></>:<><Path d="M17 40V23h66v17Z" fill="#E7AA00"/><Path d="M18 22h15v20H18Zm49 0h15v20H67Z" fill="#FFE22C"/><Path d="M15 39h70v14H15Z" fill={gold}/></>}
  <Path d={opened?'M43 30h14v15H43Z':'M43 40h14v16H43Z'} fill="#FFC800"/>
  <Path d={opened?'M50 33a4 4 0 1 0 0 8v3h-3v-5a4 4 0 0 0 3-6Z':'M50 43a4 4 0 1 0 0 8v3h-3v-5a4 4 0 0 0 3-6Z'} fill="#A76B00"/>
 </Svg>;
}
