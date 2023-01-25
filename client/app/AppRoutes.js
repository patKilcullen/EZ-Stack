import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import AllProjects from '../features/projects/allProjects';
import SingleProject from '../features/projects/singleProject';
import AllClientProjects from '../features/projects/allClientProjects';
import AllFreelancerProjects from '../features/projects/allFreelancerProjects';
import { clientMe, freelancerMe } from './store';


/**
 * COMPONENT
 */

const AppRoutes = () => {
  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.me.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  // const clientIsLoggedIn = false
  // const freelancerIsLoggedIn = false
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(clientMe());
    dispatch(freelancerMe())
  }, []);

  return (
    <div>
      {clientIsLoggedIn || freelancerIsLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route
            path="/projects"
            element={<AllProjects />}
          />
          <Route
            path="/projects/:projectId"
            element={<SingleProject />}
          />
          <Route
            path="/projects/client/:clientId"
            element={<AllClientProjects />}
            
          />
          <Route
            path="/projects/freelancer/:freelancerId"
            element={<AllFreelancerProjects />}
            
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route
            path="/projects"
            element={<AllProjects />}
          />
          <Route
            path="/projects/:projectId"
            element={<SingleProject />}
            
          />
          <Route
            path="/projects/client/:clientId"
            element={<AllClientProjects />}
            
          />
          <Route
            path="/projects/freelancer/:freelancerId"
            element={<AllFreelancerProjects />}
            
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
