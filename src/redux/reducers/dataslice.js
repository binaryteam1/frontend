// dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    testData: [],
  },
  reducers: {
    addSocketData: (state, action) => {
      state.testData = [action.payload];
    },
  },
});

export const { addSocketData } = dataSlice.actions;

export default dataSlice.reducer;
