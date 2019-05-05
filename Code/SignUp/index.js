import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View} from 'react-native'

import MyHeader from "../Header"

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

  state = {name: "", password: "", email: "", user: "", types:""}

  sendToDB = () => {
    const data = {
        name: this.state.name, 
        password: this.state.password,
        user: this.state.user,
        email: this.state.email,
        types: this.state.types
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch('http://pablorosas.pythonanywhere.com/SignUp', options)
      .then(res => res.json())
      .then(res => alert(res.ID))
    }
  render () {
    return (
      <React.Fragment>
        <MyHeader text="Derbild" subtitle="Sign In" link="/" hasAnArrow />
        <View style={styles.bottomView}> 
          <TextInput label='Name' mode='outlined' style={styles.input} theme={{ colors:{text:'black'}}}
          value={this.state.name} onChange={e => {
          this.setState({name: e.nativeEvent.text})
          }} />
           
          <TextInput label='User' mode='outlined' style={styles.input} theme={{ colors:{text:'black'}}}
          value={this.state.user} onChange={e => {
          this.setState({user: e.nativeEvent.text})
          }} />

          <TextInput label='Password' mode='outlined' style={styles.input} theme={{ colors:{text:'black'}}}
          value={this.state.password} onChange={e => {
          this.setState({password: e.nativeEvent.text})
          }} />

          <TextInput label='E-mail' mode='outlined' style={styles.input} theme={{ colors:{text:'black'}}}
          value={this.state.email} onChange={e => {
          this.setState({email: e.nativeEvent.text})
          }} />

          <TextInput label='Tipo de usuario' mode='outlined' style={styles.input} theme={{ colors:{text:'black'}}}
          value={this.state.types} onChange={e => {
          this.setState({types: e.nativeEvent.text})
          }} /> 

          <Button mode="outlined" onPress={this.sendToDB} style={styles.btn}>
            Sign Up
          </Button>
        </View>
      </React.Fragment>
    );
  }  
};

export default Login;