import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchClient, selectClient } from "../client/clientSlice";
import AllClientProjects from "../projects/allClientProjects";
import UpdateClient from "../client/UpdateClient";

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
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//TABS////
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
////////////////END TABS/////////

const ClientProfile = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.clientAuth.clientMe.id);
  const client = useSelector(selectClient);
  console.log(client);

  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch]);

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  ///

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 0.5, borderColor: "divider" }}>
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
        <h2>Welcome {client.firstName}, we've missed you!</h2>
        <Typography variant="body1" color="text.secondary">
          You are logged in as a client.
        </Typography>
        <Box
          sx={{
            // marginTop: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "4px",
          }}
        >
          
            <Card
              sx={{
                width: 850,
                // height: 650,
                margin: "0 auto",
                padding: "1em",
                ":hover": { boxShadow: 20 },
              }}
            >
              {client.imageUrl ? (
                <CardMedia
                  component="img"
                  height="200"
                  sx={{ objectFit: "contain" }}
                  image={client.imageUrl}
                  title="client"
                />
              ) : (
                <p>No Profile Image</p>
              )}
              <CardContent>
                <Typography align="center" variant="h6" component="div">
                  {client.firstName} {client.lastName}
                </Typography>

                <Typography align="center" variant="body2" color="text.secondary">
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

                <Typography align="center" variant="h6" color="primary">
                  Description:
                </Typography>
                {client.description ? (
                  <Typography align="center" variant="body2" color="text.secondary">
                    {client.description}
                  </Typography>
                ) : (
                  "Click on the Edit Account Tab to add Description, edit your hourly rate, category etc!"
                )}
              </CardContent>
            </Card>
          
          
            {client.projects?.length ? 
             (
          <div
          className="recent-orders"
          style={{
            backgroundColor: "#F5F5F5",
            margin: "100px 100px",
            borderRadius: "4px",
            ":hover": { boxShadow: 20 },
            boxShadow: "1px 3px 3px 1px",
            }}
          >
            <Typography
        color="primary"
        marginTop={3}
        variant="h6"
        align="center"
      >
         Recent Projects {" "}
        <DvrTwoToneIcon size="large"/>
      </Typography>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {client.projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <Button color="primary" size="small" variant="contained">
                          <Link to={`/projects/${project.id}`}>
                          {" "}
                          {project.title}
                        </Link>
                        </Button>
                      </TableCell>
                      <TableCell>{project.description}</TableCell>
                      <TableCell>{project.status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
            ): null }

        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ width: "80vw" }}>
          <UpdateClient />
        </div>
      </TabPanel>
    </Box>
  );
};

export default ClientProfile;
