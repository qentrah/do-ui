const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const app=path.resolve(__dirname,'..');
const docs=require('../src/data/componentDocs.json');
const screens=require('../src/data/screenDocs.json');
const directory=fs.mkdtempSync(path.join(app,'src/doc-example-checks-'));
try{
 const entries=[...Object.entries(docs),...Object.entries(screens).map(([id,value])=>['Screen-'+id,value])];
 for(const [id,entry] of entries)fs.writeFileSync(path.join(directory,id+'.tsx'),entry.usage);
 const config=ts.readConfigFile(path.join(app,'tsconfig.json'),ts.sys.readFile);
 const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,app);
 const examples=parsed.fileNames.filter(file=>file.startsWith(directory));
 if(examples.length!==entries.length)throw new Error('Some usage examples were excluded from validation.');
 const program=ts.createProgram(parsed.fileNames,parsed.options);
 const diagnostics=ts.getPreEmitDiagnostics(program);
 if(diagnostics.length){console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCanonicalFileName:p=>p,getCurrentDirectory:()=>app,getNewLine:()=> '\n'}));process.exitCode=1;}
 else console.log(`${examples.length} component and screen usage examples typecheck successfully.`);
}finally{fs.rmSync(directory,{recursive:true,force:true});}
