import React from "react";

import { Button } from "react-native-paper";
import { Link } from "react-router-native";
import { StyleSheet, View } from "react-native";

import MyHeader from "../Header"

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "transparent",
    width: 260,
    margin: 16,
    height: 40,
    justifyContent: "center"
  }
});

const Home = () => {
  return (
    <React.Fragment>
      <MyHeader text="Derbild" subtitle="Welcome" />
      <View style={styles.appContainer}>
        <Link to="/login">
          <Button mode="outlined" theme={{ roundness: 20 }} style={styles.btn}>
            Log In
          </Button>
        </Link>
        <Link to="/signup">
          <Button mode="outlined" theme={{ roundness: 20 }} style={styles.btn}>
            Sign Up
          </Button>
        </Link>
      </View>
    </React.Fragment>
  );
};

export default Home;

