import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});