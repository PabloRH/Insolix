import React from "react";
import { NativeRouter, Route, Link } from "react-router-native";
import {
  Container,
  Text,
  Button,
} from "native-base";

import Login from "../Login";
import MyHeader from "../Header";

const Home = () => {
  return (
    <Button>
      <Link to="/login">
        <Text>Login</Text>
      </Link>
    </Button>
  )
}

const App = () => {
  return (
    <Container>
      <NativeRouter>
        <MyHeader />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </NativeRouter>
    </Container>
  );
};

export default App;

