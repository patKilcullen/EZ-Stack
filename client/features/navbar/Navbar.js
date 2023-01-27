import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clientLogout, freelancerLogout } from '../../app/store';

const Navbar = () => {
  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
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

  return (
 <div id="navbarBox">
      <h1 id="siteName">
        Fivver Clone<span>Some Slogan</span>
        </h1>
      <div id="navbar-right">
        <div id="search-box">
            <input
              type="text"
              placeholder="S e a r c h i n g . . ."
              id="search-bar"
            ></input>
            <button type="submit" id="go-button">
              Go
            </button>
          </div>
          {/* <AppRoutes /> */}
          <nav>
            {clientIsLoggedIn || freelancerIsLoggedIn ? (
              <div
              style={{ display: "flex", flexDirection: "row", height: "50%" }}
              >
                {/* The navbar will show these links after you log in */}
                <Link 
                to="/home">Home</Link>
                <Link to='profile'>My Account</Link>
                <Link to='/freelancers'>Freelancers</Link>
                <Link to="/create-project">Post a Project</Link>
                <button type="button" onClick={logoutAndRedirectHome}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link 
                to="/home">Home</Link>
                <Link to='/freelancers'>Freelancers</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/signup">Post a Project</Link>
              </div>
            )}
          </nav>
      </div>
    </div>
  );
};

export default Navbar;
