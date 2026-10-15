const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);

test('the package has no dependency on DodoMath routes, stores, or path aliases', () => {
  const manifest = require('../package.json');
  assert.equal(manifest.name, '@qentrah/do-ui');
  assert.equal(manifest.exports['.'].types, './dist/index.d.ts');
  for (const file of walk(path.join(root, 'src')).filter(file => /\.tsx?$/.test(file))) {
    const content = fs.readFileSync(file, 'utf8');
    assert(!/from\s+['"](?:@\/|expo-router|zustand|.*\/store\/|.*\/app\/|.*convex)/.test(content), file);
    for (const match of content.matchAll(/(?:from\s+|require\()\s*['"]([^'"]+)['"]/g)) {
      const specifier = match[1];
      if (!specifier.startsWith('.')) continue;
      const candidate = path.resolve(path.dirname(file), specifier);
      assert(candidate.startsWith(root + path.sep), `${file}: escapes the package`);
      assert(['', '.ts', '.tsx', '.json'].some(suffix => fs.existsSync(candidate + suffix)), `${file}: missing ${specifier}`);
    }
  }
});

test('compiled declarations, font licenses, and original assets are available', () => {
  for (const relative of ['dist/index.js','dist/index.d.ts','src/index.ts','styles.css','assets/fonts/Nunito-OFL.txt']) assert(fs.existsSync(path.join(root,relative)), relative);
  const images = fs.readFileSync(path.join(root, 'src/constants/images.ts'), 'utf8');
  assert(images.includes('fox-v3/fox-wave.png'));
  assert(!images.includes('fox-v1'));
  assert(!images.includes('.references'));
  const { REFERENCE_SCREENS } = require('../dist/data/uiReferenceScreens.js');
  assert.equal(REFERENCE_SCREENS.length,117);
  assert.equal(new Set(REFERENCE_SCREENS.map(screen=>screen.id)).size,117);
});

test('formerly connected UI accepts state and callbacks from its consumer', () => {
  const hearts=fs.readFileSync(path.join(root,'src/components/HeartsButton.tsx'),'utf8');
  const pathUI=fs.readFileSync(path.join(root,'src/components/LearningPath.tsx'),'utf8');
  assert(hearts.includes('hearts: number') && hearts.includes('onPress?: () => void'));
  assert(pathUI.includes('steps: PathStep[]') && pathUI.includes('onSelect: (id: string) => void'));
  const app=path.resolve(root,'../../apps/docs');
  for(const file of walk(path.join(app,'src')).filter(file=>/\.tsx?$/.test(file)))assert(!/from\s+['"](?:@\/|.*\.\.\/\.\.\/\.\.\/components)/.test(fs.readFileSync(file,'utf8')),file);
});
