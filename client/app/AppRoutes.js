
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

import { clientMe, freelancerMe } from './store';
import Client from '../features/client/Client';
import ClientProfile from '../features/profile/ClientProfile';
import FreelancerProfile from '../features/profile/FreelancerProfile';
import SignUpForm from '../features/auth/SignUpForm';
import UpdateClient from '../features/client/UpdateClient';


import AboutUs from "../features/footer/AboutUs";
import ContactUs from "../features/footer/ContactUs";

import UpdateFreelancer from "../features/freelancers/UpdateFreelancer";
import AddProject from "../features/projects/postProject";

import AddRequest from "../features/requests/AddRequest";

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
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />

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
          <Route
            path="/projects/freelancer/:freelancerId"
            element={<AllFreelancerProjects />}
          />

          <Route path="/freelancers" element={<AllFreelancers />} />
          <Route path="/freelancers/:id" element={<SingleFreelancer />} />
          <Route path="/profile" element={<ClientProfile />} />

          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>

          <Route path="profile/update" element={<UpdateClient />} />
          <Route path="/post" element={<AddProject />} />
        </Routes>
      </div>
    );
  }

  if (freelancerIsLoggedIn) {
    return (
      <div>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />

          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:projectId" element={<SingleProject />} />

          <Route
            path="/freelancer/:freelancerId/requests"
            element={<FreelancerRequests />}
          />
          <Route
            path="/projects/:projectId/addrequest"
            element={<AddRequest />}
          />
          <Route
            path="/projects/client/:clientId"
            element={<AllClientProjects />}
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

          <Route path="profile/update" element={<UpdateFreelancer />} />
          <Route path="/client-profile/:id" element={<Client />} />
        </Routes>
      </div>

   
    );
  } else {
    return (
      <Routes>
        {/* <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />

          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} /> */}

          <Route path="/*" element={<Home />} />

          <Route to="/home" element={<Home />} />


        <Route
          path="/login"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route path="/signup" element={<SignUpForm />} />

        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:projectId" element={<SingleProject />} />
        <Route
          path="/projects/client/:clientId"
          element={<AllClientProjects />}
        />
        <Route
          path="/projects/freelancer/:freelancerId"
          element={<AllFreelancerProjects />}
        />

        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>

        {/* not logged in single Client view */}

        {/* not logged in single Client view */}

        <Route path="/client-profile/:id" element={<Client />} />

        <Route path="/freelancers" element={<AllFreelancers />} />
        <Route path="/freelancers/:id" element={<SingleFreelancer />} />
        {/* not logged in single Client view */}
        <Route path="/update-client" element={<UpdateClient />} />
      </Routes>
    );
  }
};
export default AppRoutes;
