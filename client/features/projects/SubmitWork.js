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

const SubmitWork = () => {
  const {id} = useParams() 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const freelancer = useSelector((state) => state.freelancerAuth.me);
  const project = useSelector(selectSingleProject)
  console.log(project)

  const formSubmit = async (e) => {
    e.preventDefault()
    const work = e.target.work.value
    const comment = e.target.comment.value
    await dispatch(editSingleProject({id, work, comment}))
    navigate(`/projects/${id}`)
  }


  useEffect(() => {
    dispatch(fetchSingleProjectAsync(id))
  }, [dispatch])

  if(project.singleProject.freelancerId === freelancer.id && !project.singleProject.work){
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <AddCircleOutlinedIcon />
        </Avatar>
        
        <div>
          <Typography color='primary' component="h1" 
          variant="h4" sx={{ textAlign: "center"}}>
            Submit Work
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>
            {  project ? (
              <Link to={`/projects/${project.singleProject.id}`}>
                <Typography
                  variant="h5"
                  sx={{ display: "inline" }}
                >
                  {project.singleProject.title}
                </Typography>
              </Link>
            ) : null}
          <br></br>

          <Box component="form" onSubmit={formSubmit} sx={{ mt: 3 }}>
            <div
            style={{display:"flex", flexDirection:"column", width:600}}
            >
              <TextField
                sx={{ backgroundColor: "#f7f4eb" }}
                id="filled-textarea"
                label="Submit Link Here"
                placeholder="Enter link here"
                multiline
                rows={1}
                variant="filled"
                name="work"
              />
              <TextField
                sx={{ backgroundColor: "#f7f4eb" }}
                id="filled-textarea"
                label="Submit Comment Here"
                placeholder="Enter Comment here"
                multiline
                rows={4}
                variant="filled"
                name="comment"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
                color="primary"
              >
                Submit Work
              </Button>
            </div>
          </Box>
        </div>
      </Box>
    </Container>
    </>
  )
  }

  if(project.singleProject.freelancerId === freelancer.id && project.singleProject.work){
    return(
      <>
        <h1>You already have work submitted for review!</h1>
      </>
    )
  }
  
  if(project.singleProject.freelancerId != freelancer.id){
    return(
      <>
        <h1>You are not authorized to view this page!</h1>
      </>
    )
  }

}

export default SubmitWork
