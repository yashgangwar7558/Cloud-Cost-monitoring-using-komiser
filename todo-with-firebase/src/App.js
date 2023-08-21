import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Todo from "./components/todo";
import Login from "./components/login";
import Signup from "./components/signup";
import { auth, firebase } from "./firebase-config";

let UserContext = React.createContext();

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Todo />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export { App, UserContext };
