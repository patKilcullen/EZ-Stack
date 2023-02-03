import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchFreelancerRequests, selectFreelancerRequests, deleteRequestAsync} from './freelancerRequestSlice'
import { useParams, Link } from "react-router-dom";

import { fetchSingleFreelancer  } from "../freelancers/singleFreelancerSlice";

import axios from 'axios'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function FreelancerRequests (props) {
//hardcoded data 

 const dispatch = useDispatch()
 const requests = useSelector(selectFreelancerRequests)
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
  await axios.delete(`/api/requests/${projectId}/${id}`)
  .then(()=>{
    dispatch(fetchFreelancerRequests(id.toString()))
  })
}

  return (
<div id='freelancerRequests'>
      <ul>
        
        {id.toString() ? requests.map((request) => (
          <div key={request.id}>
            <Card sx={{ maxWidth: 345, marginLeft: -5 }}>
          <li >
            
            <Typography> Project id: {request.projectId}</Typography>
              <Button onClick={()=> handleDeleteRequest(request.project.id)}>Remove this request/proposal</Button>
          </li>
          </Card>
          </div>
        )): null}
      </ul>
    </div>
  )
}