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
                <h3>Requests: </h3>
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
                  <p>{request.requestMessage}</p>
                </li>
                <button onClick={() => handleAssignUser(request.freelancer.id)}>
                  Assign {request.freelancer.firstName}{" "}
                  {request.freelancer.lastName} to Project
                </button>
                <button
                  onClick={() => handleUnassignUser(request.freelancer.id)}
                >
                  Unassign {request.freelancer.firstName}{" "}
                  {request.freelancer.lastName} from Project
                </button>
              </div>
            ))
          : null}
      </ul>
    </div>
  );
}
