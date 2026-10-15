import { useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Action, DuoIcon, Field, MotionPressable, colors } from '@qentrah/do-ui';
import { CodeBlock } from './Documentation';
const artwork=['home','practice','chest','shield','profile','math','gem'] as const;
type IoniconName=keyof typeof Ionicons.glyphMap;
export function IconGallery(){
 const [query,setQuery]=useState('');
 const [limit,setLimit]=useState(72);
 const [selected,setSelected]=useState<{name:string;artwork:boolean}>({name:'home',artwork:true});
 const matches=(Object.keys(Ionicons.glyphMap) as IoniconName[]).filter(name=>name.includes(query.toLowerCase()));
 return <View className="gap-5">
  <Text accessibilityRole="header" className="ui__title text-text-primary">Icons</Text>
  <Text className="ui__body text-text-secondary">Choose an icon to see its import and usage. Illustrated navigation artwork comes from @qentrah/do-ui; interface icons use the existing Expo Ionicons dependency.</Text>
  <Field label="Search icons" placeholder="Search by name, e.g. heart" value={query} onChangeText={value=>{setQuery(value);setLimit(72);}}/>
  <CodeBlock code={selected.artwork?`import { DuoIcon } from '@qentrah/do-ui';\n\n<DuoIcon name="${selected.name}" size={32} />`:`import { Ionicons } from '@expo/vector-icons';\n\n<Ionicons name="${selected.name}" size={24} color="#4b4b4b" />`}/>
  <Text className="ui__body-small text-text-secondary">Decorative icons should be hidden from accessibility. Give actionable icon buttons a descriptive label.</Text>
  <Text accessibilityRole="header" className="ui__instruction text-text-primary">Illustrated icons</Text>
  <View className="flex-row flex-wrap gap-3">{artwork.filter(name=>name.includes(query.toLowerCase())).map(name=><MotionPressable key={name} accessibilityRole="button" accessibilityLabel={`Use illustrated ${name} icon`} accessibilityState={{selected:selected.artwork&&selected.name===name}} onPress={()=>setSelected({name,artwork:true})} className={`w-28 min-h-24 rounded-xl border p-3 items-center justify-center gap-2 ${selected.artwork&&selected.name===name?'border-brand bg-brand-soft':'border-border bg-white'}`}><DuoIcon name={name} size={32}/><Text className="ui__body-small text-text-primary">{name}</Text></MotionPressable>)}</View>
  <Text accessibilityRole="header" className="ui__instruction text-text-primary">Interface icons · {matches.length}</Text>
  <View className="flex-row flex-wrap gap-3">{matches.slice(0,limit).map(name=><MotionPressable key={name} accessibilityRole="button" accessibilityLabel={`Use ${name} icon`} accessibilityState={{selected:!selected.artwork&&selected.name===name}} onPress={()=>setSelected({name,artwork:false})} className={`w-28 min-h-28 rounded-xl border p-3 items-center justify-center gap-2 ${!selected.artwork&&selected.name===name?'border-brand bg-brand-soft':'border-border bg-white'}`}><Ionicons accessible={false} name={name} size={26} color={colors.text}/><Text className="text-xs text-text-secondary text-center">{name}</Text></MotionPressable>)}</View>
  {!matches.length&&<Text className="ui__body text-text-secondary">No icons match this search.</Text>}
  {matches.length>limit&&<Action secondary label="Show more icons" onPress={()=>setLimit(limit+72)}/>}
 </View>;
}
