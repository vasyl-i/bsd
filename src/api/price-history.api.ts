import { BINANCE_API_URL } from '../constants';
import { Kline } from '../types';

const INTERVAL = '15m';
const LIMIT = 96;

export async function fetchPriceHistory(): Promise<Kline[]> {
  return await fetch(
    `${BINANCE_API_URL}/klines?symbol=BTCEUR&interval=${INTERVAL}&limit=${LIMIT}`,
  ).then(res => res.json());
}
