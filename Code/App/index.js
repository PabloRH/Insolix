import React, {Fragment} from "react";
import { NativeRouter, Route, Link } from "react-router-native";
import {
  Container,
  Text,
  Button,
  Header,
  Left,
  Icon,
  Title,
  Body
} from "native-base";

import Login from "../Login";
// import MyHeader from "../Header"; <MyHeader />

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
    <Fragment>
      <Header noLeft>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
      </Header>
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </NativeRouter>
    </Fragment>
  );
};

export default App;

