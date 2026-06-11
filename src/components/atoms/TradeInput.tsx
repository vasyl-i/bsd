import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ref } from 'react';
import { theme } from '../../constants';

type TradeInputProps = {
  ref?: Ref<TextInput>;
  autoFocus?: boolean;
  right: 'BTC' | 'EUR';
  value: string | undefined;
  onChangeText?: (value: string) => void;
  disabled?: boolean;
};

export const TradeInput = ({
  ref,
  autoFocus,
  right,
  value,
  onChangeText,
  disabled,
}: TradeInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        autoFocus={autoFocus}
        placeholder={'0,00'}
        keyboardType={'numeric'}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
      />
      <Text style={styles.rightLabel}>{right}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    backgroundColor: theme.palette.grey,
    borderRadius: 4,
    gap: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
    borderBottomWidth: 1,
    paddingVertical: 4,
    borderColor: theme.palette.border,
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.palette.secondary,
  },
});
