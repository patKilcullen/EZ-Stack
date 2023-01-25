import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import { AllFreelancers } from '../features/freelancers/AllFreelancers';
import SingleFreelancer from '../features/freelancers/SingleFreelancer';
import Home from '../features/home/Home';
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
            path="/freelancers"
            element={<AllFreelancers  />}
          />
          <Route
            path="/freelancers/:id"
            element={<SingleFreelancer  />}
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
            path="/freelancers"
            element={<AllFreelancers  />}
          />
          <Route
            path="/freelancers/:id"
            element={<SingleFreelancer  />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
