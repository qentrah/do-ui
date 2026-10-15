import { GoldStripe } from './GoldStripe';
import { CompletedMedal } from './CompletedMedal';
import { colors } from '../constants/colors';
import { useState } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ChestArtwork } from './ChestArtwork';
import { MotionPressable } from './Motion';
import { Action } from './MathUI';

export function UnitChest({title,done,total,passed=false,onContinue}:{passed?:boolean;title:string;done:number;total:number;onContinue:()=>void}){
 const [visible,setVisible]=useState(false),[opened,setOpened]=useState(false);
 const complete=passed;
 function close(){setVisible(false);setOpened(false);}
 return <>
  <View className="items-center mb-5">
   <MotionPressable accessibilityRole="button" accessibilityLabel={`${title} chest. ${done} of ${total} lessons completed`} onPress={()=>setVisible(true)} className="w-24 h-24 items-center justify-center">
    <ChestArtwork size={96} opened={complete} dimmed={!complete}/>
   </MotionPressable>
  </View>
  <Modal visible={visible} animationType="fade" onRequestClose={close}>
   <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
    <View className="w-full max-w-[520px] self-center items-end px-4"><MotionPressable accessibilityRole="button" accessibilityLabel="Close chest" onPress={close} className="w-11 h-11 items-center justify-center"><Ionicons name="close" size={24} color={colors.muted}/></MotionPressable></View>
    <ScrollView contentContainerStyle={{flexGrow:1,alignItems:'center',justifyContent:'center',padding:24,width:'100%',maxWidth:520,alignSelf:'center'}}>
     <View className="self-stretch rounded-2xl overflow-hidden px-5 py-4 mb-5"><GoldStripe/><Text accessibilityRole="header" className="ui__card-title text-brand-ink text-center">{title}</Text></View>{opened&&<CompletedMedal size={96}/>}
     <MotionPressable disabled={!complete||opened} accessibilityRole="button" accessibilityLabel={complete?'Open chest':'Chest locked until unit checkpoint is passed'} accessibilityState={{disabled:!complete||opened}} onPress={()=>setOpened(true)} className="items-center justify-center my-4">
      <ChestArtwork size={256} opened={opened}/>
     </MotionPressable>
     <Text accessibilityLiveRegion="polite" className="font-poppins-bold text-lg text-text-primary text-center">{complete?(opened?'Unit passed!':'Tap to open'):`${done} / ${total} lessons complete`}</Text>
     {!complete&&<Text className="font-poppins text-base text-text-secondary text-center mt-2">Pass the lessons and the checkpoint with at least 80% to open this chest.</Text>}
    </ScrollView>
    <View className="w-full max-w-[520px] self-center px-5 py-4"><Action label={complete?'Review checkpoint':done===total?'Take checkpoint':'Go to prerequisite'} onPress={()=>{close();onContinue();}}/></View>
   </SafeAreaView>
  </Modal>
 </>;
}
