import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleFreelancer, selectSingleFreelancer } from './singleFreelancerSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchRatingsByFreelancerAsync, selectRatings } from '../ratings/ViewAllSlice';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

const SingleFreelancer = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
const {id} = useParams()
const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);

const messageButton = () => {
navigate(`/messages/${freelancer.id}`)
}


const freelancer = useSelector(selectSingleFreelancer)
const reviews = useSelector(selectRatings)

console.log("REVIEW ", reviews)

const rating = reviews.map((review)=>review.rating)
const ratingSum = rating.reduce((accumulator, value) =>{
  return accumulator + value;
}, 0)

const ratingAvg = Math.round(ratingSum / rating.length) ;

   
useEffect(()=>{
dispatch(fetchSingleFreelancer(id)).then(()=>{
  dispatch(fetchRatingsByFreelancerAsync(id))  
  })  
},[dispatch])


  return (
    <div className='singleView'>
        <div className='card'>
          <Card sx={{ maxWidth: 600, maxHeight: 700, minHeight: 500, marginTop: 10}}>
          <CardMedia
            sx={{ height: 140 }}
            image={freelancer.imageUrl}
            title="Freelancer"
          />
          <CardContent>
            <Typography color='primary' gutterBottom variant="h5" component="div">
            {freelancer.firstName} {freelancer.lastName} 
            </Typography>
            <Typography color='primary' gutterBottom variant="h5" component="div">
            {freelancer.description} 
            </Typography>
            <Typography color='primary' variant="body2" >
            {freelancer.categories}
            </Typography>
            <Typography color='primary' variant="body2" >
            {ratingAvg === 1 ? (<p>{"★"}</p>) :ratingAvg === 2 ? (<p>{"★★"}</p>):ratingAvg === 3 ? (<p>{"★★★"}</p>) :ratingAvg === 4 ? (<p>{"★★★★"}</p>):ratingAvg === 5 ? (<p>{"★★★★★"}</p>): null}
            </Typography>
            <Typography color='primary' variant="body2" >
            {rating.length} Reviews
            </Typography>
          </CardContent>
          <CardActions>
            {clientIsLoggedIn ? <Button onClick={messageButton} size='small' variant='contained'>Message</Button> : null}
          </CardActions>
        </Card>
          
        {reviews.map((rating) => (
          <div>
             <Card sx={{ width: 500, margin: "10%", marginLeft: 0 }}>
             <Typography color='primary' variant="body2" >
            Review
            </Typography>
          <Typography variant="body2" color='primary'>
            {rating.rating === 1 ? (<p>{"★"}</p>) :rating.rating === 2 ? (<p>{"★★"}</p>):rating.rating === 3 ? (<p>{"★★★"}</p>) :rating.rating === 4 ? (<p>{"★★★★"}</p>):rating.rating === 5 ? (<p>{"★★★★★"}</p>): null}
            </Typography>
            <Typography variant="body2" color='primary'>
            {rating.review}
            </Typography>
            </Card>
          </div>
        ))}
        </div>
    </div>
  )
}

export default SingleFreelancer
