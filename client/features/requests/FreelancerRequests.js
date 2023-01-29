import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchFreelancerRequests, selectFreelancerRequests} from './FreelancerRequestslice'
import { useParams, Link } from "react-router-dom";

import { fetchSingleFreelancer, selectSingleFreelancer } from "../freelancers/singleFreelancerSlice";

export default function FreelancerRequests (props) {
//hardcoded data 

 const dispatch = useDispatch()
 const requests = useSelector(selectFreelancerRequests)
 const {freelancerId} = useParams()
 const id = useSelector((state) => state.freelancerAuth.me.id)
 const freelancer = useSelector(selectSingleFreelancer)
// console.log("HERE", typeof id, id)
// console.log("HERE>>", typeof freelancerId, freelancerId)
//  console.log("REQUESTS: ", requests)

useEffect(()=>{
    dispatch(fetchSingleFreelancer(id)).then(()=>{
        dispatch(fetchFreelancerRequests(id.toString()))
    })

    
 
}, [])



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
          </li>
          </div>
        )): null}
      </ul>
    </div>
  )
}