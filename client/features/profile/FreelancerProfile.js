import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleFreelancer, selectSingleFreelancer } from "../freelancers/singleFreelancerSlice";

const FreelancerProfile = () => {
  const dispatch = useDispatch()
  const id = useSelector((state) => state.freelancerAuth.me.id)
  const freelancer = useSelector(selectSingleFreelancer)


  useEffect(() => {
    dispatch(fetchSingleFreelancer(id))
  }, [dispatch])

  return(
    <>
    <h1>{freelancer.username}'s Profile</h1>
    <Link to={'/profile/update'}>Edit Profile</Link>
    <ul>
      <li>{freelancer.email}</li>
      <li>{freelancer.firstName} {freelancer.lastName}</li>
      {freelancer.imageUrl ? 
      <li><img src={freelancer.imageUrl} /></li> : 
      <li>No Image - <Link to={'/profile/update'}>Edit Profile</Link></li>}
      {freelancer.description ? 
      <li>{freelancer.description}</li> :
       <li>No Description - <Link to={'/profile/update'}>Edit Profile</Link></li>}
      {freelancer.rating ? 
      <li>Rating: {freelancer.rating} </li> : 
      <li>No Ratings Yet!</li>}
      {freelancer.categories ?
      <li>{freelancer.categories}</li> : 
      <li>No Categories - <Link to={'/profile/update'}>Edit Profile</Link></li>}
    </ul>
    </>
  )
}

export default FreelancerProfile
