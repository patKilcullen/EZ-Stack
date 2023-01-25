import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT
 */
const Home = (props) => {
  const clientUsername = useSelector((state) => state.clientAuth.me.username);
  const freelancerUsername = useSelector((state) => state.freelancerAuth.me.username);


if(clientUsername){

  return (
    <div>
      <h3>Welcome, {clientUsername}</h3>
    </div>
  );
}

if(freelancerUsername){
  return (
    <div>
      <h3>Welcome, {freelancerUsername}</h3>
    </div>
  );
}

};

export default Home;
