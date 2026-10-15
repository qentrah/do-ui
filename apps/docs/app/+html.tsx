import type { PropsWithChildren } from 'react';
import { ScrollViewStyleReset } from 'expo-router/html';
export default function Document({children}:PropsWithChildren){
 return <html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Do UI — Qentrah React Native component library</title><meta name="description" content="Explore Do UI components, screen templates, typed props, source code and interactive previews. An open-source React Native library by Qentrah."/><meta property="og:title" content="Do UI by Qentrah"/><meta property="og:description" content="React Native components, screens, code examples and live previews."/><ScrollViewStyleReset/></head><body>{children}</body></html>;
}
