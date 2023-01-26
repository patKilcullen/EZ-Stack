import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ClientProfile = () => {
  const client = useSelector((state) => state.clientAuth.clientMe)
  console.log(client)

return(
  <>
  <h1>{client.username}'s Profile</h1>
  <Link to={'/profile/update'}>Edit Profile</Link>
  <ul>
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
    {client.categories ?
    <li>{client.categories}</li> : 
    <li>No Categories - <Link to={'/profile/update'}>Edit Profile</Link></li>}
  </ul>
  </>
)
}

export default ClientProfile
