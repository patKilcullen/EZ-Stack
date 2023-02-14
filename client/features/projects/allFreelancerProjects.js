import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { fetchProjectsByFreelancerAsync, selectProjects  } from "../projects/allProjectsSlice";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FreelancerRequests from "../requests/FreelancerRequests";


import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import ContentPasteGoTwoToneIcon from '@mui/icons-material/ContentPasteGoTwoTone';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';

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



const AllFreelancerProjects = () => {
  const projects = useSelector(selectProjects);
  const [viewRejects, setViewRejects] = useState(false)
  const [ongo, setOngo] = useState(false)
  const [comp, setComp] = useState(false)

  console.log("ALL PROJECT: ", projects)
  
const rejects = projects.filter((project)=> project.rejectedWork)

console.log("REJECCTS: ", rejects)
  const dispatch = useDispatch()

  const freelancer = useSelector((state) => state.freelancerAuth.me.id)

  projects.map((project) => {
    if(project.status === 'Ongoing' && !ongo){
      setOngo(true)
    }
    if(project.status === 'Complete' && !comp){
      setComp(true)
    }
  })
  
  
  useEffect(() => {
    dispatch(fetchProjectsByFreelancerAsync(freelancer));
  }, [dispatch] );

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  console.log("FREELANCER PROJECTS: ", projects)

  return (
    <div className="allViewContainer">
    <div className='allList'>
<Box>



{ rejects.length ? 
      <div>
      <Typography variant="h6" color='secondary'>
      <NotificationsActiveTwoToneIcon fontSize="large"/>
      Your submitted work was rejected: 
    </Typography>
      <Button  variant="contained" onClick={()=>setViewRejects(true)}>
      View Rejected Work
    </Button>
    </div>
      : null }

<p>{viewRejects && rejects ? 
    
    rejects.map((reject)=>{
     return   <Button size="small" color="secondary" variant="contained" sx={{ padding: 0.5, margin: 1.5,  }} >
 {/* <Link to={`/projects/${reject.id}`}> {reject.title}</Link> */}
 <Link to={`/review/${reject.id}`} >{reject.title} </Link>
 </Button>
    })

  : null }</p>
    <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
      
          (
          <Tab label="Ongoing Projects" {...a11yProps(0)} />
          ) (
          <Tab label="Completed Projects" {...a11yProps(1)} />)
        </Tabs>

       

        <TabPanel value={value} index={0}>



      {ongo ? 
          <div
          style={{
            width: 600,
            height:500,
            alignContent:"center",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            overflow:"auto",
          }}
          >

        {projects.filter((project)=>{
            
            return project.status === "Ongoing"
                      
                    }).map((project) => (
          <div key={project.id} className='card'
          >
            <Link to={`/projects/${project.id}`}>
              <Card sx={{ 
                width:400, maxHeight:500,
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                backgroundColor: "#F5F5F5",
                padding:"10px 10px",
                margin:"10px 10px",
                ":hover": {
                  boxShadow: 20, // theme.shadows[20]
                },
              }}>
                <CardContent>
                <Typography fontFamily={"Playfair Display serif"} variant="h6" component="div">
                  {project.title}
                  </Typography>
                  <hr
                    style={{
                      border: "none",
                      height: "1px",
                      color: "#333",
                      backgroundColor: "#333",
                    }}
                  ></hr>
                  <Typography color='primary'  variant="body2">
                  {project.category}
                  </Typography>
                  <Typography variant="body2" align="center" color="secondary">
                <ContentPasteGoTwoToneIcon fontSize="small"/>
                   {project.status}
                </Typography>
                <Typography
                            gutterBottom
                            component="div"
                            variant="body2"
                          >
                            {`${project.description.substr(0, 100)}...`}
                          </Typography>

                </CardContent>
                <CardActions>
                  <Button size="small" fullWidth variant="contained">Submit Work!</Button>
                </CardActions>
              </Card>
            </Link>
        
          </div>


        ))}
        </div> : <p>No Ongoing Projects</p>}

        </TabPanel>

        <TabPanel value={value} index={1}>


  

       {comp ? 
       <div
       style={{
        width: 600,
        height:500,
        alignContent:"center",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        overflow:"auto",
      }}
       >

        {projects.filter((project)=>{
            
            return project.status === "Complete"
                      
                    }).map((project) => (
          <div key={project.id} className='card'
          style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}
          >
            <Link to={`/projects/${project.id}`}>
          <Card sx={{ 
            width:400, maxHeight:500,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            backgroundColor: "#F5F5F5",
            padding:"10px 10px",
            margin:"10px 10px",
            ":hover": {
              boxShadow: 20, // theme.shadows[20]
            },
            }}>
          <CardContent>
          <Typography fontFamily={"Playfair Display serif"} variant="h6" component="div">
            {project.title}
            </Typography>
            <hr
              style={{
                border: "none",
                height: "1px",
                color: "#333",
                backgroundColor: "#333",
              }}
            ></hr>
            <Typography color='primary'  variant="body2" >
            category: {project.category}
            </Typography>
            <Typography variant="body2" align="center" color="secondary">
                <AssignmentTurnedInTwoToneIcon fontSize="small"/>
                   {project.status}
                </Typography>
                <Typography
                            gutterBottom
                            component="div"
                            variant="body2"
                          >
                            {`${project.description.substr(0, 100)}...`}
                          </Typography>


          </CardContent>
          <CardActions>
            <Button fullWidth variant="contained">View Work</Button>
          </CardActions>
        </Card>
        </Link>
      
        </div>
        ))}



        </div> : <p>No Completed Projects</p>}

        </TabPanel>
        </Box>
    </div>
      </div> 
      
  )
};

export default AllFreelancerProjects
