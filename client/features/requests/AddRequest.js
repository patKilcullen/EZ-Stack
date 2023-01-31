// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import {
//   selectSingleProject,
//   fetchSingleProjectAsync,
// } from "../projects/singleProjectSlice";
// import { postRequestAsync } from "./freelancerRequestSlice";
// import { fetchFreelancerRequests } from "./freelancerRequestSlice";
// import axios from "axios";

// const AddRequest = () => {
//   const [requestMessage, setRequestMessage] = useState("");
//   const [error, setError] = useState("")

//   const { projectId } = useParams();
//   const dispatch = useDispatch();
//   const project = useSelector(selectSingleProject);
//   const navigate = useNavigate();

//   const freelancerId = useSelector((state) => state.freelancerAuth.me.id);
//   useEffect( () => {
//     dispatch(fetchSingleProjectAsync(projectId));
//   }, [dispatch]);


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(`/api/requests/`, {
//         status: "PENDING",
//         requestMessage: requestMessage,
//         projectId: Number(projectId),
//         freelancerId: freelancerId,
//       })
//     .then(() => {
//       navigate(`/freelancer/${freelancerId}/requests`);
//     });
//   };



//   return (
//     <div>
//         <h1>{error}</h1>
//       <h1>Submit a proposal to work on:</h1>
//       <h2>
//         {project ? (
//           <Link to={`/projects/${project.singleProject.id}`}>
//             {project.singleProject.description}
//           </Link>
//         ) : null}
//       </h2>
//       <h3>
//         posted by:
//         {project.singleProject.id ? (
//           <Link to={`/client-profile/${project.singleProject.client.id}`}>
//             {" "}
//             {project.singleProject.client.firstName}{" "}
//             {project.singleProject.client.lastName}
//           </Link>
//         ) : null}
//       </h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <textarea
//             style={{ width: 800, height: 200 }}
//             type="textarea"
//             name="requestMessage"
//             value={requestMessage}
//             onChange={(e) => setRequestMessage(e.target.value)}
//           />
//           <button type="submit">Submit Proposal</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddRequest;


import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  selectSingleProject,
  fetchSingleProjectAsync,
} from "../projects/singleProjectSlice";
import { postRequestAsync } from "./freelancerRequestSlice";
import { fetchFreelancerRequests } from "./freelancerRequestSlice";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";


const AddRequest = () => {
  const [requestMessage, setRequestMessage] = useState("");
  const [characterError, setCharacterError] = useState(false);

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(selectSingleProject);
  const navigate = useNavigate();

  const freelancerId = useSelector((state) => state.freelancerAuth.me.id);
  useEffect(() => {
    dispatch(fetchSingleProjectAsync(projectId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/api/requests/`, {
        status: "PENDING",
        requestMessage: requestMessage,
        projectId: Number(projectId),
        freelancerId: freelancerId,
      })
      .then(() => {
        navigate(`/freelancer/${freelancerId}/requests`);
      });
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 20) {
      setCharacterError(false);
      setRequestMessage(e.target.value);
    } else {
      setCharacterError(true);
    }
  };

  return (
    <Container component="main">
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
        <AddCircleOutlinedIcon />
        <div>
          <Typography component="h1" variant="h3" sx={{ textAlign: "center"}}>Submit a Proposal</Typography>
          <Typography component="h1" variant="h4"sx={{ bgcolor: "primary" }} >
            {" "}
            Project:
            {  project ? (
              <Link to={`/projects/${project.singleProject.id}`}>
                <Typography
                  color="primary"
                  variant="h4"
                  sx={{ display: "inline" }}
                >
                    {project.singleProject.description}
                </Typography>
              </Link>
            ) : null}
          </Typography>
          <Typography variant="h5">
            posted by:
            {project.singleProject.id ? (
              <Link to={`/client-profile/${project.singleProject.client.id}`}>
                <Typography
                  color="secondary"
                  variant="h5"
                  sx={{ display: "inline",}}
                >
                  {" "}
                  {project.singleProject.client.firstName}{" "}
                  {project.singleProject.client.lastName}
                </Typography>
              </Link>
            ) : null}
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <div>
              <TextField
                error={characterError}
                helperText={
                  characterError
                    ? "Character limit exceeded (must be 20 characters or less"
                    : null
                }
                sx={{ backgroundColor: "#f7f4eb" }}
                id="filled-textarea"
                label="Write your proposal here"
                placeholder="Placeholder"
                multiline
                variant="filled"
                name="requestMessage"
                value={requestMessage}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
                color="primary"
              >
                Submit Proposal
              </Button>

              {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem" }}
            color="primary"
          >
            Submit Proposal
          </Button> */}
            </div>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default AddRequest;