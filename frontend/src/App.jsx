import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/nav/Navbar';
import ProductPage from './components/ProductPage';
import ApiClient from './lib/ApiClient';
import './App.css';

const client = new ApiClient();

function App() {
  return (
    <div className="content">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <ProductPage apiClient={client} />
          </Route>
          <Route path="/new-order">
            <div>
              <h1>New Order</h1>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
