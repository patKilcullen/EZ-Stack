import React from "react";
import { useSelector } from "react-redux";
import SideNav from "../navbar/SideNav";
import AllProjects from "../projects/allProjects";
import  AllFreelancers  from "../freelancers/AllFreelancers";

/**
 * COMPONENT
 */
const Home = () => {
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
        <div id="right-body">
          <AllProjects />
        </div>
    );
  }

  if (clientIsLoggedIn) {
    return (
        <div id="right-body">
          <AllFreelancers />
        </div>
    );
  }

  return(
      <div id="right-body">
        <AllFreelancers />
    </div>
  )
    
};

export default Home;
