import { Image, View } from 'react-native';
import { images } from '../constants/images';
export const AVATARS=['sun','ocean','mint'] as const;
export type AvatarName=typeof AVATARS[number];
export function LearnerAvatar({avatar='sun',size=88,portrait=false}:{avatar?:AvatarName;size?:number;portrait?:boolean}) {
 const backgroundColor=avatar==='ocean'?'#DDF4FF':avatar==='mint'?'#D7FFB8':'#FFF0CF';
 return <View style={{width:size,height:size,borderRadius:portrait?0:size/2,backgroundColor:portrait?'transparent':backgroundColor,overflow:'hidden'}}><Image source={images.foxPortrait} style={{width:size,height:size}} resizeMode="contain" accessible={false}/></View>;
}
