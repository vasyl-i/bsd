import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { theme } from '../../constants';
import { CrossIcon } from '../../assets/svg';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { btcBuy, btcSell, hideTradeModal } from '../../store/actions.ts';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, TradeInput } from '../atoms';

export const TradeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [btcInputValue, setBtcInputValue] = useState<string | null>(null);
  const [currencyInputValue, setCurrencyInputValue] = useState<number | null>(
    null,
  );
  const currentBtcPrice = useAppSelector(state => state.portfolio.currentPrice);
  const currencyAmount = useAppSelector(
    state => state.portfolio.currencyAmount,
  );
  const btcAmount = useAppSelector(state => state.portfolio.btcAmount);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(hideTradeModal());
  const onPressBuy = () =>
    dispatch(
      btcBuy({
        currencyAmount: currencyInputValue || 0,
        btcAmount: parseFloat(btcInputValue || '0'),
      }),
    );
  const onPressSell = () =>
    dispatch(
      btcSell({
        currencyAmount: currencyInputValue || 0,
        btcAmount: parseFloat(btcInputValue || '0'),
      }),
    );

  const onChangeBtc = (value: string) => {
    if (value) {
      const numericBtcValue = parseFloat(value);
      if (isNaN(numericBtcValue)) {
        setBtcInputValue('0');
      } else {
        setBtcInputValue(value);
      }
    } else {
      setBtcInputValue(null);
    }
  };

  const isBuyDisabled =
    !btcInputValue ||
    !currencyInputValue ||
    currencyInputValue > currencyAmount;
  const isSellDisabled =
    !currencyInputValue ||
    !btcInputValue ||
    parseFloat(btcInputValue) > btcAmount;

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsOpen(true);
      });
    });
    return () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsOpen(false);
        });
      });
    };
  }, []);

  useEffect(() => {
    if (btcInputValue !== null) {
      const currencyValue = parseFloat(btcInputValue) * currentBtcPrice;
      setCurrencyInputValue(currencyValue);
    } else {
      setCurrencyInputValue(null);
    }
  }, [btcInputValue, currentBtcPrice]);

  return (
    <>
      {isOpen && (
        <Animated.View
          style={styles.backdrop}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        />
      )}
      <Modal
        animationType="slide"
        transparent
        visible={isOpen}
        onRequestClose={closeModal}
      >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Pressable onPress={closeModal} style={styles.cross}>
              <CrossIcon />
            </Pressable>
            <View style={styles.inputsContainer}>
              <TradeInput
                autoFocus
                right={'BTC'}
                value={
                  btcInputValue !== null ? btcInputValue?.toString() : undefined
                }
                onChangeText={onChangeBtc}
              />
              <TradeInput
                right={'EUR'}
                value={
                  currencyInputValue !== null
                    ? currencyInputValue.toFixed(2)
                    : undefined
                }
                disabled
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={onPressBuy}
                label={'Buy'}
                inline
                disabled={isBuyDisabled}
              />
              <Button
                onPress={onPressSell}
                label={'Sell'}
                inline
                disabled={isSellDisabled}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 24,
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '200%',
    backgroundColor: theme.palette.backdrop,
  },
  container: {
    width: '100%',
    height: 300,
    marginTop: 200,
    backgroundColor: theme.palette.white,
    borderRadius: 12,
    gap: 24,
    padding: 24,
  },
  cross: {
    alignSelf: 'flex-end',
  },
  inputsContainer: {
    gap: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 24,
  },
});
