import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllFreelancers,
  selectAllFreelancers,
  sortByCategory,
  selectAllFreelancersByCategory,
  selectAllFreelancersBySpecialties,
  sortBySpecialties,
} from "./allFreelancersSlice";
import usePagination from "./usePaginatation";

// MUI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ManageSearchTwoToneIcon from "@mui/icons-material/ManageSearchTwoTone";

const AllFreelancers = () => {
  const dispatch = useDispatch();
  const freelancers = useSelector(selectAllFreelancers);

  const freelancersByCategory = useSelector(selectAllFreelancersByCategory);
  const freelancersBySpecialties = useSelector(
    selectAllFreelancersBySpecialties
  );
  const [category, setCategory] = useState("");
  const [specialties, setSpecialties] = useState("");

  // Fetch all freelancers when page loads
  useEffect(() => {
    dispatch(fetchAllFreelancers());
  }, [dispatch]);

  const handleCategory = (evt) => {
    evt.preventDefault();
    dispatch(sortByCategory(category));
  };

  const handleSpecialties = (evt) => {
    evt.preventDefault();
    dispatch(sortBySpecialties(specialties));
  };

  ////FOR PAGINATION/////
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(freelancers.length / PER_PAGE);
  const _DATA = usePagination(freelancers, PER_PAGE);
  const countB = Math.ceil(freelancersByCategory.length / PER_PAGE);
  const _DATAB = usePagination(freelancersByCategory, PER_PAGE);
  const countC = Math.ceil(freelancersBySpecialties.length / PER_PAGE);
  const _DATAC = usePagination(freelancersBySpecialties, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleChangeCategory = (e, p) => {
    setPage(p);
    _DATAB.jump(p);
  };
  const handleChangeSpecialties = (e, p) => {
    setPage(p);
    _DATAC.jump(p);
  };

  // if sorted by freelancer specialties, render...
  if (freelancersBySpecialties.length) {
    return (
      <div className="allViewContainer" style={{ marginBottom: "10px" }}>
        <div style={{ marginTop: 10 }}>
          <Typography fontWeight={"bold"} color="primary">
            Search by Categories and Specialties
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >

    {/* Categories drop down */}
          <form onSubmit={handleCategory}>
            {/* category  */}
            <Select
              name="category"
              fullWidth
              placeholder="Search By Category"
              value={category}
              color="primary"
              defaultValue="all"
              sx={{ m: 1, width: "20ch" }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="all">All freelancers</MenuItem>
              <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
              <MenuItem value={"Javascript Developer"}>
                Javascript Developer{" "}
              </MenuItem>
              <MenuItem value={"HTML & CSS Developer"}>
                HTML & CSS Developer
              </MenuItem>
              <MenuItem value={"iOS Developer"}>iOS Developer</MenuItem>
              <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
            </Select>
            <Button type="submit" variant="contained">
              Search Category <ManageSearchTwoToneIcon size="large" />
            </Button>
          </form>
     {/* Specialities drop down */}
          <form onSubmit={handleSpecialties}>
            {/* specialties  */}
            <Select
              name="specialties"
              fullWidth
              placeholder="Search By Specialties"
              value={specialties}
              color="primary"
              sx={{ m: 1, width: "20ch" }}
              onChange={(e) => setSpecialties(e.target.value)}
            >
              <MenuItem value="all">All freelancers</MenuItem>
              <MenuItem
                value={
                  "Web Application, Scripting, Bug Fixes, Help/Consultation"
                }
              >
                Web Application, Scripting, Bug Fixes, Help/Consultation
              </MenuItem>
              <MenuItem
                value={"Custom Websites using WordPress, Shopify, Wix, etc"}
              >
                Custom Websites using WordPress, Shopify, Wix, etc{" "}
              </MenuItem>
              <MenuItem
                value={"Mobile Apps, Desktop Applications, Game Development"}
              >
                Mobile Apps, Desktop Applications, Game Development
              </MenuItem>
              <MenuItem
                value={"Website Development, Maitaince, and Customization"}
              >
                Website Development, Maitaince, and Customization
              </MenuItem>
            </Select>
            <Button type="submit" variant="contained">
              Search Specialties <ManageSearchTwoToneIcon size="large" />
            </Button>
          </form>
        </div>

        <div style={{ marginTop: "1em" }} className="search">
          <Link to={"/freelancers/most"}>
            <Button variant="contained">Most Reviewed</Button>
          </Link>
        </div>
        <Box p="5">
          <List p="10" pt="3" spacing={2}>
            <div className="allList">
              {_DATAC.currentData().map((freelancers) => (
                <div className="card">
                  <Link to={`/freelancers/${freelancers.id}`}>
                    <Card
                      sx={{
                        minWidth: 300,
                        height: 400,

                        margin: "0 auto",
                        padding: "0.3em",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ height: 200, width: 450, objectFit: "contain" }}
                        image={freelancers.imageUrl}
                        title="Freelancer"
                      />
                      <CardContent>
                        <Typography
                          color="primary"
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          {freelancers.firstName} {freelancers.lastName}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "bolder",
                          }}
                        >
                          <Typography color="primary" variant="body2">
                            {freelancers.category}
                          </Typography>
                          <Typography variant="body2">
                            Starting Rate: ${freelancers.hourlyRate}
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

                        <Typography variant="body2" color="secondary">
                          Specialties: {freelancers.specialties}
                        </Typography>

                        <br></br>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bolder",
                          }}
                        >
                          {/* Converts rating into stars */}
                          <Typography color="primary" variant="body2">
                            {freelancers.ratings.length === 1 &&
                            freelancers.ratings[0].rating === 5 ? (
                              <p>{"★★★★★"}</p>
                            ) : freelancers.ratings.length === 1 &&
                              freelancers.ratings[0].rating === 4 ? (
                              <p>{"★★★★"}</p>
                            ) : freelancers.ratings.length === 1 &&
                              freelancers.ratings[0].rating === 3 ? (
                              <p>{"★★★"}</p>
                            ) : freelancers.ratings.length === 1 &&
                              freelancers.ratings[0].rating === 2 ? (
                              <p>{"★★"}</p>
                            ) : freelancers.ratings.length === 1 &&
                              freelancers.ratings[0].rating === 1 ? (
                              <p>{"★"}</p>
                            ) : freelancers.ratingAvg === 1 ? (
                              <p>{"★"}</p>
                            ) : freelancers.ratingAvg === 2 ? (
                              <p>{"★★"}</p>
                            ) : freelancers.ratingAvg === 3 ? (
                              <p>{"★★★"}</p>
                            ) : freelancers.ratingAvg === 4 ? (
                              <p>{"★★★★"}</p>
                            ) : freelancers.ratingAvg === 5 ? (
                              <p>{"★★★★★"}</p>
                            ) : null}
                          </Typography>

                          {/* Dsiplay number of reviews */}
                          <Typography color="primary" variant="body2">
                            {freelancers.ratings
                              ? `( ${freelancers.ratings.length} Reviews)`
                              : null}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <Button size="small" fullWidth variant="contained">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                    
                  </Link>
                </div>
              ))}
            </div>
          </List>
          <Stack alignItems="center">
            <Pagination
              color="primary"
              count={countC}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangeSpecialties}
            />
          </Stack>
        </Box>
      </div>
    );
  }
// if sorted by freelancer Category, render...
  if (freelancersByCategory.length) {
    return (
      <div className="allViewContainer" style={{ marginBottom: "10px" }}>
        <div style={{ marginTop: 10 }}>
          <Typography fontWeight={"bold"} color="primary">
            Search by Categories and Specialties
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
    {/* Categories drop down */}
          <form onSubmit={handleCategory}>
            {/* category  */}
            <Select
              name="category"
              fullWidth
              placeholder="Search By Categories"
              value={category}
              color="primary"
              sx={{ m: 1, width: "20ch" }}
              defaultValue="all"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="all">All freelancers</MenuItem>
              <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
              <MenuItem value={"Javascript Developer"}>
                Javascript Developer{" "}
              </MenuItem>
              <MenuItem value={"HTML & CSS Developer"}>
                HTML & CSS Developer
              </MenuItem>
              <MenuItem value={"iOS Developer"}>iOS Developer</MenuItem>
              <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
            </Select>
            <Button type="submit" variant="contained">
              Search Category <ManageSearchTwoToneIcon size="large" />
            </Button>
          </form>

    {/* Specialties drop down */}
          <form onSubmit={handleSpecialties}>
            {/* specialties  */}
            <Select
              name="specialties"
              fullWidth
              placeholder="Search By Specialties"
              value={specialties}
              color="primary"
              sx={{ m: 1, width: "20ch" }}
              onChange={(e) => setSpecialties(e.target.value)}
            >
              <MenuItem value="all">All freelancers</MenuItem>
              <MenuItem
                value={
                  "Web Application, Scripting, Bug Fixes, Help/Consultation"
                }
              >
                Web Application, Scripting, Bug Fixes, Help/Consultation
              </MenuItem>
              <MenuItem
                value={"Custom Websites using WordPress, Shopify, Wix, etc"}
              >
                Custom Websites using WordPress, Shopify, Wix, etc{" "}
              </MenuItem>
              <MenuItem
                value={"Mobile Apps, Desktop Applications, Game Development"}
              >
                Mobile Apps, Desktop Applications, Game Development
              </MenuItem>
              <MenuItem
                value={"Website Development, Maitaince, and Customization"}
              >
                Website Development, Maitaince, and Customization
              </MenuItem>
            </Select>
            <Button type="submit" variant="contained">
              Search Specialties <ManageSearchTwoToneIcon size="large" />
            </Button>
          </form>
        </div>

        <div style={{ marginTop: "1em" }} className="search">
          <Link to={"/freelancers/most"}>
            <Button variant="contained">Most Reviewed</Button>
          </Link>
        </div>
        <Box p="5">
          <List p="10" pt="3" spacing={2}>
            <div className="allList">
              {_DATAB.currentData().map((freelancers) => (
                <div className="card">
                  <Link to={`/freelancers/${freelancers.id}`}>
                    <Card
                      sx={{
                        minWidth: 300,
                        minHeight: 300,

                        margin: "0 auto",
                        padding: "0.3em",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ height: 200, width: 450, objectFit: "contain" }}
                        image={freelancers.imageUrl}
                        title="Freelancer"
                      />
                      <CardContent>
                        <Typography
                          color="primary"
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          {freelancers.firstName} {freelancers.lastName}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "bolder",
                          }}
                        >
                          <Typography color="primary" variant="body2">
                            {freelancers.category}
                          </Typography>
                          <Typography variant="body2">
                            Starting Rate: ${freelancers.hourlyRate}
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

                        <Typography variant="body2" color="secondary">
                          Specialties: {freelancers.specialties}
                        </Typography>

                        <br></br>
                        <Typography
                          variant="body1"
                          align="center"
                          overflowwrap="break-word"
                        >
                          {freelancers.bio}
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
                            {freelancers.ratings.length === 1 &&
                            freelancers.ratings[0].rating === 5 ? (
                              <p>{"★★★★★"}</p>
                            ) : freelancers.ratings.length === 1 &&
                              freelancers.ratings[0].rating === 4 ? (
                              <p>{"★★★★"}</p>
                            ) : freelancers.ratings.length === 1 &&
                              freelancers.ratings[0].rating === 3 ? (
                              <p>{"★★★"}</p>
                            ) : freelancers.ratings.length === 1 &&
                              freelancers.ratings[0].rating === 2 ? (
                              <p>{"★★"}</p>
                            ) : freelancers.ratings.length === 1 &&
                              freelancers.ratings[0].rating === 1 ? (
                              <p>{"★"}</p>
                            ) : freelancers.ratingAvg === 1 ? (
                              <p>{"★"}</p>
                            ) : freelancers.ratingAvg === 2 ? (
                              <p>{"★★"}</p>
                            ) : freelancers.ratingAvg === 3 ? (
                              <p>{"★★★"}</p>
                            ) : freelancers.ratingAvg === 4 ? (
                              <p>{"★★★★"}</p>
                            ) : freelancers.ratingAvg === 5 ? (
                              <p>{"★★★★★"}</p>
                            ) : null}
                          </Typography>
                          <Typography color="primary" variant="body2">
                            {freelancers.ratings
                              ? `( ${freelancers.ratings.length} Reviews)`
                              : null}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <Button size="small" fullWidth variant="contained">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                    <div>{/* { <ViewAvgRating id={freelancers.id} />} */}</div>
                  </Link>
                </div>
              ))}
            </div>
          </List>
          <Stack alignItems="center">
            <Pagination
              color="primary"
              count={countB}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangeCategory}
            />
          </Stack>
        </Box>
      </div>
    );
  }

  // View all freelancers/ no sort
  return (
    <div className="allViewContainer" style={{ marginBottom: "10px" }}>
      <div style={{ marginTop: 10 }}>
        <Typography fontWeight={"bold"} color="primary">
          Search by Categories and Specialties
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleCategory}>
          {/* category  */}
          <Select
            defaultValue={"all"}
            name="category"
            fullWidth
            placeholder="Search By Category"
            color="primary"
            sx={{ m: 1, width: "20ch" }}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"all"}>All freelancers</MenuItem>
            <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
            <MenuItem value={"Javascript Developer"}>
              Javascript Developer{" "}
            </MenuItem>
            <MenuItem value={"HTML & CSS Developer"}>
              HTML & CSS Developer
            </MenuItem>
            <MenuItem value={"iOS Developer"}>iOS Developer</MenuItem>
            <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
          </Select>
          <Button type="submit" variant="contained">
            Search Category <ManageSearchTwoToneIcon size="large" />
          </Button>
        </form>

        <form onSubmit={handleSpecialties}>
          {/* specialties  */}
          <Select
            defaultValue="all"
            name="specialties"
            fullWidth
            placeholder="Search By Specialties"
            color="primary"
            sx={{ m: 1, width: "20ch" }}
            onChange={(e) => setSpecialties(e.target.value)}
          >
            <MenuItem value="all">All freelancers</MenuItem>
            <MenuItem
              value={"Web Application, Scripting, Bug Fixes, Help/Consultation"}
            >
              Web Application, Scripting, Bug Fixes, Help/Consultation
            </MenuItem>
            <MenuItem
              value={"Custom Websites using WordPress, Shopify, Wix, etc"}
            >
              Custom Websites using WordPress, Shopify, Wix, etc{" "}
            </MenuItem>
            <MenuItem
              value={"Mobile Apps, Desktop Applications, Game Development"}
            >
              Mobile Apps, Desktop Applications, Game Development
            </MenuItem>
            <MenuItem
              value={"Website Development, Maitaince, and Customization"}
            >
              Website Development, Maitaince, and Customization
            </MenuItem>
          </Select>
          <Button type="submit" variant="contained">
            Search Specialties <ManageSearchTwoToneIcon size="large" />
          </Button>
        </form>
      </div>

      <div style={{ marginTop: "1em" }} className="search">
        <Link to={"/freelancers/most"}>
          <Button variant="contained">Most Reviewed</Button>
        </Link>
      </div>
      <Box p="5">
        <List p="10" pt="3" spacing={2}>
          <div className="allList">
            {_DATA.currentData().map((freelancers) => (
              <div className="card">
                <Link to={`/freelancers/${freelancers.id}`}>
                  <Card
                    sx={{
                      minWidth: 300,
                      minHeight: 300,

                      margin: "0 auto",
                      padding: "0.3em",
                      ":hover": {
                        boxShadow: 20,
                      },
                    }}
                  >
                    <div className="fImg">
                      <CardMedia
                        className="freelancerImg"
                        sx={{ height: 200, width: 200 }}
                        image={freelancers.imageUrl}
                        title="Freelancer"
                      />
                    </div>
                    <CardContent>
                      <Typography
                        color="primary"
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {freelancers.firstName} {freelancers.lastName}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "bolder",
                        }}
                      >
                        <Typography color="primary" variant="body2">
                          {freelancers.category}
                        </Typography>
                        <Typography variant="body2">
                          Starting Rate: ${freelancers.hourlyRate}
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

                      <Typography variant="body2" color="secondary">
                        Specialties: {freelancers.specialties}
                      </Typography>

                      <br></br>
                      <Typography
                        variant="body1"
                        align="center"
                        overflowwrap="break-word"
                      >
                        {freelancers.bio}
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
                          {freelancers.ratingAvg === 1 ? (
                            <p>{"★"}</p>
                          ) : freelancers.ratingAvg === 2 ? (
                            <p>{"★★"}</p>
                          ) : freelancers.ratingAvg === 3 ? (
                            <p>{"★★★"}</p>
                          ) : freelancers.ratingAvg === 4 ? (
                            <p>{"★★★★"}</p>
                          ) : freelancers.ratingAvg === 5 ? (
                            <p>{"★★★★★"}</p>
                          ) : null}
                        </Typography>
                        <Typography color="primary" variant="body2">
                          {freelancers.ratings
                            ? `( ${freelancers.ratings.length} Reviews)`
                            : null}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button size="small" fullWidth variant="contained">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                  <div>{/* { <ViewAvgRating id={freelancers.id} />} */}</div>
                </Link>
              </div>
            ))}
          </div>
        </List>
        <Stack alignItems="center">
          <Pagination
            color="primary"
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
  );
};
export default AllFreelancers;
