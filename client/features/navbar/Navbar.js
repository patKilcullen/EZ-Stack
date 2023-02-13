import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clientLogout, freelancerLogout } from "../../app/store";
import SvgIcon from "@mui/material/SvgIcon";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Navbar = () => {
  const clientIsLoggedIn = useSelector(
    (state) => !!state.clientAuth.clientMe.id
  );
  const freelancerIsLoggedIn = useSelector(
    (state) => !!state.freelancerAuth.me.id
  );

  const client = useSelector((state) => state.clientAuth.clientMe.id);

  const freelancer = useSelector((state) => state.freelancerAuth.me.id);

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
    if (clientIsLoggedIn) {
      dispatch(clientLogout());
    } else if (freelancerIsLoggedIn) {
      dispatch(freelancerLogout());
    }
    navigate("/home");
  };
  if (clientIsLoggedIn) {
    return (
      <div id="navbarBox">
        <h1 id="siteName">
          Fivver Clone<span>Some Slogan</span>
        </h1>
        <div id="navbar-right">
          <nav>
            <div>
              <Link to="/home">
                <HomeIcon fontSize="medium" />
              </Link>
              <Link to="profile">MY ACCOUNT</Link>
              <Link to="/freelancers">FREELANCERS</Link>
              <Link to="/messages">MESSAGES</Link>
              <Link to={`/projects/client/${client}`}>MY PROJECTS</Link>
              <Link to="/post">POST A PROJECT</Link>
              <button className="logout-btn" onClick={logoutAndRedirectHome}>
                  <span>LOG OUT</span>
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
            <div>
              <Link to="/home">
                <HomeIcon fontSize="medium" />
              </Link>
              <Link to="profile">MY ACCOUNT</Link>
              <Link to="/projects">PROJECTS</Link>
              <Link to="/messages">MESSAGES</Link>
              <Link to={`/projects/freelancer/${freelancer}`}>MY PROJECTS</Link>
              <Link to={`/freelancer/${freelancer}/requests`}>PROPOSALS</Link>
              
                <button className="logout-btn" onClick={logoutAndRedirectHome}>
                  <span>LOG OUT</span>
                </button>
            
            </div>
          </nav>
        </div>
      </div>
    );
  }
  if (!freelancerIsLoggedIn && !clientIsLoggedIn) {
    return (
      <div id="navbarBox">
        <h1 id="siteName">
          Fivver Clone<span>Some Slogan</span>
        </h1>
        <div id="navbar-right">
          <nav>
            <div>
              <Link to="/home">
                <HomeIcon fontSize="medium" />
              </Link>
              <Link to="/projects">PROJECTS</Link>
              <Link to="/freelancers">FREELANCERS</Link>
              <Link to="/login">LOGIN</Link>
              <Link to="/signup">SIGN UP</Link>
              <Link to="/signup">POST A PROJECT</Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
};

export default Navbar;
