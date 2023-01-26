import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchClientRequests, selectClientRequests, editAssignFreelancer} from './clientRequestSlice'
import { useParams, Link } from "react-router-dom";




export default function ClientRequests () {
//hardcoded data 

 const dispatch = useDispatch()
 const requests = useSelector(selectClientRequests)
 const {projectId} = useParams()
 console.log("ID: ", projectId)

useEffect(()=>{
    dispatch(fetchClientRequests(projectId))
 
}, [])

const handleAssignUser = (id)=>{
dispatch(editAssignFreelancer({projectId: projectId, freelancerId: 69}))
}

  return (
<div>
      <ul>
        {requests.map((request) => (
          <div>
          <li key={request.id}>
             <p>You have recieved a request from: <Link to={`/freelancers/${request.freelancer.id}`}> {request.freelancer.firstName} {request.freelancer.lastName}</Link></p>
              <p>{request.requestMessage}</p>
          </li>
          <button onClick={()=>handleAssignUser(request.freelancer.id)}>Assign {request.freelancer.firstName} {request.freelancer.lastName} to Project</button>
          </div>
        ))}
      </ul>
    </div>
  )
}




