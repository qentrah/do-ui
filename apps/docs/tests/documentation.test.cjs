const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
function loadTS(file){
 const result=ts.transpileModule(fs.readFileSync(path.join(__dirname,'../src',file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
 const output={};new Function('exports',result.outputText)(output);return output;
}
test('syntax highlighting preserves strings, comments and source newlines',()=>{
 const {tokenizeCode}=loadTS('lib/codeTokens.ts');
 for(const source of ['/* multi\nline */\nconst x = "// text";\n',"export type Props = { hearts: number };\n<Fox name='happy' />",'@import "theme.css";\na { color: #fff; }']){
  const lines=tokenizeCode(source,'tsx');
  assert.equal(lines.map(line=>line.map(token=>token.text).join('')).join('\n'),source);
 }
 const tokens=tokenizeCode('const x = "hello"; // comment','ts').flat();
 assert.ok(tokens.some(t=>t.kind==='keyword'&&t.text==='const'));
 assert.ok(tokens.some(t=>t.kind==='string'&&t.text==='"hello"'));
 assert.ok(tokens.some(t=>t.kind==='comment'));
});
test('every catalog component belongs to exactly one group',()=>{
 const catalog=require('../src/data/catalog.json');
 const {componentGroups}=loadTS('data/componentGroups.ts');
 const ids=componentGroups.flatMap(group=>group.ids);
 assert.equal(new Set(ids).size,ids.length);
 assert.deepEqual([...ids].sort(),catalog.components.map(entry=>entry.id).sort());
});
test('documentation includes real source, declarations and JavaScript for every component',()=>{
 const catalog=require('../src/data/catalog.json');
 const docs=require('../src/data/componentDocs.json');
 for(const entry of catalog.components){
  assert.ok(docs[entry.id].source);
  assert.ok(docs[entry.id].api);
  assert.ok(docs[entry.id].javascript);
 }
 assert.ok(!docs.HeartsButton.javascript.includes('hearts: number'));
 assert.ok(docs.HeartsButton.api.includes('hearts: number'));
});
test('all entries have descriptions, usage examples and typed props tables',()=>{
 const docs=require('../src/data/componentDocs.json');
 const screens=require('../src/data/screenDocs.json');
 const catalog=require('../src/data/catalog.json');
 assert.equal(Object.keys(docs).length,catalog.components.length);
 assert.equal(Object.keys(screens).length,catalog.screens.length);
 for(const entry of [...Object.values(docs),...Object.values(screens)]){
  assert.ok(entry.description);
  assert.ok(entry.usage.includes('export function'));
  assert.ok(entry.apis.length);
  for(const api of entry.apis)for(const prop of api.props){assert.equal(typeof prop.default,'string');assert.ok(prop.type);assert.ok(prop.description);}
 }
 const heart=docs.HeartsButton.apis[0].props;
 assert.equal(heart.find(prop=>prop.name==='hearts').required,true);
 assert.equal(heart.find(prop=>prop.name==='maximum').default,'5');
 assert.equal(heart.find(prop=>prop.name==='onPress').required,false);
 for(const entry of Object.values(screens))assert.deepEqual(entry.apis[0].props.map(prop=>prop.name),['family','title']);
});
