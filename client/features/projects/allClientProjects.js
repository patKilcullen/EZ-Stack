import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchProjectsByClientAsync,
  selectProjects,
} from "../projects/allProjectsSlice";
import EditProject from "./editProjectForm";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

const AllClientProjects = () => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const client = useSelector((state) => state.clientAuth.clientMe.id);

  useEffect(() => {
    dispatch(fetchProjectsByClientAsync(client));
  }, [dispatch]);

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="allViewContainer">
      <div className="allList">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending Projects" {...a11yProps(0)} />
          (
          <Tab label="Ongoing Projects" {...a11yProps(1)} />
          ) (
          <Tab label="Completed Projects" {...a11yProps(2)} />)
        </Tabs>

        <TabPanel value={value} index={0}>
          
          {projects.filter((project)=>{
            
return project.status === "Pending"
          
        }).map((project) => (
          
      
          <div
          key={project.id}
            className="card"
            style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
          >
          
            <Link to={`/projects/${project.id}`}>
              <Card sx={{ width: 400, height: 400 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {project.title}
                  </Typography>
                  <Typography color="primary" variant="h6" component="div">
                    category: {project.category}
                  </Typography>
                  <hr></hr>
                  <Typography variant="body2">
                    Current Status: {project.status}
                  </Typography>

                  <Typography gutterBottom component="div" variant="subtitle1">
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">
                    Go to Project
                  </Button>
                </CardActions>
              </Card>
              
            </Link>
            
          </div>
          
        ))}
       
        </TabPanel>
        <TabPanel value={value} index={1}>
          
          {projects.filter((project)=>{
            
return project.status === "Ongoing"
          
        }).map((project) => (
          
      
          <div key={project.id}
            className="card"
            style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
          >
            
            <Link to={`/projects/${project.id}`}>

          <Card sx={{ width: 400, height: 400 ,':hover': {boxShadow: 20},}}>
          <CardContent>
          <Typography   variant="h5" component="div">
            {project.title}
            </Typography>
            <Typography color='primary'  variant="h6" component="div">
            category: {project.category}
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <Typography variant="body2" >
            Current Status: {project.status}
            </Typography>


                  <Typography gutterBottom component="div" variant="subtitle1">
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">
                    Go to Project
                  </Button>
                </CardActions>
              </Card>
              
            </Link>
            
          </div>
          
        ))}
       
        </TabPanel>
        <TabPanel value={value} index={2}>
          
          {projects.filter((project)=>{
            
return project.status === "Complete"
          
        }).map((project) => (
          
      
          <div
          key={project.id}
            className="card"
            style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
          >
            
            <Link to={`/projects/${project.id}`}>
              <Card sx={{ width: 400, height: 400 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {project.title}
                  </Typography>
                  <Typography color="primary" variant="h6" component="div">
                    category: {project.category}
                  </Typography>
                  <hr></hr>
                  <Typography variant="body2">
                    Current Status: {project.status}
                  </Typography>

                  <Typography gutterBottom component="div" variant="subtitle1">
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">
                    Go to Project
                  </Button>
                </CardActions>
              </Card>
              
            </Link>
            
          </div>
          
        ))}
       
        </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default AllClientProjects;
