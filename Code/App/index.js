import React from 'react';
import { NativeRouter, Route } from "react-router-native";

import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import SignedIn from "../SignedIn";

import { Data } from "./Data"

class App extends React.Component {
  state = {ID: "0"}
  render () {
    const value = {state: this.state, setter: (nextState) => {
      console.log("App")
      this.setState(nextState)
    }}

    return (
      <Data.Provider value={value}>
        <NativeRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/SignedIn" component={SignedIn} />
        </NativeRouter>
      </Data.Provider>
  );
  }
};

export default App;

