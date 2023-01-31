import React from 'react'


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
                <h2>Jesthine Disla</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>jesthine@capstone.com</p>
            </div>
            </div>
        </div>

        <div style={aboutStyles.column}>
            <div style={aboutStyles.card}>
            <div style={aboutStyles.container}>
                <h2>Michael Ryan</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>Michael@capstone.com</p>
            </div>
            </div>
        </div>

        <div style={aboutStyles.column}>
            <div style={aboutStyles.card}>
            <div style={aboutStyles.container}>
                <h2>Patrick Kilcullen</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>patrick@scapstone.com</p>
            </div>
            </div>
        </div>
        
        <div style={aboutStyles.column}>
            <div style={aboutStyles.card}>
            <div style={aboutStyles.container}>
                <h2>Steven Sch...</h2>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>stevenh@capstone.com</p>
            </div>
            </div>
            
        </div>
        </div>
</>
  )
}

export default AboutUs;