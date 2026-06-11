import { TradeHistoryItem } from '../store/types.ts';

export const calcPn = (trades: TradeHistoryItem[], currentPrice: number) => {
  let btcHeld = 0;
  let netCost = 0;

  trades.forEach((trade: TradeHistoryItem) => {
    btcHeld += trade.btc;
    netCost += -trade.eur;
  });

  const marketValue = btcHeld * currentPrice;

  return marketValue - netCost;
};
