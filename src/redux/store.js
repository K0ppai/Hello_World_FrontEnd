import { configureStore } from '@reduxjs/toolkit';
import greetingsSlicer from './greetings/greetingsSlicer';

const store = configureStore({
  reducer: {
    greetings: greetingsSlicer,
  },
});

export default store;
