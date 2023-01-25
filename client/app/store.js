import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import authReducer from '../features/auth/authSlice';
import clientAuthSlice from '../features/auth/clientAuthSlice';
import freelanceAuthSlice from '../features/auth/freelanceAuthSlice'
import allProjectsSlice from '../features/projects/allProjectsSlice';


const store = configureStore({
  reducer: { 
    clientAuth: clientAuthSlice,
    freelanceAuth: freelanceAuthSlice,
    allProjects: allProjectsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/clientAuthSlice';
