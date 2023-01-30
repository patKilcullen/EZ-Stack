import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchAllFreelancers, selectAllFreelancers, fetchFreelancersByCategoryAsync } from './allFreelancersSlice'


 const AllFreelancers = () => {
    const dispatch = useDispatch()
    const freelancers = useSelector(selectAllFreelancers)

    const [category, setCategory] = useState('')

useEffect(()=>{
    dispatch(fetchAllFreelancers())
},[dispatch])

const handleSearch = () =>{
  const cat = category.charAt(0).toUpperCase()
  const newCat = cat + category.slice(1)
  dispatch(fetchFreelancersByCategoryAsync(newCat))
}



  return (
    <div className="all-freelancers">
    <div className='search'>
      <input id='searchBar' type='text' placeholder='search by category' value={category}
       onChange={event => setCategory(event.target.value)} onKeyDown={handleSearch}/>
    </div>
<ul>
        {freelancers.map((freelancers) => (
          <li>
            <Link to={`/freelancers/${freelancers.id}`}>
              <p>{freelancers.firstName} {freelancers.lastName}</p>
              <p>{freelancers.imageUrl}</p>
              <p>{freelancers.categories}</p>
            </Link>
          </li>
        ))}
      </ul>
        
    </div>
  )
}
export default AllFreelancers
