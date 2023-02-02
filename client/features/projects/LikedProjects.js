import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FreelancerRequests from "../requests/FreelancerRequests";
import { fetchLikedProjectsAsync, selectLikedProjects, unlikeProjectAsync } from "./likedProjectsSlice";




const LikedProjects = () => {
  const likes = useSelector(selectLikedProjects);
  const [render, setRender] = useState(false)
  const navigate = useNavigate()

console.log(likes[0])
  
  const dispatch = useDispatch()

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  
  const unlike = async (id) => {
    await dispatch(unlikeProjectAsync(id))
    setRender(!render)
  }

  const learnMore = (id) => {
    navigate(`/projects/${id}`)
  }
  
  useEffect(() => {
    dispatch(fetchLikedProjectsAsync(freelancer));
  }, [dispatch, render] );
  

  return (
    <div className="allViewContainer">
    <div className='allList'>

        {likes.map((like) => (

          <div className='card'>
          <Card sx={{ maxWidth: 345 }}>
          <CardContent>
          <Typography  variant="h5" component="div">
            {like.project.title}
            </Typography>
            <Typography  variant="h5" component="div">
            {like.project.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {like.project.status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => learnMore(like.project.id)} size="small">Learn More</Button>
            <Button onClick={() => unlike(like.id)} type="small">Unlike</Button>
          </CardActions>
        </Card>
        
        </div>
        ))}
      </div> 
    </div>
  )
};

export default LikedProjects
