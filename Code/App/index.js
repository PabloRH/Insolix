import React from 'react';
import { NativeRouter, Route } from "react-router-native";

import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import SignedIn from "../SignedIn";

const App = () => {
  return (
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/SignedIn" component={SignedIn} />
      </NativeRouter>
  );
};

export default App;

