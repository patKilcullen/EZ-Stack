import React from 'react';
import Footer from '../features/footer/Footer';
import MediaCard from '../features/navbar/cardDemo';
import Navbar from '../features/navbar/Navbar';
import SideNav from '../features/navbar/SideNav';
import AppRoutes from './AppRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#bf4aa8'
    },
    secondary: {
      main: '#51d0de'
    },
  },
  typography: {
    fontFamily: 'Ubuntu'
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <div id ="body">
      <div id ="header">
      <Navbar />
      </div>
      <div id="main">
      <AppRoutes />
      </div>
      <div id ="footer">
      <Footer/>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default App;
