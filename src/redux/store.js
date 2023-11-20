// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/dataslice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
