import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/nav/Navbar';
import ProductPage from './components/ProductPage';
import NewOrderPage from './components/NewOrderPage';
import ViewOrdersPage from './components/ViewOrdersPage';
import ApiClient from './lib/ApiClient';
import Routes from './lib/Routes';

const client = new ApiClient();

function App() {
  return (
    <div className="content">
      <Router>
        <h1>VR Cardboard</h1>
        <Navbar />
        <Switch>
          <Route exact path={Routes.home}>
            <ProductPage apiClient={client} />
          </Route>
          <Route path={Routes.new_order}>
            <NewOrderPage apiClient={client} />
          </Route>
          <Route path={Routes.view_orders}>
            <ViewOrdersPage apiClient={client} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
