import { Fox } from './Fox';
export function FoxMotion({playId,size=300}:{playId:number;size?:number}) {
 return <Fox key={playId} size={size}/>;
}
