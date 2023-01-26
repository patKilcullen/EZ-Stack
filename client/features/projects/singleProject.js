import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";
import  EditProject  from "../projects/editProjectForm"
import { deleteSingleProjectAsync } from "./allProjectsSlice";



const SingleProject = () => {

  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  const client = useSelector((state) => state.clientAuth.clientMe.id)
  
  const project = useSelector(selectSingleProject);
  
  const  { projectId }  = useParams()

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchSingleProjectAsync(projectId));
  }, [dispatch]);

  const handleDelete = (projectId) => {
    dispatch(deleteSingleProjectAsync(projectId))
    window.location.reload()
      
  };

  return (
    <div id="allProjects">
        <p>{project.singleProject.status}</p>
        <p>{project.singleProject.description}</p>
        <p>{project.singleProject.category}</p>
        {clientIsLoggedIn || freelancerIsLoggedIn ? (
        <div id='editForm'>
          <EditProject projectId={projectId} projectClientId={project.singleProject.clientId} projectFreelancerId={project.singleProject.freelancerId} />
        </div>
        ): null}
        { client === project.singleProject.clientId ? (
          <div id='delete'>
          <button id='deleteProject' onClick={() => handleDelete(project.singleProject.id)}>Delete Project</button>
          </div>
        ): null }
    </div>
  )
};

export default SingleProject
