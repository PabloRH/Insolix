import React, {Fragment} from "react";

import { Button,Avatar, Card, Text, Paragraph } from "react-native-paper";
import { Link } from "react-router-native";
import { View, ScrollView } from "react-native";
import MyHeader from "../Header"
import MyStyles from "../styles"

const Home = () => {
  return (
    <Fragment>
      <MyHeader text="Derbild" subtitle="Welcome" />
      <ScrollView>
      <Card style={MyStyles.margen}>
        <Card.Title title="!Bienvenido a Derbild¡" subtitle="(╯✧▽✧)╯" left={(props) => <Avatar.Icon {...props} icon={require('../../assets/icon.png')} />} />
        <Card.Content>
          <Paragraph> 
            Antes que nada te damos la bienvenida a Derbild, una App para Fotografos
            por favor diviertete, si tienes algun problema, perdon... Σ(°△°)
          </Paragraph>
        </Card.Content>
      </Card>
        <View style={MyStyles.appContainer}>
          <Text>Si ya tienes una cuenta vamos (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</Text>
          <Link to="/login">
            <Button icon="person-pin-circle" mode="outlined" style={MyStyles.btn}>
              Log In
            </Button>
          </Link>
          <Text >¡¿Que aun no tienes una cuenta?!, ¿Que esperas? es !!!FACILISIMO¡¡¡</Text>
          <Link to="/signup">
            <Button icon="person-add" mode="outlined" style={MyStyles.btn}>
              Sign Up
            </Button>
          </Link>
        </View>
      </ScrollView>  
    </Fragment>
  );
};

export default Home;

