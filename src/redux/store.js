import { configureStore } from '@reduxjs/toolkit';
import savedBuildsReducer from './savedBuildsSlice';

export const store = configureStore({
  reducer: {
    savedBuilds: savedBuildsReducer,
  },
});