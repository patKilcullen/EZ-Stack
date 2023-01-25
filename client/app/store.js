import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import authReducer from '../features/auth/authSlice';
import clientAuthSlice from '../features/auth/clientAuthSlice';
import freelanceAuthSlice from '../features/auth/freelanceAuthSlice'
import projectsSlice from '../features/projects/allProjectsSlice'
import singleProjectSlice from '../features/projects/singleProjectSlice';


const store = configureStore({
  reducer: { 
    clientAuth: clientAuthSlice,
    freelancerAuth: freelanceAuthSlice,
    allProjects: projectsSlice,
    singleProject: singleProjectSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/clientAuthSlice';
export * from '../features/auth/freelanceAuthSlice';
