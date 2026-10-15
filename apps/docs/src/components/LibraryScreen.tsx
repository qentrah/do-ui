import packageInfo from '../data/packageInfo.json';
import { useEffect, useRef, useState } from 'react';
import { Linking, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import catalog from '../data/catalog.json';
import { REFERENCE_SCREENS } from '@qentrah/do-ui/fixtures';
import { colors , Action , MathArtwork , MotionPressable , Badge, Card, Field, Section , ScreenPreview , ReferenceLesson } from '@qentrah/do-ui';
import { ComponentPreview } from './ComponentPreview';
import { ComponentDocumentation, SetupDocumentation, ScreenDocumentation, CodeBlock } from './Documentation';
import { IconGallery } from './IconGallery';
import { componentGroups } from '../data/componentGroups';

const views=['Documentation','Components','Icons','Screens','Math references','Tokens'] as const;
type LibraryView=typeof views[number];
export function LibraryScreen({initialScreen}:{initialScreen?:string}={}){
  const params=useLocalSearchParams<{view?:string;id?:string;screen?:string}>();
  const router=useRouter();
  const contentRef=useRef<ScrollView>(null);
  const {width}=useWindowDimensions();
  const [mounted,setMounted]=useState(false);
  useEffect(()=>setMounted(true),[]);
  const wide=mounted&&width>=900;
  const [menuOpen,setMenuOpen]=useState(false);
  const [view,setView]=useState<LibraryView>(views.find(item=>item===params.view)??(initialScreen||params.screen?'Screens':'Components'));
  const [query,setQuery]=useState('');
  const [closedGroups,setClosedGroups]=useState<string[]>([]);
  const [grade,setGrade]=useState(2);
  const [componentId,setComponentId]=useState(params.id??'MathUI');
  const [screenId,setScreenId]=useState(initialScreen??params.screen??params.id??'tabs-home');
  const [referenceId,setReferenceId]=useState(params.id??REFERENCE_SCREENS[0].id);
  const component=catalog.components.find(item=>item.id===componentId)??catalog.components[0];
  const screen=catalog.screens.find(item=>item.id===screenId)??catalog.screens[0];
  const reference=REFERENCE_SCREENS.find(item=>item.id===referenceId)??REFERENCE_SCREENS[0];
  const filtered=(text:string)=>text.toLowerCase().includes(query.toLowerCase());
  const components=catalog.components.filter(item=>filtered(`${item.title} ${item.exports.join(' ')} ${item.source}`));
  const screens=catalog.screens.filter(item=>filtered(`${item.title} ${item.family} ${item.source}`));
  const references=REFERENCE_SCREENS.filter(item=>item.grade===grade&&filtered(`${item.topic} ${item.prompt} ${item.mode}`));
  function changeView(next:LibraryView){setView(next);setQuery('');setMenuOpen(false);contentRef.current?.scrollTo({y:0,animated:false});}

  const chooser=<View className="gap-2">
    <Field label="Search library" placeholder={view==='Screens'?'Screen name or route':view==='Math references'?'Topic or interaction':'Component or export'} value={query} onChangeText={setQuery}/>
    {view==='Math references'&&<View className="flex-row flex-wrap gap-2 my-2">{[2,3,4,5,6,7,8].map(number=><MotionPressable key={number} accessibilityRole="button" accessibilityLabel={`Show grade ${number}`} accessibilityState={{selected:grade===number}} onPress={()=>{setGrade(number);setReferenceId(REFERENCE_SCREENS.find(item=>item.grade===number)!.id);}} className={`min-h-11 min-w-11 px-3 py-2 rounded-xl border-2 ${grade===number?'border-brand bg-brand-soft':'border-border bg-white'}`}><Text className="ui__label text-text-primary">{number}</Text></MotionPressable>)}</View>}
    <Text accessibilityLiveRegion="polite" className="ui__body-small text-text-secondary my-2">{view==='Components'?components.length:view==='Screens'?screens.length:references.length} entries</Text>
    {view==='Components'&&componentGroups.map(group=>{
      const entries=components.filter(item=>(group.ids as readonly string[]).includes(item.id));
      if(!entries.length)return null;
      const open=!!query||!closedGroups.includes(group.title);
      return <View key={group.title} className="gap-1 mb-2"><MotionPressable accessibilityRole="button" accessibilityLabel={`Toggle ${group.title} group`} accessibilityState={{expanded:open}} onPress={()=>setClosedGroups(current=>current.includes(group.title)?current.filter(name=>name!==group.title):[...current,group.title])} className="min-h-11 flex-row items-center gap-2 px-1"><Ionicons accessible={false} name={open?'chevron-down':'chevron-forward'} size={14} color={colors.muted}/><Text className="text-xs font-bold text-text-secondary flex-1">{group.title.toUpperCase()}</Text><Text className="text-xs text-text-secondary">{entries.length}</Text></MotionPressable>{open&&<View className="ml-2 pl-2 border-l border-border gap-1">{entries.map(item=><CatalogItem key={item.id} label={item.title} detail={`${item.exports.length} exports · presentational`} selected={component.id===item.id} onPress={()=>{setComponentId(item.id);setMenuOpen(false);contentRef.current?.scrollTo({y:0,animated:false});}}/>)}</View>}</View>;
    })}
    {view==='Screens'&&screens.map(item=><CatalogItem key={item.id} label={item.title} detail={item.source} selected={screen.id===item.id} onPress={()=>{setScreenId(item.id);setMenuOpen(false);contentRef.current?.scrollTo({y:0,animated:false});}}/>)}
    {view==='Math references'&&references.map(item=><CatalogItem key={item.id} label={`${item.topic} · ${item.panel}`} detail={item.mode} selected={reference.id===item.id} onPress={()=>{setReferenceId(item.id);setMenuOpen(false);contentRef.current?.scrollTo({y:0,animated:false});}}/>)}
    {((view==='Components'&&!components.length)||(view==='Screens'&&!screens.length)||(view==='Math references'&&!references.length))&&<Card><Text className="ui__body text-text-secondary">No matches. Try a different search.</Text></Card>}
  </View>;
  const preview=<View className="gap-5">
    {view==='Components'&&<><Section title={component.title} detail="Reusable React Native component"><Badge label={`${packageInfo.name} · v${packageInfo.version}`} tone="brand"/><ComponentDocumentation key={component.id} id={component.id} exports={component.exports}><ComponentPreview key={component.id} id={component.id}/></ComponentDocumentation></Section><Action secondary label="Open component on its own" onPress={()=>router.push(`/component/${component.id}`)}/></>}
    {view==='Screens'&&<><Section title={screen.title} detail={`Screen template · ${screen.family}`}><ScreenDocumentation key={screen.id} id={screen.id}><ScreenPreview key={screen.id} family={screen.family} title={screen.title}/></ScreenDocumentation></Section><Action secondary label="Open screen preview on its own" onPress={()=>router.push(`/screen/${screen.id}`)}/></>}
    {view==='Math references'&&<><Section title={`Grade ${reference.grade} · ${reference.topic}`} detail={`${reference.asset} · panel ${reference.panel}`}><Badge label="Source-inspired React Native reconstruction" tone="selection"/><Text className="ui__body-small text-text-secondary">Original vector models and disposable answers. Reference characters and phone frames are excluded. Some models use adapted givens; this is not a claim of pixel-perfect parity.</Text><ReferenceLesson key={reference.id} screen={reference} onClose={()=>changeView('Screens')}/></Section><Action secondary label="Open reference preview on its own" onPress={()=>router.push(`/reference/${reference.id}`)}/><Action secondary label="Read official grade guide" onPress={()=>void Linking.openURL(reference.sourceUrl)}/></>}
  </View>;
  const hasCatalog=view==='Components'||view==='Screens'||view==='Math references';
  const navigation=<View accessibilityRole="tablist" className="flex-row gap-1">{views.map(item=><MotionPressable key={item} accessibilityRole="tab" accessibilityLabel={item} aria-selected={view===item} accessibilityState={{selected:view===item}} onPress={()=>changeView(item)} className={`min-h-11 px-4 py-2 rounded-lg flex-row items-center gap-2 ${view===item?'bg-brand-soft':'bg-transparent'}`}><Ionicons accessible={false} name={item==='Documentation'?'book-outline':item==='Components'?'cube-outline':item==='Icons'?'shapes-outline':item==='Screens'?'phone-portrait-outline':item==='Tokens'?'color-palette-outline':'calculator-outline'} size={17} color={view===item?colors.brandText:colors.muted}/><Text className={`ui__label ${view===item?'text-brand-text':'text-text-secondary'}`}>{item}</Text></MotionPressable>)}</View>;
  const content=view==='Documentation'?<SetupDocumentation/>:view==='Icons'?<IconGallery/>:view==='Tokens'?<Section title="Design tokens" detail="Shared colors, typography and NativeWind utilities."><View className="flex-row flex-wrap gap-3">{Object.entries(colors).map(([name,color])=><View key={name} className="w-32 border border-border rounded-xl overflow-hidden bg-white"><View className="h-14" style={{backgroundColor:color}}/><View className="p-3"><Text className="ui__label text-text-primary">{name}</Text><Text selectable className="ui__body-small text-text-secondary">{color}</Text></View></View>)}</View><CodeBlock code={"import { colors } from '@qentrah/do-ui';\n\n// NativeWind: bg-brand, text-text-primary, border-border\n// Native styles: { backgroundColor: colors.brand }"}/><Card title="Typography"><Text className="ui__title text-text-primary">Clear screen title</Text><Text className="ui__instruction text-text-primary">One short instruction</Text><Text className="ui__math text-text-primary">3 × 4 = 12</Text><Text className="ui__body text-text-secondary">Nunito body text explains the mathematical task.</Text></Card></Section>:preview;
  return <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
    <View className="border-b border-border px-5 py-4 flex-row items-center gap-3">
      <MathArtwork name="numbers" size={32}/><View className="flex-1"><Text accessibilityRole="header" className="ui__label text-text-primary">Do UI</Text><Text className="text-xs text-text-secondary">Component library & documentation</Text></View><Badge label={`v${packageInfo.version}`}/>
      {!wide&&hasCatalog&&<MotionPressable accessibilityRole="button" accessibilityLabel={menuOpen?'Close library navigation':'Open library navigation'} accessibilityState={{expanded:menuOpen}} onPress={()=>setMenuOpen(!menuOpen)} className="w-11 h-11 items-center justify-center border border-border rounded-lg"><Ionicons accessible={false} name={menuOpen?'close':'menu'} size={23} color={colors.text}/></MotionPressable>}
    </View>
    <View className="border-b border-border bg-white"><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16,paddingVertical:8}}>{navigation}</ScrollView></View>
    <View className="flex-1" style={{flexDirection:wide?'row':'column'}}>
      {wide&&hasCatalog?<View className="border-r border-border bg-surface" style={{width:264}}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{padding:16,paddingBottom:32}}>{chooser}</ScrollView></View>:!wide&&menuOpen&&hasCatalog?<ScrollView keyboardShouldPersistTaps="handled" style={{maxHeight:320}} contentContainerStyle={{padding:16}}>{chooser}</ScrollView>:null}
      <ScrollView ref={contentRef} keyboardShouldPersistTaps="handled" contentContainerStyle={{padding:wide?32:16,paddingBottom:48,width:'100%',maxWidth:1040,alignSelf:'center'}} className="flex-1">
        <View className="flex-row items-center justify-between gap-3 mb-6"><Text className="ui__body-small text-text-secondary flex-1">Library / {view}{view==='Components'?` / ${component.title}`:''}</Text>{!wide&&hasCatalog&&<MotionPressable accessibilityRole="button" accessibilityLabel="Browse library entries" onPress={()=>setMenuOpen(!menuOpen)} className="min-h-11 px-3 justify-center rounded-lg bg-surface"><Text className="ui__label text-text-primary">Browse</Text></MotionPressable>}</View>
        {content}
      </ScrollView>
    </View>
  </SafeAreaView>;
}

function CatalogItem({label,detail,selected,onPress}:{label:string;detail:string;selected:boolean;onPress:()=>void}){
  return <MotionPressable accessibilityRole="button" accessibilityLabel={`${label}. ${detail}`} accessibilityState={{selected}} onPress={onPress}
    className={`min-h-11 rounded-lg px-3 py-2 border flex-row items-center gap-2 ${selected?'border-brand bg-brand-soft':'border-border bg-white'}`}>
    <View className="flex-1"><Text className="ui__label text-text-primary">{label}</Text></View><Ionicons accessible={false} name="chevron-forward" size={18} color={colors.muted}/>
  </MotionPressable>;
}
