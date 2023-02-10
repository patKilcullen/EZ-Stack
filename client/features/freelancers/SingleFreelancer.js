import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  fetchSingleFreelancer,
  selectSingleFreelancer,
} from "./singleFreelancerSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  fetchRatingsByFreelancerAsync,
  selectRatings,
} from "../ratings/ViewAllSlice";

const SingleFreelancer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const clientIsLoggedIn = useSelector(
    (state) => !!state.clientAuth.clientMe.id
  );

  const messageButton = () => {
    navigate(`/messages/${freelancer.id}`);
  };

  const freelancer = useSelector(selectSingleFreelancer);
  const reviews = useSelector(selectRatings);
  const freelancerProjects = freelancer.projects;
  console.log(freelancer);
  console.log("REVIEWS:  ", reviews);

  useEffect(() => {
    dispatch(fetchSingleFreelancer(id)).then(() => {
      dispatch(fetchRatingsByFreelancerAsync(id));
    });
  }, [dispatch]);


  return (
    <div className="singleView"
    style={{padding:"10px", }}
    >
      <div
        style={{
          display: "flex",
          marginTop: 10,
          
        }}
      >
        <Card
          sx={{
            width: 500,
             height: 500,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            margin: "0 100px",
          }}
        >
          <CardMedia
            component="img"
            height="150"
            sx={{ objectFit: "contain", marginTop: 4 }}
            image={freelancer.imageUrl}
            title="freelancer"
          />
          <CardContent>
            <Typography variant="h5" align="center">
              {freelancer.firstName} {freelancer.lastName}
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <Typography color="primary" variant="body2">
                {freelancer.ratingAvg === 1 ? (
                  <p>{"★"}</p>
                ) : freelancer.ratingAvg === 2 ? (
                  <p>{"★★"}</p>
                ) : freelancer.ratingAvg === 3 ? (
                  <p>{"★★★"}</p>
                ) : freelancer.ratingAvg === 4 ? (
                  <p>{"★★★★"}</p>
                ) : freelancer.ratingAvg === 5 ? (
                  <p>{"★★★★★"}</p>
                ) : null}
              </Typography>
              <Typography color="primary" variant="body2">
                {freelancer.ratings
                  ? `( ${freelancer.ratings.length} Reviews)`
                  : null}
              </Typography>
            </div>

            <hr
              style={{
                border: "none",
                height: "1px",
                color: "#333",
                backgroundColor: "#333",
              }}
            ></hr>

            <Typography color="primary" variant="body2" align="center">
              {freelancer.category}
            </Typography>

            <Typography variant="body2" color="secondary" align="center">
              Specialties: {freelancer.specialties}
            </Typography>
            <br></br>
            <Typography component="div" variant="body1">
              {freelancer.description}
            </Typography>
          </CardContent>
          <CardActions>
            {clientIsLoggedIn ? (
              <Button
                fullWidth
                onClick={messageButton}
                size="large"
                variant="contained"
              >
                Message
              </Button>
            ) : null}
          </CardActions>
        </Card>

        <div
          style={{
            width: 500,
            alignContent:"center"
          }}
        >
          <Typography color="primary" component="div" align="center" variant="h6">
            Reviews
          </Typography>
          {reviews.length ? reviews.map((rating) => (
            <div key={rating.id} style={{ overflow:"auto"}}>
              <Card sx={{ margin: "50px 50px", ":hover": { boxShadow: 20 }, padding:"10px 10px" }}>
                <Typography variant="body1"  fontWeight="bolder">
                  {rating.freelancer.firstName} {rating.freelancer.lastName}
                </Typography>
                {rating.project ? (
                  <Typography variant="body2" color="primary">
                    Project:
                    <Link to={`/projects/${rating.projectId}`}>
                      {" "}
                      {rating.project.title}
                    </Link>
                  </Typography>
                ) : null}
                <Typography variant="body2" color="primary">
                  {rating.rating === 1 ? (
                    <p>Rating: {"★"}</p>
                  ) : rating.rating === 2 ? (
                    <p>Rating: {"★★"}</p>
                  ) : rating.rating === 3 ? (
                    <p>Rating: {"★★★"}</p>
                  ) : rating.rating === 4 ? (
                    <p>Rating: {"★★★★"}</p>
                  ) : rating.rating === 5 ? (
                    <p>Rating: {"★★★★★"}</p>
                  ) : null}
                </Typography>
                <Typography variant="body2">{rating.review}</Typography>
              </Card>
            </div>
          )): <Typography component="div" align="center" variant="h6">
          No Reviews Yet!
        </Typography>}
        </div>
      </div>
      
    </div>
  );
};

export default SingleFreelancer;

{
  /* {freelancer.projects
          ? freelancer.projects
              .filter((project) => {
                return project.status === "Complete";
              })

              .map((project) => (
                <div>
                  <Card sx={{ width: 500, margin: "10%", marginLeft: 0 }}>
                    <Link to={`/projects/${project.id}`}>
                      <Typography variant="body2" color="primary">
                        {project.title}
                      </Typography>
                    </Link>
                  </Card>
                </div>
              ))
          : null} */
}
