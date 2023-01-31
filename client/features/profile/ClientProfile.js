import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchClient, selectClient } from "../client/clientSlice";
import AllClientProjects from "../projects/allClientProjects";
import UpdateClient from "../client/UpdateClient";

//MUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
////////////////

const ClientProfile = () => {
  const dispatch = useDispatch()
  const id  = useSelector((state) => state.clientAuth.clientMe.id)
 const client = useSelector(selectClient)
 console.log(client)

  useEffect(() => {
    dispatch(fetchClient(id))
  }, [dispatch])

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  ///

return(

  <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Account Info" {...a11yProps(0)} />
          <Tab label="Edit Account" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <>
          <h1>{client.username}'s Profile</h1>
          <ul>
            <li>{client.email}</li>
            <li>
              {client.firstName} {client.lastName}
            </li>
            {client.imageUrl ? (
              <li>
                <img src={client.imageUrl} />
              </li>
            ) : (
              <li>
                No Image - <Link to={"/profile/update"}>Edit Profile</Link>
              </li>
            )}
            {client.description ? (
              <li>{client.description}</li>
            ) : (
              <li>
                No Description -{" "}
                <Link to={"/profile/update"}>Edit Profile</Link>
              </li>
            )}
            {client.rating ? (
              <li>Rating: {client.rating} </li>
            ) : (
              <li>No Ratings Yet!</li>
            )}
          </ul>
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateClient />
      </TabPanel>
    </Box>


  // <>
  // <h1>{client.username}'s Profile</h1>
  // <Link to={'/profile/update'}>Edit Profile</Link>
  // <ul>
  //   <li>{client.email}</li>
  //   <li>{client.firstName} {client.lastName}</li>
  //   {client.imageUrl ? 
  //   <li><img src={client.imageUrl} /></li> : 
  //   <li>No Image - <Link to={'/profile/update'}>Edit Profile</Link></li>}
  //   {client.description ? 
  //   <li>{client.description}</li> :
  //    <li>No Description - <Link to={'/profile/update'}>Edit Profile</Link></li>}
  //   {client.rating ? 
  //   <li>Rating: {client.rating} </li> : 
  //   <li>No Ratings Yet!</li>}
  // </ul>

  // <h1>Projects</h1>
  // <ul>
  //   {client.projects ?  <AllClientProjects id={client.id} /> : null}
  // </ul>
  // </>
)
}

export default ClientProfile
