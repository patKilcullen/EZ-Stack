import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { fetchProjectsByClientAsync, selectProjects  } from "../projects/allProjectsSlice";
import EditProject from "./editProjectForm";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const AllClientProjects = () => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch()
  
  const client = useSelector((state) => state.clientAuth.clientMe.id)

  
  
  useEffect(() => {
    dispatch(fetchProjectsByClientAsync(client));
  }, [dispatch] );

  return (
    <div className="allViewContainer">
    <div className='allList'>
        {projects.map((project) => (
          <div className='card'>
            <Link to={`/projects/${project.id}`}>
          <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography  variant="h5" component="div">
            {project.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {project.status}
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
};

export default AllClientProjects
