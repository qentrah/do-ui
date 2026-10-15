import '../global.css';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { UIProvider, fonts } from '@qentrah/mathing-ui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ShowcaseLayout() {
  const [loaded, error] = useFonts(fonts);
  if (!loaded && !error) return <View className="flex-1 items-center justify-center"><ActivityIndicator accessibilityLabel="Loading UI fonts"/></View>;
  if (error) return <View className="p-6"><Text>Could not load the bundled fonts. Reload the showcase.</Text></View>;
  return <SafeAreaProvider><UIProvider><Stack screenOptions={{ headerShown: false }}/></UIProvider></SafeAreaProvider>;
}
