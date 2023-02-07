import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchSingleProjectAsync, selectSingleProject } from "./singleProjectSlice";

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
      {project.singleProject.work ? 
      <>
      <h1>{project.singleProject.title}'s Work</h1>
      <p>{project.singleProject.work}</p>
      </>
      : <h1>No Work Submitted</h1>}
    </>
  )
}else{
  return(
    <h1>No permission to view this projects work.</h1>
  )
}
}

export default Work
