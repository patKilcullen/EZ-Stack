import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient, selectClient } from "./clientSlice";

const Client = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const client = useSelector(selectClient);


  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch]);


  return (
    <div className="client-container">
      <div id="client-image">
        <img className="client-image" src={client.imageUrl}></img>
      </div>
      <div id="client-details">
        <h1>
          {client.firstName} {client.lastName}
        </h1>
        <h3>{client.email}</h3>
        <hr></hr>
        <h4>{client.description}</h4>
      </div>
      <div id="client-projects">
        {client.projects && client.projects.length ? (
          client.projects.map((project) => {
            console.log(project);
            return (
              <div
                className="project-container"
                key={project.id}
                style={{ border: "1px solid black", padding: "25px" }}
              >
                <h1>Projects Completed</h1>
                {project.status ===
                  "Complete" ? (
                    <div className="single-complete-project"
                    style={{ border: "1px solid black", padding: "25px" }}
                    >
                        <Link to={`/projects/client/${client.id}`}>
                            <h4>Project Title</h4>
                        </Link>
                    </div>
                  ): null}
              </div>
            );
          })
        ) : (
          <h4>... No projects pending</h4>
        )}
      </div>
    </div>
  );
};

export default Client;
