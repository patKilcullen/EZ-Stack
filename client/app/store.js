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
import  selectSingleRequest  from '../features/requests/singleRequestSlice';

import freelancerMessagesSlice from '../features/messages/freelancerMessagesSlice';
import clientMessagesSlice from '../features/messages/clientMessagesSlice';
import clientSingleMessageSlice from '../features/messages/clientSingleMessageSlice';
import freelancerSingleMessageSlice from '../features/messages/freelancerSingleMessageSlice';


import freelancerRequestSlice from '../features/requests/freelancerRequestSlice';
import ratingsSlice from '../features/ratings/ViewAllSlice';
import likedProjectsSlice from '../features/projects/likedProjectsSlice';
import checkProjectSlice from '../features/projects/checkProjectSlice';

import singleRatingSlice from '../features/ratings/singleRatingSlice';



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
    freelancerMessages: freelancerMessagesSlice,
    clientMessages: clientMessagesSlice,
    clientSingleMessage: clientSingleMessageSlice,
    freelancerSingleMessage: freelancerSingleMessageSlice,
    freelancerRequests: freelancerRequestSlice,
    allRatings: ratingsSlice,
    likedProjects: likedProjectsSlice,
    checkLikedProjects: checkProjectSlice,
    singleRequest: selectSingleRequest,
    singleRating: singleRatingSlice,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/clientAuthSlice';
export * from '../features/auth/freelanceAuthSlice';
