import React from "react";

import { Button,Avatar, Card, Title, Paragraph } from "react-native-paper";
import { Link } from "react-router-native";
import { View, ScrollView } from "react-native";
import MyHeader from "../Header"
import MyStyles from "../styles"

const Home = () => {
  return (
    <React.Fragment>
      <MyHeader text="Derbild" subtitle="Welcome" />
      <ScrollView>
      <Card>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
        <View style={MyStyles.appContainer}>
          <Link to="/login">
            <Button icon="person-pin-circle" mode="outlined" style={MyStyles.btn}>
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button icon="person-add" mode="outlined" style={MyStyles.btn}>
              Sign Up
            </Button>
          </Link>
        </View>
      </ScrollView>  
    </React.Fragment>
  );
};

export default Home;

