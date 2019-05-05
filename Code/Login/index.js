import * as React from 'react';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { NativeRouter, Route, Link } from "react-router-native";
import { StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
  input: {
    width: 260,
    margin: 16,
    height: 60
  },
  btn: {
    backgroundColor: 'transparent',
    width: 260,
    height: 40,
    margin: 16,
    justifyContent: 'center'
  },
  bottomView: {
    flex: 1,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
class Login extends React.Component {

  state = {name: "", password: ""}

  sendToDB = () => {
    const data = {name: this.state.name, password: this.state.password};
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch('http://pablorosas.pythonanywhere.com/logIn', options)
      .then(res => res.json())
      .then(res => alert(res.ID))
  }
  render () {
    return (
      <React.Fragment>
        <Appbar.Header>
        <Appbar.BackAction />
          <Appbar.Content
            title="Derbild"
            subtitle="Log In"
          />
        </Appbar.Header>
        <View style={styles.bottomView}> 
          <TextInput label='User' mode='outlined' style={styles.input} theme={{ colors:{text:'black'}}}
          value={this.state.name} onChange={e => {
          this.setState({name: e.nativeEvent.text})
          }} />
           
          <TextInput label='Password' mode='outlined' style={styles.input} theme={{ colors:{text:'black'}}}
          value={this.state.password} onChange={e => {
          this.setState({password: e.nativeEvent.text})
          }} />

          <Button mode="outlined" onPress={this.sendToDB} style={styles.btn}>
            Log In
          </Button>
        </View>
      </React.Fragment>
    );
  }  
};

export default Login;