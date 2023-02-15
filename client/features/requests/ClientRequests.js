import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClientRequests,
  selectClientRequests,
  editAcceptRequest,
} from "./clientRequestSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editAssignFreelancer } from "../projects/singleProjectSlice";
import SingleRequest from "./SingleRequest";

import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';

export default function ClientRequests(props) {

const navigate = useNavigate()
  const dispatch = useDispatch();
  const requests = useSelector(selectClientRequests);
  const { projectId } = useParams();

  const projectStatus = useSelector((state)=> state.singleProject.singleProject.status)
  // console.log("LOGGO PROJECTO: ", project)

  useEffect(() => {
    dispatch(fetchClientRequests(projectId))
    // .then(()=>{
    //   requests.map((request)=>{
    //     dispatch(editAcceptRequest({projectId: request.projectId, seenClient: !!request.seenClient, freelancerId: request.freelancerId})).then(()=>{
    //       dispatch(fetchClientRequests(projectId))
    //     })
        
    //   })
    // })

  }, [dispatch]);

  const handleAssignUser = (id) => {
    dispatch(
      editAssignFreelancer({
        projectId: projectId,
        freelancerId: id,
        status: "Ongoing",
      })
    )
      .then(() => {
        
        dispatch(
          editAcceptRequest({
            projectId: projectId,
            freelancerId: id,
            status: "ACCEPTED",
          })
        )
      })
      .then(async () => {
        
       await dispatch(
          editAcceptRequest({
            projectId: projectId,
            freelancerId: id,
            status: "ACCEPTED",
          })
        )
      })
      .then(() => {
          dispatch(fetchClientRequests(projectId)).then(()=>{
           
            window.location.reload()
          });
      navigate(`/projects/${projectId}`)
      })

  };
  const handleUnassignUser = async (id) => {
    await dispatch(
      editAssignFreelancer({
        projectId: projectId,
        freelancerId: null,
        status: "Pending",
      })
    )
      .then(() => {
        dispatch(
          editAcceptRequest({
            projectId: projectId,
            freelancerId: id,
            status: "PENDING",
          })
        );
      })
      .then( async () => {
        dispatch(
         await  editAcceptRequest({
            projectId: projectId,
            freelancerId: id,
            status: "PENDING",
          })
        );
      })
      .then(() => {
         dispatch(fetchClientRequests(projectId));
      })
  };
const handleRead = async (projectId, seenClient, freelancerId)=>{
  console.log("SEEN CLIENT: ", !seenClient)
    await dispatch(editAcceptRequest({projectId: projectId, seenClient: !seenClient, freelancerId: freelancerId})).then(() => {
      dispatch(fetchClientRequests(projectId));
   })


}
console.log("WEQWEST: ", requests)
  return (
    <div >
      <ul>
        
        {!props.clientId ? <Link to={`/projects/${projectId}`}><Button>View Project</Button> </Link>:null}

        {props.clientId === props.projectClientId
          ? 
          requests.length < 1 ? "No requests yet for this project" :
          requests.map((request) => (
              <div key={request.id}
              
              style={{ margin:"20px 20px",  ":hover": {boxShadow: 20}, overflow:"auto"}}
              >
                
                <Card
                sx={{":hover": {boxShadow: 20}}}
                >
                  <Link to={`/requests/${request.id}`}> <Button onClick={()=>handleRead(request.projectId, request.seenClient, request.freelancer.id)}  >View Proposal</Button></Link>
                  {!request.seenClient ? 
                  <Typography variant="body2"  color="secondary">
                  Not Read
                  </Typography> : null
                }
                  <CardContent>
      
                <h3> Proposal for: {request.project.title}</h3>
                 {/* <h4 style={{display: 'inline', right: "0px"}}>Unread<Switch checked={request.seenClient} onChange={()=>handleRead(request.projectId, request.seenClient, request.freelancer.id)} color="primary" >Read</Switch>Read</h4>  */}
                <li key={request.id}>
                  <p>Proposal Status: 
                     <Typography variant="body2"  color="secondary">
                <PendingTwoToneIcon fontSize="small"/>
                   {request.status}
                </Typography>
                  </p>
                  <p>
                    From Freelancer:{" "}
                    <Link to={`/freelancers/${request.freelancer.id}`}>
                      {" "}
                      {request.freelancer.firstName}{" "}
                      {request.freelancer.lastName}
                    </Link>
                    <hr></hr>
                  </p>
                  <Typography gutterBottom variant="body2" >
                  Hourly Rate: $ {request.freelancer ? request.freelancer.hourlyRate : null}
                  </Typography>
                  <Typography gutterBottom variant="body2" >
                  Proposal:
                  </Typography>
                  <Typography gutterBottom variant="body2" >
                  {request.requestMessage.substr(
                          0,
                          200
                        )}
                  </Typography>
                </li>
              {request.project.freelancerId === null ?  <Button size="small" variant="contained" onClick={() => handleAssignUser(request.freelancer.id)}>
                  Assign {request.freelancer.firstName}{" "}
                  {request.freelancer.lastName} to Project
                </Button>: null}
                {" "}
               {request.project.freelancerId === request.freelancerId && projectStatus !== "Complete" ? <Button size="small" variant="contained" onClick={() => handleUnassignUser(request.freelancer.id)}>
                  Unassign {request.freelancer.firstName}{" "}
                  {request.freelancer.lastName} from Project
                </Button>: null}
                </CardContent>
                </Card>
              </div>
            ))
          : null}
      </ul>
    </div>
  );
}

