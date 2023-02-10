import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { editSingleProject, fetchSingleProjectAsync, selectSingleProject } from "./singleProjectSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

const ReviewWork = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const client = useSelector((state) => state.clientAuth.clientMe.id);
  const freelancer = useSelector((state) => state.freelancerAuth.me.id);
  const navigate = useNavigate()
  const project = useSelector(selectSingleProject)
  console.log(project)

  const accept = async () => {
    await dispatch(editSingleProject({id, status: 'Complete', rejectedWork: null}))
    navigate(`/projects/${id}`)
  }

  const reject = async () => {
    await dispatch(editSingleProject({id, work: null, comment: null, rejectedWork: project.singleProject.work}))
    navigate(`/messages/${project.singleProject.freelancerId}`)
  }
  const message = async () => {
    // await dispatch(editSingleProject({id, work: null}))
    navigate(`/messages/${project.singleProject.clientId}`)
  }
  const submitNewWork = async () => {
    // await dispatch(editSingleProject({id, work: null}))
    navigate(`/submit/${project.singleProject.id}`)
  }

useEffect(() => {
  dispatch(fetchSingleProjectAsync(id))
}, [dispatch])

if( project.singleProject.clientId && client === project.singleProject.clientId){
  return(
    <>
      {/* <h3>Submitted Work for Review:</h3>
      <p>{project.singleProject.work}</p>
      <Button onClick={accept}>Accept Work and Complete Project</Button>
      <Button onClick={reject}>Reject Work And Message Freelancer</Button> */}
         <Container component="main">
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          width: 600,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:"#F5F5F5",
        padding:"1em 1em",
        borderRadius: "4px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
        }}
        noValidate
        autoComplete="off"
      >
        
        <div>
          <Typography color='primary' component="h1" 
          variant="h4" sx={{ textAlign: "center"}}>
            Submitted Work
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>



          <Box cosx={{ mt: 3 }}>
            <div
            style={{display:"flex", flexDirection:"column", width:600, alignItems:'center'}}
            >
              <a href={project.singleProject.work}>{project.singleProject.work}</a>
              <p>{project.singleProject.comment}</p>
             <div
             style={{display:"flex", flexDirection:"row", width:600, alignItems:'center', justifyContent:'center', gap:'.5rem'}}
             >
              <Button
                onClick={accept}
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "50px", fontSize: "1rem"}}
                color="primary"
              >
                Accept Work and Complete Project
              </Button>
              <Button
              onClick={reject}
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "50px", fontSize: "1rem" }}
                color="primary"
              >
                Reject Work And Message Freelancer
              </Button>
              </div>
            </div>
          </Box>
        </div>
      </Box>




{project.singleProject.rejectedWork ? 
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          width: 600,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:"#F5F5F5",
        padding:"1em 1em",
        borderRadius: "4px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
        }}
        noValidate
        autoComplete="off"
      >
        
        <div>
          <Typography color='primary' component="h1" 
          variant="h4" sx={{ textAlign: "center"}}>
            Rejected Work
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>

          <Box cosx={{ mt: 3 }}>
            <div
            style={{display:"flex", flexDirection:"column", width:600, alignItems:'center'}}
            >
              <p>{project.singleProject.rejectedWork}</p>
             <div
             style={{display:"flex", flexDirection:"row", width:600, alignItems:'center', justifyContent:'center', gap:'.5rem'}}
             >
      
              
              </div>
            </div>
          </Box>
        </div>
      </Box>
      :null}
    </Container>
      
    </>
  )
}


if( project.singleProject.freelancerId && freelancer === project.singleProject.freelancerId){
  return(
    <>
      {/* <h3>Submitted Work for Review:</h3>
      <p>{project.singleProject.work}</p>
      <Button onClick={accept}>Accept Work and Complete Project</Button>
      <Button onClick={reject}>Reject Work And Message Freelancer</Button> */}
         <Container component="main">
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          width: 600,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:"#F5F5F5",
        padding:"1em 1em",
        borderRadius: "4px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
        }}
        noValidate
        autoComplete="off"
      >
        
        <div>
          <Typography color='primary' component="h1" 
          variant="h4" sx={{ textAlign: "center"}}>
            Rejected Work
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>



          <Box cosx={{ mt: 3 }}>
            <div
            style={{display:"flex", flexDirection:"column", width:600, alignItems:'center'}}
            >
              <p>{project.singleProject.rejectedWork}</p>
             <div
             style={{display:"flex", flexDirection:"row", width:600, alignItems:'center', justifyContent:'center', gap:'.5rem'}}
             >
              
              <Button
              onClick={message}
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "50px", fontSize: "1rem" }}
                color="primary"
              >
                View Message From Client
              </Button>

              <Button
              onClick={submitNewWork}
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "50px", fontSize: "1rem" }}
                color="primary"
              >
                Submit New Work
              </Button>
              </div>
            </div>
          </Box>
        </div>
      </Box>


      {project.singleProject.work ? 
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          width: 600,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:"#F5F5F5",
        padding:"1em 1em",
        borderRadius: "4px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
        }}
        noValidate
        autoComplete="off"
      >
        
        <div>
          <Typography color='primary' component="h1" 
          variant="h4" sx={{ textAlign: "center"}}>
            Pending Submitted Work
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>

          <Box cosx={{ mt: 3 }}>
            <div
            style={{display:"flex", flexDirection:"column", width:600, alignItems:'center'}}
            >
              <p>{project.singleProject.work}</p>
             <div
             style={{display:"flex", flexDirection:"row", width:600, alignItems:'center', justifyContent:'center', gap:'.5rem'}}
             >
      
              
              </div>
            </div>
          </Box>
        </div>
      </Box>
      :null}
    </Container>
    </>
  )
}
}

export default ReviewWork
