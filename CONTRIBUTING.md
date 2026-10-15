# Contributing

Use the installed Expo/React Native/NativeWind versions. Keep components controlled by typed props; consumers own navigation, authentication and learning state. Prefer readable NativeWind classes, using native styles for dynamic/native-only values.

Run `pnpm install`, `pnpm check` and `pnpm build`. Public API changes require a package build, then `pnpm --filter @qentrah/mathing-ui-docs docs:generate`. Add or update an interactive preview and a typed usage example for each component or screen change. Keep source and artwork provenance explicit.

Create a branch and open a pull request. Screenshots at desktop and narrow mobile widths help reviewers assess UI changes. Do not commit node_modules, builds, npm archives, secrets or third-party research downloads.

## Release

The maintainer signs in with `npm login --auth-type=web`, confirms access to the `qentrah` organization, runs the checks and build, then publishes from `packages/mathing-ui` using `npm publish --access public`. npm may require an additional security-key check. Never commit registry tokens. Bun consumers use `bun add @qentrah/mathing-ui`; there is no separate Bun registry release.
