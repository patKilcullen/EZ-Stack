import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchClient, selectClient } from "../client/clientSlice";
import AllClientProjects from "../projects/allClientProjects";

const ClientProfile = () => {
  const dispatch = useDispatch()
  const id  = useSelector((state) => state.clientAuth.clientMe.id)
 const client = useSelector(selectClient)
 console.log(client)

  useEffect(() => {
    dispatch(fetchClient(id))
  }, [dispatch])

return(
  <>
  <h1>{client.username}'s Profile</h1>
  <Link to={'/profile/update'}>Edit Profile</Link>
  <ul>
    <li>{client.email}</li>
    <li>{client.firstName} {client.lastName}</li>
    {client.imageUrl ? 
    <li><img src={client.imageUrl} /></li> : 
    <li>No Image - <Link to={'/profile/update'}>Edit Profile</Link></li>}
    {client.description ? 
    <li>{client.description}</li> :
     <li>No Description - <Link to={'/profile/update'}>Edit Profile</Link></li>}
    {client.rating ? 
    <li>Rating: {client.rating} </li> : 
    <li>No Ratings Yet!</li>}
  </ul>

  <h1>Projects</h1>
  <ul>
    {client.projects ?  <AllClientProjects id={client.id} /> : null}
  </ul>
  </>
)
}

export default ClientProfile
