import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchProjectsByClientAsync,
  selectProjects,
} from "../projects/allProjectsSlice";
import EditProject from "./editProjectForm";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import ContentPasteGoTwoToneIcon from '@mui/icons-material/ContentPasteGoTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';


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

const AllClientProjects = () => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const [pend, setPend] = useState(false)
  const [ongo, setOngo] = useState(false)
  const [comp, setComp] = useState(false)

  const [viewWork, setViewWork] = useState(false)
  const [seenRequests, setSeenRequests] = useState(true)

  const client = useSelector((state) => state.clientAuth.clientMe.id);

  projects.map((project) => {
    if(project.status === 'Pending' && !pend){
      setPend(true)
    }
    if(project.status === 'Ongoing' && !ongo){
      setOngo(true)
    }
    if(project.status === 'Complete' && !comp){
      setComp(true)
    }
  })


  useEffect(() => {
    dispatch(fetchProjectsByClientAsync(client));
  }, [dispatch]);

  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };projects.map((project)=>{
    // this solved map
    project.request ?
    project.requests.map((request)=>{
      console.log("REQ IDS: ", request.id)
    })
           
       :null   } )
  console.log("PROJECTSfff: ", projects)


 const requests =
  projects.map((project)=>{
    let requests = project.requests
    // THIS SOLVED FILTER
   return  requests ? requests.filter((request)=>{
      console.log("REq ID: ", request.id)
      return request.seenClient === false
    }) : null   
          })

const seen = requests.filter((request)=>{
  // this solved length 
  return request ? request.length > 0 : null
})


  const projectWork = projects.filter((project)=>project.work !== null && project.status === 'Ongoing')

  return (


    <div className="allViewContainer">
  
        
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      { projectWork.length ? 
      <div>
      <Typography variant="h6" color='secondary'>
      <NotificationsActiveTwoToneIcon fontSize="large"/>
      You have submitted work that you need to accept or decline! 
    </Typography>
      <Button  variant="contained" onClick={()=>setViewWork(true)}>
      Click to View Work
    </Button>
    </div>
      : null }


      {/* && NEEDED???? */}
      <p>{viewWork && projectWork ? 
    
        projectWork.map((project)=>{
         return  <Button size="small" color="secondary" variant="contained" sx={{ padding: 0.5, margin: 1.5,  }} >
     <Link to={`/projects/${project.id}`}> {project.title}</Link>
    </Button>
        })

      : null }</p>



<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      {seen.length ? 
      <div>
      
    <Typography variant="h6" color='secondary'>
            <NotificationsActiveTwoToneIcon fontSize="large"/>
            You have new proposals! 
            </Typography>
      <Button variant="contained" onClick={()=>setSeenRequests(false)}>
      View Proposals
    </Button>
    </div>
      : null }
</Box>

{/* && NEEDED???? */}
<p>{seenRequests && !seen ? null :
    
    seen.map((request)=>{

let message = request[0].requestMessage
let reqs =  projects.filter((project)=>{
  return project.id === request[0].projectId
}) 
// "/projects/:projectId/requests"
return reqs.map((proj)=>{
  return <Button size="small" color="secondary" variant="contained" sx={{ padding: 0.5, margin: 1.5,  }} >
    <Link to={`/projects/${proj.id}/requests`} >{proj.title} </Link> 
   {/* <Link to={`/projects/${proj.id}`}> {proj.title}</Link>  */}
   </Button>
})


})}</p>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending Projects" {...a11yProps(0)} />
          (
          <Tab label="Ongoing Projects" {...a11yProps(1)} />
          ) (
          <Tab label="Completed Projects" {...a11yProps(2)} />)
        </Tabs>


            <TabPanel value={value} index={0}>

                {pend ? 
            <div className="allList">

                {projects
                  .filter((project) => {
                    return project.status === "Pending";
                  })
                  .map((project) => (
                    <div key={project.id} className="card">
                      <Link to={`/projects/${project.id}`}>
                        <Card
                          sx={{
                            width:400, maxHeight:500,
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                            backgroundColor: "#F5F5F5",
                            padding:"10px 10px",
                            margin:"10px 10px",
                            ":hover": {
                              boxShadow: 20, // theme.shadows[20]
                            },
                          }}
                        >
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
                            <Typography color="primary" variant="body2">
                              category: {project.category}
                            </Typography>
                           
                            <Typography variant="body2" align="center" color="secondary">
                <PendingTwoToneIcon fontSize="small"/>
                   {project.status}
                </Typography>

                            <Typography gutterBottom
                            component="div"
                            variant="body2">
                              {`${project.description.substr(0, 100)}...`}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              fullWidth
                              gutterbottom="true"
                              variant="contained"
                            >
                              Go to Project
                            </Button>
                          </CardActions>
                        </Card>
                      </Link>
                    </div>
                  ))}

    
               </div> : <p>No Pending Projects</p>}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {ongo ? 
              <div className="allList">


              {projects
                .filter((project) => {
                  return project.status === "Ongoing";
                })
                .map((project) => (
                  <div
                    key={project.id}
                    className="card"

                    // style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
                  >
                    <Link to={`/projects/${project.id}`}>
                      <Card
                        sx={{
                          width:400, maxHeight:500,
                          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                          backgroundColor: "#F5F5F5",
                          padding:"10px 10px",
                          margin:"10px 10px",
                          ":hover": {
                            boxShadow: 20, // theme.shadows[20]
                          },
                        }}
                      >
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
                          <Typography
                            color="primary"
                            variant="body2"
                          >
                            category: {project.category}
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
                            {`${project.description.substr(0, 90)}...`}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button fullWidth variant="contained">
                            Go to Project
                          </Button>
                        </CardActions>
                      </Card>
                    </Link>
                  </div>
                ))}

     
          

                </div> : <p>No Ongoing Projects</p> }
            </TabPanel>
            <TabPanel value={value} index={2}>
              {comp ? 
              <div className="allList">
              
              {projects
                .filter((project) => {
                  return project.status === "Complete";
                })
                .map((project) => (
                  <div
                    key={project.id}
                    className="card" >
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

                          <Typography  color='primary'  variant="body2"
                          >
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
                          <Button fullWidth variant="contained">
                          View Work
                          </Button>
                        </CardActions>
                      </Card>
                    </Link>
                  </div>
                ))}


                </div> : <p>No Completed Projects</p> }

            </TabPanel>
          </Box>
        
      </div>


  );
};

export default AllClientProjects;
