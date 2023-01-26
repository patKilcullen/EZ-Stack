import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";
import  EditProject  from "../projects/editProjectForm"



const SingleProject = () => {

  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.me.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  
  const project = useSelector(selectSingleProject);
  
  const  { projectId }  = useParams()

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchSingleProjectAsync(projectId));
  }, [dispatch]);

  return (
    <div id="allProjects">
        <p>{project.singleProject.status}</p>
        <p>{project.singleProject.description}</p>
        <p>{project.singleProject.category}</p>
        {clientIsLoggedIn || freelancerIsLoggedIn ? (
        <div id='editForm'>
          <EditProject projectId={projectId} />
        </div>
        ): null}
    </div>
  )
};

export default SingleProject
