# Do UI Showcase

[Live documentation and previews](https://do-ui-qentrah.vercel.app) · [GitHub](https://github.com/qentrah/do-ui) · [npm](https://www.npmjs.com/package/@qentrah/do-ui)
A separate Expo app for `@qentrah/do-ui`. It has its own package manifest, app identity, Router tree, Metro/PostCSS configuration, fonts, TypeScript checks and web build. It imports reusable UI through the package name and has no DodoMath accounts, curriculum bank, XP store or backend configuration.

```sh
pnpm --filter @qentrah/do-ui build
pnpm --filter @qentrah/do-ui-docs web
```

The dev server uses port 8090. The same app runs through Expo on iOS and Android. `pnpm --filter @qentrah/do-ui-docs build:web` exports the standalone website to this app's `dist/` directory.

The catalog retains component examples, 37 isolated screen-family templates, design tokens and 117 interactive grade references. Former store-bound component examples now mount the package's actual controlled components with local state and callbacks. Source-inspired examples remain distinct from reviewed lesson content and exact reference parity.

The original DodoMath app and its existing `/ui-library` route are preserved. This showcase is an independent consumer, not a route in that app.

## Documentation interface

Section navigation lives in the header; the sidebar contains collapsible component groups and the searchable catalog. On phones, open Navigation or Browse to choose an entry. Component detail routes also include Preview, Code, API and Styles tabs. The dark code viewer provides syntax colors, line numbers, file/language labels, wrapping and web clipboard copy. Code supports TypeScript and generated JavaScript/JSX; API definitions remain TypeScript. Code and API are generated from the package source and declaration files with `pnpm docs:generate`; run the package build first after changing public APIs. The web build refreshes this index automatically.

Documentation covers local installation, compatible peers, NativeWind v5 configuration, fonts, motion and controlled state. Icons includes seven illustrated package icons and the existing 1,357 Ionicons names, with search, incremental display and selected-icon usage code. Code blocks are selectable and scroll horizontally without widening the page.

## Complete component and screen docs

Every catalog entry has its own documentation route: `/component/<id>` or `/screen/<id>`. Component pages include a purpose statement, live example, complete usage example, source, shared styles and an API table per callable export. Tables show prop name/type, required status, authored defaults and descriptions; large inherited APIs can be expanded. Screen pages include the specific screen-family usage, live composition and `ScreenPreview` props table.

`pnpm docs:generate` reads the package with the installed TypeScript checker and extracts usage examples from the actual component previews. `pnpm docs:validate` typechecks all 94 usage examples, verifies none were excluded and removes its temporary files afterward. `pnpm test` checks coverage and required/default prop metadata. Run the package build before regeneration after a public API change.
