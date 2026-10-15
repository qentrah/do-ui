import { createElement, useEffect, useRef, useState } from 'react';
import { Linking, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { MotionPressable } from './Motion';
import type { PlayerProps } from './CoursePlayer';
type Player = {getCurrentTime:()=>number;seekTo:(seconds:number,allowSeekAhead:boolean)=>void;destroy:()=>void};
type YouTubeAPI = {Player:new(element:HTMLElement,options:{videoId:string;width:string;height:string;playerVars:Record<string,number>;events:{onReady:()=>void;onError:()=>void;onStateChange:(event:{data:number})=>void}})=>Player};
declare global {interface Window {YT?:YouTubeAPI;onYouTubeIframeAPIReady?:()=>void}}
let loader:Promise<void>|undefined;
function loadAPI() {
 if(window.YT?.Player)return Promise.resolve();
 if(!loader)loader=new Promise<void>((resolve,reject)=>{
  const previous=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=()=>{previous?.();resolve();};
  const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';
  script.onerror=()=>{loader=undefined;reject(new Error('Video player unavailable'));};
  document.head.appendChild(script);
 });
 return loader;
}
export default function CoursePlayer({videoId,seek,onTimeChange,onPause}:PlayerProps) {
 const host=useRef<HTMLDivElement>(null),player=useRef<Player|null>(null);
 const timeCallback=useRef(onTimeChange),pauseCallback=useRef(onPause);
 timeCallback.current=onTimeChange;pauseCallback.current=onPause;
 const [ready,setReady]=useState(false),[failed,setFailed]=useState(false),[retry,setRetry]=useState(0);
 const lastSeek=useRef<string|null>(null);
 useEffect(()=>{
  let disposed=false;let timer:ReturnType<typeof setInterval>|undefined;
  setReady(false);setFailed(false);lastSeek.current=null;
  const timeout=setTimeout(()=>{if(!disposed)setFailed(true);},12000);
  void loadAPI().then(()=>{
   if(disposed||!host.current||!window.YT)return;
   const target=document.createElement('div');host.current.replaceChildren(target);
   player.current=new window.YT.Player(target,{videoId,width:'100%',height:'100%',playerVars:{playsinline:1,cc_load_policy:1},events:{
    onError:()=>{if(!disposed)setFailed(true);},
    onStateChange:event=>{if(event.data===2)pauseCallback.current?.();},
    onReady:()=>{if(disposed)return;clearTimeout(timeout);setReady(true);setFailed(false);timer=setInterval(()=>timeCallback.current(player.current?.getCurrentTime()??0),500);}
   }});
  }).catch(()=>{if(!disposed)setFailed(true);});
  return()=>{disposed=true;clearTimeout(timeout);clearInterval(timer);player.current?.destroy();player.current=null;};
 },[videoId,retry]);
 useEffect(()=>{if(ready&&seek!==null){const key=`${videoId}:${seek.request}`;if(lastSeek.current!==key){lastSeek.current=key;player.current?.seekTo(seek.seconds,true);}}},[seek,ready,videoId]);
 return <View className="w-full aspect-video rounded-xl overflow-hidden bg-surface border-2 border-border">
  {createElement('div',{ref:host,style:{position:'absolute',inset:0,width:'100%',height:'100%'},'aria-label':'Original YouTube lesson video'})}
  {(!ready||failed)&&<View className="absolute inset-0 bg-surface items-center justify-center px-4 gap-2">
   <Ionicons name={failed?'cloud-offline-outline':'play-circle'} size={38} color={colors.selection}/>
   <Text accessibilityLiveRegion="polite" className="ui__body-small text-text-secondary text-center">{failed?'The video could not load. You can still start practice.':'Loading your video lesson…'}</Text>
   {failed&&<View className="flex-row gap-4"><MotionPressable accessibilityRole="button" accessibilityLabel="Retry loading video" onPress={()=>{loader=undefined;setRetry(value=>value+1);}} className="min-h-11 justify-center"><Text className="ui__label text-selection-ink">RETRY</Text></MotionPressable><MotionPressable accessibilityRole="button" accessibilityLabel="Open original video on YouTube" onPress={()=>{void Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);}} className="min-h-11 justify-center"><Text className="ui__label text-selection-ink">OPEN VIDEO</Text></MotionPressable></View>}
  </View>}
 </View>;
}
