import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clientLogout, freelancerLogout } from '../../app/store';
import SvgIcon from '@mui/material/SvgIcon';


const Navbar = () => {
  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  
  const client = useSelector((state) => state.clientAuth.clientMe.id)

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutAndRedirectHome = () => {
    if(clientIsLoggedIn){
    dispatch(clientLogout());
    }else if(freelancerIsLoggedIn){
      dispatch(freelancerLogout())
    }
    navigate('/home');
  };
if (clientIsLoggedIn) {
  return (
 <div id="navbarBox">
      <h1 id="siteName">
        Fivver Clone<span>Some Slogan</span>
        </h1>
      <div id="navbar-right">
          <nav>
              <div
              style={{ display: "flex", flexDirection: "row", height: "50%", width: '100%' }}
              >
                <Link 
                to="/home">Home</Link>
                <Link to='profile'>My Account</Link>
                <Link to='/freelancers'>Freelancers</Link>
                <Link to={`/projects/client/${client}`}>My Projects</Link>
                <Link to="/post">Post a Project</Link>
                <button type="button" onClick={logoutAndRedirectHome}>
                  Logout
                </button>
              </div>
          </nav>
      </div>
    </div>
  );
}
if (freelancerIsLoggedIn) {
  return (
    <div id="navbarBox">
         <h1 id="siteName">
           Fivver Clone<span>Some Slogan</span>
           </h1>
         <div id="navbar-right">
             <nav>
                 <div
                 style={{ display: "flex", flexDirection: "row", height: "50%", width: '100%' }}
                 >
                   <Link 
                   to="/home">Home</Link>
                   <Link to='profile'>My Account</Link>
                   <Link to='/projects'>View All Project</Link>
                   <Link to={`/projects/freelancer/${freelancer}`}>My Projects</Link>
                   <button type="button" onClick={logoutAndRedirectHome}>
                     Logout
                   </button>
                 </div>
             </nav>
         </div>
       </div>
     );
   }
   if (!freelancerIsLoggedIn && !clientIsLoggedIn){
    return (
      <div id="navbarBox">
           <h1 id="siteName">
             Fivver Clone<span>Some Slogan</span>
             </h1>
           <div id="navbar-right">
               <nav>
                   <div
                   style={{ display: "flex", flexDirection: "row", height: "50%", width: '100%' }}
                   >
                     <Link 
                     to="/home">Home</Link>
                     <Link to='/projects'>View All Project</Link>
                     <Link to="/freelancers">View All Freelancer</Link>
                     <Link to="/login">Login</Link>
                     <Link to="/signup">Signup</Link>
                     <Link to="/signup">Post A Project</Link>
                   </div>
               </nav>
           </div>
         </div>
       );
     }

};

export default Navbar;
