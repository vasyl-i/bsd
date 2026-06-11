import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../../constants';

type ButtonProps = {
  inline?: boolean;
  onPress: () => void;
  label: string;
  disabled?: boolean;
};

export const Button = ({ inline, onPress, label, disabled }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        inline && styles.inline,
        (pressed || disabled) && styles.pressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: theme.palette.primary,
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    width: '100%',
  },
  inline: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.white,
  },
  pressed: {
    opacity: 0.5,
  },
});
