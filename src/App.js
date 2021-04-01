import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LogIn from './Components/LogIn/LogIn';
import Order from './Components/Order/Order';
import CheckOut from './Components/CheckOut/CheckOut';
import NoMatch from './Components/NoMatch/NoMatch';
import Header from './Components/Header/Header';
import ManageBook from './Components/ManageBook/ManageBook';
import PrivateRouter from './Components/PrivateRouter/PrivateRouter';
import AddBook from './Components/AddBook/AddBook';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header/>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <LogIn/>
          </Route>
          <PrivateRouter path="/order">
            <Order/>
          </PrivateRouter>
          <PrivateRouter path="/checkout/:id">
            <CheckOut/>
          </PrivateRouter>
          <PrivateRouter path="/checkout">
            <CheckOut/>
          </PrivateRouter>
          <PrivateRouter path="/admin/addbook">
            <AddBook/>
          </PrivateRouter>
          <PrivateRouter path="/admin/manageBook">
            <ManageBook/>
          </PrivateRouter>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
