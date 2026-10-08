import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';
import type { Todo } from '../types';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.main} onPress={() => onToggle(todo.id)}>
        <View style={[styles.checkbox, todo.done && styles.checkboxDone]}>
          {todo.done ? <Text style={styles.checkMark}>✓</Text> : null}
        </View>
        <Text style={[styles.text, todo.done && styles.textDone]}>{todo.text}</Text>
      </Pressable>

      <Pressable onPress={() => onDelete(todo.id)} hitSlop={12}>
        <Text style={styles.delete}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: colors.accent,
  },
  checkMark: {
    color: colors.accentText,
    fontSize: 14,
    fontWeight: '700',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  textDone: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  delete: {
    fontSize: 16,
    color: colors.danger,
    paddingLeft: 12,
  },
});
