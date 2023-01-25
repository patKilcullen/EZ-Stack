import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";



const SingleProject = () => {
  const project = useSelector(selectSingleProject);
  console.log("PROJECT: ", project)
  
  const  { projectId }  = useParams()

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchSingleProjectAsync(projectId));
    console.log("USE EFFECT ", project)
  }, [dispatch]);

  return (
    <div id="allProjects">
        <p>{project.singleProject.status}</p>
        <p>{project.singleProject.description}</p>
        <p>{project.singleProject.category}</p>
    </div>
  )
};

export default SingleProject
