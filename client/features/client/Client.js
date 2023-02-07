import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient, selectClient } from "./clientSlice";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

const Client = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const client = useSelector(selectClient);
  console.log(client)
  const clientProjects = client.projects;
  console.log("clientProjects:", clientProjects)

  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch]);


  return (
    <Box
    sx={{
      marginTop: 3,
      marginBottom: 3,
      width: 800,
      maxHeight: 600,
      display: "flex",
      flexDirection: "row",
      overflow:"auto",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor:"#F5F5F5",
      borderRadius: "4px"
    }}
    >
    <div className="card">
      <Card 
      sx={{
        maxWidth: 280,
        margin: "0 auto",
        padding: "1em",
      }}
      >
        <CardMedia
          component="img"
          height="250"
          sx={{ objectFit: "contain" }}
          image={client.imageUrl}
          title="client"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Full Name: {client.firstName} {client.lastName}
          </Typography>
      <hr
      style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
      ></hr>
            <Typography variant="body2" color="text.secondary">
              {client.email}
            </Typography>
            <br></br>

            <Typography variant="body2" color="text.secondary">
              Description: {client.description}
            </Typography>
          
        </CardContent>
      </Card>
    </div>

    <div 
    style={{backgroundColor: "#F5F5F5", borderRadius: "4px", marginRight: 15,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",  }}
    >
    {clientProjects?.map((project) => (
              <div
              key={project.id}
              style={{ margin:"100px 100px", }} >
            <Link to={`/projects/${project.id}`}>
          <Typography   variant="h6" >
            {project.title}
            </Typography>
            <Typography color='primary'  variant="body2" >
            category: {project.category}
            </Typography>
            <Typography variant="body2" color="primary">
                  Status: {project.status}
                </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <Button fullWidth variant="contained">Go to Project</Button>
        </Link>
        </div>
        ))}
    </div>


  </Box>


    // <div 
    // style={{display:"flex", flexDirection: "column"}}
    // >
    //     <div className='card'>
    //       <Card sx={{ maxWidth: 500, maxHeight: 450, minHeight: 500, marginTop: 3, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", }}>
    //       <CardMedia
    //         component="img"
    //         height="250"
    //         sx={{ objectFit: "contain", marginTop: 2 }}
    //         image={client.imageUrl}
    //         title="freelancer"
    //       />
    //       <CardContent>
    //         <Typography gutterBottom variant="h5" component="div" align='center'>
    //         {client.firstName} {client.lastName} 
    //         </Typography>

    //        <Typography  gutterBottom component="div" variant="subtitle1" align='center'>
    //         {client.email} 
    //         </Typography>

    //         <Typography color='primary' variant="body2" align='center' >
    //         {client.description}
    //         </Typography>
    //       </CardContent>
    //     </Card>        
    //     </div>

    //     {clientProjects?.map((project) => (
    //           <div
    //           style={{backgroundColor:"lightgray"}}>
    //         <Link to={`/projects/${project.id}`}>
    //       <Typography   variant="body2" >
    //         {project.title}
    //         </Typography>
    //         <Typography color='primary'  variant="body2" >
    //         category: {project.category}
    //         </Typography>
    //         <hr></hr>
    //         <Button fullWidth variant="contained">Go to Project</Button>
    //     </Link>
    //     </div>
    //     ))}
    // </div>
  
    // <div className="client-container">
    //   <div id="client-image">
    //     <img className="client-image" src={client.imageUrl}></img>
    //   </div>
    //   <div id="client-details">
    //     <h1>
    //       {client.firstName} {client.lastName}
    //     </h1>
    //     <h3>{client.email}</h3>
    //     <hr></hr>
    //     <h4>{client.description}</h4>
    //   </div>
    //   <div id="client-projects">
    //     {client.projects && client.projects.length ? (
    //       client.projects.map((project) => {
    //         console.log(project);
    //         return (
    //           <div
    //             className="project-container"
    //             key={project.id}
    //             style={{ border: "1px solid black", padding: "25px" }}
    //           >
    //             <h1>Projects Completed</h1>
    //             {project.status ===
    //               "Complete" ? (
    //                 <div className="single-complete-project"
    //                 style={{ border: "1px solid black", padding: "25px" }}
    //                 >
    //                     <Link to={`/projects/client/${client.id}`}>
    //                         <h4>Project Title</h4>
    //                     </Link>
    //                 </div>
    //               ): null}
    //           </div>
    //         );
    //       })
    //     ) : (
    //       <h4>... No projects pending</h4>
    //     )}
    //   </div>
    // </div>
  );
};

export default Client;
