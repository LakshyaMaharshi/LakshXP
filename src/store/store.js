import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

// Optional type-like documentation for better IDE support
/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */