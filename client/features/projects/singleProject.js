import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";
import EditProject from "../projects/editProjectForm";
import { deleteSingleProjectAsync } from "./allProjectsSlice";
import ClientRequests from "../requests/ClientRequests";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import AddRating from "../ratings/AddRating";
import FreelancerRequests from "../requests/FreelancerRequests";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';

import ButtonGroup from '@mui/material/ButtonGroup';

import { fetchRatingsByFreelancerAsync, selectRatings } from "../ratings/ViewAllSlice";
import { updateFreelancerAsync } from "../freelancers/singleFreelancerSlice";


import {
  fetchSingleFreelancerRequest,
  selectSingleRequest,
} from "../requests/singleRequestSlice";


import { likeProjectAsync, unlikeProjectAsync } from "./likedProjectsSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { checkLikedProjectsAsync, selectCheckProjects } from "./checkProjectSlice";






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

const SingleProject = () => {
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  const clientIsLoggedIn = useSelector(
    (state) => !!state.clientAuth.clientMe.id
  );
  const freelancerIsLoggedIn = useSelector(
    (state) => !!state.freelancerAuth.me.id
  );
  const client = useSelector((state) => state.clientAuth.clientMe.id);

  const freelancer = useSelector((state) => state.freelancerAuth.me);

  const project = useSelector(selectSingleProject);

  console.log(project)

  const { projectId } = useParams();

  const p = useSelector(selectCheckProjects);
  const dispatch = useDispatch();

  const clickMessage = () => {
    navigate(`/messages/${project.singleProject.clientId}`);
  };

  const likeProject = async () => {
    if (!p[0]) {
      await dispatch(
        likeProjectAsync({
          freelancerId: freelancer.id,
          projectId: project.singleProject.id,
        })
      );
      setRender(!render);
    }
  };

  const viewWork = () => {
  navigate(`/work/${project.singleProject.id}`)
}

  const submitWork = () => {
    navigate(`/submit/${project.singleProject.id}`)
  }

  const reviewWork = () => {
    navigate(`/review/${project.singleProject.id}`)
  }


  const unlike = async () => {
    await dispatch(unlikeProjectAsync(p[0].id))
    setRender(!render)
  }
  const reviews = useSelector(selectRatings)

  const ratings = reviews.map((review)=>review.rating)
  
  const ratingSum = ratings.reduce((accumulator, value) =>{
    return accumulator + value;
  }, 0)
  const ratingAvg = Math.round(ratingSum / ratings.length)
  
  {!ratingAvg ? dispatch(updateFreelancerAsync({id: project.singleProject.freelancerId, ratingAvg: 5})): dispatch(updateFreelancerAsync({id: project.singleProject.freelancerId, ratingAvg}))}

  useEffect(() => {

    dispatch(fetchRatingsByFreelancerAsync(project.singleProject.freelancerId))

    dispatch(fetchSingleProjectAsync(projectId));

    if(freelancerIsLoggedIn){
    dispatch(
      checkLikedProjectsAsync({ freelancerId: freelancer.id, projectId })
    );
    
    dispatch(
      fetchSingleFreelancerRequest({ freelancerId: freelancer.id, projectId })
    );
    }
  }, [dispatch, render]);

  const handleDelete = (projectId) => {
    dispatch(deleteSingleProjectAsync(projectId)).then(() => navigate("/home"));
  };



  //  const request = useSelector(selectSingleRequest);
  const request = useSelector((state) => state.singleRequest);

  const handleSubmitProposal = async () => {
    navigate(`/projects/${projectId}/addrequest`);
  };

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Project Info" {...a11yProps(0)} />
          {clientIsLoggedIn ? (
            <Tab label="Edit Project" {...a11yProps(1)} />
          ) : null}
          {clientIsLoggedIn  ? (
            <Tab label="Add Review" {...a11yProps(2)} />
          ) : null}
          {clientIsLoggedIn ? <Tab label="Proposals" {...a11yProps(3)} /> : null}
        </Tabs>
      </Box>
      <div className="singleView">
        <TabPanel value={value} index={0}>
          <div
            className="card"
            style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}
          >
            <Card
              sx={{
                maxWidth: 600,
                maxHeight: 700,
                minHeight: 450,
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", 
                // alignContent:"center",
              }}
            >
              <CardContent>
                {!p[0] ? null : <FavoriteIcon></FavoriteIcon>}
                <Typography fontFamily={"Playfair Display serif"} variant="h4" component="div" align="center">
                  {project.singleProject.title}
                </Typography>
                <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>

                <Typography
                  color="primary"
                  align="center"
                  variant="body1"
                  component="div"
                >
                  {project.singleProject.category}
                </Typography>
                
                <Typography variant="body1" align="center" color="secondary">
                {/* <PendingTwoToneIcon fontSize="small"/> */}
                   {project.singleProject.status}
                </Typography>
                <br></br>
                <br></br>

                <Typography align="center" variant="h6" component="div">
                  Description: {project.singleProject.description}
                </Typography>
                <br></br>

             { clientIsLoggedIn ? null : <Typography variant="h6" align="center">
                  Posted by:
                  {project.singleProject.id && project.singleProject.client ? (
                    <Link
                      to={`/client-profile/${project.singleProject.client.id}`}
                    >
                      <Typography
                        color="primary"
                        variant="h6"
                        sx={{ display: "inline" }}
                      >
                        {" "}
                        {project.singleProject.client.firstName}{" "}
                        {project.singleProject.client.lastName}
                      </Typography>
                    </Link>
                  ) : null}
                </Typography> }

                
                {clientIsLoggedIn && project.singleProject.freelancer ? (
                    
                      <Typography
                        color="primary"
                        variant="h5"
                        sx={{ display: "inline" }}
                      >
                        {" "}
                        Assigned to:   {" "}
                        <Link
                      to={`/freelancers/${project.singleProject.freelancerId}`}
                    >
                        {project.singleProject.freelancer.firstName}{" "}
                        {project.singleProject.freelancer.lastName}
                        </Link>
                      </Typography>
                  
                  ) : null}

                <br></br>
                
              </CardContent>

              <CardActions
              
              >

                {clientIsLoggedIn ? 
                // <div className="clientButtons" 
                // // style={{display:"flex", justifyContent:"center", alignItems:"center"}}
                // >
                <ButtonGroup align="center"  size="small">


                {client === project.singleProject.clientId && project.singleProject.status !== 'Complete'? (

                  <Button
                    onClick={() => handleDelete(project.singleProject.id)}
                    size="large"
                    variant="text"
                    fullWidth
                    startIcon={<DeleteIcon />}
                  >
                    Delete Project
                  </Button>
                ) : null}
                {client === project.singleProject.clientId && project.singleProject.work && project.singleProject.status === 'Ongoing'? <Button size="large" variant="text" onClick={reviewWork}>Review Work</Button> : null}
                {client === project.singleProject.clientId && project.singleProject.status === 'Complete' ? 
                <Button size="large" variant="text" startIcon={<ViewListIcon />} onClick={viewWork}>View Work</Button> : null}
                {/* </div>  */}
                </ButtonGroup>
                
                : null}
                {freelancerIsLoggedIn ? 
                // <div className="freelancerButtons">
                <ButtonGroup align="center"  size="small">
                {freelancer.id === project.singleProject.freelancerId && project.singleProject.status === 'Complete' ? <Button startIcon={<ViewListIcon />} size="large" variant="text" onClick={viewWork}>View Work</Button> : null }
                
                {freelancerIsLoggedIn ? (
                  <Button
                  sx={{ padding: 1, margin: 2, }} 
                    onClick={clickMessage}
                    size="large"
                    // variant="contained"
                    variant="text"
                    endIcon={<MessageIcon />}
                  >
                    Message
                  </Button>
                  
                ) : null}
            
                {freelancerIsLoggedIn ? (
                  <div>
                    {!p[0] ? <Button
                    sx={{ padding: 1, margin: 2, }} 
                      onClick={likeProject}
                      size="large"
                      // variant="contained"
                      variant="text"
                      endIcon={<FavoriteBorderIcon />}
                    >
                      Like 
                    </Button> : <Button
                    sx={{ padding: 1, margin: 2,  }} 
                      onClick={unlike}
                      size="large"
                      variant="text"
                      // variant="contained"
                      endIcon={<HeartBrokenIcon />}
                    >
                      Unlike
                    </Button> }

                    {request.singleRequest ? null : (
                      <Button
                      sx={{ padding: 1, margin: 2 }} 
                        onClick={() => handleSubmitProposal()}
                        size="large"
                        variant="text"
                        // variant="contained"
                        endIcon={<SendIcon />}
                      >
                        Send Proposal
                      </Button>
                    )}
                  </div>
                ) : null}
                {project.singleProject.freelancerId === freelancer.id && !project.singleProject.work ? <Button  endIcon={<SendIcon />} size="large" variant="text" onClick={submitWork}>Submit Work</Button> : null}
                {project.singleProject.freelancerId === freelancer.id && project.singleProject.work ? <Button endIcon={<SendIcon />} size="large" variant="text" onClick={viewWork} >Work Submitted</Button>: null}
                {/* </div> */}
              </ButtonGroup>
                : null}
              </CardActions>
            </Card>
            
        
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          {project.singleProject.freelancerId === null ? (
            <div>
              <EditProject
                projectId={projectId}
                projectClientId={project.singleProject.clientId}
                projectFreelancerId={project.singleProject.freelancerId}
              />
            </div>
          ) : (
            "You can't edit a project after you've assigned a freelancer to it"
          )}
        </TabPanel>

        <TabPanel value={value} index={2}>
          { project.singleProject.status === "Complete" ?
          <AddRating
            projectId={projectId}
            projectClientId={project.singleProject.clientId}
            projectFreelancerId={project.singleProject.freelancerId}
          /> : "You can only add a review once you project is marked complete"
  }
        </TabPanel>

        <TabPanel value={value} index={3}>
          {client === project.singleProject.clientId ? (
            <ClientRequests
              clientId={client}
              projectClientId={project.singleProject.clientId}
              freelancerId={project.singleProject.freelancerId}
              projectId={project.singleProject.id}
            />
          ) : null}
          {freelancerIsLoggedIn ? <FreelancerRequests /> : null}
        </TabPanel>
      </div>
    </div>
  );

}

export default SingleProject;
