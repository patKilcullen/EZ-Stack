import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { fetchProjectsAsync, selectProjects, fetchProjectsByCategoryAsync  } from "../projects/allProjectsSlice";
import usePagination from "../freelancers/usePagimentation";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import Stack from "@mui/material/Stack";
import { fetchLikedProjectsAsync, likeProjectAsync, selectLikedProjects, unlikeProjectAsync } from "./likedProjectsSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';


const AllProjects = () => {
  const projects = useSelector(selectProjects);
  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id)
  const navigate = useNavigate()

  
  
  const dispatch = useDispatch()

  const likedProjects = []

  const [category, setCategory] = useState('')
  const [render, setRender] = useState(false)

  const liked = useSelector(selectLikedProjects)

  const unlike = async (id) => {
    await dispatch(unlikeProjectAsync(id))
    setRender(!render)
  }

  console.log(liked)

  const learnMore = (id) => {
    navigate(`/projects/${id}`)
  }
  
  useEffect(() => {
    dispatch(fetchProjectsAsync());
    dispatch(fetchLikedProjectsAsync(freelancer))
  }, [dispatch, render] );

  const handleSearch = () =>{
    const cat = category.charAt(0).toUpperCase()
    const newCat = cat + category.slice(1)
    dispatch(fetchProjectsByCategoryAsync(newCat))
  }

  const likeProject = async (id) => {
      await dispatch(
        likeProjectAsync({
          freelancerId: freelancer,
          projectId: id
        })
      );
      setRender(!render);

  };


    ////FOR PAGINATION/////
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
  
    const count = Math.ceil(projects.length / PER_PAGE);
    const _DATA = usePagination(projects, PER_PAGE);
  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };
  
    ///////////////////////

  return (
    <div className="allViewContainer">
      <div className='search'>
      <input className='searchBar' type='text' placeholder='search projects by category' value={category}
       onChange={event => setCategory(event.target.value)} onKeyDown={handleSearch}/>
    </div>
    <Box p="5">
        <List p="10" pt="3" spacing={2}>
    <div className='allList'>
    {liked.map((p) => {
      likedProjects.push(p.project.id)
      return( 
          <div className='card'>
          <Card  sx={{ minWidth: 300, minHeight: 300, backgroundColor:"#F5F5F5", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
          <CardContent>
            <FavoriteIcon></FavoriteIcon>
          <Typography fontFamily={"Playfair Display serif"}  align="center" variant="h5" component="div">
            {p.project.title}
            </Typography>
            <hr></hr>
            <br></br>
            <Typography color='primary'  variant="body1" component="div">
            {p.project.category}
            </Typography>
            <br></br>
            <Typography variant="body2" color='primary'>
            Status: {p.project.status}
            </Typography>
          </CardContent>
          <br></br>
          <br></br>
          <CardActions>
            <Button onClick={() => learnMore(p.project.id)} size="small" fullWidth variant='contained'>Learn More</Button>
          
            <Button onClick={() => unlike(p.id)}>Unlike</Button>
               
          </CardActions>
        </Card>
        </div>
          )})}
        {_DATA.currentData().map((project) => {
          if(!likedProjects.includes(project.id)){
            return(
              <div className='card'>
              <Card  sx={{ minWidth: 300, minHeight: 300, backgroundColor:"#F5F5F5", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
              <CardContent>
                {liked ? liked.map((like) => {
                  if(like.project.id == project.id){
                    return <FavoriteIcon></FavoriteIcon>
                  }
                }) : null}
              <Typography fontFamily={"Playfair Display serif"}  align="center" variant="h5" component="div">
                {project.title}
                </Typography>
                <hr></hr>
                <br></br>
                <Typography color='primary'  variant="body1" component="div">
                {project.category}
                </Typography>
                <br></br>
                <Typography variant="body2" color='primary'>
                Status: {project.status}
                </Typography>
              </CardContent>
              <br></br>
              <br></br>
              <CardActions>
                <Button onClick={() => learnMore(project.id)} size="small" fullWidth variant='contained'>Learn More</Button>
                <Button onClick={() => likeProject(project.id)}>Like Project</Button>
              </CardActions>
            </Card>
            </div>
            )
          }
          })}
      </div> 
      </List>
        <Stack alignItems="center">
          <Pagination
          color='primary'
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </div>
  )
};

export default AllProjects
