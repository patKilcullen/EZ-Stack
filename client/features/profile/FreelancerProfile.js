import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchSingleFreelancer,
  selectSingleFreelancer,
} from "../freelancers/singleFreelancerSlice";
import AllFreelancerProjects from "../projects/allFreelancerProjects";
import UpdateFreelancer from "../freelancers/UpdateFreelancer";
import SingleFreelancer from "../freelancers/SingleFreelancer";

//MUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
  const dispatch = useDispatch();
  const id = useSelector((state) => state.freelancerAuth.me.id);
  const freelancer = useSelector(selectSingleFreelancer);

  useEffect(() => {
    dispatch(fetchSingleFreelancer(id));
  }, [dispatch]);

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  ///

  return (
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
    <h2>Welcome {freelancer.firstName}, we've missed you!</h2>
    <Typography variant="body2" color="text.secondary">
                  You are logged in as a freelancer.
                </Typography>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:"#F5F5F5",
          borderRadius: "4px"
        }}
        >
        <div className="card">
          <Card 
          sx={{
            width:400, height:550,
            margin: "0 auto",
            padding: "1em",
          }}
          >
            <CardMedia
              component="img"
              height="250"
              sx={{ objectFit: "contain" }}
              image={freelancer.imageUrl}
              title="Freelancer"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
               {freelancer.firstName} {freelancer.lastName}
              </Typography>
              
              <Typography variant="body2" color='text.secondary'>
                   {freelancer.email}
                </Typography>
          <hr
          style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
          ></hr>
                <div 
                      style={{display:"flex", justifyContent:"space-between", fontWeight:"bolder"}}
                      >
                        <Typography color='primary' variant="body2">
                        {freelancer.category}
                      </Typography>
                      <Typography  variant="body2">
                        Starting Rate: ${freelancer.hourlyRate}
                      </Typography>
                      </div>
                      <br></br>
                <Typography variant="body2" color="text.secondary">
                    Description: {freelancer.description}
                  </Typography>
            </CardContent>
          </Card>
        </div>


        <div 
        className="recent-orders"
        style={{backgroundColor: "white", margin:"100px 100px",  borderRadius: "4px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",  }}>
          <Typography
            component="h6"
            color="primary"
            gutterBottom
            align="center"
          >
            Recent Projects
          </Typography>
          

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>description</TableCell>
                <TableCell>Status</TableCell>
        
              </TableRow>
            </TableHead>
            <TableBody>
              {freelancer.projects ? freelancer.projects.map((project) => (
                
                <TableRow key={project.id}>
                  <TableCell ><Link to={`/projects/${project.id}`}>{project.title}</Link></TableCell>
                  <TableCell>{`${project.description.substr(0,200)}...`}</TableCell>
                  <TableCell>{project.status}</TableCell>
                </TableRow>
              )): null}
            </TableBody>
          </Table>
        </div>



      </Box>
    </TabPanel>
    <TabPanel value={value} index={1}>
    <div
         style={{width: "80vw"}}
        >
      <UpdateFreelancer />
      </div>
    </TabPanel>
  </Box>

  );
};

export default FreelancerProfile;