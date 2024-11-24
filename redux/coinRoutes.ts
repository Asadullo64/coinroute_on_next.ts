import { TickerMessage } from '@/types/websocket';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoinRoute {
  price: string;
  best_bid: string; 
  best_ask: string;
}

const initialState: CoinRoute[] = [];

const coinRoutesSlice = createSlice({
  name: 'coinRoutes',
  initialState,
  reducers: {
    updateCoinRoutes(state, action: PayloadAction<TickerMessage>) {
      const { price, best_bid, best_ask } = action.payload;

      // We are looking to see if this course already exists in the state
      const existingRoute = state.find(route => route.price === price);

      if (existingRoute) {
        // If it exists, update its data
        existingRoute.best_bid = best_bid;
        existingRoute.best_ask = best_ask;
      } else {
        // If it doesn't exist, add a new course
        state.push({
          price,
          best_bid,
          best_ask,
        });
      }
    },
  },
});

export const { updateCoinRoutes } = coinRoutesSlice.actions;
export default coinRoutesSlice.reducer;
