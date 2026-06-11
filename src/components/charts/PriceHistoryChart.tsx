import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { fetchPriceHistory } from '../../api';
import { Area, CartesianChart, Line } from 'victory-native';
import { theme } from '../../constants';
import {
  Circle,
  DashPathEffect,
  LinearGradient,
  Line as SkiaLine,
  Text as SkiaText,
  matchFont,
  RoundedRect,
  vec,
} from '@shopify/react-native-skia';
import { Label } from '../atoms';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { setCurrentPrice } from '../../store/actions.ts';
import { calcPn } from '../../utils';

const fontFamily = Platform.select({ ios: 'Helvetica', default: 'sans-serif' });

export const PriceHistoryChart = () => {
  const [data, setData] = useState<{ timestamp: number; value: number }[]>([]);
  const dispatch = useAppDispatch();
  const trades = useAppSelector(state => state.tradeHistory?.data);

  const font = matchFont({
    fontFamily,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
  });

  const currentBtcValue = data?.[data.length - 1]?.value;
  const currentBtcValueParsed = currentBtcValue?.toLocaleString?.('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const getPriceHistory = useCallback(() => {
    fetchPriceHistory().then(result => {
      setData(
        result.map(item => {
          return {
            timestamp: item[0],
            value: parseFloat(item[4]),
          };
        }),
      );
    });
  }, []);

  useEffect(() => {
    dispatch(setCurrentPrice(currentBtcValue));
  }, [dispatch, currentBtcValue]);

  useEffect(() => {
    getPriceHistory();
    const intervalId = setInterval(() => {
      getPriceHistory();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [getPriceHistory]);

  const PnL = calcPn(trades, currentBtcValue);

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        <Label text={'BTC'} style={styles.header} />
        <Label
          text={
            currentBtcValueParsed ? `${currentBtcValueParsed} €` : 'Loading...'
          }
          style={styles.header}
        />
        <View style={styles.pnlRow}>
          <Label text={'PnL: '} />
          <Label
            text={`${PnL >= 0 ? '+' : ''}${PnL.toFixed(2)} €`}
            style={{
              color: PnL >= 0 ? theme.palette.green : theme.palette.red,
            }}
          />
        </View>
      </View>

      {data.length ? (
        <CartesianChart
          data={data}
          xKey="timestamp"
          yKeys={['value']}
          xAxis={{ formatXLabel: () => '', lineWidth: 0 }}
          yAxis={[
            {
              formatYLabel: () => '',
              axisSide: 'right',
              lineWidth: 0,
              tickCount: 6,
            },
          ]}
          domainPadding={{ right: 40, top: 8, bottom: 8 }}
        >
          {({ points, chartBounds, yScale, canvasSize, yTicks }) => {
            const lastValue = points.value[points.value.length - 1];
            const prevClose = data[0]?.value;
            const prevCloseY = yScale(prevClose);
            const badgeWidth = (t: string) => font.measureText(t).width + 12;
            const prevText = `${prevClose}`;
            const axisLabelPosition = (t: string) =>
              canvasSize.width - font.measureText(t).width;
            return (
              <>
                <Area
                  points={points.value}
                  y0={chartBounds.bottom}
                  animate={{ type: 'timing', duration: 300 }}
                >
                  <LinearGradient
                    start={vec(0, chartBounds.top)}
                    end={vec(0, chartBounds.bottom)}
                    colors={[theme.palette.chartTop, theme.palette.chartBottom]}
                  />
                </Area>
                <Line
                  points={points.value}
                  color={theme.palette.chartLine}
                  strokeWidth={1.5}
                  animate={{ type: 'timing', duration: 300 }}
                />
                {yTicks.map(tick => {
                  const t = `${tick}`;
                  return (
                    <SkiaText
                      key={tick}
                      x={axisLabelPosition(t)}
                      y={yScale(tick) + 4}
                      text={t}
                      font={font}
                      color={theme.palette.primary}
                    />
                  );
                })}
                {lastValue?.y != null && (
                  <Circle
                    cx={lastValue.x}
                    cy={lastValue.y}
                    r={2.5}
                    color={theme.palette.chartLine}
                  />
                )}
                <SkiaLine
                  p1={vec(chartBounds.left, prevCloseY)}
                  p2={vec(chartBounds.right, prevCloseY)}
                  color={theme.palette.highlight}
                  strokeWidth={1}
                >
                  <DashPathEffect intervals={[1, 4]} />
                </SkiaLine>

                <RoundedRect
                  x={
                    chartBounds.right -
                    badgeWidth(prevText) -
                    badgeWidth('Prev close') -
                    1
                  }
                  y={prevCloseY - 10}
                  width={badgeWidth('Prev close')}
                  height={16}
                  r={4}
                  color={theme.palette.highlight}
                >
                  <SkiaText
                    x={
                      chartBounds.right -
                      badgeWidth(prevText) +
                      8 -
                      badgeWidth('Prev close') -
                      1
                    }
                    y={prevCloseY + 2}
                    text={'Prev close'}
                    font={font}
                    color="white"
                  />
                </RoundedRect>
                <RoundedRect
                  x={chartBounds.right - badgeWidth(prevText)}
                  y={prevCloseY - 10}
                  width={badgeWidth(prevText)}
                  height={16}
                  r={4}
                  color={theme.palette.highlight}
                >
                  <SkiaText
                    x={chartBounds.right - badgeWidth(prevText) + 8}
                    y={prevCloseY + 2}
                    text={prevText}
                    font={font}
                    color="white"
                  />
                </RoundedRect>

                {lastValue && lastValue.y && (
                  <RoundedRect
                    x={canvasSize.width - badgeWidth(prevText)}
                    y={lastValue.y + 6}
                    width={badgeWidth(prevText)}
                    height={16}
                    r={4}
                    color={theme.palette.primary}
                  >
                    <SkiaText
                      x={chartBounds.right - badgeWidth(prevText) + 8}
                      y={lastValue.y + 17.5}
                      text={prevText}
                      font={font}
                      color="white"
                    />
                  </RoundedRect>
                )}
              </>
            );
          }}
        </CartesianChart>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 350,
    overflow: 'visible',
  },
  labelsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pnlRow: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
});
