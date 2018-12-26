import React from 'react';
import './App.css';
import Navbar from '../../Components/Navbar'
import { renderRoutes } from 'react-router-config';


const App = ({ location, route }) => (
  <div className="container-fluid">
    <Navbar location={location} />
    { renderRoutes(route.routes) }
  </div>
)

export default App