import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchFreelancerRequests, selectFreelancerRequests, deleteRequestAsync} from './FreelancerRequestSlice'
import { useParams, Link } from "react-router-dom";

import { fetchSingleFreelancer  } from "../freelancers/singleFreelancerSlice";

import axios from 'axios'

export default function FreelancerRequests (props) {
//hardcoded data 

 const dispatch = useDispatch()
 const requests = useSelector(selectFreelancerRequests)
 const {freelancerId} = useParams()
 const id = useSelector((state) => state.freelancerAuth.me.id)


useEffect(()=>{
    dispatch(fetchSingleFreelancer(id)).then(()=>{
        dispatch(fetchFreelancerRequests(id.toString()))
    })

    
 
}, [])

// const handleDeleteRequest = (projectId)=>{
//   dispatch(deleteRequestAsync({projectId: projectId, freelancerId: id})).then(()=>{
//     dispatch(fetchFreelancerRequests(id.toString()))
//   })
// }

const handleDeleteRequest = async (projectId)=>{
  await axios.delete(`/api/requests/${projectId}/${freelancerId}`)
  .then(()=>{
    dispatch(fetchFreelancerRequests(id.toString()))
  })
}

  return (
<div>
      <ul>
        <h2>Your Requests</h2>
        {id.toString() === freelancerId ? requests.map((request) => (
          <div key={request.id}>
          <li >
            <h3>Project: <Link to={`/projects/${request.project.id}`}>{request.project.description}</Link> </h3>
            <p>Request Status: {request.status}</p>
              <p>Your Request Message: {request.requestMessage}</p>
              <button onClick={()=> handleDeleteRequest(request.project.id)}>Remove this request/proposale</button>
          </li>
          </div>
        )): null}
      </ul>
    </div>
  )
}