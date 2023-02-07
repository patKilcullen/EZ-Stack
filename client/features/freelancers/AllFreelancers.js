import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllFreelancers,
  selectAllFreelancers,
  selectAllFreelancersBySpecialties,
  selectAllFreelancersByCategory, 
  sortByCategory,
  sortBySpecialties,
} from "./allFreelancersSlice";
import usePagination from "./usePaginatation";


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



const AllFreelancers = () => {
  const dispatch = useDispatch();
  const freelancers = useSelector(selectAllFreelancers);
  const freelancersBySpecialties = useSelector(selectAllFreelancersBySpecialties)
  const freelancersByCategory = useSelector(selectAllFreelancersByCategory)
  
  const [category, setCategory] = useState("");
  const [specialties, setSpecialties] = useState("");
  

  useEffect(() => {
    dispatch(fetchAllFreelancers());
  }, [dispatch]);


  const handleCategory = (evt) => {
    evt.preventDefault();
    console.log("handle category", category);
    dispatch(sortByCategory(category));
    console.log("FREELANCERS BY CAT ", freelancersByCategory)
  }

  const handleSpecialties =(evt) => {
    evt.preventDefault();
    console.log("handle specialties", specialties);
    dispatch(sortBySpecialties(specialties));
    //console.log("FREELANCERS BY CAT ", freelancersBySpecialties)
  }

  ///////////

  ////FOR PAGINATION/////
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(freelancers.length / PER_PAGE);
   const _DATA = usePagination(freelancers, PER_PAGE);

   const countB = Math.ceil(freelancersByCategory.length / PER_PAGE);
   const _DATAB = usePagination(freelancersByCategory, PER_PAGE);
 
   const countC = Math.ceil(freelancersBySpecialties.length / PER_PAGE);
   const _DATAC = usePagination(freelancersBySpecialties, PER_PAGE);
 

  const handleChangeAll = (e, p) => {
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

  ///////////////////////

  if (freelancersByCategory.length) {
  return (
    <div className="allViewContainer" style={{ marginBottom: "10px" }}>
      <div
    style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}
    >
    <h5>Search by Categories and Specialties</h5>
    <form onSubmit={handleCategory}>
      {/* category  */}
      <InputLabel>Categories</InputLabel>

      <Select
        name="category"
        fullWidth
        // label="Category"
        value={category}
        color="primary"
        sx={{ m: 1, width: "20ch" }}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="all">
          All freelancers
        </MenuItem>
        <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
        <MenuItem value={"Javascript Developer"}>
          Javascript Developer{" "}
        </MenuItem>
        <MenuItem value={"HTML & CSS Developer"}>
          HTML & CSS Developer
        </MenuItem>
        <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
      </Select>
      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>

    <form onSubmit={handleSpecialties}>
        {/* specialties  */}
        <InputLabel>Specialties</InputLabel>
        <Select
          name="specialties"
          fullWidth
          // label="Category"
          value={specialties}
          color="primary"
          sx={{ m: 1, width: "20ch" }}
          onChange={(e) => setSpecialties(e.target.value)}
        >
          <MenuItem value="all">
            All freelancers
          </MenuItem>
          <MenuItem value={"Web Application, Scripting, Bug Fixes, Help/Consultation"}>
          Web Application, Scripting, Bug Fixes, Help/Consultation</MenuItem>
          <MenuItem value={"Custom Websites using WordPress, Shopify, Wix, etc"}>
          Custom Websites using WordPress, Shopify, Wix, etc{" "}
          </MenuItem>
          <MenuItem value={"Mobile Apps, Desktop Applications, Game Development"}>
          Mobile Apps, Desktop Applications, Game Development
          </MenuItem>
          <MenuItem value={"Website Development, Maitaince, and Customization"}>
          Website Development, Maitaince, and Customization</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      </div>

      <Box p="5">
        <List p="10" pt="3" spacing={2}>
          
          <div className="allList" >    
            {_DATAB.currentData().map((freelancers) => (
              <div className="card" key={freelancers.id}>
                <Link to={`/freelancers/${freelancers.id}`}>
                  <Card
                    sx={{
                      // minWidth: 300, minHeight: 300,
                      // maxWidth: 400, maxHeight: 400,
                      width: 300,
                      height: 350,
                      // margin: "0 auto",
                      padding: "0.3em",
                      ":hover": {
                        boxShadow: 20, // theme.shadows[20]
                      },
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
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

                      <Typography
                        variant="body1"
                        align="center"
                        overflowwrap="break-word"
                      >
                        {freelancers.bio}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth size="small" variant="contained">
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
};

if (freelancersBySpecialties.length) {
  return (
    <div className="allViewContainer" style={{ marginBottom: "10px" }}>
      <div
    style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}
    >
    <h5>Search by Categories and Specialties</h5>
    <form onSubmit={handleCategory}>
      {/* category  */}
      <InputLabel>Categories</InputLabel>

      <Select
        name="category"
        fullWidth
        // label="Category"
        value={category}
        color="primary"
        sx={{ m: 1, width: "20ch" }}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="all">
          All freelancers
        </MenuItem>
        <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
        <MenuItem value={"Javascript Developer"}>
          Javascript Developer{" "}
        </MenuItem>
        <MenuItem value={"HTML & CSS Developer"}>
          HTML & CSS Developer
        </MenuItem>
        <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
      </Select>
      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>

    <form onSubmit={handleSpecialties}>
        {/* specialties  */}
        <InputLabel>Specialties</InputLabel>
        <Select
          name="specialties"
          fullWidth
          // label="Category"
          value={specialties}
          color="primary"
          sx={{ m: 1, width: "20ch" }}
          onChange={(e) => setSpecialties(e.target.value)}
        >
          <MenuItem value="all">
            All freelancers
          </MenuItem>
          <MenuItem value={"Web Application, Scripting, Bug Fixes, Help/Consultation"}>
          Web Application, Scripting, Bug Fixes, Help/Consultation</MenuItem>
          <MenuItem value={"Custom Websites using WordPress, Shopify, Wix, etc"}>
          Custom Websites using WordPress, Shopify, Wix, etc{" "}
          </MenuItem>
          <MenuItem value={"Mobile Apps, Desktop Applications, Game Development"}>
          Mobile Apps, Desktop Applications, Game Development
          </MenuItem>
          <MenuItem value={"Website Development, Maitaince, and Customization"}>
          Website Development, Maitaince, and Customization</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      </div>

      <Box p="5">
        <List p="10" pt="3" spacing={2}>
          
          <div className="allList" >    
            {_DATAC.currentData().map((freelancers) => (
              <div className="card" key={freelancers.id}>
                <Link to={`/freelancers/${freelancers.id}`}>
                  <Card
                    sx={{
                      // minWidth: 300, minHeight: 300,
                      // maxWidth: 400, maxHeight: 400,
                      width: 300,
                      height: 350,
                      // margin: "0 auto",
                      padding: "0.3em",
                      ":hover": {
                        boxShadow: 20, // theme.shadows[20]
                      },
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
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

                      <Typography
                        variant="body1"
                        align="center"
                        overflowwrap="break-word"
                      >
                        {freelancers.bio}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth size="small" variant="contained">
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
};

return (
  <div className="allViewContainer" style={{ marginBottom: "10px" }}>
    <div
    style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}
    >
    <h5>Search by Categories and Specialties</h5>
    <form onSubmit={handleCategory}>
      {/* category  */}
      <InputLabel>Categories</InputLabel>

      <Select
        name="category"
        fullWidth
        // label="Category"
        value={category}
        color="primary"
        sx={{ m: 1, width: "20ch" }}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="all">
          All freelancers
        </MenuItem>
        <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
        <MenuItem value={"Javascript Developer"}>
          Javascript Developer{" "}
        </MenuItem>
        <MenuItem value={"HTML & CSS Developer"}>
          HTML & CSS Developer
        </MenuItem>
        <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
      </Select>
      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>

    <form onSubmit={handleSpecialties}>
        {/* specialties  */}
        <InputLabel>Specialties</InputLabel>
        <Select
          name="specialties"
          fullWidth
          // label="Category"
          value={specialties}
          color="primary"
          sx={{ m: 1, width: "20ch" }}
          onChange={(e) => setSpecialties(e.target.value)}
        >
          <MenuItem value="all">
            All freelancers
          </MenuItem>
          <MenuItem value={"Web Application, Scripting, Bug Fixes, Help/Consultation"}>
          Web Application, Scripting, Bug Fixes, Help/Consultation</MenuItem>
          <MenuItem value={"Custom Websites using WordPress, Shopify, Wix, etc"}>
          Custom Websites using WordPress, Shopify, Wix, etc{" "}
          </MenuItem>
          <MenuItem value={"Mobile Apps, Desktop Applications, Game Development"}>
          Mobile Apps, Desktop Applications, Game Development
          </MenuItem>
          <MenuItem value={"Website Development, Maitaince, and Customization"}>
          Website Development, Maitaince, and Customization</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      </div>

    <Box p="5">
      <List p="10" pt="3" spacing={2}>
        
        <div className="allList" >    
          {_DATA.currentData().map((freelancers) => (
            <div className="card" key={freelancers.id}>
              <Link to={`/freelancers/${freelancers.id}`}>
                <Card
                  sx={{
                    // minWidth: 300, minHeight: 300,
                    // maxWidth: 400, maxHeight: 400,
                    width: 300,
                    height: 350,
                    // margin: "0 auto",
                    padding: "0.3em",
                    ":hover": {
                      boxShadow: 20, // theme.shadows[20]
                    },
                  }}
                >
                  <CardMedia
                    sx={{ height: 140 }}
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

                    <Typography
                      variant="body1"
                      align="center"
                      overflowwrap="break-word"
                    >
                      {freelancers.bio}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth size="small" variant="contained">
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
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChangeAll}
          />
      </Stack>
    </Box>
  </div>
);
};

export default AllFreelancers;
