import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const PageNotFound = () => {
  return (
    <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "left", alignItems: "center"}}>
      <h1>SORRY PAGE NOT FOUND</h1>

      <Button variant="contained" color="primary">
        <Link to="/"> HOME </Link>
      </Button>
    </div>
  );
};

export default PageNotFound;