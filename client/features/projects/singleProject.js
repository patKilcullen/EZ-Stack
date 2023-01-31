import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom"
import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";
import  EditProject  from "../projects/editProjectForm"
import { deleteSingleProjectAsync } from "./allProjectsSlice";
import ClientRequests from "../requests/ClientRequests";
import axios from "axios";



const SingleProject = () => {
const [error, setError] = useState("")
const navigate = useNavigate()

  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  const client = useSelector((state) => state.clientAuth.clientMe.id)
  const c = useSelector((state) => state.clientAuth.clientMe)

  const freelancer = useSelector((state) => state.freelancerAuth.me)
  console.log("FREELANCER: ", freelancer)
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

  const handleCheckForProposal = async ()=>{
    const request = await axios.get(`/api/requests/${projectId}/${freelancer.id}`)
    console.log("REQUEST: ", request)
    request.data[0] ? 
    setError("You already sent a proposal to this project")
    : navigate(`/projects/${projectId}/addrequest`)
  }

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
        { clientIsLoggedIn && client ? <ClientRequests clientId={client} projectClientId={project.singleProject.clientId} freelancerId={project.singleProject.freelancerId} projectId={project.singleProject.id}/> : null}
        {/* { clientIsLoggedIn && client ? <ClientRequests clientId={client} project={project} freelancerId={project.singleProject.freelancerId}/> : null} */}
       {/* {freelancerIsLoggedIn ? <p><Link to={`/projects/${project.singleProject.id}/addrequest`}>Send a proposal to work on this project.</Link></p>: null} */}
       {freelancerIsLoggedIn ? <button onClick={()=>handleCheckForProposal()}>Submit a Proposal</button>: null}
        <h1>{error}</h1>
    </div>
  )
};

export default SingleProject
