import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useCallback } from 'react';
import { HistoryListItem } from '../molecules';
import { theme } from '../../constants';
import { useAppSelector } from '../../store/store.ts';
import { Label } from '../atoms';
import { TradeHistoryItem } from '../../store/types.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ListEmptyComponent = () => (
  <View style={styles.container}>
    <Label text={'Trade history will appear here'} bold />
  </View>
);

export const HistoryList = () => {
  const insets = useSafeAreaInsets();

  const data = useAppSelector(state => state.tradeHistory?.data);
  const renderItem: ListRenderItem<TradeHistoryItem> = useCallback(
    ({ item }) => {
      return (
        <HistoryListItem
          actionName={item.actionName}
          actionInfo={item.actionInfo}
          timestamp={item.timestamp}
        />
      );
    },
    [],
  );

  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      data={data}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: insets.bottom },
      ]}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.grey,
    borderRadius: 12,
    gap: 4,
    padding: 16,
    alignItems: 'center',
  },
});
