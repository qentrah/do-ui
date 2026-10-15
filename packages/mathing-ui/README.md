# @qentrah/mathing-ui

A self-contained React Native UI package for playful mathematics apps. It includes typed controls, mathematical models, lesson presentation, profiles, progress, path nodes, rewards, and screen compositions. State, authentication, navigation, grading, hearts, XP and persistence belong to the consumer.

This is a real local package with its own `package.json`, public exports, compiled JavaScript, TypeScript declarations, CSS, original images and licensed fonts. It imports no DodoMath application routes, stores, backend clients or `@/` aliases. `apps/docs` is a separate Expo app that consumes the package by name.

## Install the built package

```sh
npm install @qentrah/mathing-ui
# or
bun add @qentrah/mathing-ui
```

Within this workspace, use `"@qentrah/mathing-ui": "workspace:*"`. The package targets the tested Expo 54 / React Native 0.81 / React 19 setup, with NativeWind `5.0.0-preview.3`, SVG, Reanimated, safe-area context, WebView and Expo vector icons as peer dependencies. No router or learning-state provider is required.

## Configure NativeWind

Follow the setup for the installed NativeWind preview version. In the host's `global.css`:

```css
@import "@qentrah/mathing-ui/styles.css";
@source "./app";
@source "./src";
```

The package stylesheet supplies its own tokens, BEM utilities and source scan. The host needs the Tailwind 4 PostCSS plugin and the existing NativeWind Metro wrapper; the standalone app contains working examples. Avoid importing an additional conflicting design-token stylesheet.

Register the bundled Nunito font files with `expo-font` or the host's font loader. `fonts` contains the sources. Wrap safe-area layouts in `SafeAreaProvider`. `UIProvider` is optional and controls decorative animation; system reduced motion is always respected.

```tsx
import { useState } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UIProvider, fonts, Action, Card, HeartsButton } from '@qentrah/mathing-ui';

export default function Example() {
  const [loaded] = useFonts(fonts);
  const [hearts, setHearts] = useState(5);
  if (!loaded) return null;
  return (
    <SafeAreaProvider>
      <UIProvider>
        <View className="flex-1 bg-white p-4">
          <Card title="Your lesson">
            <HeartsButton hearts={hearts} onPress={() => setHearts(5)} />
            <Action label="Start practice" onPress={() => { /* host navigation */ }} />
          </Card>
        </View>
      </UIProvider>
    </SafeAreaProvider>
  );
}
```

## Public API

- Controls: `Action`, `Choice`, `Field`, `IconButton`, `MotionPressable`, `PreferenceSwitch`, `SocialButton`.
- Layout: `Card`, `Section`, `Heading`, `MathScreen`, `ListPage`, `ListGroup`, `ListRow`, `EmptyList`, `PageHeader`, `TabBar`.
- Mathematics: `QuestionStage`, `QuestionInteraction`, `NumberAnswer`, `MatchingPairs`, `FractionModel`, `MathExpression`, `MathDiagram`, `SubjectDiagram`, `AlgebraModel`, `FunctionGraph`, `CoordinateBoard`, `GeometryBoard`, `HundredGrid`, `LiquidBoard`.
- Learning presentation: `LearningPath`, `PathNode`, `PathLessonPopup`, `LockedActivity`, `HeartsButton`, `UnitCheckpoint`, `UnitChest`, `ProgressMeter`, `ProgressSaveNotice`, `CompletionMoment`, `FeedbackPanel`, `FeedbackFooter`.
- Profile and artwork: `ProfileHero`, `ProfileOverview`, `ProfileAchievements`, `LearnerAvatar`, `RankBadge`, `MathArtwork`, `ChestArtwork`, `CompletedMedal`, `Fox`, and the registered companions.
- Presentation infrastructure: `UIProvider`, `FeedbackClock`, motion components, `colors`, `images`, `fonts`.

Each component's declaration describes its props. Former app-connected controls now have explicit callbacks: `PageHeader.onBack`, `ProfileHero.onEdit/onSettings/onShare`, `ProfileOverview.onNavigate`, `LearningPath.onSelect`, `HeartsButton.onPress`, `UnitCheckpoint.onPress`, `TabBar.onChange`, and `ProgressSaveNotice.onRetry`.

`ScreenPreview` and `ReferenceLesson` are optional self-contained demonstration compositions. The 117 grade examples are imported separately from `@qentrah/mathing-ui/fixtures`; they are not reviewed assessment content or pixel-perfect Duolingo replicas. The fox retains its documented single-pose limitation. No reference-brand media ships in this package.

## Build and verify

```sh
pnpm --filter @qentrah/mathing-ui build
pnpm --filter @qentrah/mathing-ui test
pnpm --filter @qentrah/mathing-ui exec npm pack
pnpm --filter @qentrah/mathing-ui-docs web
```

`npm pack` runs the build and produces an installable tarball containing `src`, `dist`, assets, styles, declarations and attribution. Metro/browser bundlers select source entry points so NativeWind and worklets compile in the host. The default entry also provides compiled CommonJS. Nothing is published automatically.

Font redistribution follows the bundled OFL license. Original app artwork is included with provenance in `CREDITS.md`; original code and artwork are released under MIT; Nunito retains its bundled OFL license.
