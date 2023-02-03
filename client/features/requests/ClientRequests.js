import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClientRequests,
  selectClientRequests,
  editAcceptRequest,
} from "./clientRequestSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editAssignFreelancer } from "../projects/singleProjectSlice";

import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ClientRequests(props) {


  const dispatch = useDispatch();
  const requests = useSelector(selectClientRequests);
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(fetchClientRequests(projectId))
  }, [dispatch,]);

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
         dispatch(fetchClientRequests(projectId));

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


  return (
    <div>
      <ul>
        {props.clientId === props.projectClientId
          ? 
          requests.length < 1 ? "No requests yet for this project" :
          requests.map((request) => (
              <div>
                <Card>
                  <CardContent>
                <h3> Project Request: </h3>
                <li key={request.id}>
                  <p>Request Status: {request.status}</p>
                  <p>
                    You have recieved a request from:{" "}
                    <Link to={`/freelancers/${request.freelancer.id}`}>
                      {" "}
                      {request.freelancer.firstName}{" "}
                      {request.freelancer.lastName}
                    </Link>
                  </p>
                  <Typography gutterBottom variant="h5" component="div">
                  {request.requestMessage}
                  </Typography>
                </li>
              {request.project.freelancerId === null ?  <Button size="small" variant="contained" onClick={() => handleAssignUser(request.freelancer.id)}>
                  Assign {request.freelancer.firstName}{" "}
                  {request.freelancer.lastName} to Project
                </Button>: null}
                {" "}
               {request.project.freelancerId === request.freelancerId ? <Button size="small" variant="contained" onClick={() => handleUnassignUser(request.freelancer.id)}>
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

