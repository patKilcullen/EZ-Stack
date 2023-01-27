import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchAllFreelancers, selectAllFreelancers } from './allFreelancersSlice'


export const AllFreelancers = () => {
    const dispatch = useDispatch()
    const freelancers = useSelector(selectAllFreelancers)

useEffect(()=>{
    dispatch(fetchAllFreelancers())
},[dispatch])



  return (
    <div className="all-freelancers">AllFreelancers
<ul>
        {freelancers.map((freelancers) => (
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
