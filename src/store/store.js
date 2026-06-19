import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from './characterReducer';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});
