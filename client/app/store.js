import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import authReducer from '../features/auth/authSlice';
import clientAuthSlice from '../features/auth/clientAuthSlice';

import freelanceAuthSlice from '../features/auth/freelanceAuthSlice'
import allFreelancersSlice from '../features/freelancers/allFreelancersSlice';
import singleFreelancerSlice from '../features/freelancers/singleFreelancerSlice';



const store = configureStore({
  reducer: { 
    clientAuth: clientAuthSlice,
    freelancerAuth: freelanceAuthSlice,
    allFreelancers: allFreelancersSlice,
    SingleFreelancer: singleFreelancerSlice,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/clientAuthSlice';
export * from '../features/auth/freelanceAuthSlice';
