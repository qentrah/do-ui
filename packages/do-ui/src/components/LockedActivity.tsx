import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListPage } from './ListUI';
import { Action } from './MathUI';
import { colors } from '../constants/colors';

export function LockedActivity({ requirement, onPrerequisite, onBack }: { requirement: string; onPrerequisite: () => void; onBack?: () => void }) {
  return <ListPage title="Level locked" back={!!onBack} onBack={onBack} footer={<Action label="Go to prerequisite" onPress={onPrerequisite}/>}>
    <View className="items-center justify-center py-10 gap-4"><Ionicons name="lock-closed" size={64} color={colors.outline}/>
      <Text accessibilityRole="header" className="ui__title text-text-primary text-center">One step at a time</Text>
      <Text className="ui__body text-text-secondary text-center">{requirement}</Text>
    </View>
  </ListPage>;
}
