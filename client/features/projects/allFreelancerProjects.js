import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { fetchProjectsByFreelancerAsync, selectProjects  } from "../projects/allProjectsSlice";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FreelancerRequests from "../requests/FreelancerRequests";


import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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



const AllFreelancerProjects = () => {
  const projects = useSelector(selectProjects);

  console.log("ALL PROJECT: ", projects)
  
  const dispatch = useDispatch()

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  
  
  useEffect(() => {
    dispatch(fetchProjectsByFreelancerAsync(freelancer));
  }, [dispatch] );

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="allViewContainer">
    <div className='allList'>
<Box>
    <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
      
          (
          <Tab label="Ongoing Projects" {...a11yProps(0)} />
          ) (
          <Tab label="Completed Projects" {...a11yProps(1)} />)
        </Tabs>

       

        <TabPanel value={value} index={0}>

        {projects.filter((project)=>{
            
            return project.status === "Ongoing"
                      
                    }).map((project) => (
          <div key={project.id} className='card'
          style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}
          >
            <Link to={`/projects/${project.id}`}>
          <Card sx={{ width: 300, height: 300 , display: "flex",flexDirection: "column", justifyContent: "center", alignItems:"center", ':hover': {boxShadow: 20},  }}>
          <CardContent>
          <Typography variant="h5" component="div">
            {project.title}
            </Typography>
            <Typography color='primary'  variant="h6" component="div">
            category: {project.category}
            </Typography>
            <Typography variant="body2" >
            Current Status: {project.status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">Learn More</Button>
          </CardActions>
        </Card>
        </Link>
        
        </div>
        ))}
        </TabPanel>

        <TabPanel value={value} index={1}>

        {projects.filter((project)=>{
            
            return project.status === "Complete"
                      
                    }).map((project) => (
          <div key={project.id} className='card'
          style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}
          >
            <Link to={`/projects/${project.id}`}>
          <Card sx={{ minWidth: 400, minHeight: 400, display: "flex",flexDirection: "column", justifyContent: "center", alignItems:"center"  }}>
          <CardContent>
          <Typography variant="h5" component="div">
            {project.title}
            </Typography>
            <Typography color='primary'  variant="h6" component="div">
            category: {project.category}
            </Typography>
            <Typography variant="body2" >
            Current Status: {project.status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">Learn More</Button>
          </CardActions>
        </Card>
        </Link>
      
        </div>
        ))}
        </TabPanel>
        </Box>
    </div>
      </div> 
      
  )
};

export default AllFreelancerProjects
