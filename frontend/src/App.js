
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import PropertyDetails from './PropertyDetails';
import UpdatePropertyForm from './UpdatePropertyForm';
import PrivateRoute from './PrivateRoute';


function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={Login} /> 
        <Route path="/register" element={Register} />
        <Route path="/properties/new" element={PropertyForm} />
        <Route path="/properties" element={PropertyList} />
        <PrivateRoute path="/properties/:id" element={PropertyDetails} />
        <PrivateRoute path="/properties/:id/edit" element={UpdatePropertyForm} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

