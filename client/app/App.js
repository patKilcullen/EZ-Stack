import React from 'react';
import Footer from '../features/footer/Footer';
import Navbar from '../features/navbar/Navbar';
// import SideNav from '../features/navbar/SideNav';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <SideNav/> */}
      <AppRoutes />
      <Footer/>
    </div>
  );
};

export default App;
