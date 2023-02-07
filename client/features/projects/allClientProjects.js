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
          <div className='card'
          style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}
          >
            <Link to={`/projects/${project.id}`}>
          <Card sx={{ width: 400, height: 400 ,':hover': {boxShadow: 20},}}>
          <CardContent>
          <Typography   variant="h5" component="div">
            {project.title}
            </Typography>
            <Typography color='primary'  variant="h6" component="div">
            category: {project.category}
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <Typography variant="body2" >
            Current Status: {project.status}
            </Typography>

            <Typography  gutterBottom component="div" variant="subtitle1" >
            {project.description} 
            </Typography>

          </CardContent>
          <CardActions>
            <Button fullWidth variant="contained">Go to Project</Button>
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
