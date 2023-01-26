import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchClientRequests, selectClientRequests} from './clientRequestSlice'
import { useParams, Link } from "react-router-dom";


export default function ClientRequests () {
//hardcoded data 

 const dispatch = useDispatch()
 const requests = useSelector(selectClientRequests)
 const {projectId} = useParams()
 console.log("ID: ", projectId)

useEffect(()=>{
    dispatch(fetchClientRequests(projectId))
    console.log("HEEELO")
}, [])


 console.log("CLIENT REQUESTS: ", requests )

  return (
<div>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
             <p>You have recieved a request from: <Link to={`/freelancers/${request.freelancer.id}`}> {request.freelancer.firstName} {request.freelancer.lastName}</Link></p>
              <p>{request.requestMessage}</p>
          </li>
        ))}
      </ul>
      Hello
    </div>
  )
}




