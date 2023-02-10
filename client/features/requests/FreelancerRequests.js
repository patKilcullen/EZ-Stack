import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFreelancerRequests,
  selectFreelancerRequests,
  deleteRequestAsync,
} from "./freelancerRequestSlice";
import { useParams, Link } from "react-router-dom";

import { fetchSingleFreelancer } from "../freelancers/singleFreelancerSlice";

import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PendingIcon from "@mui/icons-material/Pending";


export default function FreelancerRequests(props) {
  //hardcoded data

  const dispatch = useDispatch();
  const requests = useSelector(selectFreelancerRequests);
  const id = useSelector((state) => state.freelancerAuth.me.id);

  useEffect(() => {
    dispatch(fetchSingleFreelancer(id)).then(() => {
      dispatch(fetchFreelancerRequests(id.toString()));
    });
  }, []);

  // const handleDeleteRequest = (projectId)=>{
  //   dispatch(deleteRequestAsync({projectId: projectId, freelancerId: id})).then(()=>{
  //     dispatch(fetchFreelancerRequests(id.toString()))
  //   })
  // }

  const handleDeleteRequest = async (projectId) => {
    await axios.delete(`/api/requests/${projectId}/${id}`).then(() => {
      dispatch(fetchFreelancerRequests(id.toString()));
    });
  };
  console.log("REEEQUESTS SINGLE FREELANCER VIEW: ", requests);

  return (
    <div
      id="freelancerRequests"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        color="primary"
        component="div"
        marginTop={5}
        marginBottom={3}
        variant="h4"
      >
        Pending Proposals
      </Typography>
      <div className="allList">
        {id.toString()
          ? requests.map((request) => (
              <div key={request.id} className="card">
                <Card
                  sx={{
                    minWidth: 200,
                    height: 200,

                    margin: "0 auto",
                    padding: "1em",
                    ":hover": { boxShadow: 20 },
                  }}
                >
                  <PendingIcon color="primary" />

                  <Typography
                    component="div"
                    color="primary"
                    align="center"
                    variant="body1"
                  >
                    <Link to={`/projects/${request.projectId}`}>
                      {request.project.title}
                    </Link>
                  </Typography>
                  <hr></hr>
                  <br></br>
                  <Typography component="div" color="secondary" variant="body2">
                    {" "}
                    Request Status: {request.status}
                  </Typography>
                  <br></br>
                  <br></br>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleDeleteRequest(request.project.id)}
                  >
                    Delete proposal
                  </Button>
                </Card>{" "}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
