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
        <h1>{client.firstName} {client.lastName}</h1>
        <h3>{client.email}</h3>
        <hr></hr>
        <h4>{client.description}</h4>
      </div>
    </div>
  );
};

export default Client;
