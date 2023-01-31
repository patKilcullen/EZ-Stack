import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClientRequests,
  selectClientRequests,
  editAcceptRequest,
} from "./clientRequestSlice";
import { useParams, Link } from "react-router-dom";
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
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const requests = useSelector(selectClientRequests);
  const { projectId } = useParams();

  const project = useSelector(selectSingleProject);

  useEffect(() => {
    dispatch(fetchClientRequests(projectId)).then(() => {
      dispatch(fetchSingleProjectAsync(projectId));
    });
  }, [dispatch]);

  const handleAssignUser = (id) => {
    project.singleProject.freelancerId === null ?
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
      .then(() => {
        
        dispatch(
          editAcceptRequest({
            projectId: projectId,
            freelancerId: id,
            status: "ACCEPTED",
          })
        )
      })
      .then(() => {
        dispatch(fetchClientRequests(projectId));
         
      }).then(()=>{
        setError("")
      })
      : setError("You already have a freelancer assigned to this project. You can only assign one freelnacer per project. Please unassign the current freelancer before adding a new one.")
  };
  const handleUnassignUser = (id) => {
    //  id === project.singleProject.freelancerId ?
    dispatch(
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
      .then(() => {
        dispatch(
          editAcceptRequest({
            projectId: projectId,
            freelancerId: id,
            status: "PENDING",
          })
        );
      })
      .then(() => {
        dispatch(fetchClientRequests(projectId));
      }).then(()=>{
        setError("")
      })
    //  : setError("Freelancer is not assigned to project")
  };

  return (
    <div>
      <ul>
      <p style={{color: "red", fontSize: "16px"}}>{error}</p>
        {props.clientId === props.projectClientId
          ? requests.map((request) => (
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
                <Button size="small" variant="contained" onClick={() => handleAssignUser(request.freelancer.id)}>
                  Assign {request.freelancer.firstName}{" "}
                  {request.freelancer.lastName} to Project
                </Button>
                {" "}
                <Button size="small" variant="contained" onClick={() => handleUnassignUser(request.freelancer.id)}>
                  Unassign {request.freelancer.firstName}{" "}
                  {request.freelancer.lastName} from Project
                </Button>
                </CardContent>
                </Card>
              </div>
            ))
          : null}
      </ul>
    </div>
  );
}

