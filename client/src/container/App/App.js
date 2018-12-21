import React from 'react';
import './App.css';
import { renderRoutes } from 'react-router-config';


const App = (props) => (
  <div className="container-fluid">
    { renderRoutes(props.route.routes) }
  </div>
)

export default App