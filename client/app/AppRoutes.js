import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { clientMe, freelancerMe } from './store';
import Client from '../features/client/Client';


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

           {/* logged in single Client view */}
          <Route path="/client-profile" element={<Client/>} />


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

          {/* not logged in single Client view */}
          <Route path="/client-profile/:id" element={<Client/>} />


        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
