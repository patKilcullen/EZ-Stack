import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import authReducer from '../features/auth/authSlice';
import clientAuthSlice from '../features/auth/clientAuthSlice';


import projectsSlice from '../features/projects/allProjectsSlice'
import singleProjectSlice from '../features/projects/singleProjectSlice';
import clientReducer from '../features/client/clientSlice';
import freelanceAuthSlice from '../features/auth/freelanceAuthSlice'
import allFreelancersSlice from '../features/freelancers/allFreelancersSlice';
import singleFreelancerSlice from '../features/freelancers/singleFreelancerSlice';
import clientRequestSlice from '../features/requests/clientRequestSlice';
import freelancerRequestSlice from '../features/requests/freelancerRequestSlice';




const store = configureStore({
  reducer: { 
    clientAuth: clientAuthSlice,
    freelancerAuth: freelanceAuthSlice,

    allProjects: projectsSlice,
    singleProject: singleProjectSlice,
    client: clientReducer,
    allFreelancers: allFreelancersSlice,
    SingleFreelancer: singleFreelancerSlice,
    clientRequests: clientRequestSlice,
    freelancerRequests: freelancerRequestSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/clientAuthSlice';
export * from '../features/auth/freelanceAuthSlice';
