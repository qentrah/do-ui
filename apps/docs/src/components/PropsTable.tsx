import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MotionPressable } from '@qentrah/do-ui';
type PropRow={name:string;type:string;required:boolean;default:string;description:string};
type API={name:string;description:string;props:PropRow[]};
export function PropsTables({apis}:{apis:API[]}){
 return <View className="gap-6">{apis.map(api=><PropsTable key={api.name} api={api}/>)}</View>;
}
function PropsTable({api}:{api:API}){
 const [expanded,setExpanded]=useState(false);
 const rows=expanded?api.props:api.props.slice(0,12);
 return <View className="gap-3">
  <Text accessibilityRole="header" className="ui__instruction text-text-primary">{api.name} props</Text>
  {!!api.description&&<Text className="ui__body-small text-text-secondary">{api.description}</Text>}
  {api.props.length?<><View className="border border-border rounded-xl overflow-hidden"><ScrollView horizontal><View style={{width:850}}>
   <View className="flex-row bg-surface border-b border-border p-3 gap-3">{[['Prop',130],['Type',220],['Required',72],['Default',80],['Description',270]].map(([label,width])=><Text key={label} style={{width:Number(width)}} className="ui__label text-text-primary">{label}</Text>)}</View>
   {rows.map(row=><View key={row.name} accessible accessibilityLabel={`${row.name}, ${row.type}, ${row.required?'required':'optional'}, default ${row.default}. ${row.description}`} className="flex-row border-b border-border p-3 gap-3 bg-white"><Text selectable style={{width:130}} className="ui__body-small text-brand-text">{row.name}</Text><Text selectable style={{width:220,fontFamily:'monospace',fontSize:12,lineHeight:18}} className="text-text-secondary">{row.type}</Text><Text style={{width:72}} className="ui__body-small text-text-secondary">{row.required?'Yes':'No'}</Text><Text selectable style={{width:80}} className="ui__body-small text-text-secondary">{row.default}</Text><Text style={{width:270}} className="ui__body-small text-text-secondary">{row.description}</Text></View>)}
  </View></ScrollView></View>{api.props.length>12&&<MotionPressable accessibilityRole="button" accessibilityLabel={`${expanded?'Show fewer':'Show all'} ${api.name} props`} onPress={()=>setExpanded(!expanded)} className="min-h-11 px-3 py-2 self-start rounded-lg bg-surface"><Text className="ui__label text-text-primary">{expanded?'Show fewer props':`Show all ${api.props.length} props`}</Text></MotionPressable>}</>:<Text className="ui__body-small text-text-secondary">No props are required by this export. See its type definition below for its return value or context contract.</Text>}
 </View>;
}
