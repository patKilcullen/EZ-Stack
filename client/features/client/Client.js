import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient, selectClient } from "./clientSlice";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Client = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const client = useSelector(selectClient);
  console.log(client);
  // const clientProjects = client.projects;
  // console.log("clientProjects:", clientProjects);

  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        marginTop: 26,
      }}
    >
        <Card
          sx={{
            width: 400,
            height: 500,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            margin: "0 100px",
            padding: "1em",
            ":hover": { boxShadow: 20 },
            
          }}
        >
          <CardMedia
            component="img"
            height="250"
            sx={{ objectFit: "contain" }}
            image={client.imageUrl}
            title="client"
          />
          <CardContent align="center">
            <Typography  gutterBottom variant="h5" component="div">
              {client.firstName} {client.lastName}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              {client.email}
            </Typography>
            <hr
              style={{
                border: "none",
                height: "1px",
                color: "#333",
                backgroundColor: "#333",
              }}
            ></hr>
            <br></br>

            <Typography variant="body1" component="div" color="text.secondary">
              {client.description}
            </Typography>
          </CardContent>
        </Card>
      

      <div
        style={{
          width: 600,
          height:500,
          // margin: "100px 100px",
          // padding: "1em",
          alignContent:"center",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          overflow:"auto",
        }}
      >
        <Typography color="primary" align="center" component="div" margin="50px" variant="h5">
            Projects
          </Typography>


        {client.projects? client.projects.map((project) => (
          <div key={project.id} >
            <Card
              sx={{
                align:"center",
                margin: "50px", ":hover": { boxShadow: 20 }, padding:"10px 10px",
                // width:300, height:150, padding:"1rem"
              }}
            >
              <Link to={`/projects/${project.id}`}>
                <Typography align="center"  variant="h6">{project.title}</Typography>
                <Typography align="center"  color="primary" variant="body2">
                  category: {project.category}
                </Typography>
                <Typography align="center" variant="body2" color="secondary">
                  Status: {project.status}
                </Typography>
                <hr
                  style={{
                    border: "none",
                    height: "1px",
                    color: "#333",
                    backgroundColor: "#333",
                  }}
                ></hr>
                <Button fullWidth variant="contained">
                  Go to Project
                </Button>
              </Link>
            </Card>
          </div>
        )):
        <Typography component="div" align="center" variant="h6">
        No Projects Yet!
      </Typography>}
      </div>
    </div>
  );
};

export default Client;
