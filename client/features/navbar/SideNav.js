import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";



//https://mui.com/material-ui/react-drawer/


const SideNav = () => {
  const clientIsLoggedIn = useSelector(
    (state) => !!state.clientAuth.clientMe.id
  );
  const freelancerIsLoggedIn = useSelector(
    (state) => !!state.freelancerAuth.me.id
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    if (clientIsLoggedIn) {
    return (
      <div id="sideBar">
        {/* The navbar will show current client's pending projects 
            will show these links after you log in */}
        
        <Link to= "/" className = "projects">Projects</Link>
        <Link to= "/" className = "projects">Pending Requests</Link>
      
      </div>
    );
  }

  if (freelancerIsLoggedIn) {
    return (
      <div id="sideBar">
        {/* The navbar will show current client's pending projects 
            will show these links after you log in */}
        <nav>
        <div> Projects</div>
          <div>Update Account</div>
          <div>New Received Requests</div>
        </nav>
      </div>
    );
  }

  if (!freelancerIsLoggedIn && !clientIsLoggedIn){
  return (
    <div id="sideBar">
      <nav>
      <h4>Featured Catergories</h4>
        <div>Category 1</div>
        <div>Category 2</div>
        <div>Category 3</div>
      </nav>
    </div>
  );
}

};

export default SideNav;







//   if (clientIsLoggedIn) {
//     return (
//       <div id="side-nav" className="sidenav">
//         {/* The navbar will show current client's pending projects 
//             will show these links after you log in */}
//         <nav>
//           <div> Projects</div>
//           <div>Update Account</div>
//           <div>Pending Requests</div>
//         </nav>
//       </div>
//     );
//   }

//   if (freelancerIsLoggedIn) {
//     return (
//       <div id="side-nav" className="sidenav">
//         {/* The navbar will show current client's pending projects 
//             will show these links after you log in */}
//         <nav>
        
//         <div> Projects</div>
//           <div>Update Account</div>
//           <div>New Received Requests</div>
//         </nav>
//       </div>
//     );
//   }

//   return (
//     <div id="side-nav" className="sidenav">
//       <nav>
//       <h4>Featured Catergories</h4>
//         <div>Category 1</div>
//         <div>Category 2</div>
//         <div>Category 3</div>
//       </nav>
//     </div>
//   );
// };

// export default SideNav;
