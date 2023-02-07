import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { editSingleProject, fetchSingleProjectAsync, selectSingleProject } from "./singleProjectSlice";
import Button from "@mui/material/Button";

const ReviewWork = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const client = useSelector((state) => state.clientAuth.clientMe.id);
  const navigate = useNavigate()
  const project = useSelector(selectSingleProject)
  console.log(project)

  const accept = async () => {
    await dispatch(editSingleProject({id, status: 'Complete'}))
    navigate(`/projects/${id}`)
  }

  const reject = async () => {
    await dispatch(editSingleProject({id, work: null}))
    navigate(`/messages/${project.singleProject.freelancerId}`)
  }

useEffect(() => {
  dispatch(fetchSingleProjectAsync(id))
}, [dispatch])

if(client === project.singleProject.clientId){
  return(
    <>
      <h3>Submitted Work for Review:</h3>
      <p>{project.singleProject.work}</p>
      <Button onClick={accept}>Accept Work and Complete Project</Button>
      <Button onClick={reject}>Reject Work And Message Freelancer</Button>
    </>
  )
}
}

export default ReviewWork
