import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import AllProjects from '../features/projects/allProjects'
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
            path="/projects"
            element={<AllProjects />}
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
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
