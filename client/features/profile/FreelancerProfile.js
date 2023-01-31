import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleFreelancer, selectSingleFreelancer } from "../freelancers/singleFreelancerSlice";
import AllFreelancerProjects from "../projects/allFreelancerProjects";
import UpdateFreelancer from "../freelancers/UpdateFreelancer";
import SingleFreelancer from "../freelancers/SingleFreelancer";
 
//MUI
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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


const FreelancerProfile = () => {
  const dispatch = useDispatch()
  const id = useSelector((state) => state.freelancerAuth.me.id)
  const freelancer = useSelector(selectSingleFreelancer)


  useEffect(() => {
    dispatch(fetchSingleFreelancer(id))
  }, [dispatch])

    //MUI for tabs
const [value, setValue] = React.useState(0);
const handleChange = (e, newValue) => {
  setValue(newValue);
};
///

  return(

<Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Account Info" {...a11yProps(0)} />
        <Tab label="Edit Account" {...a11yProps(1)} />
        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
     <>
     <h1>{freelancer.username}'s Profile</h1>
     <ul>
       <li>{freelancer.email}</li>
       <li>{freelancer.firstName} {freelancer.lastName}</li>
       {freelancer.imageUrl ? 
      <li><img src={freelancer.imageUrl} /></li> : 
       <li>No Image - <Link to={'/profile/update'}>Edit Profile</Link></li>}
       {freelancer.description ? 
      <li>{freelancer.description}</li> :
        <li>No Description - <Link to={'/profile/update'}>Edit Profile</Link></li>}
       {freelancer.rating ? 
       <li>Rating: {freelancer.rating} </li> : 
       <li>No Ratings Yet!</li>}
       {freelancer.categories ?
       <li>{freelancer.categories}</li> : 
       <li>No Categories - <Link to={'/profile/update'}>Edit Profile</Link></li>}
     </ul>
    </>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <UpdateFreelancer/>
    </TabPanel>
    {/* <TabPanel value={value} index={2}>
      Item Three
    </TabPanel> */}
  </Box>


    // <>
    // <h1>{freelancer.username}'s Profile</h1>
    // <Link to={'/profile/update'}>Edit Profile</Link>
    // <ul>
    //   <li>{freelancer.email}</li>
    //   <li>{freelancer.firstName} {freelancer.lastName}</li>
    //   {freelancer.imageUrl ? 
    //   <li><img src={freelancer.imageUrl} /></li> : 
    //   <li>No Image - <Link to={'/profile/update'}>Edit Profile</Link></li>}
    //   {freelancer.description ? 
    //   <li>{freelancer.description}</li> :
    //    <li>No Description - <Link to={'/profile/update'}>Edit Profile</Link></li>}
    //   {freelancer.rating ? 
    //   <li>Rating: {freelancer.rating} </li> : 
    //   <li>No Ratings Yet!</li>}
    //   {freelancer.categories ?
    //   <li>{freelancer.categories}</li> : 
    //   <li>No Categories - <Link to={'/profile/update'}>Edit Profile</Link></li>}
    // </ul>
    // {freelancer.projects ? <AllFreelancerProjects id={freelancer.id} /> : null }
    
    // </>
  )
}

export default FreelancerProfile
