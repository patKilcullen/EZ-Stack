
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import  AllFreelancers  from '../features/freelancers/AllFreelancers';
import SingleFreelancer from '../features/freelancers/SingleFreelancer';
import Home from '../features/home/Home';
import AllProjects from '../features/projects/allProjects';
import SingleProject from '../features/projects/singleProject';
import AllClientProjects from '../features/projects/allClientProjects';
import AllFreelancerProjects from '../features/projects/allFreelancerProjects';
import ClientRequests from '../features/requests/ClientRequests'
import FreelancerRequests from "../features/requests/FreelancerRequests"
import MostReviewedFreelancers from '../features/freelancers/MostReviewedFreelancers'

import { clientMe, freelancerMe } from './store';
import Client from '../features/client/Client';
import ClientProfile from '../features/profile/ClientProfile';
import FreelancerProfile from '../features/profile/FreelancerProfile';
import SignUpForm from '../features/auth/SignUpForm';
import UpdateClient from '../features/client/UpdateClient';


import AboutUs from "../features/footer/AboutUs";
import ContactUs from "../features/footer/ContactUs";

import PageNotFound from '../features/PageNotFound';


import AllMessages from '../features/messages/AllMessages';
import IndividualMessagesClient from '../features/messages/IndividualMessagesClient';
import IndividualMessagesFreelancer from '../features/messages/IndividualMessagesFreelancer';

import UpdateFreelancer from "../features/freelancers/UpdateFreelancer";
import AddProject from "../features/projects/postProject";


import AddRequest from "../features/requests/AddRequest";
import ViewAllRatings from '../features/ratings/ViewAllRatings';
import SubmitWork from '../features/projects/SubmitWork';
import ReviewWork from '../features/projects/ReviewWork';
import Work from '../features/projects/Work';


/**
 * COMPONENT
 */

const AppRoutes = () => {
  const clientIsLoggedIn = useSelector(
    (state) => !!state.clientAuth.clientMe.id
  );
  const freelancerIsLoggedIn = useSelector(
    (state) => !!state.freelancerAuth.me.id
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(freelancerMe());
    dispatch(clientMe());
  }, []);

  if (clientIsLoggedIn) {
    return (
      <div>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Home />} />

          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:projectId" element={<SingleProject />} />
          <Route
            path="/projects/:projectId/requests"
            element={<ClientRequests />}
          />

          <Route
            path="/projects/client/:clientId"
            element={<AllClientProjects />}
          />
  <Route path="/freelancers/most" element={<MostReviewedFreelancers />} />

          <Route path="/freelancers" element={<AllFreelancers />} />
          <Route path="/freelancers/:id" element={<SingleFreelancer />} />
          <Route path="/profile" element={<ClientProfile />} />

          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>

          

          <Route path='profile/update' element={<UpdateClient />} />
  

          <Route path='/messages' element={<AllMessages />} />
          <Route path='/messages/:id' element={<IndividualMessagesClient/>} />


          <Route path="profile/update" element={<UpdateClient />} />
          <Route path="/post" element={<AddProject />} />

          <Route path='/login' element={<Home />} />


           {/* PAGE NOT FOUND */}
           <Route path="*" element={<PageNotFound />} />



          <Route path="/ratings/:freelancerId" element={<ViewAllRatings />} />
          <Route path='/review/:id' element={<ReviewWork />} />
          <Route path='/work/:id' element={<Work />} />

        </Routes>
      </div>
    );
  }

  if (freelancerIsLoggedIn) {
    return (
      <div>
        <Routes>

          <Route path="/" element={<Home />} />

       

          <Route path="/home" element={<Home />} />

          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:projectId" element={<SingleProject />} />
          
          <Route
            path="/freelancer/:freelancerId/requests"
            element={<FreelancerRequests />}
          />
            <Route path="/freelancers/most" element={<MostReviewedFreelancers />} />
          <Route
            path="/projects/:projectId/addrequest"
            element={<AddRequest />}
          />

          <Route
            path="/projects/freelancer/:freelancerId"
            element={<AllFreelancerProjects />}
          />

          <Route path="/freelancers" element={<AllFreelancers />} />
          <Route path="/freelancers/:id" element={<SingleFreelancer />} />
          <Route path="/profile" element={<FreelancerProfile />} />

          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>


          <Route path='profile/update' element={<UpdateFreelancer />} />
          <Route path='/messages' element={<AllMessages />} />
          <Route path='/messages/:id' element={<IndividualMessagesFreelancer/>} />
          <Route path="/client-profile/:id" element={<Client />} />


          <Route path='/submit/:id' element={<SubmitWork />} />
          <Route path='/work/:id' element={<Work />} />
          <Route path='/login' element={<Home />} />
          <Route path='/review/:id' element={<ReviewWork />} />

           {/* PAGE NOT FOUND */}
           <Route path="*" element={<PageNotFound />} />

          <Route path="/ratings" element={<ViewAllRatings />} />


        </Routes>
      </div>
    )
  }else{
    return(
    <Routes>


          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Home />} />
          
          <Route path="/freelancers/most" element={<MostReviewedFreelancers />} />
        <Route
          path="/login"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route path="/signup" element={<SignUpForm />} />

        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:projectId" element={<SingleProject />} />

 

        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>

      

        <Route path="/client-profile/:id" element={<Client />} />

        <Route path="/freelancers" element={<AllFreelancers />} />
        <Route path="/freelancers/:id" element={<SingleFreelancer />} />
        

           {/* PAGE NOT FOUND */}
           <Route path="*" element={<PageNotFound />} />

      </Routes>
    );
  }
};
export default AppRoutes;
