import React from 'react';
import { NativeRouter, Route } from "react-router-native";

import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";

const App = () => {
  return (
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </NativeRouter>
  );
};

export default App;

