import React from 'react';
import './App.css';
import Navbar from '../../components/Navbar'
import ErrorConsummer from '../../components/ErrorConsumer'
import { renderRoutes } from 'react-router-config';

const App = ({ location, route }) => (
  <div className="container-fluid">
    <Navbar location={location} />
    <ErrorConsummer />
    { renderRoutes(route.routes) }
  </div>
)

export default App