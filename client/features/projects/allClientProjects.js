import React, { useEffect, useState } from "react";
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
  const [pend, setPend] = useState(false)
  const [ongo, setOngo] = useState(false)
  const [comp, setComp] = useState(false)

  const client = useSelector((state) => state.clientAuth.clientMe.id);

  projects.map((project) => {
    if(project.status === 'Pending' && !pend){
      setPend(true)
    }
    if(project.status === 'Ongoing' && !ongo){
      setOngo(true)
    }
    if(project.status === 'Complete' && !comp){
      setComp(true)
    }
  })


  useEffect(() => {
    dispatch(fetchProjectsByClientAsync(client));
  }, [dispatch]);

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
              {pend ? 
            <div className="allList">
              {projects
                .filter((project) => {
                  return project.status === "Pending";
                })
                .map((project) => { 
                return(
                  <div
                    key={project.id}
                    className='card'
                    style={{ width: "80vw" }}
                  >
                    <Link to={`/projects/${project.id}`}>
                      <Card 
                      sx={{ width:400, maxHeight:500,
                          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                          backgroundColor:"#F5F5F5", 
                          boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                        ':hover': {
                        boxShadow: 20, // theme.shadows[20]
                          },
                          }}>
                        <CardContent>
                          <Typography variant="h6" >
                            {project.title}
                          </Typography>
                          <Typography
                            color="primary"
                            variant="body2"
                            
                          >
                            category: {project.category}
                          </Typography>
                          <hr></hr>
                          <Typography variant="body2">
                            Current Status: {project.status}
                          </Typography>

                          <Typography
                            variant="subtitle1"
                          >
                            {project.description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button fullWidth gutterbottom="true"
                          variant="contained">
                            Go to Project
                          </Button>
                        </CardActions>
                      </Card>
                    </Link>
                  </div>
                )

              })}
              </div> : <p>No Pending Projects</p>}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {ongo ? 
              <div className="allList">
              {projects
                .filter((project) => {
                  return project.status === "Ongoing";
                })
                .map((project) => (
                  <div
                    key={project.id}
                    className="card"
                    style={{ width: "80vw" }}
                    // style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
                  >
                    <Link to={`/projects/${project.id}`}>
                      <Card
                        sx={{
                          width: 400,
                          height: 400,
                          ":hover": { boxShadow: 20 },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {project.title}
                          </Typography>
                          <Typography
                            color="primary"
                            variant="h6"
                            component="div"
                          >
                            category: {project.category}
                          </Typography>
                          <hr
                            style={{
                              border: "none",
                              height: "1px",
                              color: "#333",
                              backgroundColor: "#333",
                            }}
                          ></hr>
                          <Typography variant="body2">
                            Current Status: {project.status}
                          </Typography>

                          <Typography
                            gutterBottom
                            component="div"
                            variant="subtitle1"
                          >
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
                </div> : <p>No Ongoing Projects</p> }
            </TabPanel>
            <TabPanel value={value} index={2}>
              {comp ? 
              <div className="allList">
              {projects
                .filter((project) => {
                  return project.status === "Complete";
                })
                .map((project) => (
                  <div
                    key={project.id}
                    className="card"
                    style={{ width: "80vw" }}
                    // style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
                  >
                    <Link to={`/projects/${project.id}`}>
                      <Card sx={{ width: 400, height: 400 }}>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {project.title}
                          </Typography>
                          <Typography
                            color="primary"
                            variant="h6"
                            component="div"
                          >
                            category: {project.category}
                          </Typography>
                          <hr></hr>
                          <Typography variant="body2">
                            Current Status: {project.status}
                          </Typography>

                          <Typography
                            gutterBottom
                            component="div"
                            variant="subtitle1"
                          >
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
                </div> : <p>No Completed Projects</p> }
            </TabPanel>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default AllClientProjects;
