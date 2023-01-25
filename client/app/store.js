import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import authReducer from '../features/auth/authSlice';
import clientAuthSlice from '../features/auth/clientAuthSlice';
import freelanceAuthSlice from '../features/auth/freelanceAuthSlice';
import clientReducer from '../features/client/clientSlice';

const store = configureStore({
  reducer: { 
    clientAuth: clientAuthSlice,
    freelancerAuth: freelanceAuthSlice,
    client: clientReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/clientAuthSlice';
export * from '../features/auth/freelanceAuthSlice';
