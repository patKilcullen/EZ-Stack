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

console.log(freelancer)

useEffect(()=>{
dispatch(fetchSingleFreelancer(id)).then(()=>{
  dispatch(fetchRatingsByFreelancerAsync(id))
})

},[dispatch])


  return (
    <div className='singleView'>
        <div className='card'>
          <Card sx={{ maxWidth: 600, maxHeight: 700, minHeight: 500, marginTop: 10, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", }}>
          <CardMedia
            component="img"
            height="250"
            sx={{ objectFit: "contain", marginTop: 4 }}
            image={freelancer.imageUrl}
            title="freelancer"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align='center'>
            {freelancer.firstName} {freelancer.lastName} 
            </Typography>
            <hr></hr>
            <Typography color='primary' variant="body2" align='center' >
            {freelancer.categories}
            </Typography>
            
            <Typography  gutterBottom component="div" variant="subtitle1" >
            {freelancer.description} 
            </Typography>
            
          </CardContent>
          <CardActions>
            {clientIsLoggedIn ? <Button  fullWidth onClick={messageButton} size='large'  variant='outlined'>Message</Button> : null}
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
