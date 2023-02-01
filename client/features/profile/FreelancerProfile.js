import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchSingleFreelancer,
  selectSingleFreelancer,
} from "../freelancers/singleFreelancerSlice";
import AllFreelancerProjects from "../projects/allFreelancerProjects";
import UpdateFreelancer from "../freelancers/UpdateFreelancer";
import SingleFreelancer from "../freelancers/SingleFreelancer";

//MUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
////////////////

/////RECENT ORDERS////
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

/////END OF RECENT ORDERS///

const FreelancerProfile = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.freelancerAuth.me.id);
  const freelancer = useSelector(selectSingleFreelancer);

  useEffect(() => {
    dispatch(fetchSingleFreelancer(id));
  }, [dispatch]);

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  ///

  return (
    <Box sx={{ width: "100%" }}>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Account Info" {...a11yProps(0)} />
        <Tab label="Edit Account" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
    <h2>Welcome {freelancer.firstName}, we've missed you!</h2>
    <Typography variant="body2" color="text.secondary">
                  You are logged in as freelancer
                </Typography>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:"white"
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
              image={freelancer.imageUrl}
              title="Freelancer"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {freelancer.firstName} {freelancer.lastName}
              </Typography>

              {freelancer.projects ? (
                <Typography variant="body2" color="text.secondary">
                  Number of Projects completed: {freelancer.projects.length}
                </Typography>
              ) : (
                "No Projects attached to your account"
              )}

              {freelancer.rating ? (
                <Typography variant="body2" color="text.secondary">
                  Current Rating: {freelancer.rating}
                </Typography>
              ) : (
                "No reviews so far"
              )}
            </CardContent>
          </Card>
        </div>


        <div 
        className="recent-orders"
        style={{backgroundColor: "white", margin:"100px 100px",  borderRadius: "4px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",  }}>>
          <Typography
            component="h6"
            color="primary"
            gutterBottom
            align="center"
          >
            Recent Projects
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align="right">{`$${row.amount}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>



      </Box>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <UpdateFreelancer />
    </TabPanel>
  </Box>

  );
};

export default FreelancerProfile;