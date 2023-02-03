import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { fetchProjectsByFreelancerAsync, selectProjects  } from "../projects/allProjectsSlice";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FreelancerRequests from "../requests/FreelancerRequests";




const AllFreelancerProjects = () => {
  const projects = useSelector(selectProjects);

  console.log("ALL PROJECT: ", projects)
  
  const dispatch = useDispatch()

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  
  
  useEffect(() => {
    dispatch(fetchProjectsByFreelancerAsync(freelancer));
  }, [dispatch] );

  return (
    <div className="allViewContainer">
    <div className='allList'>
        {projects.map((project) => (
          <div className='card'
          style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}
          >
            <Link to={`/projects/${project.id}`}>
          <Card sx={{ minWidth: 400, minHeight: 400, display: "flex",flexDirection: "column", justifyContent: "center", alignItems:"center"  }}>
          <CardContent>
          <Typography variant="h5" component="div">
            {project.title}
            </Typography>
            <Typography color='primary'  variant="h6" component="div">
            category: {project.category}
            </Typography>
            <Typography variant="body2" >
            Current Status: {project.status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">Learn More</Button>
          </CardActions>
        </Card>
        </Link>
        <FreelancerRequests />
        </div>
        ))}
      </div> 
    </div>
  )
};

export default AllFreelancerProjects
