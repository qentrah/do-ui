# Do UI

Qentrah's React Native component library for playful mathematics interfaces. Includes 57 component modules, 37 screen-family templates, bundled original artwork and fonts, and 117 authored exercise-reference adaptations. Components use typed props and caller-owned state.

## Install

```sh
npm install @qentrah/do-ui
# or
bun add @qentrah/do-ui
```

The package targets Expo 54, React 19.1, React Native 0.81.5 and NativeWind 5.0.0-preview.3. See [the package setup guide](packages/do-ui/README.md) for peer dependencies, Metro, PostCSS, fonts and shared styles.

```tsx
import { Action, Card, HeartsButton } from '@qentrah/do-ui';

export function Summary() {
  return (
    <Card title="Ready for your next lesson?">
      <HeartsButton hearts={5} />
      <Action label="Continue" onPress={() => {}} />
    </Card>
  );
}
```

## Documentation and live previews

The independent Expo docs app includes searchable grouped navigation, live previews, usage examples, prop tables with types/defaults/required status, and a source viewer with TypeScript/JavaScript variants. An icon gallery and shared design tokens are included. Screens are interactive templates with disposable state; they do not authenticate, grade or persist progress.

```sh
pnpm install
pnpm dev
```

Run the production documentation site locally:

```sh
pnpm build
pnpm --filter @qentrah/do-ui-docs preview
```

## Development

- `packages/do-ui`: published package, source, compiled types, artwork and CSS.
- `apps/docs`: standalone documentation and preview app.
- `pnpm check`: lint, typecheck, tests and verification of every usage example.
- `pnpm build`: library build and static documentation export.

Do not place secrets or backend state in the library. Regenerate documentation after changing public props. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Original code and artwork: MIT. Bundled Nunito fonts: SIL Open Font License. See [LICENSE](LICENSE) and [CREDITS.md](CREDITS.md). No third-party reference screenshots, footage or course media are bundled.
