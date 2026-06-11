import { StyleSheet, View } from 'react-native';
import { Logo } from '../../assets/svg';
import { Label } from '../atoms';
import { BalanceRow } from '../molecules';
import { useAppSelector } from '../../store/store.ts';

export const Header = ({}) => {
  const { status, btcAmount, currencyAmount } = useAppSelector(
    s => s.portfolio,
  );
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.infoContainer}>
        <Label text={status} />
        <BalanceRow leftLabel={btcAmount.toFixed(2)} rightLabel={'BTC'} />
        <BalanceRow leftLabel={currencyAmount.toFixed(2)} rightLabel={'€'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    width: '100%',
  },
  infoContainer: {
    gap: 2,
    alignItems: 'flex-end',
  },
});
