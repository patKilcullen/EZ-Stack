import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchAllFreelancers, selectAllFreelancers, fetchFreelancersByCategoryAsync } from './allFreelancersSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



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
    <div className="allViewContainer">
    <div className='search'>
      <input className='searchBar' type='text' placeholder='search freelancers by category' value={category}
       onChange={event => setCategory(event.target.value)} onKeyDown={handleSearch}/>
    </div>
    <div className='allList'>
        {freelancers.map((freelancers) => (
          <div className='card'>
            <Link to={`/freelancers/${freelancers.id}`}>
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={freelancers.imageUrl}
            title="Freelancer"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {freelancers.firstName} {freelancers.lastName} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {freelancers.categories}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        </Link>
        </div>
        ))}
      </div> 
    </div>
  )
}
export default AllFreelancers
