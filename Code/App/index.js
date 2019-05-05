import * as React from 'react';
import { Appbar, Button } from 'react-native-paper';
import { NativeRouter, Route, Link } from "react-router-native";
import {StyleSheet, View, Text} from 'react-native'
import Login from "../Login";
import SignUp from "../SignUp";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: 'transparent',
    width: 260,
    margin: 16,
    height: 40,
    justifyContent: 'center',
  }
});
const Home = () => {
    return (
      <React.Fragment>
        <Appbar.Header>
          <Appbar.Content
            title="Derbild"
            subtitle="Welcome"
          />
        </Appbar.Header>
        <View style={styles.appContainer}> 
          <Link to="/login">
            <Button mode="outlined"
              theme={{ roundness: 20 }}
              style={styles.btn}>
            Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button mode="outlined"
              theme={{ roundness: 20 }}
              style={styles.btn}>
            Sign Up
            </Button>
          </Link>  
        </View>  
      </React.Fragment>
    );
  
}

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

