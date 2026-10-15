import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native';
import { ListPage, ReferenceLesson } from '@qentrah/mathing-ui';
import { REFERENCE_SCREENS } from '@qentrah/mathing-ui/fixtures';
export function generateStaticParams(){return REFERENCE_SCREENS.map(entry=>({id:entry.id}));}
export default function ReferencePage(){
 const {id}=useLocalSearchParams<{id:string}>();const router=useRouter();const entry=REFERENCE_SCREENS.find(item=>item.id===id);
 return <ListPage title={entry?`Grade ${entry.grade} · ${entry.topic}`:'Reference not found'} back onBack={()=>router.replace('/')}>
 {entry?<ReferenceLesson screen={entry} onClose={()=>router.replace('/')}/>:<Text>Choose a reference from the catalog.</Text>}</ListPage>;
}
