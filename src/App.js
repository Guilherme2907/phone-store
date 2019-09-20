import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route,Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';

function App() {
  return (
  <React.Fragment>
      <NavBar />

      <Switch>
          <Route path='/' exact component={ProductList} />
          <Route path='/details'  component={Details} />
          <Route path='/cart'  component={Cart} />
          <Route component={Default} />
      </Switch>
  </React.Fragment>
  );
}

export default App;
