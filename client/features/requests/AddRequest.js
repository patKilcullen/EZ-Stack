import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectSingleProject, fetchSingleProjectAsync } from '../projects/singleProjectSlice'
import { postRequestAsync } from './addRequestSlice'
import axios from 'axios'



const AddRequest = () => {
const [requestMessage, setRequestMessage] = useState("")

const {projectId} = useParams()
const dispatch = useDispatch()
const project = useSelector(selectSingleProject)

 const freelancerId = useSelector((state) => state.freelancerAuth.me.id)
 console.log("FREELANCER: ", typeof freelancerId)
 console.log("projectId: ", typeof projectId)
useEffect(()=>{
dispatch(fetchSingleProjectAsync(projectId))
},[dispatch])


const handleSubmit = (e) =>{
e.preventDefault()
      dispatch(postRequestAsync({status: 'PENDING', requestMessage: requestMessage, projectId: Number(projectId), freelancerId: freelancerId }))

        }
  return (
    <div>
        <h1>Submit a proposal to work on:</h1>
        <h2>{ project  ? <Link to={`/projects/${project.singleProject.id}`}>{project.singleProject.description}</Link>:null}</h2>
        <h3>posted by:{ project.singleProject.id  ? <Link to={`/client-profile/${project.singleProject.client.id}`}> {project.singleProject.client.firstName} {project.singleProject.client.lastName}</Link>: null}</h3>
    <form 
    onSubmit={handleSubmit}
    >
        <div>
          <textarea style={{width: 600,height: 600}} type="textarea" name="requestMessage" value={requestMessage} onChange={(e)=> setRequestMessage(e.target.value)}/>
          <button type="submit">Submit Proposal</button>
        </div>
      
        
    </form>
    </div>
  )
}

export default AddRequest