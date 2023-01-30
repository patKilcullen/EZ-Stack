import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { fetchSingleFreelancer, selectSingleFreelancer } from './singleFreelancerSlice';


const SingleFreelancer = () => {
const dispatch = useDispatch()
const {id} = useParams()


const freelancer = useSelector(selectSingleFreelancer)

useEffect(()=>{
dispatch(fetchSingleFreelancer(id))
},[dispatch])

  return (
    <div>
        <p>{freelancer.firstName} {freelancer.lastName}</p>
        <p>{freelancer.imageUrl}</p>
        <p>{freelancer.categories}</p>
    </div>
  )
}

export default SingleFreelancer