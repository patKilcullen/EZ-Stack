import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clientLogout, freelancerLogout } from '../../app/store';
import SvgIcon from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';


const Navbar = () => {
  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  
  const client = useSelector((state) => state.clientAuth.clientMe.id)

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
  
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
                to="/home"><HomeIcon fontSize="large" /></Link>
                <Link to='profile'>My Account</Link>
                <Link to='/freelancers'>Freelancers</Link>
                <Link to='/messages'>Messages</Link>
                <Link to={`/projects/client/${client}`}>My Projects</Link>
                <Link to="/post">Post a Project</Link>

                <Button variant="contained" size="small" onClick={logoutAndRedirectHome}>
                  Logout
                </Button>
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
                   to="/home"><HomeIcon fontSize="large" /></Link>
                   <Link to='profile'>My Account</Link>
                   <Link to='/projects'>View All Project</Link>
                   <Link to={`/projects/freelancer/${freelancer}`}>My Projects</Link>
                   <Button variant="contained" size="small" onClick={logoutAndRedirectHome}>
                  Logout
                </Button>
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
                     to="/home"><HomeIcon fontSize="large" /></Link>
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
