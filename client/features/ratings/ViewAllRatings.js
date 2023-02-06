import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchRatingsByFreelancerAsync, selectRatings } from './ViewAllSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



 const ViewAllRatings = () => {
    const dispatch = useDispatch()
    const ratings = useSelector(selectRatings)



    const id = useSelector((state) => state.freelancerAuth.me.id)

useEffect(()=>{
    dispatch(fetchRatingsByFreelancerAsync(id))
},[dispatch])

  return (
    <div className="allViewContainer">
    {ratings.map((rating) => (
          <div>
            <p>{rating.rating}</p>
            <p>{rating.review}</p>
        </div>
        ))}
  </div>
  )}


export default ViewAllRatings