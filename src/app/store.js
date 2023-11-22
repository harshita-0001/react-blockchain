import { configureStore } from '@reduxjs/toolkit';
import { connectSlice } from '../feature/Connect/connectSlice';

export const store = configureStore({
  reducer: {
      connect:connectSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
});
