import React from 'react';
import Footer from '../features/footer/Footer';
import MediaCard from '../features/navbar/cardDemo';
import Navbar from '../features/navbar/Navbar';
import SideNav from '../features/navbar/SideNav';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
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
  );
};

export default App;
