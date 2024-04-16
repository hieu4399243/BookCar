import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../stores/Reducers/Index'

const store = configureStore({
  reducer: rootReducer,
});

export default store;