import type { ReactNode } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { MotionPressable } from '../Motion';

export function Card({ children, title }: { children: ReactNode; title?: string }) {
  return <View className="border-2 border-border rounded-2xl bg-white p-4 gap-3">
    {title && <Text accessibilityRole="header" className="ui__card-title text-text-primary">{title}</Text>}{children}
  </View>;
}

export function Choice({ label, selected, multiple = false, disabled = false, onPress }: {
  label: string; selected: boolean; multiple?: boolean; disabled?: boolean; onPress: () => void;
}) {
  return <MotionPressable accessibilityRole={multiple ? 'checkbox' : 'radio'} accessibilityLabel={label}
    aria-checked={selected}
    accessibilityState={{ checked: selected, disabled }} disabled={disabled} onPress={onPress}
    className={`min-h-12 border-2 border-b-4 rounded-xl px-4 py-3 flex-row items-center gap-3 ${selected ? 'border-selection bg-selection-soft' : 'border-border bg-white'}`}>
    <Text className={`ui__body flex-1 text-center ${selected ? 'text-selection-ink' : 'text-text-primary'}`}>{label}</Text>
    {selected && <Ionicons accessible={false} name="checkmark-circle" size={20} color={colors.selectionInk} />}
  </MotionPressable>;
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return <View className="gap-2"><Text className="ui__label text-text-secondary">{label}</Text>
    <TextInput {...props} accessibilityLabel={label} placeholderTextColor={colors.muted}
      style={[{ minHeight: 50, borderWidth: 2, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14,
        paddingVertical: 10, fontFamily: 'Nunito-Regular', fontSize: 17, color: colors.text }, props.style]} />
  </View>;
}

export function Badge({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'brand' | 'selection' | 'success' | 'error' }) {
  const classes = { neutral: 'bg-surface text-text-secondary', brand: 'bg-brand-soft text-brand-ink',
    selection: 'bg-selection-soft text-selection-ink', success: 'bg-success-soft text-success-ink', error: 'bg-error-soft text-error-ink' };
  return <Text className={`ui__body-small self-start px-3 py-1 rounded-lg ${classes[tone]}`}>{label}</Text>;
}

export function IconButton({ label, icon, onPress, disabled = false }: {
  label: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void; disabled?: boolean;
}) {
  return <MotionPressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }}
    onPress={onPress} disabled={disabled} className="w-11 h-11 items-center justify-center rounded-xl border-2 border-border">
    <Ionicons name={icon} size={23} color={disabled ? colors.outline : colors.text} accessible={false} />
  </MotionPressable>;
}

export function StatCard({ label, value, icon }: { label: string; value: string; icon?: keyof typeof Ionicons.glyphMap }) {
  return <View accessible accessibilityLabel={`${label}: ${value}`} className="flex-1 min-w-28 border-2 border-border rounded-2xl p-4 gap-2">
    {icon && <Ionicons accessible={false} name={icon} size={24} color={colors.brandText} />}
    <Text className="ui__title text-text-primary">{value}</Text><Text className="ui__body-small text-text-secondary">{label}</Text>
  </View>;
}

export function Section({ title, detail, children }: { title: string; detail?: string; children: ReactNode }) {
  return <View className="gap-4 mb-6"><View><Text accessibilityRole="header" className="ui__instruction text-text-primary">{title}</Text>
    {detail && <Text className="ui__body-small text-text-secondary mt-1">{detail}</Text>}</View>{children}</View>;
}
