import React from "react";
import { useSelector } from "react-redux";
import SideNav from "../navbar/SideNav";

/**
 * COMPONENT
 */
const Home = (props) => {
  const clientUsername = useSelector(
    (state) => state.clientAuth.clientMe.username
  );
  const freelancerUsername = useSelector(
    (state) => state.freelancerAuth.me.username
  );

  const clientIsLoggedIn = useSelector(
    (state) => !!state.clientAuth.clientMe.id
  );
  const freelancerIsLoggedIn = useSelector(
    (state) => !!state.freelancerAuth.me.id
  );

  if (freelancerIsLoggedIn) {
    return (
      <div id="main-body">
        <SideNav />
        <div id="right-body">
          <h3>Welcome, {freelancerUsername}</h3>

        </div>
      </div>
    );
  }

  if (clientIsLoggedIn) {
    return (
      <div id="main-body">
        <SideNav />
        <div id="right-body">
          <h3>Welcome, {clientUsername}</h3>
        </div>
      </div>
    );
  }

  return(
    <div id="main-body">
      <SideNav />
      <div id="right-body">
        <h3>Welcome!</h3>
      </div>
    </div>
  )
    
};

export default Home;
