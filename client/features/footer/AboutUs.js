import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


const aboutStyles = {
    column: {
        float: "left",
        width: "33.3%",
        marginBottom: "16px",
        padding: "0 8px",
    },
    card: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "8px",
        textAlign: "center",
        padding: "10px",
        border: "1px solid #390b4a"
    },
    row: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    about: {
        padding: "50px",
        textAlign: "center",

        
    },
    container: {
        padding: "0 16px"
    },
  };

const AboutUs = () => {

  return (
    <>
    <div style={aboutStyles.about}>
        <h1>Meet the Team</h1>
        </div>

        <div style={aboutStyles.row}>
        <div style={aboutStyles.column}>
            <div style={aboutStyles.card}>
            <div style={aboutStyles.container}>
                <h2>Keenan Urdiales</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>nick@capstone.com</p>
            </div>
            </div>
        </div>

        <div style={aboutStyles.column}>
            <div style={aboutStyles.card}>
            <div style={aboutStyles.container}>
                <h2>Jesthine Disla Vasquez</h2>
                <p>Teacher turn coder, Jesthine Disla is a Software Developer who likes to create accessible and enriching solutions and apps. Feel free to reach out about Software Developing roles.</p>
                <a href='https://www.linkedin.com/in/jesthine-disla/'><LinkedInIcon></LinkedInIcon></a>
                {"   "}
                <a href='https://github.com/JDVasquez26'><GitHubIcon ></GitHubIcon></a>
            </div>
            </div>
        </div>

        <div style={aboutStyles.column}>
            <div style={aboutStyles.card}>
            <div style={aboutStyles.container}>
                <h2>Michael Ryan</h2>
                <p>Michael is a Software Developer from Florida with a passion for using technology to solve problems and create innovative and user-friendy web applications.</p>
                <a href="https://www.linkedin.com/in/mikegerardryan/"><LinkedInIcon></LinkedInIcon></a>
            </div>
            </div>
        </div>

        <div style={aboutStyles.column}>
            <div style={aboutStyles.card}>
            <div style={aboutStyles.container}>
                <h2>Patrick Kilcullen</h2>
                <p>Patrick is a fullstack software engineer from Chicago who gets excited about developing challenging apps that improve peoples lives.</p>
                <p>patrick@scapstone.com</p>
            </div>
            </div>
        </div>
        
        <div style={aboutStyles.column}>
            <div style={aboutStyles.card}>
            <div style={aboutStyles.container}>
                <h2>Steven Scheck</h2>
                <p>Steven Scheck is a software Engineer from California who enjoys working with a team to solve problems. He recently graduated Fullstack Academy Web Development Course and is beginning his Job Search. </p>
                <a href='https://www.linkedin.com/in/steven-scheck/'><LinkedInIcon></LinkedInIcon></a>
            </div>
            </div>
            
        </div>
        </div>
</>
  )
}

export default AboutUs;
