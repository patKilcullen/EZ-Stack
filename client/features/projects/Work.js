import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchSingleProjectAsync, selectSingleProject } from "./singleProjectSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";


const Work = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const freelancer = useSelector((state) => state.freelancerAuth.me);
  const client = useSelector((state) => state.clientAuth.clientMe.id);
  const project = useSelector(selectSingleProject)


  useEffect(() => {
    dispatch(fetchSingleProjectAsync(id))
  }, [dispatch])

if(project.singleProject.freelancerId === freelancer.id || project.singleProject.clientId === client){
  return(
    <>
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
        {project.singleProject.work ?
        <>
          <Typography color='primary' component="h1" 
          variant="h4" sx={{ textAlign: "center"}}>
            <Link className="projectTitleWork" to={`/projects/${project.singleProject.id}`}>{project.singleProject.title}</Link>'s Work
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>

          <Box cosx={{ mt: 3 }}>
            <div
            style={{display:"flex", flexDirection:"column", width:600, alignItems:'center'}}
            >
              <a href={`${project.singleProject.work}`}>{project.singleProject.work}</a>

            </div>
          </Box> 
          <Box cosx={{ mt: 3 }}>
            <div
            style={{display:"flex", flexDirection:"column", width:600, alignItems:'center'}}
            >
              <p>{project.singleProject.comment}</p>

            </div>
          </Box> 
          </>
          :  <>
          <Typography color='primary' component="h1" 
          variant="h4" sx={{ textAlign: "center"}}>
           {project.singleProject.title}'s Work
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>

          <Box cosx={{ mt: 3 }}>
            <div
            style={{display:"flex", flexDirection:"column", width:600, alignItems:'center'}}
            >
              <p>No Work Currently Submitted</p>

            </div>
          </Box> 
          </>}
        </div>
      </Box>
    </Container>
    </>
  )
}else{
  return(
    <h1>No permission to view this projects work.</h1>
  )
}
}

export default Work
