import { useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { Action } from './MathUI';
import { Field } from './ui/Primitives';
type Props={visible:boolean;email:string;onClose:()=>void;onVerify:(code:string)=>Promise<void>;onResend:()=>Promise<void>;error?:string};
export default function VerificationModal({visible,email,onClose,onVerify,onResend,error}:Props){
 const [code,setCode]=useState('');
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 useEffect(()=>{if(visible){setCode('');setMessage('');}},[visible]);
 async function submit(resend=false){
  if(busy)return;
  setBusy(true);setMessage('');
  try{if(resend){await onResend();setMessage('A new code was requested.');}else await onVerify(code);}
  catch(reason){setMessage(reason instanceof Error?reason.message:'The request could not be completed.');}
  finally{setBusy(false);}
 }
 return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}><View className="flex-1 items-center justify-center px-5 bg-black/50"><View accessibilityViewIsModal className="w-full max-w-[420px] rounded-2xl bg-white p-6 gap-4"><Text accessibilityRole="header" className="ui__title text-text-primary">Check your inbox</Text><Text className="ui__body text-text-secondary">Enter the six-digit code sent to {email}.</Text><Field label="Verification code" value={code} onChangeText={text=>setCode(text.replace(/\D/g,'').slice(0,6))} inputMode="numeric" maxLength={6} editable={!busy}/>{!!(error||message)&&<Text accessibilityLiveRegion="polite" className="ui__body-small text-text-primary">{error||message}</Text>}<Action label={busy?'Please wait':'Verify code'} disabled={busy||code.length!==6} onPress={()=>void submit()}/><Action secondary label="Resend code" disabled={busy} onPress={()=>void submit(true)}/><Action secondary label="Close" disabled={busy} onPress={onClose}/></View></View></Modal>;
}
