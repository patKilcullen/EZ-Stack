import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom"
import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";
import  EditProject  from "../projects/editProjectForm"
import { deleteSingleProjectAsync } from "./allProjectsSlice";
import ClientRequests from "../requests/ClientRequests";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

    dispatch(deleteSingleProjectAsync(projectId)).then(()=>navigate('/home')) 
  };

  
  const handleCheckForProposal = async ()=>{
    const request = await axios.get(`/api/requests/${projectId}/${freelancer.id}`)
    console.log("REQUEST: ", request)
    request.data[0] ? 
    setError("You already sent a proposal to this project")
    : navigate(`/projects/${projectId}/addrequest`)
  }


  return (
    <div className="singleView">
      <div className="card">
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
          <Typography  variant="h6" component="div">
            {project.singleProject.description}
            </Typography>
            <Typography  variant="h5" component="div">
            {project.singleProject.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {project.singleProject.status}
            </Typography>
          </CardContent>
          { client === project.singleProject.clientId ? (
          <CardActions>
            <Button onClick={() => handleDelete(project.singleProject.id)} size="small">Delete Project</Button>
          </CardActions> ): null }
        </Card>
        {clientIsLoggedIn || freelancerIsLoggedIn ? (
        <div className='editForm'>
          <EditProject projectId={projectId} projectClientId={project.singleProject.clientId} projectFreelancerId={project.singleProject.freelancerId} />
        </div>
        ): null}

        { client === project.singleProject.clientId ? <ClientRequests clientId={client} projectClientId={project.singleProject.clientId} freelancerId={project.singleProject.freelancerId} projectId={project.singleProject.id}/> : null}
       {freelancerIsLoggedIn ? <button onClick={()=>handleCheckForProposal()}>Submit a Proposal</button>: null}
        <h1>{error}</h1>
        </div>
    </div>
  )
};

export default SingleProject
