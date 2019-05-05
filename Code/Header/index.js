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
        <Link to="">  
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Link>  
      </Left>
      <Body>
        <Title>Head</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Right>
    </Header>
  );
};

export default MyHeader;
