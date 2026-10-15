import { Text, View } from 'react-native';

/** Counts are authored givens, independent of the expected answer. */
export function AlgebraModel({ groups, units }: { groups: number; units: number }) {
  return <View accessible accessibilityLabel={`${groups} x blocks and ${units} unit blocks`} className="items-center gap-4 py-6">
    <View className="flex-row flex-wrap justify-center gap-3">
      {Array.from({ length: groups }, (_, index) => <View key={index} className="h-20 w-14 items-center justify-center rounded-xl border-2 border-b-4 border-[#148DB5] bg-[#1CB0F6]"><Text className="ui__math text-[#05354A]">x</Text></View>)}
    </View>
    <View className="flex-row flex-wrap justify-center gap-3">
      {Array.from({ length: units }, (_, index) => <View key={index} className="h-11 w-11 items-center justify-center rounded-lg border-2 border-b-4 border-[#D97706] bg-[#FFAA33]"><Text className="ui__card-title text-[#653A00]">1</Text></View>)}
    </View>
  </View>;
}
