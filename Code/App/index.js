import React from "react";
import { NativeRouter, Route, Link } from "react-router-native";
import {
  Container,
  Text,
  Button,
  Header,
  Left,
  Right,
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
        <Text>OLL</Text>
      </Link>
    </Button>
  )
}

const App = () => {
  return (
    <Container>
      <NativeRouter>
      <Header noLeft>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </NativeRouter>
    </Container>
  );
};

export default App;

