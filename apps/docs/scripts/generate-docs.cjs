const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');
const root = path.resolve(__dirname, '../../../packages/do-ui');
const catalog = require('../src/data/catalog.json');
const config=ts.readConfigFile(path.join(root,'tsconfig.json'),ts.sys.readFile);
const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,root);
const program=ts.createProgram(parsed.fileNames,parsed.options);
const checker=program.getTypeChecker();
const sources=program.getSourceFiles().filter(file=>file.fileName.startsWith(path.join(root,'src'))&&file.fileName.endsWith('.tsx'));
const preview=ts.createSourceFile('ComponentPreview.tsx',fs.readFileSync(path.join(__dirname,'../src/components/ComponentPreview.tsx'),'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
const demo=preview.statements.find(s=>ts.isFunctionDeclaration(s)&&s.name?.text==='ComponentPreview');
const switchNode=demo.body.statements.find(ts.isSwitchStatement);
const imports=preview.statements.filter(ts.isImportDeclaration);
const states=demo.body.statements.filter(s=>ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>ts.isArrayBindingPattern(d.name)));
const printer=ts.createPrinter({newLine:ts.NewLineKind.LineFeed});
function identifiers(node){const names=new Set();function visit(n){if(ts.isIdentifier(n))names.add(n.text);ts.forEachChild(n,visit);}visit(node);return names;}
function usage(id){
 let index=switchNode.caseBlock.clauses.findIndex(c=>ts.isCaseClause(c)&&c.expression.text===id);
 if(index<0)throw new Error(`Missing preview for ${id}`);
 while(!switchNode.caseBlock.clauses[index].statements.length)index++;
 const statements=switchNode.caseBlock.clauses[index].statements.filter(s=>!ts.isBreakStatement(s));
 let body=statements.map(s=>s.getText(preview)).join('\n');
 const names=identifiers(ts.createSourceFile('demo.tsx',body,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX));
 const local=states.filter(s=>[...identifiers(s.declarationList.declarations[0].name)].some(name=>names.has(name))).map(s=>s.getText(preview));
 if(local.length)names.add('useState');
 if(names.has('setNotice'))names.add('Text');
 let question='';
 if(names.has('question')){question=preview.statements.find(s=>ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>d.name.getText(preview)==='question')).getText(preview);names.add('Question');}
 const selectedImports=imports.flatMap(s=>{
  const bindings=s.importClause?.namedBindings;
  if(!bindings||!ts.isNamedImports(bindings))return [];
  const selected=bindings.elements.filter(e=>names.has(e.name.text)).map(e=>e.getText(preview));
  return selected.length?[`import ${s.importClause.isTypeOnly?'type ':''}{ ${selected.join(', ')} } from ${s.moduleSpecifier.getText(preview)};`]:[];
 });
 return printer.printFile(ts.createSourceFile('Example.tsx',`${selectedImports.join('\n')}\n${question}\nexport function ${id}Example() {\n${local.join('\n')}\nlet content;\n${body}\nreturn ${names.has('setNotice')?'<>{content}{notice && <Text accessibilityLiveRegion="polite">{notice}</Text>}</>':'content'};\n}`,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX));
}
const descriptions={
 MathUI:'Screen layout, headings, actions and course cards for learning flows.',Primitives:'Cards, choices, inputs, badges and statistics for composing interfaces.',ListUI:'Grouped rows, empty states and list-page layouts.',PageHeader:'A page title with a caller-owned back action.',TabBar:'Labeled navigation controlled by a selected key and callback.',PreferenceSwitch:'A labeled preference switch with caller-owned state.',SocialButton:'A provider-style action button; authentication belongs to your app.',VerificationModal:'A verification dialog with caller-owned verification and resend handlers.',UIProvider:'Optional animation preferences that respect system reduced motion.',
 LearningPath:'A lesson path driven by explicit steps and selection callbacks.',PathNode:'A circular lesson node showing progress and availability.',PathLessonPopup:'An anchored lesson popup with optional study and practice actions.',LessonCard:'A lesson summary card with a caller-owned completion status.',HeartsButton:'A heart count with an optional action; it does not spend or refill hearts.',ProgressMeter:'Linear or ring progress from a supplied percentage.',ProgressSaveNotice:'A persistence-error notice with an explicit retry callback.',LockedActivity:'A prerequisite message with caller-owned navigation actions.',UnitCheckpoint:'A unit checkpoint summary driven by availability and completion props.',UnitChest:'A unit reward chest with progress and a continuation callback.',StatsStrip:'A row of typed statistic items and optional actions.',
 AlgebraModel:'A visual model of grouped algebra units.',FractionModel:'An interactive fractional-part model with a controlled answer.',FunctionGraph:'A graph-answer interface driven by a question and controlled value.',MatchingPairs:'An interactive pair-matching answer control.',NumberAnswer:'A controlled numeric-answer keypad.',MathDiagram:'Authored visual models for mathematical givens.',SubjectDiagram:'Subject-specific diagrams, including fractions and geometry.',MathExpression:'Mathematical expression typography.',MathCanvas:'Original coordinate, geometry, hundred-grid and liquid models.',QuestionInteraction:'A typed question rendered with its matching answer control.',QuestionStage:'The givens and model for a typed question.',LessonPrompt:'A short task prompt with lesson-mode character presentation.',PuzzleScene:'A visual puzzle scene with caller-controlled success state.',ReferenceLesson:'An interactive reference adaptation with disposable demo answers.',CoursePlayer:'An embedded teaching-video player with playback callbacks.',ScreenPreview:'Interactive screen-family compositions with disposable local state.',
 CharacterSprite:'Registered original character artwork and available poses.',Dodo:'The current original companion artwork.',Fox:'The current one-pose fox with optional subtle motion.',LearnerAvatar:'A bundled learner avatar from the available variants.',MathArtwork:'Original illustrations for mathematical subjects and activities.',ModeCharacter:'Companion presentation for a lesson interaction mode.',DuoIcons:'Illustrated navigation icons with a constrained name set.',ChestArtwork:'Chest artwork with caller-controlled open state.',GoldStripe:'A decorative reward stripe.',RankBadge:'A rank badge from the bundled rank collection.',ResultIcon:'An icon for XP, accuracy or active time.',
 Motion:'Motion wrappers for entry, press, progress and feedback reactions.',FoxMotion:'Replayable subtle motion for the current fox pose.',FoxLessonMotion:'Cancellable fox presentation driven by a lesson event.',FeedbackClock:'A presentation-clock context for synchronized feedback.',FeedbackPanel:'Feedback messages and their result-colored footer.',CompletedMedal:'Artwork for a completed activity.',CompletionMoment:'A results composition driven by a recorded lesson result.',StreakMoment:'Streak presentation from a supplied count.',ProfileHero:'A profile heading with caller-owned edit, share and navigation actions.',ProfileOverview:'Profile statistics with explicit navigation callbacks.',
};
const help={children:'Content rendered inside the component.',onPress:'Called when the action is pressed.',onChange:'Receives the next controlled value.',onChangeText:'Receives the edited text.',onSelect:'Receives the selected item or coordinate.',onBack:'Called when the back action is pressed.',onClose:'Called when the preview or dialog requests closing.',value:'Current controlled value; update it in the corresponding callback.',disabled:'Disables interaction when true.',title:'Visible heading or title.',label:'Visible label used to describe the control.',size:'Rendered artwork size in logical pixels.',className:'NativeWind utility classes for layout and appearance.',style:'React Native style values for native or dynamic properties.',hearts:'Current heart count supplied by your learning store.',maximum:'Maximum displayed heart capacity.',family:'Screen-family composition to display.',animations:'Enables optional motion; system reduced motion still applies.',loading:'Shows the loading state instead of the count.',result:'Recorded result or presentation status to display.',question:'Typed authored question, including its givens and answer model.',screen:'Authored reference fixture to preview.',steps:'Explicit lesson steps; provide availability and prerequisites from your app.',selectedKey:'Key of the currently selected navigation item.',items:'Typed items rendered by the component.',percent:'Progress percentage supplied by the caller.',onNavigate:'Receives the selected destination; your app performs navigation.'};
function apiRows(file){
 const module=checker.getSymbolAtLocation(file);if(!module)return [];
 return checker.getExportsOfModule(module).flatMap(symbol=>{
  const resolved=(symbol.flags&ts.SymbolFlags.Alias)?checker.getAliasedSymbol(symbol):symbol;
  const decl=resolved.valueDeclaration;if(!decl)return [];
  const type=checker.getTypeOfSymbolAtLocation(resolved,decl);
  const signature=type.getCallSignatures()[0];if(!signature)return [];
  const parameter=signature.parameters[0];
  const paramDecl=parameter?.valueDeclaration;
  const defaults=Object.create(null);
  if(paramDecl&&ts.isParameter(paramDecl)&&ts.isObjectBindingPattern(paramDecl.name))for(const element of paramDecl.name.elements)if(element.initializer)defaults[(element.propertyName??element.name).getText()]=element.initializer.getText();
  const props=parameter?checker.getTypeOfSymbolAtLocation(parameter,paramDecl??decl):null;
  const properties=props&&(props.flags&(ts.TypeFlags.Object|ts.TypeFlags.Intersection|ts.TypeFlags.Union))?props.getProperties():[];
  return [{name:symbol.name,description:ts.displayPartsToString(symbol.getDocumentationComment(checker)),props:properties.map(property=>({name:property.name,type:property.valueDeclaration?.type?.getText()??checker.typeToString(checker.getTypeOfSymbolAtLocation(property,property.valueDeclaration??decl),decl,ts.TypeFormatFlags.NoTruncation),required:!(property.flags&ts.SymbolFlags.Optional),default:defaults[property.name]??'—',description:ts.displayPartsToString(property.getDocumentationComment(checker))||help[property.name]||(property.name.startsWith('on')?'Callback handled by the consuming app.':`Controls ${property.name.replace(/([A-Z])/g,' $1').toLowerCase()}.`)}))}];
 });
}
const styles=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const docs=Object.fromEntries(catalog.components.map(entry=>{
 const file=sources.find(p=>path.basename(p.fileName,'.tsx')===entry.id)||sources.find(p=>path.basename(p.fileName,'.tsx')===entry.title);
 if(!file)throw new Error(`Missing source: ${entry.id}`);
 const relative=path.relative(path.join(root,'src'),file.fileName);
 const declaration=path.join(root,'dist',relative.replace(/\.tsx$/,'.d.ts'));
 return [entry.id,{description:descriptions[entry.id],usage:usage(entry.id),apis:apiRows(file),file:relative,source:file.text,javascript:ts.transpileModule(file.text,{compilerOptions:{jsx:ts.JsxEmit.Preserve,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText,api:fs.existsSync(declaration)?fs.readFileSync(declaration,'utf8'):'See the exported TypeScript source.',styles}];
}));
const screenDocs=Object.fromEntries(catalog.screens.map(entry=>[entry.id,{description:`${entry.title} is an interactive ${entry.family} screen composition. It uses disposable local state and does not authenticate, grade attempts or persist learner progress.`,usage:`import { ScreenPreview } from '@qentrah/do-ui';\n\nexport function ${entry.id.replace(/(^|-)(\w)/g,(_,p,c)=>c.toUpperCase())}Screen() {\n  return <ScreenPreview family=${JSON.stringify(entry.family)} title=${JSON.stringify(entry.title)} />;\n}`,apis:docs.ScreenPreview.apis,note:'Screen-family template, not the original production route. Callbacks and backend integration belong to the consuming app.'}]));
fs.writeFileSync(path.join(__dirname,'../src/data/componentDocs.json'),JSON.stringify(docs));
fs.writeFileSync(path.join(__dirname,'../src/data/screenDocs.json'),JSON.stringify(screenDocs));

const manifest=require(path.join(root,'package.json'));
fs.writeFileSync(path.join(__dirname,'../src/data/packageInfo.json'),JSON.stringify({name:manifest.name,version:manifest.version,homepage:manifest.homepage}));
