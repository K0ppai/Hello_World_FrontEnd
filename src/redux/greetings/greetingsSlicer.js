import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  greetings: [],
  status: 'loading',
  error: null,
};

const GREETINGS_URL = 'http://127.0.0.1:3000/greetings';

export const fetchGreetings = createAsyncThunk('greetings/fetchGreetings', async () => {
  const res = await axios.get(GREETINGS_URL, {
    headers: {
      Accept: 'application/json',
    },
  });
  console.log(res.data);
  return res.data;
});

const greetingsSlice = createSlice({
  name: 'greetings',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGreetings.pending, (state) => ({ ...state, status: 'loading' }));
    builder.addCase(fetchGreetings.fulfilled, (state, action) => ({
      ...state,
      status: 'succeeded',
      greetings: action.payload,
    }));
  },
});

export default greetingsSlice.reducer;
