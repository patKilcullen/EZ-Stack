import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import { AllFreelancers } from '../features/freelancers/AllFreelancers';
import SingleFreelancer from '../features/freelancers/SingleFreelancer';
import Home from '../features/home/Home';
import { clientMe } from './store';


/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = false
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clientMe());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
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
