import { StyleSheet, View } from 'react-native';
import { memo } from 'react';
import { Label } from '../atoms';

export type HistoryListItemProps = {
  actionName: 'Buy' | 'Sell';
  actionInfo: string;
  timestamp: string;
};

export const HistoryListItem = memo(
  ({ actionName, actionInfo, timestamp }: HistoryListItemProps) => {
    return (
      <View style={styles.container}>
        <Label text={actionName} />
        <Label text={actionInfo} semiBold />
        <Label text={timestamp} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
