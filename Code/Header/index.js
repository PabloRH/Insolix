import React from "react";
import {
  Button,
  Header,
  Left,
  Icon,
  Title,
  Right,
  Body,
} from "native-base";

import { Link } from "react-router-native";

const MyHeader = () => {
  return (
    <Header>
      <Left>
        <Button transparent>
        <Link to="/">
          <Icon name="arrow-back" />
        </Link>
        </Button>
      </Left>
      <Body>
        <Title>Derbild</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
  );
};

export default MyHeader;
