import { useLocalSearchParams } from 'expo-router';
import { LibraryScreen } from '../../src/components/LibraryScreen';
import catalog from '../../src/data/catalog.json';
export function generateStaticParams(){return catalog.screens.map(entry=>({id:entry.id}));}
export default function PreviewPage(){
 const {id}=useLocalSearchParams<{id:string}>();
 return <LibraryScreen initialScreen={id}/>;
}
