// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataslice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
