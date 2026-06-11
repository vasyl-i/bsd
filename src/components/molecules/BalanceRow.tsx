import { StyleSheet, View } from 'react-native';
import { Label } from '../atoms';

type BalanceRowProps = {
  leftLabel: string;
  rightLabel: string;
};

export const BalanceRow = ({ leftLabel, rightLabel }: BalanceRowProps) => {
  return (
    <View style={styles.balanceRow}>
      <Label text={leftLabel} />
      <Label text={rightLabel} bold />
    </View>
  );
};

const styles = StyleSheet.create({
  balanceRow: {
    flexDirection: 'row',
    gap: 2,
  },
});
