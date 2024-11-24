import { configureStore } from '@reduxjs/toolkit';
import coinRoutesReducer from './coinRoutes'

export const store = configureStore({
  reducer: {
    coinRoutes: coinRoutesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
