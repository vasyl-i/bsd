import { StyleSheet, View } from 'react-native';
import { Header } from '../components/organisms';
import { PriceHistoryChart } from '../components/charts';
import { Button } from '../components/atoms';
import { HistoryList } from '../components/templates/HistoryList.tsx';
import { useAppDispatch, useAppSelector } from '../store/store.ts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TradeModal } from '../components/modals/trade.modal.tsx';
import { showTradeModal } from '../store/actions.ts';
import { useCallback } from 'react';

export const MainScreen = () => {
  const isTradeModalVisible = useAppSelector(s => s.ui.isTradeModalVisible);
  const dispatch = useAppDispatch();
  const showTradeModalAction = useCallback(
    () => dispatch(showTradeModal()),
    [dispatch],
  );

  return (
    <View style={styles.wrapper}>
      <SafeAreaView edges={['top']} style={styles.wrapper}>
        <Header />
        <View style={styles.container}>
          <PriceHistoryChart />
          <Button onPress={showTradeModalAction} label={'Trade'} />
          <HistoryList />
        </View>
      </SafeAreaView>
      {isTradeModalVisible && <TradeModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    gap: 16,
  },
});
