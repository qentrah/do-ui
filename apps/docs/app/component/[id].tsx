import { LibraryScreen } from '../../src/components/LibraryScreen';
import catalog from '../../src/data/catalog.json';
export function generateStaticParams(){return catalog.components.map(entry=>({id:entry.id}));}
export default function PreviewPage(){ return <LibraryScreen/>; }
