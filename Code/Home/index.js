import React from "react";

import { Button } from "react-native-paper";
import { Link } from "react-router-native";
import { StyleSheet, View } from "react-native";

import MyHeader from "../Header"
import MyStyles from "../styles"

const Home = () => {
  return (
    <React.Fragment>
      <MyHeader text="Derbild" subtitle="Welcome" />
      <View style={MyStyles.appContainer}>
        <Link to="/login">
          <Button mode="outlined" style={MyStyles.btn}>
            Log In
          </Button>
        </Link>
        <Link to="/signup">
          <Button mode="outlined" style={MyStyles.btn}>
            Sign Up
          </Button>
        </Link>
      </View>
    </React.Fragment>
  );
};

export default Home;

