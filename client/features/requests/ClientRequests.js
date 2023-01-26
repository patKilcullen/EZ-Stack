import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchClientRequests, selectClientRequests} from './clientRequestSlice'
import { useParams } from "react-router-dom";


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
          <li>
            <Link to={`/freelancers/${freelancers.id}`}>
              <p>{freelancers.firstName} {freelancers.lastName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}




