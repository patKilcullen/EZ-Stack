import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import { fetchSingleRequestAsync, selectSingleRequest, editAcceptRequest } from './singleRequestSlice'
import { fetchClientRequests } from './clientRequestSlice';
import { editAssignFreelancer } from '../projects/singleProjectSlice';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";

const SingleRequest = (props) => {
const dispatch = useDispatch()
const {requestId} = useParams()
useEffect(()=>{


    
            dispatch(fetchSingleRequestAsync(requestId))
            .then(async ()=>{
             request ?   await  dispatch(
                    editAcceptRequest({
                      projectId: request.projectId ,
                      seenClient: true,
                      freelancerId: request.freelancerId,
                    })): null
            })
      

}, [dispatch, request])

// const handleRead = async (projectId, seenClient, freelancerId)=>{
//   console.log("SEEN CLIENT: ", !seenClient)
//     await dispatch(editAcceptRequest({projectId: projectId, seenClient: !seenClient, freelancerId: freelancerId})).then(() => {
//       dispatch(fetchClientRequests(projectId));
//    })


// }


const wholeRequest = useSelector(selectSingleRequest)
console.log("WHOLE REQUEST: ", wholeRequest)
const request = wholeRequest.singleRequest

const handleAssignUser = (id) => {
    dispatch(
      editAssignFreelancer({
        projectId: request.projectId,
        freelancerId: request.freelancerId,
        status: "Ongoing",
      })
    )
      .then(() => {
        dispatch(
          editAcceptRequest({
            projectId: request.projectId,
            freelancerId: request.freelancerId,
            status: "ACCEPTED",
          })
        );
      })
      .then(async () => {
        await dispatch(
          editAcceptRequest({
            projectId: request.projectId,
            freelancerId: request.freelancerId,
            status: "ACCEPTED",
          })
        );
      })
      .then( async () => {

        dispatch(fetchSingleRequestAsync(request.requestId))
        .then(()=>{
           dispatch(fetchSingleRequestAsync(requestId))
           
             
       });
     
        // dispatch(fetchClientRequests(request.projectId)).then(() => {
        //   // navigate(`/projects/${projectId}`)
        //   dispatch(fetchClientRequests(request.projectId))
        // //   window.location.reload();
        // });
      });
  };
  const handleUnassignUser = async (id) => {
    await dispatch(
      editAssignFreelancer({
        projectId: request.projectId,
        freelancerId: null,
        status: "Pending",
      })
    )
      .then(() => {
        dispatch(
          editAcceptRequest({
            projectId: request.projectId,
            freelancerId: request.freelancerId,
            status: "PENDING",
          })
        );
      })
      .then(async () => {
        dispatch(
          await editAcceptRequest({
            projectId: request.projectId,
            freelancerId: id,
            status: "PENDING",
          })
        );
      })
      .then(async () => {
        dispatch(fetchSingleRequestAsync(request.requestId))
         .then(()=>{
            dispatch(fetchSingleRequestAsync(requestId))
            
              
        });
        // dispatch(fetchClientRequests(request.projectId));
      });
  };





// const handleRead = async (info) => {
//     console.log("SEEN CLIENT: ", info.projectId, !info.seenClient, info.freelancerId);
//     await dispatch(
//       editAcceptRequest({
//         projectId: info.projectId,
//         seenClient: !info.seenClient,
//         freelancerId: info.freelancerId,
//       })
//     ).then( async () => {

//         // dispatch(fetchSingleRequestAsync(request.requestId))
        
//         dispatch(fetchSingleRequestAsync(request.requestId))
//         .then(()=>{
//             dispatch(fetchClientRequests(request.projectId))
              
//         });
  
     
//     });
//   };
console.log("THIS REQUEST: ", request)



  return (
    <Card>
                    <CardContent>
                     {request && request.projectId ? <Link to={`/projects/${request.projectId}/requests`}> <Button> Back to proposals</Button></Link> : null}

                       
                      <h3> Project Request: </h3>
                      {/* <h4 style={{ display: "inline", right: "0px" }}>
                        Unread
                        
                    { request ?   <Switch
                          checked={request.seenClient}
                          onChange={() =>

                            handleRead({
                                projectId: request.projectId,
                                seenClient: request.seenClient,
                                freelancerId: request.freelancerId
                          })
                          }
                          color="primary"
                        >
                          Read
                        </Switch>: null }
                        Read
                      </h4> */}
                  {request && request.freelancer ?  <li >
                        <p>Proposal Status: {request.status}</p>
                       <p>
                          From Freelancer:{" "}
                          <Link to={`/freelancers/${request.freelancer.id}`}>
                            {" "}
                            {request.freelancer.firstName}{" "}
                            {request.freelancer.lastName}
                          </Link>
                        </p>
                       
                      <Typography gutterBottom variant="h5" component="div">
                         Proposal:  {request.requestMessage}
                        </Typography> 
                      </li>: null }
                     { request && request.freelancer && request.project.freelancerId === null ? (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            handleAssignUser(request.freelancer.id)
                          }
                        >
                          Assign {request.freelancer.firstName}{" "}
                          {request.freelancer.lastName} to Project
                        </Button>
                      ): null}{" "}
                      {request && request.freelancer && request.project.freelancerId === request.freelancerId &&
                      request.project.status !== "Complete" ? (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            handleUnassignUser(request.freelancer.id)
                          }
                        >
                          Unassign {request.freelancer.firstName}{" "}
                          {request.freelancer.lastName} from Project
                        </Button>
                      ) : null}
                    </CardContent>
                  </Card>
  )
}

export default SingleRequest